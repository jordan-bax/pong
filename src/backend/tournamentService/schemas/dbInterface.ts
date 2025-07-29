export interface dbAddTourInterface {
    id: number
    description: string
    name: string
    curRound: number
    running: boolean
    lockTime: number
    winner: number
    maxPlayers: number
}
