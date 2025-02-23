describe("Login Tests", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");

    cy.fixture("credentials").then((credentials) => {
      cy.wrap(credentials).as("credentials");
    });
  });

  it("logs in", function () {
    cy.get("@credentials").then((credentials) => {
      cy.get('[data-testid="email"]').type(credentials.username);
      cy.get('[data-testid="password"]').type(credentials.password);
      cy.get('[data-testid="login"]').click();
    });
  });
});
