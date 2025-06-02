export const updateContentSchema = {
    body: {
        type: 'object',
        required: ['languageOld', 'languageNew', 'textKeyOld', 'textKeyNew', 'bodyNew'],
        properties: {
            languageOld: { type: 'string' },
            languageNew: { type: 'string' },
            textKeyOld: { type: 'string' },
            textKeyNew: { type: 'string' },
            bodyNew: { type: 'string' },
        },
        additionalProperties: false,
    },
    response: {
        200: {
            type: 'object',
            properties: {
                success: { type: 'string' }
            }
        },
        400: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        },
        409: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        },
        500: {
            type: 'object',
            properties: {
                error: {type: 'string' }
            }
        }
    }
};

export const getContentSchema = {
    querystring: {
        type: 'object',
        required: ['language', 'textKey'],
        properties: {
            language: { type: 'string' },
            textKey: { type: 'string' },
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

export const InsertSchema = {
    body: {
        type: 'object',
        required: ['language', 'textKey', 'body'],
        properties: {
            language: { type: 'string' },
            textKey: { type: 'string' },
            body: { type: 'string' },
        },
        additionalProperties: false,
    },
    responses: {
        200: {
            type: 'object',
            properties: {
                success: { type: 'string' }
            }
        },
        409: {
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

export const DeleteSchema = {
    body: {
        type: 'object',
        required: ['language', 'textKey'],
        properties: {
            language: { type: 'string' },
            textKey: { type: 'string' },
        },
        additionalProperties: false,
    },
    responses: {
        200: {
            type: 'object',
            properties: {
                success: { type: 'string' }
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
}