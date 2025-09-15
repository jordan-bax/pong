import { renderContent, getPageContent } from "./contentRenderer.js";
import { getLanguage } from "./index.js";
import { renderNavbar } from "./navbar.js";

export const routeFromPath: { [key: string]: string } = {
    '/': 'home',
    '/profile': 'profile',
    '/login': 'login',
    '/register': 'register',
    '/google': 'google',
    '/gameMenu': 'game',
    '/settings': 'settings',
    '/tournament': 'tournament',
    '/gameHistory': 'history'
};

export interface userInfo {
    username: string;
    email: string;
    password: string;
    pathToProfilePicture: string;
}

interface ierrors {
    fileTooLarge: string;
    fileIncorrectMime: string;
    serverError: string;
    incorrectLogin: string;
    noLogin: string;
    unauthorized: string;
    noUser: string;
    googleToken: string;
    wrongInfo: string;
    noGmail: string;
    noUserDb: string;
    noImage: string;
    errorUsername: string;
    errorNewUsername: string;
    errorPasswordType: string;
    errorNewPassword: string;
    errorNewEmailType: string;
    errorEmailUndefined: string;
    errorEmailFormat: string;
    errorEmailNoString: string;
    errorPasswordNoString: string;
    errorUsernameNoString: string;
    errorNoPath: string;
}

export interface searchUser {
    username: string | null;
    email: string | null;
    googleEmail: string | null;
    isLoggedIn: number;
}

let isLoggedIn = false;
let currentUser: string | null = null;
const errorMessages = [
        'fileTooLarge',
        'fileIncorrectMime',
        'serverError',
        'incorrectLogin',
        'noLogin',
        'unauthorized',
        'noUser',
        'googleToken',
        'wrongInfo',
        'noGmail',
        'noUserDb',
        'noImage',
        'errorUsername',
        'errorNewUsername',
        'errorPasswordType',
        'errorNewPassword',
        'errorNewEmailType',
        'errorEmailUndefined',
        'errorEmailFormat',
        'errorEmailNoString',
        'errorPasswordNoString',
        'errorUsernameNoString',
        'errorNoPath',
    ];

async function getErrorMessages(): Promise<ierrors> {
    let language: string;
    try {
        language = await getLanguage();
    } catch(err) {
        throw new Error('Server Error');
    }
    const errors = await getPageContent(language.toLowerCase(), errorMessages);
    const output = errors.get('row') as ierrors;
    return output;
}

export async function getFriends(): Promise<string | null> {
    const response = await fetch('/api/user/friends', {
        credentials: 'include',
        headers: {
            "x-internal": "true"
        }
    })
    .then(async (response) => {
        if (!response.ok) return null;
        const data = await response.text();
        return data;
    })
    .catch(() => {});
    if (response) return response;
    return null;
}

export async function getRequestedFriends(): Promise<string | null> {
     const response = await fetch('/api/user/requested', {
        credentials: 'include',
        headers: {
            "x-internal": "true"
        }
    })
    .then(async (response) => {
        if (!response.ok) {
            return null;
        }
        const data = await response.text();
        return data;
    })
    .catch(() => {});
    if (response) return response;
    return null;
}

export async function getPendingFriends(): Promise<string | null> {
    const response = await fetch('/api/user/pending', {
        credentials: 'include',
        headers: {
            "x-internal": "true"
        }
    })
    .then(async (response) => {
        if (!response.ok) {
            return null;
        }
        const data = await response.text();
        return data;
    })
    .catch(() => {});
    if (response) return response;
    return null;
}

export async function sendFriendRequest(user: searchUser): Promise<void> {
    await fetch('/api/user/requested', {
        credentials:'include',
        method: 'POST',
        headers: {
            "x-internal": "true"
        },
        body: user.email || user.googleEmail
    })
    .then(async (response) => {
        if (!response.ok) {
            console.error('failed to set friend request', response.statusText);
        }
    })
    .catch(() => {});
}

export async function searchUsers(query: string): Promise<searchUser[] | null> {
    const response = await fetch(`/api/user/search?q=${encodeURIComponent(query)}`, {
        credentials: 'include',
        headers: {
            "x-internal": "true"
        }
    }).catch(() => {})
    .then(async (response) => {
        if (!response) {
            return null;
        }
        const data = await response.json();
        return data as searchUser[];
    });
    if (response) return response;
    return null;
}

