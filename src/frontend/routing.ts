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

export interface userInfo {
    username: string;
    email: string;
    password: string;
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

export async function getCsrfToken(): Promise<string | null> {
    const response = await fetch('api/user/csrf-token', {
        credentials: 'include'
    });
    if (response.ok) {
        const data = await response.json();
        return data.csrfToken;
    }
    return null;
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
    const data = await serverUser.json();
    const userData = data.user as userInfo;
    return userData;
}

export async function updateUserInfo(
    oldEmail: string, 
    oldUsername: string, 
    oldPassword:string, 
    formData: FormData
): Promise<void> {
    console.log('in UpdateUserInfo');
    formData.append('oldEmail', oldEmail);
    formData.append('oldUsername', oldUsername);
    formData.append('oldPassword', oldPassword);
    const response = await fetch('api/user/update', {
        credentials: 'include',
        method: 'PATCH',
        body: formData
    });
    const content = document.getElementById('error');
    if (!response.ok) {
        const errorData = await response.json();
        const message = statusHandlers[response.status] ??
                        errorData.message ??
                        'unknown error';
        if (content) {
            content.textContent = message;
            content.style.color = 'red';
            return ;
        }
    }
    history.pushState({}, '', '/profile');
    checkSession();
}

export async function googleUserUpdate(formData: FormData): Promise<void> {
    const response = await fetch('api/user/update-google', {
        credentials: 'include',
        method: 'PATCH',
        body: formData
    });
    const content = document.getElementById('error');
    if (!response.ok) {
        const errorData = await response.json();
        const message = statusHandlers[response.status] ??
                        errorData.message ??
                        'unknown error';
        if (content) {
            content.textContent = message;
            content.style.color = 'red';
            return ;
        }
    }
    history.pushState({}, '', '/profile');
    checkSession();
}

export async function checkSession() {
    const response = await fetch('/api/user/me');
    const data = await response.json();
    isLoggedIn = data.loggedIn ? true : false;
    currentUser = data.user?.email ?? null;
    renderNavbar();
    renderContent(routeFromPath[window.location.pathname] || 'not found');
}

export async function login(formData: FormData): Promise<void> {
    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: formData,
    });
    const content = document.getElementById('error');
    if (!response.ok) {
        const errorData = await response.json();
        let messages = [];
        if (errorData.error) {
            messages.push(errorData.error as string);
        }
        if (errorData.errors) {
            for(const error of errorData.erros as string[]) {
                messages.push(error);
            }
        }
        if (content) {
            content.innerHTML = '';
            for (const error of messages) {
                const paragraph = document.createElement('p');
                paragraph.style.color = 'red';

                const text = document.createTextNode(error);
                paragraph.appendChild(text);
                content.appendChild(paragraph);
            }
        }
    } else {
        isLoggedIn = true;
        history.pushState({}, '', '/profile');
        checkSession();
    }
}

export async function register(formData: FormData): Promise<void> {
    const response = await fetch('/api/user/register', {
        method: 'POST',
        body: formData,
    });

    const content = document.getElementById('error');
    if (!response.ok) {
        const errorData = await response.json();
        let messages = [];
        if (errorData.error) {
            messages.push(errorData.error as string);
        }
        if (errorData.errors) {
            for (const error of errorData.errors as string[]) {
                messages.push(error);
            }
        }
        if (content) {
            content.innerHTML = '';
            for (const error of messages) {
                const paragraph = document.createElement('p');
                paragraph.style.color = 'red';
                const text = document.createTextNode(error);
                paragraph.appendChild(text);
                content.appendChild(paragraph);
            }
        }
    } else {
        isLoggedIn = true;
        history.pushState({}, '', '/profile');
        checkSession();
    }
}

export async function logout(): Promise<void> {
    await fetch('/api/user/logout', { method: 'POST'});
    isLoggedIn = false;
    currentUser = null;
    history.pushState({}, '', '/');
    checkSession();
}

let csrfToken: string | null = null;

async function fetchCsrfToken() {
    const res = await fetch('api/user/csrf-token', { credentials: 'include' });
    const data = await res.json();
    csrfToken = data.csrfToken;
}

export async function handleGoogleCredentials(request:{ credential: string}): Promise<void> {
    if (!csrfToken) await fetchCsrfToken();

    const response = await fetch ('api/user/google', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'x-csrf-token': csrfToken ?? '',
        },
        body: JSON.stringify({ idToken: request.credential }),
        credentials: 'include',
    });
    if (response.ok) {
        isLoggedIn = true;
        history.pushState({}, '', '/profile');
        checkSession();
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
