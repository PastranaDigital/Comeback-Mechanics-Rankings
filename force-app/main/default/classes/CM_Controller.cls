public without sharing class CM_Controller {
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

		public OutboundViewModel() {
			this.allTournamentResults = getAllTournamentResults();
			this.allPlayers = getAllPlayers();
		}
	}

	// ------------------------------------------------------------------------------------------------------------------ //
	//? Functions used to populate the OutboundViewModel class
	@AuraEnabled
	public static List<CM_Tournament_Result__c> getAllTournamentResults() {
		return [
            SELECT Id, CM_Deck_Used__c, CM_Player__r.Name, CM_Tournament_Standing__c, CM_Tournament_Name__c, CM_Tournament__r.Name, CM_Tournament__r.CM_Tournament_Type__c, CM_Tournament__r.CM_Location__c, CM_Record__c 
			FROM CM_Tournament_Result__c 
			ORDER BY CM_Tournament_Standing__c ASC];
	}

	@AuraEnabled
	public static List<CM_Players__c> getAllPlayers() {
		return [
            SELECT Id, CM_Rank__c, CM_Avatar_File__c, Name 
			FROM CM_Players__c 
			ORDER BY CM_Rank__c ASC];
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