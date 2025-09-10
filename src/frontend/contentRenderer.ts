// import { getCurrentUser, getLoggin, login, updateUserInfo , register, handleGoogleCredentials, getLogginUserData } from "./routing.js";
import { getLanguage } from "./index.js";
import { pongbutton } from "./pongMenu.js";
import { getLoggin, login, updateUserInfo, handleGoogleCheck, register, handleGoogleCredentials, getLogginUserData, getCsrfToken, userInfo, checkSession, searchUsers, searchUser, getFriends , sendFriendRequest, getRequestedFriends, getPendingFriends, removeRequest, acceptFriendRequest, getCurrentUser, getLogginServer, getIdFromMe } from "./routing.js";
import { getContent, openSettings } from "./settings.js";
import { renderTournament } from "./renderTournament.js"
import { createGameHistoryTable } from "./gameHistoryTable.js";

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

async function setupSearchUsers(): Promise<HTMLDivElement> {
    const language = await getLanguage();
    const textMapData = await getContent(language.toLowerCase(), ['searchUserButtonText', 'searchUserPlaceholderText']);
    const text = textMapData.get('row') as { searchUserButtonText: string; searchUserPlaceholderText: string };
    const searchDiv = document.createElement('div');
    searchDiv.id = 'searchDiv';
    searchDiv.style.display = 'grid';

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'userSearch';
    input.id = 'searchInput';
    input.placeholder = text.searchUserPlaceholderText;
    searchDiv.appendChild(input);

    const button = document.createElement('button');
    button.id = 'searchButton';
    button.textContent = text.searchUserButtonText;
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
    const language = await getLanguage();
    const textMapData = await getContent(language.toLowerCase(), ['noUser', 'addFriendButtonText']);
    const text = textMapData.get('row') as { noUser: string; addFriendButtonText: string; };
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
    if (Array.isArray(users)) {
        if (users.length === 0) {
            listItem.textContent = text.noUser;
            resultList.appendChild(listItem);
            searchDiv.appendChild(resultList);
            return;
        }
        const friends = await getFriends() as string;
        let friendArray: string[] = [];
        if (friends !== null) {
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
            } else {
                email = user.googleEmail as string
            }
            if (!friendArray.includes(email) && !requestedArray.includes(email) && !pendingArray.includes(email)) {
                const addFriendButton = document.createElement('button');
                addFriendButton.id = 'AddFriendbutton' + i;
                addFriendButton.textContent = text.addFriendButtonText;
                addFriendButton.onclick = async (e) => {
                    await sendFriendRequest(user);
                    e.preventDefault();
                    renderContent('profile');
                };
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
    const currentIncomming = await requestedList();
    friendLists.appendChild(currentIncomming);
    return friendLists;
}

function addOnlineCircle(status: number, username: string | null) {
    const statusCircle = document.createElement('div');

    statusCircle.className = 'statusCircle';
    if (typeof username === 'string') {
        statusCircle.id = `statusCircle${username}`;
    } else {
        statusCircle.id = '';
    }
    if (status === 1) {
        statusCircle.style.backgroundColor = 'green';
    } else {
        statusCircle.style.backgroundColor = 'transparent';
    }

    return statusCircle;
}

async function friendsList(): Promise<HTMLTableRowElement> {
    const language = await getLanguage();
    const textMapData = await getContent(language.toLowerCase(), ['friendsLabelText']);
    const text = textMapData.get('row') as { friendsLabelText: string; };
    const listRow = document.createElement('tr');
    const title = document.createElement('td');
    title.textContent = text.friendsLabelText;
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
            const online = addOnlineCircle(user[0].isLoggedIn, user[0].username);
            list.appendChild(listItem);
            listItem.appendChild(online);
        });
    } else {
        const user = await searchUsers(friends);
        if (!user) {
            return listRow;
        }
        if (user.length) {
            const listItem = document.createElement('li');
            listItem.textContent = user[0].username;
            const online = addOnlineCircle(user[0].isLoggedIn, user[0].username);
            list.appendChild(listItem);
            listItem.appendChild(online);
        }
    }
    data.appendChild(list);
    listRow.appendChild(data);
    return listRow;
}

