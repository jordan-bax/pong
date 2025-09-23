import { getLanguage } from "./index.js";
import { getIdFromMe, getUsernameFromMeData } from "./routing.js"
import { getContent } from "./settings.js";

window.addEventListener('beforeunload', cleanupIntervals);

interface Tour {
    id: number
    name: string
    rounds: number
    currentRound: number,
    isRunning: boolean
    isFinished: boolean
    lockTime: number
    playerCount: number
    maxPlayers: number
    players: number[]
    username: string
}

interface ToursDict {
    finished: Tour[]
    running: Tour[]
    joinable: Tour[]
}

interface TournamentText {
    loginNeededError: string;
    createTournamentText: string;
    cancelText: string;
    submitText: string;
    tournamentNameText: string;
    tournamentPlayersText: string;
    tournamentDurationText: string;
}

interface tournamentHistoryText {
    historyId: string;
    historyName: string;
    historyPlayers: string;
    historyRounds: string;
    historyStart: string;
    gamePlayerOutcomeLabel: string;
    historyActio: string;
    historyLock: string;
};

let refreshIntervalId: number | null = null;

async function getText(): Promise<TournamentText> {
    const textArray = [
        'loginNeededError',
        'createTournamentText',
        'cancelText',
        'submitText',
        'tournamentNameText',
        'tournamentPlayersText',
        'tournamentDurationText'
    ];

    const language = await getLanguage();
    const textMapData = await getContent(language.toLowerCase(), textArray);
    const text = textMapData.get('row') as TournamentText;
    return text;
}

export async function renderTournament() {
    const content = document.getElementById("content") as HTMLDivElement
    const text = await getText();
    if (!content) {
        console.error("Content element not found")
        return
    }

    content.innerHTML = ""
    const div = document.createElement("div")

    const userID: number | null = await getIdFromMe()
    if (userID == null) {
        const h1 = document.createElement('h1')
        h1.textContent = text.loginNeededError;
        h1.style.color = 'red'
        div.appendChild(h1)
        content.appendChild(div)
        return
    }

    const tournamentContainer = document.createElement("div")
    tournamentContainer.className = "create-tournament-container"

    const formButton = document.createElement("button")
    formButton.textContent = text.createTournamentText
    formButton.className = "show-form-btn"
    formButton.addEventListener("click", () => {
        formButton.style.display = "none"
        tournamentFormContainer.style.display = "block"
    })

    const tournamentFormContainer = document.createElement("div")
    tournamentFormContainer.style.display = "none"

    await createTournamentForm(tournamentFormContainer, userID, () => {
        tournamentFormContainer.style.display = "none"
        formButton.style.display = "block"
    })

    tournamentContainer.appendChild(formButton)
    tournamentContainer.appendChild(tournamentFormContainer)

    div.appendChild(tournamentContainer)
    div.appendChild(document.createElement('br'))

    await loadTournamentData(div, userID);

    refreshIntervalId = window.setInterval(async () => {
        await loadTournamentData(div, userID);
    }, 30000);

    content.appendChild(div)
}

async function loadTournamentData(container: HTMLDivElement, userID: number) {
    let toursDict: ToursDict = {
        finished: [],
        running: [],
        joinable: []
    }

    const resp = await fetch("api/tournament/tours")
    if (resp.status != 200) {
        return
    }

    const data: Array<Tour> = await resp.json()

    for (let tournament of data) {
        if (tournament.isFinished) {
            toursDict.finished.push(tournament)
        } else if (tournament.isRunning) {
            toursDict.running.push(tournament)
        } else {
            toursDict.joinable.push(tournament)
        }
    }

    toursDict.joinable.sort((a, b) => a.lockTime - b.lockTime);
    toursDict.running.sort((a, b) => a.lockTime - b.lockTime);

    const existingTablesContainer = container.querySelector('.tables-container');
    if (existingTablesContainer) {
        container.removeChild(existingTablesContainer);
    }

    const tablesContainer = document.createElement("div")
    tablesContainer.className = "tables-container"

    const tableTypes: { key: keyof ToursDict, title: string }[] = [
        { key: "joinable", title: "Joinable Tournaments" },
        { key: "running", title: "Running Tournaments" },
        { key: "finished", title: "Finished Tournaments" }
    ]

    for (let type of tableTypes) {
        if (toursDict[type.key].length === 0) continue

        const section = document.createElement("div")
        section.className = "table-section"

        const title = document.createElement("div")
        title.style.left = "50%"
        title.className = `table-title ${type.key}`
        title.innerHTML = `${type.title}`
        section.appendChild(title)

        const table = document.createElement("table")
        table.appendChild(await createHeader(type.key))

        for (let tournament of toursDict[type.key]) {
            const isInTour = tournament.players.includes(userID)
            table.appendChild(
                await createRow(tournament,
                    isInTour,
                    userID,
                    type.key,
                    tournament.username))
        }

        section.appendChild(table)
        section.appendChild(document.createElement("br"))
        tablesContainer.appendChild(section)
    }

    container.appendChild(tablesContainer)
}

function cleanupIntervals() {
    if (refreshIntervalId !== null) {
        window.clearInterval(refreshIntervalId);
        refreshIntervalId = null;
    }
}

