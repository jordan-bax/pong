import assert from 'assert';
import { open, Database } from 'sqlite'
import sqlite3 from 'sqlite3';
import { dbAddTourInterface } from './schemas/dbInterface';

class TournamentDB {
    private db: Database | null = null

    async initDB(path: string): Promise<void> {
        if (this.db !== null) {
            throw new Error('DB in class must be null to init it')
        }

        await this.openDB(path)
        assert(this.db !== null, "DB must not be null after open it in the init")

        await (this.db as Database).run(
            `
            CREATE TABLE if not EXISTS tournament (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                maxPlayers INTERGER NOT NULL,
                rounds INTERGER,
                currentRound INTERGER NOT NULL,
                winner INTERGER,
                isRunning INTEGER NOT NULL,
                lockTime REAL NOT NULL
            )
        `)
    }

    async openDB(path: string): Promise<void> {
        if (this.db === null) {
            this.db = await open({ filename: path, driver: sqlite3.Database })
        }
    }

    async addTournament(
        name: string,
        description: string,
        currentRound: number,
        maxPlayers: number,
        isRunning: boolean,
        lockTime: number): Promise<dbAddTourInterface> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        await (this.db as Database).run(
            `
            INSERT INTO tournament (name, description, maxPlayers, currentRound, winner, isRunning, lockTime)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            name, description, maxPlayers, currentRound, -1, isRunning, lockTime
        )

        return await this.basicTournament()
    }

    async closeDB(): Promise<void> {
        if (this.db) {
            await this.db.close()
            this.db = null
        }
    }

    private async basicTournament(): Promise<dbAddTourInterface> {
        const { id, name, description, maxPlayers, rounds, winner, running, lockTime } = await (this.db as Database).get(
            `
            SELECT id, name, description, maxPlayers, currentRound, winner, isRunning, lockTime
            FROM tournament
            ORDER BY id DESC
            LIMIT 1`
        )

        return {
            id: id,
            name: name,
            description: description,
            maxPlayers: maxPlayers,
            curRound: rounds,
            winner: winner,
            running: running,
            lockTime: lockTime
        }
    }
}

export default TournamentDB
