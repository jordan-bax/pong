import {startGame} from './renderPong.js';
import { createGameHistoryTable } from './gameHistoryTable.js';
// import {  } from './sharedValuesPong.js';
import {setNotifications} from './notifications.js';
var fps: number = 10; // Default frames per second

export async function pongbutton(): Promise<void> {
	createCenterButtons();
}

async function testaddPlayerButton(frame: HTMLIFrameElement): Promise<void> {
	try {
		const response = await fetch('/api/players', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: 'New Player' })
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		console.log('Player added:', data);
		alert('Player added: ' + JSON.stringify(data));
	} catch (error) {
		console.error('Error adding player:', error);
		alert('Failed to add player');
	}
}

// make a function that takes a game interface array an display on the page from top to down sorted by newest to oldest the games and from left to right. the game info in there seperated boxes player1 username and score in same box than the same for player2 than winner type and date in there own boxes. then a row below the same for the next game in the array and so on til all are placed


async function testData(frame: HTMLIFrameElement): Promise<void> {
	// This function is just a placeholder for testing purposes
	console.log('test function called');
	// You can add your test logic here
	const container = document.createElement('div');
	container.style.position = 'fixed';
	container.style.top = '50%';
	container.style.left = '50%';
	container.style.transform = 'translate(-50%, -50%)';
	container.style.display = 'flex';

	const backbutton = document.createElement('button');
	backbutton.textContent = 'back';
	backbutton.style.fontSize = '1.2em';
	backbutton.style.padding = '10px 20px';
	backbutton.onclick = () => {
		frame?.removeChild(container); // Remove the container before going back
		return
	};
	container.appendChild(backbutton);

	const gamehistory = document.createElement('button');
	// gamehistory.href = '/gameHistory';
	gamehistory.textContent = 'game history';
	gamehistory.style.fontSize = '1.2em';
	gamehistory.style.padding = '10px 20px';
	gamehistory.onclick = () => {
		frame?.removeChild(container); // Remove the container before showing game history
		console.log('Game history button clicked');
		createGameHistoryTable(frame);
		return;
	};
	container.appendChild(gamehistory);


	const addPlayerButton = document.createElement('button');
	addPlayerButton.textContent = 'test notify';
	addPlayerButton.style.fontSize = '1.2em';
	addPlayerButton.style.padding = '10px 20px';
	addPlayerButton.onclick = async () => {
		frame?.removeChild(container); // Remove the container before adding a player
		await setNotifications();
		console.log('Add player button clicked');
		return;
	};
	container.appendChild(addPlayerButton);


	frame.appendChild(container);
}

function createCenterButtons(){
	const frame = document.getElementById('content');
	if (!frame) {
		console.error('Content frame not found');
		return;
	}
	const container = document.createElement('div');
	container.style.position = 'fixed';
	container.style.top = '50%';
	container.style.left = '50%';
	container.style.transform = 'translate(-50%, -50%)';
	container.style.display = 'flex';
	container.style.gap = '20px';
	container.style.zIndex = '1000';

	

	const test = document.createElement('button');
	test.textContent = 'test game';
	test.style.fontSize = '1.2em';
	test.style.padding = '10px 20px';
	test.onclick = () => {
		frame?.removeChild(container); // Remove the container before starting the game
		nextFunction( () => testData(frame as HTMLIFrameElement) );
		console.log('Test game button clicked');
	};
	container.appendChild(test);

	const online = document.createElement('button');
	online.textContent = 'online';
	online.style.fontSize = '1.2em';
	online.style.padding = '10px 20px';
	online.onclick = () => {
		frame?.removeChild(container); // Remove the container before starting the game
		nextFunction( () => startGame('online') );
	};
	const button1 = document.createElement('button');
	button1.textContent = 'local';
	button1.style.fontSize = '1.2em';
	button1.style.padding = '10px 20px';
	button1.onclick = () => {
		frame?.removeChild(container); // Remove the container before starting the game
		nextFunction( () => startGame('local') );
	};

	const button2 = document.createElement('button');
	button2.textContent = 'ai';
	button2.style.fontSize = '1.2em';
	button2.style.padding = '10px 20px';
	button2.onclick = () => {
		frame?.removeChild(container); // Remove the container before starting the game
		nextFunction( () => startGame('ai') );
	};
	
	const input = document.createElement('input');
	input.type = 'number';
	input.placeholder = 'how many fps?';
	input.style.fontSize = '1.2em';
	input.style.padding = '10px 20px';

	input.addEventListener('input', () => {
		fps = parseInt(input.value) || 10; // Update fps based on input value, default to 10 if invalid
		// You can access the input value with input.value
		console.log('Input value:', input.value, 'FPS:', fps);
	});

	container.appendChild(online);
	container.appendChild(button1);
	container.appendChild(button2);
	container.appendChild(input);
	if (!frame) {
		console.error('Content frame not found');
		return;
	}
	frame.appendChild(container);
	// document.body.appendChild(container);
}

function nextFunction(callback: () => void): void {
	const navbar = document.getElementById('navbar');
	const content = document.getElementById('content');
	if (!navbar || !content) {
		console.error('Navbar or content element not found');
		return;
	}
	document.body?.removeChild(content);
	document.body?.removeChild(navbar);
    // document.body.removeChild(frame);
    // This function is called to execute the next step in the game loop
    if (callback) {
        callback();
    }
	document.body?.appendChild(navbar);
	document.body?.appendChild(content);
}
