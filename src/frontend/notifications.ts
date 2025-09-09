export interface Notification {
    id: number;
    message: string;
    timestamp: Date;
}
let notifications: Notification[] = [];

export function showNotification() {
    if (notifications.length > 0) {
        const notification = notifications.shift();
        if (notification) {
            displayNotification(notification);
        }
    }
}

export async function listenForNotifications() {
    const response = await fetch('/api/notification/get', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as Notification[];
    data.forEach((notification: Notification) => {
        notification.timestamp = new Date(notification.timestamp);
        notifications.push(notification);
    });
}

export function renderNotification() {
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    wrapper.id = "notification-area";

    const notiWrap = document.createElement("div");
    notiWrap.className = "notification_wrap";

    const bellDiv = document.createElement("div");
    bellDiv.className = "notification_icon";

    const svgIcon = document.createElement("div");
    svgIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
    `;
    bellDiv.appendChild(svgIcon);

    const dropdown = document.createElement("div");
    dropdown.className = "notiDropdown";

    bellDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
        if (!notiWrap.contains(e.target as Node)) {
            dropdown.classList.remove("show");
        }
    });

    notiWrap.appendChild(bellDiv);
    notiWrap.appendChild(dropdown);
    wrapper.appendChild(notiWrap);

    return wrapper;
}

function displayNotification(notification: Notification): void {
    const notificationArea = document.getElementById('notification-area');

    if (notificationArea) {
        addMessage(notificationArea, notification.message, `${notification.timestamp}`);
    }
}

function addMessage(notiArea: HTMLElement, message: string, time: string) {
    const dropDown = notiArea.querySelector('.notiDropdown');

    if (!dropDown) {
        console.error('Dropdown not found');
        return;
    }

    const notiItem = document.createElement("div");
    notiItem.className = "notify_item";

    const notiDiv = document.createElement("div");
    notiDiv.className = "notify_info";

    const pTag = document.createElement("p");
    pTag.textContent = message;

    const spanTag = document.createElement('span');
    spanTag.className = "notify_time";
    spanTag.textContent = time;

    notiDiv.appendChild(pTag);
    notiDiv.appendChild(spanTag);
    notiItem.appendChild(notiDiv);

    dropDown.insertBefore(notiItem, dropDown.firstChild);
}
