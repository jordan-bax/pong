import { open, Database } from 'sqlite'
import sqlite3 from 'sqlite3';

class TournamentDB {
    private db: Database | null = null

    async openDB(path: string): Promise<void> {
        if (this.db === null) {
            this.db = await open({ filename: path, driver: sqlite3.Database })
        }
    }

    async addTournament(): Promise<void> {
        if (!this.db) {
            throw new Error('DB is not open')
        }
    }

    async closeDB(): Promise<void> {
        if (this.db) {
            await this.db.close()
            this.db = null
        }
    }

}

export default TournamentDB
