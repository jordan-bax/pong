// import '@fastify'

// declare module 'fastify' {
//     interface session {
//          user?: {
//             email: string;
//             userId: number;
//             loginMethod: string;
//         }
//     }
    
//     interface FastifyRequest {
//         session: Session;
//         isAuthenticated: () => boolean;
//     }
// }

import '@fastify/session'
import 'fastify'

declare module '@fastify/session' {
    interface SessionData {
        user?: {
            username: string;
            email: string;
            userId: number;
            loginMethod: string;
        }
    }
    interface FastifySessionObject {
        user?: {
            username:string;
            email: string;
            userId: number;
            loginMethod: string;
        }
    }
}

declare module 'fastify' {
    interface FastifyRequest {
        isAuthenticated: () => boolean;
    }
}