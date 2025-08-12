import { open, Database } from 'sqlite'
import sqlite3 from 'sqlite3'

class TournamentDB {
    private db: Database | null

    constructor() {
        this.db = null
    }

    async initDB(path: string) {
        if (this.db !== null) {
            throw new Error('DB in class must be null to init it')
        }

        await this.openDB(path)
        if (this.db === null) {
            throw new Error('Failed to open the DB')
        }

        await this.db.run(`
            CREATE TABLE if not EXISTS tournament (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                rounds INTEGER NOT NULL,
                isRunning INTEGER NOT NULL,
                isFinished INTEGER NOT NULL,
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

        await this.db.run(`
            CREATE TRIGGER IF NOT EXISTS increment_player_count
            AFTER INSERT ON players
            FOR EACH ROW
            BEGIN
                UPDATE tournament
                SET playerCount = playerCount + 1
                WHERE id = NEW.tournamentID;
            END`)

        await this.db.run(`
            CREATE TRIGGER IF NOT EXISTS deccrement_player_count
            AFTER DELETE ON players
            FOR EACH ROW
            BEGIN
                UPDATE tournament
                SET playerCount = playerCount - 1
                WHERE id = OLD.tournamentID;
            END`)
    }

    async openDB(path: string) {
        if (this.db === null) {
            this.db = await open({
                filename: path,
                driver: sqlite3.Database,
                mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE | sqlite3.OPEN_FULLMUTEX
            })
        }
    }

    async create(
        name: string,
        maxPlayers: number,
        lockTime: number,
        userID: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        const result = await this.db.run(`
            INSERT INTO tournament (name, rounds, isRunning, isFinished, lockTime, playerCount, maxPlayers)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, Math.ceil(Math.log2(maxPlayers)), false, false, lockTime, 0, maxPlayers])
        if (result.changes === 0) {
            new Error('Could not insert in database')
        }

        const id = result.lastID
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

