import { renderContent } from "./contentRenderer.js";
import { routeFromPath, checkSession } from "./routing.js";
import dotenv from 'dotenv';

window.addEventListener('popstate', () => {
    renderContent(routeFromPath[window.location.pathname] || 'not found');
});

window.addEventListener('load', () => {
    checkSession();
});


declare global {
    interface Window {
        google: any;
    }
}

dotenv.config();

window.onload = () => {
    window.google.acount.id.initialize({
        client_id: process.env.GOOGLE_CLIENT_ID,
        callback: handleCredentailResponse,
    });

    window.google.acount.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }
    );

    window.google.account.id.prompt();
};

function handleCredentailResponse(response: google.account.id.CredentialResponse) {
    console.log("Encoded JWT ID token: " + response.credential);
}