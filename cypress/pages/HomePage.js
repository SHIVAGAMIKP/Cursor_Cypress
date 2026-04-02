/**
 * Store home: auth entry points (injected after GET /check-session on xl viewport).
 * Selectors use stable href fragments; scope to first visible match (header before footer on desktop).
 */
class HomePage {
  visitHome() {
    cy.visit("/");
  }

  /**
   * Primary Login link (header user menu; first visible /users/login on desktop layout).
   */
  loginEntryLink() {
    return cy
      .get('a[href*="/users/login"]')
      .filter(":visible")
      .first();
  }

  /**
   * Register link targeting customer registration.
   */
  registerEntryLink() {
    return cy
      .get('a[href*="/users/registration"]')
      .filter(":visible")
      .first();
  }

  assertLoginAndRegisterVisible(paths) {
    this.loginEntryLink()
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", paths.login.replace(/^\//, ""));
    this.registerEntryLink()
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", paths.registration.replace(/^\//, ""));
  }

  clickLogin() {
    this.loginEntryLink().should("be.visible").click();
  }

  clickRegister() {
    this.registerEntryLink().should("be.visible").click();
  }
}

module.exports = HomePage;
