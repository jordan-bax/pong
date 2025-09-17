export interface gamestateinterface {
	gameID: number;
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
	id: number | null;
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
	speed: number;
	staticSpeed: number;
	height: number;
	width: number;
}

export interface aiInterface {
	reactionTime: number;
}

export const gameWall: gameWallsInterface = {
	width: 200,
	height: 200,
	wallThickness: 10,
	wallTickness2x: 20,
	egdeThickness: 15
};

export var player1Template: pcInterface = {
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

export var player2Template: pcInterface = {
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

export var ai_var: aiInterface = {
	reactionTime: 100
};

export var ballvarTemplate: ballInterface = {
	x: 98,
	y: 98,
	dx: 2,
	dy: 5,
	speed: 2,
	staticSpeed: 20,
	height: 4,
	width: 4
};

export var sizeAduster: number = 1;
export var fps: number = 10;
export var pauze: boolean = true;
