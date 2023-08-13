import { LightningElement, api } from 'lwc';
// import imageResource from '@salesforce/resourceUrl/CMImages';

export default class CmLeaderboard extends LightningElement {
	@api allPlayers;

	// connectedCallback() {
	// 	this.avatar = imageResource + '/Images/default.png';
	// }

	handleModal(event) {
		console.log('event: ', JSON.parse(JSON.stringify(event)));
	}
}