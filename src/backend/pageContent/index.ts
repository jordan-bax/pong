import Fastify from "fastify";
import type { FastifyRequest } from 'fastify';
import fastifyCookie from "@fastify/cookie";
import fastifySession from '@fastify/session';
import { getAllContentOfPage, seedContentDb } from "./contentDB.js";
import { getContentSchema } from "./schemas/contentSchemas.js";

interface GetContentBody {
    language: string;
    textKey: string | string[];
}

interface translateBody {
    textkey: string;
    text: string;
}

interface translateMap {
    language: string;
    translation: translateBody;
}

const fastify = Fastify({ logger: true });
const sessionSecret = process.env.SESSION_SECRET;
const cookieSecret = process.env.COOKIE_SECRET;

let g_translatePromise: Map<string, Map<string, string>> = new Map<string, Map<string, string>>();

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
    cookieName: 'pageContent',
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

fastify.get('/language', async (req: FastifyRequest, reply) => {
    let lang = req.session.language;
    if (typeof lang === 'undefined') {
        req.session.language = 'EN';
        lang = req.session.language;
    }
    return reply.send(lang);
});

fastify.post('/language', async (req: FastifyRequest, reply) => {
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