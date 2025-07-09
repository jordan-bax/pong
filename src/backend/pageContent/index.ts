import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifySession from '@fastify/session';
import { getAllContentOfPage, seedContentDb } from "./contentDB";
import { getContentSchema } from "./schemas/contentSchemas";
import Redis from 'ioredis';
import connectRedis  from 'connect-redis';
import session from 'express-session'

interface GetContentBody {
    language: string;
    textKey: string | string[];
}

const fastify = Fastify({ logger: true });
const sessionSecret = process.env.SESSION_SECRET;
const cookieSecret = process.env.COOKIE_SECRET;
const redisClient = new Redis({
    host: 'redis',
    port: 6379,
    retryStrategy: (times) => {
        console.log(`Redis retry attempt #${times}`);
        return Math.min(times * 100, 2000);
    }
});

redisClient.on('connect', () => console.log('Regis connected'));
redisClient.on('error', (err) => console.error('Redis error', err));

const store = connectRedis(session);

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
    store: new store({
        client: redisClient,
        ttl: 86400
    }),
    cookie: {
        secure: false, // Set true when uing HTTPS
        path: '/',
        maxAge: 1000 * 60 * 60 * 24, // 1 day 
        sameSite: 'strict'
    },
    saveUninitialized: false
});

fastify.get<{ Querystring: GetContentBody }>(
    '/getContent',
    { schema: getContentSchema },
    async (req, reply) => {
    try {
        const language: string = req.query.language;
        const textKey: string[] = Array.isArray(req.query.textKey) ? req.query.textKey : [req.query.textKey];
        console.log(`language is [${language}] and textKey is [${textKey}]`);
        const row = await getAllContentOfPage(language, textKey);
        if (row == 'ERROR') {
            return reply.code(500).send({ error: 'Database error' });
        }
        if (!row) {
            return reply.code(404).send({ error: 'Not found' });
        }
        return reply.send({ row: Object.fromEntries(row) });
    } catch (error: any) {
        console.error('Failed to get page content:', error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
});

fastify.get('/language', async (req, reply) => {
    let lang = req.session.language;
    if (typeof lang === 'undefined') {
        req.session.language = 'EN';
        lang = req.session.language;
    }
    return reply.send(lang);
});

fastify.post('/language', async (req, reply) => {
    const lang = req.body as string;
    req.session.language = lang;
    return reply.send({ success: true });
});

fastify.listen({ host: '0.0.0.0', port: 3004 }, error => {
    seedContentDb();
    if (error) {
        fastify.log.error((error));
        process.exit(1);
    }
});