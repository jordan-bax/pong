import {createNewTable1} from './Tables';
import { getLanguage, setLanguage } from "./index.js";
import { checkSession, getLoggin, getLogginServer, logout } from "./routing.js";
import { setNotifications } from './notifications';
import { createGameHistoryTable } from './gameHistoryTable.js';
import { renderContent } from './contentRenderer.js';
// interface settingsContent {
// 	languageSettings: string;
// 	notificationsSettings: string;
// }
// const  settingsTextKeys : settingsContent = {
// 	languageSettings :'languageSettings',
// 	notificationsSettings: 'notificationsSettings'};

// const settingsHeader: Headers<settingsContent>[] = [settingsTextKeys];

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

async function addLanguageSettings(): Promise<HTMLTableRowElement> {
	const language = await getLanguage();
	const languageDropdown = document.createElement('select');
		const options = ['NL', 'EN'];
		options.forEach((text, index) => {
			const option = document.createElement('option');
			option.value  = options[index];
			option.textContent = text;
			languageDropdown.appendChild(option);
		});

		// languageDropdown.style.display = 'flex';
		// languageDropdown.style.position = 'absolute';
		// languageDropdown.style.right = '20px';
		// navbar.appendChild(languageDropdown);
		Array.from(languageDropdown.options).forEach((option) => {
			if (option.text == language) {
				option.selected = true;
			} else {
				option.selected = false;
			}
		})
		languageDropdown.addEventListener('change', (event) => {
			const target = event.target as HTMLSelectElement;
			setLanguage(target.value);
			checkSession();
			openSettings(); // Refresh settings after changing language
		})
	const languagetext = document.createElement('div');
	languagetext.textContent = 'Language Settings:';

	return createRow(
		languagetext,
		languageDropdown
	);
}
function addNotificationSettings(): HTMLTableRowElement {
	const notificationText = document.createElement('div');
	notificationText.textContent = 'Notification Settings:';

	const notificationCheckbox = document.createElement('input');
	notificationCheckbox.type = 'checkbox';

	notificationCheckbox.addEventListener('change', (event) => {
		const target = event.target as HTMLInputElement;
		if (target.checked) {
			// setNotifications();
			console.log('Notifications enabled');
		}
	});

	return createRow(
		notificationText,
		notificationCheckbox
	);
}
export async function openSettings(): Promise<void> {
	const content = document.getElementById("content") as HTMLDivElement;
	if (!content) {
		console.error("Content element not found");
		return;
	}
	content.innerHTML = '';

	const table = document.createElement('table');
	table.innerHTML = "";
	table.id = "settings-table";

	table.appendChild(await addLanguageSettings());
	table.appendChild(addNotificationSettings());

	content.appendChild(table);
}

export function dropdowngamemenu(frame: HTMLElement): void {
	const dropdown = document.createElement('div');
	const content = document.getElementById('content');
	if (!content) {
		console.error('Content element not found');
		return;
	}
	// const dropdown = frame;
	dropdown.className = 'dropdown';
	dropdown.id = 'navstyle';

	const dropbtn = document.createElement('button');
	dropbtn.className = 'dropbtn';
	dropbtn.textContent = 'Game Menu';

	const dropdownContent = document.createElement('div');
	dropdownContent.className = 'dropdown-content';

	const option1 = document.createElement('a');
	option1.href = '/pong';
	option1.textContent = 'pong';
	option1.onclick = (e) => {
		e.preventDefault();
		console.log('Pong option clicked');
		history.pushState({}, '', '/gameMenu');
		renderContent('game');
	};
	dropdownContent.appendChild(option1);

	const option2 = document.createElement('a');
	option2.href = '/gamehistory';
	option2.textContent = 'History';
	option2.onclick = (e) => {
		e.preventDefault();
		console.log('Game history option clicked');
		createGameHistoryTable(content as HTMLIFrameElement);
	};
	dropdownContent.appendChild(option2);

	const option3 = document.createElement('a');
	option3.href = '/tournament';
	option3.textContent = 'tournament';
    option3.onclick = (e) => {
        e.preventDefault();
        history.pushState({}, '', '/tournament');
        renderContent('tournament');
    }
	dropdownContent.appendChild(option3);

	dropdown.appendChild(dropbtn);
	dropdown.appendChild(dropdownContent);
	frame.appendChild(dropdown);
}
