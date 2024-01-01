import { LightningElement, api } from 'lwc';

export default class CmLeaderboard extends LightningElement {
	@api allPlayers;
	selectedPlayer;

	handleModal(event) {
		this.playerId = (event.target.id).split('-');
        this.playerId = this.playerId[0];
		console.log('this.playerId: ', this.playerId);
		this.selectedPlayer = this.allPlayers.filter(row => {
			if (row.Id == this.playerId) return row;
		})
		this.selectedPlayer = this.selectedPlayer[0];
		console.log('this.selectedPlayer: ', JSON.parse(JSON.stringify(this.selectedPlayer)));
	}

	handleCloseModal() {
		this.selectedPlayer = null;
	}
}