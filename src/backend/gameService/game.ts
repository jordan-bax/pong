import { fastify as Fastify } from 'fastify';
import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import fastifyCors from '@fastify/cors';

import fastifyStatic from '@fastify/static';
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import path from 'path';
import '@fastify/session';

import * as dbfunc from './game_db.js';
import { player1Template, player2Template, ballvarTemplate, gamestateinterface, aiInterface } from './sharedValuesPong.js';
import { Gameloop } from './gameloop.js';

import { PlayerSession, GameSession } from './gameTypes';

export enum GameTypeId {
    AI = 0,
    LOCAL = 1,
    UNKNOWN = 2,
}

interface idandplayerposition {
    id: number | null;
    player: 1 | 2;
}

player2Template.x -= player2Template.width;
let ai_var: aiInterface = {
    reactionTime: 100
};

let ballSpeed: number;
let active: Array<Gameloop> = [];
let matching: Array<Gameloop> = [];
let invited: Array<Gameloop> = [];
let fps: number = 10;

startGame();

function lastIdInArray(arr: Array<Gameloop>): number {
    if (arr.length === 0) {
        return 0;
    }

    return arr.reduce((max, game) => {
        if (game && game.getId() > max) {
            return game.getId();
        }

        return max;
    }, 0);
}

async function lastId(): Promise<number> {
    if (active.length === 0 && matching.length === 0 && invited.length === 0) {
        let gameid = await dbfunc.getLastGameId();
        if (gameid === null) {
            gameid = 0;
        }
        return gameid;
    }

    const maxId = Math.max(0, lastIdInArray(active), lastIdInArray(invited), lastIdInArray(matching));
    return maxId;
}

async function makeNewGame(type: string, playername: string, playerid: number): Promise<Gameloop> {
    const gameid = await lastId().then(id => id + 1);

    let player2Id: number | null = null;
    switch (type) {
        case 'ai':
            player2Id = GameTypeId.AI;
            break;
        case 'local':
            player2Id = GameTypeId.LOCAL;
            break;
        case 'online':
            player2Id = GameTypeId.UNKNOWN;
            break;
        case 'ranking':
            player2Id = GameTypeId.UNKNOWN;
            break;
        default:
            throw new Error('Invalid game type');
    }

    let newGame: gamestateinterface = {
        player1: { ...player1Template, id: playerid, name: playername },
        player2: { ...player2Template, id: player2Id, name: 'Player 2' },
        ball: { ...ballvarTemplate, speed: ballSpeed },
        gameActive: true,
        gamePause: false,
        gameID: gameid,
        gametype: type,
    };

    console.log('New game created:', newGame);
    let gameloop = new Gameloop(newGame);
    return gameloop;
}

export async function updateGameInDB(game: gamestateinterface): Promise<void> {
    let id1 = game.player1.id;
    if (id1 === null || id1 === undefined) {
        id1 = 0;
    }
    if (id1 < 0 && id1 > -3600) {
        id1 = 0;
    }

    let id2 = game.player2.id;
    if (id2 === null || id2 === undefined || id2 < 0) {
        id2 = 0;
    }
    if (id2 < 0 && id2 > -3600) {
        id2 = 0;
    }

    let winner: string = '';
    if (game.player1.score > game.player2.score) {
        winner = game.player1.name;
    } else if (game.player1.score == game.player2.score) {
        winner = 'Draw';
    } else {
        winner = game.player2.name;
    }

    const db = await dbfunc.createGame({
        id: game.gameID,
        type: game.gametype,
        player1: { id: id1, username: game.player1.name },
        player2: { id: id2, username: game.player2.name },
        player1Score: game.player1.score,
        player2Score: game.player2.score,
        winner: winner,
        createdAt: null
    });
    if (!db) {
        throw new Error('Failed to update game in database');
    }
    console.log('Game updated in database:', game.gameID);
}

