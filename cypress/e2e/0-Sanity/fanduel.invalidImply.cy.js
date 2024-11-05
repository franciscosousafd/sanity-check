/// <reference types="cypress" />


context('Actions', () => {
    /**
     * This is for the hackaton, so the code it's hardcoed
     */
    it('Click on fanduel page', () => {
      cy.intercept('**', { log: false });
      
      const timeoutValue = 5000;
      const baseUrl = "https://co.sportsbook.fanduel.com/";
      const sportName = "NHL";
      const fullTeamName = "Los Angeles Kings";

      cy.viewport(1920, 1080); //define that we want the test to execute in full hd resolution

      cy.visit(baseUrl); // Only works with prod
      cy.wait(timeoutValue);

      //Click on the sport that we want to bet
      cy.get('div ul li span').contains(sportName).click();
      cy.wait(timeoutValue);

      
      //Click on the team that we want to bet
      cy.get(`span[aria-label="${fullTeamName}"]`).first().click();
      cy.wait(timeoutValue);


      //Click on the team that we want selected Puck and Money Line
      betOnFirstTeam(`Puck Line, ${fullTeamName}`);
      cy.wait(timeoutValue);

      betOnFirstTeam(`Moneyline, ${fullTeamName}`);
      cy.wait(timeoutValue);
   
      //Click again on Puck and Money Line of the team to unselect
      betOnFirstTeam(`Puck Line, ${fullTeamName}`);
      cy.wait(timeoutValue);

      betOnFirstTeam(`Moneyline, ${fullTeamName}`);
      cy.wait(timeoutValue);


      //Click again to bet again in the team
      betOnFirstTeam(fullTeamName);
      cy.get('div').find('input[type="text"]').first().type('0.10');
      cy.wait(timeoutValue);
      })

})

function betOnFirstTeam(teamName) {
  cy.get(`div[role="button"][aria-label*="${teamName}"]`).first().click();
}