async function pendingList(): Promise<HTMLTableRowElement> {
    const lang = await getLanguage();
    const textMapData = await getContent(lang.toLowerCase(), ['outstandingFriendsLabelText']);
    const text = textMapData.get('row') as { outstandingFriendsLabelText: string; };
    const listRow = document.createElement('tr');
    const title = document.createElement('td');
    title.textContent = text.outstandingFriendsLabelText;
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
            const removeRequestButton = document.createElement('button');
            removeRequestButton.textContent = 'X';
            removeRequestButton.style.color = 'red';
            removeRequestButton.style.background = 'none';
            removeRequestButton.style.border = 'none'
            removeRequestButton.onclick = async (e) => {
                if (user[0].email) {
                    await removeRequest(user[0].email);
                }
                e.preventDefault();
                renderContent('profile')
            };
            listItem.appendChild(removeRequestButton);
            list.appendChild(listItem);
        });
    } else {
        const user = await searchUsers(friends);
        if (!user) {
            return listRow;
        }
        const listItem = document.createElement('li');
        listItem.textContent = user[0].username;
        const removeRequestButton = document.createElement('button');
        removeRequestButton.textContent = 'X';
        removeRequestButton.style.color = 'red';
        removeRequestButton.style.background = 'none';
        removeRequestButton.style.border = 'none';
        removeRequestButton.onclick = async (e) => {
            if (user[0].email) {
                await removeRequest(user[0].email);
            }
            e.preventDefault();
            history.pushState({}, '', '/profile');
            renderContent('profile')
        };
        listItem.appendChild(removeRequestButton);
        list.appendChild(listItem);
    }
    data.appendChild(list);
    listRow.appendChild(data);
    return listRow;
}

async function requestedList(): Promise<HTMLTableRowElement> {
    const lang = await getLanguage();
    const textMapData = await getContent(lang.toLowerCase(), ['incomingFriendsLabelText']);
    const text = textMapData.get('row') as { incomingFriendsLabelText: string };
    const listRow = document.createElement('tr');
    const title = document.createElement('td');
    title.textContent = text.incomingFriendsLabelText;
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
            const acceptRequestButton = document.createElement('button');
            acceptRequestButton.textContent = '✔️'
            acceptRequestButton.style.color = 'green';
            acceptRequestButton.style.background = 'none';
            acceptRequestButton.style.border = 'none';
            acceptRequestButton.onclick = async (e) => {
                if (user[0].email) {
                    await acceptFriendRequest(user[0].email);
                }
                e.preventDefault();
                renderContent('profile');
            }
            listItem.appendChild(acceptRequestButton);

            const removeRequestButton = document.createElement('button');
            removeRequestButton.textContent = 'X';
            removeRequestButton.style.color = 'red';
            removeRequestButton.style.background = 'none';
            removeRequestButton.style.border = 'none'
            removeRequestButton.onclick = async (e) => {
                if (user[0].email) {
                    await removeRequest(user[0].email);
                }
                e.preventDefault();
                renderContent('profile')
            };
            listItem.appendChild(removeRequestButton);
            list.appendChild(listItem);
        });
    } else {
        const user = await searchUsers(friends);
        if (!user) {
            return listRow;
        }
        const listItem = document.createElement('li');
        listItem.textContent = user[0].username;
        const acceptRequestButton = document.createElement('button');
        acceptRequestButton.textContent = '✔️'
        acceptRequestButton.style.color = 'green';
        acceptRequestButton.style.background = 'none';
        acceptRequestButton.style.border = 'none';
        acceptRequestButton.onclick = async (e) => {
            if (user[0].email) {
                await acceptFriendRequest(user[0].email);
            }
            e.preventDefault();
            renderContent('profile');
        }
        listItem.appendChild(acceptRequestButton);

        const removeRequestButton = document.createElement('button');
        removeRequestButton.textContent = 'X';
        removeRequestButton.style.color = 'red';
        removeRequestButton.style.background = 'none';
        removeRequestButton.style.border = 'none'
        removeRequestButton.onclick = async (e) => {
            if (user[0].email) {
                await removeRequest(user[0].email);
            }
            e.preventDefault();
            renderContent('profile');
        };
        listItem.appendChild(removeRequestButton);
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
    emailInput.autocomplete = 'email';

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

async function renderProfileData(text: content): Promise<HTMLFormElement | null> {
    if (!getLoggin()) {
        return null;
    }
    const user = await getLogginUserData();
    if (!user) {
        return null;
    }
    await fetch('/api/user/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'x-internal': 'true'
        }
    }).then(async (response) => {
        let data: any = null;
        if (response.ok) {
            data = await response.json();
        }
    }).catch(() => { });

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
            credentials: 'include',
            headers: {
                "x-internal": "true"
            }
        })
            .then(async (response) => {
                if (!response.ok) {
                    if (response.status == 404) return null;
                    throw new Error(`Failed to load image:${response.statusText}`);
                }
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                imgElement.alt = 'Profile Picture';
                imgElement.style.width = '10%';
                imgElement.style.aspectRatio = '1/1';
                imgElement.id = 'profilePicture';
                return imgElement;
            })
            .catch(() => { });
        if (respone) {
            return respone;
        }
    } catch (err) {
        console.error('Error loading profile picture', err);
        return null;
    }
    return null;
}