async function addGameLoop(type: string, playername: string, playerid: number): Promise<idandplayerposition | null> {
    if (!type || !playername) {
        console.error('Invalid game type or player name');
        return null;
    }

    if (type === 'ai' || type === 'local') {
        let newGame = await makeNewGame(type, playername, playerid);
        if (!newGame) {
            console.error('Failed to create a new game');
            return null;
        }

        const ng = newGame.getId() as number;
        active.push(newGame);

        return { id: ng, player: 1 };
    }

    if (type !== 'online' && type !== 'ranking') {
        console.error('Invalid game type:', type);
        return null;
    }

    if (matching.length > 0) {
        let existingGame = matching.pop();
        if (existingGame) {
            existingGame.getState().player2 = { ...player2Template, id: playerid, name: playername };
            existingGame.getState().gameActive = true;
            existingGame.getState().gamePause = false;
            active.push(existingGame);
            console.log('Game updated in database:', existingGame.getId());
            console.log('Matched with existing game:', existingGame.getId());
            return { id: existingGame.getId(), player: 2 };
        }

        return null;
    }

    let newGame = await makeNewGame(type, playername, playerid);
    if (!newGame) {
        console.error('Failed to create a new game');
        return null;
    }

    matching.push(newGame);
    console.log('Game added:', newGame, 'Total games:', active.length);
    return { id: newGame.getId(), player: 1 };
}

async function startGame() {
    console.log('Starting game loop...');
    const delay: number = gamespeed();
    let intervalRef: NodeJS.Timeout | null = null;
    let use_ai: boolean = true;
    let use_ai_loop: boolean = true;

    if (!intervalRef) {
        intervalRef = setInterval(() => {
            use_ai = true;
        }, ai_var.reactionTime);
    }

    while (true) {
        if (use_ai) {
            use_ai_loop = true;
            use_ai = false;
        }

        for (const game of active) {
            if (!game) {
                continue;
            }
            game.turn(game.getState(), use_ai_loop);
        }

        use_ai_loop = false;
        await new Promise(resolve => setTimeout(resolve, delay));

    }
}

function gamespeed(): number {
    if (fps < 1) {
        fps = 1;
    } else if (fps > 60) {
        fps = 60;
    }

    ballSpeed = ballvarTemplate.staticSpeed / fps;
    return 1000 / fps;
}

function findGamebyGameId(gameid: number | null): Gameloop | null {
    if (!gameid) {
        console.error('Invalid game ID:', gameid);
        return null;
    }

    for (const game of active) {
        if (game && game.getId() === gameid) {
            return game;
        }
    }

    for (const game of matching) {
        if (game && game.getId() === gameid) {
            return game;
        }
    }

    for (const game of invited) {
        if (game && game.getId() === gameid) {
            return game;
        }
    }

    console.log('Game not found for game ID:', gameid);
    return null;
}

const fastify = Fastify({ logger: true });
fastify.register(fastifyStatic, {
    root: path.join(__dirname, './dist'),
    prefix: '/',
});
const sessionSecret = process.env.SESSION_SECRET;
const cookieSecret = process.env.COOKIE_SECRET;

if (!sessionSecret || !cookieSecret) {
    throw new Error('MISSING ENV VARIABLES');
}

fastify.register(fastifyCookie, {
    secret: cookieSecret,
    parseOptions: {}
});

fastify.register(fastifySession, {
    secret: sessionSecret,
    cookieName: 'gameSession',
    cookie: {
        maxAge: 60 * 60 * 1000,
        secure: false,
    },
    saveUninitialized: false,
});

fastify.register(fastifyCors, { origin: true });

async function getUserIdFromSession(req: any): Promise<number | null> {
    let userId: number | null = null;
    console.log('Forwarding cookies:', req.headers.cookie);
    const user = await fetch('http://user:3001/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Cookie': req.headers.cookie || '',
            'Content-Type': 'application/json',
            'x-session-id': req.cookies['sessionId'] || ''
        }
    });

    if (user.ok) {
        await user.json().then(async data => {
            console.log('User data:', data);
            userId = data.user.userId;
            if (!userId) {
                console.error('User ID not found in response data');
                return null;
            }
        });
    } else {
        console.error('Failed to fetch user data:', user.statusText);
    }

    return userId;
}

