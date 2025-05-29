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