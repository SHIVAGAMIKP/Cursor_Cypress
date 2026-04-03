/// <reference types="cypress" />

declare module "cypress-mochawesome-reporter/plugin" {
  const plugin: (on: Cypress.PluginEvents) => void;
  export = plugin;
}
