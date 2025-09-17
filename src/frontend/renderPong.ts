import { gamestateinterface, ballvarTemplate, player1Template, player2Template, scoreInterface, pcInterface, ballInterface, gameWall } from './sharedValuesPong.js';
import { checkSession } from './routing.js';
import { getLanguage } from './index.js';
import { getContent } from './settings.js';


let player1: pcInterface = player1Template
let player2: pcInterface = player2Template;
let ballvar: ballInterface = ballvarTemplate;
let sizeAduster: number = 1;
let fps: number = 30;
let g_gametype: string = '';

function gamespeed(): number {
    if (fps < 1) {
        fps = 1;
    } else if (fps > 60) {
        fps = 60;
    }

    return 1000 / fps;
}

function getSize(): number {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let smaller = Math.min(width, height);
    smaller -= gameWall.wallTickness2x;
    smaller -= gameWall.egdeThickness * 2;
    let sizeAduster = smaller / gameWall.width;
    if (sizeAduster < 1) {
        sizeAduster = 1;
    }

    return sizeAduster;
}
async function inputTempName(): Promise<string> {
    return new Promise(async (resolve) => {
        const language = await getLanguage();
        const textMapData = await getContent(language.toLowerCase(), ['backButtonText']);
        const text = textMapData.get('row') as { backButtonText: string };
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter your nickname';

        const button = document.createElement('button');
        button.textContent = text.backButtonText;

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

export async function quickjoin(gametype: string): Promise<void> {
    console.log('Starting game with AI:', gametype);
    const gameinfo = await fetch('/api/game/start', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: gametype })
    });
    g_gametype = gametype;
    console.log('Game started with ID:', 'outher data:', gameinfo);
    if (!gameinfo.ok) {
        console.error('Failed to start game:', gameinfo.statusText);
        return;
    }
    console.log('Game successfully started, launching game interface...');
    await startGame(gametype);
}

