import fastifyCookie from '@fastify/cookie';
import csrfProtection from '@fastify/csrf-protection';
import fastifyMultipart, { MultipartFile } from '@fastify/multipart';
import fastifySession from '@fastify/session';
import fastifyStatic from '@fastify/static';
import bcrypt from 'bcryptjs';
import Fastify, { FastifyRequest } from 'fastify';
import fs from 'fs';
import { OAuth2Client } from 'google-auth-library';
import path from 'path';
import { googleLogiSchema } from './schemas/userSchemas';
import { db, findUserByEmail, findUserByGoogleEmail, insertGoogleUser, insertUserIntoDatabase, seedDatabase, updateUserInfo, updateUserInfoGoogle } from './userDb';
import { validateLoginData, validateRegisterData, validateUserUpdateData, verifyPassword } from './validation';
import mime from 'mime-types';

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
    cookieName: 'UserInfo',
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
                console.log("part is:", part);
                if (part.filename && part.filename !== '') {
                    const fileHandler = await validateFile(part);
                    if (fileHandler === 'TOO LARGE') {
                        return reply.code (400).send({ error: 'file is larger then 10MB' });
                    } if (fileHandler === 'MIMETYPE INCORRECT') {
                        return reply.code(400).send({error: 'wrong file format'});
                    }
                    if (userData['pathToProfileP'] !== '') {
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
        let user = await database.get('SELECT * FROM users WHERE email IS ? OR googleEmail IS ?', email, email);
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
            if(!payload || !payload.email) {
                return reply.code(400).send({ error: 'invalid token' });
            }
            console.log('finding user');
            let user = await findUserByGoogleEmail(payload.email)
            if (!user) {
                await insertGoogleUser(payload.email);
            }
            user = await findUserByGoogleEmail(payload.email);
            let email: string;
            if (!user.email && !user.googleEmail) {
                return reply.code(404).send({error: 'not found' });
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
            return reply.code(500).send({ error: 'Internal Server Error' });
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
        if (!payload || !payload.email) return reply.code(400).send({ error: 'invalid token' });
        
        const user = await findUserByGoogleEmail(payload.email);
        if (!user) {
            return reply.code(404).send({ error: 'user not found' });
        }
        reply.send({ success: true });
    } catch (err) {
        console.log('Google login update check error:', err);
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

function checkMimeType(type: string ): boolean
{
    const list = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/webp', 'image/svg+xml'];
    for (const item in list) {
        if (type === item) {
            return true;
        }
    }
    return false;
}

async function validateFile(part: MultipartFile): Promise<string> {
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
    const mimeType = part.mimetype;
    if (!checkMimeType(mimeType)) {
        return 'MIMETYPE INCORRECT';
    }
    const filePath = path.join(__dirname, '..', 'uploads', 'profile_pictures', fileName);
    console.log('filepath:', filePath);
    console.log('fileName:', fileName);
    fs.writeFileSync(filePath, fileBuffer);
    return filePath;
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
                if (fileHandler === 'TOO LARGE') {
                    return reply.code(400).send({ error: 'file is larger then 10MB' });
                } else if (fileHandler === 'MIMETYPE INCORRECT') {
                    return reply.code(400).send({error: 'wrong file format'});
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
                return reply.code(400).send({ error: 'wrong info' });
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
                return reply.code(404).send({ error: 'user not found' });
            }
            
            reply.send({ success: true });
        } catch (err) {
            req.log.error('error updating user');
            return reply.code(500).send({ error: 'Internal Server Error' });
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
                        return reply.code(400).send('file is larger than 10MB');
                    } else if (fileHandler === 'MIMETYPE INCORRECT') {
                        return reply.code(400).send({error: 'wrong file format'});
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
            return reply.code(400).send({error: 'no user logged in'});
        }
        const user = await findUserByGoogleEmail(googleEmail);
        if (!user) {
            console.log('no user found in db');
            return reply.code(400).send({error: 'no user logged in'});
        }
        userData['googleEmail'] = googleEmail;
        userData['oldEmail'] = user.email;
        userData['oldPassword'] = user.password;
        userData['oldUsername'] = user.username;
        console.log('userdata is:',userData);
        if (!userData['googleEmail']) {
            console.log('no googleEmail found in data');
            return reply.code(400).send({error: 'no user logged in'});
        }
        const errors = validateUserUpdateData(userData, user.isGoogleLogin);
        if (errors.length > 0) {
            console.log('validation error');
            return reply.code(400).send({ errors });
        }
        try {
            if (!userData.googleEmail) {
                console.log('userdata.google is empty')
                return reply.code(400).send({error: 'no google email is known'});
            }
            const user = await findUserByGoogleEmail(userData.googleEmail)
            if (!user) {
                console.log('no user found in database with google email')
                return reply.code(404).send({ error: 'user not found' });
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
                return reply.code(404).send({ error: 'user not found' });
            }
            return reply.send({ success: true });
        } catch (err) {
            req.log.error('error updateing user');
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    });

fastify.get('/profile-picture', async (req, reply) => {
    const user = req.session.user;
    if (!user) {
        return reply.code(404).send({ error: 'no user found' });
    }
    let dbInfo = await findUserByEmail(user.email);
    if (!dbInfo) {
        dbInfo = await findUserByGoogleEmail(user.email);
        if (!dbInfo) {
            console.error('user in request but not database');
            return reply.code(500).send({ error: 'Internal Server Errror' })
        }
    }
    if (typeof dbInfo.pathToProfilePicture !== 'string')
    {
        console.error('pathToProfilePicture is not a string')
        return reply.code(404).send('image not found');
    }
    console.log('makeing path');
    console.log('original path is:', dbInfo.pathToProfilePicture);
    const imagePath = path.join(path.resolve(dbInfo.pathToProfilePicture));
    console.log('path is:', imagePath);
    if (!fs.existsSync(imagePath)) {
        console.error('image is not found')
        return reply.code(404).send('image not found')
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