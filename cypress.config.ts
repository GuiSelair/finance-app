import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: 'e2e/tests/**/*.e2e-spec.{ts,tsx}',
    supportFile: 'e2e/setup/index.ts',
		viewportWidth: 1366,
		viewportHeight: 768,
		baseUrl: 'http://localhost:3000',
		screenshotsFolder: 'e2e/screenshots',
  },
});
