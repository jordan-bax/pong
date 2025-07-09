import 'fastify'

declare module 'fastify' {
    interface Session {
        user?: {
            email: string;
            userId: number;
            loginMethod: string;
        },
        language?: string;
    }

    interface FastifyRequest {
        session: Session;
        isAuthenticated: () => boolean;
    }
}