interface player {
    userId: number;
    username: string;
}

async function renderGameData(): Promise<HTMLDivElement | null> {
    try {
        const user = await fetch('/api/user/me', {
            credentials: 'include',
            method: 'GET',
            headers: {
                'x-internal': 'true'
            }
        });
        if (!user.ok) {
            console.error('user is returns with error')
            return null;
        }

        const userId = await user.json();
        const players = await fetch(`/api/game/db/getGameStats?playerid=${userId.user.userId}`, {
            credentials: 'include',
            method: 'GET'
        });
        if (!players.ok) {
            console.error('getGameStates returns with error');
            return null;
        }

        const data = await players.json();
        const gameDataDiv = document.createElement('div');
        const played = data.gamesPlayed;
        const won = data.gamesWon;
        
        gameDataDiv.className = 'winLoss';

        const size = 250;
        const strokeWidth = 20;
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', size.toString());
        svg.setAttribute("height", size.toString());

        const bigCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        bigCircle.setAttribute("cx", (size / 2).toString());
        bigCircle.setAttribute('cy', (size / 2).toString());
        bigCircle.setAttribute('r', radius.toString());
        bigCircle.setAttribute('stroke', '#888');
        bigCircle.setAttribute('stroke-width', strokeWidth.toString());
        bigCircle.setAttribute('fill', 'none');
        svg.appendChild(bigCircle);

        const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        progressCircle.setAttribute('cx', (size / 2).toString());
        progressCircle.setAttribute('cy', (size / 2).toString());
        progressCircle.setAttribute('r', radius.toString());
        progressCircle.setAttribute('stroke', 'lime');
        progressCircle.setAttribute('stroke-width', strokeWidth.toString());
        progressCircle.setAttribute('fill', 'none');
        progressCircle.setAttribute('stroke-linecap', 'round');
        progressCircle.setAttribute('stroke-dasharray', circumference.toString());
        progressCircle.setAttribute('stroke-dashoffset', circumference.toString());
        progressCircle.style.transition = "stroke-dashoffset 1s ease";
        svg.appendChild(progressCircle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '50%');
        text.setAttribute('y', '50%');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#111');
        text.setAttribute('font-size', '24');
        text.textContent = `${won}/${played}`;
        svg.appendChild(text);

        const textTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textTitle.setAttribute('x', '50%');
        textTitle.setAttribute('y', '40%');
        textTitle.setAttribute('dominant-baseline', 'middle');
        textTitle.setAttribute('text-anchor', 'middle');
        textTitle.setAttribute('fill', '#111');
        textTitle.setAttribute('font-size', '24');
        textTitle.textContent = 'played/win ratio';
        svg.appendChild(textTitle);

        gameDataDiv.appendChild(svg);
        let progress = won / played;
        progressCircle.setAttribute('stroke-dashoffset', (circumference * (1 - progress)).toString());

        return gameDataDiv;
    } catch (err) {
        console.error(`error in showing game stats: ${err}`);
        return null;
    }
}

interface kindOfGames {
    random: number,
    friends: number,
    ai: number,
    tournaments: number;
    local: number;
};

function makeBar(value: number, maxValue: number, charHeight: number, padding: number, index: number, height: number, barWidth: number): SVGRectElement {
    const barHeight = (value / maxValue) * charHeight;

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', (padding + index * barWidth + 10).toString());
    rect.setAttribute('y', (height - padding - barHeight).toString());
    rect.setAttribute('width', (barWidth - 20).toString());
    rect.setAttribute('height', barHeight.toString());
    rect.setAttribute('fill', 'lime');
    return rect;
}

function makeValueText(value: number, padding: number, index: number, height: number, barWidth: number, barHeight: number): SVGTextElement {
    const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    valueText.setAttribute('x', (padding + index * barWidth + barWidth / 2).toString());
    valueText.setAttribute('y', (height - padding - barHeight - 5).toString());
    valueText.setAttribute('fill', 'black');
    valueText.setAttribute('font-size', '14');
    valueText.setAttribute('text-anchor', 'middle');
    valueText.textContent = value.toString();

    return valueText;
}

