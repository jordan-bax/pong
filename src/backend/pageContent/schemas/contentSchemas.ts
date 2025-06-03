export const getContentSchema = {
    querystring: {
        type: 'object',
        required: ['language', 'textKey'],
        properties: {
            language: { type: 'string' },
            textKey: { 
                anyOf: [
                    { type: 'string' },
                    {
                        type: 'array',
                        items: { type: 'string' },
                        minItems: 1
                    }
                ]
            },
        },
        additionalProperties: false,
    },
    responses: {
        200: {
            type: 'object',
            properties: {
                success: { type: 'any' }
            }
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        },
        500: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        }
    }
};