export async function removeRequest(email:string): Promise<boolean> {
    const response = await fetch('/api/user/friendRequest', {
        method: 'DELETE',
        body: email,
        credentials: 'include',
        headers: {
            "x-internal": "true"
        }
    })
    .then(response => {
        if (!response.ok) {
            console.error('failed to remove request');
            return false;
        }
        return true;
    })
    .catch(() => {});
    if (typeof response === 'boolean') return response;
    return false;
}

export async function acceptFriendRequest(email:string): Promise<boolean> {
    const response = await fetch('/api/user/acceptFriend', {
        method: 'POST',
        body: email,
        credentials: 'include',
        headers: {
            "x-internal": "true"
        }
    })
    .then(response => {
        if (!response.ok) {
            console.error('failed to accept friend request');
            return false;
        }
        return true;
    })
    .catch(() => {});
    if (typeof response === 'boolean') return response;
    return false;
}

export function getLoggin(): boolean {
    return isLoggedIn;
}

export function getCurrentUser(): string | null{
    return currentUser;
}

export async function getCsrfToken(): Promise<string | null> {
    const csrf = await fetch('api/user/csrf-token', {
        credentials: 'include',
        headers: {
            "x-internal": "true"
        }
    })
    .then (async (response) => {
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data.csrfToken as string;
    })
    .catch(() => {});
    if (csrf) return csrf;
    return null;
}

export async function getLogginServer(): Promise<string | null> {
    const userEmail = await fetch('api/user/me', {
        credentials: 'include',
        headers: {
            "x-internal": "true"
        }
    })
    .then (async (resonse) => {
        const data = await resonse.json();
        return data.user.email as string;
    })
    .catch (() => {});
    if (userEmail) return userEmail;
    return null;
}

export async function getLogginUserData(): Promise<userInfo | null> {
    const userData = await fetch('api/user/me/data', {
        credentials: 'include',
        headers: {
            "x-internal": "true"
        }
    })
    .then(async (response) => {
        if (!response.ok) {
            return null;
        }
        const data = await response.json()
        const user = data.user as userInfo;
        return user;
    })
    .catch(() => {});
    if (userData) return userData;
    return null;
}

export async function updateUserInfo(
    oldEmail: string,
    oldUsername: string,
    oldPassword:string,
    formData: FormData
): Promise<void> {
    formData.append('oldEmail', oldEmail);
    formData.append('oldUsername', oldUsername);
    formData.append('oldPassword', oldPassword);
    await fetch('api/user/update', {
        credentials: 'include',
        method: 'PATCH',
        body: formData,
        headers: {
            'x-csrf-token': formData.get('_csrf') as string,
            "x-internal": "true"
        }
    })
    .then(async (response) => {
        const content = document.getElementById('error');
        if (!response.ok) {
            const mainContent = document.getElementById('content');
            const updateDiv = document.getElementById('secureUpdate');
            if (mainContent && updateDiv) {
                mainContent.removeChild(updateDiv)
            }
            const errorData = await response.json();
            const errors = await getErrorMessages();
            let message = [];
            if (errorData.error) {
                const name = errorData.error as string;
                message.push(errors[name as keyof ierrors]);
            } else if (errorData.errors) {
                const serverErrors = errorData.errors as string[];
                const displayErrors = serverErrors.filter((key): key is keyof ierrors => key in errors).map((key) => errors[key]);
                for (let err = 0; err < displayErrors.length; ++err) {
                    message.push(displayErrors[err]);
                }
            }
            if (content) {
                content.innerHTML = '';
                for (const error of message) {
                    const paragraph = document.createElement('p');
                    paragraph.style.color = 'red';

                    const text = document.createTextNode(error);
                    paragraph.appendChild(text);
                    content.appendChild(paragraph);
                }
                return ;
            }
        }
        history.pushState({}, '', '/profile');
        checkSession();
    })
    .catch(() => {});
}

