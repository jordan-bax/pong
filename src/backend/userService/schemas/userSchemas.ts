export const loginSchema = {
    body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            username: { type: 'string', pattern: '^[a-zA-Z0-9]+$' },
            password: { type: 'string', pattern: '^[a-zA-Z0-9]+$' }
        }
    }
};

export const registerSchema = {
    body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            username: { type: 'string', pattern: '^[a-zA-Z0-9]+$' },
            password: { type: 'string', pattern: '^[a-zA-Z0-9]+$' }
        }
    }
};