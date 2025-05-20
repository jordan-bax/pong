import Fastify from 'fastify';
import path from 'path';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyStatic from '@fastify/static';
import bcrypt from 'bcryptjs';
import { db, findUserByUsername, insertUserIntoDatabase } from './db';
import { registerSchema, loginSchema } from './schemas/userSchemas'
import { verifyPassword } from './validation';

const fastify = Fastify({ logger: true });

// cookie + session support
fastify.register(fastifyCookie);
fastify.register(fastifySession, {
    secret: 'a_super_secret_key_with_minimum_32_characters', // replace with env var later
    cookie: {
        secure: false, // Set true when uing HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 1 day 
    },
    saveUninitialized: false
});

fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../../dist/frontend'),
    prefix: '/',
});

fastify.setNotFoundHandler((req, reply) => {
    const url = req.raw.url || '';
    const isAPI = url.startsWith('/api');
    const isFile = path.extname(url);
    if (!isAPI && !isFile) {
        return reply.sendFile('index.html');
    }
    return reply.code(404).send({ error: 'Not Found' });
})

// Auth Routes

// Register user
fastify.post('/api/register',{
    schema:registerSchema
}, async (req, reply) => {
    const { username, password } = req.body as { username: string; password: string };
    const hased = await bcrypt.hash(password, 10);

    try {
        await insertUserIntoDatabase(username, hased)
        const user = await findUserByUsername(username);
        if (!user) {
            reply.code(500).send({ error: 'User was not added' });
        } else {
            req.session.user = {
                id: user.id,
                username: user.username
            };
            reply.send({ success: true });
        }
    } catch (err) {
        reply.code(500).send({ error: 'Internal server error' })
    }
});

// login
fastify.post('/api/login', {
    schema:loginSchema
}, async (req, reply) => {
    try {
        const { username, password } = req.body as { username: string; password:string };

        const user = await findUserByUsername(username);
        if (!user) {
                return reply.code(401).send({ error: 'Incorrect username or password' });
        }

        const isPasswordCorrect = await verifyPassword( password, user.password);
        if (!isPasswordCorrect) {
            return reply.code(401).send({ error: 'incorrect username or password' });
        }

        req.session.user = {
            id: user.id,
            username: user.username
        };
        reply.send({ success: true });
    } catch(err) {
        return reply.code(500).send({ error: 'Internal server error' });
    }
});

// logout
fastify.post('/api/logout', (req, reply) => {
    delete req.session.user;
    reply.send({ success: true });
});

// get current user
fastify.get('/api/me', (req, reply) => {
  if (req.session.user) {
    return reply.send({ loggedIn: true, user: req.session.user });
  } else {
    return reply.send({ loggedIn: false });
  }
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