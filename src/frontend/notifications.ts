/* For a notification system between a Fastify backend and a frontend, the best practice is to use one of these approaches:

1. Polling with Intervals (AJAX polling)
The frontend uses setInterval to periodically send requests (e.g., every 5–30 seconds) to the backend for new notifications.
Pros: Simple to implement, works everywhere.
Cons: Not real-time, can cause unnecessary server load if interval is too short.
2. Server-Sent Events (SSE)
The backend pushes notifications to the frontend over a single HTTP connection.
Pros: Real-time, efficient for one-way updates.
Cons: Only supports one-way communication (server → client).
3. WebSockets
The frontend opens a persistent connection to the backend, and the server pushes notifications instantly.
Pros: Real-time, two-way communication, efficient.
Cons: More complex to implement and scale.
4. Long Polling
The frontend sends a request and the server holds it until there’s new data, then responds.
Pros: Simulates real-time, works everywhere.
Cons: More complex than simple polling, less efficient than SSE/WebSockets.
Summary:

Intervals (polling) are easiest for most projects.
WebSockets or SSE are best for real-time notifications.
Infinite loops with wait timers are not recommended for frontend code (they block the browser).
Recommendation:
Start with interval polling for simplicity.
If you need instant updates, use WebSockets or SSE */ 

export interface Notification {
	id: number;
	message: string;
	timestamp: Date;
}
let notifications: Notification[] = [];
let nextId = 1;

export function addNotification(message: string): void {
	const notification: Notification = {
		id: nextId++,
		message: message,
		timestamp: new Date()
	};
	notifications.push(notification);
}

export function getNotifications(): Notification[] {
	return notifications;
}

export function clearNotifications(): void {
	notifications = [];
}
function timediffrence(date1: Date, date2: Date): string {
	const diff = Math.abs(date2.getTime() - date1.getTime());
	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) return `${days} day(s) ago`;
	if (hours > 0) return `${hours} hour(s) ago`;
	if (minutes > 0) return `${minutes} minute(s) ago`;
	return `${seconds} second(s) ago`;
}
export function dodo(){

	if (notifications.length > 0) {
		const notification = notifications.shift();
		if (notification) {
			displayNotification(notification);
		}
	}
	// setTimeout(dodo, 1000); // Call dodo every second
}
function displayNotification(notification: Notification): void {
	const notificationArea = document.getElementById('notification-area');
	if (notificationArea) {
		// Clear previous notifications
		notificationArea.innerHTML = '';
		const notificationElement = document.createElement('div');
		notificationElement.className = 'notification';
		// notificationElement.textContent = `${notification.timestamp.toLocaleTimeString()}: ${notification.message}`;
		notificationElement.textContent = `${timediffrence(notification.timestamp, new Date())}: ${notification.message}`;
		notificationArea.appendChild(notificationElement);
	}
}

export async function setNotifications() {
	console.log('Setting up notifications...');
	setInterval(() => {
		listenForNotifications(1).catch(console.error);
	}, 10000);
	setInterval(() => {
		dodo();
	}, 3000);

}

export async function listenForNotifications(userId: number) {
	const response = await fetch('/api/notification/get', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include' // Include cookies for session management
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	console.log('Fetching notifications for user:', userId, 'Response:', response);
	const data = await response.json() as Notification[];
	console.log('Fetching notifications for user:', userId, 'data:', data);
	data.forEach((notification: Notification) => {
		notification.timestamp = new Date(notification.timestamp);
		notifications.push(notification);
	});
}


// 	const eventSource = new EventSource(`api/game/notifications`);
// 	eventSource.onmessage = (event) => {
// 		// event.data contains the message sent by sendNotificationToUser
// 		console.log('Notification received:', event.data);
// 		// You can parse JSON if you send JSON: const data = JSON.parse(event.data);
// 		// Show notification in your UI here
// 	};
// 	eventSource.addEventListener('notification', (event) => {
// 		console.log('Custom notification event:', event.data);
// 		console.log('Custom notification event:', JSON.parse(event.data));
// 	});
// 	eventSource.onerror = (err) => {
// 		console.error('SSE error:', err);
// 	};
// }