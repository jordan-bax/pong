import { quickjoin } from './renderPong.js';
import { joinGame } from './joingame.js';
import { getLanguage } from './index.js';
import { getContent } from './settings.js';

export async function pongbutton(): Promise<void> {
    await createCenterButtons();
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
