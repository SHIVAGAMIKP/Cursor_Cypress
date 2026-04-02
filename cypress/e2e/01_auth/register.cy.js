const RegisterPage = require("../../pages/register_page.js");

describe("register page", () => {
  const register_page = new RegisterPage();

  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.fixture("register_user").as("register_data");
    cy.intercept("POST", "**/set-timezone").as("set_timezone");
    cy.intercept("POST", "**/register").as("register_request");
  });

  afterEach(() => {
    // This flow creates real users and there is no public cleanup endpoint in this test project.
    // We rely on unique emails to keep the suite idempotent and order-independent.
  });

  it("should register a new user with unique email", function () {
    const unique_email = `auto_user_${Date.now()}@examplemail.test`;

    register_page.visit_register(this.register_data.paths.registration);
    cy.wait("@set_timezone");
    register_page.assert_form_visible();

    register_page.fill_name(this.register_data.user.full_name);
    register_page.fill_email(unique_email);
    register_page.fill_password(this.register_data.user.password);
    register_page.accept_terms();
    register_page.submit_registration();

    cy.wait("@register_request").then((interception) => {
      expect(interception.response, "register response should exist").to.exist;
      expect(interception.response.statusCode, "register status code").to.be.oneOf([
        200,
        201,
        302,
      ]);
    });

    cy.location("pathname").should((pathname) => {
      const expected_paths = ["/users/login", "/users/verification", "/"];
      expect(
        expected_paths.some((allowed) => pathname.startsWith(allowed)),
        `unexpected post-register path: ${pathname}`
      ).to.equal(true);
    });
  });
});
