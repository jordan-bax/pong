import { open, Database } from 'sqlite'
import sqlite3 from 'sqlite3'

class DBError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "DBError";
        Object.setPrototypeOf(this, DBError.prototype);
    }
}

class TourDB {
    private db: Database | null

    constructor() {
        this.db = null
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
                CREATE TABLE if not EXISTS tournament (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    rounds INTEGER NOT NULL,
                    isRunning INTEGER NOT NULL,
                    isFinished INTEGER NOT NULL,
                    winner INTEGER DEFAULT 0,
                    lockTime REAL NOT NULL,
                    playerCount INTEGER NOT NULL,
                    maxPlayers INTEGER NOT NULL)`
            )

            await this.db.run(`
                CREATE TABLE IF NOT EXISTS players (
                    userID INTEGER NOT NULL,
                    tourID INTEGER NOT NULL,
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

    async create(
        name: string,
        maxPlayers: number,
        lockTime: number,
        userID: number) {
        if (!this.db) {
            throw new DBError("DB is not open")
        }

        try {
            const result = await this.db.run(`
                INSERT INTO tournament (name, rounds, isRunning, isFinished, lockTime, playerCount, maxPlayers)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [name, Math.ceil(Math.log2(maxPlayers)), false, false, lockTime, 0, maxPlayers])

            if (result.changes === 0) {
                new DBError("Could not insert in database")
            }

            const id = result.lastID
            if (id === undefined) {
                new DBError("Could not get the last ID in the DB")
            }

            await this.join(id, userID)
            const tour = await this.getTour(id)

            return tour
        } catch (error) {
            throw error
        }
    }

    async join(tourID: number, userID: number) {
        if (!this.db) {
            throw new DBError("DB is not open")
        }

        try {
            if (userID < 0) {
                await this.joinAI(tourID, userID);
                return
            }

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
                throw new Error("Cannot join tournament with a invalid ID")
            }
        } catch (error) {
            throw error;
        }
    }

    async leave(tourID: number, userID: number) {
        if (!this.db) {
            throw new DBError("DB is not open")
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
                throw new Error("Can not leave tournament with invalid ID")
            }

            const row = await this.db.get(`
                SELECT playerCount
                FROM tournament
                WHERE id = ?`,
                [tourID])

            if (row && row.playerCount === 0) {
                await this.db.run(`
                DELETE
                FROM
                    tournament
                WHERE id = ?`,
                    [tourID])
            }
        } catch (error) {
            throw error
        }
    }

    async running() {
        if (!this.db) {
            throw new DBError("DB is not open")
        }

        try {
            const result = await this.db.all(`
                SELECT
                    t.*,
                    COALESCE((
                        SELECT GROUP_CONCAT(p.userID)
                        FROM players p
                        WHERE p.tourID = t.id
                    ), '') AS player_ids,
                    COALESCE((
                        SELECT MAX(round)
                        FROM match
                        WHERE tourID = t.id
                    ), 0) AS currentRound
                FROM tournament t
                WHERE isRunning = ?
                AND isFinished = ?`,
                [1, 0])

            return result.map(({ player_ids, ...row }) => ({
                ...row,
                players: player_ids
                    ? player_ids.split(",").map(Number)
                    : []
            }))
        } catch (error) {
            throw new DBError("Failed to get all running tournaments")
        }
    }

    async idle() {
        if (!this.db) {
            throw new DBError("DB is not open")
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
                    ? player_ids.split(",").map(Number)
                    : []
            }))
        } catch (error) {
            throw new DBError("Failed to get all running tournaments")
        }
    }

    async finished() {
        if (!this.db) {
            throw new DBError("DB is not open")
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
                    ? player_ids.split(",").map(Number)
                    : []
            }))
        } catch (error) {
            throw new DBError("Failed to get all running tournaments")
        }
    }

    async allTours() {
        if (!this.db) {
            throw new DBError("DB is not open")
        }

        try {
            const result = await this.db.all(`
                SELECT
                    t.*,
                    COALESCE((
                        SELECT GROUP_CONCAT(p.userID)
                        FROM players p
                        WHERE p.tourID = t.id
                    ), '') AS player_ids,
                    COALESCE((
                        SELECT MAX(round)
                        FROM match
                        WHERE tourID = t.id
                    ), 0) AS currentRound
                FROM tournament t`)

            let data = result.map(({ player_ids, ...row }) => ({
                ...row,
                players: player_ids
                    ? player_ids.split(",").map(Number)
                    : []
            }))


            return data
        } catch (error) {
            throw new DBError("Failed to get all running tournaments")
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
            throw new DBError("DB is not open")
        }

        try {
            const result = await this.db.run(`
                UPDATE match
                SET winnerID = ?,
                    player1Score = ?,
                    player2Score = ?
                WHERE tourID = ?
                AND player1ID = ?
                AND player2ID = ?`,
                [winnerID, player1Score, player2Score, tourID, player1ID, player2ID])

            if (result.changes === 0) {
                throw new DBError("Failed to update the result of a match")
            }
        } catch (error) {
            throw "Failed to update the match"
        }
    }

    async roundDone(tourID: number) {
        if (!this.db) {
            throw new DBError("DB is not open")
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

            if (result["all_nonzero"] === 1) {
                return true
            } else {
                return false
            }
        } catch (error) {
            throw error
        }
    }

    async isTourDone(tourID: number) {
        if (!this.db) {
            throw new DBError("DB is not open")
        }

        try {
            const result = await this.db.get(`
                SELECT
                    CASE
                        WHEN m.winnerID IS NOT NULL THEN 1
                        ELSE 0
                    END AS result,
                    m.winnerID
                FROM
                    (SELECT rounds FROM tournament WHERE id = ?) AS t
                LEFT JOIN
                    match m ON m.tourID = ?
                            AND m.round = t.rounds
                            AND m.round = (SELECT MAX(round) FROM match WHERE tourID = ?)
                LIMIT 1`,
                [tourID, tourID, tourID])

            if (result.result) {
                await this.setTourDone(tourID, result.winnerID)
                return true
            }

            return false
        } catch (error) {
            throw error
        }
    }

    async nextMatches(tourID: number) {
        if (!this.db) {
            throw new DBError("DB is not open")
        }

        try {
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

            let nextMatches = []
            for (let index = 0; index < result.length; index++) {
                const winner = result[index]['winnerID'];
                if (index + 1 < result.length) {
                    const nextPlayer = result[index + 1]["winnerID"]
                    let nextMatch = [winner, nextPlayer]
                    if (nextMatch[1] > 0 && nextMatch[0] < 0) {
                        nextMatch = [nextPlayer, winner]
                    }

                    nextMatches.push(nextMatch)
                    index++;
                } else {
                    nextMatches.push([winner, 0])
                }
            }

            await this.addMatches(tourID, nextMatches, result[0]["round"] + 1)

            return nextMatches
        } catch (error) {
            throw error
        }
    }

    async getToursByUserID(userID: number) {
        if (!this.db) {
            throw new DBError("DB is not open")
        }

        try {
            const result = await this.db.all(`
                 SELECT
                     t.id AS tourID,
                     t.name,
                     t.playerCount,
                     t.rounds,
                     t.winner,
                     m.round,
                     m.player1ID,
                     m.player1Score,
                     m.player2ID,
                     m.player2Score,
                     m.winnerID
                 FROM tournament t
                     INNER JOIN players p ON t.id = p.tourID
                 LEFT JOIN match m
                     ON t.id = m.tourID
                     AND (m.player1ID = ? OR m.player2ID = ?)
                 WHERE t.isFinished = 1
                     AND p.userID = ?
                 ORDER BY t.id, m.round, m.position`,
                [userID, userID, userID])

            let tours = {}
            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                if (tours[element.tourID] === undefined) {
                    tours[element.tourID] = {
                        name: element.name,
                        playerCount: element.playerCount,
                        rounds: element.rounds,
                        matches: []
                    }
                }

                tours[element.tourID].matches.push({
                    round: element.round,
                    player1: element.player1ID,
                    player2: element.player2ID,
                    score1: element.player1Score,
                    score2: element.player2Score,
                    winner: element.winnerID
                })
            }

            return tours
        } catch (error) {
            throw error
        }
    }

    async getTour(tourID: number) {
        if (!this.db) {
            throw new DBError("DB is not open")
        }

        try {
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
                throw new Error("could not get tournament from DB")
            }

            const matches = tourObj.matches
                ? tourObj.matches.split(";").map(matchStr => {
                    const [p1, p2] = matchStr.split(",");
                    return [
                        p1 !== "NULL" ? parseInt(p1, 10) : null,
                        p2 !== "NULL" ? parseInt(p2, 10) : null
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
                players: tourObj.players ? tourObj.players.split(",").map(Number) : [],
                nextMatchs: matches
            }
        } catch (error) {
            throw error
        }
    }

    async getPlayers(tourID: number) {
        if (!this.db) {
            throw new DBError("DB is not open")
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
            throw new DBError("DB is not open")
        }

        for (let index = 0; index < players.length; index++) {
            try {
                const result = await this.db.run(`
                    INSERT INTO match ( tourID, round, position, player1ID, player2ID )
                    VALUES (?, ?, ?, ?, ?)`,
                    [tourID, round, index + 1, players[index][0], players[index][1]])

                if (result.changes === 0) {
                    throw new DBError("Failed to insert new matches")
                }
            } catch (error) {
                throw error
            }
        }
    }

    async lock(tourID: number) {
        if (!this.db) {
            throw new DBError("DB is not open")
        }

        try {
            const result = await this.db.run(`
                UPDATE tournament
                SET isRunning = 1
                WHERE id = ?
                AND NOT isRunning`,
                [tourID])

            if (result.changes === 0) {
                throw new DBError("Failed to lock a tournament")
            }
        } catch (error) {
            throw Error(error)
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

    private async setTourDone(tourID: number, winnerID: number) {
        if (!this.db) {
            throw Error("DB is not open")
        }

        try {
            const result = await this.db.run(`
                    UPDATE tournament
                        SET isFinished = 1,
                            winner = ?
                        WHERE id = ?`,
                [winnerID, tourID])
            if (result.changes === 0) {
                throw new DBError("Failed to set the tournament on finished")
            }
        } catch (error) {
            throw error
        }
    }

    private async joinAI(tourID: number, userID: number) {
        if (!this.db) {
            throw new DBError("DB is not open")
        }

        try {
            const result = await this.db.run(`
                INSERT INTO players (tourID, userID)
                SELECT ?, ?
                WHERE (
                    SELECT isRunning AND
                    playerCount < maxPlayers
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
                throw new Error("Cannot join ai tournament with a invalid ID")
            }
        } catch (error) {
            throw error;
        }
    }
}

export { TourDB, DBError }
