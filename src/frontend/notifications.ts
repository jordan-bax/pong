export interface Notification {
    id: number;
    message: string;
    timestamp: Date;
    showed: boolean;
}

class NotificationSystem {
    private notifications: Notification[] = [];
    private storageNotifications: Notification[] = [];
    private notificationArea: HTMLElement | null = null;
    private dropdown: HTMLElement | null = null;

    constructor() {
        this.loadNotifications();
    }

    public async listenForNotifications(): Promise<void> {
        try {
            const response = await fetch('/api/notification/get', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json() as Notification[];
            data.forEach((notification: Notification) => {
                notification.timestamp = new Date(notification.timestamp);
                if (!this.notifications.some(n => n.id === notification.id)) {
                    notification.showed = true;
                    this.storageNotifications.push(notification);
                    this.saveNotifications();

                    notification.showed = false;
                    this.notifications.push(notification);

                    if (this.dropdown) {
                        this.addMessageToDropdown(
                            this.dropdown,
                            notification.message,
                            notification.timestamp.toLocaleString()
                        );

                        const emptyState = this.dropdown.querySelector('.empty-state');
                        if (emptyState) {
                            emptyState.remove();
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }

    public renderNotification(): HTMLElement {
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

        const badge = document.createElement("div");
        badge.className = "badge";
        bellDiv.appendChild(badge);

        this.dropdown = document.createElement("div");
        this.dropdown.className = "notiDropdown";

        const dropdownHeader = document.createElement("div");
        dropdownHeader.className = "dropdownHeader";
        this.dropdown.appendChild(dropdownHeader);

        if (this.notifications.length > 0) {
            this.notifications.forEach(notification => {
                this.addMessageToDropdown(
                    this.dropdown!,
                    notification.message,
                    notification.timestamp.toLocaleString()
                );
            });
        } else {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.textContent = 'No notifications';
            this.dropdown.appendChild(emptyState);
        }

        bellDiv.addEventListener("click", (e) => {
            e.stopPropagation();
            this.dropdown!.classList.toggle("show");
        });

        document.addEventListener("click", (e) => {
            if (!notiWrap.contains(e.target as Node)) {
                this.dropdown!.classList.remove("show");
            }
        });

        notiWrap.appendChild(bellDiv);
        notiWrap.appendChild(this.dropdown);
        wrapper.appendChild(notiWrap);

        this.notificationArea = wrapper;
        return wrapper;
    }

    public shiftNotification(): Notification | undefined {
        const notification = this.notifications.shift();
        return notification;
    }

    private addMessageToDropdown(
        dropdown: HTMLElement,
        message: string,
        time: string): void {

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

        const header = dropdown.querySelector('.dropdownHeader');
        if (header && header.nextSibling) {
            dropdown.insertBefore(notiItem, header.nextSibling);
        } else {
            dropdown.appendChild(notiItem);
        }
    }

    private loadNotifications(): void {
        const notificationsJson = sessionStorage.getItem('notifications');
        if (notificationsJson) {
            const notificationsData = JSON.parse(notificationsJson);
            this.notifications = notificationsData.map((n: any) => ({
                ...n,
                timestamp: new Date(n.timestamp)
            }));
        }
    }

    private saveNotifications(): void {
        sessionStorage.setItem('notifications',
            JSON.stringify(this.storageNotifications))
    }
}

const notificationSystem = new NotificationSystem();

export function renderNotification(): HTMLElement {
    return notificationSystem.renderNotification();
}

export async function listenForNotifications(): Promise<void> {
    return await notificationSystem.listenForNotifications();
}

export function showNotification(): void {
    const notification = notificationSystem.shiftNotification();
    if (notification && !notification.showed) {
        displayNotification(notification);
    }
}

function displayNotification(notification: Notification): void {
    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <p>${notification.message}</p>
            <span>${notification.timestamp.toLocaleString()}</span>
        </div>
    `;

    if (!document.querySelector('#notification-toast-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-toast-styles';
        styles.textContent = `
            .notification-toast {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                z-index: 1000;
                animation: slideIn 0.3s ease;
                max-width: 300px;
            }

            @keyframes slideIn {
                from { transform: translateX(100px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }

            .toast-content p {
                margin: 0 0 8px 0;
            }

            .toast-content span {
                font-size: 12px;
                color: #888;
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

(window as any).notificationSystem = notificationSystem;
