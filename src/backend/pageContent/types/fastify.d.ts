import 'fastify';

declare module 'fastify' {
    interface Session {
        language?: string;
    }

    interface FastifyRequest {
        session: Session;
    }
}