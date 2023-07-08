

describe('Create an issue', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      //System will already open issue creating modal in beforeEach block  
      cy.visit(url + '/board?modal-issue-create=true');
    });
  });


//ASSIGNMENT 1

  it('Should create an issue and validate it successfully', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {

      //Open issue type dropdown, select bug and click
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]').click();
      cy.get('[data-testid="select:type"]').should('contain', 'Bug');

      //Set new priority by typing Highest to the text box
      cy.get('[data-testid="select:priority"]').click();
      cy.get('input[class="sc-Rmtcm gJIJXg"]').last().click()
        .type('Highest')
      cy.get('[data-testid="select-option:Highest"]').click();
      cy.get('[data-testid="select:priority"]').should('have.text', 'Highest');

      //Type value to description input field
      cy.get('.ql-editor').type('My bug description');
      cy.get('input[name="title"]').type('Bug');

      //Select Pickle Rick
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporterId"]').should('contain', 'Pickle Rick');

      cy.get('button[type="submit"]').click();
    });


    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    
    cy.waitUntil(() =>
  cy.contains('Issue has been successfully created.').should('be.visible')
);
      cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '5')
        .first()
        .find('p')
        .contains('Bug');
      //Assert that correct avatar and type icon are visible
      cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
      cy.get('[data-testid="icon:bug"]').should('be.visible');
    });
  });

  it('Validating that title is mandatory field', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      //Try to click create issue button without filling any data
      cy.get('button[type="submit"]').click();

      //Assert that correct error message is visible
      cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
    });
  });
});





// Assignment 2

const faker = require('faker');
const randomTitle = faker.random.word();
const randomDescription = faker.random.words(5);

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      //System will already open issue creating modal in beforeEach block  
      cy.visit(url + '/board?modal-issue-create=true');
    });
  });

  it('Random Faker data is entered in fields', () => {

    cy.get('[data-testid="modal:issue-create"]').within(() => {

      //Make sure issue type Task is already set
      cy.get('[data-testid="select:type"]').contains('Task');

      //Choose priority
      cy.get('[data-testid="select:priority"]').click();
      cy.get('input[placeholder="Search"]').type('Low');
      cy.get('[data-testid="select-option:Low"]').click();
      cy.get('[data-testid="select:priority"]').should('have.text', 'Low');

      // Fill in fields with random data
      cy.get('.ql-editor').type(randomDescription);
      cy.get('input[name="title"]').type(randomTitle);


      //Select reporter
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:reporterId"]').should('contain', 'Baby Yoda');

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click()

    });

    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');

    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '5')
        .first()
        .find('p')

      //Checking if created task is visible on board
      cy.contains(randomTitle).should('be.visible');
      
      //Assert that correct type icon is visible
      cy.get('[data-testid="icon:task"]').should('be.visible');
      
    });
  })
})