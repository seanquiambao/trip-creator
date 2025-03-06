describe("Remove Trip", () => {
  beforeEach(() => {
    cy.fetchTrip({
      tripid: "A",
    });
  });
  it("Removes Trip", () => {
    cy.visit("http://localhost:3000/trip");

    cy.get('[data-testid="trip-card"]')
      .its("length")
      .then((count) => {
        cy.get('[data-testid="remove-trip-A"]').first().click();

        cy.get('[data-testid="trip-card"]').its("length").as("count2");

        cy.get("@count2").should("equal", count - 1);
      });
  });
});
