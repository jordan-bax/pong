import 'fastify'

// Session interface for TypeScript
declare module 'fastify' {
    // interface SessionData {
    // }
    interface Session {
        player?: {
            username: string;
            id: number | undefined;
            player: 1 | 2;
            loggedin: boolean;
            gameid: string;
        }
        //     user?: {
            //         email: string;
            //         userId: number;
            //         loginMethod: string;
            //     }
        }
            
    interface FastifyRequest {
        session: Session;
        // isAuthenticated: () => boolean;
    }
}