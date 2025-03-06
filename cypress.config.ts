import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
