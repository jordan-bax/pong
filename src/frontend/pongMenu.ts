import {startGame} from './renderPong.js';
// import {  } from './sharedValuesPong.js';
var fps: number = 10; // Default frames per second

export async function pongbutton(): Promise<void> {
	createCenterButtons();
	// const button = document.createElement('button');
	// button.id = 'pongButton';
	// button.textContent = 'Play Pong';
	// button.style.position = 'absolute';
	// button.style.top = '50%';
	// button.style.left = '50%';
	// button.style.transform = 'translate(-50%, -50%)';
	// button.style.zIndex = '1000'; // Ensure the button is on top of other elements
	

	// button.addEventListener('click', async () => {
	// 	button.remove(); // Remove the button after clicking
	// 	await test();
	// 	console.log('Pong button clicked');
	// 	// window.location.href = '/game/pong';
	// });
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

	// const host = document.createElement('button');
	// host.textContent = 'host game';
	// host.style.fontSize = '1.2em';
	// host.style.padding = '10px 20px';
	// host.onclick = () => nextFunction( () => hostGame() , container);

	// const join = document.createElement('button');
	// join.textContent = 'join game';
	// join.style.fontSize = '1.2em';
	// join.style.padding = '10px 20px';
	// join.onclick = () => nextFunction( () => joinGame() , container);

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