export async function googleUserUpdate(formData: FormData): Promise<void> {
    await fetch('api/user/update-google', {
        credentials: 'include',
        method: 'PATCH',
        body: formData,
        headers: {
            'x-csrf-token': formData.get('_csrf') as string,
            "x-internal": "true"
        }
    })
    .then (async (response) => {
        const content = document.getElementById('error');
        if (!response.ok) {
            const mainContent = document.getElementById('content');
            const updateDiv = document.getElementById('secureUpdate');
            if (mainContent && updateDiv) {
                mainContent.removeChild(updateDiv);
            }
            const errorData = await response.json();
            const errors = await getErrorMessages();
            let message = [];
            if (errorData.error) {
                const name = errorData.error as string;
                message.push(errors[name as keyof ierrors]);
            } else if (errorData.errors) {
                const serverErrors = errorData.errors as string[];
                const displayErrors = serverErrors.filter((key): key is keyof ierrors => key in errors).map((key) => errors[key]);
                for (let err = 0; err < displayErrors.length; ++err) {
                    message.push(displayErrors[err]);
                }
            }
            if (content) {
                content.innerHTML = '';
                for (const error of message) {
                    const paragraph = document.createElement('p');
                    paragraph.style.color = 'red';

                    const text = document.createTextNode(error);
                    paragraph.appendChild(text);
                    content.appendChild(paragraph);
                }
                return ;
            }
        }
        history.pushState({}, '', '/profile');
        checkSession();
    })
    .catch (() => {});
}

export async function checkSession() {
    await fetch('/api/user/me', {
        headers: {
            "x-internal": "true"
        },
        credentials: 'include'
    })
    .then (async (response) => {
        if (!response.ok) {
            isLoggedIn = false;
            await renderNavbar();
            await renderContent(routeFromPath[window.location.pathname] || 'not found');
            return;
        }
        const data = await response.json();
        isLoggedIn = data.loggedIn ? true : false;
        await renderNavbar();
        await renderContent(routeFromPath[window.location.pathname] || 'not found');
    })
    .catch (() => {});
    // isLoggedIn = false;
    // renderNavbar();
    // renderContent(routeFromPath[window.location.pathname] || 'not found');
}

export async function login(formData: FormData): Promise<void> {
    await fetch('/api/user/login', {
        method: 'POST',
        body: formData,
        headers: {
            'x-csrf-token': formData.get('_csrf') as string,
            "x-internal": "true"
        },
        credentials: 'include'
    })
    .then(async (response) => {
        const content = document.getElementById('error');
        if (!response.ok) {
            const errorData = await response.json();
            const errors = await getErrorMessages();
            let messages = [];
            if (errorData.error) {
                const name = errorData.error as string;

                messages.push(errors[name as keyof ierrors]);
            }
            if (errorData.errors) {
                const serverErrors = errorData.errors as string[];
                const displayErrors = serverErrors.filter((key): key is keyof ierrors => key in errors).map((key) => errors[key]);
                for (let err = 0; err < displayErrors.length; ++err) {
                    messages.push(displayErrors[err]);
                }
            }
            if (content) {
                content.innerHTML = '';
                for (const error of messages) {
                    const paragraph = document.createElement('p');
                    paragraph.style.color = 'red';

                    const text = document.createTextNode(error);
                    paragraph.appendChild(text);
                    content.appendChild(paragraph);
                }
            }
        } else {
            isLoggedIn = true;
            history.pushState({}, '', '/profile');
            setGameSession();
            checkSession();
        }
    })
    .catch(() => {});
}

export async function register(formData: FormData): Promise<void> {
    await fetch('/api/user/register', {
        method: 'POST',
        body: formData,
        headers: {
            'x-csrf-token': formData.get('_csrf') as string,
            "x-internal": "true"
        },
        credentials: 'include'
    })
    .then(async (response) => {
        const content = document.getElementById('error');
        if (!response.ok) {
            const errorData = await response.json();
            const errors = await getErrorMessages();
            let messages = [];
            if (errorData.error) {
                messages.push(errors[(errorData.error as string) as keyof ierrors]);
            }
            if (errorData.errors) {
                const serverErrors = errorData.errors as string[];
                const displayErrors = serverErrors.filter((key): key is keyof ierrors => key in errors).map((key) => errors[key]);
                for (let error = 0; error < displayErrors.length; ++error) {
                    messages.push(displayErrors[error]);
                }
            }
            if (content) {
                content.innerHTML = '';
                for (const error of messages) {
                    const paragraph = document.createElement('p');
                    paragraph.style.color = 'red';
                    const text = document.createTextNode(error);
                    paragraph.appendChild(text);
                    content.appendChild(paragraph);
                }
            }
        } else {
            isLoggedIn = true;
            history.pushState({}, '', '/profile');
            setGameSession();
            checkSession();
        }
    })
    .catch(() => {});
}

