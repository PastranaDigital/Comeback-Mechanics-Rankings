import { LightningElement, api } from 'lwc';
import imageResource from '@salesforce/resourceUrl/CMImages';

export default class CmLeaderboard extends LightningElement {
	@api tournamentResults;

	connectedCallback() {
		this.avatar = imageResource + '/Images/default.png';
	}
}