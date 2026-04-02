---
name: cypress-selector-automation-rules
description: Enforces Cypress selector and automation standards with stable, human-readable locators and chainable assertions. Use when creating, updating, or reviewing Cypress tests, page objects, and custom commands, especially when data-testid is unavailable.
---

# Cypress Selector Automation Rules

## When To Apply

Apply this skill when:
- Writing or refactoring Cypress tests in `cypress/e2e/`
- Updating page objects in `cypress/pages/`
- Creating reusable commands in `cypress/support/commands.js`
- Reviewing selector quality, readability, and stability

## Selector Strategy

### Preferred selectors (in order)
1. `id`
2. `name`
3. `placeholder`
4. `aria-label`
5. `cy.contains()` for user-facing text (especially buttons and labels)

If `data-testid` is not available in the app, default to the attributes above plus text-based selection via `cy.contains()`.

### Required Cypress command usage
- Use Cypress-native querying: `cy.get()`, `cy.contains()`, `cy.find()`
- Prefer `cy.contains('button', 'Login')` for button interactions
- Prefer readable selectors over deep/complex CSS paths

### Disallowed selector patterns
- No XPath selectors
- No `nth-child` selectors
- No complex CSS descendant chains
- No dynamic class-name selectors
- No unstable text-only selectors when a stable attribute exists

## Avoid jQuery-Style Patterns

Do not use jQuery selector behavior inside Cypress queries:
- `:contains()`
- `:visible`
- `:hidden`
- `.filter()` with jQuery pseudo-selectors
- jQuery-dependent chaining assumptions

Use these instead:
- `cy.contains('button', 'Login')` instead of filtering by text
- `cy.get(selector).should('be.visible')` instead of `:visible`
- Assertions with `.should()` instead of filtering to detect state

## Code Style And Chainability

- Keep commands chainable
- Return Cypress chains from helper/page-object functions
- Avoid unnecessary temporary variables for elements
- Assert after each meaningful action

## Recommended Patterns

```js
// Good: explicit and readable
cy.contains('button', 'Login').should('be.visible').click();
cy.get('[name="email"]').should('be.visible').type(user.email);
cy.get('[aria-label="Password"]').should('be.visible').type(user.password);
cy.get('[id="submit"]').should('be.enabled').click();
```

```js
// Avoid: jQuery-like and unstable patterns
cy.get('form > div:nth-child(2) > input').type(user.email);
cy.get('.btn.dynamic-abc123').click();
cy.get('button:contains("Login")').click();
cy.get('#panel :visible').click();
```

## Enforcement Checklist

Before finalizing Cypress code, verify:
- Selectors are human-readable and stable
- No XPath, `nth-child`, dynamic classes, or complex CSS paths
- No jQuery pseudo-selectors (`:contains`, `:visible`, `:hidden`)
- Assertions use `.should()` with Cypress chaining
- Functions return Cypress chains where reusable
