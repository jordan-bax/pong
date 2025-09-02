import { getIdFromMe } from './routing.js'

export async function renderTournament() {
    const userID: number | null = await getIdFromMe()
    if (userID == null) {
        console.log("moet ingeloged zijn om dit te doen")
        return
    }

    console.log("userID: ", userID);
    const content = document.getElementById("content") as HTMLDivElement;
    if (!content) {
        console.error("Content element not found");
        return;
    }
    content.innerHTML = ''

    const div = createDiv();
    createButton(
        div,
        "create Tournament",
        async () => { await createTournament(content, userID) },
        "ct")
    createButton(
        div,
        "Tournament",
        // async () => { await createTournamentTables(content, userID) },
        async () => { await createTournamentTables(content, userID) },
        "jt")

    content.appendChild(div)
}

async function createTournament(content: HTMLDivElement, userID: number) {
    content.innerHTML = '';
    const div = createDiv();

    const form = document.createElement('form');
    async function createFormField(id: string, labelText: string) {
        const label = document.createElement('label');
        label.htmlFor = id;
        label.textContent = labelText;

        const input = document.createElement('input');
        input.type = "text";
        input.id = id;
        input.name = id;

        const br = document.createElement('br');

        return [label, br, input, br.cloneNode(), br.cloneNode()];
    }

    const nameField = await createFormField('tname', 'Tournament Name:');
    const playersField = await createFormField('tplayers', 'How many players:');
    const lockField = await createFormField('tlock', 'Duration before locking:');

    nameField.forEach(field => form.appendChild(field));
    playersField.forEach(field => form.appendChild(field));
    lockField.forEach(field => form.appendChild(field));

    const submitButton = document.createElement('button');
    submitButton.type = "submit";
    submitButton.textContent = "Submit";
    form.appendChild(document.createElement('br'));
    form.appendChild(submitButton);

    div.onsubmit = async function(e) {
        e.preventDefault();
        console.log('Form submitted!');
        console.log((document.getElementById('tname') as HTMLInputElement).value)
        try {
            const resp = await fetch('/api/tournament/create', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name': (document.getElementById('tname') as HTMLInputElement).value,
                    'maxPlayers': (document.getElementById('tplayers') as HTMLInputElement).value,
                    'lockTime': (document.getElementById('tlock') as HTMLInputElement).value,
                    'userID': userID
                })
            })

            const result = resp.status
            if (result !== 201) {
                console.log("error it", result)
            }
        } catch (error) {
            console.log("error it except", error)
        }
    };

    div.appendChild(form);
    content.appendChild(div);
}

// async function tournament(content: HTMLDivElement, userID: number) {
//     content.innerHTML = '';
//     const div = createDiv();
//     const br = document.createElement('br')
//
//     const tours_tb: any = await tours(userID)
//     if (tours_tb === null) {
//         return;
//     }
//
//     div.appendChild(tours_tb)
//
//     content.appendChild(div)
// }

function createButton(
    div: HTMLElement,
    name: string,
    callback: Function,
    id: string) {
    const button = document.createElement('button');
    button.textContent = `${name}`;
    button.style.fontSize = '1.2em';
    button.style.padding = '10px 20px';
    button.id = id;
    button.onclick = (e) => {
        e.preventDefault();
        callback();
        history.pushState({}, '', '/tournament');
    };

    div.appendChild(button);
}

function createDiv() {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.transform = 'translate(-50%, -50%)';
    div.style.display = 'flex';

    return div
}

interface Tournament {
    id: number;
    name: string;
    rounds: number;
    isRunning: boolean;
    isFinished: boolean;
    lockTime: number;
    playerCount: number;
    maxPlayers: number;
    players: number[];
    winner: number;
}

interface ToursDict {
    finished: Tournament[];
    running: Tournament[];
    joinable: Tournament[];
}

