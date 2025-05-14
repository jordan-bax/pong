import Fastify, { FastifyRequest } from 'fastify';
import path from 'path';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyStatic from '@fastify/static';
import bcrypt from 'bcrypt';
import { db } from './db';

const fastify = Fastify({ logger: true });

// cookie + session support
fastify.register(fastifyCookie);
fastify.register(fastifySession, {
    secret: 'a_super_secret_key_with_minimum_32_characters', // replace with env var later
    cookie: { secure: false }, // Set true when uing HTTPS
    saveUninitialized: false
});

fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/',
});

fastify.register(fastifyStatic, {
    root: path.join(__dirname, './'),
    prefix: '/src/',
    decorateReply: false,
});

fastify.setNotFoundHandler((req, reply) => {
    const url = req.raw.url || '';
    const isAPI = url.startsWith('/api');
    const isFile = path.extname(url);
    if (!isAPI && !isFile) {
        return reply.sendFile('pong.html');
    }
    return reply.code(404).send({ error: 'Not Found' });
})

// Auth Routes

// Register user
fastify.post('/api/register', async (req: FastifyRequest<{ Body: { username: string; password: string; } }>, reply) => {
    const { username, password } = req.body;
    const hased = await bcrypt.hash(password, 10);

    try {
        const database = await db;
        await database.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        reply.send({ success: true });
    } catch (err) {
        reply.code(400).send({ error: 'User already exists' })
    }
});

// login
fastify.post('/api/login', async (req: FastifyRequest<{ Body: { username: string; password: string; } }>, reply) => {
    const { username, password } = req.body;
    const database = await db;
    const user = await database.get('SELECT * FROM users WHERE username = ?', [username]);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return reply.code(401).send({ error: 'Invalid credenttials' });
    }
    type SessionType = typeof req.session;
    req.session.user = {
        id: user.id,
        username: user.username
    };
    reply.send({ success: true });
});

// logout
fastify.post('/api/logout', (req, reply) => {
    req.destroySession(err => {
        if (err) {
            return reply.code(500).send({ error: 'logout failed '});
        }
        reply.send({ success: true });
    });
});

// get current user
fastify.get('/api/me', (req, reply) => {
   reply.send(req.session.user || null);
});

//protected route
fastify.get('/api/items', async (req, reply) => {
    if (!req.session.user) {
        return reply.code(401).send({ error: 'Unathorized' });
    }

    const database = await db;
    const row = await database.all("SELECT * FROM items");
    return row;
})

fastify.listen({host: "0.0.0.0", port: 8080 }, err => {
    if (err) {
        fastify.log.error((err));
        process.exit(1);
    }
});