async function getUserIdFromRequest(req: FastifyRequest): Promise<number | null> {
    let playid: number | null = null;
    if (!req.session.player || !req.session.player.id) {
        await getUserIdFromSession(req).then((userId) => {
            if (userId) {
                playid = userId;
                console.log('User ID from usersession:', playid);
            } else {
                playid = null;
                console.error('User ID not found in session', playid);
            }
        });
    } else {
        playid = req.session.player.id;
    }

    return typeof playid === 'number' ? playid : null;
}

fastify.post('/start', async (req: FastifyRequest, reply: FastifyReply) => {
    let playid: number | null = null;
    let online: boolean = false;
    let { type, playername } = req.body as { type: string; playername: string };
    if (!req.session.player || !req.session.player.id) {
        await getUserIdFromSession(req).then((userId) => {
            if (userId) {
                playid = userId;
                online = true;
                playername = req.session.player?.username || "waarom";
                console.log('User ID from usersession:', playid);
            } else {
                playid = GameTypeId.UNKNOWN;
                online = false;
                playername = 'Guest error';
                console.error('User ID not found in session', playid);
            }
        });
    } else {
        playid = req.session.player.id;
        online = req.session.player.loggedin || false;
        playername = req.session.player.username || 'Guest';
    }

    console.log('Starting game with AI:', type, 'Player Name:', playername);
    if (!playid) {
        console.error('Invalid player ID', playid);
        reply.status(400).send({ error: 'Invalid player ID' });
        return;
    }

    const gameid = await addGameLoop(type, playername, playid);
    if (!gameid) {
        console.error('Failed to start game');
        reply.status(400).send({ error: 'Failed to start game' });
        return;
    }

    if (gameid.id === null) {
        reply.status(400).send({ error: 'Game ID is null' });
        return;
    }

    req.session.player = {
        username: playername,
        id: playid,
        player: gameid.player,
        gameid: gameid?.id,
        loggedin: online
    };
    console.log('Player session:', req.session.player);

    reply.send({ gameid: gameid, status: 'started' });
});

fastify.post('/leave', async (req: FastifyRequest, reply: FastifyReply) => {
    if (!req.session.player) {
        reply.status(401).send({ status: 'Unauthorized' });
        console.log('Unauthorized access: Player session not found', req.cookies.sessionId);
        return;
    }

    const gameid = req.session.player?.gameid
    console.log('Player leaving game with ID:', gameid);
    const game = findGamebyGameId(gameid);
    if (!game) {
        reply.status(404).send({ status: 'Game not found' });
        return;
    }

    const gameState = game.getState()
    if (gameState.player1.score !== 11 && gameState.player2.score !== 11) {
        if (req.session['player']['player'] === 1) {
            gameState.player2.score = 11
        } else {
            gameState.player1.score = 11
        }
    }

    game.playerleft(req.session.player.id as number);
    if (game.empty()) {
        active = active.filter(g => g && g.getId() !== game.getId());
        console.log('Game with ID:', gameid, 'has been removed. Remaining games:', active.length);
    }

    reply.send({ status: 'left', gameid: gameid });
});

fastify.post('/pause', async (req: FastifyRequest, reply: FastifyReply) => {
    if (!req.session.player) {
        reply.status(401).send({ status: 'Unauthorized' });
        console.error('Unauthorized access: Player session not found');
        return;
    }

    const game = findGamebyGameId(req.session.player?.gameid);
    if (!game) {
        reply.status(404).send({ status: 'Game not found' });
        return;
    }

    game.pause();
    reply.send({ status: 'paused' });
});

// move the player paddle
fastify.post('/move', async (req, reply) => {
    if (!req.session.player) {
        reply.status(401).send({ status: 'Unauthorized' });
        console.error('Unauthorized access: Player session not found');
        return;
    }
    const { direction } = req.body as { direction: 'up' | 'down' };
    var player: 1 | 2 | null = req.session.player?.player;
    const game = findGamebyGameId(req.session.player?.gameid);
    if (!game) {
        reply.status(404).send({ status: 'no Game' });
        return;
    }
    if (game.getState().gameActive === false) {
        reply.status(400).send({ status: 'inactive' });
        return;
    }
    // if (game.getState().gamePause) {
    // 	reply.status(400).send({ status: 'paused' });
    // 	return;
    // }
    if (game.getState().gametype === 'local') {
        player = (req.query as { player: 1 | 2 }).player;
    }
    console.log('Moving player:', player, 'Direction:', direction, 'Game ID:', game.getId());
    if (player == 1) {
        if (direction === 'up') {
            game.getState().player1.y -= game.getState().player1.speed;
        } else if (direction === 'down') {
            game.getState().player1.y += game.getState().player1.speed;
        }
        game.playerMoveCheck(game.getState().player1);
    } else if (player == 2) {
        if (direction === 'up') {
            game.getState().player2.y -= game.getState().player2.speed;
        } else if (direction === 'down') {
            game.getState().player2.y += game.getState().player2.speed;
        }
        game.playerMoveCheck(game.getState().player2);
    }
    reply.send({ status: 'moved' });
});

