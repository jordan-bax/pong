export async function renderTournament() {
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
        async () => { await createTournament(content) },
        "ct")
    createButton(div, "join Tournament", () => { console.log("join clicked") }, "jt")

    content.appendChild(div)
}

async function createTournament(content: HTMLDivElement) {
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
                    'id': 1
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
