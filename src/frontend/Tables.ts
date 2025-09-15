type Header<T> = { label: string; key: keyof T };
class table<T> {
  constructor(callback?: (item: T, td: HTMLTableCellElement) => void) {
    this.ascending = true;
    this.currentSortKey = null;
    if (callback) {
      this.func = callback;
    }
  }
  private func: ((item: T, td: HTMLTableCellElement) => void) | null = null;
  private currentSortKey: keyof T | null;
  private ascending = true;

  // Create and return a styled table element
  private createTable(data: T[], headers: Header<T>[]): HTMLTableElement {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headerRow.id = "tr";
    headers.forEach(({ label, key }) => {
      const th = document.createElement("th");
      th.id = "th";
      th.textContent = label;
      th.style.padding = "10px";
      th.addEventListener("click", async () => await this.sortBy(data, headers, key));
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
  private async renderTableRows(data: T[], headers: Header<T>[]) {
    const tbody = document.getElementById("grid-body") as HTMLTableSectionElement;
    tbody.innerHTML = "";
    data.forEach(item => {
      const row = document.createElement("tr");
      // row.onclick = () => {
      //   if (this.func) this.func(item);
      // };
    headers.forEach(async ({ key }) => {
        const td = document.createElement("td");
        td.id = "td";
        td.textContent = String(item[key]);
        await row.appendChild(td);  // TODO: await does not do anything here
        if (this.func) this.func(item , td);
      });
      tbody.appendChild(row);
    });
  }

  // Sort function
  private async sortBy(data: T[], headers: Header<T>[], key: keyof T) {
    console.log("Sorting by:", key, "currentSortKey:", this.currentSortKey, "ascending:", this.ascending);
    if (this.currentSortKey === key) {
      this.ascending = !this.ascending;
    } else {
      this.ascending = true;
      this.currentSortKey = key;
    }
    console.log("Sorting by:", key, "currentSortKey:", this.currentSortKey, "ascending:", this.ascending);
    data.sort((a, b) => {
      if (a[key] === null || a[key] === undefined) return this.ascending ? 1 : -1;
      if (b[key] === null || b[key] === undefined) return this.ascending ? -1 : 1;
      if (a[key] < b[key]) return this.ascending ? -1 : 1;
      if (a[key] > b[key]) return this.ascending ? 1 : -1;
      return 0;
    });
    await this.renderTableRows(data, headers);
  }

  public async createNewTable1(
      frame: HTMLElement,
      data: T[],
      headers: Header<T>[]
  ): Promise <HTMLTableElement> {
    const table = this.createTable(data, headers);
    frame.appendChild(table);
    await this.renderTableRows(data, headers);
    return table;
  }
}
export { table };
