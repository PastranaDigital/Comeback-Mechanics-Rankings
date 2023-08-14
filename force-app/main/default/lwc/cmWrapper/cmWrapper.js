import { LightningElement } from 'lwc';
import imageResource from '@salesforce/resourceUrl/CMImages';
import getViewModel from '@salesforce/apex/CM_Controller.getViewModel';
import * as h from 'c/jsHelpers';
export default class CmWrapper extends LightningElement {
	outboundModel = {};

	//? outgoing variables to child components
	allPlayers = [];
	allTagChallenges = [];
	allTournamentResults = [];
	
	loading = true;

	headerTitle = '';
	showLeaderboardPage = false;
	showTagChallengePage = false;
	showTournamentsPage = false;
	pokeball;
	
    labels = {
        ComponentFooter: '2022 Vault',
    };
    
    img_logo = imageResource + '/Images/Comeback_Mechanics_logo.png';
	
    connectedCallback() {
		this.getModel();
		this.pokeball = imageResource + '/Images/PokeBall.png'
    }
	
	getModel() {
		console.log('getting model');
		this.loading = true;
		getViewModel()
			.then((result) => {
				// console.log('ViewModel: ', result);
				this.outboundModel = Object.assign({}, result.outboundModel);
				console.log('this.outboundModel: ', this.outboundModel);
			})
			.catch((error) => {
				this.handleError(error);
			})
			.finally(() => {
				// this.buildAllTournamentResults(this.outboundModel.allTournamentResults);
				this.allPlayers = this.buildAllPlayers(this.outboundModel.allPlayers);
				this.allTagChallenges = this.buildAllTagChallenges(this.outboundModel.allTagChallenges);
				
				this.loading = false;
				this.setNav('leaderboard');
			});
	}
	
	setNav(string) {
		//? reset values
		this.headerTitle = '';
		this.showLeaderboardPage = false;
		this.showTagChallengePage = false;
		this.showTournamentsPage = false;
		
		//? simulated load for beter UX
		this.loading = true;
		const delay = setTimeout(() => {
			this.loading = false;
		}, 200);
		
		switch(string) {
			case 'leaderboard':
				this.showLeaderboardPage = true;
				this.headerTitle = 'Leaderboard';
				break;
			case 'tagChallenge':
				this.showTagChallengePage = true;
				this.headerTitle = 'Tag Challenge';
				break;
			case 'tournaments':
				this.showTournamentsPage = true;
				this.headerTitle = 'Tournaments';
				break;
			default:
				this.showLeaderboardPage = true;
				this.headerTitle = 'Leaderboard';
		}
		this.showLeaderboardPage ? this.leaderboardBtnClassList = 'nav-btn active' : this.leaderboardBtnClassList = 'nav-btn';
		this.showTagChallengePage ? this.tagChallengeBtnClassList = 'nav-btn active' : this.tagChallengeBtnClassList = 'nav-btn';
		this.showTournamentsPage ? this.tournamentsBtnClassList = 'nav-btn active' : this.tournamentsBtnClassList = 'nav-btn';
		
		this.scrollToTop();
	}

	buildAllPlayers(arr) {
		let tempArray = [];
		arr.forEach( row => {
			let tempObj = {};
			
			//? combobox
			tempObj.label = row.Name;
			tempObj.value = row.Id;
			
			tempObj.Name = row.Name;
			tempObj.Id = row.Id;
			tempObj.CM_Avatar_File__c = imageResource + '/Images/' + row.CM_Avatar_File__c;
			tempObj.CM_Rank__c = row.CM_Rank__c;
			tempObj.Ordinal = h.getRankNumber(row.CM_Rank__c);
			
			tempArray.push(tempObj);
		})
		return tempArray;
	}

	buildAllTagChallenges(arr) {
		let tempArray = [];
		arr.forEach( row => {
			let tempObj = {};
						
			tempObj.Id = row.Id;
			tempObj.date = row.CM_Date_of_Event__c;
			tempObj.winner = row.CM_Winning_Player__r.Name;
			tempObj.winnersRank = row.CM_Winning_Player_s_New_Rank__c;
			tempObj.winnerOrdinal = h.getRankNumber(row.CM_Winning_Player_s_New_Rank__c);
			tempObj.loser = row.CM_Losing_Player__r.Name;
			tempObj.losersRank = row.CM_Losing_Player_s_New_Rank__c;
			tempObj.loserOrdinal = h.getRankNumber(row.CM_Losing_Player_s_New_Rank__c);
			
			tempArray.push(tempObj);
		})
		return tempArray;
	}

	//? HANDLERS

    handleLeaderboardClick() {
        this.setNav('leaderboard');
    }

    handleTagChallengeClick() {
        this.setNav('tagChallenge');
	}

    handleTournamentsClick() {
        this.setNav('tournaments');
	}

	handleError(error) {
		console.error(error);
	}

	//? HELPER METHODS

	scrollToTop() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}	
}