import { log } from "console"
import { Tournament, TournamentObj } from "./schemas/tournamentInterface"
import tournamentDB from "./tournamentDB"

const db = new tournamentDB
db.initDB('./db/tournament.sqlite')

class TournamentService {
    private tournaments: TournamentObj[] = []
    private runningTournaments: TournamentObj[] = []
    private checkInterval: NodeJS.Timeout | null = null
    private isChecking: boolean = false

    async create(name: string, description: string, playerCount: number, userID: number, duration: number | undefined): Promise<Tournament | undefined> {
        if (duration === undefined || duration < 1) {
            duration = 60
        }

        if (duration > 3600) {
            duration = 3600
        }

        if (playerCount < 1 || playerCount % 2 !== 0) {
            return undefined
        }

        const dbObj = await db.addTournament(name, description, 1, playerCount, false, Math.round(Date.now() + (duration * 1000)))
        const newTournament: TournamentObj = {
            rounds: 0,
            currentRound: dbObj['curRound'],
            nextMatchs: [],
            winner: dbObj['winner'],
            isRunning: dbObj['running'],
            lockTime: dbObj['lockTime'],
            currentPlayers: [],
            tournament: {
                id: dbObj['id'],
                name: dbObj['name'],
                description: dbObj['description'],
                playerCount: dbObj['maxPlayers'],
                players: [userID],
                lockTime: dbObj['lockTime']
            }
        }

        this.tournaments.push(newTournament)
        this.startChecker()
        return newTournament.tournament
    }

    async getByID(id: number): Promise<Tournament | undefined> {
        const tournament = this.tournaments.find(t => t.tournament.id === id)
        if (tournament === undefined) {
            return tournament
        }

        return tournament.tournament
    }

    async join(tournamentID: number, playerID: number): Promise<number> {
        const tournament = this.tournaments.find(t => t.tournament.id === tournamentID)
        if (tournament === undefined) {
            return 1
        }

        if (tournament.tournament.players.length === tournament.tournament.playerCount) {
            return 2
        }

        if (tournament.tournament.players.includes(playerID)) {
            return 3
        }

        if (tournament.isRunning) {
            return 4
        }

        tournament.tournament.players.push(playerID)
        return 0
    }

    async leave(tournamentID: number, playerID: number): Promise<number> {
        const tournament = this.tournaments.find(t => t.tournament.id === tournamentID)
        if (tournament === undefined) {
            return 1
        }

        const index = tournament.tournament.players.indexOf(playerID, 0)
        if (index === -1) {
            return 2
        }

        tournament.tournament.players.splice(index, 1)
        if (tournament.tournament.players.length === 0) {
            const index = this.tournaments.indexOf(tournament, 0)
            this.tournaments.splice(index, 1)
        }

        return 0
    }

    async start(t: TournamentObj): Promise<void> {
        // think this make no sense
        const index = this.tournaments.findIndex(t => t.tournament.id === t.tournament.id)
        if (index === -1) {
            return
        }

        this.tournaments.splice(index, 1);
        t.isRunning = true;
        this.runningTournaments.push(t);

        let aiID = -1
        for (let index = t.tournament.players.length; index < t.tournament.playerCount; index++) {
            t.tournament.players.push(aiID)
            aiID--;
        }

        t.rounds = Math.ceil(t.tournament.playerCount / 2)
        t.currentRound = 1
        t.currentPlayers = [...t.tournament.players]
        t.nextMatchs = await this.initMatches(t.currentPlayers, t.currentPlayers.length)

        // notify game backend api call per game
        for (let index = 0; index < t.nextMatchs.length; index++) {
            log(t.nextMatchs[index])
            if (t.nextMatchs[index][0] < 0 && t.nextMatchs[index][1] < 0) {
                // ai game random choice winner
                continue
            }

            // send game to backend
        }

        console.log(`Starting tournament ${t.tournament.id}`)
        return
    }

    async matchDone(tournamentID: number, playerID1: number, playerID2: number, winnerID: number): Promise<number> {
        const index = this.runningTournaments.findIndex(t => t.tournament.id === tournamentID)
        if (index === -1) {
            return 1
        }

        const t = this.runningTournaments[index]

        const lossersID = playerID2 === winnerID ? playerID1 : playerID2

        // const lossersIndex = t.currentPlayers.indexOf(lossersID, 0)
        // t.currentPlayers.splice(lossersIndex, 0)
        //
        // // remove from nextMatchs
        // const removeMatchIndex = t.nextMatchs.indexOf([playerID1, playerID2], 0)
        // t.nextMatchs.splice(removeMatchIndex, 0)

        if (t.nextMatchs.length === 0) {
            this.nextMatch(t.currentPlayers, t.currentPlayers.length)
        }

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

            matches.push(subMatch)
        }

        return matches
    }

    private startChecker(): void {
        if (!this.checkInterval && this.tournaments.length > 0) {
            this.checkInterval = setInterval(() => this.checkTournaments(), 1000)
        }
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

        for (const tournament of this.tournaments) {
            if (now >= tournament.lockTime) {
                this.runningTournaments.push(tournament)
                await this.start(tournament)
            }
        }

        if (this.tournaments.length === 0) {
            this.stopChecker()
        }
        this.isChecking = false
    }
}

export default new TournamentService()
