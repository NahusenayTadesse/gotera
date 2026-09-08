import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests for the pages that create orders.
 *
 * These run against `vite preview` (a real production build) rather than the dev server,
 * so the SSR output, form actions and redirects behave as they will in production.
 * Vitest owns the unit/integration suite under `src/`; Playwright only looks in `e2e/`,
 * so the two runners never pick up each other's files.
 */
export default defineConfig({
	testDir: 'e2e',
	// The suite writes to the shared local database (orders, addresses), so parallel
	// workers would race on the same rows the way the vitest server project did.
	workers: 1,
	fullyParallel: false,
	timeout: 30_000,
	expect: { timeout: 10_000 },
	reporter: process.env.CI ? 'line' : [['list']],
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure'
	},
	projects: [
		{ name: 'setup', testMatch: /auth\.setup\.ts/ },
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'], storageState: 'e2e/.auth/user.json' },
			dependencies: ['setup'],
			// `*.anon.spec.ts` must run without a session, so keep it out of this project.
			testIgnore: [/auth\.setup\.ts/, /\.anon\.spec\.ts/]
		},
		{
			// A few pages must be checked signed-out (the login gate on /account).
			name: 'anonymous',
			use: { ...devices['Desktop Chrome'] },
			testMatch: /.*\.anon\.spec\.ts/
		}
	],
	webServer: {
		command: 'npx vite preview --port 4173',
		port: 4173,
		reuseExistingServer: true,
		timeout: 120_000
	}
});
