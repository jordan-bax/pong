import {gamestateinterface, ballvarTemplate, player1Template, player2Template,scoreInterface, pcInterface, aiInterface, ballInterface, gameWall } from './sharedValuesPong.js';
// import { io, Socket } from 'socket.io-client';
// import { Server } from 'socket.io';
import { getLogginUserData, userInfo } from './routing.js';


var player1: pcInterface = player1Template
var player2: pcInterface = player2Template;
var ballvar: ballInterface = ballvarTemplate;
var sizeAduster: number = 1;
var pauze: boolean = true;
var fps: number = 30; // Default frames per second
var g_gametype: string = ''; // Default game type

    function gamespeed(): number {
    // Adjust the game speed based on the current FPS
    if (fps < 1) {
        fps = 1; // Ensure FPS is at least 1
    } else if (fps > 60) {
        fps = 60; // Cap FPS at 60
    }
    // ballvar.speed = ballvar.staticSpeed / fps; // Set the ball speed based on FPS
    return 1000 / fps; // Return the delay in milliseconds for the next frame
    }

    function getSize(): number {
        const width = window.innerWidth;
        const height = window.innerHeight;
        var smaller = Math.min(width, height);
        smaller -= gameWall.wallTickness2x; // Adjust for wall thickness
        smaller -= gameWall.egdeThickness * 2; // Adjust for edge thickness
        var sizeAduster = smaller / gameWall.width; // Calculate the size aduster based on the smaller dimension
        if (sizeAduster < 1) {
            sizeAduster = 1;
        }
        return sizeAduster;
    }
async function inputTempName(): Promise<string> {
    return new Promise((resolve) => {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter your nickname';

        const button = document.createElement('button');
        button.textContent = 'back';

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === 'Return') {
                const value = input.value.trim();
                if (value.length >= 4) {
                    console.log('Submitted nickname:', value);
                    input.disabled = true;
                    cleanup();
                    resolve(value);
                } else {
                    alert('Nickname must be at least 4 characters.');
                }
            }
        });

        button.onclick = () => {
            cleanup();
            resolve("");
        };

        function cleanup() {
            if (input.parentNode) input.parentNode.removeChild(input);
            if (button.parentNode) button.parentNode.removeChild(button);
        }

        document.body.appendChild(input);
        document.body.appendChild(button);
    });
}
async function getUserNameData(){
    const user = await fetch('/api/user/me/data', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!user.ok) {
        console.error('Failed to fetch user data:', user.statusText);
        return inputTempName(); // Prompt the user for a nickname if the fetch fails
    }
    const data = await user.json(); // Parse the user data
    const userData: userInfo = data.user as userInfo; // Cast to userInfo type
    if (!userData || !userData.username) {
        console.error('Invalid user data:', userData);
        return null; // Return null if the user data is not valid
    }
    return userData.username; // Return the username
    
}

