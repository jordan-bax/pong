import fastifyCookie from '@fastify/cookie';
import csrfProtection from '@fastify/csrf-protection';
import fastifyMultipart from '@fastify/multipart';
import fastifySession from '@fastify/session';
import fastifyStatic from '@fastify/static';
import bcrypt from 'bcryptjs';
import Fastify, { FastifyRequest } from 'fastify';
import fs from 'fs';
import { OAuth2Client } from 'google-auth-library';
import path from 'path';
import { googleLogiSchema } from './schemas/userSchemas';
import { db, findUserByEmail, findUserByGoogleEmail, insertGoogleUser, insertUserIntoDatabase, seedDatabase, updateUserInfo, updateUserInfoGoogle } from './userDb';
import { validateLoginData, validateRegisterData, validateUserUpdateData, verifyPassword, validateFile } from './validation';
import mime from 'mime-types';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';

export interface loginBody {
    email: string;
    password: string;
};

export interface registerBody {
    username: string;
    password: string;
    email: string;
    pathToProfileP: string | null;
};

interface googleBody {
    idToken: string;
};

export interface googleUpdateBody {
    idToken: string;
    formData: FormData;
}

export interface patchBody {
    newUsername: string | null;
    newPassword: string | null;
    newEmail: string | null;
    oldUsername: string | null;
    oldPassword: string | null;
    oldEmail: string | null;
    googleEmail:string | null;
    pathToProfileP: string | null;
}

const fastify = Fastify({ logger: true });
const client = new OAuth2Client();
const sessionSecret = process.env.SESSION_SECRET;
const cookieSecret = process.env.COOKIE_SECRET;
const redisClient = new Redis({
    host: 'redis',
    port: 6379
});

redisClient.on('connect', () => console.log('Regis connected'));
redisClient.on('error', (err) => console.error('Redis error', err));

const redisStore = connectRedis(session);

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
    store: new redisStore({
        client: redisClient,
        ttl: 86400
    }),
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

fastify.get('/csrf-token', async (req, reply) => {
    const token = reply.generateCsrf();
    return reply.send({csrfToken: token});
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
                console.log("part is:", part);
                if (part.filename && part.filename !== '') {
                    const fileHandler = await validateFile(part);
                    if (fileHandler === 'TOO LARGE') {
                        return reply.code (400).send({ error: 'fileTooLarge' });
                    } if (fileHandler === 'MIMETYPE INCORRECT') {
                        return reply.code(400).send({error: 'fileIncorrectMime'});
                    } if (userData['pathToProfileP'] !== '') {
                        userData['pathToProfileP'] = fileHandler;
                    }
                } else {
                    userData['pathToProfileP'] = null;
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
            await insertUserIntoDatabase(userData.username, hash, userData.email, null, userData.pathToProfileP);
            const user = await findUserByEmail(userData.email);
            if (!user) {
                req.log.error('user not added');
                return reply.code(500).send({ error: 'serverError'});
            }
            req.session.user = {
                email: user.email,
                userId: user.id,
                loginMethod: 'normal',
            };
            return reply.send({ success: true });
        } catch (err) {
            req.log.error('inserting new user error', err);
            return reply.code(500).send({ error: 'serverError' });
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
                return reply.code(401).send({ error: 'incorrectLogin' });
            }
            const isPasswordCorrect = await verifyPassword(userData.password, user.password);
            if (!isPasswordCorrect) {
                return reply.code(401).send({ error: 'incorrectLogin' });
            }
            req.session.user = {
                email: user.email,
                userId: user.id,
                loginMethod: 'normal',
            };
            reply.send({ success: true });
        } catch (err) {
            req.log.error('login error', err);
            return reply.code(500).send({ error: 'serverError' });
        }
    });

