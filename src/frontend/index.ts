import { renderContent, initGoogleSignInIfNeeded } from "./contentRenderer.js";
import { routeFromPath, checkSession } from "./routing.js";

window.addEventListener('popstate', () => {
    renderContent(routeFromPath[window.location.pathname] || 'not found');
});

window.addEventListener('load', () => {
    checkSession();
});

window.onGsiLoad = function () {
    initGoogleSignInIfNeeded();
};

function getCookie(name: string):string | null {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key == name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

function setCookie(name: string, value: string, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

const cookieName = 'ft_transcendce_language';
const language = navigator.language || (navigator as any)['userLanguage'] || 'en';
if (!getCookie(cookieName)) {
    setCookie(cookieName, language);
}