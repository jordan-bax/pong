import 'fastify'

declare module 'fastify' {
    interface Session {
        user?: {
            email: string;
            userId: number;
            loginMethod: string;
        }
    }
}