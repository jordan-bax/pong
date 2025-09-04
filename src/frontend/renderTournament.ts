import { getIdFromMe } from "./routing.js"

interface Tour {
    id: number
    name: string
    rounds: number
    isRunning: boolean
    isFinished: boolean
    lockTime: number
    playerCount: number
    maxPlayers: number
    players: number[]
    winner: number
}

interface ToursDict {
    finished: Tour[]
    running: Tour[]
    joinable: Tour[]
}

let refreshIntervalId: number | null = null;

export async function renderTournament() {
    const userID: number | null = await getIdFromMe()
    if (userID == null) {
        console.log("moet ingeloged zijn om dit te doen")
        return
    }

    const content = document.getElementById("content") as HTMLDivElement
    if (!content) {
        console.error("Content element not found")
        return
    }

    content.innerHTML = ""
    const div = document.createElement("div")

    const createTournamentContainer = document.createElement("div")
    createTournamentContainer.className = "create-tournament-container"

    const showFormButton = document.createElement("button")
    showFormButton.textContent = "Create New Tournament"
    showFormButton.className = "show-form-btn"
    showFormButton.addEventListener("click", () => {
        showFormButton.style.display = "none"
        createTournamentFormContainer.style.display = "block"
    })

    const createTournamentFormContainer = document.createElement("div")
    createTournamentFormContainer.style.display = "none"

    await createTournamentForm(createTournamentFormContainer, userID, () => {
        createTournamentFormContainer.style.display = "none"
        showFormButton.style.display = "block"
    })

    createTournamentContainer.appendChild(showFormButton)
    createTournamentContainer.appendChild(createTournamentFormContainer)

    div.appendChild(createTournamentContainer)
    div.appendChild(document.createElement('br'))

    await loadTournamentData(div, userID);

    refreshIntervalId = window.setInterval(async () => {
        await loadTournamentData(div, userID);
    }, 30000);

    content.appendChild(div)

    window.addEventListener('beforeunload', cleanupIntervals);
}

async function loadTournamentData(container: HTMLDivElement, userID: number) {
    let toursDict: ToursDict = {
        finished: [],
        running: [],
        joinable: []
    }

    const resp = await fetch("api/tournament/tours")
    if (resp.status != 200) {
        console.log("error", resp)
        return
    }

    const data: Array<any> = await resp.json()

    if (data.length === 0) {
        console.log("geen data")
    }

    for (let tournament of data) {
        if (tournament.isFinished) {
            toursDict.finished.push(tournament)
        } else if (tournament.isRunning) {
            toursDict.running.push(tournament)
        } else {
            toursDict.joinable.push(tournament)
        }
    }

    const existingTablesContainer = container.querySelector('.tables-container');
    if (existingTablesContainer) {
        container.removeChild(existingTablesContainer);
    }

    const tablesContainer = document.createElement("div")
    tablesContainer.className = "tables-container"

    const tableTypes: { key: keyof ToursDict, title: string}[] = [
        { key: "joinable", title: "Joinable Tournaments"},
        { key: "finished", title: "Finished Tournaments"},
        { key: "running", title: "Running Tournaments"}
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
        table.appendChild(createHeader(type.key))

        for (let tournament of toursDict[type.key]) {
            const isInTour = tournament.players.includes(userID)
            table.appendChild(createRow(tournament, isInTour, userID, type.key))
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

window.addEventListener('beforeunload', cleanupIntervals);

async function createTournamentForm( container: HTMLDivElement,
                                    userID: number,
                                    onSuccess: () => void
) {
    container.innerHTML = ""
    const form = document.createElement("form")
    form.className = "tournament-form"

    const nameField = await createFormField("tname", "Tournament Name:", false)
    const playersField = await createFormField("tplayers", "How many players:", true)
    const lockField = await createFormField("tlock", "Duration before locking:", true)

    nameField.forEach(field => form.appendChild(field))
    playersField.forEach(field => form.appendChild(field))
    lockField.forEach(field => form.appendChild(field))

    const cancelButton = document.createElement("button")
    cancelButton.type = "button"
    cancelButton.textContent = "Cancel"
    cancelButton.addEventListener("click", () => {
        onSuccess()
    })
    form.appendChild(cancelButton)

    const submitButton = document.createElement("button")
    submitButton.type = "submit"
    submitButton.textContent = "Submit"
    form.appendChild(submitButton)

    form.onsubmit = async function(e) {
        e.preventDefault()
        console.log("Form submitted!")
        try {
            const resp = await fetch("/api/tournament/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": (document.getElementById("tname") as HTMLInputElement).value,
                    "maxPlayers": (document.getElementById("tplayers") as HTMLInputElement).value,
                    "lockTime": (document.getElementById("tlock") as HTMLInputElement).value,
                    "userID": userID
                })
            })

            const result = resp.status
            if (result !== 201) {
                console.log("error it", result)
            } else {
                onSuccess()
                if (refreshIntervalId !== null) {
                    window.clearInterval(refreshIntervalId);
                }
                await renderTournament()
            }
        } catch (error) {
            console.log("error it except", error)
        }
    }

    container.appendChild(form)
}

function createHeader(type: keyof ToursDict): HTMLTableRowElement {
    const tr = document.createElement("tr")

    const headers: Record<keyof ToursDict, string[]> = {
        finished: ["ID", "Name", "Players", "Rounds", "Start Time", "Winner"],
        running: ["ID", "Name", "Players", "Rounds", "Start Time"],
        joinable: ["ID", "Name", "Players", "Rounds", "Lock Time", "Actions"]
    }

    for (let headerText of headers[type]) {
        const th = document.createElement("th")
        th.textContent = headerText
        tr.appendChild(th)
    }

    return tr
}

function createRow(tournament: Tour,
    isInTour: boolean,
    userID: number,
    type: keyof ToursDict): HTMLTableRowElement {
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
        roundsTd.textContent = `1/${tournament.rounds.toString()}`
    } else {
        roundsTd.textContent = tournament.rounds.toString()
    }
    tr.appendChild(roundsTd)

    const lockTimeTd = document.createElement("td")
    lockTimeTd.textContent = formatDateTime(tournament.lockTime)
    tr.appendChild(lockTimeTd)

    if (type === "finished") {
        const winnerTd = document.createElement("td")
        winnerTd.textContent = tournament.winner ? `Player ${tournament.winner}` : "N/A"
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
                "userID": userID
            })
        })

        const result = resp.status
        if (result !== 201) {
            console.log("error it", result)
        } else {
            await renderTournament()
        }
    } catch (error) {
        console.log("error it except", error)
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
