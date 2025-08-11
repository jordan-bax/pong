export interface Tournament {
    id: number
    name: string
    rounds: number
    isRunning: boolean
    lockTime: number
    playerCount: number
    maxPlayers: number
    players: number[]
    nextMatchs: number[][]
}
