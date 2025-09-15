import { renderContent, getPageContent } from "./contentRenderer.js";
import { getLanguage } from "./index.js";
import { getLoggin, getLogginServer, logout } from "./routing.js";
import { dropdowngamemenu } from "./settings.js";
import { renderNotification } from "./notifications.js"

interface navbarContent {
    homeNavbarText: string;
    loginNavbarText: string;
    logoutNavbarText: string;
    profileNavbarText: string;
    registerNavbarText: string;
    gameNavbarText: string;
    settingNavText: string;
    notificationNavbarText: string;
}

async function getNavbarContent(language:string, textKeys: string[]): Promise<Map<string, object>> {
    const navbarMap = await getPageContent(language, textKeys);
    return navbarMap;
}

export async function renderNavbar(): Promise<void> {
    const language = await getLanguage();
    const navbarMapData = await getNavbarContent(language.toLowerCase(), ['settingNavText', 'loginNavbarText', 'registerNavbarText', 'logoutNavbarText', 'homeNavbarText', 'profileNavbarText', 'gameNavbarText', 'notificationNavbarText']);
    const navbarText = navbarMapData.get('row') as navbarContent;
    const navbar = document.getElementById('navbar');
    if (!navbar) {
        return;
    }

    navbar.innerHTML = '';
    navbar.className = 'navBar';

    let homeLink = document.createElement('a');
    homeLink.href = '/';
    homeLink.className = 'btn navItem'
    homeLink.textContent = navbarText.homeNavbarText;
    homeLink.onclick = async (e) => {
        e.preventDefault();
        history.pushState({}, '', '/');
        await renderContent('home');
    };
    navbar.appendChild(homeLink);

    await dropdowngamemenu(navbar);

    let settingsLink = document.createElement('a');
    settingsLink.href = '/settings';
    settingsLink.textContent = navbarText.settingNavText;
    // settingsLink.textContent = navbarText.settingsNavbarText;
    settingsLink.className = 'btn navItem';
    settingsLink.onclick = async (e) => {
        e.preventDefault();
        history.pushState({}, '', '/settings');
        await renderContent('settings');
    };

    let notificationArea = renderNotification()
    navbar.appendChild(notificationArea);

    const isLoggedIn = getLoggin();
    const isLoggedInServer = await getLogginServer();
    if (isLoggedIn && isLoggedInServer !== null) {
        let profileLink = document.createElement('a');
        profileLink.href = '/profile';
        profileLink.className = 'btn navItem'
        profileLink.textContent = navbarText.profileNavbarText;
        profileLink.onclick = async (e) => {
        e.preventDefault();
        history.pushState({}, '', '/profile');
        await renderContent('profile');
        };
        navbar.appendChild(profileLink);

        const logoutBtn = document.createElement('a');
        logoutBtn.className= 'btn navItem';
        logoutBtn.href = '/';
        logoutBtn.textContent = navbarText.logoutNavbarText;
        logoutBtn.onclick = logout;
        navbar.appendChild(logoutBtn);
    } else {
        let loginLink = document.createElement('a');
        loginLink.href = '/login';
        loginLink.className = 'btn navItem';
        loginLink.textContent = navbarText.loginNavbarText;
        loginLink.onclick = async (e) => {
            e.preventDefault();
            history.pushState({}, '', '/login');
            await renderContent('login');
        };
        navbar.appendChild(loginLink);

        let registerLink = document.createElement('a');
        registerLink.textContent= navbarText.registerNavbarText;
        registerLink.href = '/register';
        registerLink.className = 'btn navItem';
        registerLink.onclick = async (e) => {
            e.preventDefault();
            history.pushState({}, '', '/register');
            await renderContent('register');
        };
        navbar.appendChild(registerLink);
    }

    const googleLogin = document.createElement('div');
    googleLogin.id = 'google-signin-button';
    navbar.appendChild(settingsLink);

    navbar.appendChild(googleLogin);
}
