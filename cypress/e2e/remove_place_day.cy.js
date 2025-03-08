describe("Remove Place and Remove Day", () => {
  beforeEach(() => {
    cy.fetchTripCreator({
      tripid: "A",
    });
  });
  it("should remove a place when clicking the X button", () => {
    cy.wait(1000);

    // Get the initial length of activities
    cy.get('[data-cy^="remove-place-0"]').then(($elements) => {
      const initialLength = $elements.length;

      // Click the first remove button
      cy.get('[data-cy="remove-place-0"]')
        .first() // Select the first element
        .should("be.visible")
        .click();

      // Verify the length of activities is reduced by one
      cy.get('[data-cy^="remove-place-0"]').should(
        "have.length",
        initialLength - 1
      );
    });
  });

  it("should remove a place when clicking the X button", () => {
    cy.wait(1000);

    // Get the initial length of activities
    cy.get('[data-cy^="remove-day-0"]').then(($elements) => {
      const initialLength = $elements.length;

      // Click the first remove button
      cy.get('[data-cy="remove-day-0"]')
        .first() // Select the first element
        .should("be.visible")
        .click();

      // Verify the length of activities is reduced by one
      cy.get('[data-cy^="remove-day-0"]').should(
        "have.length",
        initialLength - 1
      );
    });
  });
});
