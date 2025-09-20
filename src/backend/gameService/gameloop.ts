import * as dbfunc from './game_db.js';
import { Game, player, GameStats } from './game_db.js';
import {player1Template, player2Template, ballvarTemplate, gamestateinterface,gameWall, pcInterface, ballInterface, aiInterface, gameWallsInterface } from './sharedValuesPong.js';
import { updateGameInDB , GameTypeId} from './game.js';
interface ghostballInterface {
	x: number;
	y: number;
}
class Gameloop {
	constructor(state: gamestateinterface) {
		this.gamestate = state;
		this.gameId = state.gameID;
		this.angle = this.getStartAngle();
	}
	private gamestate: gamestateinterface ;
	private tournamentId: number = -1;
	private gameId: number;
	private currentTurn: number = 0;
	private paddleSpeed: number = 10;
	private fps: number = 60;
	private gameInterval: NodeJS.Timeout | null = null;
	private gameloopInterval: NodeJS.Timeout | null = null;
	private angle: number = 0;
	private distance: number = 0;
	private ball_dx: number = 0;
	private ball_dy: number = 0;
	private ghost : ghostballInterface = { x: 0, y: 0};
	private ball_speed: number = 10;
	private ball_staticSpeed: number = 20;
	// private getRandomInt(): number {
	// 	return Math.floor(Math.random() * 21) - 10;
	// }
	
	private anglecheck(angle: number, callback: () => number ): number {
		if (angle < 160 && angle > 200) {
			if (angle < 250 && angle > 290) {
				return angle;
			}
		}
		angle = callback();
		return this.anglecheck(angle, callback);
	};
	private getRandomAngle(): number {
		return Math.random() * 360 ;
	}
	// 90 = down 180 = left 270 = up 0 = right
	private getStartAngle(): number {
		var angle = Math.random() * 300;
		console.log("Start angle before adjustment: " + angle);
		if (angle > ( 90 - 15))
			angle += 30;
		if (angle > ( 270 - 15))
			angle += 30;
		if (angle >= 360)
			angle = 0;
		console.log("Start angle after adjustment: " + angle);
		return angle;
		// return 90;
	}
	// number between 
	private getRandomAngleLeft(): number {
		var angle = Math.random() * 150 ;
		angle += 90;
		angle += 15;
		return angle;
	}
	// number between 
	private getRandomAngleRight(): number {
		var angle = Math.random() * 150 ;
		if (angle > 75)
			angle = 270 + 15 + (angle - 75);
		return angle;
	}
	getTournamentId(): number {
		return this.tournamentId;
	}
	setTournamentId(id: number): void {
		this.tournamentId = id;
	}

	start() {
		// Start the game loop
	}

	update() {

		// Update game state
	}

