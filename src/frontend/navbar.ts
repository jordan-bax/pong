import { renderContent, getPageContent } from "./contentRenderer.js";
import { getLanguage, setLanguage } from "./index.js";
import { checkSession, getLoggin, getLogginServer, logout } from "./routing.js";
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
    languageSettingText: string;
}

async function getNavbarContent(language: string,
    textKeys: string[]): Promise<Map<string, object>> {
    const navbarMap = await getPageContent(language, textKeys);
    return navbarMap;
}

export async function renderNavbar(): Promise<void> {
    const language = await getLanguage();
    const navbarMapData = await getNavbarContent(language.toLowerCase(), ['languageSettingText', 'settingNavText', 'loginNavbarText', 'registerNavbarText', 'logoutNavbarText', 'homeNavbarText', 'profileNavbarText', 'gameNavbarText', 'notificationNavbarText']);
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

    let languageButton = document.createElement('select');
    languageButton.id = 'languageSelector';
    const options = ['NL', 'EN', 'DE'];
    options.forEach((text, index) => {
        const opt = document.createElement('option');
        opt.value = options[index];
        opt.textContent = text;
        languageButton.appendChild(opt);
    });

    Array.from(languageButton.options).forEach((option) => {
        if (option.text === language)
            option.selected = true;
        else
            option.selected = false;
    });

    languageButton.addEventListener('change', async (event) => {
        const target = event.target as HTMLSelectElement;
        await setLanguage(target.value);
        await checkSession();
    });

    languageButton.className = 'btn navItem';
    navbar.appendChild(languageButton);

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
        logoutBtn.className = 'btn navItem';
        logoutBtn.textContent = navbarText.logoutNavbarText;
        logoutBtn.onclick = async () => {
            await logout();
        }
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
        registerLink.textContent = navbarText.registerNavbarText;
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
    navbar.appendChild(languageButton);

    navbar.appendChild(googleLogin);
}
