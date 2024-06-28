/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getByData(selector: string): Chainable<any>;
    login(): Chainable<any>;
    verifyPage(selector: string, path: string): Chainable<any>;
  }
}

Cypress.Commands.add("getByData", (selector) =>
  cy.get(`[data-test=${selector}]`)
);

Cypress.Commands.add("login", () => {
  cy.session(
    [],
    () => {
      const username = Cypress.env("username");
      const password = Cypress.env("password");

      cy.visit("/");
      cy.getCookie("auth").should("not.exist");
      cy.getByData("user-options-button").click();
      cy.getByData("login-anchor").click();
      cy.url().should("include", "/login");
      cy.getByData("username-input").type(username);
      cy.getByData("password-input").type(password);
      cy.getByData("enter-button").click();
      cy.getByData("close-modal").click();
      cy.url().should("include", "/");
    },
    {
      validate: () => {
        cy.getCookie("auth").should("exist");
      },
    }
  );
});

Cypress.Commands.add("verifyPage", (selector, path) => {
  cy.getByData(selector).click();
  cy.url().should("include", "/" + path);
});
