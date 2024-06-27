describe("Logout spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login();
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

  it("should log out using profile logout-button", () => {
    cy.getByData("user-options-button").click();
    cy.getByData("navbar-profile-anchor").click();
    
    cy.location("pathname").should("eq", "/profile");
    
    cy.getByData("profile-logout-button").click();
    cy.getByData("modal-text")
      .should("exist")
      .and("have.text", "Logout realizado com sucesso");
    cy.getByData("close-modal").click();

    cy.location("pathname").should("eq", "/login");
  });
});
