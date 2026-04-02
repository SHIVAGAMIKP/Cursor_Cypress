const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl:
      process.env.CYPRESS_BASE_URL ||
      "https://demo1.dustidecommerce.store",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
