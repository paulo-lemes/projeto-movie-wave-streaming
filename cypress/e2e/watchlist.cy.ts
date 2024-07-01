describe("Watchlist content spec", () => {
  context("With login", () => {
    beforeEach(() => {
      cy.login();
      cy.visit("/");
      cy.getByData("content-row").eq(1).find("a").eq(0).click();
      cy.url().should("include", "/movie");
    });

    it("should add a content to watchlist properly", () => {
      cy.wait(1000);
      cy.getByData("watchlist-unfilled-icon").should("exist").click();
      cy.getByData("watchlist-filled-icon").should("exist");
    });

    it("should delete a content from watchlist properly", () => {
      cy.wait(1000);
      cy.getByData("watchlist-filled-icon").should("exist").click();
      cy.getByData("watchlist-unfilled-icon").should("exist");
    });
  });
});
