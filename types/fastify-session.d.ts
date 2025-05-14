import '@fastify/session'

declare module '@fastify/session' {
    interface Session {
        user?: {
            id: number;
            username: string;
        };
    }
}