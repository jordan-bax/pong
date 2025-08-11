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

        await this.db.run(`
            CREATE TABLE if not EXISTS tournament (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                rounds INTEGER NOT NULL,
                isRunning INTEGER NOT NULL,
                lockTime REAL NOT NULL,
                playerCount INTEGER NOT NULL,
                maxPlayers INTEGER NOT NULL)`
        )

        await this.db.run(`
            CREATE TABLE IF NOT EXISTS players (
                userID INTEGER NOT NULL,
                tournamentID INTEGER NOT NULL,
                eliminated INTEGER DEFAULT 0,
                PRIMARY KEY(userID, tournamentID),
                FOREIGN KEY(tournamentID) REFERENCES tournament(id) ON DELETE CASCADE)`)

        await this.db.run(`
            CREATE TABLE IF NOT EXISTS match (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tournamentID INTEGER NOT NULL,
                round INTEGER NOT NULL,
                position INTEGER NOT NULL,
                player1_id INTEGER,
                player2_id INTEGER,
                winner_id INTEGER,
                parent_match1_id INTEGER,
                parent_match2_id INTEGER,
                FOREIGN KEY(tournamentID) REFERENCES tournament(id) ON DELETE CASCADE,
                FOREIGN KEY(player1_id) REFERENCES players(userID),
                FOREIGN KEY(player2_id) REFERENCES players(userID),
                FOREIGN KEY(winner_id) REFERENCES players(userID),
                FOREIGN KEY(parent_match1_id) REFERENCES match(id),
                FOREIGN KEY(parent_match2_id) REFERENCES match(id))`)
    }

    async openDB(path: string): Promise<void> {
        if (this.db === null) {
            this.db = await dbOpen({ filename: path, driver: sqlite3.Database })
            this.db.getDatabaseInstance().serialize()
        }
    }

    async create(
        name: string,
        maxPlayers: number,
        lockTime: number,
        userID: number): Promise<typeof Tournament | undefined> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        const result = await this.db.run(`
            INSERT INTO tournament (name, rounds, isRunning, lockTime, playerCount, maxPlayers)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [name, 1 ? maxPlayers < 4 : maxPlayers / 2, false, lockTime, 0, maxPlayers]
        )

        if (result.changes === 0) {
            new Error('Could not insert in database')
        }

        const id = await this.getLastID()
        if (id === undefined) {
            new Error('Could not get the last ID in the DB')
        }

        try {
            await this.join(id, userID)
            const tournament = await this.getTournament(id)

            return tournament
        } catch (error) {
            throw error
        }
    }

    async join(tournamentID: number, userID: number): Promise<void> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        await this.db.run("BEGIN TRANSACTION")
        try {
            const result = await this.db.run(`
                INSERT INTO players (tournamentID, userID)
                SELECT ?, ?
                    WHERE (
                        SELECT NOT isRunning AND playerCount < maxPlayers
                        FROM tournament
                        WHERE id = ?
                ) = 1
                AND NOT EXISTS (
                    SELECT 1
                    FROM players
                    WHERE userID = ? AND tournamentID = ?
                        )`,
                [tournamentID, userID, tournamentID, userID, tournamentID]
            )

            console.log(result)
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
                    AND tournamentID IN (
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
            // TODO: make query with join
            for (let index = 0; index < tours.length; index++) {
                tours[index]['players'] = await this.getPlayers(tours[index]['id']);
            }
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

            // TODO: make query with join
            for (let index = 0; index < tours.length; index++) {
                tours[index]['players'] = await this.getPlayers(tours[index]['id']);
            }
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

            // TODO: make query with join
            for (let index = 0; index < tours.length; index++) {
                tours[index]['players'] = await this.getPlayers(tours[index]['id']);
            }
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

            // TODO: make query with join
            for (let index = 0; index < tours.length; index++) {
                tours[index]['players'] = await this.getPlayers(tours[index]['id']);
            }
            return tours
        } catch (error) {
            throw new Error('Failed to get all running tournaments')
        }
    }

    async matches(tournamentID: number): Promise<number[][]> {

        return []
    }

    async getTournament(tournamentID: number): Promise<typeof Tournament> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        const tourObj = await this.db.get(`
            SELECT
                t.id, t.name, t.rounds,
                t.isRunning, t.lockTime, t.playerCount, t.maxPlayers,
                GROUP_CONCAT(p.userID) AS players
            FROM tournament t
            LEFT JOIN players p ON t.id = p.tournamentID
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
            rounds: tourObj['rounds'],
            isRunning: tourObj['isRunning'],
            lockTime: tourObj['lockTime'],
            playerCount: tourObj['playerCount'],
            maxPlayers: tourObj['maxPlayers'],
            players: tourObj['players'] ? tourObj['players'].split(',').map(Number) : [],
            nextMatchs: [[]]
        }
    }

    async getPlayers(tournamentID: number): Promise<number[]> {
        try {
            const players = await this.db.all(`
                SELECT userID FROM players WHERE tournamentID = ?`,
                [tournamentID])
            return players.map(players => players.userID)
        } catch (error) {
            throw error
        }
    }

    async initMatches(tournamentID: number, players: number[][]): Promise<void> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        await this.db.run("BEGIN TRANSACTION")
        for (let index = 0; index < players.length; index++) {
            try {
                await this.db.run(`
                    INSERT INTO match ( tournamentID, round, position, player1_id, player2_id )
                    VALUES (?, ?, ?, ?, ?)`,
                    [tournamentID, 1, index + 1, players[index][0], players[index][1]])
            } catch (error) {
                await this.db.run('ROLLBACK')
                throw error
            }

        }
        await this.db.run("COMMIT")
    }

    async lock(tournamentID: number): Promise<void> {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            await this.db.run("BEGIN TRANSACTION")
            await this.db.run(`
                UPDATE tournament
                SET isRunning = 1
                WHERE id = ? AND NOT isRunning`,
                [tournamentID])
            await this.db.run("COMMIT")
        } catch (error) {
            await this.db.run('ROLLBACK')
            throw error
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

        const id = await this.db.get(`SELECT MAX(id) FROM tournament`)
        if (id === undefined) {
            return id
        }

        return id['MAX(id)']
    }
}
