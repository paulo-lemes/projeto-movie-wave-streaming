describe("Login spec", () => {
  it("should not pass with empty credentials", () => {
    cy.visit("http://localhost:3000");

    cy.getByData("user-options-button").click();
    cy.getByData("login-anchor").click();

    cy.location("pathname").should("eq", "/login");

    cy.getByData("enter-button").click();
    cy.getByData("modal-text").contains("Usuário e/ou senha inválidos");
  });
});
