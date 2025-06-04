import { renderContent, initGoogleSignInIfNeeded } from "./contentRenderer.js";
import { routeFromPath, checkSession } from "./routing.js";

window.addEventListener('popstate', async () => {
    renderContent(routeFromPath[window.location.pathname] || 'not found');
});

window.addEventListener('load', () => {
    checkSession();
});

window.onGsiLoad = function () {
    initGoogleSignInIfNeeded();
};

export function getCookie(name: string): string | null {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key == name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}

function setCookie(name: string, value: string, days = 7): void {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

const cookieName = 'ft_transcendence_language';
let language: string = navigator.language || (navigator as any)['userLanguage'] || 'en';
const cookieLanguage = getCookie(cookieName);
if (language.includes('nl') || language.indexOf('nl') != -1) {
    language = 'nl';
} else {
    language = 'en';
}
if (!cookieLanguage) {
    setCookie(cookieName, language);
} else if (language != cookieLanguage){
    setCookie(cookieName, language);
}