async function createTournamentTables(content: HTMLDivElement, userId: number) {
    let toursDict: ToursDict = {
        finished: [],
        running: [],
        joinable: []
    };

    const resp = await fetch('api/tournament/tours')
    if (resp.status != 200) {
        console.log("error", resp)
        return
    }

    const data: Array<any> = await resp.json()

    if (data.length === 0) {
        console.log('geen data')
        return
    }

    for (let tournament of data) {
        if (tournament.isFinished) {
            toursDict.finished.push(tournament);
        } else if (tournament.isRunning) {
            toursDict.running.push(tournament);
        } else {
            toursDict.joinable.push(tournament);
        }
    }

    const div = document.createElement('div');
    div.className = 'tables-container';

    const tableTypes: { key: keyof ToursDict, title: string, icon: string }[] = [
        { key: 'finished', title: 'Finished Tournaments', icon: '🏆' },
        { key: 'running', title: 'Running Tournaments', icon: '⚡' },
        { key: 'joinable', title: 'Joinable Tournaments', icon: '✅' }
    ];

    for (let type of tableTypes) {
        if (toursDict[type.key].length === 0) continue;

        const section = document.createElement('div');
        section.className = 'table-section';

        const title = document.createElement('div');
        title.className = `table-title ${type.key}`;
        title.innerHTML = `<span class="icon">${type.icon}</span> ${type.title}`;
        section.appendChild(title);

        const table = document.createElement('table');
        table.appendChild(createHeader(type.key));

        for (let tournament of toursDict[type.key]) {
            const isInTour = tournament.players.includes(userId);
            table.appendChild(createRow(tournament, isInTour, userId, type.key));
        }

        section.appendChild(table);
        div.appendChild(section);
    }

    content.appendChild(div)
}

function createHeader(type: keyof ToursDict): HTMLTableRowElement {
    const tr = document.createElement('tr');

    const headers: Record<keyof ToursDict, string[]> = {
        finished: ['Status', 'ID', 'Name', 'Players', 'Rounds', 'Start Time', 'Winner'],
        running: ['Status', 'ID', 'Name', 'Players', 'Rounds', 'Start Time'],
        joinable: ['Status', 'ID', 'Name', 'Players', 'Rounds', 'Lock Time', 'Actions']
    };

    for (let headerText of headers[type]) {
        const th = document.createElement('th');
        th.textContent = headerText;
        tr.appendChild(th);
    }

    return tr;
}

function createRow(tournament: Tournament,
    isInTour: boolean,
    userId: number,
    type: keyof ToursDict): HTMLTableRowElement {
    const tr = document.createElement('tr');

    const statusTd = document.createElement('td');
    const statusBadge = document.createElement('span');
    statusBadge.className = `status-badge status-${type}`;
    statusBadge.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    statusTd.appendChild(statusBadge);
    tr.appendChild(statusTd);

    const idTd = document.createElement('td');
    idTd.textContent = tournament.id.toString();
    tr.appendChild(idTd);

    const nameTd = document.createElement('td');
    nameTd.textContent = tournament.name;
    tr.appendChild(nameTd);

    const playersTd = document.createElement('td');
    playersTd.textContent = `${tournament.playerCount}/${tournament.maxPlayers}`;
    tr.appendChild(playersTd);

    const roundsTd = document.createElement('td');
    if (type == 'running') {
        roundsTd.textContent = `1/${tournament.rounds.toString()}`;
    } else {
        roundsTd.textContent = tournament.rounds.toString();
    }
    tr.appendChild(roundsTd);

    const lockTimeTd = document.createElement('td');
    lockTimeTd.textContent = formatDateTime(tournament.lockTime);
    tr.appendChild(lockTimeTd);

    if (type === 'finished') {
        const winnerTd = document.createElement('td');
        winnerTd.textContent = tournament.winner ? `Player ${tournament.winner}` : 'N/A';
        tr.appendChild(winnerTd);
    }

    const actionsTd = document.createElement('td');
    const button = document.createElement('button');
    button.className = 'action-btn';

    if (type === 'finished') {
        button.textContent = 'View Results';
        button.classList.add('view-btn');
        button.addEventListener('click', () => {
            alert(`Viewing results of tournament: ${tournament.name}`);
        });
    } else if (isInTour) {
        button.textContent = 'Leave';
        button.classList.add('leave-btn');
        button.addEventListener('click', async () => {
            await leaveTour(tournament.id, userId);
        });
    } else {
        button.textContent = 'Join';
        button.classList.add('join-btn');
        button.addEventListener('click', async () => {
            await joinTour(tournament.id, userId);
        });
    }

    if (type === 'joinable') {
        actionsTd.appendChild(button);
        tr.appendChild(actionsTd);
    }

    return tr;
}

function formatDateTime(timestamp: number): string {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

async function joinTour(tourID: number, userID: number) {
    try {
        const resp = await fetch('/api/tournament/join', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'tournamentID': tourID,
                'userID': userID
            })
        })

        const result = resp.status
        if (result !== 201) {
            console.log("error it", result)
        }
    } catch (error) {
        console.log("error it except", error)
    }
}

async function leaveTour(tourID: number, userID: number) {
    try {
        const resp = await fetch('/api/tournament/leave', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'tournamentID': tourID,
                'userID': userID
            })
        })

        const result = resp.status
        if (result !== 201) {
            console.log("error it", result)
        }
    } catch (error) {
        console.log("error it except", error)
    }
}
