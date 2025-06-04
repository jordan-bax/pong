import { renderContent } from "./contentRenderer.js";
import { renderNavbar } from "./navbar.js";


const statusHandlers: { [key: number]: string } = {
    401: 'Invalid login credentials',
    404: 'User not found',
    409: 'Username already in use',
    500: 'Internal server error'
};

export const routeFromPath: { [key: string]: string } = {
    '/': 'home',
    '/profile': 'profile',
    '/login': 'login',
    '/register': 'register',
    '/google': 'google'
};

interface userInfo {
    username: string;
    email: string;
}

const fastifyErrorHandling:{ [key: string ]: string } = {
    FST_ERR_VALIDATION: 'Invalid input: use only letters and numbers',
};

let isLoggedIn = false;
let currentUser: string | null = null;

export function getLoggin(): boolean {
    return isLoggedIn;
}

export function getCurrentUser(): string | null{
    return currentUser;
}

export async function getLogginServer(): Promise<string | null> {
    const serverUser = await fetch('api/user/me')
    const data = await serverUser.json();
    return data.user?.email;
}

export async function getLogginUserData(): Promise<userInfo | null> {
    const serverUser = await fetch('api/user/me/data', {
        credentials: 'include'
    });
    if (!serverUser.ok) {
        return null;
    }
    const userData =await serverUser.json() as userInfo;
    return userData;
}

export async function updateUserInfo(email: string, username: string): Promise<void> {
    const response = await fetch('api/user/update', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, username })
    });
    const content = document.getElementById('error');
    if (!response.ok) {
        const errorData = await response.json();
        const message = fastifyErrorHandling[errorData.code] ??
                        statusHandlers[response.status] ??
                        errorData.message ??
                        'unknown error';
        if (content) {
            content.textContent = message;
            content.className = 'eror-text';
            return ;
        }
    }
    history.pushState({}, '', '/profile');
    checkSession();
    renderContent('profile');
}

export async function checkSession() {
    const response = await fetch('/api/user/me');
    const data = await response.json();
    isLoggedIn = data.loggedIn ? true : false;
    currentUser = data.user?.email ?? null;
    renderNavbar();
    renderContent(routeFromPath[window.location.pathname] || 'not found');
}

export async function login(email: string, password: string): Promise<void> {
    const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const content = document.getElementById('error');
    if (!response.ok)
    {
        const errorData = await response.json();
        const message = fastifyErrorHandling[errorData.code] ??
                        statusHandlers[response.status] ??
                        errorData.message ??
                        'Unknown error occured.';
        if (content) {
            content.innerHTML = `
            <p class="error-text">${message}</p>
            `
        }
    } else {
        isLoggedIn = true;
        history.pushState({}, '', '/profile');
        checkSession();
        renderContent('profile');
    }
}

export async function register(username: string, password: string, email:string): Promise<void> {
    const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
    });

    const content = document.getElementById('error');
    if (!response.ok) {
        const errorData = await response.json();
        const message = fastifyErrorHandling[errorData.code] ??
                        statusHandlers[response.status] ??
                        errorData.message ??
                        'Unknown error occured.';
        if (content) {
            content.innerHTML = `
            <p class="error-text">${message}</p>
            `
        }
    } else {
        isLoggedIn = true;
        history.pushState({}, '', '/profile');
        checkSession();
        renderContent('profile');
    }
}

export async function logout(): Promise<void> {
    await fetch('/api/user/logout', { method: 'POST'});
    isLoggedIn = false;
    currentUser = null;
    history.pushState({}, '', '/');
    checkSession();
    renderContent('home');
}

export async function handleGoogleCredentials(request:{ credential: string}): Promise<void> {
    const response = await fetch ('api/user/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: request.credential }),
        credentials: 'include',
    });
    if (response.ok) {
        isLoggedIn = true;
        history.pushState({}, '', '/profile');
        checkSession();
        renderContent('profile');
    } else {
        let errorMessage;
        const cloned = response.clone();
        try {
            errorMessage = await cloned.json();
        } catch (e) {
            const text  = await cloned.text();
            errorMessage = { error: text };
        }
        console.log('google login failed:', errorMessage);
    }
}