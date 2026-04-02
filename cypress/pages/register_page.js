class RegisterPage {
  visit_register(pathname) {
    cy.visit(pathname);
  }

  registration_form() {
    return cy.get("#reg-form");
  }

  name_input() {
    return cy.get("#name");
  }

  email_input() {
    return cy.get('input[name="email"]').filter(":visible").first();
  }

  password_input() {
    return cy.get('input[name="password"]').filter(":visible").first();
  }

  terms_checkbox() {
    return cy.get('input[name="checkbox_example_1"]').first();
  }

  submit_button() {
    return this.registration_form()
      .find('button[type="submit"]')
      .contains(/create account/i);
  }

  assert_form_visible() {
    this.registration_form().should("be.visible");
    this.name_input().should("be.visible");
    this.email_input().should("be.visible");
    this.password_input().should("be.visible");
    this.submit_button().should("be.visible");
  }

  fill_name(full_name) {
    this.name_input().should("be.visible").clear().type(full_name);
    this.name_input().should("have.value", full_name);
  }

  fill_email(email) {
    this.email_input().should("be.visible").clear().type(email);
    this.email_input().should("have.value", email);
  }

  fill_password(password) {
    this.password_input().should("be.visible").clear().type(password, {
      log: false,
    });
  }

  accept_terms() {
    this.terms_checkbox().check({ force: true }).should("be.checked");
  }

  submit_registration() {
    this.submit_button().should("be.enabled").click();
  }
}

module.exports = RegisterPage;
