import '@fastify/session';

declare module '@fastify/session' {
    interface SessionData {
        language?: string;
    }
    interface FastifySessionObject {
        language?: string
    }
}
