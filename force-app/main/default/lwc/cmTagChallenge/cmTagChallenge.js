import { LightningElement, api } from 'lwc';
import createTagChallenge from '@salesforce/apex/CM_Controller.createTagChallenge';
import * as h from 'c/jsHelpers';

export default class CmTagChallenge extends LightningElement {
	@api allPlayers;
	@api tagChallenges;

	/*
	tempObj.Id
	tempObj.date
	tempObj.winner
	tempObj.winnersRank
	tempObj.winnerOrdinal
	tempObj.loser
	tempObj.losersRank
	tempObj.loserOrdinal
	*/

	winner;
	loser;
	todaysDate;
	winnerResults = '';
	loserResults = '';
	deactivateSubmit = true;
	showError = false;
	tagRecordWrapper = {};

/*
	public class Challenge {
		dateOfEvent;
		winnersId;
		winnersNewRank;
		losersId;
		losersNewRank;
	}
*/

	connectedCallback() {
		console.log('this.allPlayers: ', this.allPlayers);
		this.todaysDate = new Date();
		console.log('this.tagChallenges: ', this.tagChallenges);
		this.tagRecordWrapper.dateOfEvent = this.todaysDate;
	}

	getButtonState() {
		if (!this.winnerResults || !this.loserResults) return true;
		return false;
	}

	getFullPlayerInfo(id) {
		return this.allPlayers.find(row => row.Id == id);
	}

	checkIfSamePlayer() {
		if (this.tagRecordWrapper.winnersId == this.tagRecordWrapper.losersId) {
			this.showError = true;
			this.deactivateSubmit = true;
		} else {
			this.showError = false;
		}
	}

	handleWinnerPlayerChange(event) {
		let playerObj = {};
		playerObj = this.getFullPlayerInfo(event.detail.value);
		this.tagRecordWrapper.winnersId = playerObj.Id;
		this.tagRecordWrapper.losersNewRank = playerObj.CM_Rank__c;

		this.winnerResults = `${playerObj.Name} was ${playerObj.CM_Rank__c}${playerObj.Ordinal}`;
		console.log('this.tagRecordWrapper: ', JSON.parse(JSON.stringify(this.tagRecordWrapper)));
		this.deactivateSubmit = this.getButtonState();
		this.checkIfSamePlayer();
	}

	handleLoserPlayerChange(event) {
		let playerObj = {};
		playerObj = this.getFullPlayerInfo(event.detail.value);
		this.tagRecordWrapper.losersId = playerObj.Id;
		this.tagRecordWrapper.winnersNewRank = playerObj.CM_Rank__c;

		this.loserResults = `${playerObj.Name} was ${playerObj.CM_Rank__c}${playerObj.Ordinal}`;
		console.log('this.tagRecordWrapper: ', JSON.parse(JSON.stringify(this.tagRecordWrapper)));
		this.deactivateSubmit = this.getButtonState();
		this.checkIfSamePlayer();
	}

	handleSubmitClick() {
		let result = createTagChallenge({ch: this.tagRecordWrapper});
		this.deactivateSubmit = true;
		console.log('result: ', result);
	}
}