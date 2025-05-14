import Fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { db } from './db'

const fastify = Fastify({ logger: true });

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
    if (!req.raw.url?.startsWith('/api') && !path.extname(req.raw.url || '')) {
        return reply.sendFile('pong.html');
    }
    return reply.code(404).send({ error: 'Not Found' });
})

fastify.get('/api/items', async () => {
    const row = await new Promise<any[]>((resolve, reject) => {
        db.all('SELECT * FROM items', (err: any, rows: any) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
    return row;
})

fastify.listen({host: "0.0.0.0", port: 8080 }, err => {
    if (err) {
        fastify.log.error((err));
        process.exit(1);
    }
});