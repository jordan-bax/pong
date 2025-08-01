import assert from 'assert';
import { open, Database } from 'sqlite'
import sqlite3 from 'sqlite3';
import { Tournament } from './schemas/tournamentInterface';

class TournamentDB {
    private db: Database | null = null

    async initDB(path: string): Promise<void> {
        if (this.db !== null) {
            throw new Error('DB in class must be null to init it')
        }

        await this.openDB(path)
        assert(this.db !== null, "DB must not be null after open it in the init")

        // nextMatchs is a table
        await (this.db as Database).run(
            `
            CREATE TABLE if not EXISTS tournament (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                rounds INTEGER NOT NULL,
                currentRound INTEGER NOT NULL,
                winner INTEGER,
                isRunning INTEGER NOT NULL,
                lockTime REAL NOT NULL,
                playerCount INTEGER NOT NULL,
                maxPlayers INTEGER NOT NULL
            )`
        )

        await (this.db as Database).run(
            `
            CREATE TABLE if not EXISTS players (
                userID INTEGER NOT NULL,
                round INTEGER NOT NULL,
                tableID INTEGER,
                FOREIGN KEY(tableID) REFERENCES tournament(id) ON DELETE CASCADE
            )
        `
        )
    }

    async openDB(path: string): Promise<void> {
        if (this.db === null) {
            this.db = await open({ filename: path, driver: sqlite3.Database })
        }
    }

    async addTournament(
        name: string,
        description: string,
        maxPlayers: number,
        lockTime: number,
        userID: number): Promise<Tournament | undefined> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        await (this.db as Database).run(
            `
            INSERT INTO tournament (name, description, rounds, currentRound, winner, isRunning, lockTime, playerCount, maxPlayers)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, description, 1 ? maxPlayers < 4 : maxPlayers / 2, 1, -1, false, lockTime, 1, maxPlayers]
        )

        // HACK: need to return undefined to make ts happy
        const id = await this.getLastID()
        if (id === undefined) {
            new Error('Could not get the last ID in the DB')
            return undefined
        }

        await this.addPlayer(userID, id)
        const tournament = await this.getTournament(id)

        return tournament
    }

    async addPlayer(userID: number, tournamentID: number): Promise<void> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        const result = await (this.db as Database).run(
            `
            INSERT INTO players (userID, round, tableID)
            SELECT ?, ?, ?
            WHERE (
                SELECT NOT isRunning AND playerCount < maxPlayers
                FROM tournament
                WHERE id = ?
            ) = 1
            AND NOT EXISTS (
                SELECT 1
                FROM players
                WHERE userID = ? AND tableID = ?
            )`,
            [userID, 1, tournamentID, tournamentID, userID, tournamentID]
        )

        if (result.changes === 0) {
            throw new Error("Cannot join tournament")
        }
    }

    async getPlayers(tournamentID: number): Promise<number[] | undefined> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        const players: number[] | undefined = await (this.db as Database).get(
            `
            SELECT userID FROM players WHERE tableID = ?`,
            [tournamentID]
        )

        return players
    }

    async getTournament(tournamentID: number): Promise<Tournament> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        let tourObj = undefined
        if (tournamentID < 0) {
            tourObj = await (this.db as Database).get(`
            SELECT id, name, description, rounds, currentRound, winner, isRunning, lockTime, playerCount, maxPlayers
            FROM tournament
            WHERE id = (SELECT MAX(id) FROM tournament)`
            )
        } else {
            tourObj = await (this.db as Database).get(`
            SELECT id, name, description, rounds, currentRound, winner, isRunning, lockTime, playerCount, maxPlayers
            FROM tournament
            WHERE id = ?`,
                [tournamentID]
            )
        }

        if (tourObj === undefined) {
            throw new Error('could not get tournament from DB')
        }

        const players = await this.getPlayers(tourObj['id'])
        if (players === undefined) {
            throw new Error('Could not get players from DB')
        }

        // TODO: query nextMatchs
        return {
            id: tourObj['id'],
            name: tourObj['name'],
            description: tourObj['description'],
            rounds: tourObj['rounds'],
            currentRound: tourObj['currentRound'],
            winner: tourObj['winner'],
            isRunning: tourObj['isRunning'],
            lockTime: tourObj['lockTime'],
            playerCount: tourObj['playerCount'],
            maxPlayers: tourObj['maxPlayers'],
            players: players,
            nextMatchs: [[]]
        }
    }

    async closeDB(): Promise<void> {
        if (this.db) {
            await this.db.close()
            this.db = null
        }
    }

    private async getLastID(): Promise<number | undefined> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        const id = await (this.db as Database).get(`SELECT MAX(id) FROM tournament`)
        if (id === undefined) {
            return id
        }

        return id['MAX(id)']
    }
}

export default TournamentDB