async function createTournamentForm(container: HTMLDivElement,
    userID: number,
    onSuccess: () => void) {

    const text = await getText();
    container.innerHTML = ""
    const form = document.createElement("form")
    form.className = "tournament-form"

    const nameField = await createFormField("tname", text.tournamentNameText, false)
    const playersField = await createFormField("tplayers", text.tournamentPlayersText, true)
    const lockField = await createFormField("tlock", text.tournamentDurationText, true)

    nameField.forEach(field => form.appendChild(field))
    playersField.forEach(field => form.appendChild(field))
    lockField.forEach(field => form.appendChild(field))

    const cancelButton = document.createElement("button")
    cancelButton.type = "button"
    cancelButton.textContent = text.cancelText
    cancelButton.addEventListener("click", () => {
        onSuccess()
    })
    form.appendChild(cancelButton)

    const submitButton = document.createElement("button")
    submitButton.type = "submit"
    submitButton.textContent = text.submitText;
    form.appendChild(submitButton)

    form.onsubmit = async function(e) {
        e.preventDefault()
        try {
            const res = await fetch('http://user:3001/me',{
                credentials: 'include',
                headers: { 'x-internal': 'true' }
            })
            if (res.status !== 200) {
                console.error("no correct data from me")
                throw new Error("no correct data from me")
            }
            const userData = await res.json()

            const resp = await fetch("/api/tournament/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": (document.getElementById("tname") as HTMLInputElement).value,
                    "maxPlayers": (document.getElementById("tplayers") as HTMLInputElement).value,
                    "lockTime": (document.getElementById("tlock") as HTMLInputElement).value,
                    "userID": userData.userId,
                    "username": userData.username
                })
            })

            const result = resp.status
            if (result !== 201) {
                console.error("No valid response from server create")
            } else {
                onSuccess()
                if (refreshIntervalId !== null) {
                    window.clearInterval(refreshIntervalId);
                }
                await renderTournament()
            }
        } catch (error) {
            console.error("unexpected error on createTournamentForm")
        }
    }

    container.appendChild(form)
}

async function createHeader(type: keyof ToursDict): Promise<HTMLTableRowElement> {
    const textArray = [
        'historyId',
        'historyName',
        'historyPlayers',
        'historyRounds',
        'historyStart',
        'gamePlayerOutcomeLabel',
        'historyAction',
        'historyLock'
    ];

    const lang = await getLanguage();
    const textMapData = await getContent(lang.toLowerCase(), textArray);
    const text = textMapData.get('row') as tournamentHistoryText;

    const tr = document.createElement("tr")

    const headers: Record<keyof ToursDict, string[]> = {
        finished: [text.historyId, text.historyName, text.historyPlayers, text.historyRounds, text.historyStart, text.gamePlayerOutcomeLabel],
        running: [text.historyId, text.historyName, text.historyPlayers, text.historyRounds, text.historyStart],
        joinable: [text.historyId, text.historyName, text.historyPlayers, text.historyRounds, text.historyLock, text.historyActio]
    }

    for (let headerText of headers[type]) {
        const th = document.createElement("th")
        th.textContent = headerText
        tr.appendChild(th)
    }

    return tr
}

async function createRow(tournament: Tour,
    isInTour: boolean,
    userID: number,
    type: keyof ToursDict,
    username: string): Promise<HTMLTableRowElement> {

    const tr = document.createElement("tr")

    const idTd = document.createElement("td")
    idTd.textContent = tournament.id.toString()
    tr.appendChild(idTd)

    const nameTd = document.createElement("td")
    nameTd.textContent = tournament.name
    tr.appendChild(nameTd)

    const playersTd = document.createElement("td")
    playersTd.textContent = `${tournament.playerCount}/${tournament.maxPlayers}`
    tr.appendChild(playersTd)

    const roundsTd = document.createElement("td")
    if (type == "running") {
        roundsTd.textContent = `${tournament.currentRound}/${tournament.rounds.toString()}`
    } else {
        roundsTd.textContent = tournament.rounds.toString()
    }
    tr.appendChild(roundsTd)

    const lockTimeTd = document.createElement("td")
    lockTimeTd.textContent = formatDateTime(tournament.lockTime)
    tr.appendChild(lockTimeTd)

    if (type === "finished") {
        const winnerTd = document.createElement("td")
        winnerTd.textContent = username
        tr.appendChild(winnerTd)
    }

    const actionsTd = document.createElement("td")
    const button = document.createElement("button")
    button.className = "action-btn"

    if (type === "finished") {
        button.textContent = "View Results"
        button.classList.add("view-btn")
        button.addEventListener("click", () => {
            alert(`Viewing results of tournament: ${tournament.name}`)
        })
    } else {
        const state = isInTour ? "Leave" : "Join"
        button.textContent = state
        button.classList.add("state-btn")
        button.addEventListener("click", async () => {
            await changeTourstatus(tournament.id, userID, state)
        })
    }

    if (type === "joinable") {
        actionsTd.appendChild(button)
        tr.appendChild(actionsTd)
    }

    return tr
}

function formatDateTime(timestamp: number): string {
    const date = new Date(timestamp)

    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const seconds = String(date.getSeconds()).padStart(2, "0")

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`
}

async function changeTourstatus(tourID: number,
    userID: number,
    status: string) {

    try {
        const resp = await fetch(`/api/tournament/${status.toLocaleLowerCase()}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "tournamentID": tourID,
                "userID": userID,
                "username": await getUsernameFromMeData()
            })
        })

        const result = resp.status
        if (result !== 201) {
            console.error(`No valid response from server ${status}`)
        } else {
            await renderTournament()
        }
    } catch (error) {
        console.error("unexpected error on changeTourstatus")
    }
}

async function createFormField(id: string,
    labelText: string,
    mustNumber: boolean) {

    const label = document.createElement("label")
    label.htmlFor = id
    label.textContent = labelText

    const input = document.createElement("input")
    input.type = "text"
    input.autofocus
    input.id = id
    input.name = id
    input.required = true
    input.type = "string"
    input.min = "2"
    input.max = "3600"
    if (mustNumber) {
        input.type = "number"
    }

    const br = document.createElement("br")

    return [label, br, input, br.cloneNode(), br.cloneNode()]
}