fastify.get('/state', async (req: FastifyRequest, reply: FastifyReply) => {
    if (!req.session.player) {
        reply.status(401).send({ status: 'Unauthorized' });
        console.log('Unauthorized access: Player session not found', req.cookies.sessionId);
        return;
    }

    console.log('Fetching game state...', active.length);
    console.log('Player session:', req.session.player, 'session ID:', req.cookies.sessionId);
    const game = findGamebyGameId(req.session.player?.gameid);
    if (!game) {
        reply.status(404).send({ error: 'Game not found' });
        return;
    }

    reply.send(game.getState() || { error: 'Game not found' });
});

fastify.post('/db/addPlayer', async (req: FastifyRequest, reply: FastifyReply) => {
    const { username, id } = req.body as { username: string; id: number };
    console.log('Adding player to database:', username, 'Player ID:', id);
    try {
        const result = await dbfunc.createPlayer(id, username);
        reply.send({ status: 'player added', id: result });
    } catch (error) {
        console.error('Error adding player to database:', error);
        reply.status(500).send({ error: 'Failed to add player' });
    }
});

fastify.get('/db/getGamesForPlayer', async (req: FastifyRequest, reply: FastifyReply) => {
    let playerid = GameTypeId.UNKNOWN;
    if (req.session.player && req.session.player.id) {
        playerid = req.session.player.id;
    } else if (req.session) {
        const userId = await getUserIdFromSession(req);
        if (userId) {
            playerid = userId;
        } else {
            console.error('User ID not found in session');
        }
    } else {
        console.error('Player ID is missing in the query parameters');
    }

    console.log('Fetching games for player ID:', playerid);
    try {
        const games = await dbfunc.getGamesForPlayer(playerid);
        if (!games || games.length === 0) {
            reply.status(404).send({ error: 'No games found for player' });
            console.log('No games found for player ID:', playerid, 'Games:', games);
            return;
        }

        console.error('Games fetched for player ID:', playerid, 'Number of games:', games);
        console.log('Games fetched for player ID:', playerid, 'Number of games:', games.length);
        reply.send(games);
    } catch (error) {
        console.error('Error fetching games for player:', error);
        reply.status(500).send({ error: 'Failed to fetch games for player' });
    }
});

fastify.post('/db/addGame', async (req: FastifyRequest, reply: FastifyReply) => {
    const { player1, player2, player1Score, player2Score, winner, gameID, gametype } = req.body as {
        player1: { id: number; username: string };
        player2: { id: number; username: string };
        player1Score: number;
        player2Score: number;
        winner: string;
        gameID: string;
        gametype: string;
    };
    console.log('Adding game to database:', gameID, 'Player 1:', player1.username, 'Player 2:', player2.username);
    try {
        const result = await dbfunc.createGame({
            id: 0,
            type: gametype,
            player1: player1,
            player2: player2,
            player1Score: player1Score,
            player2Score: player2Score,
            winner: winner,
            createdAt: new Date(),
        });
        reply.send({ status: 'game added', gameId: result });
    } catch (error) {
        console.error('Error adding game to database:', error);
        reply.status(500).send({ error: 'Failed to add game' });
    }
});

fastify.get('/db/getGameById', async (req: FastifyRequest, reply: FastifyReply) => {
    const { gameId } = req.query as { gameId: number };
    console.log('Fetching game by ID:', gameId);
    try {
        const game = await dbfunc.getGameById(gameId);
        if (!game) {
            reply.status(404).send({ error: 'Game not found' });
            return;
        }
        reply.send(game);
    } catch (error) {
        console.error('Error fetching game by ID:', error);
        reply.status(500).send({ error: 'Failed to fetch game' });
    }
});

