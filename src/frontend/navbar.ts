import { renderContent, getPageContent } from "./contentRenderer.js";
import { getCookie } from "./index.js";
import { getLoggin, getLogginServer, logout } from "./routing.js";

async function getNavbarContent(language:string, textKeys: string[]): Promise<Map<string, object>> {
    const navbarMap = await getPageContent(language, textKeys);
    return navbarMap;
}

interface navbarContent {
    homeNavbarText: string;
    loginNavbarText: string;
    logoutNavbarText: string;
    profileNavbarText: string;
    registerNavbarText: string;
}

export async function renderNavbar(): Promise<void> {
    const navbarMapData = await getNavbarContent(getCookie('ft_transcendence_language') || 'en', ['loginNavbarText', 'registerNavbarText', 'logoutNavbarText', 'homeNavbarText', 'profileNavbarText']);
    const navbarText = navbarMapData.get('row') as navbarContent;
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.innerHTML = '';

    const homeLink = document.createElement('a');
    homeLink.href = '/';
    homeLink.textContent = navbarText.homeNavbarText;
    homeLink.className = 'btn navItem';
    homeLink.onclick = (e) => {
        e.preventDefault();
        history.pushState({}, '', '/');
        renderContent('home');
    };
    navbar.appendChild(homeLink);

    const isLoggedIn = getLoggin;
    const isLoggedInServer = await getLogginServer();
    if (isLoggedIn() && isLoggedInServer) {
        const profileLink = document.createElement('a');
        profileLink.href = '/profile';
        profileLink.textContent = navbarText.profileNavbarText;
        profileLink.className = 'btn navItem';
        profileLink.onclick = (e) => {
        e.preventDefault();
        history.pushState({}, '', '/profile');
        renderContent('profile');
        };
        navbar.appendChild(profileLink);

        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = navbarText.logoutNavbarText;
        logoutBtn.className = 'btn btn-primary navItem';
        logoutBtn.onclick = logout;
        navbar.appendChild(logoutBtn);
    } else {
        const loginLink = document.createElement('a');
        loginLink.href = '/login';
        loginLink.textContent = navbarText.loginNavbarText;
        loginLink.className = 'btn navItem';
        loginLink.onclick = (e) => {
            e.preventDefault();
            history.pushState({}, '', '/login');
            renderContent('login');
        };
        navbar.appendChild(loginLink);

        const registerLink = document.createElement('a');
        registerLink.textContent= navbarText.registerNavbarText;
        registerLink.href = '/register';
        registerLink.className = 'btn navItem';
        registerLink.onclick = (e) => {
            e.preventDefault();
            history.pushState({}, '', '/register');
            renderContent('register');
        };
        navbar.appendChild(registerLink);

    }
    const googleLogin = document.createElement('div');
    googleLogin.id = 'google-signin-button';
    navbar.appendChild(googleLogin);
}