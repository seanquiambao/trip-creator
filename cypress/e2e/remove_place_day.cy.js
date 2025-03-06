describe('Remove Place and Remove Day', () => {
    beforeEach(() => {
      cy.visit('/your-page-url'); // Update with the correct URL
    });
  
    it('should remove a place when clicking the X button', () => {
      cy.get('[data-cy="remove-place-0"]') // Select the first place's remove button
        .click();
  
      cy.get('[data-cy="remove-place-0"]').should('not.exist');
    });
  
    it('should remove a day when clicking the X button', () => {
      cy.get('[data-cy="remove-day-0"]') // Select the first day's remove button
        .click();
  
      cy.get('[data-cy="remove-day-0"]').should('not.exist');
    });
  });
  