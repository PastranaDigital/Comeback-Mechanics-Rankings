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

  tournaments = [
    {
      Name: "August GLC Tournament",
      LocationDetails: "Boardwalk - 6 Participants",
      results: [
        {
          CM_Tournament__c: "a0O5e00000CTvMLEA1",
          CM_Tournament_Standing__c: 1,
          CM_Tournament__r: {
            Id: "a0O5e00000CTvMLEA1",
            CM_Date_of_Event__c: "2023-08-08",
            CM_Tournament_Type__c: "GLC",
            Name: "August",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "August",
          CreatedDate: "2023-08-09T22:40:29.000Z",
          CM_Player__r: { Name: "Garrett", Id: "a0M5e000004gn5DEAQ" },
          Id: "a0N5e0000055JVOEA2",
          CM_Player__c: "a0M5e000004gn5DEAQ",
          CM_Record__c: "3-0-0",
          CM_Deck_Used__c: "Lightning"
        },
        {
          CM_Tournament__c: "a0O5e00000CTvMLEA1",
          CM_Tournament_Standing__c: 2,
          CM_Tournament__r: {
            Id: "a0O5e00000CTvMLEA1",
            CM_Date_of_Event__c: "2023-08-08",
            CM_Tournament_Type__c: "GLC",
            Name: "August",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "August",
          CreatedDate: "2023-08-09T22:42:39.000Z",
          CM_Player__r: { Name: "Mathew B", Id: "a0M5e000004gn5IEAQ" },
          Id: "a0N5e0000055JVTEA2",
          CM_Player__c: "a0M5e000004gn5IEAQ",
          CM_Record__c: "2-1-0",
          CM_Deck_Used__c: "Tanky Metal"
        },
        {
          CM_Tournament__c: "a0O5e00000CTvMLEA1",
          CM_Tournament_Standing__c: 3,
          CM_Tournament__r: {
            Id: "a0O5e00000CTvMLEA1",
            CM_Date_of_Event__c: "2023-08-08",
            CM_Tournament_Type__c: "GLC",
            Name: "August",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "August",
          CreatedDate: "2023-08-09T22:43:01.000Z",
          CM_Player__r: { Name: "Alan", Id: "a0M5e000004gn5NEAQ" },
          Id: "a0N5e0000055JVUEA2",
          CM_Player__c: "a0M5e000004gn5NEAQ",
          CM_Record__c: "2-1-0",
          CM_Deck_Used__c: "Grass"
        },
        {
          CM_Tournament__c: "a0O5e00000CTvMLEA1",
          CM_Tournament_Standing__c: 4,
          CM_Tournament__r: {
            Id: "a0O5e00000CTvMLEA1",
            CM_Date_of_Event__c: "2023-08-08",
            CM_Tournament_Type__c: "GLC",
            Name: "August",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "August",
          CreatedDate: "2023-08-09T22:43:27.000Z",
          CM_Player__r: { Name: "Maverick", Id: "a0M5e000004gfGsEAI" },
          Id: "a0N5e0000055JVYEA2",
          CM_Player__c: "a0M5e000004gfGsEAI",
          CM_Record__c: "1-2-0",
          CM_Deck_Used__c: "Turbo Dark"
        },
        {
          CM_Tournament__c: "a0O5e00000CTvMLEA1",
          CM_Tournament_Standing__c: 5,
          CM_Tournament__r: {
            Id: "a0O5e00000CTvMLEA1",
            CM_Date_of_Event__c: "2023-08-08",
            CM_Tournament_Type__c: "GLC",
            Name: "August",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "August",
          CreatedDate: "2023-08-09T22:45:46.000Z",
          CM_Player__r: { Name: "Omar", Id: "a0M5e000004gn5SEAQ" },
          Id: "a0N5e0000055JVVEA2",
          CM_Player__c: "a0M5e000004gn5SEAQ",
          CM_Record__c: "1-2-0",
          CM_Deck_Used__c: "Grass"
        },
        {
          CM_Tournament__c: "a0O5e00000CTvMLEA1",
          CM_Tournament_Standing__c: 6,
          CM_Tournament__r: {
            Id: "a0O5e00000CTvMLEA1",
            CM_Date_of_Event__c: "2023-08-08",
            CM_Tournament_Type__c: "GLC",
            Name: "August",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "August",
          CreatedDate: "2023-08-09T22:46:45.000Z",
          CM_Player__r: { Name: "Chris", Id: "a0M5e000004gn5XEAQ" },
          Id: "a0N5e0000055JVWEA2",
          CM_Player__c: "a0M5e000004gn5XEAQ",
          CM_Record__c: "0-3-0",
          CM_Deck_Used__c: "Dragon"
        }
      ]
    },
    {
      Name: "September GLC Tournament",
      LocationDetails: "Boardwalk - 8 Participants",
      results: [
        {
          CM_Tournament__c: "a0O5e00000CU4H0EAL",
          CM_Tournament_Standing__c: 1,
          CM_Tournament__r: {
            Id: "a0O5e00000CU4H0EAL",
            CM_Date_of_Event__c: "2023-09-05",
            CM_Tournament_Type__c: "GLC",
            Name: "September",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "September",
          CreatedDate: "2023-09-19T19:29:39.000Z",
          CM_Player__r: { Name: "Kiet", Id: "a0M5e000004gpJxEAI" },
          Id: "a0N5e0000055RLUEA2",
          CM_Player__c: "a0M5e000004gpJxEAI",
          CM_Record__c: "6-1-0",
          CM_Deck_Used__c: "Dark"
        },
        {
          CM_Tournament__c: "a0O5e00000CU4H0EAL",
          CM_Tournament_Standing__c: 2,
          CM_Tournament__r: {
            Id: "a0O5e00000CU4H0EAL",
            CM_Date_of_Event__c: "2023-09-05",
            CM_Tournament_Type__c: "GLC",
            Name: "September",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "September",
          CreatedDate: "2023-09-19T19:30:22.000Z",
          CM_Player__r: { Name: "Maverick", Id: "a0M5e000004gfGsEAI" },
          Id: "a0N5e0000055RLZEA2",
          CM_Player__c: "a0M5e000004gfGsEAI",
          CM_Record__c: "3-2-0",
          CM_Deck_Used__c: "Turbo Dark"
        },
        {
          CM_Tournament__c: "a0O5e00000CU4H0EAL",
          CM_Tournament_Standing__c: 3,
          CM_Tournament__r: {
            Id: "a0O5e00000CU4H0EAL",
            CM_Date_of_Event__c: "2023-09-05",
            CM_Tournament_Type__c: "GLC",
            Name: "September",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "September",
          CreatedDate: "2023-09-19T19:30:44.000Z",
          CM_Player__r: { Name: "Mathew B", Id: "a0M5e000004gn5IEAQ" },
          Id: "a0N5e0000055RLeEAM",
          CM_Player__c: "a0M5e000004gn5IEAQ",
          CM_Record__c: "2-2-0",
          CM_Deck_Used__c: "Psychic"
        },
        {
          CM_Tournament__c: "a0O5e00000CU4H0EAL",
          CM_Tournament_Standing__c: 4,
          CM_Tournament__r: {
            Id: "a0O5e00000CU4H0EAL",
            CM_Date_of_Event__c: "2023-09-05",
            CM_Tournament_Type__c: "GLC",
            Name: "September",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "September",
          CreatedDate: "2023-09-19T19:31:06.000Z",
          CM_Player__r: { Name: "Alan", Id: "a0M5e000004gn5NEAQ" },
          Id: "a0N5e0000055RLjEAM",
          CM_Player__c: "a0M5e000004gn5NEAQ",
          CM_Record__c: "2-2-0",
          CM_Deck_Used__c: "Fire"
        },
        {
          CM_Tournament__c: "a0O5e00000CU4H0EAL",
          CM_Tournament_Standing__c: 5,
          CM_Tournament__r: {
            Id: "a0O5e00000CU4H0EAL",
            CM_Date_of_Event__c: "2023-09-05",
            CM_Tournament_Type__c: "GLC",
            Name: "September",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "September",
          CreatedDate: "2023-09-19T19:32:10.000Z",
          CM_Player__r: { Name: "Chris", Id: "a0M5e000004gn5XEAQ" },
          Id: "a0N5e0000055RLoEAM",
          CM_Player__c: "a0M5e000004gn5XEAQ",
          CM_Record__c: "1-2-0",
          CM_Deck_Used__c: "Fire Mill"
        },
        {
          CM_Tournament__c: "a0O5e00000CU4H0EAL",
          CM_Tournament_Standing__c: 5,
          CM_Tournament__r: {
            Id: "a0O5e00000CU4H0EAL",
            CM_Date_of_Event__c: "2023-09-05",
            CM_Tournament_Type__c: "GLC",
            Name: "September",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "September",
          CreatedDate: "2023-09-19T19:31:48.000Z",
          CM_Player__r: { Name: "Christine", Id: "a0M5e000004gqb4EAA" },
          Id: "a0N5e0000055RLaEAM",
          CM_Player__c: "a0M5e000004gqb4EAA",
          CM_Record__c: "1-2-0",
          CM_Deck_Used__c: "Colorless Control"
        },
        {
          CM_Tournament__c: "a0O5e00000CU4H0EAL",
          CM_Tournament_Standing__c: 7,
          CM_Tournament__r: {
            Id: "a0O5e00000CU4H0EAL",
            CM_Date_of_Event__c: "2023-09-05",
            CM_Tournament_Type__c: "GLC",
            Name: "September",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "September",
          CreatedDate: "2023-09-19T19:33:02.000Z",
          CM_Player__r: { Name: "Garrett", Id: "a0M5e000004gn5DEAQ" },
          Id: "a0N5e0000055RLtEAM",
          CM_Player__c: "a0M5e000004gn5DEAQ",
          CM_Record__c: "0-2-0",
          CM_Deck_Used__c: "Lightning"
        },
        {
          CM_Tournament__c: "a0O5e00000CU4H0EAL",
          CM_Tournament_Standing__c: 7,
          CM_Tournament__r: {
            Id: "a0O5e00000CU4H0EAL",
            CM_Date_of_Event__c: "2023-09-05",
            CM_Tournament_Type__c: "GLC",
            Name: "September",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "September",
          CreatedDate: "2023-09-19T19:32:39.000Z",
          CM_Player__r: { Name: "Meryl", Id: "a0M5e000004gqsqEAA" },
          Id: "a0N5e0000055RLkEAM",
          CM_Player__c: "a0M5e000004gqsqEAA",
          CM_Record__c: "0-2-0",
          CM_Deck_Used__c: "Dragon"
        }
      ]
    },
    {
      Name: "October GLC Tournament",
      LocationDetails: "Boardwalk - 6 Participants",
      results: [
        {
          CM_Tournament__c: "a0O5e00000CrC9NEAV",
          CM_Tournament_Standing__c: 1,
          CM_Tournament__r: {
            Id: "a0O5e00000CrC9NEAV",
            CM_Date_of_Event__c: "2023-10-03",
            CM_Tournament_Type__c: "GLC",
            Name: "October",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "October",
          CreatedDate: "2023-11-07T03:14:23.000Z",
          CM_Player__r: { Name: "Garrett", Id: "a0M5e000004gn5DEAQ" },
          Id: "a0N5e000004CivZEAS",
          CM_Player__c: "a0M5e000004gn5DEAQ",
          CM_Record__c: "2-1-0",
          CM_Deck_Used__c: "Earthquake Fighting"
        },
        {
          CM_Tournament__c: "a0O5e00000CrC9NEAV",
          CM_Tournament_Standing__c: 2,
          CM_Tournament__r: {
            Id: "a0O5e00000CrC9NEAV",
            CM_Date_of_Event__c: "2023-10-03",
            CM_Tournament_Type__c: "GLC",
            Name: "October",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "October",
          CreatedDate: "2023-11-07T03:14:48.000Z",
          CM_Player__r: { Name: "Christine", Id: "a0M5e000004gqb4EAA" },
          Id: "a0N5e000004CiveEAC",
          CM_Player__c: "a0M5e000004gqb4EAA",
          CM_Record__c: "2-1-0",
          CM_Deck_Used__c: "Colorless Control"
        },
        {
          CM_Tournament__c: "a0O5e00000CrC9NEAV",
          CM_Tournament_Standing__c: 3,
          CM_Tournament__r: {
            Id: "a0O5e00000CrC9NEAV",
            CM_Date_of_Event__c: "2023-10-03",
            CM_Tournament_Type__c: "GLC",
            Name: "October",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "October",
          CreatedDate: "2023-11-07T03:15:39.000Z",
          CM_Player__r: { Name: "Maverick", Id: "a0M5e000004gfGsEAI" },
          Id: "a0N5e000004CivfEAC",
          CM_Player__c: "a0M5e000004gfGsEAI",
          CM_Record__c: "2-1-0",
          CM_Deck_Used__c: "Turbo Dark"
        },
        {
          CM_Tournament__c: "a0O5e00000CrC9NEAV",
          CM_Tournament_Standing__c: 4,
          CM_Tournament__r: {
            Id: "a0O5e00000CrC9NEAV",
            CM_Date_of_Event__c: "2023-10-03",
            CM_Tournament_Type__c: "GLC",
            Name: "October",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "October",
          CreatedDate: "2023-11-07T03:23:09.000Z",
          CM_Player__r: { Name: "Chris", Id: "a0M5e000004gn5XEAQ" },
          Id: "a0N5e000004CivjEAC",
          CM_Player__c: "a0M5e000004gn5XEAQ",
          CM_Record__c: "1-2-0",
          CM_Deck_Used__c: "Turbo Fairy"
        },
        {
          CM_Tournament__c: "a0O5e00000CrC9NEAV",
          CM_Tournament_Standing__c: 5,
          CM_Tournament__r: {
            Id: "a0O5e00000CrC9NEAV",
            CM_Date_of_Event__c: "2023-10-03",
            CM_Tournament_Type__c: "GLC",
            Name: "October",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "October",
          CreatedDate: "2023-11-07T03:23:48.000Z",
          CM_Player__r: { Name: "Stelly", Id: "a0M5e000004gty2EAA" },
          Id: "a0N5e000004CivoEAC",
          CM_Player__c: "a0M5e000004gty2EAA",
          CM_Record__c: "2-1-0",
          CM_Deck_Used__c: "Fossil Lock Fighting"
        },
        {
          CM_Tournament__c: "a0O5e00000CrC9NEAV",
          CM_Tournament_Standing__c: 6,
          CM_Tournament__r: {
            Id: "a0O5e00000CrC9NEAV",
            CM_Date_of_Event__c: "2023-10-03",
            CM_Tournament_Type__c: "GLC",
            Name: "October",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "October",
          CreatedDate: "2023-11-07T03:24:53.000Z",
          CM_Player__r: { Name: "Will", Id: "a0M5e000003dRzEEAU" },
          Id: "a0N5e000004CivtEAC",
          CM_Player__c: "a0M5e000003dRzEEAU",
          CM_Record__c: "0-3-0",
          CM_Deck_Used__c: "Psychic"
        }
      ]
    },
    {
      Name: "November GLC Tournament",
      LocationDetails: "Boardwalk - 13 Participants",
      results: [
        {
          CM_Tournament__c: "a0O5e00001WLC9KEAX",
          CM_Tournament_Standing__c: 1,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9KEAX",
            CM_Date_of_Event__c: "2023-11-07",
            CM_Tournament_Type__c: "GLC",
            Name: "November",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "November",
          CreatedDate: "2024-01-02T19:14:23.000Z",
          CM_Player__r: { Name: "Mathew B", Id: "a0M5e000004gn5IEAQ" },
          Id: "a0N5e000004ClriEAC",
          CM_Player__c: "a0M5e000004gn5IEAQ",
          CM_Record__c: "4-0-0",
          CM_Deck_Used__c: "Psychic Spread"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9KEAX",
          CM_Tournament_Standing__c: 2,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9KEAX",
            CM_Date_of_Event__c: "2023-11-07",
            CM_Tournament_Type__c: "GLC",
            Name: "November",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "November",
          CreatedDate: "2024-01-02T19:14:23.000Z",
          CM_Player__r: { Name: "Alan", Id: "a0M5e000004gn5NEAQ" },
          Id: "a0N5e000004ClrjEAC",
          CM_Player__c: "a0M5e000004gn5NEAQ",
          CM_Record__c: "3-1-0",
          CM_Deck_Used__c: "Water"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9KEAX",
          CM_Tournament_Standing__c: 3,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9KEAX",
            CM_Date_of_Event__c: "2023-11-07",
            CM_Tournament_Type__c: "GLC",
            Name: "November",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "November",
          CreatedDate: "2024-01-02T19:14:23.000Z",
          CM_Player__r: { Name: "Sam", Id: "a0M5e000003du1SEAQ" },
          Id: "a0N5e000004ClrkEAC",
          CM_Player__c: "a0M5e000003du1SEAQ",
          CM_Record__c: "3-1-0",
          CM_Deck_Used__c: "Lightning"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9KEAX",
          CM_Tournament_Standing__c: 4,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9KEAX",
            CM_Date_of_Event__c: "2023-11-07",
            CM_Tournament_Type__c: "GLC",
            Name: "November",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "November",
          CreatedDate: "2024-01-02T19:14:23.000Z",
          CM_Player__r: { Name: "Rebecca", Id: "a0M5e000004gpClEAI" },
          Id: "a0N5e000004ClrlEAC",
          CM_Player__c: "a0M5e000004gpClEAI",
          CM_Record__c: "2-2-0",
          CM_Deck_Used__c: "Fire"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9KEAX",
          CM_Tournament_Standing__c: 5,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9KEAX",
            CM_Date_of_Event__c: "2023-11-07",
            CM_Tournament_Type__c: "GLC",
            Name: "November",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "November",
          CreatedDate: "2024-01-02T19:14:23.000Z",
          CM_Player__r: { Name: "Garrett", Id: "a0M5e000004gn5DEAQ" },
          Id: "a0N5e000004ClrmEAC",
          CM_Player__c: "a0M5e000004gn5DEAQ",
          CM_Record__c: "2-2-0",
          CM_Deck_Used__c: "Lightning"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9KEAX",
          CM_Tournament_Standing__c: 6,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9KEAX",
            CM_Date_of_Event__c: "2023-11-07",
            CM_Tournament_Type__c: "GLC",
            Name: "November",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "November",
          CreatedDate: "2024-01-02T19:14:23.000Z",
          CM_Player__r: { Name: "Cody", Id: "a0M5e000004gpCgEAI" },
          Id: "a0N5e000004ClrnEAC",
          CM_Player__c: "a0M5e000004gpCgEAI",
          CM_Record__c: "2-2-0",
          CM_Deck_Used__c: "Metal"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9KEAX",
          CM_Tournament_Standing__c: 7,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9KEAX",
            CM_Date_of_Event__c: "2023-11-07",
            CM_Tournament_Type__c: "GLC",
            Name: "November",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "November",
          CreatedDate: "2024-01-02T19:14:23.000Z",
          CM_Player__r: { Name: "Kiet", Id: "a0M5e000004gpJxEAI" },
          Id: "a0N5e000004ClroEAC",
          CM_Player__c: "a0M5e000004gpJxEAI",
          CM_Record__c: "2-2-0",
          CM_Deck_Used__c: "Turbo Dark"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9KEAX",
          CM_Tournament_Standing__c: 8,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9KEAX",
            CM_Date_of_Event__c: "2023-11-07",
            CM_Tournament_Type__c: "GLC",
            Name: "November",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "November",
          CreatedDate: "2024-01-02T19:14:23.000Z",
          CM_Player__r: { Name: "Maverick", Id: "a0M5e000004gfGsEAI" },
          Id: "a0N5e000004ClrpEAC",
          CM_Player__c: "a0M5e000004gfGsEAI",
          CM_Record__c: "2-2-0",
          CM_Deck_Used__c: "Turbo Dark"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9KEAX",
          CM_Tournament_Standing__c: 9,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9KEAX",
            CM_Date_of_Event__c: "2023-11-07",
            CM_Tournament_Type__c: "GLC",
            Name: "November",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "November",
          CreatedDate: "2024-01-02T19:14:23.000Z",
          CM_Player__r: { Name: "Matty", Id: "a0M5e000004gqxVEAQ" },
          Id: "a0N5e000004ClrqEAC",
          CM_Player__c: "a0M5e000004gqxVEAQ",
          CM_Record__c: "2-2-0",
          CM_Deck_Used__c: "Metal"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9KEAX",
          CM_Tournament_Standing__c: 10,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9KEAX",
            CM_Date_of_Event__c: "2023-11-07",
            CM_Tournament_Type__c: "GLC",
            Name: "November",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "November",
          CreatedDate: "2024-01-02T19:14:23.000Z",
          CM_Player__r: { Name: "Mark", Id: "a0M5e000003dtyTEAQ" },
          Id: "a0N5e000004ClrrEAC",
          CM_Player__c: "a0M5e000003dtyTEAQ",
          CM_Record__c: "1-3-0",
          CM_Deck_Used__c: "Water"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9KEAX",
          CM_Tournament_Standing__c: 11,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9KEAX",
            CM_Date_of_Event__c: "2023-11-07",
            CM_Tournament_Type__c: "GLC",
            Name: "November",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "November",
          CreatedDate: "2024-01-02T19:14:23.000Z",
          CM_Player__r: { Name: "Kelsey", Id: "a0M5e000004h8rkEAA" },
          Id: "a0N5e000004ClrsEAC",
          CM_Player__c: "a0M5e000004h8rkEAA",
          CM_Record__c: "1-3-0",
          CM_Deck_Used__c: "Water"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9KEAX",
          CM_Tournament_Standing__c: 12,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9KEAX",
            CM_Date_of_Event__c: "2023-11-07",
            CM_Tournament_Type__c: "GLC",
            Name: "November",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "November",
          CreatedDate: "2024-01-02T19:14:23.000Z",
          CM_Player__r: { Name: "Chris", Id: "a0M5e000004gn5XEAQ" },
          Id: "a0N5e000004ClrtEAC",
          CM_Player__c: "a0M5e000004gn5XEAQ",
          CM_Record__c: "0-4-0",
          CM_Deck_Used__c: "Psychic Hand Lock"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9KEAX",
          CM_Tournament_Standing__c: 13,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9KEAX",
            CM_Date_of_Event__c: "2023-11-07",
            CM_Tournament_Type__c: "GLC",
            Name: "November",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "November",
          CreatedDate: "2024-01-02T19:14:23.000Z",
          CM_Player__r: { Name: "Omar", Id: "a0M5e000004gn5SEAQ" },
          Id: "a0N5e000004ClruEAC",
          CM_Player__c: "a0M5e000004gn5SEAQ",
          CM_Record__c: "0-4-0",
          CM_Deck_Used__c: "Psychic Lost Zone"
        }
      ]
    },
    {
      Name: "December GLC Tournament",
      LocationDetails: "Boardwalk - 10 Participants",
      results: [
        {
          CM_Tournament__c: "a0O5e00001WLC9PEAX",
          CM_Tournament_Standing__c: 1,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9PEAX",
            CM_Date_of_Event__c: "2023-12-05",
            CM_Tournament_Type__c: "GLC",
            Name: "December",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "December",
          CreatedDate: "2024-01-02T19:04:55.000Z",
          CM_Player__r: { Name: "Chris", Id: "a0M5e000004gn5XEAQ" },
          Id: "a0N5e000004ClrYEAS",
          CM_Player__c: "a0M5e000004gn5XEAQ",
          CM_Record__c: "3-0-0",
          CM_Deck_Used__c: "Tanky Metal"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9PEAX",
          CM_Tournament_Standing__c: 2,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9PEAX",
            CM_Date_of_Event__c: "2023-12-05",
            CM_Tournament_Type__c: "GLC",
            Name: "December",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "December",
          CreatedDate: "2024-01-02T19:04:55.000Z",
          CM_Player__r: { Name: "Sam", Id: "a0M5e000003du1SEAQ" },
          Id: "a0N5e000004ClrZEAS",
          CM_Player__c: "a0M5e000003du1SEAQ",
          CM_Record__c: "2-1-0",
          CM_Deck_Used__c: "Grass Spread"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9PEAX",
          CM_Tournament_Standing__c: 3,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9PEAX",
            CM_Date_of_Event__c: "2023-12-05",
            CM_Tournament_Type__c: "GLC",
            Name: "December",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "December",
          CreatedDate: "2024-01-02T19:04:55.000Z",
          CM_Player__r: { Name: "Mathew B", Id: "a0M5e000004gn5IEAQ" },
          Id: "a0N5e000004ClraEAC",
          CM_Player__c: "a0M5e000004gn5IEAQ",
          CM_Record__c: "2-1-0",
          CM_Deck_Used__c: "Tanky Grass"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9PEAX",
          CM_Tournament_Standing__c: 4,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9PEAX",
            CM_Date_of_Event__c: "2023-12-05",
            CM_Tournament_Type__c: "GLC",
            Name: "December",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "December",
          CreatedDate: "2024-01-02T19:04:55.000Z",
          CM_Player__r: { Name: "Connor", Id: "a0M5e000003du1YEAQ" },
          Id: "a0N5e000004ClrbEAC",
          CM_Player__c: "a0M5e000003du1YEAQ",
          CM_Record__c: "2-1-0",
          CM_Deck_Used__c: "Psychic Spread"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9PEAX",
          CM_Tournament_Standing__c: 5,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9PEAX",
            CM_Date_of_Event__c: "2023-12-05",
            CM_Tournament_Type__c: "GLC",
            Name: "December",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "December",
          CreatedDate: "2024-01-02T19:04:55.000Z",
          CM_Player__r: { Name: "Kelsey", Id: "a0M5e000004h8rkEAA" },
          Id: "a0N5e000004ClrcEAC",
          CM_Player__c: "a0M5e000004h8rkEAA",
          CM_Record__c: "2-1-0",
          CM_Deck_Used__c: "Dark Poison"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9PEAX",
          CM_Tournament_Standing__c: 6,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9PEAX",
            CM_Date_of_Event__c: "2023-12-05",
            CM_Tournament_Type__c: "GLC",
            Name: "December",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "December",
          CreatedDate: "2024-01-02T19:04:55.000Z",
          CM_Player__r: { Name: "Sage", Id: "a0M5e000003du1XEAQ" },
          Id: "a0N5e000004ClrdEAC",
          CM_Player__c: "a0M5e000003du1XEAQ",
          CM_Record__c: "1-2-0",
          CM_Deck_Used__c: "Turbo Dark"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9PEAX",
          CM_Tournament_Standing__c: 7,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9PEAX",
            CM_Date_of_Event__c: "2023-12-05",
            CM_Tournament_Type__c: "GLC",
            Name: "December",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "December",
          CreatedDate: "2024-01-02T19:04:55.000Z",
          CM_Player__r: { Name: "Alan", Id: "a0M5e000004gn5NEAQ" },
          Id: "a0N5e000004ClreEAC",
          CM_Player__c: "a0M5e000004gn5NEAQ",
          CM_Record__c: "1-2-0",
          CM_Deck_Used__c: "Water"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9PEAX",
          CM_Tournament_Standing__c: 8,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9PEAX",
            CM_Date_of_Event__c: "2023-12-05",
            CM_Tournament_Type__c: "GLC",
            Name: "December",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "December",
          CreatedDate: "2024-01-02T19:04:55.000Z",
          CM_Player__r: { Name: "Matty", Id: "a0M5e000004gqxVEAQ" },
          Id: "a0N5e000004ClrfEAC",
          CM_Player__c: "a0M5e000004gqxVEAQ",
          CM_Record__c: "1-2-0",
          CM_Deck_Used__c: "Grass"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9PEAX",
          CM_Tournament_Standing__c: 9,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9PEAX",
            CM_Date_of_Event__c: "2023-12-05",
            CM_Tournament_Type__c: "GLC",
            Name: "December",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "December",
          CreatedDate: "2024-01-02T19:04:55.000Z",
          CM_Player__r: { Name: "Alex", Id: "a0M5e000003dtfREAQ" },
          Id: "a0N5e000004ClrgEAC",
          CM_Player__c: "a0M5e000003dtfREAQ",
          CM_Record__c: "1-2-0",
          CM_Deck_Used__c: "Grass"
        },
        {
          CM_Tournament__c: "a0O5e00001WLC9PEAX",
          CM_Tournament_Standing__c: 10,
          CM_Tournament__r: {
            Id: "a0O5e00001WLC9PEAX",
            CM_Date_of_Event__c: "2023-12-05",
            CM_Tournament_Type__c: "GLC",
            Name: "December",
            CM_Location__c: "Boardwalk"
          },
          CM_Tournament_Name__c: "December",
          CreatedDate: "2024-01-02T19:04:55.000Z",
          CM_Player__r: { Name: "Garrett", Id: "a0M5e000004gn5DEAQ" },
          Id: "a0N5e000004ClrhEAC",
          CM_Player__c: "a0M5e000004gn5DEAQ",
          CM_Record__c: "0-3-0",
          CM_Deck_Used__c: "Lightning"
        }
      ]
    }
  ];
}
