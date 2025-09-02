import { startGame, quickjoin } from "./renderPong.js";
import {gamestateinterface, ballvarTemplate, player1Template, player2Template,scoreInterface, pcInterface, aiInterface, ballInterface, gameWall } from './sharedValuesPong.js';
import { table }  from './Tables.js'
import * as routing from './routing.js'


interface test {
	username: string;
	type: string;
	id?: number;
}
type Header<T> = { label: string; key: keyof T };

function bob(test: test, td: HTMLTableCellElement): void {
	console.log("bob", test);
	const dropdownoptions = document.createElement('div');
	dropdownoptions.className = 'dropdown-content';
	dropdownoptions.style.display = 'block';
	const invite = document.createElement('button');
	invite.textContent = 'Invite to game';
	invite.className = 'a';
	invite.onclick = async () => {
		if (td.parentElement) {
			td.parentElement.removeChild(dropdownoptions);
		}
		quickjoin("ai");
	};
	const back = document.createElement('button');
	back.textContent = 'Back';
	back.className = 'a';
	back.onclick = () => {
		if (td.parentElement) {
			td.parentElement.removeChild(dropdownoptions);
		}
	}
	dropdownoptions.appendChild(invite);
	dropdownoptions.appendChild(back);
	if (td.parentElement) {
		td.parentElement.appendChild(dropdownoptions);
	}

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
	frame.innerHTML = ''; // Clear previous content
	const id = await routing.getIdFromMe();
	if (!id) {
		errorMessage(frame, 'Failed to retrieve user ID.');
		return;
	}
	if (games.length === 0) {
		errorMessage(frame, 'No open games available.');
		return;
	}
	const test1: test[] = [];
	games.forEach(game => {
		var playerName = 'Unknown';
		if (game.player1.id === id) {
			playerName = game.player2.name;
		} else if (game.player2.id === id) {
			playerName = game.player1.name;
		}
		test1.push({
			username: playerName,
			type: game.gametype
		});
	});
	const gametable = new table<test>(bob);
	const header: Header<test>[] = [
		{ label: 'Username', key: 'username' },
		{ label: 'Type', key: 'type' }
	];
	const gtables = gametable.createNewTable1(frame, test1, header);
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
	await tester();
	var frame = document.getElementById('content') as HTMLElement;
	const games = await getopengames();
	if (games.length === 0) {
		errorMessage(frame, 'No open games available in backend.');
		return;
	}
	await createGameList(games, frame);
	return;
    // startGame(gameData);
}