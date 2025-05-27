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
            <table>
                <tr>
                    <td><label>email:</label></td>
                    <td><input type="email" id="email"></td>
                </tr>
                <tr>
                    <td><label>Password:</label></td>
                    <td><input type="password" id="password"></td>
                </tr>
                <tr>
                    <td><button class="btn" type="submit">Login</button></td>
                    <td><div id="error"></div></td>
                </tr>
            </table>
            `;
            loginForm.onsubmit = (e) => {
                e.preventDefault();
                const email = (document.getElementById('email') as HTMLInputElement).value;
                const password = (document.getElementById('password') as HTMLInputElement).value;
                login(email, password);
            };
            content.appendChild(loginForm);
            break;
        case 'register':
            const registerForm = document.createElement('form');
            registerForm.innerHTML = `
            <table>
                <tr>
                    <td><label>email:</label></td>
                    <td><input type="email" id="email"></td>
                </tr>
                <tr>
                    <td><label>username:</label>
                    <td><label><input type="text" id="username"></label></td>
                </tr>
                <tr>
                    <td><label>Password:</label></td>
                    <td><input type="password" id="password"></td>
                </tr>
                <tr>
                    <td><button class="btn" type="submit">register</button></td>
                    <td><div id="error"></div></td>
                </tr>
            </table>
            `;
            registerForm.onsubmit = (e) => {
                e.preventDefault();
                const username = (document.getElementById('username') as HTMLInputElement).value;
                const email = (document.getElementById('email') as HTMLInputElement).value;
                const password = (document.getElementById('password') as HTMLInputElement).value;
                register(username, password, email);
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