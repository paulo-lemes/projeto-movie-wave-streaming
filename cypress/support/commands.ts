/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getByData(selector: string): Chainable<any>;
  }
}

Cypress.Commands.add("getByData", (selector) =>
  cy.get(`[data-test=${selector}]`)
);
