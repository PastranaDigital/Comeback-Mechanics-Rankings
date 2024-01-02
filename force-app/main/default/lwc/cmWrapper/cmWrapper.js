import { LightningElement } from "lwc";
import imageResource from "@salesforce/resourceUrl/CMImages";
import getViewModel from "@salesforce/apex/CM_Controller.getViewModel";
import * as h from "c/jsHelpers";
export default class CmWrapper extends LightningElement {
  outboundModel = {};

  //? outgoing variables to child components
  allPlayers = [];
  allPlayerOptions = [];
  allTagChallenges = [];
  allTournamentResults = [];
  metadataConstants;

  loading = true;

  headerTitle = "";
  showLeaderboardPage = false;
  showTagChallengePage = false;
  showTournamentsPage = false;
  pokeball;

  labels = {
    ComponentFooter: "2022 Vault"
  };

  img_logo = imageResource + "/Images/Comeback_Mechanics_logo.png";

  connectedCallback() {
    this.getModel();
    this.pokeball = imageResource + "/Images/PokeBall.png";
  }

  getModel() {
    console.log("getting model");
    this.loading = true;
    getViewModel()
      .then((result) => {
        // console.log('ViewModel: ', result);
        this.outboundModel = Object.assign({}, result.outboundModel);
        console.log("this.outboundModel: ", this.outboundModel);
      })
      .catch((error) => {
        this.handleError(error);
      })
      .finally(() => {
        // this.buildAllTournamentResults(this.outboundModel.allTournamentResults);
        this.allPlayers = this.buildAllPlayers(this.outboundModel.allPlayers);
        this.allPlayerOptions = this.buildAllPlayerOptions(
          this.outboundModel.allPlayers
        );
        this.allTagChallenges = this.buildAllTagChallenges(
          this.outboundModel.allTagChallenges
        );
        this.metadataConstants = this.outboundModel.metadataConstants[0];
        console.log("this.metadataConstants: ", this.metadataConstants);

        this.loading = false;
        this.setNav("leaderboard");
      });
  }

  setNav(string) {
    //? reset values
    this.headerTitle = "";
    this.showLeaderboardPage = false;
    this.showTagChallengePage = false;
    this.showTournamentsPage = false;

    //? simulated load for beter UX
    this.loading = true;
    const delay = setTimeout(() => {
      this.loading = false;
    }, 200);

    switch (string) {
      case "leaderboard":
        this.showLeaderboardPage = true;
        this.headerTitle = "GLC Leaderboard";
        break;
      case "tagChallenge":
        this.showTagChallengePage = true;
        this.headerTitle = "Ranked Match";
        break;
      case "tournaments":
        this.showTournamentsPage = true;
        this.headerTitle = "GLC Tournaments";
        break;
      default:
        this.showLeaderboardPage = true;
        this.headerTitle = "GLC Leaderboard";
    }
    this.showLeaderboardPage
      ? (this.leaderboardBtnClassList = "nav-btn active")
      : (this.leaderboardBtnClassList = "nav-btn");
    this.showTagChallengePage
      ? (this.tagChallengeBtnClassList = "nav-btn active")
      : (this.tagChallengeBtnClassList = "nav-btn");
    this.showTournamentsPage
      ? (this.tournamentsBtnClassList = "nav-btn active")
      : (this.tournamentsBtnClassList = "nav-btn");

    this.scrollToTop();
  }

  buildAllPlayers(arr) {
    let tempArray = [];
    arr.forEach((row, index) => {
      let tempObj = {};

      tempObj.Name = row.Name;
      tempObj.Id = row.Id;
      tempObj.CM_Avatar_File__c =
        imageResource + "/Images/" + row.CM_Avatar_File__c;
      tempObj.CM_Rank__c = index + 1;
      tempObj.CM_ELO_Rank__c = row.CM_ELO_Rank__c;
      tempObj.Ordinal = h.getRankNumber(tempObj.CM_Rank__c);

      tempArray.push(tempObj);
    });
    return tempArray;
  }

  buildAllPlayerOptions(arr) {
    if (!arr) return;
    let tempArray = [];
    arr.forEach((row) => {
      let tempObj = {};
      tempObj.label = row.Name;
      tempObj.value = row.Id;

      tempObj.Name = row.Name;
      tempObj.Id = row.Id;
      tempObj.CM_Avatar_File__c =
        imageResource + "/Images/" + row.CM_Avatar_File__c;
      tempObj.CM_Rank__c = row.CM_Rank__c;
      tempObj.CM_ELO_Rank__c = row.CM_ELO_Rank__c;
      tempObj.Ordinal = h.getRankNumber(row.CM_Rank__c);

      tempArray.push(tempObj);
    });
    h.sortArray(tempArray, "label");
    return tempArray;
  }

  buildAllTagChallenges(arr) {
    let tempArray = [];
    arr.forEach((row) => {
      let tempObj = {};

      tempObj.Id = row.Id;
      tempObj.date = this.flipDate(row.CM_Date_of_Event__c);
      tempObj.winner = row.CM_Winning_Player__r.Name;
      tempObj.winnerId = row.CM_Winning_Player__c;
      tempObj.winnersRank = row.CM_Winning_Player_s_New_Rank__c;
      tempObj.winnerOrdinal = h.getRankNumber(
        row.CM_Winning_Player_s_New_Rank__c
      );
      tempObj.loser = row.CM_Losing_Player__r.Name;
      tempObj.loserId = row.CM_Losing_Player__c;
      tempObj.losersRank = row.CM_Losing_Player_s_New_Rank__c;
      tempObj.loserOrdinal = h.getRankNumber(
        row.CM_Losing_Player_s_New_Rank__c
      );
      tempObj.CM_Defended_Tag__c = row.CM_Defended_Tag__c;

      //Elo strings

      tempObj.winnerEloString = `${row.CM_Winning_Player_s_Previous_Elo__c} (+${row.CM_Winning_Players_Elo_Change__c})`;
      tempObj.loserEloString = `${row.CM_Losing_Player_s_Previous_Elo__c} (${row.CM_Losing_Players_Elo_Change__c})`;

      tempArray.push(tempObj);
    });
    return tempArray;
  }

  //? HANDLERS

  handleLeaderboardClick() {
    this.setNav("leaderboard");
  }

  handleTagChallengeClick() {
    this.setNav("tagChallenge");
  }

  handleTournamentsClick() {
    this.setNav("tournaments");
  }

  handleError(error) {
    console.error(error);
  }

  //? HELPER METHODS

  flipDate(d) {
    //? incoming as 2023-08-12
    let dArray = d.split("-");
    return `${dArray[1]}/${dArray[2]}/${dArray[0]}`;
  }

  scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
}
