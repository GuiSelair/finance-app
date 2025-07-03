import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: 'e2e/**/*.e2e-spec.{ts,tsx}',
    supportFile: false,
		viewportWidth: 1366,
		viewportHeight: 768,
		env: {
			WEB_URL: 'http://localhost:3000',
		}
  },
});