// logout
fastify.post('/logout',
    { preHandler: fastify.csrfProtection },
     (req, reply) => {
    if (!req.session.user) {
        return reply.code(400).send({ error: 'noLogin' });
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
            return reply.code(401).send({ error: 'unauthorized' });
        }
        let user = await database.get('SELECT * FROM users WHERE email IS ? OR googleEmail IS ?', email, email);
        if (user) {
            return reply.send({ user });
        } else {
            return reply.code(404).send({ error: 'noUser' });
        }
    } catch (err) {
        console.error("user data error", err);
        reply.code(500).send({ error: 'serverError' });
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
            if(!payload || !payload.email) {
                return reply.code(400).send({ error: 'googleToken' });
            }
            console.log('finding user');
            let user = await findUserByGoogleEmail(payload.email)
            if (!user) {
                await insertGoogleUser(payload.email);
            }
            user = await findUserByGoogleEmail(payload.email);
            let email: string;
            if (!user.email && !user.googleEmail) {
                return reply.code(404).send({error: 'noUser' });
            }
            if (user.email) {
                email = user.email;
            } else {
                email = user.googleEmail;
            }
            req.session.user = { 
                email: email,
                userId: user.id,
                loginMethod: 'google',
            };
            return reply.send({ success: true});
        } catch (err) {
            console.error('Google login error:', err);
            return reply.code(500).send({ error: 'serverError' });
        }
    });

