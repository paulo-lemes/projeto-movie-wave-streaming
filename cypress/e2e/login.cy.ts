describe("Login spec", () => {
  beforeEach(() => cy.visit("http://localhost:3000"));

  it("should not pass with empty credentials", () => {
    cy.getByData("user-options-button").click();
    cy.getByData("login-anchor").click();

    cy.location("pathname").should("eq", "/login");

    cy.getByData("enter-button").click();
    cy.getByData("modal-text").contains("Usuário e/ou senha inválidos");
  });

  it("should not pass with invalid credentials", () => {
    cy.getByData("user-options-button").click();
    cy.getByData("login-anchor").click();

    cy.location("pathname").should("eq", "/login");

    cy.getByData("username-input").type("abc");
    cy.getByData("password-input").type("123");
    cy.getByData("enter-button").click();
    cy.getByData("modal-text").contains("Usuário e/ou senha inválidos");
  });
});
