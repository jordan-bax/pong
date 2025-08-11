import { log } from "console"
import { Tournament } from "./schemas/tournamentInterface.ts"
import TournementDB from "./tournamentDB"

const db = new TournementDB

class TournamentService {
    private checkInterval: NodeJS.Timeout | null
    private isChecking: boolean

    constructor() {
        this.checkInterval = null
        this.isChecking = false
    }

    async init() {
        await db.initDB('./db/tournament.sqlite')
    }

    async create(name: string, maxPlayers: number, userID: number, duration: number | undefined) {
        if (duration === undefined || duration < 1) {
            duration = 60
        }

        if (duration > 3600) {
            duration = 3600
        }

        if (maxPlayers < 2) {
            throw new Error('Maxplayers must be more then 1')
        }

        if (maxPlayers % 2 !== 0) {
            throw new Error('maxPlayers must be a even number')
        }

        if (userID < 1) {
            throw new Error('userID must be more then 0')
        }

        try {
            const dbObj = await db.create(name, maxPlayers, Math.round(Date.now() + (duration * 1000)), userID)
            if (this.checkInterval === null) {
                this.checkInterval = setInterval(() => this.checkTournaments(), 1000)
            }
            return dbObj
        } catch (error) {
           throw error
        }
    }

    async getByID(tournamentID: number) {
        if (tournamentID  < 1) {
            throw new Error('Tournament can not be negative')
        }

        try {
           return await db.getTournament(tournamentID)
        } catch (error) {
           throw error
        }
    }

    async join(tournamentID: number, userID: number) {
        if (tournamentID < 0) {
            throw new Error('Tournament can not be negative')
        }

        if (userID < 1) {
            throw new Error('userID can not be negative')
        }

        try {
            await db.join(tournamentID, userID)
        } catch (error) {
            throw error
        }
    }

    async leave(tournamentID: number, userID: number) {
        if (tournamentID < 1) {
            throw new Error('Tournament must be more then 0')
        }

        if (userID < 1) {
            throw new Error('userID must be more then 0')
        }

        try {
            await db.leave(tournamentID, userID)
        } catch (error) {
            throw error
        }
    }

    async idle() {
        try {
            let tours = await db.idle()
            return tours
        } catch (error) {
            throw error
        }
    }

    async running() {
        try {
            let tours = await db.running()
            return tours
        } catch (error) {
            throw error
        }
    }
    async finished() {
        try {
            let tours = await db.finished()
            return tours
        } catch (error) {
            throw error
        }
    }

    async allTournaments() {
        try {
            let tours = await db.allTournaments()
            return tours
        } catch (error) {
            throw error
        }
    }

    async start(tournament: Tournament[]) {
        // const games = await db.games(tournament.id)

        // check if thre are ai only games


        // call game backend to set game

        // set notification

        return
    }

    async matchDone(tournamentID: number, playerID1: number, playerID2: number, winnerID: number) {
        // const index = this.runningTournaments.findIndex(t => t.tournament.id === tournamentID)
        // if (index === -1) {
        //     return 1
        // }

        // const t = this.runningTournaments[index]

        const lossersID = playerID2 === winnerID ? playerID1 : playerID2

        // const lossersIndex = t.currentPlayers.indexOf(lossersID, 0)
        // t.currentPlayers.splice(lossersIndex, 0)
        //
        // // remove from nextMatchs
        // const removeMatchIndex = t.nextMatchs.indexOf([playerID1, playerID2], 0)
        // t.nextMatchs.splice(removeMatchIndex, 0)

        // if (t.nextMatchs.length === 0) {
        //     this.nextMatch(t.tournament.players, t.tournament.players.length)
        // }
        //
        return 0
    }

    private async nextMatch(players: number[], playerCount: number) {
        return [[]]
    }

    private async initMatches(tournamentID: number, players: number[], playerCount: number, maxPlayers: number) {
        let aiID = -1
        const len = maxPlayers - playerCount
        for (let index = 0; index < len; index++) {
            await db.join(tournamentID, aiID)
            playerCount++
            aiID--;
        }

        players = await db.getPlayers(tournamentID)

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

        await db.initMatches(tournamentID, matches)
    }

    private async checkTournaments() {
        if (this.isChecking) {
            return
        }

        this.isChecking = true
        const now = Date.now()

        const idleTours = await db.idle()
        for (let index = 0; index < idleTours.length; index++) {
            if (now >= idleTours[index]['lockTime']) {
                console.log(idleTours[index])
                await this.initMatches(idleTours[index]['id'], idleTours[index]['players'], idleTours[index]['playerCount'], idleTours[index]['maxPlayers'])
                await db.lock(idleTours[index]['id'])
                this.start(idleTours)
            }
        }

        this.isChecking = false
    }
}

export default TournamentService
