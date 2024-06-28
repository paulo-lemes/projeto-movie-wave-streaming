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

describe("Private profile page spec", () => {
  it("should render pages properly", () => {
    cy.login();
    cy.visit("/");

    cy.verifyPage("watchlist-anchor", "profile#watchlist");
    cy.getByData("profile-section-title").should(
      "contain.text",
      "Lista de interesses"
    );

    cy.getByData("user-options-button").click();
    cy.verifyPage("recommended-anchor", "profile#recommended");
    cy.getByData("profile-section-title").should(
      "contain.text",
      "Recomendações"
    );

    cy.verifyPage("favorite-anchor", "profile#favorite");
    cy.getByData("profile-section-title").should("contain.text", "Favoritos");

    cy.verifyPage("rated-anchor", "profile#rated");
    cy.getByData("profile-section-title").should("contain.text", "Avaliações");
  });

  it("should redirect without login", () => {
    cy.visit("/");
    cy.visit("/profile");
    cy.url().should("include", "/login");
    
    cy.visit("/");
    cy.visit("/profile#recommended");
    cy.url().should("include", "/login");
    
    cy.visit("/");
    cy.visit("/profile#watchlist");
    cy.url().should("include", "/login");
    
    cy.visit("/");
    cy.visit("/profile#favorite");
    cy.url().should("include", "/login");
    
    cy.visit("/");
    cy.visit("/profile#rated");
    cy.url().should("include", "/login");
  });
});
