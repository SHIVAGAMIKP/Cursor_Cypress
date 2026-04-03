const HomePage = require("../../pages/HomePage.js");

describe("Home — auth entry", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.intercept("GET", "**/check-session").as("checkSession");
    cy.intercept("POST", "**/set-timezone").as("setTimezone");
  });

  it.only("logs browser info", () => {
    console.log("hello");
    console.log("hello"+`Browser: ${Cypress.browser.name}`);
    console.log(`Browser family: ${Cypress.browser.family}`);
    console.log(`Browser version: ${Cypress.browser.version}`);
  });

  it("should show Login and Register entry points after session check", function () {
    cy.fixture("app").as("app");
    homePage.visitHome();
    cy.wait(["@setTimezone", "@checkSession"]);
    cy.get("@app").then((app) => {
      homePage.assertLoginAndRegisterVisible(app.paths);
    });
  });

  it("should navigate to login when Login is clicked", function () {
    cy.fixture("app").then((app) => {
      homePage.visitHome();
      cy.wait(["@setTimezone", "@checkSession"]);
      homePage.clickLogin();
      cy.location("pathname").should("include", app.paths.login);
    });
  });

  it("should navigate to registration when Register is clicked", function () {
    cy.fixture("app").then((app) => {
      homePage.visitHome();
      cy.wait(["@setTimezone", "@checkSession"]);
      homePage.clickRegister();
      cy.location("pathname").should("include", app.paths.registration);
    });
  });
});
