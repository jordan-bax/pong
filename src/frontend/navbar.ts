import { renderContent } from "./contentRenderer.js";
import { getLoggin, getLogginServer, logout } from "./routing.js";

export async function renderNavbar(): Promise<void> {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.innerHTML = '';

    const homeLink = document.createElement('a');
    homeLink.href = '/';
    homeLink.textContent = 'Home';
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
        profileLink.textContent = 'Profile';
        homeLink.className = 'btn navItem';
        profileLink.onclick = (e) => {
        e.preventDefault();
        history.pushState({}, '', '/profile');
        renderContent('profile');
        };
        navbar.appendChild(profileLink);

        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Logout';
        logoutBtn.className = 'btn btn-primary navItem';
        logoutBtn.onclick = logout;
        navbar.appendChild(logoutBtn);
    } else {
        const loginLink = document.createElement('a');
        loginLink.href = '/login';
        loginLink.textContent = 'Log in';
        loginLink.className = 'btn navItem';
        loginLink.onclick = (e) => {
            e.preventDefault();
            history.pushState({}, '', '/login');
            renderContent('login');
        };
        navbar.appendChild(loginLink);

        const registerLink = document.createElement('a');
        registerLink.textContent= 'Register';
        registerLink.href = '/register';
        registerLink.className = 'btn navItem';
        registerLink.onclick = (e) => {
            e.preventDefault();
            history.pushState({}, '', '/register');
            renderContent('register');
        };
        navbar.appendChild(registerLink);

    }
}