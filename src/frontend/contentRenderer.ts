// import { getCurrentUser, getLoggin, login, updateUserInfo , register, handleGoogleCredentials, getLogginUserData } from "./routing.js";
import { getLanguage } from "./index.js";
import { pongbutton } from "./pongMenu.js";
import { getLoggin, login, updateUserInfo, googleUserUpdate, register, handleGoogleCredentials, getLogginUserData, getCsrfToken, userInfo, checkSession, searchUsers, searchUser, getFriends , sendFriendRequest, getRequestedFriends, getPendingFriends } from "./routing.js";

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
    homePageText: string;
    updateProfileButtonText: string;
    profilePictureLabelText: string;
    exitButtonText: string;
    notFoundText: string;
}

const values = [
    'emailText',
    'passwordText',
    'usernameText',
    'loginButtonText',
    'registerButtonText',
    'homePageText',
    'updateProfileButtonText',
    'profilePictureLabelText',
    'exitButtonText',
    'notFoundText',
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

function setupSearchUsers(): HTMLDivElement {
    const searchDiv = document.createElement('div');
    searchDiv.id = 'searchDiv';
    searchDiv.style.display = 'grid';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'userSearch';
    input.id = 'searchInput';
    input.placeholder = 'Search for user by username or email';
    searchDiv.appendChild(input);

    const button = document.createElement('button');
    button.id = 'searchButton';
    button.textContent = 'seach users';
    button.addEventListener('click', async () => {
        const query = input.value.trim();
        if (!query) {
            return;
        }
        
        try {
            const users = await searchUsers(query);
            await renderResult(users);
        } catch (err) {
            console.error(err);
        }
    });
    searchDiv.appendChild(button);
    return searchDiv;
}

async function renderResult(users: searchUser[] | null): Promise<void> {
    const searchDiv = document.getElementById('searchDiv');
    if (!searchDiv) {
        console.error('no searchDiv');
        return;
    }
    let resultList = document.getElementById('searchList');
    if (resultList) {
        resultList.innerHTML = '';
    } else {
        resultList = document.createElement('ul');
        resultList.id = 'searchList';
        resultList.style.listStyleType = 'none';
    }
    const listItem = document.createElement('li');
    if (Array.isArray(users))
    {
        if (users.length === 0) {
            listItem.textContent = 'No Users found.'
            resultList.appendChild(listItem);
            searchDiv.appendChild(resultList);
            return;
        }
        const friends = await getFriends() as string;
        let friendArray: string[] = [];
        if (friends !== null)
        {
            if (friends.includes(',')) {
                friendArray = friends.split(',');
            } else {
                friendArray[0] = friends;
            }
        }
        const requested = await getRequestedFriends() as string;
        let requestedArray: string[] = [];
        if (requested !== null) {
            if (requested.includes(',')) {
                requestedArray = requested.split(',');
            } else {
                requestedArray[0] = requested;
            }
        }
        const pending = await getPendingFriends() as string;
        let pendingArray: string[] = [];
        if (pending !== null) {
            if (pending.includes(',')) {
                pendingArray = pending.split(',');
            } else {
                pendingArray[0] = pending;
            }
        }
        let i = 0;
        users.forEach(user => {
            const item = document.createElement('li');
            item.textContent = `${user.username || ''} (${user.email || ''}${typeof user.googleEmail === 'string' ? user.googleEmail : ''})`;
            let email: string;
            if (user.email) {
                email = user.email;
            } else  {
                email = user.googleEmail as string
            }
            if (!friendArray.includes(email) && !requestedArray.includes(email) && !pendingArray.includes(email)) {
                const addFriendButton = document.createElement('button');
                addFriendButton.id = 'AddFriendbutton' + i;
                addFriendButton.textContent = 'Add friend';
                addFriendButton.addEventListener('click', async () => {
                    await sendFriendRequest(user);
                });
                item.appendChild(addFriendButton);
            } else {
                const friendButton = document.getElementById('AddFriendButton' + i)
                if (friendButton) {
                    item.removeChild(friendButton);
                }
            }
            ++i;
            resultList.appendChild(item);
        });
        searchDiv.appendChild(resultList);
    }
}

async function renderFriendLists(): Promise<HTMLTableElement> {
    const friendLists = document.createElement('table');
    friendLists.id = 'friendsLists';
    const currentFriends = await friendsList();
    friendLists.appendChild(currentFriends);
    const currentOutgoing = await pendingList();
    friendLists.appendChild(currentOutgoing);
    const currentIncomming =  await requestedList();
    friendLists.appendChild(currentIncomming);
    return friendLists;
}

async function friendsList(): Promise<HTMLTableRowElement> {
    const listRow = document.createElement('tr');
    const title = document.createElement('td');
    title.textContent = 'Friends';
    listRow.appendChild(title);
    const friends = await getFriends();
    if (!friends) {
        return listRow;
    }
    const data = document.createElement('td');
    const list = document.createElement('ul');
    list.style.listStyleType = 'none';
    if (friends.includes(',')) {
        const friendArray = friends.split(',');
        friendArray.forEach(async fr => {
            const user = await searchUsers(fr)
            if (!user) {
                return;
            }
            const listItem = document.createElement('li');
            listItem.textContent = user[0].username;
            // TODO add online status
            list.appendChild(listItem);
        });
    } else {
        const user = await searchUsers(friends);
        if (!user) {
            return listRow;
        }
        const listItem = document.createElement('li');
        listItem.textContent = user[0].username;
        list.appendChild(listItem);
    }
    data.appendChild(list);
    listRow.appendChild(data);
    return listRow;
}

async function pendingList(): Promise<HTMLTableRowElement> {
    const listRow = document.createElement('tr');
    const title = document.createElement('td');
    title.textContent = 'outstanding friend requests';
    listRow.appendChild(title);
    const friends = await getPendingFriends();
    if (!friends) {
        return listRow;
    }
    const data = document.createElement('td');
    const list = document.createElement('ul');
    list.style.listStyleType = 'none';
    if (friends.includes(',')) {
        const friendArray = friends.split(',');
        friendArray.forEach(async fr => {
            const user = await searchUsers(fr)
            if (!user) {
                return;
            }
            const listItem = document.createElement('li');
            listItem.textContent = user[0].username;
            // TODO add online accept/reject buttons
            list.appendChild(listItem);
        });
    } else {
        const user = await searchUsers(friends);
        if (!user) {
            return listRow;
        }
        const listItem = document.createElement('li');
        listItem.textContent = user[0].username;
        list.appendChild(listItem);
    }
    data.appendChild(list);
    listRow.appendChild(data);
    return listRow;
}

async function requestedList(): Promise<HTMLTableRowElement> {
    const listRow = document.createElement('tr');
    const title = document.createElement('td');
    title.textContent = 'incomming friend requests';
    listRow.appendChild(title);
    const friends = await getRequestedFriends();
    if (!friends) {
        return listRow;
    }
    const data = document.createElement('td');
    const list = document.createElement('ul');
    list.style.listStyleType = 'none';
    if (friends.includes(',')) {
        const friendArray = friends.split(',');
        friendArray.forEach(async fr => {
            const user = await searchUsers(fr)
            if (!user) {
                return;
            }
            const listItem = document.createElement('li');
            listItem.textContent = user[0].username;
            // TODO add online accept/reject buttons
            list.appendChild(listItem);
        });
    } else {
        const user = await searchUsers(friends);
        if (!user) {
            return listRow;
        }
        const listItem = document.createElement('li');
        listItem.textContent = user[0].username;
        list.appendChild(listItem);
    }
    data.appendChild(list);
    listRow.appendChild(data);
    return listRow;
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
    submitButton.style.color = 'black';
    submitButton.style.textAlign = 'center';
    submitButton.style.border = '1em';
    submitButton.style.marginLeft = ' 10px';
    submitButton.textContent = text.loginButtonText;
    submitButton.id = 'login-btn';
    
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
    submitButton.style.color = 'black';
    submitButton.style.textAlign = 'center';
    submitButton.style.border = '1em';
    submitButton.style.marginLeft = ' 10px';
    submitButton.textContent = text.registerButtonText;
    submitButton.id = 'register-btn';

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

async function rendderConformation(text: content): Promise<HTMLElement | null> {
    const user = await getLogginUserData();
    if (!user) return null;
    const passwordOverlay = document.createElement('div');
    passwordOverlay.id = 'secureUpdate';
    passwordOverlay.style.position = 'fixed';
    passwordOverlay.style.top = '0';
    passwordOverlay.style.left = '0';
    passwordOverlay.style.width = '100%';
    passwordOverlay.style.height = '100%';
    passwordOverlay.style.background = 'rgba(0,0,0,0.5)';
    passwordOverlay.style.display = 'none';
    passwordOverlay.style.justifyContent = 'center';

    const contentDiv = document.createElement('div');
    contentDiv.style.marginTop = '10%';
    contentDiv.style.marginBottom = '10%';
    contentDiv.style.height = '2%';

    const info = document.createElement('p');
    const infoText = document.createTextNode('please enter password to confirm update');
    info.appendChild(infoText);
    info.style.color = 'white';
    info.style.display = 'flex';
    info.style.justifyContent = 'center';
    contentDiv.appendChild(info);


    const overlayLabel = document.createElement('label');
    overlayLabel.textContent = text.passwordText;
    overlayLabel.style.color = 'white';
    contentDiv.appendChild(overlayLabel);

    const overlayInput = document.createElement('input');
    overlayInput.type = 'password';
    overlayInput.id = 'oldPassword';
    overlayInput.name = 'oldPassword';
    overlayInput.ariaRequired = 'true';

    contentDiv.appendChild(overlayInput);

    const overlaySubitButton = document.createElement('button');
    overlaySubitButton.id = 'passwordSubmit';
    overlaySubitButton.textContent = 'Confirm';
    overlaySubitButton.onclick = () => {
        const password = (document.getElementById('oldPassword') as HTMLInputElement).value;
        if (!password) {
            const error = document.getElementById('error');
            if (!error) {
                return;
            }
            const text = document.createTextNode('password is required');
            const errorParagraph = document.createElement('p');
            errorParagraph.appendChild(text);
            errorParagraph.style.color = 'red';
            error.appendChild(errorParagraph);
        }
        const formInfo = document.getElementById('profileForm') as HTMLFormElement | null;
        if (!formInfo) return;
        const formData = new FormData(formInfo);
        updateUserInfo(user.email, user.username, password, formData);
    }

    contentDiv.appendChild(overlaySubitButton);


    const overlayGoogleLogin = document.createElement('div');
    overlayGoogleLogin.id = 'google-auth';
    window.google.accounts.id.initialize({
        client_id: '51710532102-br37sgrm5iodlnhsa2kahmcjr6lh8f8n.apps.googleusercontent.com',
        callback: (googleResponse: any) => {
            handleGoogleCheck({
                idToken: googleResponse.credential,
                user,
            });
        }
    });
    window.google.accounts.id.renderButton(overlayGoogleLogin, {
        theme: 'outline',
        size: 'large',
    });

    contentDiv.appendChild(overlayGoogleLogin);
    
    const exitButton = document.createElement('button');
    exitButton.id = 'exit-btn';
    exitButton.textContent = text.exitButtonText;
    exitButton.onclick = () => {
        history.pushState({}, '', '/profile');
        checkSession();
    }

    contentDiv.appendChild(exitButton);

    passwordOverlay.appendChild(contentDiv);
    return passwordOverlay;
}

async function handleGoogleCheck(request:{ idToken: string, user: userInfo}) {
    const formInfo = document.getElementById('profileForm') as HTMLFormElement;
    const formData = new FormData(formInfo);
    const response = await fetch('api/user/csrf-token', {credentials: 'include'});
    const data = await response.json();
    const csrf = data.csrfToken;
    const googleResponse = await fetch('api/user/google-check', {
        method: 'POST',
        headers: {
            'x-csrf-token': csrf,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({idToken: request.idToken}),
        credentials: 'include',
    });
    if (googleResponse.ok) {
        googleUserUpdate(formData);
    } else {
        let errorMessage;
        const cloned = googleResponse.clone();
        try {
            errorMessage = await cloned.json();
        } catch (err) {
            const text = await cloned.text();
            errorMessage = { error: text };
        }
        console.error('google login failed:', errorMessage);
    }
}

async function renderProfileData(text: content): Promise<HTMLFormElement | null> {
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

    const fileLabel = document.createElement('label');
    fileLabel.textContent = text.profilePictureLabelText;
    fileLabel.setAttribute('for', 'newProfilePicture');

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'newProfilePicture';
    fileInput.name = 'newProfilePicture';
    table.appendChild(createRow(fileLabel, fileInput));

    const emailLabel = document.createElement('label');
    emailLabel.textContent = text.emailText;
    emailLabel.setAttribute('for', 'newEmail');

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'newEmail';
    emailInput.value = user.email;
    emailInput.name = 'newEmail';

    table.appendChild(createRow(emailLabel, emailInput));

    const usernameLable = document.createElement('label');
    usernameLable.textContent = text.usernameText;
    usernameLable.setAttribute('for', 'newUsername');

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'newUsername';
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
    submitButton.style.color = 'black';
    submitButton.style.textAlign = 'center';
    submitButton.style.border = '1em';
    submitButton.style.marginLeft = ' 10px';
    submitButton.textContent = text.updateProfileButtonText;

    const errorDiv = document.createElement('div');
    errorDiv.id = 'error';

    table.appendChild(createRow(submitButton, errorDiv));

    profileForm.appendChild(table);
    profileForm.onsubmit = (e) => {
        e.preventDefault();
        const confirm = document.getElementById('secureUpdate');
        if (!confirm) {
            console.error('secureUpdate not found');
            return;
        }
        confirm.style.display = 'flex';
        // updateUserInfo(user.email, user.username, user.password, formData);
    };

    return profileForm;
}

async function renderProfilePicture(): Promise<HTMLImageElement | null> {
    try {
        const respone = await fetch('api/user/profile-picture', {
            credentials: 'include'
        });
        if (!respone.ok) {
            if (respone.status == 404) {
                return null;
            }
            throw new Error(`Failed to load image:${respone.statusText}`);
        }
        const blob = await respone.blob();
        const imageUrl = URL.createObjectURL(blob);
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = 'Profile Picture';
        imgElement.style.width = '10%';
        imgElement.style.aspectRatio = '1/1';
        imgElement.id = 'profilePicture';
        return imgElement;
    } catch (err) {
        console.error('Error loading profile picture', err);
        return null;
    }
}

export async function renderContent (route: string): Promise<void> {
    const content = document.getElementById('content');
    if (!content) return;
    const child = content.querySelector('#secureUpdate');
    if (child) {
        content.removeChild(child);
    }
    content.innerHTML = '';
    content.style.display = 'flex';
    content.style.margin = '1em 0em';
    content.style.justifyContent = 'center';
    let language = (await getLanguage()).toLowerCase();
    const textMap = await getPageContent(language, values)
    const textData = textMap.get('row') as content;
    switch (route)
    {
        case 'home':
            content.textContent = textData.homePageText;
            break;
        case 'profile':
            content.style.display = 'grid';
            const profilePicture = await renderProfilePicture();
            if (profilePicture !== null) {
                content.appendChild(profilePicture);
            }
            const searchUser = setupSearchUsers();
            if (searchUser !== null) {
                content.appendChild(searchUser);
            }
            const profileData = await renderProfileData(textData);
            if (profileData !== null) {
                content.appendChild(profileData);
                const secureUpdate = await rendderConformation(textData);
                if(secureUpdate) {
                    content.appendChild(secureUpdate);
                }
            } else {
                window.location.href = '/login';
                return;
            }
            const friends = await renderFriendLists();
            content.appendChild(friends);
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
        case 'game':
            content.textContent = 'Game page is under construction.';
            pongbutton();
            break;
        default:
            content.textContent = textData.notFoundText;
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