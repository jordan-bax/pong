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

export async function setLanguage(language: string): Promise<void> {
   const response = await fetch('api/page_content/language', {
    method: 'POST',
    credentials: 'include',
    headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify(language),
   });
   if (!response.ok) {
    throw new Error('Failed to set language');
   }
}

export async function getLanguage(): Promise<string>{
     const response = await fetch('api/page_content/language', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch language');
    }
    const language = await response.text();
    return language;
}