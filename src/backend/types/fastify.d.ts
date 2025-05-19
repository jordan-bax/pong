import 'fastify'

declare module 'fastify' {
    interface Session {
        user?: {
            id: number;
            username: string;
        }
    }
}