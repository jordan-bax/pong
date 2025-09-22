export interface gamestateinterface {
	gameID: number;
	// tournamentID: number;
	gameActive: boolean;
	gamePause: boolean;
	gametype: string;
	player1: pcInterface;
	player2: pcInterface;
	ball: ballInterface;
}
export interface basicinfo {
	paddelspeed: number;
	ball_dx: number;
	ball_dy: number;
	ball_speed: number;
	ball_staticSpeed: number;
}
export interface gameWallsInterface {
	width: number;
	height: number;
	wallThickness: number;
	wallTickness2x: number;
	egdeThickness: number;
}
export interface scoreInterface {
	player1Score: number;
	player2Score: number;
	player1Name: string;
	player2Name: string;
}
export interface pcInterface {
	id: number | null; // Use string or null for player ID
	active: boolean;
	name: string;
	x: number;
	y: number;
	speed: number;
	height: number;
	width: number;
	score: number;
}
export interface ballInterface {
	x: number;
	y: number;
	dx: number;
	dy: number;
	height: number;
	width: number;
}
export interface aiInterface {
	reactionTime: number; // Time it takes for the AI to react
}
export const gameWall: gameWallsInterface = {
	width: 200,
	height: 200,
	wallThickness: 10,
	wallTickness2x: 20,
	egdeThickness: 15
};
export let player1Template: pcInterface = {
	id: null,
	active: false,
	name: "Player 1",
	x: 2,
	y: 50,
	speed: 10,
	height: 25,
	width: 4,
	score: 0
};
export let player2Template: pcInterface = {
	id: null,
	active: false,
	name: "Player 2",
	x: 198,
	y: 50,
	speed: 10,
	height: 25,
	width: 4,
	score: 0
};
export let ai_var: aiInterface = {
	//The average (median) reaction time is 273 milliseconds
	reactionTime: 100 // Default reaction time in milliseconds
};
export let ballvarTemplate: ballInterface = {
	x: 98,
	y: 98,
	dx: 2,
	dy: 5,
	height: 4,
	width: 4
};
export let sizeAduster: number = 1;
export let fps: number = 10; // Frames per second
export let pauze: boolean = true; // Variable to control the pause state
