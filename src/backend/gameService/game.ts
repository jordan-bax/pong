import { fastify as Fastify } from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';

import {player1Template, player2Template, ballvarTemplate, gamestateinterface,gameWall, pcInterface, ballInterface, aiInterface, gameWallsInterface } from './sharedValuesPong.js';
// import {player1Template, player2Template, ballvarTemplate, gamestateinterface,gameWall, pcInterface, ballInterface, aiInterface, gameWallsInterface } from '../../frontend/sharedValuesPong';
import { str } from 'ajv';
import { get } from 'http';

// var player1: pcInterface = {
// 	x: 2,
// 	y: 1,
// 	speed: 10,
// 	height: 25,
// 	width: 4,
// 	score: 0
// };
// var player2: pcInterface = {
    // 	x: 198,
    // 	y: 50,
    // 	speed: 10,
    // 	height: 25,
    // 	width: 4,
    // 	score: 0
    // };
    // var ballvar: ballInterface = {
        //     x: 98,
        //     y: 98,
        //     dx: 2,
        //     dy: 5,
        //     speed: 2,
        //     staticSpeed: 20,
        //     height: 4,
        //     width: 4
// };
var ai_var: aiInterface = {
    //The average (median) reaction time is 273 milliseconds
	reactionTime: 100 // Default reaction time in milliseconds
};
var ballSpeed: number;
var sizeAduster: number = 1;
var pauze: boolean = true;
let games: Array<gamestateinterface|null> = [];
let matching: Array<gamestateinterface|null> = [];
var fps: number = 30; // Default frames per second
startGame(); // Start the game loop
async function gameturn(gamestate:gamestateinterface, use_ai: boolean) {
    // Check if the game is paused
    if (gamestate.gamePause || !gamestate.gameActive) {
        // If the game is paused, do not update the game state
        // console.log('Game is paused');
        return; // Exit the game loop if paused
    }
    ballmove(gamestate);
    if (use_ai && gamestate.gametype === 'ai') {
        simpleAi(gamestate);
    }
    playerMoveCheck(gamestate.player1);
    playerMoveCheck(gamestate.player2);
    if (gamestate.player1.score >= 11 || gamestate.player2.score >= 11) {
        // End the game if a player reaches 11 points
        console.log('Game Over! Final Score:', '-');
        gamestate.gamePause = true; // Pause the game
        gamestate.gameActive = false; // Set gameActive to false
    }
}

function generateUniqueGameId(): string {
    let id: string;
    do {
        id = Math.random().toString(36).substr(2, 9);
    } while (games.some(game => game && game.gameID === id));
    return id;
}

function makeNewGame(type: string, playername: string): gamestateinterface {
    // Create a new game state
    const gameid = generateUniqueGameId(); // Generate a unique game ID
    var newGame: gamestateinterface = {
        player1: {...player1Template, id: 'player1', name: 'Player 1'},
        player2: {...player2Template, id: 'player2', name: 'Player 2', x : player2Template.x - player2Template.width},
        ball: {...ballvarTemplate, speed: ballSpeed},
        gameActive: true,
        gamePause: false,
        gameID: gameid,
        gametype: type,
    };
    return newGame;
}
function addGameLoop(type : string, playername: string): string|null {
    // Add a new game to the games array
    // if (matching.length > 0) {}
    if (!type || !playername) {
        console.error('Invalid game type or player name');
        return null; // Return null if type or playername is not provided
    }
    if (type === 'ai' || type === 'local') {
        var newGame = makeNewGame(type, playername);
        games.push(newGame);
        
        return newGame.gameID + '-1';
    }
    if (type !== 'online' && type !== 'ranking') {
        console.error('Invalid game type:', type);
        return null; // Return null if the game type is not valid
    }
    if (matching.length > 0) {
        // Match with an existing game
        var existingGame = matching.pop();
        if (existingGame) {
            existingGame.player2 = {...player2Template, id: 'player2', name: playername};
            existingGame.gameActive = true; // Set the game to active
            existingGame.gamePause = false; // Ensure the game is not paused
            games.push(existingGame);
            console.log('Matched with existing game:', existingGame.gameID);
            return existingGame.gameID + '-2';
        }
        return null; // No matching game found
    }
    // Create a new game if no matching game is found
    var newGame = makeNewGame(type, playername);
    matching.push(newGame); // Add the new game to the matching array
    console.log('Game added:', newGame, 'Total games:', games.length);
    return newGame.gameID + '-1'; // Return the game ID with '-1' suffix for player 1
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

        for (const game of games) {
            if (!game) continue; // Skip if the game is null
            // console.log('Processing game:', game.gameID, 'Player 1:', game.player1.name, 'Player 2:', game.player2.name);
            gameturn(game, use_ai_loop);
        }
        use_ai_loop = false; // Disable AI control for player 2 after the first loop
        await new Promise(resolve => setTimeout(resolve, delay));

    }
    // clearInterval(intervalRef);
    // intervalRef = null;
}
function getGameID(gamePlayerId: string): string[] | null {
    // Extract the game ID from the player ID
    const parts = gamePlayerId.split('-');
    if (parts.length > 0) {
        return parts; // Return the game ID part
    }
    return null; // Return null if no valid game ID is found
}
function findGamebyplayerId(playerId: string): gamestateinterface | null {
    // Find the game by player ID
    if (!playerId) {
        return null; // Return null if playerId is not provided
    }
    const gameid = getGameID(playerId);
    if (!gameid) {
        return null; // Return null if game ID is not valid
    }
    for (const game of games) {
        if (game && game.gameID === gameid[0]) {
            return game;
        }
    }
    for (const game of matching) {
        if (game && game.gameID === gameid[0]) {
            return game;
        }
    }
    console.log('Game not found for player ID:', playerId);
    return null; // Return null if no game is found for the player ID
}

