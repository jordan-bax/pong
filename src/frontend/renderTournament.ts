export async function renderTournament() {
	const content = document.getElementById("content") as HTMLDivElement;
	if (!content) {
		console.error("Content element not found");
		return;
	}
	content.innerHTML = 'tournament test';
}
