import { fastify, FastifyRequest, FastifyReply } from 'fastify'
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import { guestDB, DBError } from "./guestDB.ts"

const db = new guestDB

const DBPATH = process.env.GUEST_DATABASE_PATH
const { ADDRESS = 'localhost', PORT = '3006' } = process.env;
const server = fastify()

const start = async () => {
    try {
        const sessionSecret = process.env.SESSION_SECRET;
        const cookieSecret = process.env.COOKIE_SECRET;

        if (!sessionSecret || !cookieSecret) {
            throw new Error('ENV Variables Missing!');
        }

        await server.register(fastifyCookie, {
            secret: cookieSecret,
            parseOptions: {}
        });

        await server.register(fastifySession, {
            secret: sessionSecret,
            cookieName: 'guestInfo',
            cookie: {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 * 24,
                sameSite: 'strict'
            },
            saveUninitialized: false
        });

        console.error(DBPATH)
        await db.initDB(DBPATH)

        await server.listen({ host: ADDRESS, port: parseInt(PORT, 10) });
        const address = server.server.address();
        if (typeof address === 'string') {
            console.log(`Server listening at ${address}`);
        } else {
            console.log(`Server listening at ${address.address}:${address.port}`);
        }

    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
start();

server.get('/create', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
        if (request.session && request.session.user) {
            console.log("guest user exists");
            return reply.status(200).send({
                "username": request.session.user.username,
                "id": request.session.user.userId
            });
        }

        console.log("creating new guest user");
        const result = await db.create();

        request.session.user = {
            username: result.username,
            userId: result.id
        };

        await request.session.save();

        reply.status(200).send(result);
    } catch (error) {
        console.error('guest creation error:', error);
        reply.status(500).send({ error: "Internal server error" });
    }
})
