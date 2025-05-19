import { renderContent } from "./contentRenderer.js";
import { getLoggin, logout } from "./routing.js";

export function renderNavbar(): void {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.innerHTML = '';

    const homeLink = document.createElement('a');
    homeLink.href = '/';
    homeLink.textContent = 'Home';
    homeLink.className = 'btn';
    homeLink.onclick = (e) => {
        e.preventDefault();
        history.pushState({}, '', '/');
        renderContent('home');
    };
    navbar.appendChild(homeLink);

    if (getLoggin()) {
        const profileLink = document.createElement('a');
        profileLink.href = '/profile';
        profileLink.textContent = 'Profile';
        homeLink.className = 'btn';
        profileLink.style.marginLeft = '10px';
        profileLink.onclick = (e) => {
        e.preventDefault();
        history.pushState({}, '', '/profile');
        renderContent('profile');
        };
        navbar.appendChild(profileLink);

        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Logout';
        logoutBtn.className = 'btn btn-primary';
        logoutBtn.onclick = logout;
        navbar.appendChild(logoutBtn);
    } else {
        const loginLink = document.createElement('a');
        loginLink.href = '/login';
        loginLink.textContent = 'Log in';
        loginLink.className = 'btn';
        loginLink.onclick = (e) => {
            e.preventDefault();
            history.pushState({}, '', '/login');
            renderContent('login');
        };
        navbar.appendChild(loginLink);

        const registerLink = document.createElement('a');
        registerLink.textContent= 'Register';
        registerLink.href = '/register';
        registerLink.className = 'btn';
        registerLink.onclick = (e) => {
            e.preventDefault();
            history.pushState({}, '', '/register');
            renderContent('register');
        };
        navbar.appendChild(registerLink);

    }
}