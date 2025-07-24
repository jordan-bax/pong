import { Tournament } from "./schemas/tournamentInterface"

class TournamentService {
    private tournaments: Tournament[] = []
    private runningTournaments: Tournament[] = []
    private nextID: number = 1
    private checkInterval: NodeJS.Timeout | null = null

    create(name: string, description: string, playerCount: number, userID: number, lockTime: number | undefined): Tournament {
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
        return newTournament
    }

    private startChecker() {
        if (!this.checkInterval && this.tournaments.length > 0) {
            this.checkInterval = setInterval(() => this.checkTournaments(), 1000)
        }
    }

    private stopChecker() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval)
            this.checkInterval = null
        }
    }

    private checkTournaments() {
        const now = Date.now()

        for (const tournament of this.tournaments) {
            if (now >= tournament.lockTime) {
                this.runningTournaments.push(tournament)
                this.start(tournament)
            }
        }

        if (this.tournaments.length === 0) {
            this.stopChecker()
        }
    }

    getByID(id: number): Tournament | undefined {
        return this.tournaments.find(tournaments => tournaments.id === id)
    }

    join(tournamentID: number, playerID: number): number {
        const tournament = this.tournaments.find(tournaments => tournaments.id === tournamentID)
        if (tournament === undefined) {
            return 1
        }

        if (tournament.players.length === tournament.playerCount) {
            return 2
        }

        if (tournament.players.includes(playerID)) {
            return 3
        }

        tournament.players.push(playerID)
        return 0
    }

    leave(tournamentID: number, playerID: number): number {
        const tournament = this.tournaments.find(tournaments => tournaments.id === tournamentID)
        if (tournament === undefined) {
            return 1
        }

        const index = tournament.players.indexOf(playerID, 0)
        if (index === -1) {
            return 2
        }

        tournament.players.splice(index, 1)
        if (tournament.players.length === 0) {
            const index = this.tournaments.indexOf(tournament, 0)
            this.tournaments.splice(index, 1)
        }

        return 0
    }

    start(tournament: Tournament): number[] {
        const index = this.tournaments.findIndex(t => t.id === tournament.id)
        if (index === -1) {
            return []
        }

        this.tournaments.splice(index, 1);
        tournament.isLocked = true;
        this.runningTournaments.push(tournament);

        console.log(`Starting tournament ${tournament.id}`);
        return tournament.players;
    }
}

export default new TournamentService()
