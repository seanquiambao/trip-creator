describe("Add Trip", () => {
  it("Add Trip", () => {
    cy.visit("http://localhost:3000/trip");

    cy.get('[data-testid="add-card"]').click();

    cy.get('input[placeholder="title"]').type("Added Trip");

    cy.get("button").contains("Add").click();

    cy.get('[data-testid="trip-card"]').should("contain", "Added Trip");
  });
});
