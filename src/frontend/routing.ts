import { renderContent } from "./contentRenderer.js";
import { renderNavbar } from "./navbar.js";

let isLoggedIn = false;
let currentUser: string | null = null;

export function getLoggin(): boolean {
    return isLoggedIn;
}

export function getCurrentUser(): string | null{
    return currentUser;
}

export async function checkSession() {
    const response = await fetch('/api/me');
    const data = await response.json();
    isLoggedIn = data.loggedIn ? true : false;
    currentUser = data.user?.username ?? null;
    renderNavbar();
    renderContent(routeFromPath(window.location.pathname));
}

export async function login(username: string, password: string): Promise<void> {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        isLoggedIn = true;
        history.pushState({}, '', '/profile');
        checkSession();
        renderNavbar();
        renderContent('profile');
    } else {
        const content = document.getElementById('content');
        if (content) content.textContent = 'Login failed. please try again';
    }
}

export async function register(username: string, password: string): Promise<void> {
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        isLoggedIn = true;
        history.pushState({}, '', '/profile');
        checkSession();
        renderNavbar();
        renderContent('profile');
    } else {
        const content = document.getElementById('content');
        if (content) content.textContent = 'Registration failed, please try again';
    }
}

export async function logout(): Promise<void> {
    await fetch('/api/logout', { method: 'POST'});
    isLoggedIn = false;
    currentUser = null;
    history.pushState({}, '', '/');
    checkSession();
    renderNavbar();
    renderContent('home');
}

export function routeFromPath(pathname: string): string {
    switch (pathname) {
        case '/':
            return 'home';
        case '/profile':
            return 'profile';
        case '/login':
            return 'login';
        case '/register':
            return 'register';
        default:
            return 'not found';
    }
}