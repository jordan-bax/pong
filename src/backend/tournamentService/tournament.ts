import { Tournament, TournamentObj } from "./schemas/tournamentInterface"

class TournamentService {
    private tournaments: TournamentObj[] = []
    private runningTournaments: TournamentObj[] = []
    private nextID: number = 1
    private checkInterval: NodeJS.Timeout | null = null
    private isChecking: boolean = false

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

    async create(name: string, description: string, playerCount: number, userID: number, lockTime: number | undefined): Promise<Tournament> {
        if (lockTime === undefined || lockTime < 1) {
            lockTime = 60
        }

        if (lockTime > 3600) {
            lockTime = 3600
        }

        const newTournament: TournamentObj = {
            rounds: 0,
            currentRound: 0,
            nextMatchs: [],
            winner: -1,
            isRunning: false,
            lockTime: Math.round(Date.now() + (lockTime * 1000)),
            currentPlayers: [],
            tournament: {
                id: this.nextID++,
                name,
                description,
                playerCount,
                players: [userID],
                lockTime: Math.round(Date.now() + (lockTime * 1000))
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

    async start(t: TournamentObj): Promise<number[]> {
        // think this make no sense
        const index = this.tournaments.findIndex(t => t.tournament.id === t.tournament.id)
        if (index === -1) {
            return []
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
        const matches = await this.nextMatch(t.currentPlayers, t.currentPlayers.length)

        console.log(`Starting tournament ${t.tournament.id}`)
        return t.tournament.players
    }

    async nextMatch(players: number[], playerCount: number): Promise<number[][]> {
        // random choice 2 player to play with each other
        //
        return [[]]
    }
}

export default new TournamentService()
