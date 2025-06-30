import sqlite3 from 'sqlite3';
import { open, Database} from 'sqlite';
// import bcrypt from 'bcryptjs';

export interface player {
	id: number | null; // Player ID, can be null for new players
	username: string;
	// gameRef: Game[]; // Reference to games played by the player
}

export interface Game {
	id: number | undefined; // Game ID, can be null for new games
	type?: string; // Optional type field for future use
	player1: player;
	player2: player;
	player1Score: number;
	player2Score: number;
	winner: string;
	createdAt: Date | null; // Date when the game was created, can be null for new games
}

export interface GameStats {
	username: string;
	gamesPlayed: number;
	gamesWon: number;
	gamesLost: number;
}

sqlite3.verbose();

const dbFile = process.env.GAME_DATABASE_PATH;
if (!dbFile) {
    throw new Error("MISSING DATABASE ENV");
}

const dbPromise = open({
	filename: dbFile,
	driver: sqlite3.Database
});

async function initializeDatabase() {
	const db = await dbPromise;

	// Create player table
	await db.run(`
		CREATE TABLE IF NOT EXISTS player (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT UNIQUE NOT NULL
		)
	`);

	// Create game table
	await db.run(`
		CREATE TABLE IF NOT EXISTS game (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			player1_id INTEGER NOT NULL,
			player2_id INTEGER NOT NULL,
			player1Score INTEGER NOT NULL,
			player2Score INTEGER NOT NULL,
			winner TEXT NOT NULL,
			createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (player1_id) REFERENCES player(id),
			FOREIGN KEY (player2_id) REFERENCES player(id)
		)
	`);
}

export async function getGamesForPlayer(playerId: number): Promise<Game[]> {
    const db = await dbPromise;
    const rows = await db.all(`
		SELECT g.*, p1.username as player1name, p2.username as player2name
		FROM game g
		JOIN player p1 ON g.player1_id = p1.id
		JOIN player p2 ON g.player2_id = p2.id
		WHERE g.player1_id = ? OR g.player2_id = ?
		ORDER BY g.createdAt DESC
	`, playerId, playerId);
	
	return rows.map(row => ({
		id: row.id,
		player1: { id: row.player1_id, username: row.player1name },
		player2: { id: row.player2_id, username: row.player2name },
		player1Score: row.player1Score,
		player2Score: row.player2Score,
		winner: row.winner,
		createdAt: new Date(row.createdAt),
	}));
}
export async function getPlayerById(id: number): Promise<player | null> {
	const db = await dbPromise;
	const row = await db.get(`SELECT * FROM player WHERE id = ?`, id);
	if (!row) return null;
	return { id: row.id, username: row.username };
}

export async function getPlayerByUsername(username: string): Promise<player | null> {
	const db = await dbPromise;
	const row = await db.get(`SELECT * FROM player WHERE username = ?`, username);
	if (!row) return null;
	return { id: row.id, username: row.username };
}

export async function createPlayer(id: number, username: string): Promise<player> {
	const db = await dbPromise;
	const existing = await db.get(`SELECT id FROM player WHERE id = ?`, id);
	if (existing) {
		throw new Error(`Player ID ${id} already exists`);
	}
	await db.run(
		`INSERT INTO player (id, username) VALUES (?, ?)`,
		id,
		username
	);
	return { id, username };
}
export async function createGame(game: Game): Promise<Game> {
	const db = await dbPromise;
	const { player1, player2, player1Score, player2Score, winner } = game;
	const result = await db.run(
		`INSERT INTO game (player1_id, player2_id, player1Score, player2Score, winner) 
		 VALUES (?, ?, ?, ?, ?)`,
		player1.id,
		player2.id,
		player1Score,
		player2Score,
		winner
	);
	game.id = result.lastID;
	game.createdAt = new Date();
	return game;
}
export async function getGameById(id: number): Promise<Game | null> {
	const db = await dbPromise;
	const row = await db.get(`
		SELECT g.*, p1.username as player1name, p2.username as player2name
		FROM game g
		JOIN player p1 ON g.player1_id = p1.id
		JOIN player p2 ON g.player2_id = p2.id
		WHERE g.id = ?
	`, id);
	if (!row) return null;
	return {
		id: row.id,
		player1: { id: row.player1_id, username: row.player1name },
		player2: { id: row.player2_id, username: row.player2name },
		player1Score: row.player1Score,
		player2Score: row.player2Score,
		winner: row.winner,
		createdAt: new Date(row.createdAt),
	};
}
export async function getGameStatsByPlayerId(playerId: number): Promise<GameStats | null> {
	const db = await dbPromise;
	const player = await db.get(`SELECT username FROM player WHERE id = ?`, playerId);
	if (!player) return null;

	const gamesPlayed = await db.get(
		`SELECT COUNT(*) as count FROM game WHERE player1_id = ? OR player2_id = ?`,
		playerId, playerId
	);

	const gamesWon = await db.get(
		`SELECT COUNT(*) as count FROM game WHERE winner = ?`,
		player.username
	);

	const gamesLost = (gamesPlayed.count ?? 0) - (gamesWon.count ?? 0);

	return {
		username: player.username,
		gamesPlayed: gamesPlayed.count ?? 0,
		gamesWon: gamesWon.count ?? 0,
		gamesLost
	};
}

initializeDatabase().catch(console.error);

