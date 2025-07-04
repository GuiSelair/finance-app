import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: 'e2e/**/*.e2e-spec.{ts,tsx}',
    supportFile: false,
		viewportWidth: 1366,
		viewportHeight: 768,
		baseUrl: 'http://localhost:3000',
		env: {
			WEB_URL: 'http://localhost:3000',
		},
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
  },
});
