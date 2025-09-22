import {Session} from '@fastify/session'

export interface PlayerSession {
    username: string;
    id: number;
    player: 1 | 2;
    gameid: number;
    loggedin: boolean;
    originalSessionId?: string;
}

export interface GameSession extends Session {
    player?: PlayerSession;
}
