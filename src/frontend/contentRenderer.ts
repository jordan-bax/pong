import { getCookie } from "./index.js";
import { getLoggin, login, updateUserInfo , register, handleGoogleCredentials, getLogginUserData, getCsrfToken } from "./routing.js";

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
    updateProfileButtonText: string;
    profilePictureLabelText: string;
}

const values = [
    'emailText',
    'passwordText',
    'usernameText',
    'loginButtonText',
    'registerButtonText',
    'profileText',
    'homePageText',
    'updateProfileButtonText',
    'profilePictureLabelText',
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

async function renderLogin(text: content): Promise<HTMLFormElement> {
    const loginForm = document.createElement('form');
    loginForm.id = 'loginForm';
    loginForm.enctype = 'multipart/form-data';

    const csrf = await getCsrfToken();
    if (!csrf) {
        throw new Error('csrf missing');
    }

    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = '_csrf';
    csrfInput.value = csrf;

    loginForm.appendChild(csrfInput);

    const table = document.createElement('table');

    const emailLabel = document.createElement('label');
    emailLabel.textContent = text.emailText;
    emailLabel.setAttribute('for', 'email');

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.name = 'email';
    emailInput.required = true;

    table.appendChild(createRow(emailLabel, emailInput));

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = text.passwordText;
    passwordLabel.setAttribute('for', 'password');
    
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.name = 'password';
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
        const formData = new FormData(loginForm);
        login(formData);
    };
    return loginForm;
}

async function renderRegister(text: content): Promise<HTMLFormElement> {
    const csrf = await getCsrfToken();
    if (!csrf) {
        throw new Error('csrf missing');
    }

    const registerForm = document.createElement('form');
    registerForm.id = 'registerForm';
    registerForm.enctype = 'multipart/form-data';

    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = '_csrf';
    csrfInput.value = csrf;

    registerForm.appendChild(csrfInput);

    const table = document.createElement('table');

    const profilePictureLable = document.createElement('label');
    profilePictureLable.textContent = text.profilePictureLabelText;
    profilePictureLable.setAttribute('for', 'profilePicture');

    const profilePictureInput = document.createElement('input');
    profilePictureInput.type = 'file';
    profilePictureInput.id = 'profilePicture';
    profilePictureInput.name = 'profilePicture';

    table.appendChild(createRow(profilePictureLable, profilePictureInput));

    const emailLabel = document.createElement('label');
    emailLabel.textContent = text.emailText;
    emailLabel.setAttribute('for', 'email');

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.name = 'email';
    emailInput.required = true;

    table.appendChild(createRow(emailLabel, emailInput));

    const usernameLable = document.createElement('label');
    usernameLable.textContent = text.usernameText;
    usernameLable.setAttribute('for', 'username');

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'username';
    usernameInput.name = 'username';
    usernameInput.required = true;

    table.appendChild(createRow(usernameLable, usernameInput));

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = text.passwordText;
    passwordLabel.setAttribute('for', 'passwrod');

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.name = 'password';
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
        const formData = new FormData(registerForm);
        register(formData);
    };
    return registerForm;
}

async function renderProfileData(text: content): Promise<HTMLElement | null> {
    if (!getLoggin()) {
        return null;
    }
    const user = await getLogginUserData();
    if (!user) {
        return null;
    }

    const profileForm = document.createElement('form');
    profileForm.style.alignSelf = 'center';
    profileForm.id = 'profileForm';
    profileForm.enctype = 'multipart/form-data';

    const csrf = await getCsrfToken();
    if (!csrf) {
        throw new Error('csrf missing')
    }

    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = '_csrf';
    csrfInput.value = csrf;

    profileForm.appendChild(csrfInput);

    const table = document.createElement('table');

    const emailLabel = document.createElement('label');
    emailLabel.textContent = text.emailText;
    emailLabel.setAttribute('for', 'newEmail');

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'newEmail';
    emailInput.required = true;
    emailInput.value = user.email;
    emailInput.name = 'newEmail';

    table.appendChild(createRow(emailLabel, emailInput));

    const usernameLable = document.createElement('label');
    usernameLable.textContent = text.usernameText;
    usernameLable.setAttribute('for', 'newUsername');

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'newUsername';
    usernameInput.required = true;
    usernameInput.value = user.username;
    usernameInput.name = 'newUsername';

    table.appendChild(createRow(usernameLable, usernameInput));

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = text.passwordText;
    passwordLabel.setAttribute('for', 'newPassword');

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'newPassword';
    passwordInput.name = 'newPassword';
    table.appendChild(createRow(passwordLabel, passwordInput));

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'btn';
    submitButton.textContent = text.updateProfileButtonText;

    const errorDiv = document.createElement('div');
    errorDiv.id = 'error';

    table.appendChild(createRow(submitButton, errorDiv));

    profileForm.appendChild(table);
    profileForm.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(profileForm);
        updateUserInfo(user.email, user.username, user.password, formData);
    };

    return profileForm;
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
    const textData = textMap.get('row') as content;
    switch (route)
    {
        case 'home':
            content.textContent = textData.homePageText;
            break;
        case 'profile':
            const profileData = await renderProfileData(textData);
            if (profileData !== null) {
                content.appendChild(profileData);
            } else {
                window.location.href = '/login';
                return;
            }
            break;
        case 'login':
            const googleLogin = renderGoogle();
            const loginFrom = await renderLogin(textData);

            content.appendChild(googleLogin);
            content.appendChild(loginFrom);
            break;
        case 'register':
            const registerForm = await renderRegister(textData);
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
        method: 'GET'
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