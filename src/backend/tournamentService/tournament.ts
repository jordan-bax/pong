import { Tournament } from "./schemas/tournamentInterface"

class TournamentService {
    private tournaments: Tournament[] = []
    private runningTournaments: Tournament[] = []
    private nextID: number = 1
    private checkInterval: NodeJS.Timeout | null = null
    private isChecking: boolean = false

    async create(name: string, description: string, playerCount: number, userID: number, lockTime: number | undefined): Promise<Tournament> {
        if (lockTime === undefined || lockTime < 1 || lockTime > 3600) {
            lockTime = 60
        }

        const newTournament: Tournament = {
            id: this.nextID++,
            name,
            description,
            playerCount,
            players: [userID],
            isLocked: false,
            lockTime: Math.round(Date.now() + (lockTime * 1000))
        }

        this.tournaments.push(newTournament)
        this.startChecker()
        return Promise.resolve(newTournament)
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

    async getByID(id: number): Promise<Tournament | undefined> {
        return Promise.resolve(this.tournaments.find(tournaments => tournaments.id === id))
    }

    async join(tournamentID: number, playerID: number): Promise<number> {
        const tournament = this.tournaments.find(tournaments => tournaments.id === tournamentID)
        if (tournament === undefined) {
            return Promise.resolve(1)
        }

        if (tournament.players.length === tournament.playerCount) {
            return Promise.resolve(2)
        }

        if (tournament.players.includes(playerID)) {
            return Promise.resolve(3)
        }

        tournament.players.push(playerID)
        return Promise.resolve(0)
    }

    async leave(tournamentID: number, playerID: number): Promise<number> {
        const tournament = this.tournaments.find(tournaments => tournaments.id === tournamentID)
        if (tournament === undefined) {
            return Promise.resolve(1)
        }

        const index = tournament.players.indexOf(playerID, 0)
        if (index === -1) {
            return Promise.resolve(2)
        }

        tournament.players.splice(index, 1)
        if (tournament.players.length === 0) {
            const index = this.tournaments.indexOf(tournament, 0)
            this.tournaments.splice(index, 1)
        }

        return Promise.resolve(0)
    }

    async start(tournament: Tournament): Promise<number[]> {
        const index = this.tournaments.findIndex(t => t.id === tournament.id)
        if (index === -1) {
            return Promise.resolve([])
        }

        this.tournaments.splice(index, 1);
        tournament.isLocked = true;
        this.runningTournaments.push(tournament);

        console.log(`Starting tournament ${tournament.id}`);
        return Promise.resolve(tournament.players);
    }
}

export default new TournamentService()
