
type Header<T> = { label: string; key: keyof T };
let ascending = true;
// Create and return a styled table element
function createTable<T>(data: T[], headers: Header<T>[], currentSortKey: keyof T | null): HTMLTableElement {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.id = "tr";
//   const headers: { label: string; key: keyof Game }[] = [
//     { label: "Game ID", key: "id" },
//     { label: "Type of Game", key: "type" },
//     { label: "Player 1", key: "player1" },
//     { label: "Player 2", key: "player2" },
//     { label: "Player 1 Score", key: "player1Score" },
//     { label: "Player 2 Score", key: "player2Score" },
//     { label: "Outcome", key: "winner" },
//     { label: "Date", key: "createdAt" }
//   ];
  headers.forEach(({ label, key }) => {
    const th = document.createElement("th");
    th.id = "th";
    th.textContent = label;
    th.style.padding = "10px";
    th.addEventListener("click", () => sortBy(data, headers, key, currentSortKey));
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  tbody.id = "grid-body";
  table.appendChild(tbody);
  return table;
}

// Render the data rows
function renderTableRows<T>(data: T[], headers: Header<T>[]) {
  const tbody = document.getElementById("grid-body") as HTMLTableSectionElement;
  tbody.innerHTML = "";
  data.forEach(item => {
    const row = document.createElement("tr");
	headers.forEach(({ key }) => {
      const td = document.createElement("td");
      td.id = "td";
      td.textContent = String(item[key]);
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });
}
// Sort function
function sortBy<T>(data: T[], headers: Header<T>[], key: keyof T, currentSortKey: keyof T | null) {
  if (currentSortKey === key) {
    ascending = !ascending;
  } else {
    ascending = true;
    currentSortKey = key;
  }
  data.sort((a, b) => {
	if (a[key] === null || a[key] === undefined) return ascending ? 1 : -1;
	if (b[key] === null || b[key] === undefined) return ascending ? -1 : 1;
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
  renderTableRows(data, headers);
}
// Entry point
// window.addEventListener("DOMContentLoaded", () => {
//   const table = createTable();
//   document.body.appendChild(table);
//   renderTableRows(people);
// });
// function events(frame: HTMLIFrameElement): void {
// 	window.history.pushState({}, '', '/game-history');
// 	window.addEventListener('popstate', () => {
// 		console.log('Back button pressed');
// 	});
// 	window.addEventListener('hashchange', () => {
// 		// Handle hash changes
// 		console.log('Hash changed:', window.location.hash);
// 	});
// }
export function createNewTable1<T>(
    frame: HTMLElement,
    data: T[],
    headers: Header<T>[]
): HTMLTableElement {
	let currentSortKey: keyof T | null = null;
	const table = createTable(data, headers, currentSortKey);
	frame.appendChild(table);
	renderTableRows(data, headers);
	return table;
}
// type Header<T> = { label: string; key: keyof T };

export function createNewTable2<T>(
    frame: HTMLElement,
    data: T[],
    headers: Header<T>[]
): HTMLTableElement {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    headers.forEach(({ label }) => {
        const th = document.createElement("th");
        th.textContent = label;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    data.forEach(item => {
        const row = document.createElement("tr");
        headers.forEach(({ key }) => {
            const td = document.createElement("td");
            td.textContent = String(item[key]);
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    frame.appendChild(table);
    return table;
}