import { renderContent } from "./contentRenderer.js";
import { routeFromPath, checkSession } from "./routing.js";

window.addEventListener('popstate', () => {
    renderContent(routeFromPath(window.location.pathname));
});

window.addEventListener('load', () => {
    checkSession();
});