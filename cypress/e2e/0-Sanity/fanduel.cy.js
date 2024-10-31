/// <reference types="cypress" />


context('Actions', () => {
    /**
     * This is for the hackaton, so the code it's hardcoed
     */
    it('Click on fanduel page', () => {
        cy.viewport(1920, 1080);
        const timetoutValue = 5000;

        const baseUrl = "https://co.sportsbook.fanduel.com/";
        cy.visit(baseUrl); // Only works with prod

        cy.wait(timetoutValue);
        cy.get('div ul li span').contains('NHL').click();


        cy.wait(timetoutValue);

        cy.viewport(1920, 1080);

        //Get Seattle

        cy.get('span[aria-label="Seattle Kraken"]').click();
        cy.wait(timetoutValue);


        //Click on Seattle and will be selected
        cy.get('div[role="button"][aria-label*="Seattle"]').first().click();
        cy.wait(timetoutValue);


        // click on wager button
        cy.get('div').find('input[type="text"]').first().type('0.09');
        cy.wait(timetoutValue);

        //Click again on Seattle and will be de-selected

        cy.get('div[role="button"][aria-label*="Seattle"]').first().click();
        cy.wait(timetoutValue);


        cy.get('div[role="button"][aria-label*="Seattle"]').first().click();
        cy.get('div').find('input[type="text"]').first().type('0.10');

        cy.wait(timetoutValue);

        //login to do the bet

        /*const loginEmail = "francisco.sousa+usft.01@fanduel.com";
        const loginPassword = "batatas";


        cy.get('#root div > div ').contains('Log in').click();
        cy.get('#login-email').type(loginEmail);
        cy.get('#login-password').type(loginPassword);
        cy.wait(timetoutValue);
        //cy.get('main div section div form button[type="submit"]').click();

        */
      })

})