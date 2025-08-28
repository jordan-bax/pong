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
        async () => { await tournament(content, userID) },
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

async function tournament(content: HTMLDivElement, userID: number) {
    content.innerHTML = '';
    const div = createDiv();
    const br = document.createElement('br')

    const tours_tb: any = await tours(userID)
    if (tours_tb === null) {
        return;
    }

    div.appendChild(tours_tb)

    content.appendChild(div)
}

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

// interface Tournament {
//     id: number;
//     name: string;
//     rounds: number;
//     isRunning: boolean;
//     isFinished: boolean;
//     lockTime: number;
//     playerCount: number;
//     maxPlayers: number;
//     players: number[];
//     winner: number;
// }
//
// interface ToursDict {
//     finished: Tournament[];
//     running: Tournament[];
//     joinable: Tournament[];
// }
//
// function createTournamentTables(data: Tournament[], userId: number): HTMLDivElement {
//     let toursDict: ToursDict = {
//         finished: [],
//         running: [],
//         joinable: []
//     };
//
//     for (let tournament of data) {
//         if (tournament.isFinished) {
//             toursDict.finished.push(tournament);
//         } else if (tournament.isRunning) {
//             toursDict.running.push(tournament);
//         } else {
//             toursDict.joinable.push(tournament);
//         }
//     }
//
//     const div = document.createElement('div');
//     div.className = 'tables-container';
//
//     // Define table order and properties
//     const tableTypes: { key: keyof ToursDict, title: string, icon: string }[] = [
//         { key: 'finished', title: 'Finished Tournaments', icon: '🏆' },
//         { key: 'running', title: 'Running Tournaments', icon: '⚡' },
//         { key: 'joinable', title: 'Joinable Tournaments', icon: '✅' }
//     ];
//
//     // Create tables in the specified order
//     for (let type of tableTypes) {
//         if (toursDict[type.key].length === 0) continue;
//
//         const section = document.createElement('div');
//         section.className = 'table-section';
//
//         // Create table title
//         const title = document.createElement('div');
//         title.className = `table-title ${type.key}`;
//         title.innerHTML = `<span class="icon">${type.icon}</span> ${type.title}`;
//         section.appendChild(title);
//
//         // Create table
//         const table = document.createElement('table');
//
//         // Create headers based on tournament type
//         table.appendChild(createHeader(type.key));
//
//         // Add rows for each tournament
//         for (let tournament of toursDict[type.key]) {
//             const isInTour = tournament.players.includes(userId);
//             table.appendChild(createRow(tournament, isInTour, userId, type.key));
//         }
//
//         section.appendChild(table);
//         div.appendChild(section);
//     }
//
//     return div;
// }
//
// function createHeader(type: keyof ToursDict): HTMLTableRowElement {
//     const tr = document.createElement('tr');
//
//     // Define headers for each table type
//     const headers: Record<keyof ToursDict, string[]> = {
//         finished: ['Status', 'ID', 'Name', 'Players', 'Rounds', 'Lock Time', 'Winner', 'Actions'],
//         running: ['Status', 'ID', 'Name', 'Players', 'Rounds', 'Lock Time', 'Actions'],
//         joinable: ['Status', 'ID', 'Name', 'Players', 'Rounds', 'Lock Time', 'Actions']
//     };
//
//     for (let headerText of headers[type]) {
//         const th = document.createElement('th');
//         th.textContent = headerText;
//         tr.appendChild(th);
//     }
//
//     return tr;
// }
//
// function createRow(tournament: Tournament, isInTour: boolean, userId: number, type: keyof ToursDict): HTMLTableRowElement {
//     const tr = document.createElement('tr');
//
//     // Status badge
//     const statusTd = document.createElement('td');
//     const statusBadge = document.createElement('span');
//     statusBadge.className = `status-badge status-${type}`;
//     statusBadge.textContent = type.charAt(0).toUpperCase() + type.slice(1);
//     statusTd.appendChild(statusBadge);
//     tr.appendChild(statusTd);
//
//     // ID
//     const idTd = document.createElement('td');
//     idTd.textContent = tournament.id.toString();
//     tr.appendChild(idTd);
//
//     // Name
//     const nameTd = document.createElement('td');
//     nameTd.textContent = tournament.name;
//     tr.appendChild(nameTd);
//
//     // Players
//     const playersTd = document.createElement('td');
//     playersTd.textContent = `${tournament.playerCount}/${tournament.maxPlayers}`;
//     tr.appendChild(playersTd);
//
//     // Rounds
//     const roundsTd = document.createElement('td');
//     roundsTd.textContent = tournament.rounds.toString();
//     tr.appendChild(roundsTd);
//
//     // Lock Time
//     const lockTimeTd = document.createElement('td');
//     lockTimeTd.textContent = formatDateTime(tournament.lockTime);
//     tr.appendChild(lockTimeTd);
//
//     // Winner (for finished tournaments)
//     if (type === 'finished') {
//         const winnerTd = document.createElement('td');
//         winnerTd.textContent = tournament.winner ? `Player ${tournament.winner}` : 'N/A';
//         tr.appendChild(winnerTd);
//     }
//
//     // Actions
//     const actionsTd = document.createElement('td');
//     const button = document.createElement('button');
//     button.className = 'action-btn';
//
//     if (type === 'finished') {
//         button.textContent = 'View Results';
//         button.classList.add('view-btn');
//         button.addEventListener('click', () => {
//             alert(`Viewing results of tournament: ${tournament.name}`);
//         });
//     } else if (isInTour) {
//         button.textContent = 'Leave';
//         button.classList.add('leave-btn');
//         button.addEventListener('click', async () => {
//             await leaveTour(tournament.id, userId);
//         });
//     } else {
//         button.textContent = 'Join';
//         button.classList.add('join-btn');
//         button.addEventListener('click', async () => {
//             await joinTour(tournament.id, userId);
//         });
//     }
//
//     actionsTd.appendChild(button);
//     tr.appendChild(actionsTd);
//
//     return tr;
// }

