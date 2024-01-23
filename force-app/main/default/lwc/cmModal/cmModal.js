import { LightningElement, api } from "lwc";
import * as h from "c/jsHelpers";

export default class CmModal extends LightningElement {
  @api selectedPlayer;
  @api allTournamentResults;
  @api allTagChallenges;

  tournamentResults = [];
  noTournamentResults = false;

  challengeRecords = [];
  noChallengeRecords = true;

  connectedCallback() {
    console.log("selectedPlayer: ", JSON.stringify(this.selectedPlayer));
    console.log(
      "allTournamentResults: ",
      JSON.stringify(this.allTournamentResults)
    );
    console.log("allTagChallenges: ", JSON.stringify(this.allTagChallenges));
    this.processTournamentResults(this.allTournamentResults);
    this.processTagChallenges(this.allTagChallenges);
  }

  processTournamentResults(arr) {
    arr.forEach((el) => {
      if (el.CM_Player__r.Id === this.selectedPlayer.Id) {
        let obj = {};
        let ordinal = h.getRankNumber(el.CM_Tournament_Standing__c);
        obj.place = `${el.CM_Tournament_Standing__c}${ordinal}`;
        obj.record = el.CM_Record__c;
        obj.tournamentName = `${el.CM_Tournament_Name__c} ${el.CM_Tournament__r.CM_Tournament_Type__c}`;
        obj.deckType = el.CM_Deck_Used__c;
        this.tournamentResults.push(obj);
      }
    });
    if (this.tournamentResults.length === 0) {
      this.noTournamentResults = true;
    }
  }

  processTagChallenges(arr) {
    arr.forEach((el) => {
      if (
        el.winnerId === this.selectedPlayer.Id ||
        el.loserId === this.selectedPlayer.Id
      ) {
        let obj = {};
        obj.date = el.date;
        obj.result = `${el.winner} ${el.winnerEloString} d. ${el.loser} ${el.loserEloString}`;
        this.challengeRecords.push(obj);
      }
    });
    if (this.challengeRecords.length != 0) {
      this.noChallengeRecords = false;
      this.challengeRecords.splice(10); // trim to 10
    }
  }

  closeModal() {
    const closeEvent = new CustomEvent("closemodal", { detail: true });
    this.dispatchEvent(closeEvent);
  }
}
