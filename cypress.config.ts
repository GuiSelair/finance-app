import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: 'e2e/tests/**/*.e2e-spec.{ts,tsx}',
    supportFile: 'e2e/setup/index.ts',
		viewportWidth: 1366,
		viewportHeight: 768,
		baseUrl: 'http://localhost:3000',
		env: {
			WEB_URL: 'http://localhost:3000',
			NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY: '@finance_app',
		},
		screenshotsFolder: 'e2e/screenshots',
  },
});