function makeLabel(name: string, padding: number, index: number, height: number, barWidth: number): SVGTextElement {
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', (padding + index * barWidth + barWidth / 2).toString());
    label.setAttribute('y', (height - padding + 20).toString());
    label.setAttribute('fill', 'black');
    label.setAttribute('font-size', '14');
    label.setAttribute('text-anchor', 'middle');
    label.textContent = name;

    return label;
}

interface Game {
    id: number | null; // Game ID, can be null for new games
    type?: string; // Optional type field for future use
    player1: player;
    player2: player;
    player1Score: number;
    player2Score: number;
    winner: string;
    createdAt: Date | null; // Date when the game was created, can be null for new games
}

async function gameDataBrakedown(): Promise<HTMLDivElement | null> {
    const gameDataBrakedownDiv = document.createElement('div');
    gameDataBrakedownDiv.className = 'gameBreakdownDiv';
    const width = 500;
    const height = 300;
    const padding = 50;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());;
    gameDataBrakedownDiv.appendChild(svg);

    const user = await getLogginUserData();

    if (user === null) return null;
    const games = await fetch('/api/game/db/getGamesForPlayer', {
        credentials: 'include',
        method: 'GET'
    });
    if (!games.ok) {
        console.error('failed to get game data');
        return null;
    }
    const gameData = await games.json() as Game[];

    let data: kindOfGames = {
            random: 0,
            friends: 0,
            ai: 0,
            tournaments: 0,
            local: 0,
        };
        const self = await getIdFromMe();
        if (!self) {
            console.error("failed to get own data");
            return null;
        }

        gameData.forEach(async (game) => {
        if (typeof game.type !== 'undefined') {
            if(game.type === 'local') {
                if (game.player2.userId === 0) {
                    data.ai += 1;
                } else {
                    data.local += 1;
                }
            } else {
                if (game.type === 'tournament') {
                    data.tournaments += 1;        
                }
                else if (self === game.player1.userId) {
                    if (game.player2.userId === 2) {
                        data.random += 1;
                    } else {
                        const response = await fetch(`api/user/isIdFriend?id=${self}`, {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                'x-internal': 'true'
                            }
                        });
                        if (!response.ok) {
                            return null;
                        }
                        const isFriendData = await response.json();
                        if (isFriendData) {
                            data.friends += 1;
                        } else {
                            data.random += 1;
                        }
                    }
                } else if (self === game.player2.userId) {
                    if (game.player1.userId === 2) {
                        data.random += 1;
                    } else {
                        const response = await fetch(`api/user/isIdFriend?id=${self}`, {
                            method: 'GET',
                            credentials: 'include',
                            headers: {
                                'x-internal': 'true'
                            }
                        });
                        if (!response.ok) {
                            return null;
                        }
                        const isFriendData = await response.json();
                        if (isFriendData) {
                            data.friends += 1;
                        } else {
                            data.random += 1;
                        }
                    }
                } else {
                    data.random += 1;
                }
            }
        }
         return null;
    });

    const max = Math.max(data.random, data.friends, data.ai, data.tournaments, data.local);
    const barWidth = (width - padding * 2) / 5;
    const charHeigth = height - padding * 2;

    let bar = makeBar(data.random, max, charHeigth, padding, 0, height, barWidth);
    let valueText = makeValueText(data.random, padding, 0, height, barWidth, (data.random / max) * charHeigth);
    let label = makeLabel('random', padding, 0, height, barWidth);
    svg.appendChild(bar);
    svg.appendChild(valueText);
    svg.appendChild(label);

    bar = makeBar(data.friends, max, charHeigth, padding, 1, height, barWidth);
    valueText = makeValueText(data.friends, padding, 1, height, barWidth, (data.friends / max) * charHeigth);
    label = makeLabel('friend', padding, 1, height, barWidth);
    svg.appendChild(bar);
    svg.appendChild(valueText);
    svg.appendChild(label);

    bar = makeBar(data.ai, max, charHeigth, padding, 2, height, barWidth);
    valueText = makeValueText(data.ai, padding, 2, height, barWidth, (data.ai / max) * charHeigth);
    label = makeLabel('ai', padding, 2, height, barWidth);
    svg.appendChild(bar);
    svg.appendChild(valueText);
    svg.appendChild(label);

    bar = makeBar(data.tournaments, max, charHeigth, padding, 3, height, barWidth);
    valueText = makeValueText(data.tournaments, padding, 3, height, barWidth, (data.tournaments / max) * charHeigth);
    label = makeLabel('tournaments', padding, 3, height, barWidth);
    svg.appendChild(bar);
    svg.appendChild(valueText);
    svg.appendChild(label);

    bar = makeBar(data.local, max, charHeigth, padding, 4, height, barWidth);
    valueText = makeValueText(data.local, padding, 4, height, barWidth, (data.tournaments / max) * charHeigth);
    label = makeLabel('local', padding, 4, height, barWidth);
    svg.appendChild(bar);
    svg.appendChild(valueText);
    svg.appendChild(label);

    const axis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    axis.setAttribute('x1', padding.toString());
    axis.setAttribute('y1', (height - padding).toString());
    axis.setAttribute('x2', (width - padding).toString());
    axis.setAttribute('y2', (height - padding).toString());
    axis.setAttribute('stroke', 'white');
    axis.setAttribute('stroke-width', '2');
    svg.appendChild(axis);

    gameDataBrakedownDiv.appendChild(svg);
    return gameDataBrakedownDiv;
}

