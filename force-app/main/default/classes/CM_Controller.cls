public without sharing class CM_Controller {
    @AuraEnabled
    public static ViewModel getViewModel() {
		ViewModel vm = new ViewModel();
		vm.outboundModel = new OutboundViewModel();
		return vm;
	}

	// @AuraEnabled
	// public static String createNextRoundOfMatches(List<Object> listOfMatchesToCreate){
	// 	String result;
	// 	System.debug('listOfMatchesToCreate::: ' + JSON.serializePretty(listOfMatchesToCreate));
	// 	try {
	// 		List<TM_Match__c> matchesToCreate = new List<TM_Match__c>();

	// 		//? iterate over list of matches to create
	// 		for (object obj : listOfMatchesToCreate) {
	// 			TMWrapper m = (TMWrapper) JSON.deserialize(JSON.serialize(obj), TMWrapper.class);
	// 			//? extract the data for the new matches
	// 			TM_Match__c match = new TM_Match__c(
	// 				Name = m.name,
	// 				TM_Player_Team_Red__c = m.redPlayer,
	// 				TM_Player_Team_Blue__c = m.bluePlayer,
	// 				TM_Round__c = m.round,
	// 				TM_Location__c = m.location
	// 			);
	// 			//? build list to insert
	// 			matchesToCreate.add(match);
	// 		}

	// 		//? insert list of matches
	// 		if (matchesToCreate.size() > 0) insert matchesToCreate;
	// 		result = 'success';			
	// 	} catch (DmlException e) {
	// 		System.debug('The following exception has occurred: ' + e.getMessage());
	// 		result = 'error';
	// 	}
	// 	return result;
	// }

	public class ViewModel {
		@AuraEnabled
		public OutboundViewModel outboundModel;
	}

	//? data coming out of the database
	public class OutboundViewModel {
		@AuraEnabled
		public List<CM_Tournament_Result__c> allTournamentResults;

		public OutboundViewModel() {
			this.allTournamentResults = getAllTournamentResults();
		}
	}

	// ------------------------------------------------------------------------------------------------------------------ //
	//? Functions used to populate the OutboundViewModel class
	@AuraEnabled
	public static List<CM_Tournament_Result__c> getAllTournamentResults() {
		return [
            SELECT Id, CM_Deck_Used__c, CM_Player__r.Name, CM_Tournament_Standing__c, CM_Tournament__r.Name, CM_Record__c 
			FROM CM_Tournament_Result__c 
			ORDER BY CM_Tournament_Standing__c ASC];
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