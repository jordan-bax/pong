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
import { Game, player, GameStats } from './game_db.js';
// import { getGamesForPlayer } from './game_db.js';
import {player1Template, player2Template, ballvarTemplate, gamestateinterface,gameWall, pcInterface, ballInterface, aiInterface, gameWallsInterface } from './sharedValuesPong.js';
// import {player1Template, player2Template, ballvarTemplate, gamestateinterface,gameWall, pcInterface, ballInterface, aiInterface, gameWallsInterface } from '../../frontend/sharedValuesPong';
import { Gameloop} from './gameloop.js';

export enum GameTypeId {
	AI = 0,
	LOCAL = 1,
	UNKNOWN = 2,
}
interface notificationInterface {
	message: string;
	data: Date;
}
// testing notifications
var notifications: Array<notificationInterface> = [];
function addNotification(message: string): void {
notifications.push({
	message: message,
	data: new Date()
});
}
interface idandplayerposition {
	id: number | null; // Use string or null for player ID
	player: 1 | 2; // Player number
}

player2Template.x -= player2Template.width; // Adjust player 1 position to the left edge
var ai_var: aiInterface = {
	//The average (median) reaction time is 273 milliseconds
	reactionTime: 100 // Default reaction time in milliseconds
};
var ballSpeed: number;
let active: Array<Gameloop> = [];
// let games: Array<gamestateinterface|null> = [];
let matching: Array<Gameloop> = [];
let invited: Array<Gameloop> = [];
var fps: number = 30; // Default frames per second
startGame(); // Start the game loop
// async function gameturn(gamestate:gamestateinterface, use_ai: boolean) {
// 	// Check if the game is paused
// 	if (gamestate.gamePause || !gamestate.gameActive) {
// 		// If the game is paused, do not update the game state
// 		// console.log('Game is paused');
// 		return; // Exit the game loop if paused
// 	}
// 	ballmove(gamestate);

// 	if (use_ai && !(gamestate.player2.id === null) && gamestate.player2.id <= GameTypeId.AI) {
// 		simpleAi(gamestate);
// 	}
// 	playerMoveCheck(gamestate.player1);
// 	playerMoveCheck(gamestate.player2);
// 	if (gamestate.player1.score >= 11 || gamestate.player2.score >= 11) {
// 		// End the game if a player reaches 11 points
// 		console.log('Game Over! Final Score:', '-');
// 		gamestate.gamePause = true; // Pause the game
// 		gamestate.gameActive = false; // Set gameActive to false
// 		// Update the game in the database
// 		await updateGameInDB(gamestate);
// 	}
// }

// function generateUniqueGameId(): string {
//     let id: string;
//     do {
//         id = Math.random().toString(36).substr(2, 9);
//     } while (games.some(game => game && game.gameID === id));
//     return id;
// }
function lastIdInArray(arr: Array<Gameloop>): number {
	if (arr.length === 0) {
		return 0;
	}
	// Find the highest game ID in the array
	return arr.reduce((max, game) => {
		if (game && game.getId() > max) {
			return game.getId();
		}
		return max;
	}, 0);
}

async function lastId(): Promise<number> {
	if (active.length === 0 && matching.length === 0 && invited.length === 0) {
		var gameid = await dbfunc.getLastGameId(); // Get the last game ID from the database of finished games
		if (gameid === null) {
			gameid = 0; // Start with 0 if no games exist
		}
		return gameid;
	}
	// const maxId = games.reduce((max, game) => {
	// 	if (game && game.gameID > max) {
	// 		return game.gameID;
	// 	}
	// 	return max;
	// }, 0);
	// const maxMatchingId = matching.reduce((max, game) => {
	// 	if (game && game.gameID > max) {
	// 		return game.gameID;
	// 	}
	// 	return max;
	// }, 0);
	const maxId = Math.max(0, lastIdInArray(active), lastIdInArray(invited), lastIdInArray(matching));

	return maxId;
}

