import { getLanguage } from ".";
import { getContent } from "./settings";


export interface player {
	id: number | null; // Player ID, can be null for new players
	username: string;
	// gameRef: Game[]; // Reference to games played by the player
}
// game id is string == game 
export interface Game {
	id: number | null; // Game ID, can be null for new games
	type: string; // Optional type field for future use
	player1: player;
	player2: player;
	player1Score: number;
	player2Score: number;
	winner: string;
	createdAt: Date | null; // Date when the game was created, can be null for new games
}
var games: Game[] = [];
export interface GameKey {
	id: number | null; // Game ID, can be null for new games
	type: string; // Optional type field for future use
	player1: string;
	player2: string;
	player1Score: number;
	player2Score: number;
	winner: string;
	createdAt: Date | null; // Date when the game was created, can be null for new games
}

export interface GameStats {
	username: string;
	gamesPlayed: number;
	gamesWon: number;
	gamesLost: number;
}

interface gameLabelText {
    gameIdLabel: string;
    gameTypeLabel: string;
    gamePlayer1Label: string;
    gamePlayer2Label: string;
    gamePlayer1ScoreLabel: string;
    gamePlayer2ScoreLabel: string;
    gamePlayerOutcomeLabel: string;
    gameDateLabel: string;
};


let currentSortKey: keyof Game | null = null;
let ascending = true;
// Create and return a styled table element
async function createTable(): Promise<HTMLTableElement> {
  const textArray = [
    'gameIdLabel',
    'gameTypeLabel',
    'gamePlayer1Label',
    'gamePlayer2Label',
    'gamePlayer1ScoreLabel',
    'gamePlayer2ScoreLabel',
    'gameDateLabel'
  ];
  const lang = await getLanguage();
  const textMapData = await getContent(lang.toLowerCase(), textArray);
  const text = textMapData.get('row') as gameLabelText;
  const table = document.createElement("table");
  // table.style.width = "100%";
  // table.style.borderCollapse = "collapse";
  // table.style.marginTop = "20px";
  // table.style.fontFamily = "Arial";
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.id = "tr";
  const headers: { label: string; key: keyof Game }[] = [
    { label: text.gameIdLabel, key: "id" },
    { label: text.gameTypeLabel, key: "type" },
    { label: text.gamePlayer1Label, key: "player1" },
    { label: text.gamePlayer2Label, key: "player2" },
    { label: text.gamePlayer1ScoreLabel, key: "player1Score" },
    { label: text.gamePlayer2ScoreLabel, key: "player2Score" },
    { label: text.gamePlayerOutcomeLabel, key: "winner" },
    { label: text.gameDateLabel, key: "createdAt" }
  ];
  headers.forEach(({ label, key }) => {
    const th = document.createElement("th");
    th.id = "th";
    th.textContent = label;
    th.style.padding = "10px";
    // th.style.border = "1px solid #ccc";
    // th.style.background = "red";
    // th.style.cursor = "pointer";
    th.addEventListener("click", () => sortBy(key));
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  tbody.id = "grid-body";
  table.appendChild(tbody);
  return table;
}

async function fetchGameData(): Promise<Game[]> {
  try {
	const response = await fetch('/api/game/db/getGamesForPlayer', {
    method: 'GET',
    credentials: 'include', // Include cookies for authentication
    });
	if (!response.ok) {
	  throw new Error('Failed to fetch game data');
	}
	const data = await response.json() as Game[];
	games = data;
	return data;
  } catch (error) {
    console.error('Error fetching game data:', error);
    return [];
  }
}

// Render the data rows
function renderTableRows(data: Game[]) {
  const tbody = document.getElementById("grid-body") as HTMLTableSectionElement;
  tbody.innerHTML = "";
  data.forEach(game => {
    const row = document.createElement("tr");
    [game.id, game.type, game.player1.username, game.player2.username, game.player1Score, game.player2Score, game.winner, game.createdAt].forEach(value => {
      const td = document.createElement("td");
      td.id = "td";
      td.textContent = String(value);
      // td.style.padding = "10px";
      // td.style.border = "1px solid #ccc";
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });
}
// Sort function
function sortBy(key: keyof Game) {
  if (currentSortKey === key) {
    ascending = !ascending;
  } else {
    ascending = true;
    currentSortKey = key;
  }
  games.sort((a, b) => {
	if (a[key] === null) return ascending ? 1 : -1;
	if (b[key] === null) return ascending ? -1 : 1;
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
  renderTableRows(games);
}
// Entry point
// window.addEventListener("DOMContentLoaded", () => {
//   const table = createTable();
//   document.body.appendChild(table);
//   renderTableRows(people);
// });
function events(frame: HTMLIFrameElement): void {
	window.history.pushState({}, '', '/game-history');
	window.addEventListener('popstate', () => {
		console.log('Back button pressed');
	});
	window.addEventListener('hashchange', () => {
		// Handle hash changes
		console.log('Hash changed:', window.location.hash);
	});
}
export async function createGameHistoryTable(frame: HTMLIFrameElement): Promise<HTMLTableElement> {
	const table = createTable();
	events(frame);
	frame.appendChild(await table);
	fetchGameData().then(data => {
		renderTableRows(data);
	}).catch(error => {
		console.error('Error rendering game history:', error);
	});
	return table;
}
