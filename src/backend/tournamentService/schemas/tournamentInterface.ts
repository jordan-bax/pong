export interface Tournament {
    id: number
    name: string
    playerCount: number
    description: string
    players: number[]
    isLocked: boolean
    lockTime: number
}
