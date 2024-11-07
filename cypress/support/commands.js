// Custom command to bet on the first team
Cypress.Commands.add('betOnFirstTeam', (teamName) => {
    cy.get(`div[role="button"][aria-label*="${teamName}"]`).first().click();
  });
  
  // Custom command to get the full team name
  Cypress.Commands.add('getFullTeamNameAccess', (sportName) => {
    cy.contains('h3[role="heading"]', sportName)   // Find the <h3> with the specified sport name
      .closest('li')                               // Get the closest <li> ancestor
      .next('li')                                  // Select the next sibling <li> element
      .then((nextLi) => {
        cy.wrap(nextLi).as('nextLi');              // Store it in an alias if you need it later
        cy.get('@nextLi').get('span[role="text"]').first()  // Select the first <span> with role="text"
          .invoke('text')                          // Get the text content of the element
          .as('fullTeamName');                     // Store the text as an alias 'fullTeamName'
      });
  });