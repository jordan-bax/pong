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
            player1ID: { type: 'number' },
            player2ID: { type: 'number' },
            winnerID: { type: 'number' },
            player1Score: { type: 'number'},
            player2Score: { type: 'number'}
        },
        required: ['tournamentID', 'player1ID', 'player2ID', 'winnerID', 'player1Score', 'player2Score']
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
                isFinished: { type: 'boolean' },
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
            required: ['id', 'name', 'rounds', 'isRunning', 'isFinished', 'lockTime', 'playerCount', 'maxPlayers', 'players', 'nextMatchs'],
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
                    rounds: { type: 'number' },
                    isRunning: { type: 'boolean' },
                    isFinished: { type: 'boolean' },
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
                required: ['id', 'name', 'rounds', 'isRunning', 'isFinished' , 'lockTime', 'playerCount', 'maxPlayers', 'players'],
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