	async end() {
		if (!this.gamestate.gameActive) {
			return; // Game already ended
		}

		console.log('Game is finished! Final Score:', this.gamestate.player1.score, '-', this.gamestate.player2.score);
		this.gamestate.gameActive = false;
		this.gamestate.gamePause = true;
		await updateGameInDB(this.gamestate);
		if (this.tournamentId !== -1) {
			fetch('http://tournament:3003/done', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					tournamentID: this.tournamentId,
					player1ID: this.gamestate.player1.id,
					player2ID: this.gamestate.player2.id,
					player1Score: this.gamestate.player1.score,
					player2Score: this.gamestate.player2.score,
				}),
			})
			.then(response => response.json())
			.then(data => {
				console.log('Tournament updated with game result:', data);
			})
			.catch(error => {
				console.error('Error updating tournament with game result:', error);
			});
		}
	}

	saveGame() {

	}

	pause() {
		if (!this.gamestate.gameActive) {
			return; // Game not active or already paused
		}
		this.gamestate.gamePause = !this.gamestate.gamePause;
		console.log('Game is paused');
	}
	empty() : boolean {
		if (this.gamestate.player1.id === null ) {
			return true;
		}
		if (this.gamestate.player2.id === null ) {
			return true;
		}
		if (this.gamestate.player1.active === false || this.gamestate.player1.id <= 1) {
			if (this.gamestate.player2.active === false || this.gamestate.player2.id <= 1) {
				return true;
			}
		}
		return false;
	}
	// movePlayer(playerId: number, direction: 'up' | 'down') {
	// 	if (playerId == this.gamestate.player1.id) {
	// 		if (direction === 'up') {
	// 			this.gamestate.player1.y -= this.gamestate.player1.speed;
	// 		} else if (direction === 'down') {
	// 			this.gamestate.player1.y += this.gamestate.player1.speed;
	// 		}
	// 		this.playerMoveCheck(this.gamestate.player1);
	// 	} else if (playerId == this.gamestate.player2.id) {
	// 		if (direction === 'up') {
	// 			this.gamestate.player2.y -= this.gamestate.player2.speed;
	// 		} else if (direction === 'down') {
	// 			this.gamestate.player2.y += this.gamestate.player2.speed;
	// 		}
	// 		this.playerMoveCheck(this.gamestate.player2);
	// 	}
	// }

	playerleft(playerId: number) {
		if (this.gamestate.gameActive) {
			this.end();
		}
		if (this.gamestate.player1.id === playerId ) {
			this.gamestate.player1.active = false;
		}
		if (this.gamestate.player2.id === playerId) {
			this.gamestate.player2.active = false;
		}
	}
	getState(): gamestateinterface {
		return this.gamestate;
	}
	getId(): number {
		return this.gameId;
	}
	async turn(gamestate:gamestateinterface, use_ai: boolean) {
		// Check if the game is paused
		if (gamestate.gamePause || !gamestate.gameActive) {
			// If the game is paused, do not update the game state
			// console.log('Game is paused');
			return; // Exit the game loop if paused
		}
		this.ballmove(gamestate);

		if (use_ai && !(gamestate.player2.id === null) && gamestate.player2.id <= GameTypeId.AI) {
			this.simpleAi(gamestate);
		}
		this.playerMoveCheck(gamestate.player1);
		this.playerMoveCheck(gamestate.player2);
		if (gamestate.player1.score >= 11 || gamestate.player2.score >= 11) {
			// End the game if a player reaches 11 points
			console.log('Game Over! Final Score:', '-');
			this.end();
			return;
		}
	}
	// 90 = down 180 = left 270 = up 0 = right if / 180
	// 90 = left / 90
	moveBallByAngle(ball: ballInterface, angle: number, ballspeed: number): void {
		const radians = angle * (Math.PI / 180);
		ball.dx = Math.cos(radians);
		ball.dy = Math.sin(radians);
		ball.x += ball.dx * ballspeed;
		ball.y += ball.dy * ballspeed;
		console.log("Angle: " + angle + " DX: " + ball.dx + " DY: " + ball.dy + " X: " + ball.x + " Y: " + ball.y);
	}

	ballbounceByAngle(angle: number): void {
		console.log("Pre bounce angle: " + angle + " DX: " + this.gamestate.ball.dx + " DY: " + this.gamestate.ball.dy + " X: " + this.gamestate.ball.x + " Y: " + this.gamestate.ball.y);
		this.ballwallbounce();
		// if (this.gamestate.ball.y <= 0 || this.gamestate.ball.y >= gameWall.height - this.gamestate.ball.height) {
		// 	// Ball hit top/bottom wall: reflect vertical angle
		// 	this.angle = 360 - this.angle;
		// }
		this.paddelleftbounce();
		// if (
		// 	// Ball hit player 1 paddle
		// 	this.gamestate.ball.x <= this.gamestate.player1.x + this.gamestate.player1.width &&
		// 	this.gamestate.ball.y + this.gamestate.ball.height >= this.gamestate.player1.y &&
		// 	this.gamestate.ball.y <= this.gamestate.player1.y + this.gamestate.player1.height
		// ) {
		// 	// Reflect horizontal angle and add some randomness based on hit position
		// 	const relativeIntersectY = (this.gamestate.player1.y + this.gamestate.player1.height / 2) - (this.gamestate.ball.y + this.gamestate.ball.height / 2);
		// 	const normalizedRelativeIntersectionY = relativeIntersectY / (this.gamestate.player1.height / 2);
		// 	this.angle = 180 - this.angle + normalizedRelativeIntersectionY * 30;
		// } 
		this.paddlerightbounce();
		// if (
		// 	// Ball hit player 2 paddle
		// 	this.gamestate.ball.x + this.gamestate.ball.width >= this.gamestate.player2.x &&
		// 	this.gamestate.ball.y + this.gamestate.ball.height >= this.gamestate.player2.y &&
		// 	this.gamestate.ball.y <= this.gamestate.player2.y + this.gamestate.player2.height
		// ) {
		// 	// Reflect horizontal angle and add some randomness based on hit position
		// 	const relativeIntersectY = (this.gamestate.player2.y + this.gamestate.player2.height / 2) - (this.gamestate.ball.y + this.gamestate.ball.height / 2);
		// 	const normalizedRelativeIntersectionY = relativeIntersectY / (this.gamestate.player2.height / 2);
		// 	this.angle = 180 - this.angle - normalizedRelativeIntersectionY * 30;
		// }
		this.angle = this.anglewithin360(this.angle);
		console.log("Post bounce angle: " + this.angle + " DX: " + this.gamestate.ball.dx + " DY: " + this.gamestate.ball.dy + " X: " + this.gamestate.ball.x + " Y: " + this.gamestate.ball.y);
	}
	// 90 = down 180 = left 270 = up 0 = right if / 180
	private anglewithin360(angle: number): number {
		if (angle < 0) {
			angle += 360;
		}
		if (angle >= 360) {
			angle -= 360;
		}
		return angle;
	}
	private ballhit(): void {

	}
	private percentof(dx: number, overshootX: number, dy: number): number {
		console.log("pre % DX: " + dx + " overshootX: " + overshootX + " DY: " + dy);
		var percentofx = (100 / dx) * overshootX;
		if (percentofx < 0) {
			percentofx *= -1;
		}
		var overshootY = (dy / 100) * percentofx;
		console.log("post % Percent of X: " + percentofx + " Overshoot Y: " + overshootY);

		return overshootY;
	}
	private paddelleftbounce(): void {
		if (this.gamestate.ball.x > this.gamestate.player1.x + this.gamestate.player1.width) {
			return; // Ball is to the right of the paddle
		}
		var overshootX =  this.gamestate.player1.x + this.gamestate.player1.width - this.gamestate.ball.x;
		if (overshootX < 0) {
			console.log("No overshoot Left", overshootX);
			return; // No overshoot
		}
		var dx = this.gamestate.ball.dx * this.ball_speed;
		var dy = this.gamestate.ball.dy * this.ball_speed;
		var ytoPaddle = this.percentof(dx, overshootX, dy);
		// this.gamestate.ball.x += overshootX;
		// this.gamestate.ball.y += ytoPaddle;
		console.log("testing overshootX", overshootX, "ytoPaddle", ytoPaddle, "ball y", this.gamestate.ball.y, "paddle y", this.gamestate.player1.y, "paddle height", this.gamestate.player1.height);
		if  (this.gamestate.ball.y + (this.gamestate.ball.height) + ytoPaddle < this.gamestate.player1.y || this.gamestate.ball.y  + ytoPaddle > this.gamestate.player1.y + this.gamestate.player1.height) {
			console.log("Ball is above or below the paddle", overshootX, ytoPaddle, this.gamestate.ball.y, this.gamestate.player1.y, this.gamestate.player1.height);
			return; // Ball is above or below the paddle
		}
		this.gamestate.ball.x += overshootX;
		// Ball hit left paddle: reflect horizontal angle
		this.angle = 180 - this.angle;
		console.log("Left paddle bounce angle: " + this.angle + " DX: " + dx + " DY: " + dy + " LL: " + this.gamestate.ball.x + " Distance to paddle: " + overshootX + " Y to paddle: " + ytoPaddle);
	}
	private paddlerightbounce(): void {
		if (this.gamestate.ball.x + this.gamestate.ball.width < this.gamestate.player2.x) {
			return; // Ball is to the left of the paddle
		}
		var overshootX = (this.gamestate.ball.x + this.gamestate.ball.width) - this.gamestate.player2.x;
		if (overshootX < 0) {
			console.log("No overshoot Right", overshootX);
			return; // No overshoot
		}
		var dx = this.gamestate.ball.dx * this.ball_speed;
		var dy = this.gamestate.ball.dy * this.ball_speed;
		var ytoPaddle = this.percentof(dx, overshootX, dy);
		// this.gamestate.ball.x += overshootX;
		// this.gamestate.ball.y += ytoPaddle;
		console.log("testing overshootX", overshootX, "ytoPaddle", ytoPaddle, "ball y", this.gamestate.ball.y, "paddle y", this.gamestate.player2.y, "paddle height", this.gamestate.player2.height);
		if  (this.gamestate.ball.y + (this.gamestate.ball.height) - ytoPaddle < this.gamestate.player2.y || this.gamestate.ball.y  - ytoPaddle > this.gamestate.player2.y + this.gamestate.player2.height) {
			console.log("Ball is above or below the paddle", overshootX, ytoPaddle, this.gamestate.ball.y, this.gamestate.player2.y, this.gamestate.player2.height);
			return; // Ball is above or below the paddle
		}
		this.gamestate.ball.x -= overshootX;
		// Ball hit right paddle: reflect horizontal angle
		this.angle = 180 - this.angle;
		console.log("Right paddle bounce angle: " + this.angle + " DX: " + dx + " DY: " + dy + " LL: " + this.gamestate.ball.x + " Distance to paddle: " + overshootX + " Y to paddle: " + ytoPaddle);
	}
	private ballwallbounce(): void {
		if (this.gamestate.ball.y <= 0 ) {
			console.log("Top b wall bounce angle: " + this.angle + " DX: " + this.gamestate.ball.dx + " DY: " + this.gamestate.ball.dy + " LL: " + this.gamestate.ball.y + " Distance to wall: " + this.gamestate.ball.y);
			var overshoot = -this.gamestate.ball.y;
			this.gamestate.ball.y += overshoot;
			if (this.gamestate.ball.y < 0) {
				console.log("No overshoot", overshoot, "this.gamestate.ball.y", this.gamestate.ball.y);
				overshoot = 0;
			}
			else
				console.log("Yes overshoot", overshoot, "this.gamestate.ball.y", this.gamestate.ball.y);
			var dx = this.gamestate.ball.dx * this.ball_speed;
			var dy = this.gamestate.ball.dy * this.ball_speed;
			// var ytoWall = dy - overshoot;
			// var xtoWall = dx - this.percentof(dy, overshoot, dx);
			this.gamestate.ball.y = 0 + overshoot;
			// Ball hit top/bottom wall: reflect vertical angle

			this.angle = 360 - this.angle;
			console.log("Top wall bounce angle: " + this.angle + " DX: " + dx + " DY: " + dy );
		}
		if (this.gamestate.ball.y >= gameWall.height - this.gamestate.ball.height) {
			var overshoot = this.gamestate.ball.y - (gameWall.height - this.gamestate.ball.height);
			this.gamestate.ball.y -= overshoot;
			if (this.gamestate.ball.y >= gameWall.height - this.gamestate.ball.height) {
				console.log("No overshoot", overshoot, "this.gamestate.ball.y", this.gamestate.ball.y);
				overshoot = 0;
			}
			else
				console.log("Yes overshoot", overshoot, "this.gamestate.ball.y", this.gamestate.ball.y);
			var dx = this.gamestate.ball.dx * this.ball_speed;
			var dy = this.gamestate.ball.dy * this.ball_speed;
			// var ytoWall = dy - overshoot;
			// var xtoWall = dx - this.percentof(dy, overshoot, dx);
			this.gamestate.ball.y = (gameWall.height - this.gamestate.ball.height) - overshoot;
			// Ball hit top/bottom wall: reflect vertical angle

			console.log("Bottom wall bounce angle: " + this.angle + " DX: " + dx + " DY: " + dy );
			this.angle = 360 - this.angle;
		}
	}
	// const overshoot = this.gamestate.ball.y - (gameWall.height - this.gamestate.ball.height);
	// const radians = this.angle * (Math.PI / 180);
	// const dx = Math.cos(radians);
	// const dy = Math.sin(radians);
	// const distanceToWall = overshoot / dy;
	// this.gamestate.ball.x -= dx * overshoot / dy; // Move back to wall
	// this.gamestate.ball.y = (gameWall.height - this.gamestate.ball.height) - overshoot;
	// this.gamestate.ball.x += dx * (this.ball_speed - distanceToWall); // Move remaining distance after bounce
	// // Ball hit top/bottom wall: reflect vertical angle
	private ballbounce(): void {
	}
	ballmove(gamestate:gamestateinterface): void {
		// Move the ball
		if (gamestate.ball.x <= 0 || gamestate.ball.x >= gameWall.width - gamestate.ball.width) {
			gamestate.ball.dx *= -1; // Reverse the x direction
			// this.angle = this.getStartAngle();
			// Check which player scored
			if (gamestate.ball.x <= 0) {
				gamestate.player2.score++; // Player 2 scores
				this.angle = this.getRandomAngleLeft();
			} else {
				gamestate.player1.score++; // Player 1 scores
				this.angle = this.getRandomAngleRight();
			}
			// Reset the ball position
			gamestate.ball.x = gameWall.width / 2 - gamestate.ball.width / 2; // Center the ball horizontally
			gamestate.ball.y = gameWall.height / 2 - gamestate.ball.height / 2; // Center the ball vertically
		}
		this.ghost = { x: gamestate.ball.x, y: gamestate.ball.y };
		let oldBall : ballInterface = gamestate.ball;
		this.moveBallByAngle(gamestate.ball, this.angle, this.ball_speed);
		this.ballbounceByAngle(this.angle);
		// gamestate.ball.x += gamestate.ball.dx * gamestate.ball.speed;
		// gamestate.ball.y += gamestate.ball.dy * gamestate.ball.speed;
		const WallHeight = gameWall.height - gamestate.ball.height;
		// // Check for collision with the walls
		// if (gamestate.ball.y <= 0 || gamestate.ball.y >= gameWall.height - gamestate.ball.height) {
		// 	gamestate.ball.dy *= -1; // Reverse the y direction
		// 	if (gamestate.ball.y <= 0) {
		// 		gamestate.ball.y *= -1; // Prevent the ball from going above the top wall
		// 	} else {
		// 		gamestate.ball.y -= (gamestate.ball.y - WallHeight)*2; // Prevent the ball from going below the bottom wall
		// 	}
		// }
		// this.simplePadleCollisionPlayer1(oldBall, gamestate);
		// this.simplePadleCollisionPlayer2(oldBall, gamestate);
		if (gamestate.ball.x <= 0 ) {
			this.gamestate.ball.x =0;
		}
		else if (gamestate.ball.x >= gameWall.width - gamestate.ball.width) {
			this.gamestate.ball.x = gameWall.width - gamestate.ball.width;
		}
		this.gamestate.gamePause = true;
	}
	simplePadleCollisionPlayer1(ball: ballInterface, gamestate: gamestateinterface) {
		let player: pcInterface = gamestate.player1;
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
	simplePadleCollisionPlayer2(ball: ballInterface, gamestate: gamestateinterface) {
		let player: pcInterface = gamestate.player2;
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
	playerMoveCheck(player: pcInterface): void {
		// Get the current position of the player
		if (player.y < 0) {
			player.y = 0; // Prevent moving above the top wall
		} else if (player.y + player.height > gameWall.height) {
			player.y = gameWall.height - player.height; // Prevent moving below the bottom wall
		}
	}
	simpleAi(gamestate:gamestateinterface): void {
		// Simple AI to control player 2
		let player2: pcInterface = gamestate.player2;
		let ballvar: ballInterface = gamestate.ball;

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
	// gamespeed(): number {
	// 	// Adjust the game speed based on the current FPS
	// 	if (fps < 1) {
	// 		fps = 1; // Ensure FPS is at least 1
	// 	} else if (fps > 60) {
	// 		fps = 60; // Cap FPS at 60
	// 	}
	// 	ballSpeed = ballvarTemplate.staticSpeed / fps; // Set the ball speed based on FPS
	// 	return 1000 / fps; // Return the delay in milliseconds for the next frame
	// }
}
export { Gameloop };
