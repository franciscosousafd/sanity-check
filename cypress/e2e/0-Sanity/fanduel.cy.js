/// <reference types="cypress" />


context('Actions', () => {
    /**
     * This is for the hackaton, so the code it's hardcoed
     */
    it('Click on fanduel page', () => {
      const timeOutValue = 5000;
      const baseUrl = "https://co.sportsbook.fanduel.com/";
      const sportName = "NHL";
      const fullTeamName = "Los Angeles Kings";
      const teamName = "Los Angeles";
      const loginEmail = "hackaton2024@fanduel.com";
      const loginPassword = "potatoes";


      cy.viewport(1920, 1080); //define that we want the test to execute in full hd resolution

      cy.visit(baseUrl); // Only works with prod
      cy.wait(timeOutValue);

      //Click on the sport that we want to bet
      cy.get('div ul li span').contains(sportName).click();
      cy.wait(timeOutValue);

      
      //Click on the team that we want to bet
      cy.get(`span[aria-label="${fullTeamName}"]`).first().click();
      cy.wait(timeOutValue);


      //Click on the team that we want selected
      betOnFirstTeam(teamName);
      cy.wait(timeOutValue);


      // click on wager button
      cy.get('div').find('input[type="text"]').first().type('0.09');
      cy.wait(timeOutValue);

      //Click again on team and will be de-selected

      betOnFirstTeam(teamName);
      cy.wait(timeOutValue);

      //Click again to bet again in the team
      betOnFirstTeam(teamName);
      cy.get('div').find('input[type="text"]').first().type('0.10');
      cy.wait(timeOutValue);

      //login to do the bet
      cy.wait(timeOutValue);
      cy.get('#root div > div ').contains('Log in').click();
      cy.get('#login-email').type(loginEmail);
      cy.get('#login-password').type(loginPassword);
      cy.wait(timeOutValue);
      //cy.get('main div section div form button[type="submit"]').click();

      cy.wait(timeOutValue);
      })

})

function betOnFirstTeam(teamName) {
  cy.get(`div[role="button"][aria-label*="${teamName}"]`).first().click();
}