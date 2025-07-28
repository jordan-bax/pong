export const createSchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            playerCount: { type: 'number' },
            userID: { type: 'number' },
            lockTime: { type: 'number' }
        },
        required: ['name', 'description', 'playerCount', 'userID']
    },
    response: {
        201: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                playerCount: { type: 'number' },
                description: { type: 'string' },
                lockTime: { type: 'number' }
            },
            required: ['id', 'name', 'playerCount', 'description', 'lockTime']
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
