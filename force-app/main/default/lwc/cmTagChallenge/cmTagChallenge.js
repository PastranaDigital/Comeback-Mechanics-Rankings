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
	loading = false;
	deactivateSubmit = true;
	showError = false;
	errorSubmitting = false;
	tagRecordWrapper = {
		CM_Date_of_Event__c: '',
		CM_Winning_Player__c: '',
		CM_Winning_Player_s_New_Rank__c: '',
		CM_Losing_Player__c: '',
		CM_Losing_Player_s_New_Rank__c: '',
	};


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
		this.tagRecordWrapper.CM_Date_of_Event__c = this.todaysDate;
	}

	getButtonState() {
		if (!this.winnerResults || !this.loserResults) return true;
		return false;
	}

	getFullPlayerInfo(id) {
		return this.allPlayers.find(row => row.Id == id);
	}

	checkIfSamePlayer() {
		if (this.tagRecordWrapper.CM_Winning_Player__c == this.tagRecordWrapper.CM_Losing_Player__c) {
			this.showError = true;
			this.deactivateSubmit = true;
		} else {
			this.showError = false;
		}
	}

	handleWinnerPlayerChange(event) {
		let playerObj = {};
		playerObj = this.getFullPlayerInfo(event.detail.value);
		this.tagRecordWrapper.CM_Winning_Player__c = playerObj.Id;
		this.tagRecordWrapper.CM_Losing_Player_s_New_Rank__c = playerObj.CM_Rank__c;

		this.winnerResults = `${playerObj.Name} was ${playerObj.CM_Rank__c}${playerObj.Ordinal}`;
		console.log('this.tagRecordWrapper: ', JSON.parse(JSON.stringify(this.tagRecordWrapper)));
		this.deactivateSubmit = this.getButtonState();
		this.checkIfSamePlayer();
	}

	handleLoserPlayerChange(event) {
		let playerObj = {};
		playerObj = this.getFullPlayerInfo(event.detail.value);
		this.tagRecordWrapper.CM_Losing_Player__c = playerObj.Id;
		this.tagRecordWrapper.CM_Winning_Player_s_New_Rank__c = playerObj.CM_Rank__c;

		this.loserResults = `${playerObj.Name} was ${playerObj.CM_Rank__c}${playerObj.Ordinal}`;
		console.log('this.tagRecordWrapper: ', JSON.parse(JSON.stringify(this.tagRecordWrapper)));
		this.deactivateSubmit = this.getButtonState();
		this.checkIfSamePlayer();
	}

	handleSubmitClick() {
		this.deactivateSubmit = true;
		this.loading = true;
		createTagChallenge({ tc: this.tagRecordWrapper })
		.then(result => {
			this.message = result;
			this.error = undefined;
			this.scoreSubmitted = true;                
			// console.log(JSON.stringify(result));
			console.log("result: ", this.message);
			// this.refreshScores();
		})
		.catch(error => {
			this.message = undefined;
			this.error = error;
			this.errorSubmitting = true;
			console.error("error", JSON.stringify(this.error));
		})
		.finally(() => {
			this.refreshScores();
		});
	}

	refreshScores() {
		const custEvent1 = new CustomEvent(
			'callscrolltotop', {
				detail: 'payload'
			});
		this.dispatchEvent(custEvent1);
		this.delay(2500).then(() => {
			this.loading = false;
			console.log('refreshing to Parent...');

			const custEvent2 = new CustomEvent(
				'callgetmodel', {
					detail: 'payload'
				});
			this.dispatchEvent(custEvent2);
			// const custEvent3 = new CustomEvent(
			// 	'callgotoleaderboard', {
			// 		detail: 'payload' 
			// 	});
			// this.dispatchEvent(custEvent3);
		});
	}

	delay(time) {
		return new Promise(resolve => setTimeout(resolve, time));
	}
}