export async function logout(): Promise<void> {
    await fetch('/api/user/logout', {
        method: 'POST',
        headers: {
            "x-internal": "true"
        }
    })
    .then(async () => {
        isLoggedIn = false;
        currentUser = null;
        history.pushState({}, '', '/');
        clearGameSession();
        await checkSession();
    })
    .catch(() => {});
}

let csrfToken: string | null = null;

async function fetchCsrfToken() {
    const res = await fetch('api/user/csrf-token', {
        credentials: 'include',
        headers: {
            "x-internal": "true"
        }
     })
     .then(async (res) => {
        if (!res.ok) {
            console.error('no csrf-token given');
            return;
        }
        const data = await res.json();
        csrfToken = data.csrfToken;
     })
     .catch(() => {});
}

export async function handleGoogleCredentials(request:{ credential: string}): Promise<void> {
    if (!csrfToken) await fetchCsrfToken();

    await fetch ('api/user/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': csrfToken ?? '',
            "x-internal": "true"
        },
        body: JSON.stringify({ idToken: request.credential }),
        credentials: 'include',
    })
    .then(async (response) => {
        if (!response.ok) {
            let errorMessage;
            try {
                errorMessage = response.json();
            } catch (e) {
                const text = await response.text();
                errorMessage = {error: text};
            }
            console.error('google login failed:', errorMessage);
            return;
        }
        isLoggedIn = true;
        history.pushState({}, '', '/profile');
        await setGameSession();
        await checkSession();
    })
    .catch(() => {});
}

export async function getIdFromMe(): Promise<number | null> {
    const id = await fetch('/api/user/me', {
        headers: {
            "x-internal": "true"
        },
        credentials: 'include',
    })
    .then(async (response) => {
        if (!response.ok) {
            console.error('failed to get user ID');
            return null;
        }
        const data = await response.json();
        return data.user.userId as number;
    })
    .catch(() => {});
    if (typeof id === 'number') return id;
    return null;
}
export async function getUsernameFromMeData(): Promise<string | null> {
    const username = await fetch('/api/user/me/data', {
        headers: {"x-internal": "true"},
        credentials: 'include',
    })
    .then (async (response) => {
        if (!response.ok) {
            console.error('failed to get usr data');
            return null;
        }
        const data = await response.json();
        return data.user.username as string || null;
    })
    .catch(() => {});
    if (username) return username;
    return null;
}
async function createPlayer(params: { id: number; username: string }): Promise<void> {
    await fetch('/api/game/db/addPlayer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "x-internal": "true"
        },
        body: JSON.stringify(params),
        credentials: 'include',
    })
    .then(response => {
        if (!response.ok) {
            console.error('failed to create player');
        }
    })
    .catch(() => {});
}
async function setGameSession(): Promise<void> {
    const myId = await getIdFromMe();
    const username = await getUsernameFromMeData();
    if (!myId || !username) {
        console.error('cannot set game session, missing user data', { myId, username });
        return;
    }
    await fetch('/api/game/setsession', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "x-internal": "true"
        },
        body: JSON.stringify({ username: username, id: myId }),
        credentials: 'include'
    })
    .then(async (response) => {
        if (!response.ok) {
            console.error('failed to set game session');
            return;
        }
        await createPlayer({id: myId, username: username});
    })
    .catch(() => {});
}
async function clearGameSession(): Promise<void> {
    const response = await fetch('/api/game/clearsession', {
        method: 'POST',
        headers: {
            "x-internal": "true"
        },
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            console.error('failed to clear game session');
        }
    })
    .catch(() => {});
}

export async function handleGoogleCheck(request:{ idToken: string, user: userInfo}) {
    const formInfo = document.getElementById('profileForm') as HTMLFormElement;
    const formData = new FormData(formInfo);
    const csrf = await getCsrfToken();
    await fetch('api/user/google-check', {
        method: 'POST',
        headers: {
            'x-csrf-token': csrf || '',
            'Content-Type': 'application/json',
            'x-internal': 'true'
        },
        body: JSON.stringify({idToken: request.idToken}),
        credentials: 'include'
    })
    .then(async (response) => {
        if (!response.ok) {
            let errorMessage;
            try {
                errorMessage = await response.json();
            } catch (err) {
                const text = await response.text();
                errorMessage = { error: text };
            }
            console.error('google login failed:', errorMessage);
            return;
        }
        await googleUserUpdate(formData);
    })
    .catch(() => {});
}
