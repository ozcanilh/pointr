const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 14000,
  pageLoadTimeout: 120000,
  requestTimeout: 10000,
  responseTimeout: 200000,
  screenshotOnRunFailure: true,
  waitForAnimations: true,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json",
  },
  retries: 0,
  e2e: {
    baseUrl: 'https://www.pointr.tech',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