export async function startGame(gametype :string) : Promise<scoreInterface> {
    const playername = await getUserNameData();
    if (!playername) {
        console.error('Failed to get player name, cannot start game');
        return { player1Score: 0, player2Score: 0, player1Name: '', player2Name: '' }; // Return empty scores if the player name is not available
    }
    console.log('Starting game with AI:', gametype);
    const gameinfo = await fetch('/api/game/start', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: gametype, playername: playername }) // your data here
    });
    g_gametype = gametype; // Store the game type for later use
    console.log('Game started with ID:',  'outher data:', gameinfo);
    if (!gameinfo.ok) {
        console.error('Failed to start game:', gameinfo.statusText);
        return { player1Score: 0, player2Score: 0, player1Name: '', player2Name: '' }; // Return empty scores if the fetch fails
    }
    const delay: number = gamespeed(); // Set the initial delay based on the game speed
    let lastFrame: HTMLDivElement | null = null;
    var background = makeBackground();
	enableKeyListener(); // Enable key listener for player controls
    console.log('Game started with AI:', gametype, 'Delay:', delay);
    while (true) {
        const state = await fetch('/api/game/state', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }); // Fetch the game state from the server
        if (!state.ok) {
            console.error('Failed to state:', state.statusText);
            console.log('Game Over! Final Score:', player1.score, '-', player2.score);
            if (lastFrame) {
                document.body.removeChild(lastFrame);
            }
            disableKeyListener(); // Disable key listener when the game ends
            leaveGame();
            return { player1Score: 0, player2Score: 0, player1Name: '', player2Name: '' }; // Return empty scores if the fetch fails
        }
        const gameState = await state.json() as gamestateinterface; // Parse the game state
        if (!gameState) {
            console.error('Failed to fetch game state' , gameState);
            console.log('Game Over! Final Score:', player1.score, '-', player2.score);
            if (lastFrame) {
                document.body.removeChild(lastFrame);
            }
            disableKeyListener(); // Disable key listener when the game ends
            leaveGame();
            return { player1Score: 0, player2Score: 0, player1Name: '', player2Name: '' }; // Return empty scores if the game state is not available
        }
        player1 = gameState.player1;
        player2 = gameState.player2;
        ballvar = gameState.ball;
        const HoleScreen = background.cloneNode(true) as HTMLDivElement;
        HoleScreen.appendChild(buildframe());
        if (lastFrame) {
            document.body.removeChild(lastFrame);
        }
        document.body.appendChild(HoleScreen);
        lastFrame = HoleScreen;
        // Wait for a second
        await new Promise(resolve => setTimeout(resolve, delay));
		if (player1.score >= 11 || player2.score >= 11 || !gameState.gameActive ) {
			// End the game if a player reaches 11 points
			console.log('Game Over! Final Score:', player1.score, '-', player2.score);
			document.body.removeChild(HoleScreen);
			disableKeyListener(); // Disable key listener when the game ends
            leaveGame();
			return { player1Score: player1.score, player2Score: player2.score,player1Name : '', player2Name: '' }; // Return the final scores
		}
    }
    // console.log('Game Over! Final Score:', player1.score, '-', player2.score);
    // if (lastFrame) {
    //     document.body.removeChild(lastFrame);
    // }
    // disableKeyListener(); // Disable key listener when the game ends
    // leaveGame();
    
    // return { player1Score: player1.score, player2Score: player2.score,player1Name : '', player2Name: '' }; // Return the final scores
}

function WaitForASecond() {
    // Wait for a second
    return new Promise(resolve => setTimeout(resolve, 1000));
}




