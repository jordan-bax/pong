import '@fastify/session'
import 'fastify'

declare module '@fastify/session' {
    interface SessionData {
        user?: {
            username: string;
            userId: number;
        }
    }

    interface FastifySessionObject {
        user?: {
            username:string;
            userId: number;
        }
    }
}
