import { open, Database } from 'sqlite'
import sqlite3 from 'sqlite3'

class DBError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "DBError";
        Object.setPrototypeOf(this, DBError.prototype);
    }
}

class guestDB {
    private db: Database | null
    private startID: number;

    constructor() {
        this.db = null
        this.startID = 3600
    }

    async initDB(path: string) {
        if (this.db !== null) {
            throw new DBError("DB in class must be null to init it")
        }

        try {
            await this.openDB(path)
            if (this.db === null) {
                throw new DBError("Failed to open the DB")
            }
        } catch (error) {
            throw error
        }

        try {
            await this.db.run(`
                CREATE TABLE if not EXISTS guests(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL)`
            )
        } catch (error) {
            throw new DBError("Failed to run init query\'s")
        }
    }

    async openDB(path: string) {
        if (this.db === null) {
            try {
                this.db = await open({
                    filename: path,
                    driver: sqlite3.Database,
                    mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE | sqlite3.OPEN_FULLMUTEX
                })
            } catch (error) {
                throw new DBError(error)
            }
        } else {
            return null;
        }
    }

    async create() {
        if (!this.db) {
            throw new DBError("DB is not open")
        }

        try {
            const resultCount = await this.db.get(`
                SELECT COUNT(*) AS userCount FROM guests`)

            const newID = (resultCount.userCount + 1) + this.startID;
            const result = await this.db.run(`
                INSERT INTO guests (username)
                VALUES (?)`,
                [`guest ${newID}`])

            if (result.changes === 0) {
                new DBError("Could not insert in database")
            }

            return { 'username': `guest ${newID}`, 'id': -newID }
        } catch (error) {
            throw error
        }
    }

    async closeDB() {
        if (this.db) {
            try {
                await this.db.close()
                this.db = null
            } catch (error) {
                throw Error(error)
            }
        }
    }
}

export { guestDB, DBError }