fastify.get('/db/getGameStats', async (req: FastifyRequest, reply: FastifyReply) => {
    const { playerid } = req.query as { playerid: number };
    console.log('Fetching game stats for game ID:', playerid);
    try {
        const stats = await dbfunc.getGameStatsByPlayerId(playerid);
        if (!stats) {
            reply.status(404).send({ error: 'Game stats not found' });
            return;
        }
        reply.send(stats);
    } catch (error) {
        console.error('Error fetching game stats:', error);
        reply.status(500).send({ error: 'Failed to fetch game stats' });
    }
});

const sessionBodySchema = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        id: { type: 'number' },
    },
    required: ['username', 'id']
};

fastify.post('/setsession', async (req: FastifyRequest, reply: FastifyReply) => {
    const { username, userId, sessionId } = req.body as {
        username: string;
        userId: number;
        sessionId: string;
    };

    const session = req.session as GameSession;

    session.player = {
        username: username,
        id: userId,
        player: 1,
        gameid: 0,
        loggedin: true,
        originalSessionId: sessionId
    };

    console.log('Player session set:', session.player);
    reply.send({ status: 'session set', player: session.player });
    // fastify.post('/setsession', { schema: { body: sessionBodySchema } }, async (req: FastifyRequest, reply: FastifyReply) => {
    //         const { username, userId, sessionId } = req.body as {
    //         username: string;
    //         userId: number;
    //         sessionId: string;
    //     };
    //
    //     if (!username || !userId) {
    //         reply.status(400).send({ error: 'Username and ID are required' });
    //         return;
    //     }
    //
    //     req.session.player = {
    //         username: username,
    //         id: userId,
    //         player: 1,
    //         gameid: 0,
    //         loggedin: true
    //     };
    //
    //     // Also store the original session ID for reference
    //     req.session.originalSessionId = sessionId;
    //
    //     console.log('Player session set:', req.session.player, 'session ID:', sessionId);
    //     reply.send({ status: 'session set', player: req.session.player });
    // });

    fastify.post('/clearsession', async (req: FastifyRequest, reply: FastifyReply) => {
        req.session.player = undefined;
        console.log('Session cleared');
        reply.send({ status: 'session cleared' });
    });

    async function sendNotificationToUser(userId: number, message: string) {
        const response = await fetch(`http://notification:3005/add?userId=${userId}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            console.error('Failed to send notification:', response.statusText);
        } else {
            const data = await response.json();
            console.log('Notification sent successfully:', data);
        }
    }

    fastify.get('/getopengames', async (req: FastifyRequest, reply: FastifyReply) => {
        let id = await getUserIdFromRequest(req);
        if (!id) {
            id = GameTypeId.UNKNOWN;
        }

        const openGames = invited.filter(game => game.getState().player1.id == id || game.getState().player2.id == id);
        let open: gamestateinterface[] = [];
        for (const game of openGames) {
            open.push(game.getState());
        }

        console.log('Open games for player ID:', id, 'Number of open games:', open.length);
        reply.send(open);
    });

    const matchingBodySchema = {
        type: 'object',
        properties: {
            playerid1: { type: 'number' },
            playerid2: { type: 'number' },
            gametype: { type: 'string' },
            tournamentId: { type: 'number' }
        },
        required: ['playerid1', 'playerid2', 'gametype']
    };

    fastify.post('/join', async (req: FastifyRequest, reply: FastifyReply) => {
        if (!req.session.player || !req.session.player.id) {
            reply.status(401).send({ status: 'Unauthorized' });
            console.log('Unauthorized access: Player session not found', req.cookies.sessionId);
            return;
        }

        const { gameid } = req.body as { gameid: number };
        console.log('Joining game with ID:', gameid);
        const gameIndex = invited.findIndex(game => game && game.getId() === gameid);
        if (gameIndex === -1) {
            reply.status(404).send({ error: 'Game not found' });
            return;
        }

        if (!invited[gameIndex]) {
            reply.status(404).send({ error: 'Game not found' });
            return;
        }

        if (invited[gameIndex].getState().player1.id === req.session.player.id) {
            invited[gameIndex].getState().player1.active = true;
        } else if (invited[gameIndex].getState().player2.id === req.session.player.id) {
            invited[gameIndex].getState().player2.active = true;
        }

        req.session.player.gameid = gameid;
        if (invited[gameIndex].getState().player1.active && invited[gameIndex].getState().player2.active) {
            const game = invited.splice(gameIndex, 1)[0];
            if (!game) {
                reply.status(404).send({ error: 'Game not found' });
                return;
            }

            active.push(game);
            game.getState().gameActive = true;
            game.getState().gamePause = true;
            console.log('Game joined and moved to active games:', game);
        }

        reply.send({ status: 'joined', gameid: gameid });
    });

    async function getUserNameById(userId: number): Promise<string> {
        if (userId <= 0 && userId > -3600) {
            return 'ai';
        }

        const player = await dbfunc.getPlayerById(userId);
        if (player) {
            return player.username;
        }

        return 'Guest';
    }

    fastify.post('/preparegame', { schema: { body: matchingBodySchema } }, async (req: FastifyRequest, reply: FastifyReply) => {
        const { playerid1, playerid2, gametype } = req.body as { playerid1: number; playerid2: number; gametype: string };
        console.log('Matching players:', playerid1, playerid2, 'Game type:', gametype);
        if (playerid1 === undefined || playerid2 === undefined || !gametype) {
            reply.status(400).send({ error: 'Invalid player IDs or game type' });
            return;
        }

        if (playerid1 === playerid2) {
            reply.status(400).send({ error: 'Player IDs must be different' });
            return;
        }

        const player1Name = await getUserNameById(playerid1);
        const player2Name = await getUserNameById(playerid2);
        console.log('Player names:', player1Name, player2Name);
        const gameid = await lastId().then(id => id + 1);
        const newGame: gamestateinterface = {
            player1: { ...player1Template, id: playerid1, name: player1Name },
            player2: { ...player2Template, id: playerid2, name: player2Name },
            ball: { ...ballvarTemplate, speed: ballSpeed },
            gameActive: true,
            gamePause: true,
            gameID: gameid,
            gametype: gametype,
        };

        if (newGame.player1.id !== null && newGame.player1.id <= 0 && newGame.player1.id > -3600) {
            newGame.player1.active = true;
        }

        if (newGame.player2.id !== null && newGame.player2.id <= 0 && newGame.player2.id > -3600) {
            newGame.player2.active = true;
        }

        console.log('New game created for matching:', newGame);
        const games = new Gameloop(newGame);
        if (gametype === 'tournament') {
            const { tournamentId } = req.body as { tournamentId: number };
            console.error("tournammentID from backend: ", tournamentId)
            games.setTournamentId(tournamentId);
        }

        invited.push(games);
        if (gametype == 'tournament') {
            if (playerid1 > 0) {
                await sendNotificationToUser(playerid1, `You have been matched for a tournament game`);
            }

            if (playerid2 > 0) {
                await sendNotificationToUser(playerid2, `You have been matched for a tournament game`);
            }
        } else {
            if (playerid1 > 0) {
                await sendNotificationToUser(playerid1, `You have been invited to play a game`);
            }

            if (playerid2 > 0) {
                await sendNotificationToUser(playerid2, `You have been invited to play a game`);
            }
        }

        reply.status(201).send({ matchID: gameid, status: 'matched' });
    });

    async function prepareDatabase() {
        await dbfunc.initializeDatabase().catch(console.error);

        await dbfunc.createPlayer(GameTypeId.AI, 'ai').catch(console.error);
        await dbfunc.createPlayer(GameTypeId.LOCAL, 'local').catch(console.error);
        await dbfunc.createPlayer(GameTypeId.UNKNOWN, 'anonymous').catch(console.error);
        console.log('Database prepared');
    }

    fastify.listen({ host: "0.0.0.0", port: 3002 }, err => {
        if (err) {
            fastify.log.error((err));
            process.exit(1);
        }
        prepareDatabase().catch(console.error);
    });
