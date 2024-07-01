describe("Rating content spec", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
    cy.getByData("content-row").eq(1).find("a").eq(0).click();
    cy.url().should("include", "/movie");
  });

  it("should rate a content properly", () => {
    cy.getByData("rate-button")
      .should("exist")
      .and("contain.text", "Avaliar")
      .click();
    cy.getByData("rating-star").eq(9).click();
    cy.getByData("send-rating-button").click();
    cy.verifyAndCloseModal("Avaliação feita!");
    cy.getByData("user-rating").should("contain.text", "10/10");
  });

  it("should change a rating properly", () => {
    cy.getByData("change-rating-button")
      .should("exist")
      .and("contain.text", "Alterar")
      .click();
    cy.wait(100);
    cy.getByData("rating-star").eq(0).click();
    cy.getByData("send-rating-button").click();
    cy.verifyAndCloseModal("Avaliação atualizada!");
    cy.getByData("user-rating").should("contain.text", "1/10");
  });

  it("should delete a rating properly", () => {
    cy.getByData("change-rating-button")
      .should("exist")
      .and("contain.text", "Alterar")
      .click();
    cy.getByData("delete-rating-button").click();
    cy.verifyAndCloseModal("Avaliação excluída");
    cy.getByData("rate-button").should("exist").and("contain.text", "Avaliar");
  });
});