function buildframe():HTMLDivElement{
    sizeAduster = getSize();
    var frame = document.createElement('div');
    frame = GetGameWalls(sizeAduster);
    addMiddleStripes(frame);
    addScoreBocks1(frame);
    addScoreBocks2(frame);
    addpc1(frame);
    addpc2(frame);
    addBall(frame);
    
    return frame;
}
function addpc1(frame: HTMLDivElement): HTMLDivElement {
    // playerMoveCheck(player1);
    const pc1 = document.createElement('div');
    pc1.style.position = 'absolute';
    pc1.style.width = `${player1.width * sizeAduster}px`;
    pc1.style.height = `${player1.height * sizeAduster}px`;
    pc1.style.top = `${player1.y * sizeAduster}px`; // Distance from the top of the page
    pc1.style.left = `${player1.x * sizeAduster}px`; // Distance from the left of the page
    pc1.style.backgroundColor = 'white'; // Set the background color to white
    // pc1.style.transform = 'translateY(-50%)'; // Center vertically
    frame.appendChild(pc1);
    return frame;
}
function addpc2(frame: HTMLDivElement): HTMLDivElement {
    // playerMoveCheck(player2);
    const pc2 = document.createElement('div');
    pc2.style.position = 'absolute';
    pc2.style.width = `${player2.width * sizeAduster}px`;
    pc2.style.height = `${player2.height * sizeAduster}px`;
    pc2.style.top = `${player2.y * sizeAduster}px`; // Distance from the top of the page
    pc2.style.left = `${(player2.x) * sizeAduster}px`; // Distance from the right of the page
    pc2.style.backgroundColor = 'white'; // Set the background color to white
    // pc2.style.transform = 'translateY(-50%)'; // Center vertically
    frame.appendChild(pc2);
    return frame;
}
function addBall(frame: HTMLDivElement): HTMLDivElement {
    const ball = document.createElement('div');
    ball.style.position = 'absolute';
    ball.style.width = `${ballvar.width * sizeAduster}px`;
    ball.style.height = `${ballvar.height * sizeAduster}px`;
    ball.style.backgroundColor = 'white'; // Set the background color to white
    ball.style.borderRadius = '50%'; // Make it a circle
    ball.style.left = `${ballvar.x * sizeAduster}px`; // Distance from the left of the page
    ball.style.top = `${ballvar.y * sizeAduster}px`; // Distance from the top of the page
    // ball.style.transform = 'translate(-50%, -50%)'; // Center the ball
    frame.appendChild(ball);
    return frame;
}
function addScoreBocks1(frame: HTMLDivElement): HTMLDivElement {
    const scoreBocks1 = document.createElement('div');
    scoreBocks1.style.position = 'absolute';
    scoreBocks1.style.width = `15%`;
    scoreBocks1.style.height = `15%`;
    scoreBocks1.style.backgroundColor = 'transpirant'; // Set the background color to white
    scoreBocks1.style.left = '17.5%'; // Distance from the left of the page
    scoreBocks1.style.top = '1%'; // Distance from the top of the page
    // scoreBocks1.style.transform = 'translate(-50%, -50%)'; // Center the ball
    scoreBocks1.style.fontSize = `${20 * sizeAduster}px`; // Set the font size
    scoreBocks1.style.color = 'blue'; // Set the font color
    scoreBocks1.style.textAlign = 'center'; // Center the text
    scoreBocks1.style.lineHeight = `100%`; // Center the text vertically
    scoreBocks1.style.alignItems = 'center'; // Center vertically
    scoreBocks1.style.display = 'flex'; // Use flexbox for centering
    scoreBocks1.style.justifyContent = 'center'; // Center horizontally

    scoreBocks1.innerHTML = `${player1.score}`; // Set the initial score
    frame.appendChild(scoreBocks1);
    return frame;
}
function addScoreBocks2(frame: HTMLDivElement): HTMLDivElement {
    const scoreBocks2 = document.createElement('div');
    scoreBocks2.style.position = 'absolute';
    scoreBocks2.style.width = `15%`;
    scoreBocks2.style.height = `15%`;
    scoreBocks2.style.backgroundColor = 'transpirant'; // Set the background color to white
    scoreBocks2.style.left = '67.5%'; // Distance from the right of the page
    scoreBocks2.style.top = '1%'; // Distance from the top of the page
    scoreBocks2.style.fontSize = `${20 * sizeAduster}px`; // Set the font size
    scoreBocks2.style.color = 'blue'; // Set the font color
    scoreBocks2.style.textAlign = 'center'; // Center the text horizontally
    scoreBocks2.style.lineHeight = `100%`; // Match the height of the block
    scoreBocks2.style.display = 'flex'; // Use flexbox for centering
    scoreBocks2.style.alignItems = 'center'; // Center vertically
    scoreBocks2.style.justifyContent = 'center'; // Center horizontally
    scoreBocks2.innerHTML = `${player2.score}`; // Set the initial score
    frame.appendChild(scoreBocks2);
    return frame;
}
function GetGameWalls(sizeAduster :number): HTMLDivElement {
    const gameWalls = document.createElement('div');
    gameWalls.style.position = 'relative'; // Use relative positioning
    gameWalls.style.width = `${gameWall.width * sizeAduster}px`;
    gameWalls.style.height = `${gameWall.height * sizeAduster}px`;
    gameWalls.style.backgroundColor = 'transparent'; // Set the background color to transparent
    gameWalls.style.border = `${gameWall.wallThickness}px solid white`; // Set the border color
    gameWalls.style.left = `${(window.innerWidth - (gameWall.width * sizeAduster + gameWall.wallTickness2x))/2}px`; // Distance from the left of the page
    gameWalls.style.top = '15px'; // Distance from the top of the page
    
    return gameWalls;
}
function addMiddleStripes(gameWalls: HTMLDivElement): HTMLElement {
    const stripeWidth = 1.5; // Width of each stripe
    const stripeHeight = 4; // Height of each stripe
    const stripeSpacing = 1; // Spacing between stripes

    for (let i = 0; i < 100; i += stripeHeight + stripeSpacing) {
        const stripe = document.createElement('div');
        stripe.style.width = `${stripeWidth}%`;
        stripe.style.height = `${stripeHeight}%`;
        stripe.style.backgroundColor = 'white';
        stripe.style.opacity = '0.5'; // Set opacity to 50%
        stripe.style.position = 'absolute';
        stripe.style.left = '50%';
        stripe.style.transform = 'translateX(-50%)'; // Center the stripe horizontally
        stripe.style.top = `${i + stripeSpacing}%`; // Position each stripe

        gameWalls.appendChild(stripe);
    }
    return gameWalls;
}