const fastify = Fastify({logger : true});
fastify.register(fastifyStatic, {
    root: path.join(__dirname, './dist'),
    prefix: '/',
});

// Start the game loop
fastify.post('/start', async (req, reply) => {
    const { type, playername } = req.body as { type: string; playername: string };
    console.log('Starting game with AI:', type, 'Player Name:', playername);
    const gameid = addGameLoop(type , playername);
    reply.send({gameid: gameid, status: 'started' });
});

fastify.post('/leave', async (req, reply) => {
    const { gameid } = req.query as { gameid: string };
    // const { gameid:gameid } = req.body as { gameid: string };
    console.log('Player leaving game with ID:', gameid);
    const game = findGamebyplayerId(gameid);
    if (!game) {
        reply.status(404).send({ status: 'Game not found' });
        return;
    }
    // Remove the game from the games array
    if (game.gameActive && game.gametype === 'online') {
        game.gameActive = false; // Set gameActive to false
        game.gamePause = true; // Pause the game
        reply.send({ status: 'left', gameid: gameid });
        console.log('Game with ID:', gameid, 'has been paused.');
        return;
    }
    games = games.filter(g => g && g.gameID !== game.gameID);
    console.log('Game with ID:', gameid, 'has been removed. Remaining games:', games.length);
    reply.send({ status: 'left', gameid: gameid });
});


// Pause the game
fastify.post('/pause', async (req, reply) => {
    // const { direction } = req.body as { direction: boolean };
    const { gameid} = req.query as { gameid: string };
    const player = gameid.split('-')[1]; // Extract player from gameid
    // console.log('Moving player:', player, 'Direction:', direction, 'Game ID:', gameid);
    const game = findGamebyplayerId(gameid);
    if (!game) {
        reply.status(404).send({ status: 'Game not found' });
        return;
    }
    if (game.gamePause) {
        game.gamePause = false; // Resume the game
        reply.send({ status: 'started' });
        return;
    }
    // if (player === '-1') {
    // } else if (player === '-2') {
    game.gamePause = true;
    reply.send({ status: 'paused' });
});
// move the player paddle
fastify.post('/move', async (req, reply) => {
    const { direction } = req.body as { direction: 'up' | 'down' };
    const { gameid} = req.query as { gameid: string };
    const player = gameid.split('-')[1]; // Extract player from gameid
    console.log('Moving player:', player, 'Direction:', direction, 'Game ID:', gameid);
    const game = findGamebyplayerId(gameid);
    if (!game) {
        reply.status(404).send({ status: 'no Game' });
        return;
    }
    if (game.gamePause) {
        reply.status(400).send({ status: 'paused' });
        return;
    }
    if (player === '1') {
        if (direction === 'up') {
            game.player1.y -= game.player1.speed;
        } else if (direction === 'down') {
            game.player1.y += game.player1.speed;
        }
        playerMoveCheck(game.player1);
    } else if (player === '2') {
        if (direction === 'up') {
            game.player2.y -= game.player2.speed;
        } else if (direction === 'down') {
            game.player2.y += game.player2.speed;
        }
        playerMoveCheck(game.player2);
    }
    reply.send({ status: 'moved', player, direction });
});

// Resume the game
fastify.post('/resume', async (req, reply) => {
    pauze = false;
    reply.send({ status: 'resumed' });
});

