import { LightningElement, api } from 'lwc';

export default class CmModal extends LightningElement {
	@api selectedPlayer;

	tournamentResults = [
		{ place: "1st", record: "3-0-0", tournamentName: "August GLC Tournament", deckType: "Electric" },
		{ place: "1st", record: "3-0-0", tournamentName: "August GLC Tournament", deckType: "Electric" },
		{ place: "1st", record: "3-0-0", tournamentName: "August GLC Tournament", deckType: "Electric" },
		{ place: "1st", record: "3-0-0", tournamentName: "August GLC Tournament", deckType: "Electric" },
		{ place: "1st", record: "3-0-0", tournamentName: "August GLC Tournament", deckType: "Electric" },
	];

	challengeRecords = [
		{ date: "8-9-2023", result: "Lost (1) to Mathew B (8)" },
		{ date: "8-9-2023", result: "Lost (1) to Mathew B (8)" },
		{ date: "8-9-2023", result: "Lost (1) to Mathew B (8)" },
		{ date: "8-9-2023", result: "Lost (1) to Mathew B (8)" },
		{ date: "8-9-2023", result: "Lost (1) to Mathew B (8)" },
	]

	closeModal () {
		const closeEvent = new CustomEvent("closemodal", { detail: true });
        this.dispatchEvent(closeEvent);
	}
}