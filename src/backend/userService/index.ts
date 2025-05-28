import Fastify from 'fastify';
import path from 'path';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyStatic from '@fastify/static';
import bcrypt from 'bcryptjs';
import { db, findUserByEmail, insertUserIntoDatabase } from './userDb';
import { registerSchema, loginSchema } from './schemas/userSchemas'
import { verifyPassword } from './validation';
import { OAuth2Client } from 'google-auth-library'

const fastify = Fastify({ logger: true });
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

// Auth Routes

// Register user
fastify.post('/register',{
    schema:registerSchema
}, async (req, reply) => {
    try {
        console.log('get to start');
        const { username, password, email } = req.body as { username: string; password: string; email: string };
        if (await findUserByEmail(email) != null) {
            console.log('email found');
            return reply.code(401).send({ error: 'email already in use' })
        }
        console.log('email not found');
        const hased = await bcrypt.hash(password, 10); // password, saltRounds
        console.log('hashed password');
        await insertUserIntoDatabase(username, hased, email);
        console.log('inserted into database');
        const user = await findUserByEmail(email);
        if (!user) {
            console.log('user not added');
            return reply.code(500).send({ error: 'User was not added' });
        }
        req.session.user = {
            username: user.username
        };
        console.log('server session set complete');
        return reply.send({ success: true });
    } catch (err) {
        console.log('got error');
        return reply.code(500).send({ error: 'Internal server error' })
    }
});

// login
fastify.post('/login', {
    schema:loginSchema
}, async (req, reply) => {
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
            username: user.username
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

// google route
const client = new OAuth2Client();

async function verifyToken(idToken:string) {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (payload) {
        const userId = payload['sub'];
        const email = payload['email'];
        // proceed with user login or account creattion
    }
}


//protected route
fastify.get('/items', async (req, reply) => {
    if (!req.session.user) {
        return reply.code(401).send({ error: 'Unathorized' });
    }

    const database = await db;
    const row = await database.all("SELECT * FROM items");
    return row;
})

fastify.setNotFoundHandler((req, reply) => {
    return reply.code(404).send({ error: 'Not Found' });
})

fastify.listen({host: "0.0.0.0", port: 3001 }, err => {
    if (err) {
        fastify.log.error((err));
        process.exit(1);
    }
});