import Fastify from 'fastify';
import path from 'path';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyStatic from '@fastify/static';
import bcrypt from 'bcryptjs';
import { db, findUserByEmail, insertGoogleUser, insertUserIntoDatabase, seedDatabase } from './userDb';
import { registerSchema, loginSchema, googleLogiSchema } from './schemas/userSchemas'
import { verifyPassword } from './validation';
import { OAuth2Client } from 'google-auth-library'

interface loginBody {
    email: string;
    password: string;
};

interface registerBody {
    username: string;
    password: string;
    email: string;
};

interface googleBody {
    idToken: string;
};

const fastify = Fastify({ logger: true });
const client = new OAuth2Client();
const sessionSecret = process.env.SESSION_SECRET;
const cookieSecret = process.env.COOKIE_SECRET;

if (!sessionSecret || !cookieSecret) {
    throw new Error('MISSING ENV VARIABLES');
}

// cookie + session support
fastify.register(fastifyCookie, {
    secret: cookieSecret, // Optional, needed only for signed cookies 
    parseOptions: {}
});
fastify.register(fastifySession, {
    secret: sessionSecret,
    cookie: {
        secure: false, // Set true when uing HTTPS
        maxAge: 1000 * 60 * 60 * 24, // 1 day 
        sameSite: 'strict'
    },
    saveUninitialized: false
});

fastify.register(fastifyStatic, {
    root: path.join(__dirname, './dist'),
    prefix: '/',
});

// Register user
fastify.post<{ Body: registerBody }>(
    '/register',
    { schema:registerSchema }, 
    async (req, reply) => {
        try {
            console.log('get to start');
            const { username, password, email } = req.body as { username: string; password: string; email: string };
            if (await findUserByEmail(email) != null) {
                return reply.code(401).send({ error: 'email already in use' })
            }
            const hased = await bcrypt.hash(password, 10); // password, saltRounds
            await insertUserIntoDatabase(username, hased, email);
            const user = await findUserByEmail(email);
            if (!user) {
                return reply.code(500).send({ error: 'User was not added' });
            }
            req.session.user = {
                email: user.email,
                userId: user.id,
                loginMethod: 'normal',
            };
            return reply.send({ success: true });
        } catch (err) {
            return reply.code(500).send({ error: 'Internal server error' })
        }
    });

// login
fastify.post<{ Body: loginBody }>(
    '/login', 
    { schema:loginSchema }, 
    async (req, reply) => {
        try {
            const {password, email} = req.body as { password:string; email: string };

            const user = await findUserByEmail(email);
            if (!user) {
                    return reply.code(401).send({ error: 'Incorrect email or password' });
            }

            const isPasswordCorrect = await verifyPassword( password, user.password);
            if (!isPasswordCorrect) {
                return reply.code(401).send({ error: 'incorrect email or password' });
            }

            req.session.user = {
                email: user.email,
                userId: user.id,
                loginMethod: 'normal',
            };
            reply.send({ success: true });
        } catch(err) {
            return reply.code(500).send({ error: 'Internal server error' });
        }
    });

// logout
fastify.post('/logout', (req, reply) => {
    delete req.session.user;
    reply.send({ success: true });
});

// get current user
fastify.get('/me', (req, reply) => {
  if (req.session.user) {
    return reply.send({ loggedIn: true, user: req.session.user });
  } else {
    return reply.send({ loggedIn: false });
  }
});

fastify.get('/me/data', async  (req, reply) => {
    try {
        const database = await db;
        const email = req.session.user?.email;
        if (!email) {
            return reply.code(401).send({ error: 'Unauthorized' });
        }
        const user = await database.get('SELECT * FROM users WHERE email IS ?', email);
        if (user) {
            return reply.send({ user });
        } else {
            return reply.code(404).send({ error: 'User not found' });
        }
    } catch (err) {
        console.error("user data error", err);
        reply.code(500)
    }
});

// google route

fastify.post<{ Body: googleBody }>(
    '/google', 
    { schema: googleLogiSchema },
    async (req, reply) => {
        try {
            const  { idToken }  = req.body;
            const ticket = await client.verifyIdToken({
                idToken: idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if(!payload || !payload.email) return reply.code(400).send({ error: 'invalid token' });

            let user = await findUserByEmail(payload.email)
            if (!user) {
                await insertGoogleUser(payload.email);
            }
            user = await findUserByEmail(payload.email);

            req.session.user = { 
                email: payload.email,
                userId: user.id,
                loginMethod: 'google',
            };
            reply.send({ success: true});
        } catch (err) {
            console.error('Google login error:', err);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    });

fastify.setNotFoundHandler((req, reply) => {
    return reply.code(404).send({ error: 'Not Found' });
});

fastify.listen({host: "0.0.0.0", port: 3001 }, err => {
    seedDatabase();
    if (err) {
        fastify.log.error((err));
        process.exit(1);
    }
});