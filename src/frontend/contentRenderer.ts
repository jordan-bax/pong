import { getCurrentUser, getLoggin, login, register } from "./routing.js";

export function renderContent (route: string): void {
    const content = document.getElementById('content');
    if (!content) return;
    content.innerHTML = '';
    switch (route)
    {
        case 'home':
            content.textContent = 'welcome to the Home Page!';
            break;
        case 'profile':
            if (getLoggin()) {
                content.textContent = `Hello ${getCurrentUser()}, this is your profile.`
            } else {
                content.textContent = 'You must be logged in to view this page.';
            }
            break;
        case 'login':
            const loginForm = document.createElement('form');
            loginForm.innerHTML = `
            <label>Username: <input type="text" id="username"></label><br/>
            <label>Password: <input type="password" id="password"></label><br/>
            <button class="btn" type="submit">Login</button>
            `;
            loginForm.onsubmit = (e) => {
                e.preventDefault();
                const username = (document.getElementById('username') as HTMLInputElement).value;
                const password = (document.getElementById('password') as HTMLInputElement).value;
                login(username, password);
            };
            content.appendChild(loginForm);
            break;
        case 'register':
            const registerForm = document.createElement('form');
            registerForm.innerHTML = `
            <label>Username: <input type="text" id="username"></label><br/>
            <label>Password: <input type="password" id="password"></label><br/>
            <button class="btn" type="submit">register</button>
            `;
            registerForm.onsubmit = (e) => {
                e.preventDefault();
                const username = (document.getElementById('username') as HTMLInputElement).value;
                const password = (document.getElementById('password') as HTMLInputElement).value;
                register(username, password);
            };
            content.appendChild(registerForm);
            break;
        default:
            content.textContent = 'Page not found.';
    }

    if (!getLoggin && route !== 'login' && route === 'profile') {
        history.pushState({}, '', '/login');
        renderContent('login');
    }
}