async function interfalHandler() {
    const friends = await getFriends();
    if (friends) {
        let friendArray: string[] = [];
        if (friends.includes(',')) {
            friendArray = friends.split(',');
        } else {
            friendArray[0] = friends;
        }

        friendArray.forEach(async (friend) => {
            const data = await searchUsers(friend);
            if (data?.[0]?.username) {
                const field = document.getElementById(`statusCircle${data[0].username}`);
                if (field) {
                    if (data[0].isLoggedIn === 1) {
                        field.style.backgroundColor = 'green';
                    } else {
                        field.style.backgroundColor = 'transparent';
                    }
                }
            }
        });
    }
}

function checkTextMap(data: Map<string, object>) {
    let flag = false;
    data.forEach(values => {
        if (!flag) {
            if (typeof values == 'undefined') {
                flag = true;
            }
        }
    });
    return flag;
}

let g_intervalId: number = 0;

export async function renderContent(route: string): Promise<void> {
    const content = document.getElementById('content');
    if (!content) return;
    const child = content.querySelector('#secureUpdate');
    if (child) {
        content.removeChild(child);
    }
    if (g_intervalId != null) {
        clearInterval(g_intervalId);
        g_intervalId = 0;
    }
    content.innerHTML = '';
    content.style.display = 'flex';
    content.style.margin = '1em 0em';
    content.style.justifyContent = 'center';
    let language = (await getLanguage()).toLowerCase();
    const textMap = await getPageContent(language, values);
    if (checkTextMap(textMap)) {
        throw new Error('textMap is not correct');
    }
    const textData = textMap.get('row') as any;
    if (typeof textData === 'undefined') {
        throw new Error('textData is undefined');
    }
    switch (route) {
        case 'home':

            content.textContent = textData.homePageText;
            break;
        case 'profile':
            content.style.display = 'grid';
            const profilePicture = await renderProfilePicture();
            if (profilePicture !== null) {
                content.appendChild(profilePicture);
            }
            const searchUser = await setupSearchUsers();
            if (searchUser !== null) {
                content.appendChild(searchUser);
            }
            const profileData = await renderProfileData(textData);
            if (profileData !== null) {
                content.appendChild(profileData);
                const secureUpdate = await rendderConformation(textData);
                if (secureUpdate) {
                    content.appendChild(secureUpdate);
                }
            } else {
                window.location.href = '/login';
                return;
            }
            const friends = await renderFriendLists();
            content.appendChild(friends);

            g_intervalId = setInterval(interfalHandler, 60 * 1000);

            const gameData = await renderGameData();
            if (gameData) {
                content.appendChild(gameData);
            }
            const gameBrake = await gameDataBrakedown();
            if (gameBrake) {
                content.appendChild(gameBrake);
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
        case 'game':
            // content.textContent = 'Game page is under construction.';
            pongbutton();
            break;
        case 'settings':
            // content.textContent = 'Settings page is under construction.';
            openSettings();
            break;
        case 'tournament':
            renderTournament();
            break;
        case 'history':
            await createGameHistoryTable(content as HTMLIFrameElement);
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
    const response = await fetch(`/api/page_content/getContent?${neededKeys}`, {
        method: 'GET'
    })
        .then(async (result) => {
            if (!result.ok) {
                console.error('error result for page content not ok');
                throw new Error(`HTTP error! status ${result.status}`);
            }
            const body = await result.json();
            const map = getMapFromJson(body);
            return map;
        })
        .catch(() => { });
    if (!response) {
        throw new Error('page content needed');
    }
    return response;
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
