import Fastify from 'fastify';
import { FastifyRequest } from 'fastify';
import path from 'path';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyStatic from '@fastify/static';
import csrfProtection from'@fastify/csrf-protection'
import bcrypt from 'bcryptjs';
import { db, findUserByEmail, insertGoogleUser, insertUserIntoDatabase, seedDatabase, updateUserInfo } from './userDb';
import { googleLogiSchema } from './schemas/userSchemas'
import { verifyPassword, validateUserUpdateData, validateRegisterData, validateLoginData } from './validation';
import { OAuth2Client } from 'google-auth-library'
import fs from 'fs';
import fastifyMultipart, { MultipartFile } from '@fastify/multipart';
import { randomBytes } from 'crypto';

export interface loginBody {
    email: string;
    password: string;
};

export interface registerBody {
    username: string;
    password: string;
    email: string;
};

interface googleBody {
    idToken: string;
};

export interface patchBody {
    newUsername: string | null;
    newPassword: string | null;
    newEmail: string | null;
    oldUsername: string;
    oldPassword: string;
    oldEmail: string;
}

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

fastify.register(fastifyMultipart);

fastify.register(csrfProtection)

fastify.register(fastifyStatic, {
    root: path.join(__dirname, './dist'),
    prefix: '/',
});

function generateStateToken() {
    return randomBytes(32).toString('hex');
}

fastify.get('/csrf-token', async (req, reply) => {
    const token = reply.generateCsrf();
    reply.send({csrfToken: token});
});

// Register user
fastify.post(
    '/register',
    { preHandler: fastify.csrfProtection },
    async (req, reply) => {
        let userData = {} as registerBody;
        
        const parts = req.parts();
        for await (const part of parts) {
            if (part.type === 'file') {
                const fileHandler = await validateFile(part);
                if (fileHandler !== 'DONE') {
                    if (fileHandler === 'TOO LARGE') {
                        return reply.code (400).send({ error: 'file is larger then 10MB' });
                    }
                }
            } else if (part.type === 'field' && typeof part.value === 'string') {
                userData[part.fieldname as keyof registerBody] = part.value;
            }
        }
        const errors = validateRegisterData(userData);
        if (errors.length > 0) {
            return reply.code(400).send({ errors });
        }
        const hash = await bcrypt.hash(userData.password, 10);
        try {
            await insertUserIntoDatabase(userData.username, hash, userData.email);
            const user = await findUserByEmail(userData.email);
            if (!user) {
                req.log.error('user not added');
                return reply.code(500).send({ error: 'Internal Server Error'});
            }
            req.session.user = {
                email: user.email,
                userId: user.id,
                loginMethod: 'normal',
            };
            return reply.send({ success: true });
        } catch (err) {
            req.log.error('inserting new user error', err);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    });

// login
fastify.post(
    '/login',
    { preHandler: fastify.csrfProtection },
    async (req, reply) => {
        let userData = {} as loginBody;
        const parts = req.parts();
        for await (const part of parts) {
            if (part.type == 'field' && typeof part.value === 'string') {
                userData[part.fieldname as keyof loginBody] = part.value;
            }
        }
        const errors = validateLoginData(userData);
        if (errors.length > 0) {
            return reply.code(400).send({ errors });
        }
        try {
            const user = await findUserByEmail(userData.email);
            if (!user) {
                return reply.code(401).send({ error: 'Incorrect email or password' });
            }
            const isPasswordCorrect = await verifyPassword(userData.password, user.password);
            if (!isPasswordCorrect) {
                return reply.code(401).send({ error: 'Incorrect email or password' });
            }
            req.session.user = {
                email: user.email,
                userId: user.id,
                loginMethod: 'normal',
            };
            reply.send({ success: true });
        } catch (err) {
            req.log.error('login error', err);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    });

// logout
fastify.post('/logout',
    { preHandler: fastify.csrfProtection },
     (req, reply) => {
    if (!req.session.user) {
        return reply.code(400).send({ error: 'no one logged in' });
    }

    delete req.session.user;
    return reply.send({ success: true });
});

// get current user
fastify.get('/me', (req, reply) => {
  if (req.session.user) {
    return reply.send({ loggedIn: true, user: req.session.user });
  } else {
    return reply.code(404).send({ loggedIn: false });
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
        reply.code(500).send({ error: 'Internal Server Error' });
    }
});

// google route

fastify.post<{ Body: googleBody }>(
    '/google', 
    { 
        schema: googleLogiSchema ,
        preHandler: fastify.csrfProtection,
    },
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

fastify.decorateRequest('isAuthenticated', function (this: FastifyRequest) {
    return !!this.session?.user;
});

fastify.addHook('preHandler', async (req, reply) => {
    if (req.routeOptions?.url?.startsWith('/update') && !req.isAuthenticated()) {
        return reply.code(401).send({ error: 'Unauthorized' });
    }
});

async function validateFile(part: MultipartFile): Promise<'DONE' | 'TOO LARGE'> {
    let size = 0;
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const chunks = [];
    for await (const chunk of part.file) {
        size += chunk.length;
        if (size > MAX_FILE_SIZE) {
            return 'TOO LARGE';
        }
        chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);
    const ext = path.extname(part.filename);
    const fileName = `user_${Date.now()}${ext}`;

    const filePath = path.join(__dirname, '..', 'uploads', 'profile_pictures', fileName);
    console.log('filepath:', filePath);
    console.log('fileName:', fileName);
    fs.writeFileSync(filePath, fileBuffer);
    return 'DONE';
}

fastify.patch(
    '/update',
    { preHandler: fastify.csrfProtection },
    async (req, reply) => {
        let userData = {} as patchBody;
        
        const parts = req.parts();
        for await (const part of parts) {
            if (part.type === 'file') {
                const fileHandler = await validateFile(part);
                if (fileHandler !== 'DONE') {
                    if (fileHandler === 'TOO LARGE') {
                        return reply.code (400).send({ error: 'file is larger then 10MB' });
                    }
                }
            } else if (part.type === 'field' && typeof part.value === 'string') {
                userData[part.fieldname as keyof patchBody] = part.value;
            }
        }
        const errors = validateUserUpdateData(userData);
        if (errors.length > 0) {
            return reply.code(400).send({ errors });
        }
        try {
            if (await updateUserInfo(userData.oldEmail, 
                userData.newEmail || userData.oldEmail,
                userData.newPassword || userData.oldPassword,
                userData.newUsername || userData.oldUsername) === false) {
                return reply.code(404).send({ error: 'user not found' });
            }
            
            reply.send({ success: true });
        } catch (err) {
            req.log.error('error updating user');
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    }
);

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