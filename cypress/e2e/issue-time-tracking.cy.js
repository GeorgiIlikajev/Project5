describe('Time estimation functionality', () => {

beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
    });
});

//I also tried to put baseUrl as a issue modal of time tracking, but sometimes it gets bugged, so i stick to the /board instead for stability

it('Should add estimation of the hours to issue', () => {
    
    //Add estimated hours
    cy.contains('You can track how many hours were spent working on an issue, and how many hours remain.')
        .click();
    
    cy.get('input[placeholder="Number"]')
        .clear()
        .type('10')
        .wait(2000);

    cy.get('[data-testid="icon:close"]')
        .click();
    
    cy.contains('You can track how many hours were spent working on an issue, and how many hours remain.')
        .click();

    //Check if the hours are saved; Editing values
    cy.get('input[placeholder="Number"]')
        .should('have.value', '10')
        .clear()
        .type('20')
        .wait(2000);

    cy.get('[data-testid="icon:close"]')
        .click();
    
    cy.contains('You can track how many hours were spent working on an issue, and how many hours remain.')
        .click();
    
    //Check if the edited values are saved; Deleting values
    cy.get('input[placeholder="Number"]')
        .should('have.value', '20')
    
    cy.get('input[placeholder="Number"]')
        .clear()
        .wait(2000);
    
    //Check if deleted values are saved
    cy.get('[data-testid="icon:close"]')
        .click();
    
    cy.contains('You can track how many hours were spent working on an issue, and how many hours remain.')
        .click();
    
    cy.get('input[placeholder="Number"]')
        .should('have.value', '')

});



it('Should add covered hours to issue', () => {

    //Add covered hours
    cy.contains('You can track how many hours were spent working on an issue, and how many hours remain.')
        .click();
    
    cy.get('[data-testid="icon:stopwatch"]')
        .click()
        .wait(1000)
        .get('[data-testid="modal:tracking"]')
        .should('be.visible');
    
    cy.contains('div', 'Time spent (hours)')
        .next()
        .find('input[placeholder="Number"]')
        .clear()
        .type('2');

    cy.contains('div', 'Time remaining (hours)')
        .next()
        .find('input[placeholder="Number"]')
        .clear()
        .type('5');

    cy.contains('button', 'Done')
        .click();
    
    //Check if the covered hours are saved
    cy.contains('div', 'No Time Logged')
        .should('not.exist');    
    
    cy.contains('div', '2h logged')
        .should('be.visible');
    
    cy.contains('div', '5h remaining')
        .should('be.visible');

    //Delete covered hours
    cy.get('[data-testid="icon:stopwatch"]')
        .click()
        .wait(1000)
        .get('[data-testid="modal:tracking"]')
        .should('be.visible');
    
    cy.contains('div', 'Time spent (hours)')
        .next()
        .find('input[placeholder="Number"]')
        .clear();

    cy.contains('div', 'Time remaining (hours)')
        .next()
        .find('input[placeholder="Number"]')
        .clear()
        .wait(1000);

    //Check if deleted hours are no longer exist and the element "No time logged" is visible
    cy.contains('button', 'Done')
        .click()
        .wait(2000);
    
    cy.contains('div', 'No time logged')
        .should('exist');

    cy.contains('div', 'No time logged')
        .should('be.visible');
    
    });
});