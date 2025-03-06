// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
declare namespace Cypress {
  interface Chainable {
    fetch(options: { tripid: string }): Chainable<void>;
  }
}
type props = {
  tripid: string;
};
Cypress.Commands.add("fetch", ({ tripid }: props) => {
  cy.intercept("GET", `/api/trip/${tripid}`, { fixture: `trip_A.json` }).as(
    "GET"
  );

  cy.visit("/");
  cy.get('[data-testid="email"]').type("test@gmail.com");
  cy.get('[data-testid="password"]').type("password123");
  cy.get('[data-testid="login"]').click();
  cy.visit(`/trip/${tripid}`);
  cy.wait("@GET");
});
