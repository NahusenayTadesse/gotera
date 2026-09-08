import { test, expect } from '@playwright/test';

/** Signed-in behaviour. Uses the storageState created by auth.setup.ts. */
test.describe('signed-in', () => {
	test('/account loads for a session', async ({ page }) => {
		await page.goto('/account');
		await expect(page).toHaveURL(/\/account/);
	});

	test('/signup does not loop for an authenticated visitor', async ({ page }) => {
		// Regression test for the real bug this suite found: /signup redirected signed-in
		// users to /signup?redirectTo=<itself>, so `load` ran again and nested the query
		// string until the browser aborted with "too many redirects". It also replayed the
		// signup POST, which is how the duplicate subscriber insert was discovered.
		await page.goto('/signup');

		await expect(page).toHaveURL(/\/account/);
		expect(page.url()).not.toContain('redirectTo');
		expect(page.url().length).toBeLessThan(120);
	});

	test('/login sends an authenticated visitor onward, without looping', async ({ page }) => {
		await page.goto('/login');
		expect(page.url()).not.toMatch(/redirectTo.*redirectTo/);
		expect(page.url().length).toBeLessThan(120);
	});
});
