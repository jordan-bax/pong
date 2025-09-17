import { quickjoin } from './renderPong.js';
import { joinGame } from './joingame.js';
import { createGameHistoryTable } from './gameHistoryTable.js';
import { getLanguage } from './index.js';
import { getContent } from './settings.js';
var fps: number = 10; // Default frames per second

export async function pongbutton(): Promise<void> {
    await createCenterButtons();
}

async function testData(frame: HTMLIFrameElement): Promise<void> {
    const language = await getLanguage();
    const textMapData = await getContent(language.toLowerCase(), ['backButtonText', 'gameHistoryButtonText', 'testNotificationButtonText']);
    const text = textMapData.get('row') as { backButtonText: string; gameHistoryButtonText: string, testNotificationButtonText: string }
    console.log('test function called');
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.display = 'flex';

    const backbutton = document.createElement('button');
    backbutton.textContent = text.backButtonText;
    backbutton.style.fontSize = '1.2em';
    backbutton.style.padding = '10px 20px';
    backbutton.onclick = () => {
        frame?.removeChild(container);
        return
    };
    container.appendChild(backbutton);

    const gamehistory = document.createElement('button');
    gamehistory.textContent = text.gameHistoryButtonText;
    gamehistory.style.fontSize = '1.2em';
    gamehistory.style.padding = '10px 20px';
    gamehistory.onclick = async () => {
        frame?.removeChild(container);
        console.log('Game history button clicked');
        await createGameHistoryTable(frame);
        return;
    };
    container.appendChild(gamehistory);


    const addPlayerButton = document.createElement('button');
    addPlayerButton.textContent = text.testNotificationButtonText;
    addPlayerButton.style.fontSize = '1.2em';
    addPlayerButton.style.padding = '10px 20px';
    addPlayerButton.onclick = async () => {
        frame?.removeChild(container);
        console.log('Add player button clicked');
        return;
    };
    container.appendChild(addPlayerButton);


    frame.appendChild(container);
}

interface gameText {
    gameButtonTestText: string;
    gameButtonQuickJoinText: string;
    gameButtonJoinText: string;
    gameButtonLocalText: string;
    gameButtonAIText: string;
}

async function createCenterButtons() {
    const language = await getLanguage();
    const textArray = [
        'gameButtonTestText',
        'gameButtonQuickJoinText',
        'gameButtonJoinText',
        'gameButtonLocalText',
        'gameButtonAIText'
    ]
    const textMapData = await getContent(language.toLowerCase(), textArray);
    const text = textMapData.get('row') as gameText;
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
    test.textContent = text.gameButtonTestText;
    test.style.fontSize = '1.2em';
    test.style.padding = '10px 20px';
    test.onclick = () => {
        frame?.removeChild(container);
        nextFunction(async () => await testData(frame as HTMLIFrameElement));
        console.log('Test game button clicked');
    };
    container.appendChild(test);

    const online = document.createElement('button');
    online.textContent = text.gameButtonQuickJoinText;
    online.style.fontSize = '1.2em';
    online.style.padding = '10px 20px';
    online.onclick = () => {
        frame?.removeChild(container);
        nextFunction(async () => await quickjoin('online'));
    };

    const joingame = document.createElement('button');
    joingame.textContent = text.gameButtonJoinText;
    joingame.style.fontSize = '1.2em';
    joingame.style.padding = '10px 20px';
    joingame.onclick = async () => {
        frame?.removeChild(container);
        await joinGame('joingame');
    };

    const button1 = document.createElement('button');
    button1.textContent = text.gameButtonLocalText;
    button1.style.fontSize = '1.2em';
    button1.style.padding = '10px 20px';
    button1.onclick = () => {
        frame?.removeChild(container);
        nextFunction(async () => await quickjoin('local'));
    };

    const button2 = document.createElement('button');
    button2.textContent = text.gameButtonAIText;
    button2.style.fontSize = '1.2em';
    button2.style.padding = '10px 20px';
    button2.onclick = () => {
        frame?.removeChild(container);
        nextFunction(async () => await quickjoin('ai'));
    };

    container.appendChild(online);
    container.appendChild(joingame);
    container.appendChild(button1);
    container.appendChild(button2);
    if (!frame) {
        console.error('Content frame not found');
        return;
    }

    frame.appendChild(container);
}

export function nextFunction(callback: () => void): void {
    const navbar = document.getElementById('navbar');
    const content = document.getElementById('content');
    if (!navbar || !content) {
        console.error('Navbar or content element not found');
        return;
    }
    document.body?.removeChild(content);
    document.body?.removeChild(navbar);
    if (callback) {
        callback();
    }
    document.body?.appendChild(navbar);
    document.body?.appendChild(content);
}
