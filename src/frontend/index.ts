import { renderContent, initGoogleSignInIfNeeded } from "./contentRenderer.js";
import { routeFromPath, checkSession } from "./routing.js";
import { showNotification, listenForNotifications } from "./notifications.js";

window.addEventListener('popstate', async () => {
    renderContent(routeFromPath[window.location.pathname] || 'not found');
});

window.addEventListener('load', () => {
    checkSession();
});

window.onGsiLoad = function() {
    initGoogleSignInIfNeeded();
};

setInterval(() => {
    fetch('/api/user/heartbeat', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'x-internal': 'true'
        }
    })
        .then(() => {
            return null;
        })
        .catch();
}, 30000);

setInterval(() => {
    listenForNotifications().catch(console.error);
}, 10000);

setInterval(() => {
    showNotification();
}, 3000);

window.addEventListener('beforeunload', () => {
    navigator.sendBeacon('/api/user/heartbeat')
});

export async function setLanguage(language: string): Promise<void> {
    await fetch('api/page_content/language', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(language),
    })
        .then(respones => {
            if (!respones.ok) {
                throw new Error('Failed to set language');
            }
        })
        .catch(() => { });
}

export async function getLanguage(): Promise<string> {
    const lang = await fetch('api/page_content/language', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(async (response) => {
            if (!response.ok) throw new Error('Failed to tetch language');
            const language = await response.text();
            return language;
        })
        .catch(() => { });
    if (lang) return lang;
    return 'en';
}
