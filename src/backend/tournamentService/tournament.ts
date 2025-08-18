import TournementDB from "./tournamentDB"

const db = new TournementDB

class TournamentService {
    private checkInterval: NodeJS.Timeout | null
    private isChecking: boolean
    private notifications: object[] = []

    constructor() {
        this.checkInterval = null
        this.isChecking = false
    }

    async init() {
        if (this.checkInterval === null) {
            this.checkInterval = setInterval(() => this.checkTournaments(), 1000)
        }

        try {
            await db.initDB('./db/tournament.sqlite')
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async create(name: string, maxPlayers: number, userID: number, duration: number | undefined) {
        if (duration === undefined || duration < 1) {
            duration = 60
        }

        if (duration > 3600) {
            duration = 3600
        }

        if (maxPlayers < 2) {
            throw new Error('maxplayers must be more then 1')
        }

        if (maxPlayers % 2 !== 0) {
            throw new Error('maxPlayers must be a even number')
        }

        if (userID < 1) {
            throw new Error('userID must be more then 0')
        }

        try {
            const dbObj = await db.create(
                name,
                maxPlayers,
                Math.round(Date.now() + (duration * 1000)),
                userID)
            return dbObj
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getByID(tourID: number) {
        if (tourID < 1) {
            throw new Error('tournamentID must be more then 0')
        }

        try {
            return await db.getTour(tourID)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getUserTours(userID: number) {
        if (userID < 1) {
            throw new Error('userID must be more then 0')
        }

        try {
            return await db.getToursByUserID(userID);
        } catch (error) {
            console.error(error)
            throw error
        }
    }


    async join(tourID: number, userID: number) {
        if (tourID < 0) {
            throw new Error('tournamentID must be more then 0')
        }

        if (userID < 1) {
            throw new Error('userID must be more then 0')
        }

        try {
            await db.join(tourID, userID)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async leave(tourID: number, userID: number) {
        if (tourID < 1) {
            throw new Error('tournamentID must be more then 0')
        }

        if (userID < 1) {
            throw new Error('userID must be more then 0')
        }

        try {
            await db.leave(tourID, userID)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async idle() {
        try {
            let tours = await db.idle()
            return tours
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async running() {
        try {
            let tours = await db.running()
            return tours
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async finished() {
        try {
            let tours = await db.finished()
            return tours
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async allTournaments() {
        try {
            let tours = await db.allTournaments()
            return tours
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async matchDone(
        tourID: number,
        player1ID: number,
        player2ID: number,
        winnerID: number,
        player1Score: number,
        player2Score: number) {
        if (tourID < 1) {
            throw new Error('tournamentID must be more then 0')
        }

        if (player1ID === 0) {
            throw new Error('player1ID can not be 0')
        }

        if (player2ID === 0) {
            throw new Error('player2ID can not be 0')
        }

        if (winnerID === 0) {
            throw new Error('winnerID can not be 0')
        }

        if (player1Score < 0) {
            throw new Error('player1Score must be more then 0')
        }

        if (player2Score < 0) {
            throw new Error('player2Score must be more then 0')
        }

        try {
            await db.done(
                tourID,
                player1ID,
                player2ID,
                winnerID,
                player1Score,
                player2Score)
        } catch (error) {
            console.error(error)
            throw error

        }
    }

    // HACK: JSON to make a deepcopy
    async getNotifications() {
        const cpy = JSON.parse(JSON.stringify(this.notifications))
        this.notifications.length = 0
        return cpy
    }

    private async match(tourID: number) {
        try {
            const tour = await db.getTour(tourID)
            for (let index = 0; index < tour.nextMatchs.length; index++) {
                if (tour.nextMatchs[index][0] < 0 && tour.nextMatchs[index][1] < 0) {
                    const winner = Math.random() < 0.5 ? 0 : 1
                    const winnerID = tour.nextMatchs[index][winner]
                    const loserScore = Math.floor(Math.random() * 11)
                    if (winner) {
                        await db.done(
                            tourID,
                            tour.nextMatchs[index][0],
                            tour.nextMatchs[index][1],
                            winnerID,
                            loserScore,
                            11)
                    } else {
                        await db.done(
                            tourID,
                            tour.nextMatchs[index][0],
                            tour.nextMatchs[index][1],
                            winnerID,
                            11,
                            loserScore)
                    }
                } else if (!tour.nextMatchs[index][0] || !tour.nextMatchs[index][1]) {
                    if (!tour.nextMatchs[index][0]) {
                        await db.done(
                            tourID,
                            tour.nextMatchs[index][0],
                            tour.nextMatchs[index][1],
                            tour.nextMatchs[index][1],
                            0,
                            11)
                    } else {
                        await db.done(
                            tourID,
                            tour.nextMatchs[index][0],
                            tour.nextMatchs[index][1],
                            tour.nextMatchs[index][0],
                            11,
                            0)
                    }
                } else {
                    // TODO: hit games endpoint
                    for (let idx = 0; idx < tour.nextMatchs[index].length; idx++) {
                        if (tour.nextMatchs[index][idx] < 0) {
                            continue
                        }
                        this.notifications.push({ timestamp: Date.now(), message: "You next match will start in 15 seconds" })
                    }
                }
            }
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    private async initMatches(
        tourID: number,
        players: number[],
        playerCount: number,
        maxPlayers: number) {
        let aiID = -1
        const len = maxPlayers - playerCount
        for (let index = 0; index < len; index++) {
            try {
                await db.join(tourID, aiID)
            } catch (error) {
                console.error(error)
                throw error
            }
            playerCount++
            aiID--;
        }

        try {
            players = await db.getPlayers(tourID)
        } catch (error) {
            console.error(error)
            throw error
        }

        let matches = []
        while (playerCount > 0) {
            let subMatch: number[] = []

            let randomNumber = Math.floor(Math.random() * playerCount)
            subMatch.push(players[randomNumber])
            let index = players.indexOf(players[randomNumber], 0)
            players.splice(index, 1)
            playerCount--

            randomNumber = Math.floor(Math.random() * playerCount)
            subMatch.push(players[randomNumber])
            index = players.indexOf(players[randomNumber], 0)
            players.splice(index, 1)
            playerCount--

            matches.push(subMatch)
        }

        try {
            await db.addMatches(tourID, matches, 1)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    private async checkTournaments() {
        if (this.isChecking) {
            return
        }

        this.isChecking = true
        const now = Date.now()

        try {
            const idleTours = await db.idle()
            for (let index = 0; index < idleTours.length; index++) {
                if (now >= idleTours[index].lockTime) {
                    await this.initMatches(
                        idleTours[index].id,
                        idleTours[index].players,
                        idleTours[index].playerCount,
                        idleTours[index].maxPlayers)
                    await db.lock(idleTours[index].id)
                    await this.match(idleTours[index].id)
                }
            }

            const runningTours = await db.running()
            for (let index = 0; index < runningTours.length; index++) {
                const roundDone = await db.roundDone(runningTours[index].id)
                if (roundDone) {
                    const tournamentDone = await db.isTourDone(runningTours[index].id)
                    if (!tournamentDone) {
                        await db.nextMatches(runningTours[index].id)
                        await this.match(runningTours[index].id)
                    }
                }
            }
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            this.isChecking = false
        }
    }
}

export default TournamentService
