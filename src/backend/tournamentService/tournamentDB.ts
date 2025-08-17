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
                tourID INTEGER NOT NULL,
                eliminated INTEGER DEFAULT 0,
                PRIMARY KEY(userID, tourID),
                FOREIGN KEY(tourID) REFERENCES tournament(id) ON DELETE CASCADE)`)

        await this.db.run(`
            CREATE TABLE IF NOT EXISTS match (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tourID INTEGER NOT NULL,
                round INTEGER NOT NULL,
                position INTEGER NOT NULL,
                player1ID INTEGER,
                player2ID INTEGER,
                winnerID INTEGER DEFAULT 0,
                player1Score INTEGER DEFAULT 0,
                player2Score INTEGER DEFAULT 0,
                FOREIGN KEY(tourID) REFERENCES tournament(id) ON DELETE CASCADE,
                FOREIGN KEY(player1ID) REFERENCES players(userID),
                FOREIGN KEY(player2ID) REFERENCES players(userID),
                FOREIGN KEY(winnerID) REFERENCES players(userID))`)

        await this.db.run(`
            CREATE TRIGGER IF NOT EXISTS increment_player_count
            AFTER INSERT ON players
            FOR EACH ROW
            BEGIN
                UPDATE tournament
                SET playerCount = playerCount + 1
                WHERE id = NEW.tourID;
            END`)

        await this.db.run(`
            CREATE TRIGGER IF NOT EXISTS deccrement_player_count
            AFTER DELETE ON players
            FOR EACH ROW
            BEGIN
                UPDATE tournament
                SET playerCount = playerCount - 1
                WHERE id = OLD.tourID;
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

    async join(tourID: number, userID: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            const result = await this.db.run(`
                INSERT INTO players (tourID, userID)
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
                    AND tourID = ?
                )`,
                [tourID, userID, tourID, userID, tourID])

            if (result.changes === 0) {
                throw new Error('Cannot join tournament with a invalid ID')
            }
        } catch (error) {
            throw error;
        }
    }

    async leave(tourID: number, userID: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            const result = await this.db.run(`
                DELETE FROM players
                WHERE userID = ?
                    AND tourID IN (
                        SELECT id
                        FROM tournament
                        WHERE id = ?
                )
                AND EXISTS (
                    SELECT id
                    FROM tournament
                    WHERE id = ?
                    AND NOT isRunning)`,
                [userID, tourID, tourID])

            if (result.changes === 0) {
                throw new Error('Can not leave tournament with invalid ID')
            }

            const row = await this.db.get(`
                SELECT playerCount
                FROM tournament
                WHERE id = ?`,
                [tourID])

            if (row && row.playerCount === 0) {
                await this.db.run(`
                DELETE
                FROM tournament
                WHERE id = ?`,
                    [tourID])
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
                        WHERE p.tourID = t.id
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
                        WHERE p.tourID = t.id
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
                        WHERE p.tourID = t.id
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
                        WHERE p.tourID = t.id
                    ), '') AS player_ids
                FROM tournament t`)

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

    async done(
        tourID: number,
        player1ID: number,
        player2ID: number,
        winnerID: number,
        player1Score: number,
        player2Score: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            await this.db.run(`
                UPDATE match
                SET winnerID = ?,
                    player1Score = ?,
                    player2Score = ?
                WHERE tourID = ?
                AND player1ID = ?
                AND player2ID = ?`,
                [winnerID, player1Score, player2Score, tourID, player1ID, player2ID])
        } catch (error) {
            throw new Error('Failed to update the match')
        }
    }

    async roundDone(tourID: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            const result = await this.db.get(`
                SELECT NOT EXISTS (
                    SELECT 1
                    FROM match
                    WHERE winnerID = 0
                    AND tourID = ?
                ) AS all_nonzero`,
                [tourID])

            if (result['all_nonzero'] === 1) {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw error
        }
    }

    async isTournamentDone(tourID: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        const result = await this.db.get(`
                SELECT
                    CASE
                        WHEN EXISTS (
                            SELECT 1
                            FROM match
                            WHERE tourID = ?
                              AND round = (
                                  SELECT rounds
                                  FROM tournament
                                  WHERE id = ?
                              )
                        ) THEN 1
                        ELSE 0
                    END AS result`,
                [tourID, tourID])

        if (result.result) {
            await this.setTournamentDone(tourID)
            return true
        }

        return false
    }

    async nextMatches(tourID: number) {
        const result = await this.db.all(`
                SELECT
                    winnerID,
                    round
                FROM
                    match
                WHERE
                    tourID = ?
                    AND round = (
                        SELECT COALESCE(MAX(round), 0)
                        FROM match
                        WHERE tourID = ?)`,
                [tourID, tourID])

        let nextMatch = []

        for (let index = 0; index < result.length; index++) {
            const winner1 = result[index]['winnerID'];
            if (index + 1 < result.length) {
                nextMatch.push([winner1, result[index + 1]['winnerID']])
                index++;
            } else {
                nextMatch.push([winner1, 0])
            }
        }

        await this.addMatches(tourID, nextMatch, result[0]['round'] + 1)

        return nextMatch
    }

    async getTournament(tourID: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        const tourObj = await this.db.get(`
            SELECT t.id, t.name, t.rounds, t.isRunning, t.isFinished, t.lockTime, t.playerCount, t.maxPlayers,
            (SELECT GROUP_CONCAT(p.userID)
                FROM players p
                WHERE p.tourID = t.id)
            AS players,
            (SELECT GROUP_CONCAT(
                COALESCE(m.player1ID, 'NULL') || ',' || COALESCE(m.player2ID, 'NULL'),
                ';')
            FROM match m
            WHERE m.tourID = t.id
                AND m.round = (SELECT MAX(round) FROM match WHERE tourID = t.id)
                ORDER BY m.round, m.position)
                AS matches
            FROM tournament t
            WHERE t.id = ?`,
            [tourID])

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

    async getPlayers(tourID: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            const players = await this.db.all(`
                SELECT userID
                FROM players
                WHERE tourID = ?`,
                [tourID])
            return players.map(players => players.userID)
        } catch (error) {
            throw error
        }
    }

    async addMatches(tourID: number, players: number[][], round: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        for (let index = 0; index < players.length; index++) {
            try {
                await this.db.run(`
                    INSERT INTO match ( tourID, round, position, player1ID, player2ID )
                    VALUES (?, ?, ?, ?, ?)`,
                    [tourID, round, index + 1, players[index][0], players[index][1]])
            } catch (error) {
                throw error
            }
        }
    }

    async lock(tourID: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        try {
            await this.db.run(`
                UPDATE tournament
                SET isRunning = 1
                WHERE id = ?
                AND NOT isRunning`,
                [tourID])
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

    private async setTournamentDone(tourID: number) {
        if (!this.db) {
            throw new Error('DB is not open')
        }

        await this.db.run(`
                UPDATE tournament
                    SET isFinished = 1
                    WHERE id = ?`,
                [tourID])
    }
}

export default TournamentDB
