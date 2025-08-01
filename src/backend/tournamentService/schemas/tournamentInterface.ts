export interface Tournament {
    id: number
    name: string
    description: string
    rounds: number
    currentRound: number
    winner: number
    isRunning: boolean
    lockTime: number
    playerCount: number
    maxPlayers: number
    players: number[]
    nextMatchs: number[][]
}
