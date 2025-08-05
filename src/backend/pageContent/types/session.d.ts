import '@fastify/session';

declare module '@fastify/session' {
    interface SessionData {
        language?: string;
    }
    interface FastifySessionObject {
        language?: string
    }
}
// declare module 'fastify' {
//     interface Session {
//         language?: string;
//     }

//     interface FastifyRequest {
//         session: Session;
//     }
// }