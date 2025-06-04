import { getCookie } from "./index.js";
import { getCurrentUser, getLoggin, login, register, handleGoogleCredentials } from "./routing.js";

declare global {
    interface Window {
        google: any;
        onGsiLoad: () => void;
    }
}

interface content {
    emailText: string;
    passwordText: string;
    usernameText: string;
    loginButtonText: string;
    registerButtonText: string;
    profileText: string;
    homePageText: string;
}

const values = [
    'emailText',
    'passwordText',
    'usernameText',
    'loginButtonText',
    'registerButtonText',
    'profileText',
    'homePageText'
];

function queryStringBuilder(language: string, array: string[]): string {
    let output = new URLSearchParams();
    output.append('language', language);
    array.forEach(tag => output.append('textKey', tag));
    return output.toString();
    
}

function replacePlaceholders(original: string, values: Record<string, string>) {
    return original.replace(/{(\w+)}/g, (_, key) => {
        return values[key] ?? `{${key}}`;
    });
}

function createRow(leftContent: any, rightContent: any): HTMLTableRowElement {
    const row = document.createElement('tr');
    const leftCell = document.createElement('td');
    const rightCell = document.createElement('td');
    leftCell.appendChild(leftContent);
    rightCell.appendChild(rightContent);
    row.appendChild(leftCell);
    row.appendChild(rightCell);
    return row;
}

function renderGoogle(): HTMLDivElement {
    const googleLogin = document.createElement('div');
    googleLogin.id = 'google-signin';
    return googleLogin;
}

function renderLogin(text: content): HTMLFormElement {
    const loginForm = document.createElement('form');
    const table = document.createElement('table');

    const emailLabel = document.createElement('label');
    emailLabel.textContent = text.emailText;
    emailLabel.setAttribute('for', 'email');

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.required = true;

    table.appendChild(createRow(emailLabel, emailInput));

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = text.passwordText;
    passwordLabel.setAttribute('for', 'password');
    
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.required = true;

    table.appendChild(createRow(passwordLabel, passwordInput));

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'btn';
    submitButton.textContent = text.loginButtonText;
    
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error';

    table.appendChild(createRow(submitButton, errorDiv));
    loginForm.appendChild(table);
    loginForm.onsubmit = (e) => {
        e.preventDefault();
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        login(email, password)
    };
    return loginForm;
}

function renderRegister(text: content): HTMLFormElement {
    
    const registerForm = document.createElement('form');
    const table = document.createElement('table');

    const emailLabel = document.createElement('label');
    emailLabel.textContent = text.emailText;
    emailLabel.setAttribute('for', 'email');

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.required = true;

    table.appendChild(createRow(emailLabel, emailInput));

    const usernameLable = document.createElement('label');
    usernameLable.textContent = text.usernameText;
    usernameLable.setAttribute('for', 'username');

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'username';
    usernameInput.required = true;

    table.appendChild(createRow(usernameLable, usernameInput));

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = text.passwordText;
    passwordLabel.setAttribute('for', 'passwrod');

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.required = true;

    table.appendChild(createRow(passwordLabel, passwordInput));

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'btn';
    submitButton.textContent = text.registerButtonText;

    const errorDiv = document.createElement('div');
    errorDiv.id = 'error';

    table.appendChild(createRow(submitButton, errorDiv));

    registerForm.appendChild(table);
    registerForm.onsubmit = (e) => {
        e.preventDefault();
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        register(username, password, email);
    };
    return registerForm;
}

function renderProfile(text: content): string | null {
    if (getLoggin()) {
        let textOriginal = text.profileText;
        const user = { email: getCurrentUser() || '' };
        textOriginal = replacePlaceholders(textOriginal, user);
        return textOriginal;
    }
    return null;
}

export async function renderContent (route: string): Promise<void> {
    const content = document.getElementById('content');
    if (!content) return;
    content.innerHTML = '';
    let language = getCookie('ft_transcendence_language');
    if (language === null) {
        language ='en';
    }
    const textMap = await getPageContent(language, values)
    const textData = textMap.get('row') as content
    switch (route)
    {
        case 'home':
            content.textContent = textData.homePageText;
            break;
        case 'profile':
            const profileContent = renderProfile(textData);
            if (profileContent) {
                content.textContent = profileContent;
            } else {
                window.location.href = '/login';
                return;
            }
            break;
        case 'login':
            const googleLogin = renderGoogle();
            const loginFrom = renderLogin(textData);

            content.appendChild(googleLogin);
            content.appendChild(loginFrom);
            break;
        case 'register':
            const registerForm = renderRegister(textData);
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

export async function getPageContent(language: string, textKeys: string[]): Promise<Map<string, object>> {
    const neededKeys = queryStringBuilder(language, textKeys);
    const result = await fetch(`/api/page_content/getContent?${neededKeys}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    if (!result.ok) {
        console.error('error result for page content not ok');
        throw new Error(`HTTP error! status ${result.status}`);
    }
    const body = await result.json();
    const map = getMapFromJson(body);
    return map;
}

export function getMapFromJson(data: any): Map<string, object> {
    const map = new Map<string, object>();
    for (const key in data) {
        map.set(key, data[key]);
    }
    return map;
}

export function initGoogleSignInIfNeeded(): void {
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