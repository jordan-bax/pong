export async function renderTournament() {
    const userID: number | null = await getID()
    if (userID === null) {
        console.log("moet ingeloged zijn om dit te doen")
        return
    }

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

    const idle_tb: any = await idle_table(userID)
    // const done_tb = await done_table()

    div.appendChild(idle_tb)
    div.appendChild(br)
    // div.appendChild(done_tb)

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

async function idle_table(userID: number) {
    const resp = await fetch('api/tournament/idle')
    if (resp.status != 200) {
        console.log("error", resp)
        return
    }

    const data: Array<any> = await resp.json()

    if (data.length === 0) {
        console.log('geen data')
        return
    }

    function create_header() {
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

    // TODO: quick fix should replace any with type
    function create_row(element: any, is_in_tour: boolean, userID: number) {
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
                        await leave_tour(element['id'], userID)
                    })
                } else {
                    button.textContent = 'join'
                    button.className = `join_${element['id']}`;
                    button.addEventListener('click', async () => {
                        await join_tour(element['id'], userID)
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

    const table = document.createElement('table')
    table.className = "available_tours"
    const header = create_header()
    table.appendChild(header)

    for (const element of data) {
        const in_tour = true ? element.players.includes(userID) : false
        const row = create_row(element, in_tour, userID)
        table.appendChild(row)
    }

    return table
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

async function getID() {
    const response = await fetch('api/user/me/data', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'x-internal': 'true'
        }
    });

    if (!response.ok) {
        return null
    }

    const data = await response.json();
    return data.user.id

}

async function join_tour(tourID: number, userID: number) {
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

async function leave_tour(tourID: number, userID: number) {
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