fastify.post<{ Body: googleUpdateBody}>(
    '/google-check', 
    { preHandler: fastify.csrfProtection },
async (req, reply) => {
    try {
        const body  = req.body;
        const ticket = await client.verifyIdToken({
            idToken: body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email) return reply.code(400).send({ error: 'googleToken' });
        
        const user = await findUserByGoogleEmail(payload.email);
        if (!user) {
            return reply.code(404).send({ error: 'noUser' });
        }
        reply.send({ success: true });
    } catch (err) {
        console.log('Google login update check error:', err);
        return reply.code(500).send({ error: 'serverError' });
    }
});

fastify.decorateRequest('isAuthenticated', function (this: FastifyRequest) {
    return !!this.session?.user;
});

fastify.addHook('preHandler', async (req, reply) => {
    if (req.routeOptions?.url?.startsWith('/update') && !req.isAuthenticated()) {
        return reply.code(401).send({ error: 'unauthorized' });
    }
});

fastify.patch(
    '/update',
    { preHandler: fastify.csrfProtection },
    async (req, reply) => {
        let userData = {} as patchBody;
        
        const parts = req.parts();
        for await (const part of parts) {
            if (part.type === 'file') {
                const fileHandler = await validateFile(part);
                if (fileHandler === 'TOO LARGE') {
                    return reply.code(400).send({ error: 'fileTooLarge' });
                } else if (fileHandler === 'MIMETYPE INCORRECT') {
                    return reply.code(400).send({error: 'fileIncorrectMime'});
                }
                userData['pathToProfileP'] = fileHandler;
            } else if (part.type === 'field' && typeof part.value === 'string') {
                userData[part.fieldname as keyof patchBody] = part.value;
            }
        }
        console.log('update userdata', userData);

        let user: any;
        if (userData.oldEmail !== null) {
            user = await findUserByEmail(userData.oldEmail);
        }
        const errors = validateUserUpdateData(userData, user.isGoogleLogin);
        if (errors.length > 0) {
            return reply.code(400).send({ errors });
        }
        try {
            if (userData.oldEmail === null) {
                return reply.code(400).send({ error: 'wrongInfo' });
            }
            if (await updateUserInfo(
                userData.oldEmail,
                userData.newEmail,
                userData.newPassword,
                userData.newUsername,
                userData.googleEmail,
                userData.pathToProfileP,
                userData.oldPassword,
                userData.oldUsername
            ) === false) {
                return reply.code(404).send({ error: 'noUser' });
            }
            
            reply.send({ success: true });
        } catch (err) {
            req.log.error('error updating user');
            return reply.code(500).send({ error: 'serverError' });
        }
    }
);

fastify.patch(
    '/update-google',
    async (req, reply) => {
        let userData= {} as patchBody;
        const parts = req.parts();
        for await (const part of parts) {
            if (part.type === 'file') {
                if (!part.filename && part.filename !== '') {
                    const fileHandler = await validateFile(part);
                    if (fileHandler === 'TOO LARGE') {
                        console.log('file too large')
                        return reply.code(400).send('fileTooLarge');
                    } else if (fileHandler === 'MIMETYPE INCORRECT') {
                        return reply.code(400).send({error: 'fileIncorrectMime'});
                    } else {
                        userData['pathToProfileP'] = fileHandler;
                    }
                } else {
                    userData['pathToProfileP'] = null;
                }
            } else if (part.type === 'field' && typeof part.value === 'string') {
                if (part.value === '') {
                    userData[part.fieldname as keyof patchBody] = null;
                } else {
                    userData[part.fieldname as keyof patchBody] = part.value;
                }
            }
        }
        const googleEmail = req.session.user?.email;
        if (!googleEmail) {
            console.log('no google email found')
            return reply.code(400).send({error: 'noUserDb'});
        }
        const user = await findUserByGoogleEmail(googleEmail);
        if (!user) {
            console.log('no user found in db');
            return reply.code(400).send({error: 'noUserDb'});
        }
        userData['googleEmail'] = googleEmail;
        userData['oldEmail'] = user.email;
        userData['oldPassword'] = user.password;
        userData['oldUsername'] = user.username;
        console.log('userdata is:',userData);
        if (!userData['googleEmail']) {
            console.log('no googleEmail found in data');
            return reply.code(400).send({error: 'noUserDb'});
        }
        const errors = validateUserUpdateData(userData, user.isGoogleLogin);
        if (errors.length > 0) {
            console.log('validation error');
            return reply.code(400).send({ errors });
        }
        try {
            if (!userData.googleEmail) {
                console.log('userdata.google is empty')
                return reply.code(400).send({error: 'noGmail'});
            }
            const user = await findUserByGoogleEmail(userData.googleEmail)
            if (!user) {
                console.log('no user found in database with google email')
                return reply.code(404).send({ error: 'noUser' });
            }
            if (userData.newPassword !== null) {
                userData.newPassword = await bcrypt.hash(userData.newPassword, 10);
            }
            if (await updateUserInfoGoogle(
                userData.newEmail,
                userData.newPassword,
                userData.newUsername,
                userData.googleEmail,
                userData.pathToProfileP
            ) === false) {
                console.log('update user failed')
                return reply.code(404).send({ error: 'noUser' });
            }
            return reply.send({ success: true });
        } catch (err) {
            req.log.error('error updateing user');
            return reply.code(500).send({ error: 'serverError' });
        }
    });

fastify.get('/profile-picture', async (req, reply) => {
    const user = req.session.user;
    if (!user) {
        return reply.code(404).send({ error: 'noUser' });
    }
    let dbInfo = await findUserByEmail(user.email);
    if (!dbInfo) {
        dbInfo = await findUserByGoogleEmail(user.email);
        if (!dbInfo) {
            console.error('user in request but not database');
            return reply.code(500).send({ error: 'serverError' })
        }
    }
    if (typeof dbInfo.pathToProfilePicture !== 'string')
    {
        console.error('pathToProfilePicture is not a string')
        return reply.code(404).send('noImage');
    }
    console.log('makeing path');
    console.log('original path is:', dbInfo.pathToProfilePicture);
    const imagePath = path.join(path.resolve(dbInfo.pathToProfilePicture));
    console.log('path is:', imagePath);
    if (!fs.existsSync(imagePath)) {
        console.error('image is not found')
        return reply.code(404).send('noImage')
    }
    const mimeTypes = mime.lookup(imagePath) || 'application/octet-stream';
    reply.header('content-type', mimeTypes);
    return reply.send(fs.createReadStream(imagePath));
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