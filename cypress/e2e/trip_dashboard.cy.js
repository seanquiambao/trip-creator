describe("Remove Trip", () => {
  beforeEach(() => {
    cy.fetchTrip({
      tripid: "A",
    });
  });
  it("Add Trip", () => {
    cy.visit("http://localhost:3000/trip");

    cy.get('[data-testid="trip-card"]').its("length").as("before-length");
    cy.get('[data-testid="add-card"]').click();

    cy.get('[data-testid="title-input"]').type("Added Trip");

    cy.get("button").contains("Add").click();

    cy.get("@before-length").should("equal", 3);
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
