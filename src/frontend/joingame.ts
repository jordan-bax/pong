import { startGame, quickjoin } from "./renderPong.js";
import {gamestateinterface, ballvarTemplate, player1Template, player2Template,scoreInterface, pcInterface, aiInterface, ballInterface, gameWall } from './sharedValuesPong.js';
import { table }  from './Tables.js'
import * as routing from './routing.js'
import { nextFunction } from "./pongMenu.js";
import { getLanguage } from "./index.js";
import { getContent } from "./settings.js";


interface test {
	username: string;
	type: string;
	gameid: number;
	active: boolean;
}

interface joingameText {
    gameButtonJoinText: string;
    backButtonText: string;
    noUserIdError: string;
    noOpenGamesError: string;
}


async function getText(): Promise<joingameText> {
    const textArray = [
        'gameButtonJoinText',
        'backButtonText',
        'noUserIdError',
        'noOpenGamesError'
    ];

    const language = await getLanguage();
    const textMapData = await getContent(language.toLowerCase(), textArray);
    const text = textMapData.get('row') as joingameText;
    return text;
}

type Header<T> = { label: string; key: keyof T };

async function bob(test: test, td: HTMLTableCellElement): Promise<void> {
    const text = await getText();
    // Remove any existing dropdown to avoid duplicates
    const removeDropdown = () => {
        const existingDropdown = td.querySelector('.dropdown-content');
        if (existingDropdown) {
            td.removeChild(existingDropdown);
        }
    };

    // Create dropdown menu
    const dropdownoptions = document.createElement('div');
    dropdownoptions.className = 'dropdown-content';
    dropdownoptions.style.position = 'absolute';
	dropdownoptions.style.background = 'rgba(155, 75, 215, 0.5)';
    dropdownoptions.style.border = '1px solid #ccc';
    dropdownoptions.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
    dropdownoptions.style.zIndex = '1000';
    dropdownoptions.style.display = 'block';
    dropdownoptions.style.left = '0px';
    dropdownoptions.style.top = td.offsetHeight + 'px';

    // Option 1: Join game
    const invite = document.createElement('a');
    invite.textContent = text.gameButtonJoinText;
    invite.className = 'a';
    invite.onclick = async () => {
        removeDropdown();
		console.log("Join clicked", test);
        nextFunction(async () => await Joining(test.gameid, test.type));
    };

    // // Option 2: Back
    // const back = document.createElement('a');
    // back.textContent = text.backButtonText;
    // back.className = 'a';
    // back.onclick = () => {
    //     removeDropdown();
	// 	console.log("Back clicked", test);
    // };

    dropdownoptions.appendChild(invite);
    // dropdownoptions.appendChild(back);

    // Ensure td is positioned relatively for absolute dropdown
    if (getComputedStyle(td).position === 'static') {
        td.style.position = 'relative';
    }

    // Add event listeners for hover
    td.onmouseenter = () => {
        // Only add if not already present
        if (!td.querySelector('.dropdown-content')) {
            td.appendChild(dropdownoptions);
        }
    };
    td.onmouseleave = () => {
        removeDropdown();
    };
}

export async function Joining(gameid: number , type: string): Promise<void> {
	console.log("Joining a game");
	await fetch('/api/game/join', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({ gameid: gameid })
	});
	await startGame(type);
	return;
}

async function getopengames(): Promise<gamestateinterface[]> {
	const response = await fetch('/api/game/getopengames', {
		method: 'GET',
		credentials: 'include'
	});
	if (!response.ok) {
		console.error('Failed to fetch open games:', response.statusText);
		return [];
	}
	return response.json();
}

function errorMessage(frame: HTMLElement, message: string): void {
	const errorDiv = document.createElement('div');
	errorDiv.style.color = 'red';
	errorDiv.style.fontSize = '1.2em';
	errorDiv.style.margin = '20px';
	errorDiv.textContent = message;
	frame.appendChild(errorDiv);
}

async function createGameList(games: gamestateinterface[], frame: HTMLElement): Promise<void> {
    const text = await getText();
	frame.innerHTML = ''; // Clear previous content
	const id = await routing.getIdFromMe();
	if (!id) {
		errorMessage(frame, text.noUserIdError);
		return;
	}
	if (games.length === 0) {
		errorMessage(frame, text.noOpenGamesError);
		return;
	}
	const test1: test[] = [];
	games.forEach(game => {
		var opponent: test;
		opponent = { username: '', type: game.gametype, gameid: -1, active: false };

		if (game.player1.id === id) {
			opponent.username = game.player2.name;
			opponent.gameid = game.gameID;
			opponent.active = game.player2.active;
		} else if (game.player2.id === id) {
			opponent.username = game.player1.name;
			opponent.gameid = game.gameID
			opponent.active = game.player1.active;
		}
		test1.push(opponent);
	});
	const gametable = new table<test>(bob);
	const header: Header<test>[] = [
		{ label: 'Username', key: 'username' },
		{ label: 'Type of game', key: 'type' },
		{ label: 'In game', key: 'active' }
	];
	const gtables = await gametable.createNewTable1(frame, test1, header);
	// 	[
	// 	{ label: 'Username', key: 'username' },
	// 	{ label: 'Type', key: 'type' }
	// ]);
}
async function tester() {
	const id = await routing.getIdFromMe();
	if (!id) {
		console.error('Failed to retrieve user ID.');
		return;
	}
	for (let i = 0; i < 5; i++) {
		await fetch('/api/game/preparegame', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({ playerid1: id, playerid2: i, gametype: 'online' })
		});
	}
}
export async function joinGame(gametype :string): Promise<void> {
    // window.location.href = '/pong/game'; // Redirect to the game page
    const text = await getText();
	// await tester();
	var frame = document.getElementById('content') as HTMLElement;
	const games = await getopengames();
	if (games.length === 0) {
		errorMessage(frame, text.noOpenGamesError);
		return;
	}
	await createGameList(games, frame);
	return;
    // startGame(gameData);
}