    async join(tournamentID: number, userID: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            const result = await this.db.run(`
                INSERT INTO players (tournamentID, userID)
                SELECT ?, ?
                WHERE (
                    SELECT NOT isRunning
                    AND playerCount < maxPlayers
                    FROM tournament
                    WHERE id = ?
                ) = 1
                AND NOT EXISTS (
                    SELECT 1
                    FROM players
                    WHERE userID = ?
                    AND tournamentID = ?
                )`,
                [tournamentID, userID, tournamentID, userID, tournamentID])

            if (result.changes === 0) {
                throw new Error('Cannot join tournament with a invalid ID')
            }
        } catch (error) {
            throw error;
        }
    }

    async leave(tournamentID: number, userID: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

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
                [userID, tournamentID, tournamentID])

            if (result.changes === 0) {
                throw new Error('Can not leave tournament with invalid ID')
            }

            const row = await this.db.get(`
                SELECT playerCount
                FROM tournament
                WHERE id = ?`,
                [tournamentID])

            if (row && row.playerCount === 0) {
                await this.db.run(`
                DELETE
                FROM tournament
                WHERE id = ?`,
                    [tournamentID])
            }
        } catch (error) {
            throw error
        }
    }

    async running() {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            const result = await this.db.all(`
                SELECT
                    t.*,
                    COALESCE((
                        SELECT GROUP_CONCAT(p.userID)
                        FROM players p
                        WHERE p.tournamentID = t.id
                    ), '') AS player_ids
                FROM tournament t
                WHERE isRunning = ?
                AND isFinished = ?`,
                [1, 0])

            return result.map(({ player_ids, ...row }) => ({
                ...row,
                players: player_ids
                    ? player_ids.split(',').map(Number)
                    : []
            }))
        } catch (error) {
            throw new Error('Failed to get all running tournaments')
        }
    }

    async idle() {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            const result = await this.db.all(`
                SELECT
                    t.*,
                    COALESCE((
                        SELECT GROUP_CONCAT(p.userID)
                        FROM players p
                        WHERE p.tournamentID = t.id
                    ), '') AS player_ids
                FROM tournament t
                WHERE isRunning = ?`,
                [0])

            return result.map(({ player_ids, ...row }) => ({
                ...row,
                players: player_ids
                    ? player_ids.split(',').map(Number)
                    : []
            }))
        } catch (error) {
            throw new Error('Failed to get all running tournaments')
        }
    }

    async finished() {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            const result = await this.db.all(`
                SELECT
                    t.*,
                    COALESCE((
                        SELECT GROUP_CONCAT(p.userID)
                        FROM players p
                        WHERE p.tournamentID = t.id
                    ), '') AS player_ids
                FROM tournament t
                WHERE isFinished = ?`,
                [1])

            return result.map(({ player_ids, ...row }) => ({
                ...row,
                players: player_ids
                    ? player_ids.split(',').map(Number)
                    : []
            }))
        } catch (error) {
            throw new Error('Failed to get all running tournaments')
        }
    }

    async allTournaments() {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            const result = await this.db.all(`
                SELECT
                    t.*,
                    COALESCE((
                        SELECT GROUP_CONCAT(p.userID)
                        FROM players p
                        WHERE p.tournamentID = t.id
                    ), '') AS player_ids
                FROM tournament t`)

            return result.map(({ player_ids, ...row }) => ({
                ...row,
                players: player_ids
                    ? player_ids.split(',').map(Number)
                    : []
            }))
        } catch (error) {
            console.log(error)
            throw new Error('Failed to get all running tournaments')
        }
    }

    async matches(tournamentID: number) {

        return []
    }

    async getTournament(tournamentID: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        const tourObj = await this.db.get(`
            SELECT t.id, t.name, t.rounds, t.isRunning, t.isFinished, t.lockTime, t.playerCount, t.maxPlayers,
            (SELECT GROUP_CONCAT(p.userID)
                FROM players p
                WHERE p.tournamentID = t.id)
            AS players,
            (SELECT GROUP_CONCAT(
                    COALESCE(m.player1_id, 'NULL') || ',' || COALESCE(m.player2_id, 'NULL'),
                    ';')
            FROM match m
            WHERE m.tournamentID = t.id
            ORDER BY m.round, m.position)
            AS matches
            FROM tournament t
            WHERE t.id = ?`,
            [tournamentID])

        if (tourObj === undefined) {
            throw new Error('could not get tournament from DB')
        }

        const matches = tourObj.matches
                ? tourObj.matches.split(';').map(matchStr => {
                    const [p1, p2] = matchStr.split(',');
                    return [
                        p1 !== 'NULL' ? parseInt(p1, 10) : null,
                        p2 !== 'NULL' ? parseInt(p2, 10) : null
                    ]
                })
                : []

        return {
            id: tourObj.id,
            name: tourObj.name,
            rounds: tourObj.rounds,
            isRunning: tourObj.isRunning,
            isFinished: tourObj.isFinished,
            lockTime: tourObj.lockTime,
            playerCount: tourObj.playerCount,
            maxPlayers: tourObj.maxPlayers,
            players: tourObj.players ? tourObj.players.split(',').map(Number) : [],
            nextMatchs: matches
        }
    }

    async getPlayers(tournamentID: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            const players = await this.db.all(`
                SELECT userID
                FROM players
                WHERE tournamentID = ?`,
                [tournamentID])
            return players.map(players => players.userID)
        } catch (error) {
            throw error
        }
    }

    async initMatches(tournamentID: number, players: number[][]) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        for (let index = 0; index < players.length; index++) {
            try {
                await this.db.run(`
                    INSERT INTO match ( tournamentID, round, position, player1_id, player2_id )
                    VALUES (?, ?, ?, ?, ?)`,
                    [tournamentID, 1, index + 1, players[index][0], players[index][1]])
            } catch (error) {
                throw error
            }

        }
    }

    async lock(tournamentID: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            await this.db.run(`
                UPDATE tournament
                SET isRunning = 1
                WHERE id = ?
                AND NOT isRunning`,
                [tournamentID])
        } catch (error) {
            throw error
        }
    }

    async closeDB() {
        if (this.db) {
            await this.db.close()
            this.db = null
        }
    }
}

export default TournamentDB
