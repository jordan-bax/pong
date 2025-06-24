export const googleLogiSchema = {
    body: {
        type: 'object',
        required: ['idToken'],
        properties: {
            idToken: { type: 'string' },
        }
    },
    responses: {
        200: {
            type: 'object',
            properties: {
                success: { type: 'boolean' }
            }
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        }
    }
};