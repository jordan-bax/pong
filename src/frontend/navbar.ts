import { renderContent, getPageContent } from "./contentRenderer.js";
import { getLanguage, setLanguage } from "./index.js";
import { checkSession, getLoggin, getLogginServer, logout } from "./routing.js";

interface navbarContent {
    homeNavbarText: string;
    loginNavbarText: string;
    logoutNavbarText: string;
    profileNavbarText: string;
    registerNavbarText: string;
    gameNavbarText: string;
}

async function getNavbarContent(language:string, textKeys: string[]): Promise<Map<string, object>> {
    const navbarMap = await getPageContent(language, textKeys);
    return navbarMap;
}

function navbarStyling(navItem: HTMLAnchorElement): HTMLAnchorElement {
    navItem.style.color = 'black';
    navItem.style.display = 'flex';
    navItem.style.textAlign = 'center';
    navItem.style.justifyContent = 'left';
    navItem.style.textDecoration = 'none';
    navItem.style.marginLeft = '10px';
    navItem.style.border = '1em';
    return navItem;
}

export async function renderNavbar(): Promise<void> {
    const language = await getLanguage();
    const navbarMapData = await getNavbarContent(language.toLowerCase(), ['loginNavbarText', 'registerNavbarText', 'logoutNavbarText', 'homeNavbarText', 'profileNavbarText', 'gameNavbarText']);
    const navbarText = navbarMapData.get('row') as navbarContent;
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.innerHTML = '';
    navbar.style.display = 'flex';

    let homeLink = document.createElement('a');
    homeLink.href = '/';
    homeLink.textContent = navbarText.homeNavbarText;
    homeLink = navbarStyling(homeLink);
    homeLink.onclick = (e) => {
        e.preventDefault();
        history.pushState({}, '', '/');
        renderContent('home');
    };
    navbar.appendChild(homeLink);

    let gameLink = document.createElement('a');
    gameLink.href = '/gameMenu';
    gameLink.textContent = navbarText.gameNavbarText;
    gameLink.className = 'btn navItem';
    gameLink = navbarStyling(gameLink);
    gameLink.onclick = (e) => {
        e.preventDefault();
        history.pushState({}, '', '/gameMenu');
        renderContent('game');
    };
    navbar.appendChild(gameLink);

    let notificationArea = document.createElement('div');
    notificationArea.id = 'notification-area';
    notificationArea.textContent = "🔔 New notification!";
    navbar.appendChild(notificationArea);

    const isLoggedIn = getLoggin();
    const isLoggedInServer = await getLogginServer();
    if (isLoggedIn && isLoggedInServer !== null) {
        let profileLink = document.createElement('a');
        profileLink.href = '/profile';
        profileLink.textContent = navbarText.profileNavbarText;
        profileLink = navbarStyling(profileLink);
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
        let loginLink = document.createElement('a');
        loginLink.href = '/login';
        loginLink.textContent = navbarText.loginNavbarText;
        loginLink = navbarStyling(loginLink);
        loginLink.onclick = (e) => {
            e.preventDefault();
            history.pushState({}, '', '/login');
            renderContent('login');
        };
        navbar.appendChild(loginLink);

        let registerLink = document.createElement('a');
        registerLink.textContent= navbarText.registerNavbarText;
        registerLink.href = '/register';
        registerLink = navbarStyling(registerLink);
        registerLink.onclick = (e) => {
            e.preventDefault();
            history.pushState({}, '', '/register');
            renderContent('register');
        };
        navbar.appendChild(registerLink);
    }

    const languageDropdown = document.createElement('select');
    const options = ['NL', 'EN'];
    options.forEach((text, index) => {
        const option = document.createElement('option');
        option.value  = options[index];
        option.textContent = text;
        languageDropdown.appendChild(option);
    });
    
    languageDropdown.style.display = 'flex';
    languageDropdown.style.position = 'absolute';
    languageDropdown.style.right = '20px';
    navbar.appendChild(languageDropdown);
    Array.from(languageDropdown.options).forEach((option) => {
        if (option.text == language) {
            option.selected = true;
        } else {
            option.selected = false;
        }
    })
    languageDropdown.addEventListener('change', (event) => {
        const target = event.target as HTMLSelectElement;
        setLanguage(target.value);
        checkSession();
    })

    const googleLogin = document.createElement('div');
    googleLogin.id = 'google-signin-button';

    navbar.appendChild(googleLogin);
}