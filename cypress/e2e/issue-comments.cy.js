describe('Issue comments creating, editing, and deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
    });
  
    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
  


    // add/edit/delete comment in ONE test suite
    it('Should create, edit, and delete a comment successfully', () => {
      const comment = 'TEST_COMMENT';
      const comment_edited = 'TEST_COMMENT_EDITED';
  
      getIssueDetailsModal().within(() => {

        // Add a new comment
        cy.contains('Add a comment...')
            .click();
        cy.get('textarea[placeholder="Add a comment..."]')
            .type(comment);
        cy.contains('button', 'Save')
            .click()
            .should('not.exist');
      
        // Ensure the comment is added and displayed
        cy.contains('Add a comment...')
            .should('exist');
        cy.get('[data-testid="issue-comment"]')
        .should('contain', comment);
  
        // Edit the added comment
        cy.get('[data-testid="issue-comment"]')
            .first()
            .contains('Edit')
            .click()
            .should('not.exist');
        cy.get('textarea[placeholder="Add a comment..."]')
            .should('contain', comment)
            .clear()
            .type(comment_edited);
        cy.contains('button', 'Save')
            .click()
            .should('not.exist');
        
        // Check if the comment is edited and displayed
        cy.get('[data-testid="issue-comment"]')
          .should('contain', 'Edit')
          .and('contain', comment_edited);
  
        // Delete the comment
        cy.contains('Delete')
            .click();
      });
        // Confirm the deletion
        cy.get('[data-testid="modal:confirm"]')
        .contains('button', 'Delete comment')
        .click()
        .should('not.exist');
      
        // Ensure the edited comment is no longer displayed
        getIssueDetailsModal()
        .contains(comment_edited)
        .should('not.exist');
    });
  
     // Test suite: Edit a comment successfully
    it('Should edit a comment successfully', () => {
      const previousComment = 'An old silent pond...';
      const comment_edited = 'TEST_COMMENT_EDITED';
  
      // Edit the first comment
      getIssueDetailsModal().within(() => {
        cy.get('[data-testid="issue-comment"]')
        .first()
          .contains('Edit')
          .click()
          .should('not.exist');
        cy.get('textarea[placeholder="Add a comment..."]')
        .should('contain', previousComment)
        .clear()
        .type(comment_edited);
        cy.contains('button', 'Save')
        .click()
        .should('not.exist');
        cy.get('[data-testid="issue-comment"]')
        .should('contain', 'Edit')
        .and('contain', comment_edited);
      });
    });
  
    // Test suite: Delete a comment successfully
    it('Should delete a comment successfully', () => {
      getIssueDetailsModal()
        .find('[data-testid="issue-comment"]')
        .contains('Delete')
        .click();
  
      cy.get('[data-testid="modal:confirm"]')
        .contains('button', 'Delete comment')
        .click()
        .should('not.exist');
  
      getIssueDetailsModal()
        .find('[data-testid="issue-comment"]')
        .should('not.exist');
    });
  });