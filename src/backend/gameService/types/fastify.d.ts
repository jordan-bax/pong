import 'fastify'

// Session interface for TypeScript
declare module 'fastify' {
    // interface SessionData {
    // }
    interface Session {
        player?: {
            username: string;
            id: number | null;
            player: 1 | 2;
            loggedin: boolean;
            gameid: number;
        }
        //     user?: {
            //         email: string;
            //         userId: number;
            //         loginMethod: string;
            //     }
        }
            
    interface FastifyRequest {
        session: Session;
        isAuthenticated: () => boolean;
    }
}