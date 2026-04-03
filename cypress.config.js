const { defineConfig } = require("cypress");

/** Returns YYYY-MM-DD_HH-mm-ss timestamp */
const timestamp = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
};

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: process.env.CYPRESS_REPORT_DIR || "cypress/reports/html",
    overwrite: false,                    // ✅ important for unique filenames
    embeddedScreenshots: true,
    inlineAssets: true,
    charts: true,
    reportFilename: `report-${timestamp()}`, // default, overridden in before:run
  },

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "https://demo11.dustidecommerce.store/users/",
    setupNodeEvents(on) {
      on("before:run", (details) => {
        const browser = (details.browser?.name || "unknown").replace(/[^a-zA-Z0-9-_]/g, "_");
        details.config.reporterOptions.reportFilename = `report-${timestamp()}_${browser}`;
        details.config.reporterOptions.overwrite = false; // ✅ ensure unique file
      });

      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
})