// import {createNewTable1} from './Tables';
import { getLanguage, setLanguage } from "./index.js";
import { checkSession, getLoggin, getLogginServer, logout } from "./routing.js";
import { createGameHistoryTable } from './gameHistoryTable.js';
import { renderContent, getPageContent } from './contentRenderer.js';

interface dropdownText {
    gameNavDropText: string;
    gameNavPongText: string;
    gameNavHistoryText: string;
    gameNavTournamentText: string;
};

export async function getContent(language:string, textKeys: string[]): Promise<Map<string, object>> {
    const content = getPageContent(language, textKeys);
    return content;
}

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
    const textMapData = await getContent(language.toLowerCase(), ['languageSettingText']);
    const text = textMapData.get('row') as {languageSettingText: string}
	const languageDropdown = document.createElement('select');
		const options = ['NL', 'EN', 'DE'];
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
		})
	const languagetext = document.createElement('div');
	languagetext.textContent = text.languageSettingText;

	return createRow(
		languagetext,
		languageDropdown
	);
}
async function addNotificationSettings(): Promise<HTMLTableRowElement> {
    const languae = await getLanguage();
    const textMapData = await getContent(languae.toLowerCase(), ['notificationSettingText']);
    const text = textMapData.get('row') as {notificationSettingText:string};
	const notificationText = document.createElement('div');
	notificationText.textContent = text.notificationSettingText;

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
	table.appendChild(await addNotificationSettings());

	content.appendChild(table);
}

export async function dropdowngamemenu(frame: HTMLElement): Promise<void> {
    const language = await getLanguage();
    const textMapData = await getContent(language.toLowerCase(), ['gameNavDropText', 'gameNavPongText', 'gameNavHistoryText', 'gameNavTournamentText']);
    const text = textMapData.get('row') as dropdownText;
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
	dropbtn.textContent = text.gameNavDropText;
	dropbtn.onclick = (e) => {
		e.preventDefault();
		console.log('Pong option clicked');
		history.pushState({}, '', '/gameMenu');
		renderContent('game');
	};

	const dropdownContent = document.createElement('div');
	dropdownContent.className = 'dropdown-content';

	const option1 = document.createElement('a');
	option1.href = '/pong';
	option1.textContent = text.gameNavPongText;
	option1.onclick = (e) => {
		e.preventDefault();
		console.log('Pong option clicked');
		history.pushState({}, '', '/gameMenu');
		renderContent('game');
	};
	dropdownContent.appendChild(option1);

	const option2 = document.createElement('a');
	option2.href = '/gamehistory';
	option2.textContent = text.gameNavHistoryText;
	option2.onclick = (e) => {
		e.preventDefault();
		console.log('Game history option clicked');

		history.pushState({}, '', '/gameHistory');
		renderContent('history');
	};
	dropdownContent.appendChild(option2);

	const option3 = document.createElement('a');
	option3.href = '/tournament';
	option3.textContent = text.gameNavTournamentText;
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
