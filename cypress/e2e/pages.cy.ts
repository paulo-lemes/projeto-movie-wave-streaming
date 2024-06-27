describe("Public pages spec", () => {
  context("Mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-xr");
    });

    it("should render pages properly", () => {
      cy.visit("/");
      cy.getByData("menu-burger-button").click();

      cy.verifyPage("movies-anchor-menu", "movies");
      cy.verifyPage("series-anchor-menu", "series");
      cy.verifyPage("categories-anchor-menu", "categories");
      cy.verifyPage("home-anchor-menu", "");

      cy.getByData("close-menu-burger").click();

      cy.verifyPage("search-anchor", "search");
      cy.verifyPage("logo-home-anchor", "");
    });
  });

  context("PC resolution", () => {
    beforeEach(() => {
      cy.viewport("macbook-13");
    });

    it("should render pages properly", () => {
      cy.visit("/");
      cy.verifyPage("movies-anchor", "movies");
      cy.verifyPage("series-anchor", "series");
      cy.verifyPage("categories-anchor", "categories");
      cy.verifyPage("home-anchor", "");
      cy.verifyPage("search-anchor", "search");
      cy.verifyPage("logo-home-anchor", "");
    });
  });
});
