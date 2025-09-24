import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import csrfProtection from '@fastify/csrf-protection';
import fastifyMultipart from '@fastify/multipart';
import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import { OAuth2Client } from 'google-auth-library';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { googleLogiSchema } from './schemas/userSchemas.js';
import UserDatabase from './userDb.js';
import Validator from './validation.js';
import mime from 'mime-types';
import * as https from 'https'

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
    googleEmail: string | null;
    pathToProfileP: string | null;
    isGoogleLogin: string | null;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class server {
    private fastify: FastifyInstance;
    private client: OAuth2Client;
    private db: UserDatabase;
    private validate: Validator;
    private guestId: number

    constructor() {
        this.fastify = Fastify({ logger: true });
        this.client = new OAuth2Client();
        this.db = new UserDatabase();
        this.validate = new Validator();
        this.guestId = -3600
    }

    async init() {
        const sessionSecret = process.env.SESSION_SECRET;
        const cookieSecret = process.env.COOKIE_SECRET;

        if (!sessionSecret || !cookieSecret) {
            throw new Error('ENV Variables Missing!');
        }

        await this.fastify.register(fastifyCookie, {
            secret: cookieSecret,
            parseOptions: {}
        });

        await this.fastify.register(fastifySession, {
            secret: sessionSecret,
            cookieName: 'UserInfo',
            cookie: {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
                sameSite: 'strict'
            },
            saveUninitialized: false
        });

        await this.fastify.register(fastifyMultipart);
        await this.fastify.register(csrfProtection, {
            sessionPlugin: '@fastify/session'
        });

        await this.registerRoutes();
    }

    async start(portNumber: number = 3001, hostName: string = '0.0.0.0') {
        const dbFile = process.env.USER_DATABASE_PATH;
        if (!dbFile) {
            throw new Error('ENV variables missing!');
        }
        await this.db.start(dbFile);

        let isRunning = false;
        setInterval(async () => {
            if (isRunning) return;
            isRunning = true;
            try {
                await this.db.markOffline();
            } catch (e) {
                console.error(`Error in mark offline ${e}`);
            } finally {
                isRunning = false;
            }
        }, 60 * 1000);
        this.fastify.listen({ host: hostName, port: portNumber }, async err => {
            if (err) {
                await this.db.close();
                this.fastify.log.error((err));
                process.exit(1);
            }
        });
    }

    private async downloadGooglePicure(url: string | undefined, userId: string): Promise<string | null> {
        return new Promise((resolve, rejects) => {
            if (typeof url === 'undefined') {
                resolve(null);
                return;
            }
            const filePath = path.join(__dirname, '..', 'uploads', 'profile_pictures', `${userId}.jpg`)
            const file = fs.createWriteStream(filePath);

            https.get(url, (response) => {
                if (response.statusCode !== 200) {
                    console.error('fetching  profile picture for google user failed');
                    resolve(null);
                    return;
                }
                response.pipe(file);

                file.on('finish', () => {
                    file.close();
                    resolve(filePath);
                });

                file.on('error', (err) => {
                    fs.unlink(filePath, () => rejects(err));
                });
            }).on('error', (err) => {
                rejects(err);
            });
        });
    }

    private async registerRoutes() {
        this.fastify.get('/getLoggedInFriends', async (req: FastifyRequest, reply: FastifyReply) => {
            if (!req.session.user) {
                return reply.code(401).send({ error: 'unauthorized' });
            }
            const loggedInFriends = await this.db.getLoggedInFriends(req.session.user.email);
            if (loggedInFriends === null) {
                return reply.code(404).send({ error: 'noOnlineFriends' });
            }
            return reply.send(loggedInFriends);
        })

        this.fastify.get('/search', async (req: FastifyRequest, reply: FastifyReply) => {
            if (!req.session.user) {
                return reply.code(401).send({ error: 'unauthorized' });
            }
            const query = (req.query as { q?: string }).q?.toLocaleLowerCase();
            if (typeof query === 'undefined' || query === '') {
                return reply.code(400).send({ error: 'missingQuery' });
            }

            const users = await this.db.getUsers(query, req.session.user.email);

            return reply.send(users);
        });

        this.fastify.get('/csrf-token', async (req: FastifyRequest, reply: FastifyReply) => {
            const token = reply.generateCsrf();
            reply.send({ csrfToken: token });
        });

        this.fastify.get('/me', async (req: FastifyRequest, reply: FastifyReply) => {
            if (req.session.user) {
                let loggedIn = true;
                if (req.session.user.userId < this.guestId) {
                    loggedIn = false;
                }

                return reply.send({ loggedIn: loggedIn, user: req.session.user });
            } else {
                try {
                    const result = await fetch('http://guest:3006/create', {
                        credentials: 'include',
                    })

                    if (result.status === 200) {
                        const data = await result.json()
                        req.session.user = {
                            username: data.username,
                            userId: data.id,
                            email: `guest${-data.id}@guest.nl`,
                            loginMethod: 'normal'
                        }

                        await new Promise(resolve => setImmediate(resolve));

                        await fetch('http://game:3002/setsession', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                "x-internal": "true",
                                "cookie": req.headers.cookie || ''
                            },
                            body: JSON.stringify({
                                username: data.username,
                                id: data.id
                            }),
                            credentials: 'include'
                        }).then(async (response) => {
                            if (!response.ok) {
                                console.error('failed to set game session');
                                return reply.status(400).send({
                                    "message": "failed to set game session"
                                });
                            }
                        })

                        await fetch('http://game:3002/db/addPlayer', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                "x-internal": "true",
                                "cookie": req.headers.cookie || ''
                            },
                            body: JSON.stringify({
                                "username": data.username,
                                "id": data.id
                            }),
                            credentials: 'include',
                        }).then(response => {
                            if (!response.ok) {
                                console.error('failed to create player');
                                return reply.status(400).send({
                                    "message": "failed to create player"
                                });
                            }
                        })
                        return reply.send({ loggedIn: false, user: req.session.user })
                    } else {
                        return reply.code(404).send({ loggedIn: false });
                    }
                } catch (error) {
                    return reply.code(404).send({ loggedIn: false });
                }
            }
        });

        this.fastify.get('/me/data', async (req: FastifyRequest, reply: FastifyReply) => {
            try {
                const email = req.session.user?.email;
                if (!email) {
                    return reply.code(401).send({ error: 'unauthorized' });
                }
                const user = await this.db.getUserData(email)
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

        this.fastify.get('/profile-picture', async (req: FastifyRequest, reply: FastifyReply) => {
            const user = req.session.user;
            if (!user) {
                return reply.code(404).send({ error: 'noUser' });
            }
            const dbInfo = await this.db.getUserData(user.email);
            if (!dbInfo) {
                console.error('user in request but not database');
                return reply.code(500).send({ error: 'serverError' })
            }
            if (typeof dbInfo.pathToProfilePicture !== 'string') {
                console.error('pathToProfilePicture is not a string')
                return reply.code(404).send('noImage');
            }
            const imagePath = path.join(path.resolve(dbInfo.pathToProfilePicture));
            if (!fs.existsSync(imagePath)) {
                console.error('image is not found')
                return reply.code(404).send('noImage')
            }
            const mimeTypes = mime.lookup(imagePath) || 'application/octet-stream';
            reply.header('content-type', mimeTypes);
            return reply.send(fs.createReadStream(imagePath));
        });

        this.fastify.get('/friends', async (req: FastifyRequest, reply: FastifyReply) => {
            const user = req.session.user;
            if (!user) {
                return reply.code(401).send({ error: 'unauthorized' });
            }

            const friends = await this.db.getFriends(user.email);
            if (!friends) {
                return reply.code(404).send({ error: 'noFriends' });
            }
            return reply.send(friends);
        });

        this.fastify.get('/pending', async (req: FastifyRequest, reply: FastifyReply) => {
            const user = req.session.user;
            if (!user) {
                return reply.code(401).send({ error: 'unauthorized' });
            }

            const pending = await this.db.getPendingFriends(user.email);
            if (!pending) {
                return reply.code(404).send({ error: 'noPending' });
            }
            return reply.send(pending);
        });

        this.fastify.get('/requested', async (req: FastifyRequest, reply: FastifyReply) => {
            const user = req.session.user;
            if (!user) {
                return reply.code(401).send({ error: 'unauthorized' });
            }

            const requested = await this.db.getRequestedFriends(user.email);;
            if (!requested) {
                return reply.code(404).send({ error: 'noRequested' });
            }
            return reply.send(requested);
        });

        this.fastify.get('/isIdFriend', async (req: FastifyRequest, reply: FastifyReply) => {
            const user = req.session.user;
            if (!user) {
                return reply.code(401).send({ error: 'unauthorized' });
            }
            const query = req.query as { id?: number };
            if (!query.id) {
                return reply.code(400).send({ error: 'missingQuery' });
            }

            const dbResponse = await this.db.isFriend(user.userId, query.id);
            if (dbResponse) {
                return reply.send(true);
            }
            return reply.send(false);
        });

        this.fastify.post('/requested', async (req: FastifyRequest, reply: FastifyReply) => {
            const user = req.session.user;
            const toEmail = req.body as string | null;
            if (!user) {
                return reply.code(401).send({ error: 'unauthorized' });
            }
            if (!toEmail) {
                return reply.code(400).send({ error: 'noBody' });
            }

            const setRequest = await this.db.setFriendRequestPending(user.email, toEmail);
            if (!setRequest) {
                return reply.code(500).send({ error: 'serverError' });
            }
            const friendData = await this.db.findUserByEmail(toEmail);
            await this.sendNotificationToUser(friendData.id as number, 'new frient request');
            return reply.send({ success: true });
        });

        this.fastify.post('/heartbeat', async (req: FastifyRequest, reply: FastifyReply) => {
            const user = req.session.user;
            if (!user) {
                return reply.code(401).send({ error: 'unauthorized' });
            }
            await this.db.setLoggedStatus(user.email, Date.now());
        })

        this.fastify.post('/acceptFriend', async (req: FastifyRequest, reply: FastifyReply) => {
            const user = req.session.user;
            if (!user) {
                return reply.code(401).send({ error: 'unauthorized' });
            }
            const friend = req.body as string | null;
            if (!friend) {
                return reply.code(400).send({ error: 'noBody' });
            }
            const accepted = await this.db.acceptFriendRequest(user.email, friend);
            if (!accepted) {
                return reply.code(500).send({ error: 'serverError' });
            }
            return reply.send({ success: true });
        })

        this.fastify.delete('/friendRequest', async (req: FastifyRequest, reply: FastifyReply) => {
            const user = req.session.user;
            const deleteRequest = req.body as string | null;
            if (!user) {
                return reply.code(401).send({ error: 'unauthorized' });
            }
            if (!deleteRequest) {
                return reply.code(400).send({ error: 'noBody' });
            }

            const dbRemove = await this.db.removeRequestPending(user.email, deleteRequest, false);
            if (!dbRemove) {
                return reply.code(500).send({ error: 'serverError' });
            }
            return reply.send({ success: true });
        })

        this.fastify.post('/register', { preHandler: this.fastify.csrfProtection }, async (req: FastifyRequest, reply: FastifyReply) => {
            let userData = {} as registerBody;

            const parts = req.parts();
            for await (const part of parts) {
                if (part.type === 'file') {
                    if (part.filename && part.filename !== '') {
                        const fileHandler = await this.validate.validateFile(part);
                        if (fileHandler === 'TOO LARGE') {
                            return reply.code(400).send({ error: 'fileTooLarge' });
                        } if (fileHandler === 'MIMETYPE INCORRECT') {
                            return reply.code(400).send({ error: 'fileIncorrectMime' });
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
            if (userData['pathToProfileP'] === null) {
                userData['pathToProfileP'] = '/app/uploads/profile_pictures/profilePicture.png'
            }
            const errors = this.validate.validateRegisterData(userData);
            if (errors.length > 0) {
                return reply.code(400).send({ errors });
            }
            const hash = await bcrypt.hash(userData.password, 10);
            try {
                const dbInsert = await this.db.insertUserIntoDatabase(userData.username, hash, userData.email, null, userData.pathToProfileP);
                if (typeof dbInsert !== 'boolean') {
                    return reply.code(422).send({ error: 'unprocessableEntity' });
                }
                if (!dbInsert) {
                    return reply.code(422).send({ error: 'unprocessableEntity' });
                }
                const user = await this.db.findUserByEmail(userData.email);
                if (!user) {
                    req.log.error('user not added');
                    return reply.code(500).send({ error: 'serverError' });
                }
                req.session.user = {
                    username: user.username,
                    email: user.email,
                    userId: user.id,
                    loginMethod: 'normal',
                };
                return reply.send({ success: true });
            } catch (err) {
                req.log.error(`inserting new user error: ${err}`);
                return reply.code(500).send({ error: 'serverError' });
            }
        });

        this.fastify.post('/login', { preHandler: this.fastify.csrfProtection }, async (req: FastifyRequest, reply: FastifyReply) => {
            let userData = {} as loginBody;
            const parts = req.parts();
            for await (const part of parts) {
                if (part.type == 'field' && typeof part.value === 'string') {
                    userData[part.fieldname as keyof loginBody] = part.value;
                }
            }
            const errors = this.validate.validateLoginData(userData);
            if (errors.length > 0) {
                return reply.code(400).send({ errors });
            }
            try {
                const user = await this.db.findUserByEmail(userData.email);
                if (!user) {
                    return reply.code(401).send({ error: 'incorrectLogin' });
                }
                const isPasswordCorrect = await this.validate.verifyPassword(userData.password, user.password);
                if (!isPasswordCorrect) {
                    return reply.code(401).send({ error: 'incorrectLogin' });
                }
                req.session.user = {
                    username: user.username,
                    email: user.email,
                    userId: user.id,
                    loginMethod: 'normal',
                };
                reply.send({ success: true });
            } catch (err) {
                req.log.error(`login error: ${err}`);
                return reply.code(500).send({ error: 'serverError' });
            }
        });

        this.fastify.post('/logout', (req: FastifyRequest, reply: FastifyReply) => {
            if (!req.session.user) {
                return reply.code(400).send({ error: 'noLogin' });
            }

            delete req.session.user;
            return reply.send({ success: true });
        });

        this.fastify.post<{ Body: googleBody }>('/google', { schema: googleLogiSchema, preHandler: this.fastify.csrfProtection }, async (req, reply) => {
            try {
                const { idToken } = req.body;
                const ticket = await this.client.verifyIdToken({
                    idToken: idToken,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                if (!payload || !payload.email) {
                    return reply.code(400).send({ error: 'googleToken' });
                }
                let user = await this.db.findUserByEmail(payload.email);
                if (!user) {
                    const googlePicture = await this.downloadGooglePicure(payload.picture, payload.sub)
                    const dbInsert = await this.db.insertGoogleUser(payload, googlePicture);
                    if (typeof dbInsert !== 'boolean') {
                        return reply.code(422).send({ error: 'unprocessableEntity' });
                    }
                    if (!dbInsert) {
                        return reply.code(422).send({ error: 'unprocessableEntity' });
                    }
                    user = await this.db.findUserByEmail(payload.email);
                }
                let email: string;
                if (!user.email && !user.googleEmail) {
                    return reply.code(404).send({ error: 'noUser' });
                }
                if (user.email) {
                    email = user.email;
                } else {
                    email = user.googleEmail;
                }
                req.session.user = {
                    username: user.username,
                    email: email,
                    userId: user.id,
                    loginMethod: 'google',
                };
                return reply.send({ success: true });
            } catch (err) {
                console.error('Google login error:', err);
                return reply.code(500).send({ error: 'serverError' });
            }
        });

        this.fastify.post<{ Body: googleUpdateBody }>('/google-check', { preHandler: this.fastify.csrfProtection }, async (req, reply) => {
            try {
                const body = req.body;
                const ticket = await this.client.verifyIdToken({
                    idToken: body.idToken,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                if (!payload || !payload.email) return reply.code(400).send({ error: 'googleToken' });

                const user = await this.db.getUserData(payload.email);
                if (!user) {
                    return reply.code(404).send({ error: 'noUser' });
                }
                reply.send({ success: true });
            } catch (err) {
                return reply.code(500).send({ error: 'serverError' });
            }
        });

        this.fastify.decorateRequest('isAuthenticated', function(this: FastifyRequest) {
            return !!this.session?.user;
        });

        this.fastify.addHook('preHandler', async (req: FastifyRequest, reply: FastifyReply) => {
            if (req.routeOptions?.url?.startsWith('/update') && !req.isAuthenticated()) {
                return reply.code(401).send({ error: 'unauthorized' });
            }
        });

        this.fastify.patch('/update', { preHandler: this.fastify.csrfProtection }, async (req: FastifyRequest, reply: FastifyReply) => {
            let userData = {} as patchBody;

            const parts = req.parts();
            for await (const part of parts) {
                if (part.type === 'file') {
                    if (part.filename && part.filename !== '') {
                        const fileHandler = await this.validate.validateFile(part);
                        if (fileHandler === 'TOO LARGE') {
                            return reply.code(400).send({ error: 'fileTooLarge' });
                        } else if (fileHandler === 'MIMETYPE INCORRECT') {
                            return reply.code(400).send({ error: 'fileIncorrectMime' });
                        }
                        userData['pathToProfileP'] = fileHandler;
                    }
                } else if (part.type === 'field' && typeof part.value === 'string') {
                    if (part.value === '') {
                        userData[part.fieldname as keyof patchBody] = null;
                    } else {
                        userData[part.fieldname as keyof patchBody] = part.value;
                    }
                }
            }

            let user: any;
            if (userData.oldEmail !== null) {
                user = await this.db.findUserByEmail(userData.oldEmail);
            }
            const errors = this.validate.validateUserUpdateData(userData, user.isGoogleLogin);
            if (errors.length > 0) {
                return reply.code(400).send({ errors });
            }
            try {
                if (userData.oldEmail === null) {
                    return reply.code(400).send({ error: 'wrongInfo' });
                }
                const dbUpdate = await this.db.updateUserInfo(
                    userData.oldEmail,
                    userData.newEmail,
                    userData.newPassword,
                    userData.newUsername,
                    userData.googleEmail,
                    userData.pathToProfileP,
                    userData.oldPassword,
                    userData.oldUsername
                );
                if (typeof dbUpdate !== 'boolean') {
                    return reply.code(422).send({ error: 'unprocessableEntity' })
                } else {
                    if (dbUpdate === false) {
                        return reply.code(404).send({ error: 'noUser' });
                    }
                }
                let newEmail = null;
                if (userData.newEmail !== null && userData.newEmail !== userData.oldEmail && userData.newEmail !== '') {
                    newEmail = userData.newEmail;
                } else {
                    newEmail = userData.oldEmail;
                }

                req.session.user = {
                    username: user.username,
                    email: newEmail,
                    userId: user.id,
                    loginMethod: 'normal'
                };

                await fetch('http://tournament:3003/updatename', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "userID": user.id,
                        "username": userData.newUsername
                    })
                })

                await fetch('http://game:3002/updatename', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        "userId": user.id,
                        "username": userData.newUsername
                    })
                })

                reply.send({ success: true });
            } catch (err) {
                req.log.error('error updating user');
                return reply.code(500).send({ error: 'serverError' });
            }
        });

        this.fastify.patch('/update-google', async (req: FastifyRequest, reply: FastifyReply) => {
            let userData = {} as patchBody;
            const parts = req.parts();
            for await (const part of parts) {
                if (part.type === 'file') {
                    if (!part.filename && part.filename !== '') {
                        const fileHandler = await this.validate.validateFile(part);
                        if (fileHandler === 'TOO LARGE') {
                            return reply.code(400).send('fileTooLarge');
                        } else if (fileHandler === 'MIMETYPE INCORRECT') {
                            return reply.code(400).send({ error: 'fileIncorrectMime' });
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
                return reply.code(400).send({ error: 'noUserDb' });
            }
            const user = await this.db.findUserByEmail(googleEmail);
            if (!user) {
                return reply.code(400).send({ error: 'noUserDb' });
            }
            userData['googleEmail'] = googleEmail;
            userData['oldEmail'] = user.email;
            userData['oldPassword'] = user.password;
            userData['oldUsername'] = user.username;
            if (!userData['googleEmail']) {
                console.error('no googleEmail found in data');
                return reply.code(400).send({ error: 'noUserDb' });
            }
            const errors = this.validate.validateUserUpdateData(userData, user.isGoogleLogin);
            if (errors.length > 0) {
                return reply.code(400).send({ errors });
            }
            try {
                if (!userData.googleEmail) {
                    return reply.code(400).send({ error: 'noGmail' });
                }
                const user = await this.db.findUserByEmail(userData.googleEmail)
                if (!user) {
                    return reply.code(404).send({ error: 'noUser' });
                }
                if (userData.newPassword !== null) {
                    userData.newPassword = await bcrypt.hash(userData.newPassword, 10);
                }
                if (await this.db.updateUserInfoGoogle(
                    userData.newEmail,
                    userData.newPassword,
                    userData.newUsername,
                    userData.googleEmail,
                    userData.pathToProfileP
                ) === false) {
                    return reply.code(404).send({ error: 'noUser' });
                }

                let newEmail = null;
                if (userData.newEmail !== null && userData.newEmail !== userData.googleEmail && userData.newEmail !== '') {
                    newEmail = userData.newEmail;
                } else {
                    newEmail = userData.googleEmail;
                }

                req.session.user = {
                    username: user.username,
                    email: newEmail,
                    userId: user.id,
                    loginMethod: 'google'
                };

                await fetch('http://tournament:3003/updatename', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "userID": user.id,
                        "username": userData.newUsername
                    })
                })

                await fetch('http://game:3002/updatename', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({
                        "userID": user.id,
                        "username": userData.newUsername
                    })
                })

                return reply.send({ success: true });
            } catch (err) {
                req.log.error('error updateing user');
                return reply.code(500).send({ error: 'serverError' });
            }
        });

        this.fastify.setNotFoundHandler((req: FastifyRequest, reply: FastifyReply) => {
            return reply.code(404).send({ error: 'Not Found' });
        });
    }

    private async sendNotificationToUser(userId: number, message: string): Promise<void> {
        const response = await fetch(`http://notification:3005/add?userId=${userId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        if (!response.ok) {
            console.error('Failed to send notification:', response.statusText);
        } else {
            const data = await response.json();
        }
    }
}

export default server;
