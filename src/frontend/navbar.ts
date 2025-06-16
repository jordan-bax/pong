import { renderContent, getPageContent } from "./contentRenderer.js";
import { getCookie } from "./index.js";
import { getLoggin, getLogginServer, logout } from "./routing.js";

interface navbarContent {
    homeNavbarText: string;
    loginNavbarText: string;
    logoutNavbarText: string;
    profileNavbarText: string;
    registerNavbarText: string;
}

async function getNavbarContent(language:string, textKeys: string[]): Promise<Map<string, object>> {
    const navbarMap = await getPageContent(language, textKeys);
    return navbarMap;
}

export async function renderNavbar(): Promise<void> {
    const navbarMapData = await getNavbarContent(getCookie('ft_transcendence_language') || 'en', ['loginNavbarText', 'registerNavbarText', 'logoutNavbarText', 'homeNavbarText', 'profileNavbarText']);
    const navbarText = navbarMapData.get('row') as navbarContent;
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.innerHTML = '';
    navbar.style.display = 'flex';

    const homeLink = document.createElement('a');
    homeLink.href = '/';
    homeLink.textContent = navbarText.homeNavbarText;
    homeLink.style.color = 'black';
    homeLink.style.display = 'flex';
    homeLink.style.textAlign = 'center';
    homeLink.style.justifyContent = 'left';
    homeLink.style.textDecoration = 'none';
    homeLink.style.marginLeft = '10px';
    homeLink.style.border = '1em';
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
        profileLink.style.color = 'black';
        profileLink.style.display = 'flex';
        profileLink.style.textAlign = 'center';
        profileLink.style.justifyContent = 'left';
        profileLink.style.textDecoration = 'none';
        profileLink.style.marginLeft = '10px';
        profileLink.style.border = '1em';
        profileLink.onclick = (e) => {
        e.preventDefault();
        history.pushState({}, '', '/profile');
        renderContent('profile');
        };
        navbar.appendChild(profileLink);

        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = navbarText.logoutNavbarText;
        logoutBtn.style.color = 'black';
        logoutBtn.style.display = 'flex';
        logoutBtn.style.textAlign = 'center';
        logoutBtn.style.justifyContent = 'left';
        logoutBtn.style.textDecoration = 'none';
        logoutBtn.style.marginLeft = '10px';
        logoutBtn.style.border = '1em';
        logoutBtn.onclick = logout;
        navbar.appendChild(logoutBtn);
    } else {
        const loginLink = document.createElement('a');
        loginLink.href = '/login';
        loginLink.textContent = navbarText.loginNavbarText;
        loginLink.style.color = 'black';
        loginLink.style.display = 'flex';
        loginLink.style.textAlign = 'center';
        loginLink.style.justifyContent = 'left';
        loginLink.style.textDecoration = 'none';
        loginLink.style.marginLeft = '10px';
        loginLink.style.border = '1em';
        loginLink.onclick = (e) => {
            e.preventDefault();
            history.pushState({}, '', '/login');
            renderContent('login');
        };
        navbar.appendChild(loginLink);

        const registerLink = document.createElement('a');
        registerLink.textContent= navbarText.registerNavbarText;
        registerLink.href = '/register';
        registerLink.style.color = 'black';
        registerLink.style.display = 'flex';
        registerLink.style.textAlign = 'center';
        registerLink.style.justifyContent = 'left';
        registerLink.style.textDecoration = 'none';
        registerLink.style.marginLeft = '10px';
        registerLink.style.border = '1em';
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