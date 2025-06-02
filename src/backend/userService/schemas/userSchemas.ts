const passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_=+\\[\\]{};:\'",.<>/?\\\\|]).+$'
const usernamePattern = '^[a-zA-Z0-9]+$';

export const loginSchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', pattern: passwordPattern, minLength: 12 }
        },
        additionalProperties: false,
    },
    responses: {
        200: {
            type: 'object',
            properties: {
                success: 'boolean'
            }
        },
        401: {
            type: 'object',
            properties: {
                error: 'string'
            }
        },
        500: {
            type: 'object',
            properties: {
                error: 'string'
            }
        }
    }
};

export const registerSchema = {
    body: {
        type: 'object',
        required: ['username', 'password', 'email'],
        properties: {
            username: { type: 'string', pattern: usernamePattern },
            password: { type: 'string', pattern: passwordPattern, minLength: 12 },
            email: { type: 'string', format: 'email'}
        },
        additionalProperties: false,
    },
    responses: {
         200: {
            type: 'object',
            properties: {
                success: 'boolean'
            }
        },
        401: {
            type: 'object',
            properties: {
                error: 'string'
            }
        },
        500: {
            type: 'object',
            properties: {
                error: 'string'
            }
        }
    }
};

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