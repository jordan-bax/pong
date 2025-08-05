const { open: dbOpen, Database } = require('sqlite')
const sqlite3 = require('sqlite3')
const { Tournament } = require('./schemas/tournamentInterface')

module.exports = class TournamentDB {
    private db: typeof Database | null

    constructor() {
        this.db = null

    }

    async initDB(path: string): Promise<void> {
        if (this.db !== null) {
            throw new Error('DB in class must be null to init it')
        }

        await this.openDB(path)
        if (this.db === null) {
            throw new Error('adadasd')
        }

        // nextMatchs is a table
        await this.db.run(`
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
                maxPlayers INTEGER NOT NULL)`
        )

        await this.db.run(`
            CREATE TABLE IF NOT EXISTS players (
                userID INTEGER NOT NULL,
                tournament_id INTEGER NOT NULL,
                eliminated INTEGER DEFAULT 0,
                seed INTEGER,
                PRIMARY KEY(userID, tournament_id),
                FOREIGN KEY(tournament_id) REFERENCES tournament(id) ON DELETE CASCADE)`)

        await this.db.run(`
            CREATE TABLE IF NOT EXISTS match (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tournament_id INTEGER NOT NULL,
                round INTEGER NOT NULL,
                position INTEGER NOT NULL,
                player1_id INTEGER,
                player2_id INTEGER,
                winner_id INTEGER,
                parent_match1_id INTEGER,
                parent_match2_id INTEGER,
                FOREIGN KEY(tournament_id) REFERENCES tournament(id) ON DELETE CASCADE,
                FOREIGN KEY(player1_id) REFERENCES players(userID),
                FOREIGN KEY(player2_id) REFERENCES players(userID),
                FOREIGN KEY(winner_id) REFERENCES players(userID),
                FOREIGN KEY(parent_match1_id) REFERENCES match(id),
                FOREIGN KEY(parent_match2_id) REFERENCES match(id))`)
    }

    async openDB(path: string): Promise<void> {
        if (this.db === null) {
            this.db = await dbOpen({ filename: path, driver: sqlite3.Database })
        }
    }

    async create(
        name: string,
        description: string,
        maxPlayers: number,
        lockTime: number,
        userID: number): Promise<typeof Tournament | undefined> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        await this.db.run(
            `
            INSERT INTO tournament (name, description, rounds, currentRound, winner, isRunning, lockTime, playerCount, maxPlayers)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, description, 1 ? maxPlayers < 4 : maxPlayers / 2, 1, -1, false, lockTime, 0, maxPlayers]
        )

        const id = await this.getLastID()
        if (id === undefined) {
            new Error('Could not get the last ID in the DB')
        }

        try {
            await this.join(userID, id)
            const tournament = await this.getTournament(id)

            return tournament
        } catch (error) {
            throw error
        }
    }

    async join(userID: number, tournamentID: number): Promise<void> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        await this.db.run("BEGIN TRANSACTION")
        try {
            const result = await this.db.run(`
                INSERT INTO players (userID, tournament_id)
                SELECT ?, ?
                    WHERE (
                        SELECT NOT isRunning AND playerCount < maxPlayers
                        FROM tournament
                        WHERE id = ?
                ) = 1
                AND NOT EXISTS (
                    SELECT 1
                    FROM players
                    WHERE userID = ? AND tournament_id = ?
                        )`,
                [userID, tournamentID, tournamentID, userID, tournamentID]
            )

            if (result.changes > 0) {
                await this.db.run(`
                    UPDATE tournament
                    SET playerCount = playerCount + 1
                    WHERE id = ? AND NOT isRunning`,
                    [tournamentID]
                )
                await this.db.run("COMMIT");
            } else {
                throw new Error("Cannot join tournament")
            }
        } catch (error) {
            await this.db.run("ROLLBACK");
            throw error;
        }
    }

    async leave(tournamentID: number, userID: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        await this.db.run("BEGIN TRANSACTION")
        try {
            const result = await this.db.run(`
                DELETE FROM players
                WHERE userID = ?
                    AND tournament_id IN (
                        SELECT id
                        FROM tournament
                        WHERE id = ?
                )
                AND EXISTS (
                    SELECT id
                    FROM tournament
                    WHERE id = ?
                        AND NOT isRunning)`,
                [userID, tournamentID, tournamentID]
            )

            if (result.changes > 0) {
                await this.db.run(`
                    UPDATE tournament
                    SET playerCount = playerCount - 1
                    WHERE id = ? AND NOT isRunning`,
                    [tournamentID]
                )
                await this.db.run("COMMIT")
            } else {
                throw new Error('Cannot leave the tournament')
            }
        } catch (error) {
            await this.db.run("ROLLBACK")
            throw error
        }

        await this.db.run("BEGIN TRANSACTION")
        try {
            const row = await this.db.get(`
                SELECT playerCount FROM tournament WHERE id = ?`,
                [tournamentID])
            // check for missing row
            if (row && row.playerCount === 0) {
                await this.db.run(`
                    DELETE FROM tournament where id = ?`,
                    [tournamentID])
            }
            await this.db.run("COMMIT")
        } catch (error) {
            await this.db.run("ROLLBACK")
            throw new Error('Removing tournament failed')
        }
    }

    async running(): Promise<typeof Tournament[]> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            const tours = await this.db.all(`
                SELECT * FROM tournament WHERE isRunning = ? AND winner < ?`,
                [1, 1])
            return tours
        } catch (error) {
            throw new Error('Failed to get all running tournaments')
        }
    }

    async idle(): Promise<typeof Tournament[]> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            const tours = await this.db.all(`
                SELECT * FROM tournament WHERE isRunning = ?`,
                [0])
            return tours
        } catch (error) {
            throw new Error('Failed to get all running tournaments')
        }
    }

    async finished(): Promise<typeof Tournament[]> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            const tours = await this.db.all(`
                SELECT * FROM tournament WHERE winner > ?`,
                [0])
            return tours
        } catch (error) {
            throw new Error('Failed to get all running tournaments')
        }
    }

    async allTournaments(): Promise<typeof Tournament[]> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            const tours = await this.db.all(`
                SELECT * FROM tournament`)
            return tours
        } catch (error) {
            throw new Error('Failed to get all running tournaments')
        }
    }

    async getTournament(tournamentID: number): Promise<typeof Tournament> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        const tourObj = await this.db.get(`
            SELECT
                t.id, t.name, t.description, t.rounds, t.currentRound,
                t.winner, t.isRunning, t.lockTime, t.playerCount, t.maxPlayers,
                GROUP_CONCAT(p.userID) AS players
            FROM tournament t
            LEFT JOIN players p ON t.id = p.tournament_id
            WHERE t.id = ?
            GROUP BY t.id`,
            [tournamentID])

        if (tourObj === undefined) {
            throw new Error('could not get tournament from DB')
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
            players: tourObj['players'] ? tourObj['players'].split(',').map(Number) : [],
            nextMatchs: [[]]
        }
    }

    async init_matches(userID: number, tournamentID: number, seed: number): Promise<void> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        await this.db.run("TRANSACTION")
        await this.db.run("COMMIT")
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

        const id = await this.db.get(`SELECT MAX(id) FROM tournament`)
        if (id === undefined) {
            return id
        }

        return id['MAX(id)']
    }
}
