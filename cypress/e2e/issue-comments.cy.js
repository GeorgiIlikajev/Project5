describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    
// Custom command to add a comment - for practice purposes
Cypress.Commands.add('addComment', (comment) => {
    cy.contains('Add a comment...').click();
    cy.get('textarea[placeholder="Add a comment..."]').type(comment);
    cy.contains('button', 'Save').click().should('not.exist');
    cy.contains('Add a comment...').should('exist');
    cy.get('[data-testid="issue-comment"]').should('contain', comment);
  });
  
  // Custom command to edit a comment - for practice purposes
  Cypress.Commands.add('editComment', (oldComment, newComment) => {
    cy.contains('[data-testid="issue-comment"]', oldComment)
      .contains('Edit')
      .click()
      .should('not.exist');
    cy.get('textarea[placeholder="Add a comment..."]')
      .should('contain', oldComment)
      .clear()
      .type(newComment);
    cy.contains('button', 'Save').click().should('not.exist');
    cy.get('[data-testid="issue-comment"]')
      .should('contain', 'Edit')
      .and('contain', newComment);
  });
  
  // Custom command to delete a comment - for practice purposes
  Cypress.Commands.add('deleteComment', (comment) => {
    cy.contains('[data-testid="issue-comment"]', comment).contains('Delete').click();
    cy.get('[data-testid="modal:confirm"]').contains('button', 'Delete comment').click().should('not.exist');
    cy.get('[data-testid="issue-comment"]').should('not.exist');
  });
  
  describe('Comment tests', () => {
    it.only('Should create, edit, and delete comment successfully', () => {
      const comment = 'TEST_COMMENT';
      const comment_edited = 'TEST_COMMENT_EDITED';
  
      getIssueDetailsModal().within(() => {
        // Create comment
        cy.addComment(comment);
  
        // Edit comment
        cy.editComment(comment, comment_edited);
  
        // Delete comment
        cy.deleteComment(comment_edited);
      });
    });
  });
});
