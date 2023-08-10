import { LightningElement } from 'lwc';
import imageResource from '@salesforce/resourceUrl/CMImages';
import getViewModel from '@salesforce/apex/CM_Controller.getViewModel';
import { sortArray } from './helper.js';
export default class CmWrapper extends LightningElement {
	outboundModel = {};

	//? outgoing variables to child components
	allTournamentResults = [];
	
	loading = true;
	
    connectedCallback() {
		this.getModel();
		this.pokeball = imageResource + '/Images/PokeBall.png'
    }
	
	getModel() {
		console.log('getting model');
		this.loading = true;
		getViewModel()
			.then((result) => {
				console.log('ViewModel: ', result);
				this.outboundModel = Object.assign({}, result.outboundModel);
			})
			.catch((error) => {
				this.handleError(error);
			})
			.finally(() => {
				// this.buildAllTournamentResults(this.outboundModel.allTournamentResults);
				
				this.loading = false;
				this.setNav('leaderboard');
			});
	}

	headerTitle = '';
	showLeaderboardPage = false;
	showTagChallengePage = false;
	showTournamentsPage = false;
	pokeball;
	
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

    handleLeaderboardClick() {
        this.setNav('leaderboard');
    }

    handleTagChallengeClick() {
        this.setNav('tagChallenge');
	}

    handleTournamentsClick() {
        this.setNav('tournaments');
	}

	//? HELPER METHODS

	getRankNumber(incomingRank) {
        let RankNumber = incomingRank;
        let lastDigit = RankNumber % 10;
        let lastTwoDigits = RankNumber % 100;
        if(lastTwoDigits == 11 || lastTwoDigits == 12 || lastTwoDigits == 13 ) {
            lastDigit = 0;
        }
        switch (lastDigit) {
            case 1:
                RankNumber += 'st';
                break;
            case 2:
                RankNumber += 'nd';
                break;
            case 3:
                RankNumber += 'rd';
                break;
            default:
                RankNumber += 'th';
                break;
        }
        return RankNumber;
    }

	handleError(error) {
		console.error(error);
	}
	
    labels = {
        ComponentFooter: '2022 Vault',
    };
    
    img_logo = imageResource + '/Images/Comeback_Mechanics_logo.png';

	scrollToTop() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}
}