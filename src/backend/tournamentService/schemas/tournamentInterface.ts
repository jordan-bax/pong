export interface TournamentObj {
    rounds: number
    currentRound: number
    nextMatchs: number[][]
    winner: number
    tournament: Tournament
    isRunning: boolean
    lockTime: number
    currentPlayers: number[]
}

export interface Tournament {
    id: number
    name: string
    playerCount: number
    description: string
    players: number[]
    lockTime: number
}
