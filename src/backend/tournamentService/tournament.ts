const { log } = require("console")
const { Tournament: Tour } = require("./schemas/tournamentInterface")
const tournamentDB = require("./tournamentDB")

const db = new tournamentDB
db.initDB('./db/tournament.sqlite')

module.exports = class TournamentService {
    private checkInterval: NodeJS.Timeout | null
    private isChecking: boolean

    constructor() {
        this.checkInterval = null
        this.isChecking = false
    }

    async create(name: string, description: string, maxPlayers: number, userID: number, duration: number | undefined): Promise<typeof Tour | undefined> {
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
            const dbObj = await db.addTournament(name, description, maxPlayers, Math.round(Date.now() + (duration * 1000)), userID)
            return dbObj
        } catch (error) {
           throw error
        }
    }

    async getByID(tournamentID: number): Promise<typeof Tour> {
        if (tournamentID  < 0) {
            throw new Error('Tournament can not be negative')
        }

        try {
           return await db.getTournament(tournamentID)
        } catch (error) {
           throw error
        }
    }

    async join(tournamentID: number, userID: number): Promise<void> {
        if (tournamentID < 0) {
            throw new Error('Tournament can not be negative')
        }

        if (userID < 1) {
            throw new Error('userID can not be negative')
        }

        try {
            await db.addPlayer(userID, tournamentID)
        } catch (error) {
            throw error
        }
    }

    async leave(tournamentID: number, userID: number): Promise<void> {
        if (tournamentID < 1) {
            throw new Error('Tournament must be more then 0')
        }

        if (userID < 1) {
            throw new Error('userID must be more then 0')
        }

        try {
            await db.leaveTournament(tournamentID, userID)
        } catch (error) {
            throw error
        }
    }

    async start(t: typeof Tour): Promise<void> {
        // TODO: think this make no sense
        // const index = this.tournaments.findIndex(t => t.tournament.id === t.tournament.id)
        // if (index === -1) {
        //     return
        // }
        //
        // this.tournaments.splice(index, 1);
        // t.isRunning = true;
        // this.runningTournaments.push(t);

        let aiID = -1
        // for (let index = t.tournament.players.length; index < t.tournament.playerCount; index++) {
        //     t.tournament.players.push(aiID)
        //     aiID--;
        // }
        //
        // t.rounds = Math.ceil(t.tournament.playerCount / 2)
        // t.currentRound = 1
        // t.nextMatchs = await this.initMatches(t.tournament.players, t.tournament.players.length)

        // notify game backend api call per game
        for (let index = 0; index < t.nextMatchs.length; index++) {
            log(t.nextMatchs[index])
            if (t.nextMatchs[index][0] < 0 && t.nextMatchs[index][1] < 0) {
                // ai game random choice winner
                continue
            }

            // send game to backend
        }

        // console.log(`Starting tournament ${t.tournament.id}`)
        return
    }

    async matchDone(tournamentID: number, playerID1: number, playerID2: number, winnerID: number): Promise<number> {
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

    private async nextMatch(players: number[], playerCount: number): Promise<number[][]> {
        return [[]]
    }

    private async initMatches(players: number[], playerCount: number): Promise<number[][]> {
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

            // matches.push(subMatch)
        }

        return matches
    }

    private startChecker(): void {
        // if (!this.checkInterval && this.tournaments.length > 0) {
        //     this.checkInterval = setInterval(() => this.checkTournaments(), 1000)
        // }
    }

    private stopChecker(): void {
        if (this.checkInterval) {
            clearInterval(this.checkInterval)
            this.checkInterval = null
        }
    }

    private async checkTournaments(): Promise<void> {
        if (this.isChecking) {
            return
        }

        this.isChecking = true
        const now = Date.now()

        // for (const tournament of this.tournaments) {
        //     if (now >= tournament.lockTime) {
        //         this.runningTournaments.push(tournament)
        //         await this.start(tournament)
        //     }
        // }
        //
        // if (this.tournaments.length === 0) {
        //     this.stopChecker()
        // }
        this.isChecking = false
    }
}
