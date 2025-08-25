import { fastify as Fastify } from 'fastify';
import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
// import fastifyCors from '@fastify/cors';

import fastifyStatic from '@fastify/static';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import path from 'path';

interface Notification {
	id: number;
	message: string;
	timestamp: Date;
}

let notifications: Notification[] = [];

const fastify = Fastify({logger : true});
fastify.register(fastifyStatic, {
	root: path.join(__dirname, './dist'),
	prefix: '/',
});
const sessionSecret = process.env.SESSION_SECRET;
const cookieSecret = process.env.COOKIE_SECRET;

if (!sessionSecret || !cookieSecret) {
	throw new Error('MISSING ENV VARIABLES');
}
// Register cookie and session plugins
// cookie + session support
fastify.register(fastifyCookie, {
	secret: cookieSecret, // Optional, needed only for signed cookies 
	parseOptions: {}
});
// fastify.register(fastifySession, {
// 	secret: sessionSecret, // Replace with a secure secret in production
// 	cookie: {
// 		maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
// 		secure: false, // Set to true if using HTTPS
// 	},
// 	saveUninitialized: false,
// 	// resave: false,
// });

// fastify.register(fastifyCors, {
// 	origin: '*', // Allow all origins, adjust as needed
// 	methods: ['GET', 'POST', 'PUT', 'DELETE'],
// 	allowedHeaders: ['Content-Type']
// });

async function getUserIdFromSession(req: any): Promise<number | null> {
	var userId: number | null = null;
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
			userId = data.user.userId; // Assuming the user object has an 'id' property
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
//   required: ['userId']
};

const notificationBodySchema = {
  type: 'object',
  properties: {
    message: { type: 'string' }
  },
  required: ['message']
};

async function requireAuth(request: FastifyRequest, reply: FastifyReply) {
    // const query = request.query;
	if ((request as any).query.userId) {
		console.log('User is authenticated:', (request as any).query.userId);
		return; // User is already authenticated
	}
    var userId = await getUserIdFromSession(request);
    if (!userId) {
		console.log('User is not authenticated, setting default userId to 1');
		userId = 1; // Default userId if not authenticated
        // reply.status(401).send({ error: 'Unauthorized' });
        // throw new Error('Unauthorized');
    }
    // Attach userId to request for use in handlers
    (request as any).query.userId = userId;
}
fastify.addHook('preHandler', requireAuth);

fastify.get('/get', {schema: {querystring: userIdQuerySchema}}, 
	async (request: FastifyRequest, reply: FastifyReply) => {
		const userId = (request as any).query.userId; // Always set by requireAuth
		const userNotifications = notifications.filter(n => n.id === userId);
		console.log('User notifications:', userNotifications);
		reply.send(userNotifications);
	});

fastify.post('/add', {schema: {querystring: userIdQuerySchema, body: notificationBodySchema}}, 
	async (request: FastifyRequest, reply: FastifyReply) => {
		const userId = (request as any).query.userId; // Always set by requireAuth
		
		const { message } = request.body as { message: string };
		if (!message) {
			reply.status(400).send({ error: 'Message is required' });
			return;
		}
		
		const notification: Notification = {
			id: userId,
			message,
			timestamp: new Date()
		};
		notifications.push(notification);
		reply.send(notification);
	});

fastify.delete('/clear', async (request: FastifyRequest, reply: FastifyReply) => {
	const userId = (request as any).query.userId; // Always set by requireAuth

	notifications = notifications.filter(n => n.id !== userId);
	reply.send({ message: 'Notifications cleared' });
});



fastify.listen({host: "0.0.0.0", port: 3005 }, err => {
	// seedDatabase();
	if (err) {
		fastify.log.error((err));
		process.exit(1);
	}
	// dbfunc.initializeDatabase().catch(console.error);

});