async function tours(userID: number) {
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

    console.log(data)

    let toursDict = Object()
    for (let index = 0; index < data.length; index++) {
        if (data[index].isFinished) {
            if (!toursDict['finished']) {
                toursDict['finished'] = []
            }

            toursDict['finished'].push(data[index])
        } else if (data[index].isRunning) {
            if (!toursDict['running']) {
                toursDict['running'] = []
            }

            toursDict['running'].push(data[index])
        } else {
            if (!toursDict['joinable']) {
                toursDict['joinable'] = []
            }

            toursDict['joinable'].push(data[index])
        }
    }


    const div = document.createElement('div')
    for (const [key, value] of Object.entries(toursDict)) {
        const table = document.createElement('table')
        table.appendChild(createHeader())

        for (let index = 0; index < toursDict[key].length; index++) {
            const in_tour = true ? toursDict[key][index].players.includes(userID) : false
            table.appendChild(createRow(toursDict[key][index], in_tour, userID))
        }

        div.appendChild(table)
    }
    console.log(toursDict)

    function createHeader() {
        const tr = document.createElement('tr')
        const names = ['id', 'name', 'players count', 'rounds', 'lockTime', 'action']

        for (const index in names) {
            const th = document.createElement('th')
            th.style.textAlign = 'center';
            th.textContent = names[index]
            tr.appendChild(th)
        }

        return tr
    }

    // // TODO: quick fix should replace any with type
    function createRow(element: any, is_in_tour: boolean, userID: number) {
        const tr = document.createElement('tr')
        const keys = ['id', 'name', 'playerCount', 'rounds', 'lockTime', 'action']
        const button = document.createElement('button')

        for (const index in keys) {
            const td = document.createElement('td')
            td.style.textAlign = 'center';

            const key: string = keys[index]
            if (key === 'playerCount') {
                td.textContent = `${element[key]}/${element['maxPlayers']}`
            } else if (key === 'action') {
                if (is_in_tour) {
                    button.textContent = 'leave'
                    button.className = `leave_${element['id']}`;
                    button.addEventListener('click', async () => {
                        await leaveTour(element['id'], userID)
                    })
                } else {
                    button.textContent = 'join'
                    button.className = `join_${element['id']}`;
                    button.addEventListener('click', async () => {
                        await joinTour(element['id'], userID)
                    })
                }
                td.appendChild(button)
            } else if (key === 'lockTime') {
                td.textContent = formatDateTime(element[key])
            } else {
                td.textContent = `${element[key]}`
            }

            tr.appendChild(td)
        }

        return tr
    }

    return div
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
