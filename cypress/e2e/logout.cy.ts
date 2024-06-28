describe("Logout spec", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
  });

  it("should log out using navbar-logout-button", () => {
    cy.getByData("user-options-button").click();
    cy.getByData("navbar-logout-button").click();
    cy.getByData("modal-text")
      .should("exist")
      .and("have.text", "Logout realizado com sucesso");
    cy.getByData("close-modal").click();

    cy.location("pathname").should("eq", "/login");
  });

  it("should log out using profile-logout-button", () => {
    cy.getByData("user-options-button").click();
    cy.getByData("profile-anchor").click();

    cy.location("pathname").should("eq", "/profile");

    cy.getByData("profile-logout-button").click();
    cy.getByData("modal-text")
      .should("exist")
      .and("have.text", "Logout realizado com sucesso");
    cy.getByData("close-modal").click();

    cy.location("pathname").should("eq", "/login");
  });
});
