/**
 * This class contains unit tests for validating the behavior of Apex classes
 * and triggers.
 *
 * Unit tests are class methods that verify whether a particular piece
 * of code is working properly. Unit test methods take no arguments,
 * commit no data to the database, and are flagged with the testMethod
 * keyword in the method definition.
 *
 * All test methods in an org are executed whenever Apex code is deployed
 * to a production org to confirm correctness, ensure code
 * coverage, and prevent regressions. All Apex classes are
 * required to have at least 75% code coverage in order to be deployed
 * to a production org. In addition, all triggers must have some code coverage.
 *
 * The @isTest class annotation indicates this class only contains test
 * methods. Classes defined with the @isTest annotation do not count against
 * the org size limit for all Apex scripts.
 *
 * See the Apex Language Reference for more information about Testing and Code Coverage.
 */
@isTest
private class CM_ControllerTest {
  @isTest
  static void addPlayer_Success() {
    // TO DO: implement unit test
    String playerName = 'Test';
    Test.startTest();
    CM_Players__c res = CM_Controller.addPlayer(playerName);
    Test.stopTest();
    System.debug('res::: ' + JSON.serializePretty(res));

    CM_Players__c response = [
      SELECT Active__c, CM_Avatar_File__c, Name, CM_ELO_Rank__c
      FROM CM_Players__c
    ][0];

    System.assertEquals(true, response.Active__c);
    System.assertEquals('default.png', response.CM_Avatar_File__c);
    System.assertEquals('Test', response.Name);
    System.assertEquals(1200, response.CM_ELO_Rank__c);
  }
  @isTest
  static void addPlayer_Null() {
    // TO DO: implement unit test
    String playerName = null;
    Test.startTest();
    CM_Players__c res = CM_Controller.addPlayer(playerName);
    Test.stopTest();
    System.debug('res::: ' + JSON.serializePretty(res));

    System.assertEquals(null, res);
  }
}