export async function startGame(gametype: string): Promise<scoreInterface> {
    console.log('Starting game with type:', gametype);
    const delay: number = gamespeed();
    let lastFrame: HTMLDivElement | null = null;
    let background = makeBackground();
    await enableKeyListener();
    console.log('Game started with AI:', gametype, 'Delay:', delay);
    while (true) {
        const state = await fetch('/api/game/state', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!state.ok) {
            console.error('Failed to state:', state.statusText);
            console.log('Game Over! Final Score:', player1.score, '-', player2.score);
            if (lastFrame) {
                document.body.removeChild(lastFrame);
            }

            disableKeyListener();
            await leaveGame();
            return { player1Score: 0, player2Score: 0, player1Name: '', player2Name: '' };
        }
        const gameState = await state.json() as gamestateinterface;
        if (!gameState) {
            console.error('Failed to fetch game state', gameState);
            console.log('Game Over! Final Score:', player1.score, '-', player2.score);
            if (lastFrame) {
                document.body.removeChild(lastFrame);
            }

            disableKeyListener();
            await leaveGame();
            return { player1Score: 0, player2Score: 0, player1Name: '', player2Name: '' };
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

        await new Promise(resolve => setTimeout(resolve, delay));
        if (player1.score >= 11 || player2.score >= 11 || !gameState.gameActive) {
            console.log('Game Over! Final Score:', player1.score, '-', player2.score);
            document.body.removeChild(HoleScreen);
            disableKeyListener();
            await leaveGame();
            return { player1Score: player1.score, player2Score: player2.score, player1Name: '', player2Name: '' };
        }
    }
}

function buildframe(): HTMLDivElement {
    sizeAduster = getSize();
    let frame = document.createElement('div');
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
    const pc1 = document.createElement('div');
    pc1.style.position = 'absolute';
    pc1.style.width = `${player1.width * sizeAduster}px`;
    pc1.style.height = `${player1.height * sizeAduster}px`;
    pc1.style.top = `${player1.y * sizeAduster}px`;
    pc1.style.left = `${player1.x * sizeAduster}px`;
    pc1.style.backgroundColor = 'white';
    frame.appendChild(pc1);
    return frame;
}

function addpc2(frame: HTMLDivElement): HTMLDivElement {
    const pc2 = document.createElement('div');
    pc2.style.position = 'absolute';
    pc2.style.width = `${player2.width * sizeAduster}px`;
    pc2.style.height = `${player2.height * sizeAduster}px`;
    pc2.style.top = `${player2.y * sizeAduster}px`;
    pc2.style.left = `${(player2.x) * sizeAduster}px`;
    pc2.style.backgroundColor = 'white';
    frame.appendChild(pc2);
    return frame;
}

function addBall(frame: HTMLDivElement): HTMLDivElement {
    const ball = document.createElement('div');
    ball.style.position = 'absolute';
    ball.style.width = `${ballvar.width * sizeAduster}px`;
    ball.style.height = `${ballvar.height * sizeAduster}px`;
    ball.style.backgroundColor = 'white';
    ball.style.borderRadius = '50%';
    ball.style.left = `${ballvar.x * sizeAduster}px`;
    ball.style.top = `${ballvar.y * sizeAduster}px`;
    frame.appendChild(ball);
    return frame;
}

function addScoreBocks1(frame: HTMLDivElement): HTMLDivElement {
    const scoreBocks1 = document.createElement('div');
    scoreBocks1.style.position = 'absolute';
    scoreBocks1.style.width = `15%`;
    scoreBocks1.style.height = `15%`;
    scoreBocks1.style.backgroundColor = 'transpirant';
    scoreBocks1.style.left = '17.5%';
    scoreBocks1.style.top = '1%';
    scoreBocks1.style.fontSize = `${20 * sizeAduster}px`;
    scoreBocks1.style.color = 'blue';
    scoreBocks1.style.textAlign = 'center';
    scoreBocks1.style.lineHeight = `100%`;
    scoreBocks1.style.alignItems = 'center';
    scoreBocks1.style.display = 'flex';
    scoreBocks1.style.justifyContent = 'center';

    scoreBocks1.innerHTML = `${player1.score}`;
    frame.appendChild(scoreBocks1);
    return frame;
}

function addScoreBocks2(frame: HTMLDivElement): HTMLDivElement {
    const scoreBocks2 = document.createElement('div');
    scoreBocks2.style.position = 'absolute';
    scoreBocks2.style.width = `15%`;
    scoreBocks2.style.height = `15%`;
    scoreBocks2.style.backgroundColor = 'transpirant';
    scoreBocks2.style.left = '67.5%';
    scoreBocks2.style.top = '1%';
    scoreBocks2.style.fontSize = `${20 * sizeAduster}px`;
    scoreBocks2.style.color = 'blue';
    scoreBocks2.style.textAlign = 'center';
    scoreBocks2.style.lineHeight = `100%`;
    scoreBocks2.style.display = 'flex';
    scoreBocks2.style.alignItems = 'center';
    scoreBocks2.style.justifyContent = 'center';
    scoreBocks2.innerHTML = `${player2.score}`;
    frame.appendChild(scoreBocks2);
    return frame;
}

function GetGameWalls(sizeAduster: number): HTMLDivElement {
    const gameWalls = document.createElement('div');
    gameWalls.style.position = 'relative';
    gameWalls.style.width = `${gameWall.width * sizeAduster}px`;
    gameWalls.style.height = `${gameWall.height * sizeAduster}px`;
    gameWalls.style.backgroundColor = 'transparent';
    gameWalls.style.border = `${gameWall.wallThickness}px solid white`;
    gameWalls.style.left = `${(window.innerWidth - (gameWall.width * sizeAduster + gameWall.wallTickness2x)) / 2}px`;
    gameWalls.style.top = '15px';

    return gameWalls;
}

function addMiddleStripes(gameWalls: HTMLDivElement): HTMLElement {
    const stripeWidth = 1.5;
    const stripeHeight = 4;
    const stripeSpacing = 1;

    for (let i = 0; i < 100; i += stripeHeight + stripeSpacing) {
        const stripe = document.createElement('div');
        stripe.style.width = `${stripeWidth}%`;
        stripe.style.height = `${stripeHeight}%`;
        stripe.style.backgroundColor = 'white';
        stripe.style.opacity = '0.5';
        stripe.style.position = 'absolute';
        stripe.style.left = '50%';
        stripe.style.transform = 'translateX(-50%)';
        stripe.style.top = `${i + stripeSpacing}%`;

        gameWalls.appendChild(stripe);
    }
    return gameWalls;
}

function makeBackground(): HTMLDivElement {
    const backgroundColor = document.createElement('div');
    backgroundColor.style.width = '100%';
    backgroundColor.style.height = '100%';
    backgroundColor.style.backgroundColor = 'black';
    backgroundColor.style.position = 'absolute';
    backgroundColor.style.top = '0px';
    backgroundColor.style.left = '0px';
    return backgroundColor;
}


async function enableKeyListener() {
    document.addEventListener('keydown', keyHandler);
    window.addEventListener('beforeunload', leaveGame);
    window.addEventListener('popstate', popstateHandler);
    console.log('Key listener enabled and popstate handler added.');
}

function disableKeyListener() {
    document.removeEventListener('keydown', keyHandler);
    window.removeEventListener('beforeunload', leaveGame);

}
async function popstateHandler(event: PopStateEvent) {
    console.log('Popstate event triggered:', event);
    event.preventDefault();
    await leaveGame();
}

async function leaveGame() {
    console.log('Leaving game with ID:');
    await fetch('/api/game/leave', {
        method: 'POST',
        credentials: 'include',
        keepalive: true,
    });

    await checkSession();
}

async function sendMove(direction: 'up' | 'down', player: 1 | 2) {
    if (g_gametype === 'local') {
        await fetch('/api/game/move?player=' + player, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ direction })
        });
        return;
    }

    await fetch('/api/game/move', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ direction })
    });
}
async function keyHandler(event: KeyboardEvent) {
    if (!event.key) {
        return;
    }

    switch (event.key) {
        case 'p':
            await fetch('/api/game/pause', {
                method: 'POST',
                credentials: 'include',
            });
            break;
        case 'w':
            await sendMove('up', 1);
            break;
        case 's':
            await sendMove('down', 1);
            break;
        case 'ArrowUp':
            await sendMove('up', 2);
            break;
        case 'ArrowDown':
            await sendMove('down', 2);
            break;
    }
}