// Attention: This function is not scaled to other shapes than a square

    function makeBackground(): HTMLDivElement{
    // Create a div element to cover the entire screen
        const backgroundColor = document.createElement('div');
        backgroundColor.style.width = '100%';
        backgroundColor.style.height = '100%';
        backgroundColor.style.backgroundColor = 'black'; // Set the background color to black
        backgroundColor.style.position = 'absolute'; // Use absolute positioning
        backgroundColor.style.top = '0px'; // Distance from the top of the page
        backgroundColor.style.left = '0px'; // Distance from the left of the page
        return backgroundColor;
    }


async function enableKeyListener() {
    document.addEventListener('keydown', keyHandler);
    window.addEventListener('beforeunload', leaveGame);
    window.addEventListener('popstate', popstateHandler);
    // test visability changer of the key listener
//    window.addEventListener('')
    console.log('Key listener enabled and popstate handler added.');
}

function disableKeyListener() {
    document.removeEventListener('keydown', keyHandler);
    window.removeEventListener('beforeunload', leaveGame);

}
async function popstateHandler(event: PopStateEvent) {
    // Handle the popstate event here
    console.log('Popstate event triggered:', event);
     // The popstate event is fired each time when the current history entry changes.
    event.preventDefault(); // Prevent the default behavior of the popstate event
    // event.
    await leaveGame(); // Call leaveGame to handle the game state
    // window.removeEventListener('popstate', popstateHandler);
    // history.back(); // Go back to the previous page in the history stack
    // var r = confirm("You pressed a Back button! Are you sure?!");

    // if (r == true) {
    //     // Call Back button programmatically as per user confirmation.
    //     leaveGame();
    //     history.back();

    //     // Uncomment below line to redirect to the previous page instead.
    //     // window.location = document.referrer // Note: IE11 is not supporting this.
    // } else {
    //     // Stay on the current page.
    //     history.pushState(null, "", window.location.pathname);
    // }

    // history.pushState(null,"", window.location.pathname);

}
// This runs when the user reloads or leaves the page
// You can send a message to the server here if needed
// Example: notify backend the player left
async function leaveGame() {
    // await fetch('/api/game/state?gameid='+gameID );
    // await fetch('/api/game/leave?gameid='+gameID, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ gameid: gameID })}); // Send the game ID in the request body;
    console.log('Leaving game with ID:');
    // navigator.sendBeacon('/api/game/leave?gameid='+gameID, JSON.stringify({ gameid: "bob" }));
    await fetch('/api/game/leave', {
        method: 'POST',
        credentials: 'include', // Include credentials for session management
        keepalive: true, // Ensure the request is sent even if the page is unloading
    });
    // navigator.sendBeacon('/api/game/leave');
}

async function sendMove(direction: 'up' | 'down', player: 1 | 2) {
    if (g_gametype === 'local') {
        await fetch('/api/game/move?player='+player, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ direction }) // Send the direction in the request body
        });
        return;
    }
    await fetch('/api/game/move' ,{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ direction}) // Send the direction and player in the request body
    });
}
async function keyHandler(event: KeyboardEvent) {
    if (!event.key) return; // Ignore if no key is pressed
    switch (event.key) {
        case 'p':
            await fetch('/api/game/pause', {
                method: 'POST',
                credentials: 'include', // Include credentials for session management
                }); // Pause the game
            break;
        case 'w':
            sendMove('up', 1); // Move player 1 up
            break;
        case 's':
            sendMove('down', 1); // Move player 1 down
            break;
        case 'ArrowUp':
            sendMove('up', 2); // Move player 2 up
            break;
        case 'ArrowDown':
            sendMove('down', 2); // Move player 2 down
            break;
    }
}
    // document.addEventListener('keydown', (event) => {
    //     switch (event.key) {
    //         case 'p':
    //             pauze = !pauze; // Toggle the pause state
    //             break;
    //         case 'w':
    //             player1.y = player1.y - player1.speed;
    //             break;
    //         case 's':
    //             player1.y = player1.y + player1.speed;
    //             break;
    //         case 'ArrowUp':
    //             player2.y = player2.y - player2.speed;
    //             break;
    //         case 'ArrowDown':
    //             player2.y = player2.y + player2.speed;
    //             break;
    //     }
    // });

 