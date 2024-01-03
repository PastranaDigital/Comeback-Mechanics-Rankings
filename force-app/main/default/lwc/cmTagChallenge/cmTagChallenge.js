import { LightningElement, api } from "lwc";
import createTagChallenge from "@salesforce/apex/CM_Controller.createTagChallenge";
import * as h from "c/jsHelpers";

export default class CmTagChallenge extends LightningElement {
  @api allPlayers;
  @api tagChallenges;
  @api metadataConstants;

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
  winnerResults = "";
  loserResults = "";
  loading = false;
  deactivateSubmit = true;
  showError = false;
  errorSubmitting = false;
  tagRecordWrapper = {
    // elo
    CM_Winning_Player_s_Previous_Elo__c: "",
    CM_Winning_Players_Elo_Change__c: "",
    CM_Losing_Player_s_Previous_Elo__c: "",
    CM_Losing_Players_Elo_Change__c: "",
    // other
    CM_Date_of_Event__c: "",
    CM_Winning_Player__c: "",
    CM_Winning_Player_s_New_Rank__c: "",
    CM_Losing_Player__c: "",
    CM_Losing_Player_s_New_Rank__c: "",
    CM_Defended_Tag__c: false
  };

  receipt = {
    winningPlayerId: "",
    winningPlayerEloChange: 0.0,
    losingPlayerId: "",
    losingPlayerEloChange: 0.0
  };

  /*
  public class Receipt {
    @AuraEnabled
    public String winningPlayerId;
    @AuraEnabled
    public String winningPlayerEloChange;
    @AuraEnabled
    public String losingPlayerId;
    @AuraEnabled
    public String losingPlayerEloChange;
  }
  */

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
    console.log("this.allPlayers.length: ", this.allPlayers.length);
    console.log(
      "this.allPlayers: ",
      JSON.parse(JSON.stringify(this.allPlayers))
    );
    this.todaysDate = new Date();
    console.log("this.tagChallenges: ", this.tagChallenges);
    this.tagRecordWrapper.CM_Date_of_Event__c = this.todaysDate;
  }

  getButtonState() {
    if (!this.winnerResults || !this.loserResults) return true;
    return false;
  }

  getFullPlayerInfo(id) {
    return this.allPlayers.find((row) => row.Id == id);
  }

  checkIfSamePlayer() {
    if (
      this.tagRecordWrapper.CM_Winning_Player__c ==
      this.tagRecordWrapper.CM_Losing_Player__c
    ) {
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
    this.tagRecordWrapper.CM_Winning_Player_s_Previous_Elo__c =
      playerObj.CM_ELO_Rank__c;

    this.winnerResults = `${playerObj.Name} was ${playerObj.CM_ELO_Rank__c}`;
    console.log(
      "this.tagRecordWrapper: ",
      JSON.stringify(this.tagRecordWrapper)
    );
    this.deactivateSubmit = this.getButtonState();
    this.checkIfSamePlayer();
  }

  handleLoserPlayerChange(event) {
    let playerObj = {};
    playerObj = this.getFullPlayerInfo(event.detail.value);
    this.tagRecordWrapper.CM_Losing_Player__c = playerObj.Id;
    this.tagRecordWrapper.CM_Winning_Player_s_New_Rank__c =
      playerObj.CM_Rank__c;
    this.tagRecordWrapper.CM_Losing_Player_s_Previous_Elo__c =
      playerObj.CM_ELO_Rank__c;

    this.loserResults = `${playerObj.Name} was ${playerObj.CM_ELO_Rank__c}`;
    console.log(
      "this.tagRecordWrapper: ",
      JSON.stringify(this.tagRecordWrapper)
    );
    this.deactivateSubmit = this.getButtonState();
    this.checkIfSamePlayer();
  }

  handleSubmitClick() {
    this.deactivateSubmit = true;
    this.loading = true;
    this.checkRanksForPlayers();
    let expectedValues = this.calculateExpected(
      this.tagRecordWrapper.CM_Winning_Player_s_Previous_Elo__c,
      this.tagRecordWrapper.CM_Losing_Player_s_Previous_Elo__c
    );
    this.tagRecordWrapper.CM_Winning_Players_Elo_Change__c =
      this.calculateEloChange(1, expectedValues.winner);
    this.tagRecordWrapper.CM_Losing_Players_Elo_Change__c =
      this.calculateEloChange(0, expectedValues.loser);

    this.receipt.winningPlayerId = this.tagRecordWrapper.CM_Winning_Player__c;
    this.receipt.winningPlayerEloChange =
      this.tagRecordWrapper.CM_Winning_Players_Elo_Change__c;
    this.receipt.losingPlayerId = this.tagRecordWrapper.CM_Losing_Player__c;
    this.receipt.losingPlayerEloChange =
      this.tagRecordWrapper.CM_Losing_Players_Elo_Change__c;
    console.log("this.receipt: ", JSON.stringify(this.receipt));

    createTagChallenge({ tc: this.tagRecordWrapper, r: this.receipt })
      .then((result) => {
        this.message = result;
        this.error = undefined;
        this.scoreSubmitted = true;
        // console.log(JSON.stringify(result));
        console.log("result: ", this.message);
        // this.refreshScores();
      })
      .catch((error) => {
        this.message = undefined;
        this.error = error;
        this.errorSubmitting = true;
        console.error("error", JSON.stringify(this.error));
      })
      .finally(() => {
        this.refreshScores();
      });
  }

  checkRanksForPlayers() {
    //? winners new rank should be less than the losers new rank
    let wRank = this.tagRecordWrapper.CM_Winning_Player_s_New_Rank__c;
    let lRank = this.tagRecordWrapper.CM_Losing_Player_s_New_Rank__c;

    if (wRank > lRank) {
      this.tagRecordWrapper.CM_Winning_Player_s_New_Rank__c = lRank;
      this.tagRecordWrapper.CM_Losing_Player_s_New_Rank__c = wRank;
      this.tagRecordWrapper.CM_Defended_Tag__c = true;
    }
  }

  expectedFormula(a, b) {
    console.log("a: ", a);
    console.log("b: ", b);
    let exp = 1 / (1 + 10 ** ((b - a) / 400));
    console.log("exp: ", exp);
    return exp;
  }

  calculateExpected(winner, loser) {
    console.log("calculateExpected winner: ", winner);
    console.log("calculateExpected loser: ", loser);
    let obj = {
      winner: { elo: winner, expected: 0.0 },
      loser: { elo: loser, expected: 0.0 }
    };
    obj.winner.expected = this.expectedFormula(winner, loser);
    console.log("obj.winner.expected: ", obj.winner.expected);
    obj.loser.expected = this.expectedFormula(loser, winner);
    console.log("obj.loser.expected: ", obj.loser.expected);
    return obj;
  }

  calculateEloChange(winValue, eloDetails) {
    return Math.round(
      this.metadataConstants.K_Value__c * (winValue - eloDetails.expected)
    );
  }

  refreshScores() {
    const custEvent1 = new CustomEvent("callscrolltotop", {
      detail: "payload"
    });
    this.dispatchEvent(custEvent1);
    this.delay(2500).then(() => {
      this.loading = false;
      console.log("refreshing to Parent...");

      const custEvent2 = new CustomEvent("callgetmodel", {
        detail: "payload"
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
    return new Promise((resolve) => setTimeout(resolve, time));
  }
}
