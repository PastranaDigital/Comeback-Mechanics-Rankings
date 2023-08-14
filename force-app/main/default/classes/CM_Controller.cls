public without sharing class CM_Controller {
    @AuraEnabled
    public static CM_Tag_Challenge__c createTagChallenge(Challenge ch) {
		CM_Tag_Challenge__c tag = new CM_Tag_Challenge__c(
			CM_Date_of_Event__c = ch.dateOfEvent,
			CM_Winning_Player__c = ch.winnersId,
			CM_Winning_Player_s_New_Rank__c = ch.winnersNewRank,
			CM_Losing_Player__c = ch.losersId,
			CM_Losing_Player_s_New_Rank__c = ch.losersNewRank
		);
		insert tag;
		return tag;
	}

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

		public OutboundViewModel() {
			this.allTournamentResults = getAllTournamentResults();
			this.allPlayers = getAllPlayers();
			this.allTagChallenges = getAllTagChallenges();
		}
	}

	// ------------------------------------------------------------------------------------------------------------------ //
	//? Functions used to populate the OutboundViewModel class
	@AuraEnabled
	public static List<CM_Tournament_Result__c> getAllTournamentResults() {
		return [
            SELECT Id, CM_Deck_Used__c, CM_Player__r.Name, CM_Tournament_Standing__c, CM_Tournament_Name__c, CM_Tournament__r.Name, CM_Tournament__r.CM_Tournament_Type__c, CM_Tournament__r.CM_Location__c, CM_Record__c, CreatedDate 
			FROM CM_Tournament_Result__c 
			ORDER BY CM_Tournament_Standing__c ASC];
	}

	@AuraEnabled
	public static List<CM_Players__c> getAllPlayers() {
		return [
            SELECT Id, CM_Rank__c, CM_Avatar_File__c, Name, CreatedDate 
			FROM CM_Players__c 
			ORDER BY CM_Rank__c ASC];
	}

	@AuraEnabled
	public static List<CM_Tag_Challenge__c> getAllTagChallenges() {
		return [
            SELECT Id, CM_Date_of_Event__c, CM_Winning_Player__c, CM_Winning_Player__r.Name, CM_Winning_Player_s_New_Rank__c, CM_Losing_Player__c, CM_Losing_Player__r.Name, CM_Losing_Player_s_New_Rank__c, CreatedDate  
			FROM CM_Tag_Challenge__c 
			ORDER BY CM_Date_of_Event__c DESC];
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
}