async function makeNewGame(type: string, playername: string, playerid: number): Promise<Gameloop > {
	// Create a new game state
	// const gameid = generateUniqueGameId(); // Generate a unique game ID



	const gameid = await lastId().then(id => id + 1); // Increment the last game ID

	var player2Id: number | null = null;
	switch (type) {
		case 'ai':
			player2Id = GameTypeId.AI; // AI player ID
			break;
		case 'local':
			player2Id = GameTypeId.LOCAL; // Local player ID
			break;
		case 'online':
			player2Id = GameTypeId.UNKNOWN; // Online player ID
			break;
		case 'ranking':
			player2Id = GameTypeId.UNKNOWN; // Ranking player ID
			break;
		default:
			throw new Error('Invalid game type');
	}
	// gameid++;
	var newGame: gamestateinterface = {
		player1: {...player1Template, id: playerid, name: playername},
		player2: {...player2Template, id: player2Id, name: 'Player 2'},
		ball: {...ballvarTemplate, speed: ballSpeed},
		gameActive: true,
		gamePause: false,
		gameID: gameid, // Use the ID from the database
		gametype: type,
	};
	console.log('New game created:', newGame);
	var gameloop = new Gameloop(newGame);
	return gameloop;
}
export async function updateGameInDB(game: gamestateinterface): Promise<void> {
	// Update the game in the database
	var winner: string = '';
	if (game.player1.score > game.player2.score) {
		winner = game.player1.name;
	}
	else if (game.player1.score == game.player2.score) {
		winner = 'Draw';
	}
	else {
		winner = game.player2.name;
	}
	const db = await dbfunc.createGame({
		id: game.gameID,
		type: game.gametype,
		player1: { id: game.player1.id, username: game.player1.name },
		player2: { id: game.player2.id, username: game.player2.name },
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

async function getGameById(gameId: number): Promise<Gameloop | null> {
	const game = active.find(game => game && game.getId() === gameId);
	return game || null;
}
async function findGameToJoin(playerid: number): Promise<Gameloop | null> {
	// Find a game that the player can join
	const index = matching.findIndex(game => game && game.getState().player1.id === playerid);
	if (index !== -1) {
		const game = matching.splice(index,1)[0];
		return game;
	}
	const index2 = matching.findIndex(game => game && game.getState().player2.id === playerid);
	if (index2 !== -1) {
		const game = matching.splice(index2,1)[0];
		return game;
	}
	return null;
}


async function addGameLoop(type : string, playername: string, playerid: number): Promise< idandplayerposition | null >{
	// Add a new game to the games array
	// if (matching.length > 0) {}
	if (!type || !playername) {
		console.error('Invalid game type or player name');
		return null; // Return null if type or playername is not provided
	}
	if (type === 'ai' || type === 'local') {
		var newGame = await makeNewGame(type, playername, playerid);
		if (!newGame) {
			console.error('Failed to create a new game');
			return null; // Return null if the new game could not be created
		}
		const ng = newGame.getId() as number; // Assign the new game to the variable
		active.push(newGame);

		return {id :ng,player: 1};
	}
	if (type !== 'online' && type !== 'ranking') {
		console.error('Invalid game type:', type);
		return null; // Return null if the game type is not valid
	}
	if (matching.length > 0) {
		// Match with an existing game
		var existingGame = matching.pop();
		if (existingGame) {
			existingGame.getState().player2 = {...player2Template, id: playerid, name: playername};
			existingGame.getState().gameActive = true; // Set the game to active
			existingGame.getState().gamePause = false; // Ensure the game is not paused
			active.push(existingGame);
			// await updateGameInDB(existingGame); // Update the game in the database
			console.log('Game updated in database:', existingGame.getId());
			console.log('Matched with existing game:', existingGame.getId());
			return {id: existingGame.getId(),player: 2};
		}
		return null; // No matching game found
	}
	// Create a new game if no matching game is found
	var newGame = await makeNewGame(type, playername, playerid);
	if (!newGame) {
		console.error('Failed to create a new game');
		return null; // Return null if the new game could not be created
	}
	matching.push(newGame); // Add the new game to the matching array
	console.log('Game added:', newGame, 'Total games:', active.length);
	return {id: newGame.getId(),player :1}; // Return the game ID with '-1' suffix for player 1
}

async function startGame() {
	console.log('Starting game loop...');
	const delay: number = gamespeed(); // Set the initial delay based on the game speed
	let intervalRef: NodeJS.Timeout | null = null;
	var use_ai: boolean = true; // Set to true if you want to use AI for player 2
	var use_ai_loop: boolean = true; // Set to true if you want to use AI for player 2
	// enableKeyListener(); // Enable key listener for player controls
	if (!intervalRef) {
		intervalRef = setInterval(() => {
			use_ai = true; // Enable AI control for player 2
		}, ai_var.reactionTime);}
	while (true) {
		if (use_ai){
			use_ai_loop = true; // Enable AI control for player 2
			use_ai = false; // Disable AI control for player 2 for second loop
		}

		for (const game of active) {
			if (!game) continue; // Skip if the game is null
			game.turn(game.getState(), use_ai_loop);
		}
		use_ai_loop = false; // Disable AI control for player 2 after the first loop
		await new Promise(resolve => setTimeout(resolve, delay));

	}
	// clearInterval(intervalRef);
	// intervalRef = null;
}
function gamespeed(): number {
	// Adjust the game speed based on the current FPS
	if (fps < 1) {
		fps = 1; // Ensure FPS is at least 1
	} else if (fps > 60) {
		fps = 60; // Cap FPS at 60
	}
	ballSpeed = ballvarTemplate.staticSpeed / fps; // Set the ball speed based on FPS
	return 1000 / fps; // Return the delay in milliseconds for the next frame
}

function findGamebyGameId(gameid: number | null): Gameloop | null {
	// Find the game by player ID
	if (!gameid ) {
		console.error('Invalid game ID:', gameid);
		return null; // Return null if game ID is not valid
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
	console.log('Game not found for game ID:', gameid);
	return null; // Return null if no game is found for the gameid); ID
}

const fastify = Fastify({logger : true});
fastify.register(fastifyStatic, {
	root: path.join(__dirname, './dist'),
	prefix: '/',
});
const sessionSecret = process.env.SESSION_SECRET;
const cookieSecret = process.env.COOKIE_SECRET;

if (!sessionSecret || !cookieSecret) {
	throw new Error('MISSING ENV VARIABLES');
}
// Register cookie and session plugins
// cookie + session support
fastify.register(fastifyCookie, {
	secret: cookieSecret, // Optional, needed only for signed cookies
	parseOptions: {}
});
fastify.register(fastifySession, {
	secret: sessionSecret, // Replace with a secure secret in production
	cookieName: 'gameSession',
	cookie: {
		maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
		secure: false, // Set to true if using HTTPS
	},
	saveUninitialized: false,
	// resave: false,
});
fastify.register(fastifyCors, { origin: true });

async function getUserIdFromSession(req: any): Promise<number | null> {
	var userId: number | null = null;
	console.log('Forwarding cookies:', req.headers.cookie);
	const user = await fetch('http://user:3001/me', {
		method: 'GET',
		credentials: 'include',
		// cookies: req.cookies,
		headers: {
			'Cookie': req.headers.cookie || '',
			'Content-Type': 'application/json',
			'x-session-id': req.cookies['sessionId'] || ''
		}
	});
	if (user.ok) {
		await user.json().then(async data => {
			console.log('User data:', data);
			userId = data.user.userId; // Assuming the user object has an 'id' property
			if (!userId) {
				console.error('User ID not found in response data');
				return null;
			}
			// await dbfunc.createPlayer(userId, 'data.user.username as string').then(() => {
			// 	console.log('Player ensured in DB with ID:', userId);
			// }).catch(err => {
			// 	console.error('Error ensuring player in DB:', err);
			// });
		});
	}
	else {
		console.error('Failed to fetch user data:', user.statusText);
	}
	return userId;
}
async function getUserIdFromRequest(req: FastifyRequest): Promise<number | null> {
	var playid: number | null = null;
	if (!req.session.player || !req.session.player.id) {
		await getUserIdFromSession(req).then((userId) => {
			if (userId) {
				playid = userId; // Assign the user ID to playid
				console.log('User ID from usersession:', playid);
			} else {
				playid = null; // Default player ID for non-logged-in users
				console.error('User ID not found in session', playid);
			}
	});
	} else {
		playid = req.session.player.id; // Use the player ID from the session
	}
	return typeof playid === 'number' ? playid : null;
}
// Start the game loop
fastify.post('/start', async (req, reply) => {
	var playid :number | null = null;
	var online: boolean = false;
	var { type, playername } = req.body as { type: string; playername: string };
	if (!req.session.player || !req.session.player.id) {
		await getUserIdFromSession(req).then((userId) => {
			if (userId) {
				playid = userId; // Assign the user ID to playid
				online = true; // Set online to true if user is logged in
				console.log('User ID from usersession:', playid);
			} else {
				playid = GameTypeId.UNKNOWN; // Default player ID for non-logged-in users
				online = false;
				playername = 'Guest';
				console.error('User ID not found in session', playid);
			}
	});
	} else {
		playid = req.session.player.id; // Use the player ID from the session
		online = req.session.player.loggedin || false; // Check if the player is logged in
		playername = req.session.player.username || 'Guest';
	}

	console.log('Starting game with AI:', type, 'Player Name:', playername);
	if (!playid) {
		console.error('Invalid player ID', playid);
		reply.status(400).send({ error: 'Invalid player ID' });
		return;
	}
	const gameid = await addGameLoop(type , playername, playid);
	if (!gameid) {
		console.error('Failed to start game');
		reply.status(400).send({ error: 'Failed to start game' });
		return;
	}

	// const splitted = gameid.split('-');
	// var num : 1 | 2;
	// if (splitted[1] == '1')
	//     num = 1;
	// else
	//     num = 2;
	if (gameid.id === null) {
		reply.status(400).send({ error: 'Game ID is null' });
		return;
	}
	req.session.player = {
		username : playername,
		id: playid,
		player: gameid.player, // Use the second part of the game ID as the player number
		gameid: gameid?.id, // Use the game ID from the game loop
		loggedin: online
	};
	console.log('Player session:', req.session.player);

	reply.send({gameid: gameid, status: 'started' });
});

fastify.post('/leave', async (req, reply) => {
	if (!req.session.player) {
		reply.status(401).send({ status: 'Unauthorized' });
		console.log('Unauthorized access: Player session not found', req.cookies.sessionId);
		return;
	}
	const gameid  = req.session.player?.gameid
	// const { gameid:gameid } = req.body as { gameid: string };
	console.log('Player leaving game with ID:', gameid);
	// const game = findGamebyplayerId(gameid);
	const game = findGamebyGameId(gameid);
	if (!game) {
		reply.status(404).send({ status: 'Game not found' });
		return;
	}


	game.playerleft(req.session.player.id as number);
	if (game.empty()) {
		active = active.filter(g => g && g.getId() !== game.getId());
		console.log('Game with ID:', gameid, 'has been removed. Remaining games:', active.length);
	}
	reply.send({ status: 'left', gameid: gameid });
});



// Pause the game
fastify.post('/pause', async (req, reply) => {
	if (!req.session.player) {
		reply.status(401).send({ status: 'Unauthorized' });
		console.error('Unauthorized access: Player session not found');
		return;
	}
	// const { gameid} = req.query as { gameid: string };

	// console.log('Moving player:', player, 'Direction:', direction, 'Game ID:', gameid);
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
	var player: 1|2 | null = req.session.player?.player; // Default player is 1
	// const { gameid} = req.query as { gameid: string };
	// const player = gameid.split('-')[1]; // Extract player from gameid
	const game = findGamebyGameId(req.session.player?.gameid);
	if (!game) {
		reply.status(404).send({ status: 'no Game' });
		return;
	}
	if (game.getState().gamePause) {
		reply.status(400).send({ status: 'paused' });
		return;
	}
	if (game.getState().gametype === 'local') {
		player = (req.query as { player: 1|2 }).player; // Default to player 1 if not specified
	}
	console.log('Moving player:', player, 'Direction:', direction, 'Game ID:', game.getId());
	if (player == 1) {
		if (direction === 'up') {
			game.getState().player1.y -= game.getState().player1.speed;
		} else if (direction === 'down') {
			game.getState().player1.y += game.getState().player1.speed;
		}
		// playerMoveCheck(game.player1);
	} else if (player == 2) {
		if (direction === 'up') {
			game.getState().player2.y -= game.getState().player2.speed;
		} else if (direction === 'down') {
			game.getState().player2.y += game.getState().player2.speed;
		}
		// playerMoveCheck(game.player2);
	}
	reply.send({ status: 'moved'});
});

// // Resume the game
// fastify.post('/resume', async (req, reply) => {
//     pauze = false;
//     reply.send({ status: 'resumed' });
// });

// Get the current game state
fastify.get('/state', async (req, reply) => {
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

fastify.post('/db/addPlayer', async (req, reply) => {
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
fastify.get('/db/getGamesForPlayer', async (req, reply) => {
	var playerid = GameTypeId.UNKNOWN; // Default player ID for unknown players
	if (req.session.player && req.session.player.id) {
		playerid = req.session.player.id;
	} else if (req.session) {
		const userId = await getUserIdFromSession(req);
		if (userId) {
			playerid = userId; // Use the user ID from the session
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
// add a new game to the database
fastify.post('/db/addGame', async (req, reply) => {
	const { player1, player2, player1Score, player2Score, winner , gameID, gametype } = req.body as {
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
			id: 0, // Assuming ID is auto-incremented in the database
			type: gametype,
			player1: player1,
			player2: player2,
			player1Score: player1Score,
			player2Score: player2Score,
			winner: winner,
			createdAt: new Date(), // Set the current date as createdAt
		});
		reply.send({ status: 'game added', gameId: result });
	} catch (error) {
		console.error('Error adding game to database:', error);
		reply.status(500).send({ error: 'Failed to add game' });
	}
});
fastify.get('/db/getGameById', async (req, reply) => {
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
// Get all games from the database
// fastify.get('/db/getAllGames', async (req, reply) => {
//     console.log('Fetching all games from the database...');
//     try {
//         const games = await dbfunc.getAllGames();
//         reply.send(games);
//     } catch (error) {
//         console.error('Error fetching all games:', error);
//         reply.status(500).send({ error: 'Failed to fetch games' });
//     }
// });
fastify.get('/db/getGameStats', async (req, reply) => {
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
fastify.post('/setsession', { schema: { body: sessionBodySchema } }, async (req, reply) => {
	const { username, id } = req.body as { username: string; id: number };
	if (!username || !id) {
		reply.status(400).send({ error: 'Username and ID are required' });
		return;
	}
	req.session.player = {
		username: username,
		id: id,
		player: 1, // Default to player 1
		gameid: 0,
		loggedin: true
	};
	if (!req.session.player) {
		reply.status(500).send({ error: 'Failed to set session in set session' });
		return;
	}
	console.log('Session set for user:', req.session.player);
	reply.send({ status: 'session set', player: req.session.player });
});

fastify.post('/clearsession', async (req, reply) => {
	req.session.player = undefined;
	console.log('Session cleared');
	reply.send({ status: 'session cleared' });
});

// To send to a specific user:
async function sendNotificationToUser(userId: number, message: string)  {
	const response = await fetch(`http://notification:3005/add?userId=${userId}`, {
		method: 'POST',
		credentials: 'include', // Include credentials for session management
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

fastify.get('/getopengames', async (req, reply) => {
	var id = await getUserIdFromRequest(req);
	if (!id) {
		id = GameTypeId.UNKNOWN; // Default player ID for unknown users
	}
	const openGames = invited.filter(game => game.getState().player1.id == id || game.getState().player2.id == id);
	reply.send(openGames);
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



fastify.post('/join', async (req, reply) => {
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
	if (invited[gameIndex].getState().player1.id === req.session.player.id ) {
		invited[gameIndex].getState().player1.active = true; // Mark player 1 as active
	}
	else if (invited[gameIndex].getState().player2.id === req.session.player.id ) {
		invited[gameIndex].getState().player2.active = true; // Mark player 2 as active
	}
	req.session.player.gameid = gameid;

	if (invited[gameIndex].getState().player1.active && invited[gameIndex].getState().player2.active) {
		const game = invited.splice(gameIndex, 1)[0];
		if (!game) {
			reply.status(404).send({ error: 'Game not found' });
			return;
		}
		active.push(game); // Move the game from invited to active games
		game.getState().gameActive = true; // Set the game to active
		game.getState().gamePause = true; // Ensure the game is not paused
		console.log('Game joined and moved to active games:', game);
	}
	reply.send({ status: 'joined', gameid: gameid });
});

async function getUserNameById(userId: number): Promise<string> {
	if (userId <= 0) {
		return 'ai'; // Return 'ai' for AI players
	}
	const player = await dbfunc.getPlayerById(userId);
	if (player) {
		return player.username;
	}
	return 'Guest';
}

fastify.post('/preparegame', {schema:{body: matchingBodySchema} }, async (req, reply) => {
	const { playerid1, playerid2, gametype } = req.body as { playerid1: number; playerid2: number; gametype: string };
	console.log('Matching players:', playerid1, playerid2, 'Game type:', gametype);
	// Implement your matching logic here
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
	// if (player1Name === 'Guest' || player2Name === 'Guest') {
	// 	reply.status(400).send({ error: 'One or both player IDs are invalid' });
	// 	return;
	// }
	const gameid = await lastId().then(id => id + 1); // Generate a new game ID
	const newGame: gamestateinterface = {
		player1: {...player1Template, id: playerid1, name: player1Name},
		player2: {...player2Template, id: playerid2, name: player2Name},
		ball: {...ballvarTemplate, speed: ballSpeed},
		gameActive: true,
		gamePause: true,
		gameID: gameid,
		gametype: gametype,
	};
	if (newGame.player1.id !== null && newGame.player1.id <= 0)
		newGame.player1.active = true; // AI players are always active
	if (newGame.player2.id !== null && newGame.player2.id <= 0)
		newGame.player2.active = true;
	console.log('New game created for matching:', newGame);
	const games = new Gameloop(newGame);
	if (gametype === 'tournament') {
		const { tournamentId } = req.body as { tournamentId: number };
		games.setTournamentId(tournamentId);
	}
	invited.push(games); // Add the new game to the invited array
	if (gametype == 'tournament')
	{
		if (playerid1 > 0)
			await sendNotificationToUser(playerid1, `You have been matched for a tournament game`);
		if (playerid2 > 0)
			await sendNotificationToUser(playerid2, `You have been matched for a tournament game`);
	}
	else {
		if (playerid1 > 0)
			await sendNotificationToUser(playerid1, `You have been invited to play a game`);
		if (playerid2 > 0)
			await sendNotificationToUser(playerid2, `You have been invited to play a game`);
	}
	reply.send({ gameid: gameid, status: 'matched' });

});

async function prepareDatabase() {
	await dbfunc.initializeDatabase().catch(console.error);

	await dbfunc.createPlayer(GameTypeId.AI, 'ai').catch(console.error);
	await dbfunc.createPlayer(GameTypeId.LOCAL, 'local').catch(console.error);
	await dbfunc.createPlayer(GameTypeId.UNKNOWN, 'anonymous').catch(console.error);
	console.log('Database prepared');
}

fastify.listen({host: "0.0.0.0", port: 3002 }, err => {
	// seedDatabase();
	if (err) {
		fastify.log.error((err));
		process.exit(1);
	}
	prepareDatabase().catch(console.error);
	addNotification('Server started on port 3002');
});

