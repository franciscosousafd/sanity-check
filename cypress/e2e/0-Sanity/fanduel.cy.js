/// <reference types="cypress" />


context('Actions', () => {
    /**
     * This is for the hackaton, so the code it's hardcoed
     */
    it('Click on fanduel page', () => {
      cy.intercept('**', { log: false });
      
      const timeoutValue = 5000;
      const baseUrl = "https://co.sportsbook.fanduel.com/";
      const sportName = 'NHL';
      const loginEmail = "hackaton2024@fanduel.com";
      const loginPassword = "potatoes";

      cy.viewport(1920, 1080); //define that we want the test to execute in full hd resolution

      cy.visit(baseUrl); // Only works with prod
      cy.wait(timeoutValue);

      //Click on the sport that we want to bet
      cy.get('div ul li span').contains(sportName).click();
      cy.wait(timeoutValue);

  
      //Get access to the team name of the first team that appears on the screen
      getFullTeamNameAccess('NHL');

      //Click on the team that we want to bet
      cy.get('@fullTeamName').then((text) => {
        cy.get(`span[aria-label="${text}"]`).first().click();
      })
      cy.wait(timeoutValue);

      
      //Click on the team that we want selected
      cy.get('@fullTeamName').then((text) => {
        betOnFirstTeam(text);
      })
      cy.wait(timeoutValue);

      // click on wager button
      cy.get('div').find('input[type="text"]').first().type('0.09');
      cy.wait(timeoutValue);

      //Click again on team and will be de-selected

      cy.get('@fullTeamName').then((text) => {
        betOnFirstTeam(text);
      })
      cy.wait(timeoutValue);

      //Click again to bet again in the team
      cy.get('@fullTeamName').then((text) => {
        betOnFirstTeam(text);
      })
      cy.get('div').find('input[type="text"]').first().type('0.10');
      cy.wait(timeoutValue);

      //login to do the bet (commented as we are always detected as a bot)
      cy.wait(timeoutValue);
      /*
      cy.get('#root div > div ').contains('Log in').click();
      cy.get('#login-email').type(loginEmail);
      cy.get('#login-password').type(loginPassword);
      cy.wait(timeoutValue);
      //cy.get('main div section div form button[type="submit"]').click();

      cy.wait(timeoutValue);*/
      })

})

//-------------------------------------------------------------------------------------------------------
//TODO: update this functions to be commands
//Also, this code can be simplified
function betOnFirstTeam(teamName) {
  cy.get(`div[role="button"][aria-label*="${teamName}"]`).first().click();
}

function getFullTeamNameAccess(sportName) {
  cy.contains('h3[role="heading"]', sportName)   // Find the <h3> with the specified sport name
    .closest('li')                               // Get the closest <li> ancestor
    .next('li')                                  // Select the next sibling <li> element
    .then((nextLi) => {
      cy.wrap(nextLi).as('nextLi');              // Store it in an alias if you need it later
      cy.get('@nextLi').get('span[role="text"]').first()  // Select the first <span> with role="text"
        .invoke('text')                          // Get the text content of the element
        .as('fullTeamName');                     // Store the text as an alias 'fullTeamName'
    });
}
