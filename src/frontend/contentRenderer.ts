import { getCookie } from "./index.js";
import { getCurrentUser, getLoggin, login, register, handleGoogleCredentials } from "./routing.js";

declare global {
    interface Window {
        google: any;
        onGsiLoad: () => void;
    }
}

interface loginContent {
    emailText: string;
    passwordText: string;
    loginButtonText: string;
}

interface registerContent {
    emailText: string;
    usernameText: string;
    passwordText: string;
    registerButtonText: string;
}

function queryStringBuilder(language: string, array: string[]): string {
    let output = new URLSearchParams();
    output.append('language', language);
    array.forEach(tag => output.append('textKey', tag));
    return output.toString();
    
}

function getMapFromJson(data: any): Map<string, object> {
    const map = new Map<string, object>();
    for (const key in data) {
        map.set(key, data[key]);
    }
    return map;
}

export function initGoogleSignInIfNeeded() {
    const path = window.location.pathname;
    const isLogin = path == '/login';
    const singInContainer = document.getElementById('google-signin');
    if (!isLogin || !singInContainer) return;

    if (singInContainer.childNodes.length > 0) return;

    window.google.accounts.id.initialize({
        client_id: '51710532102-br37sgrm5iodlnhsa2kahmcjr6lh8f8n.apps.googleusercontent.com', // my own google client id
        callback: handleGoogleCredentials,
    });

    window.google.accounts.id.renderButton(singInContainer, {
        theme: 'outline',
        size: 'large',
    });
}

export async function renderContent (route: string): Promise<void> {
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
                window.location.href = '/login';
                return;
            }
            break;
        case 'login':
            const googleLogin = document.createElement('div');
            googleLogin.id = 'google-signin';
            content.appendChild(googleLogin);
            const loginForm = document.createElement('form');
            let language = getCookie('ft_transcendence_language');
            if (language == null) {
                language = 'en';
            }
            const neededKeys = queryStringBuilder(language, ['emailText', 'passwordText', 'loginButtonText']);
            const result = await fetch(`/api/page_content/getContent?${neededKeys}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!result.ok) {
                console.error("error result not ok");
                throw new Error(`HTTP error! status ${result.status}`);
            }
            const body = await result.json();
            const map = getMapFromJson(body);
            const data = map.get('row') as loginContent;

            loginForm.innerHTML = `
            <table>
                <tr>
                    <td><label>${data.emailText}</label></td>
                    <td><input type="email" id="email"></td>
                </tr>
                <tr>
                    <td><label>${data.passwordText}</label></td>
                    <td><input type="password" id="password"></td>
                </tr>
                <tr>
                    <td><button class="btn" type="submit">${data.loginButtonText}</button></td>
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
    initGoogleSignInIfNeeded();
    if (!getLoggin && route !== 'login' && route === 'profile') {
        history.pushState({}, '', '/login');
        renderContent('login');
    }
}