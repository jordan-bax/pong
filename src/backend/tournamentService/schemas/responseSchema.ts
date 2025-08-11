export const createSchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            maxPlayers: { type: 'number' },
            userID: { type: 'number' },
            lockTime: { type: 'number' }
        },
        required: ['name', 'maxPlayers', 'userID']
    },
    response: {
        201: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                maxPlayers: { type: 'number' },
                lockTime: { type: 'number' }
            },
            required: ['id', 'name', 'maxPlayers', 'lockTime']
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            required: ['error']
        },
    }
}

export const joinSchema = {
    body: {
        type: 'object',
        properties: {
            tournamentID: { type: 'number' },
            userID: { type: 'number' }
        },
        required: ['tournamentID', 'userID']
    },
    response: {
        201: {
            type: 'object',
            properties: {
                tournamnetID: { type: 'number' },
            }
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            required: ['error']
        },
    }
}

export const leaveSchema = {
    body: {
        type: 'object',
        properties: {
            tournamentID: { type: 'number' },
            userID: { type: 'number' }
        },
        required: ['tournamentID', 'userID']
    },
    response: {
        201: {
            type: 'object',
            properties: {
                tournamnetID: { type: 'number' },
            }
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            required: ['error']
        },
    }
}

export const gameDoneSchema = {
    body: {
        type: 'object',
        properties: {
            tournamentID: { type: 'number' },
            playerID1: { type: 'number' },
            playerID2: { type: 'number' },
            winnerID: { type: 'number' }
        },
        required: ['playerID1', 'playerID2', 'winnerID']
    },
    response: {
        201: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            required: ['error']
        },
    }
}

export const getTourSchema = {
    querystring: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                pattern: '^\\d+$'
            }
        },
        required: ['id']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                rounds: { type: 'number' },
                isRunning: { type: 'boolean' },
                lockTime: { type: 'number' },
                playerCount: { type: 'number' },
                maxPlayers: { type: 'number' },
                players: {
                    type: 'array',
                    items: { type: 'number' }
                },
                nextMatchs: {
                    type: 'array',
                    items: {
                        type: 'array',
                        items: { type: 'number' }
                    }
                }
            },
            required: ['id', 'name', 'rounds', 'isRunning', 'lockTime', 'playerCount', 'maxPlayers', 'players'],
            additionalProperties: true
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            required: ['error']
        }
    }
}

export const getToursSchema = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    rounds: { type: 'number' },
                    currentRound: { type: 'number' },
                    winner: { type: 'number' },
                    isRunning: { type: 'boolean' },
                    lockTime: { type: 'number' },
                    playerCount: { type: 'number' },
                    maxPlayers: { type: 'number' },
                    players: {
                        type: 'array',
                        items: { type: 'number' }
                    },
                    nextMatchs: {
                        type: 'array',
                        items: {
                            type: 'array',
                            items: { type: 'number' }
                        }
                    }
                },
                required: ['id', 'name', 'description', 'rounds', 'currentRound', 'winner', 'isRunning', 'lockTime', 'playerCount', 'maxPlayers', 'players'],
                additionalProperties: true
            }
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            },
            required: ['error']
        }
    }
}
