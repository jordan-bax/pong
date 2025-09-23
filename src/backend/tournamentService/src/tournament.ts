import { TourDB } from "./tournamentDB"

const db = new TourDB

class TourService {
    private checkInterval: NodeJS.Timeout | null
    private isChecking: boolean
    private guestID: number

    constructor() {
        this.checkInterval = null
        this.isChecking = false
        this.guestID = -3600
    }

    async init(dbPath: string) {
        if (this.checkInterval === null) {
            this.checkInterval = setInterval(() => this.checkTours(), 1000)
        }

        try {
            await db.initDB(dbPath)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async create(name: string,
        maxPlayers: number,
        userID: number,
        duration: number | undefined,
        username: string) {

        if (duration === undefined || duration < 1) {
            duration = 60
        }

        if (duration > 3600) {
            duration = 3600
        }

        if (maxPlayers < 2) {
            throw new Error('maxplayers must be more then 1')
        }

        const newUsername = username.trim()
        if (!newUsername) {
            throw new Error('username can not be empty')
        }

        const newName = name.trim()
        if (!newName) {
            throw new Error('name can not be empty')
        }

        try {
            const dbObj = await db.create(
                newName,
                maxPlayers,
                Math.round(Date.now() + (duration * 1000)),
                userID,
                newUsername)
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
        try {
            return await db.getToursByUserID(userID);
        } catch (error) {
            console.error(error)
            throw error
        }
    }


    async join(tourID: number, userID: number, username: string) {
        if (tourID < 1) {
            throw new Error('tournamentID must be more then 0')
        }

        const newUsername = username.trim()
        if (!newUsername) {
            throw new Error('username can not be empty')
        }

        try {
            await db.join(tourID, userID, newUsername)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async leave(tourID: number, userID: number) {
        if (tourID < 1) {
            throw new Error('tournamentID must be more then 0')
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

    async allTours() {
        try {
            let tours = await db.allTours()
            return tours
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async matchDone(tourID: number,
        player1ID: number,
        player2ID: number,
        player1Score: number,
        player2Score: number) {

        if (tourID < 1) {
            throw new Error('tournamentID must be more then 0')
        }

        const winnerID = player1Score > player2Score ? player1ID : player2ID

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

    async updateName(userID: number, username: string) {
        const newName = username.trim()
        if (!newName) {
            throw new Error('username can not be empty')
        }

        try {
            await db.updateName(userID, username)
        } catch (error) {
            console.error(error)
            throw error
        }

    }

    async close() {
        await db.closeDB()
    }

    private async match(tourID: number) {
        try {
            const tour = await db.getTour(tourID)
            for (let index = 0; index < tour.nextMatchs.length; index++) {
                if ((tour.nextMatchs[index][0] > this.guestID && tour.nextMatchs[index][0] < 0) &&
                    (tour.nextMatchs[index][1] > this.guestID && tour.nextMatchs[index][1] < 0)) {
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
                    for (let idx = 0; idx < tour.nextMatchs[index].length; idx++) {
                        if (tour.nextMatchs[index][idx] > this.guestID && tour.nextMatchs[index][idx] < 0) {
                            continue
                        }

                        while (true) {
                            const resp = await fetch(`http://game:3002/preparegame`, {
                                method: "POST",
                                credentials: 'include',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    'playerid1': tour.nextMatchs[index][0],
                                    'playerid2': tour.nextMatchs[index][1],
                                    'tournamentId': tour.id,
                                    'gametype': 'tournament'
                                })
                            })

                            if (resp.status !== 201) {
                                setTimeout(() => console.error(resp), 1000)
                            } else {
                                break
                            }
                        }
                        break;
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
                await db.join(tourID, aiID, `AI ${Math.abs(aiID)}`)
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

            let randInt = Math.floor(Math.random() * playerCount)
            let index = players.indexOf(players[randInt], 0)
            const player1 = players[index]
            subMatch.push(player1)
            players.splice(index, 1)
            playerCount--

            randInt = Math.floor(Math.random() * playerCount)
            index = players.indexOf(players[randInt], 0)
            const player2 = players[index]
            subMatch.push(player2)
            players.splice(index, 1)
            playerCount--

            if ((player1 > this.guestID && player1 < 0) &&
                (player2 < this.guestID || player2 > 0)) {
                subMatch[0] = player2
                subMatch[1] = player1
            }

            matches.push(subMatch)
        }

        try {
            await db.addMatches(tourID, matches, 1)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    private async checkTours() {
        if (this.isChecking) {
            return
        }

        this.isChecking = true
        const now = Date.now()

        try {
            const idleTours = await db.idle()
            for (let index = 0; index < idleTours.length; index++) {
                if (now >= idleTours[index].lockTime) {
                    await db.lock(idleTours[index].id)
                    await this.initMatches(
                        idleTours[index].id,
                        idleTours[index].players,
                        idleTours[index].playerCount,
                        idleTours[index].maxPlayers)
                    await this.match(idleTours[index].id)
                }
            }

            const runningTours = await db.running()
            for (let index = 0; index < runningTours.length; index++) {
                const roundDone = await db.roundDone(runningTours[index].id)
                if (roundDone) {
                    const tourDone = await db.isTourDone(runningTours[index].id)
                    if (!tourDone) {
                        await db.nextMatches(runningTours[index].id)
                        await this.match(runningTours[index].id)
                    }
                }
            }
        } catch (error) {
            console.error(error)
        } finally {
            this.isChecking = false
        }
    }
}

export default TourService
