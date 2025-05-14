import 'fastify'

declare module 'fastify' {
    interface FastifyRequest {
        destroySession(callback: (err?: Error) => void): void;
    }
}