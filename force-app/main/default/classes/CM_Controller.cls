public without sharing class CM_Controller {
  @AuraEnabled
  public static CM_Tag_Challenge__c createTagChallenge(
    CM_Tag_Challenge__c tc,
    Receipt r
  ) {
    System.debug('tc::: ' + JSON.serializePretty(tc));
    System.debug('r::: ' + JSON.serializePretty(r));
    // CM_Tag_Challenge__c tag = new CM_Tag_Challenge__c(
    // 	CM_Date_of_Event__c = ch.dateOfEvent,
    // 	CM_Winning_Player__c = ch.winnersId,
    // 	CM_Winning_Player_s_New_Rank__c = ch.winnersNewRank,
    // 	CM_Losing_Player__c = ch.losersId,
    // 	CM_Losing_Player_s_New_Rank__c = ch.losersNewRank
    // );

    System.debug('tc1::: ' + tc);
    if (tc != null) {
      insert tc;
    }
    System.debug('tc2::: ' + tc);

    List<CM_Elo_Receipt__c> receipts = new List<CM_Elo_Receipt__c>();
    //? insert Player A ELO receipt
    CM_Elo_Receipt__c winnerEloReceipt = new CM_Elo_Receipt__c();
    winnerEloReceipt.CM_ELO_Change__c = r.winningPlayerEloChange;
    winnerEloReceipt.CM_Player__c = r.winningPlayerId;
    winnerEloReceipt.CM_Tag_Challenge__c = tc.Id;
    receipts.add(winnerEloReceipt);

    //? insert Player B ELO receipt
    CM_Elo_Receipt__c loserEloReceipt = new CM_Elo_Receipt__c();
    loserEloReceipt.CM_ELO_Change__c = r.losingPlayerEloChange;
    loserEloReceipt.CM_Player__c = r.losingPlayerId;
    loserEloReceipt.CM_Tag_Challenge__c = tc.Id;
    receipts.add(loserEloReceipt);

    System.debug('receipts::: ' + JSON.serializePretty(receipts));
    insert receipts;
    return tc;
  }

  // 	//? Player A = winner
  // 	//? Player B = loser

  //     //? get Player's data (ordered in previous rank ASC)
  //     List<CM_Players__c> players = [
  //       SELECT Id, Name, CM_Rank__c, CM_ELO_Rank__c
  //       FROM CM_Players__c
  //       WHERE Id = :tc.CM_Winning_Player__c OR Id = :tc.CM_Losing_Player__c
  //       ORDER BY CM_ELO_Rank__c ASC
  //     ];

  //     //? find loser's record
  //     CM_Players__c loser = new CM_Players__c();
  //     for (CM_Players__c player : players) {
  //       if (player.Id == tc.CM_Losing_Player__c) {
  //         loser = player;
  //       }
  //     }
  // 	Integer playerBELO = loser.CM_ELO_Rank__c;
  // 	System.debug('playerBELO::: ' + playerBELO);

  //     //? find winner's record
  //     CM_Players__c winner = new CM_Players__c();
  //     for (CM_Players__c player : players) {
  //       if (player.Id == tc.CM_Winning_Player__c) {
  //         winner = player;
  //       }
  //     }
  // 	Integer playerAELO = winner.CM_ELO_Rank__c;
  // 	System.debug('playerAELO::: ' + playerAELO);

  // 	//! no longer needed since we are using a rollup summary
  //     // //? update loser's rank
  //     // loser.CM_Rank__c = tc.CM_Losing_Player_s_New_Rank__c;
  //     // update loser;
  //     // System.debug('loser::: ' + JSON.serializePretty(loser));
  //     // //? update winner's rank
  //     // winner.CM_Rank__c = tc.CM_Winning_Player_s_New_Rank__c;
  //     // update winner;
  //     // System.debug('winner::: ' + JSON.serializePretty(winner));

  //     //? Calculate the ELO change value for the player A
  //     Integer playerAExpected = 1/(1+ pow(10, ((playerBELO - playerAELO)/400));
  // 	System.debug('playerAExpected::: ' + playerAExpected);

  //     Integer playerBExpected = 1/(1+ pow(10, ((playerAELO - playerBELO)/400));
  // 	System.debug('playerBExpected::: ' + playerBExpected);
  //     Integer winnerELOChange;
  //     Integer loserELOChange;

  //     //? Create a ELO receipt for each player based on the Tag Challenge
  //     CM_Elo_Receipt__c receipt = new CM_Elo_Receipt__c();
  //     receipt.ELO_Player__c = winner.Id;
  //     receipt.CM_ELO_Change__c = winnerELOChange;

  //     //? Create a ELO receipt for each player based on the Tag Challenge
  //     CM_Elo_Receipt__c receipt = new CM_Elo_Receipt__c();
  //     receipt.ELO_Player__c = winner.Id;
  //     receipt.CM_ELO_Change__c = winnerELOChange;

  //     return tc;
  //   }

  public class Challenge {
    @AuraEnabled
    public Date dateOfEvent;

    @AuraEnabled
    public String winnersId;

    @AuraEnabled
    public Integer winnersNewRank;

    @AuraEnabled
    public String losersId;

    @AuraEnabled
    public Integer losersNewRank;
  }

  @AuraEnabled
  public static ViewModel getViewModel() {
    ViewModel vm = new ViewModel();
    vm.outboundModel = new OutboundViewModel();
    return vm;
  }

  public class ViewModel {
    @AuraEnabled
    public OutboundViewModel outboundModel;
  }

  //? data coming out of the database
  public class OutboundViewModel {
    @AuraEnabled
    public List<CM_Tournament_Result__c> allTournamentResults;

    @AuraEnabled
    public List<CM_Players__c> allPlayers;

    @AuraEnabled
    public List<CM_Tag_Challenge__c> allTagChallenges;

    @AuraEnabled
    public List<CM_Settings__mdt> metadataConstants;

    public OutboundViewModel() {
      this.allTournamentResults = getAllTournamentResults();
      this.allPlayers = getAllPlayers();
      this.allTagChallenges = getAllTagChallenges();
      this.metadataConstants = getMetadataConstants();
    }
  }

  // ------------------------------------------------------------------------------------------------------------------ //
  //? Functions used to populate the OutboundViewModel class
  @AuraEnabled
  public static List<CM_Tournament_Result__c> getAllTournamentResults() {
    return [
      SELECT
        Id,
        CM_Deck_Used__c,
        CM_Player__r.Name,
        CM_Tournament_Standing__c,
        CM_Tournament_Name__c,
        CM_Tournament__r.Name,
        CM_Tournament__r.CM_Tournament_Type__c,
        CM_Tournament__r.CM_Location__c,
        CM_Record__c,
        CreatedDate,
        CM_Tournament__r.CM_Date_of_Event__c
      FROM CM_Tournament_Result__c
      ORDER BY
        CM_Tournament_Standing__c ASC,
        CM_Tournament__r.CM_Date_of_Event__c DESC
    ];
  }

  @AuraEnabled
  public static List<CM_Players__c> getAllPlayers() {
    return [
      SELECT
        Id,
        CM_Rank__c,
        CM_Avatar_File__c,
        Name,
        CreatedDate,
        CM_ELO_Slip_Count__c,
        CM_ELO_Rank__c
      FROM CM_Players__c
      WHERE Active__c = TRUE
      ORDER BY CM_ELO_Rank__c DESC, Name ASC
    ];
  }

  @AuraEnabled
  public static List<CM_Settings__mdt> getMetadataConstants() {
    return [
      SELECT Id, K_Value__c, DeveloperName
      FROM CM_Settings__mdt
      WHERE DeveloperName = 'Default'
    ];
  }

  @AuraEnabled
  public static List<CM_Elo_Receipt__c> getAllEloReceipts() {
    return [
      SELECT
        Id,
        CM_Player__c,
        CM_ELO_Change__c,
        CM_Tag_Challenge__r.CM_Date_of_Event__c,
        CM_Player__r.Name,
        CreatedDate
      FROM CM_Elo_Receipt__c
      ORDER BY CreatedDate DESC
    ];
  }

  @AuraEnabled
  public static List<CM_Tag_Challenge__c> getAllTagChallenges() {
    return [
      SELECT
        Id,
        CM_Date_of_Event__c,
        CM_Winning_Player_s_Previous_Elo__c,
        CM_Winning_Players_Elo_Change__c,
        CM_Winning_Player__c,
        CM_Winning_Player__r.Name,
        CM_Winning_Player_s_New_Rank__c,
        CM_Losing_Player_s_Previous_Elo__c,
        CM_Losing_Players_Elo_Change__c,
        CM_Losing_Player__c,
        CM_Losing_Player__r.Name,
        CM_Losing_Player_s_New_Rank__c,
        CreatedDate,
        CM_Defended_Tag__c
      FROM CM_Tag_Challenge__c
      ORDER BY CreatedDate DESC
    ];
  }

  //? Helper class
  public static List<SObject> reverseList(List<SObject> incomingList) {
    System.debug(incomingList);
    Map<Integer, SObject> mapName = new Map<Integer, SObject>();
    Integer i = 1;
    for (SObject obj : incomingList) {
      mapName.put(i, obj);
      i++;
    }
    List<SObject> listName = new List<SObject>();
    for (Integer j = incomingList.size(); j > 0; j--) {
      listName.add(mapName.get(j));
    }
    System.debug(listName);
    return listName;
  }

  //   @AuraEnabled
  public class Receipt {
    @AuraEnabled
    public String winningPlayerId { get; set; }
    @AuraEnabled
    public Decimal winningPlayerEloChange { get; set; }
    @AuraEnabled
    public String losingPlayerId { get; set; }
    @AuraEnabled
    public Decimal losingPlayerEloChange { get; set; }
  }
}
