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

      cy.viewport(1920, 1080); //define that we want the test to execute in full hd resolution

      cy.visit(baseUrl); // Only works with prod
      cy.wait(timeoutValue);

      //Click on the sport that we want to bet
      cy.get('div ul li span').contains(sportName).click();
      cy.wait(timeoutValue);


      //Get access to the team name of the first team that appears on the screen
      getFullTeamNameAccess(sportName);
      
      //Click on the team that we want to bet
      cy.get('@fullTeamName').then((text) => {
        cy.get(`span[aria-label="${text}"]`).first().click();
      })
      cy.wait(timeoutValue);


      //Click on the team that we want selected Puck and Money Line
      cy.get('@fullTeamName').then((text) => {
        betOnFirstTeam(`Puck Line, ${text}`);
      })
      cy.wait(timeoutValue);

      cy.get('@fullTeamName').then((text) => {
        betOnFirstTeam(`Moneyline, ${text}`);
      })
      cy.wait(timeoutValue);
   
      //Click again on Puck and Money Line of the team to unselect
      cy.get('@fullTeamName').then((text) => {
        betOnFirstTeam(`Puck Line, ${text}`);
      })
      cy.wait(timeoutValue);

      cy.get('@fullTeamName').then((text) => {
        betOnFirstTeam(`Moneyline, ${text}`);
      })
      cy.wait(timeoutValue);


      //Click again to bet again in the team
      cy.get('@fullTeamName').then((text) => {
        betOnFirstTeam(text);
      })
      cy.get('div').find('input[type="text"]').first().type('0.10');
      cy.wait(timeoutValue);
      })

})

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