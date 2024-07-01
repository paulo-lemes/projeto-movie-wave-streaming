describe("Favorite content spec", () => {
  context("With login", () => {
    beforeEach(() => {
      cy.login();
      cy.visit("/");
      cy.getByData("content-row").eq(1).find("a").eq(0).click();
      cy.url().should("include", "/movie");
    });

    it("should add a content to favorites properly", () => {
      cy.wait(1000);
      cy.getByData("favorite-unfilled-icon").should("exist").click();
      cy.getByData("favorite-filled-icon").should("exist");
    });

    it("should delete a content from favorites properly", () => {
      cy.wait(1000);
      cy.getByData("favorite-filled-icon").should("exist").click();
      cy.getByData("favorite-unfilled-icon").should("exist");
    });
  });

  context("Without login", () => {
    it("shouldn't allow toggle favorite action", () => {
      cy.visit("/");
      cy.getByData("content-row").eq(1).find("a").eq(0).click();
      cy.url().should("include", "/movie");
      cy.getByData("favorite-unfilled-icon").should("exist").click();
      cy.verifyAndCloseModal(
        "Faça login para conseguir favoritar e adicionar conteúdos à sua lista"
      );
    });
  });
});
