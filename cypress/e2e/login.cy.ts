describe("Login spec", () => {
  beforeEach(() => cy.visit("/"));

  it("should not log in with empty credentials", () => {
    cy.getByData("user-options-button").click();
    cy.getByData("login-anchor").click();

    cy.location("pathname").should("eq", "/login");

    cy.getByData("enter-button").click();
    cy.getByData("modal-text")
      .should("exist")
      .and("have.text", "Usuário e/ou senha inválidos");
  });

  it("should not log in with invalid credentials", () => {
    cy.getByData("user-options-button").click();
    cy.getByData("login-anchor").click();

    cy.location("pathname").should("eq", "/login");

    cy.getByData("username-input").type("abc");
    cy.getByData("password-input").type("123");
    cy.getByData("enter-button").click();
    cy.getByData("modal-text")
      .should("exist")
      .and("have.text", "Usuário e/ou senha inválidos");
  });

  it("should log in with valid credentials", () => {
    cy.getByData("user-options-button").click();
    cy.getByData("login-anchor").click();

    cy.location("pathname").should("eq", "/login");

    cy.getByData("username-input").type(Cypress.env("username"));
    cy.getByData("password-input").type(Cypress.env("password"));
    cy.getByData("enter-button").click();
    cy.getByData("modal-text")
      .should("exist")
      .and("have.text", "Login realizado com sucesso!");
    cy.getByData("close-modal").click();

    cy.location("pathname").should("eq", "/");
  });
});
