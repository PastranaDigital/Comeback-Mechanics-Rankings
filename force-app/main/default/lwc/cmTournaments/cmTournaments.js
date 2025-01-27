import { LightningElement, api } from "lwc";
import * as h from "c/jsHelpers";

export default class CmTournaments extends LightningElement {
  _allTournamentResults;
  tournaments = [];

  @api
  set allTournamentResults(val) {
    this._allTournamentResults = val;
    console.log(
      "this._allTournamentResults: ",
      JSON.parse(JSON.stringify(this._allTournamentResults))
    );
    let grouped = h.groupBy(val, "CM_Tournament_Name__c");
    console.log("grouped: ", JSON.parse(JSON.stringify(grouped)));
    //? now that it is grouped by Tournament Name
    for (const [key, value] of Object.entries(grouped)) {
      let tempObj = {};

      //TODO add ordinal indicators
      //TODO make sure the order of the tournaments is calendar with newest at the top
      tempObj.Name = `${value[0].CM_Tournament__r.Name} ${value[0].CM_Tournament__r.CM_Tournament_Type__c} Tournament`;
      tempObj.LocationDetails = `${value[0].CM_Tournament__r.CM_Location__c} - ${value.length} Participants`;
      tempObj.results = value;

      this.tournaments.push(tempObj);
    }
    console.log("this.tournaments: ", JSON.stringify(this.tournaments));

    /*
		this.tournaments = [
			{
				Name: "August GLC Tournament",
				LocationDetails: "Boardwalk - 6 Participants",
				results: [
					{ "CM_Tournament__c": "a0O5e00000CTvMLEA1", "CM_Tournament_Standing__c": 1... },
					{ "CM_Tournament__c": "a0O5e00000CTvMLEA2", "CM_Tournament_Standing__c": 2... }
				]
			}
		]
		*/

    // grouped.forEach(row => {
    // 	let tempObj = {};

    // 	tempObj.Name = `${row.CM_Tournament__r.Name} ${row.CM_Tournament__r.CM_Tournament_Type__c} Tournament`;
    // 	tempObj.LocationDetails = `${row.CM_Tournament__r.CM_Location__c} - ${row?.results?.length()} Participants`;

    // 	this.tournaments.push(tempObj);
    // })
  }

  get allTournamentResults() {
    return this._allTournamentResults;
  }
}
