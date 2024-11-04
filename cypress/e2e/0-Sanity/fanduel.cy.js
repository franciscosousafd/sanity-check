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
      const loginEmail = "hackaton2024@fanduel.com";
      const loginPassword = "potatoes";


      cy.viewport(1920, 1080); //define that we want the test to execute in full hd resolution

      cy.visit(baseUrl); // Only works with prod
      cy.wait(timeoutValue);

      //Click on the sport that we want to bet
      cy.get('div ul li span').contains(sportName).click();
      cy.wait(timeoutValue);

      
      //Click on the team that we want to bet
      cy.get(`span[aria-label="${fullTeamName}"]`).first().click();
      cy.wait(timeoutValue);


      //Click on the team that we want selected
      betOnFirstTeam(fullTeamName);
      cy.wait(timeoutValue);


      // click on wager button
      cy.get('div').find('input[type="text"]').first().type('0.09');
      cy.wait(timeoutValue);

      //Click again on team and will be de-selected

      betOnFirstTeam(fullTeamName);
      cy.wait(timeoutValue);

      //Click again to bet again in the team
      betOnFirstTeam(fullTeamName);
      cy.get('div').find('input[type="text"]').first().type('0.10');
      cy.wait(timeoutValue);

      //login to do the bet
      cy.wait(timeoutValue);
      cy.get('#root div > div ').contains('Log in').click();
      cy.get('#login-email').type(loginEmail);
      cy.get('#login-password').type(loginPassword);
      cy.wait(timeoutValue);
      //cy.get('main div section div form button[type="submit"]').click();

      cy.wait(timeoutValue);
      })

})

function betOnFirstTeam(teamName) {
  cy.get(`div[role="button"][aria-label*="${teamName}"]`).first().click();
}