import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 100000,
  projectId: 'e4o8hu',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
