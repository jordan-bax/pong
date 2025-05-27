const passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_=+\\[\\]{};:\'",.<>/?\\\\|]).+$'
const usernamePattern = '^[a-zA-Z0-9]+$';

export const loginSchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', pattern: passwordPattern, minLength: 12 }
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
        }
    }
};