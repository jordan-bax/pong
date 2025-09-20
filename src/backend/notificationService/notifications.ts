import { fastify as Fastify } from 'fastify';
import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';

import fastifyStatic from '@fastify/static';
import fastifyCookie from '@fastify/cookie';
import path from 'path';

interface Notification {
    id: number;
    message: string;
    timestamp: Date;
    isSend: boolean
}

let notifications: Notification[] = [];

const fastify = Fastify({ logger: true });
fastify.register(fastifyStatic, {
    root: path.join(__dirname, './dist'),
    prefix: '/',
});
const sessionSecret = process.env.SESSION_SECRET;
const cookieSecret = process.env.COOKIE_SECRET;

if (!sessionSecret || !cookieSecret) {
    throw new Error('MISSING ENV VARIABLES');
}

fastify.register(fastifyCookie, {
    secret: cookieSecret,
    parseOptions: {}
});

async function getUserIdFromSession(req: any): Promise<number | null> {
    let userId: number | null = null;
    const user = await fetch('http://user:3001/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
            Cookie: req.headers.cookie || '',
            'Content-Type': 'application/json',
            'x-session-id': req.cookies['sessionId'] || ''
        }
    });

    if (user.ok) {
        await user.json().then(data => {
            console.log('User data:', data);
            userId = data.user.userId;
        });
    }
    else {
        console.error('Failed to fetch user data:', user.statusText);
    }

    return userId;
}

const userIdQuerySchema = {
    type: 'object',
    properties: {
        userId: { type: 'number' }
    },
};

const notificationBodySchema = {
    type: 'object',
    properties: {
        message: { type: 'string' }
    },
    required: ['message']
};

async function requireAuth(request: FastifyRequest, reply: FastifyReply) {
    if ((request as any).query.userId) {
        console.log('User is authenticated:', (request as any).query.userId);
        return;
    }

    let userId = await getUserIdFromSession(request);
    if (!userId) {
        console.log('User is not authenticated, setting default userId to 1');
        userId = 2;
        reply.status(401).send({ error: 'Unauthorized' });
        return;
    }
    (request as any).query.userId = userId;
}

fastify.addHook('preHandler', requireAuth);

fastify.get('/get', { schema: { querystring: userIdQuerySchema } },
    async (request: FastifyRequest, reply: FastifyReply) => {
        const userId = (request as any).query.userId;

        const unsentNotifications = notifications.filter(n =>
            n.id === userId && !n.isSend
        );

        unsentNotifications.forEach(notification => {
            notification.isSend = true;
        });

        reply.status(200).send(unsentNotifications);
    });

fastify.post('/add', { schema: { querystring: userIdQuerySchema, body: notificationBodySchema } },
    async (request: FastifyRequest, reply: FastifyReply) => {
        const userId = (request as any).query.userId;

        const { message } = request.body as { message: string };
        if (!message) {
            reply.status(400).send({ error: 'Message is required' });
            return;
        }

        const notification: Notification = {
            id: userId,
            message,
            timestamp: new Date(),
            isSend: false
        };

        notifications.push(notification);
        reply.status(201).send(notification);
    });

fastify.delete('/clear', async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = (request as any).query.userId;

    notifications = notifications.filter(n => n.id !== userId);
    reply.send({ message: 'Notifications cleared' });
});



fastify.listen({ host: "0.0.0.0", port: 3005 }, err => {
    if (err) {
        fastify.log.error((err));
        process.exit(1);
    }
});