// Get the current game state
fastify.get('/state', async (req, reply) => {
    // const playerId = req.query.gameId as string;
    console.log('Fetching game state...', games.length);
    const {gameid:gamePlayerId} = req.query as  {gameid: string};
    console.log('Game Player ID:', gamePlayerId);
    // const gameParts = getGameID(gamePlayerId);
    // if (!gameParts) {
    //     reply.status(400).send({ error: 'Invalid game ID format' });
    //     return;
    // }
    const game = findGamebyplayerId(gamePlayerId);
    reply.send(game || { error: 'Game not found' });
});
    function simpleAi(gamestate:gamestateinterface): void {
    // Simple AI to control player 2
    var player2: pcInterface = gamestate.player2;
    var ballvar: ballInterface = gamestate.ball;

    if (ballvar.y < player2.y) {
        player2.y -= player2.speed; // Move up
    } else if (ballvar.y + ballvar.height > player2.y + player2.height) {
        player2.y += player2.speed; // Move down
    }
    // Ensure the AI paddle stays within the game walls
    if (player2.y < 0) {
        player2.y = 0; // Prevent moving above the top wall
    }
    else if (player2.y + player2.height > gameWall.height) {
        player2.y = gameWall.height - player2.height; // Prevent moving below the bottom wall
    }

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
    function getSize(): number {
        const width = window.innerWidth;
        const height = window.innerHeight;
        var smaller = Math.min(width, height);
        smaller -= gameWall.wallTickness2x; // Adjust for wall thickness
        smaller -= gameWall.egdeThickness * 2; // Adjust for edge thickness
        var sizeAduster = smaller / gameWall.width; // Calculate the size aduster based on the smaller dimension
        if (sizeAduster < 1) {
            sizeAduster = 1;
        }
        return sizeAduster;
    }
    function playerMoveCheck(player: pcInterface): void {
        // Get the current position of the player
        if (player.y < 0) {
            player.y = 0; // Prevent moving above the top wall
        } else if (player.y + player.height > gameWall.height) {
            player.y = gameWall.height - player.height; // Prevent moving below the bottom wall
        }
    }
    function ballmove(gamestate:gamestateinterface): void {
    // Move the ball

    var oldBall : ballInterface = gamestate.ball;
    gamestate.ball.x += gamestate.ball.dx * gamestate.ball.speed;
    gamestate.ball.y += gamestate.ball.dy * gamestate.ball.speed;
    const WallHeight = gameWall.height - gamestate.ball.height;
    // Check for collision with the walls
    if (gamestate.ball.y <= 0 || gamestate.ball.y >= gameWall.height - gamestate.ball.height) {
        gamestate.ball.dy *= -1; // Reverse the y direction
        if (gamestate.ball.y <= 0) {
            gamestate.ball.y *= -1; // Prevent the ball from going above the top wall
        } else {
            gamestate.ball.y -= (gamestate.ball.y - WallHeight)*2; // Prevent the ball from going below the bottom wall
        }
    }
    simplePadleCollisionPlayer1(oldBall, gamestate);
    simplePadleCollisionPlayer2(oldBall, gamestate);
    if (gamestate.ball.x <= 0 || gamestate.ball.x >= gameWall.width - gamestate.ball.width) {
        gamestate.ball.dx *= -1; // Reverse the x direction
        // Check which player scored
        if (gamestate.ball.x <= 0) {
            gamestate.player2.score++; // Player 2 scores
        } else {
            gamestate.player1.score++; // Player 1 scores
        }
        // Reset the ball position
        gamestate.ball.x = gameWall.width / 2 - gamestate.ball.width / 2; // Center the ball horizontally
        gamestate.ball.y = gameWall.height / 2 - gamestate.ball.height / 2; // Center the ball vertically
    }
}
function simplePadleCollisionPlayer1(ball: ballInterface, gamestate: gamestateinterface) {
    var player: pcInterface = gamestate.player1;
    // Check if the ball is colliding with the paddle
    if (gamestate.ball.x > player.x + player.width)
        return false; // Ball is to the right of the paddle
    if (ball.y + ball.height < player.y && gamestate.ball.y + gamestate.ball.height < player.y)
        return false; // Ball is above the paddle
    if (ball.y > player.y + player.height && gamestate.ball.y > player.y + player.height)
        return false; // Ball is below the paddle
    // If none of the conditions are met, the ball is colliding with the paddle
    // Reverse the x direction of the ball
    ball.dx *= -1; // Reverse the x direction
    gamestate.ball.x += ((player.x + player.width) - gamestate.ball.x )*2;
    // Position the ball to the right of the paddle
    return true; // Ball is colliding with the paddle
}
function simplePadleCollisionPlayer2(ball: ballInterface, gamestate: gamestateinterface) {
    var player: pcInterface = gamestate.player2;
    // Check if the ball is colliding with the paddle
    if (gamestate.ball.x + gamestate.ball.width < player.x)
        return false; // Ball is to the right of the paddle
    if (ball.y + ball.height < player.y && gamestate.ball.y + gamestate.ball.height < player.y)
        return false; // Ball is above the paddle
    if (ball.y > player.y + player.height && gamestate.ball.y > player.y + player.height)
        return false; // Ball is below the paddle
    // If none of the conditions are met, the ball is colliding with the paddle
    // Reverse the x direction of the ball
    ball.dx *= -1; // Reverse the x direction
    gamestate.ball.x -= ((gamestate.ball.x + gamestate.ball.width) - player.x)*2;
    // Position the ball to the right of the paddle
    return true; // Ball is colliding with the paddle
}

fastify.listen({host: "0.0.0.0", port: 3002 }, err => {
    // seedDatabase();
    if (err) {
        fastify.log.error((err));
        process.exit(1);
    }
});

