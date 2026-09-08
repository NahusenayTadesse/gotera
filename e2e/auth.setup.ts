import { test as setup, expect } from '@playwright/test';
import { writeFileSync, mkdirSync } from 'node:fs';

/**
 * Creates a fresh account and saves its signed-in storage state for the other specs.
 *
 * Signing up through the real UI (rather than seeding a session row) keeps the session
 * cookie exactly as Better Auth issues it, and doubles as coverage of the signup flow.
 * A new email per run avoids colliding with rows left by previous runs.
 */
export const STORAGE = 'e2e/.auth/user.json';

setup('create an authenticated session', async ({ page }) => {
	const email = `e2e-${Date.now()}@example.test`;
	const password = 'TestPassw0rd!23';

	await page.goto('/signup');
	await page.fill('#name', 'E2E Tester');
	await page.fill('#email', email);
	await page.fill('#password', password);
	await page.fill('#confirmPassword', password);
	await page.click('button[type=submit]');

	// Better Auth sets the session cookie on the signup response.
	await expect
		.poll(async () => (await page.context().cookies()).some((c) => c.name === 'better-auth.session_token'), {
			timeout: 15_000
		})
		.toBe(true);

	// /account redirects to /login when unauthenticated, so landing there proves the session.
	await page.goto('/account');
	await expect(page).toHaveURL(/\/account/);

	mkdirSync('e2e/.auth', { recursive: true });
	await page.context().storageState({ path: STORAGE });
	writeFileSync('e2e/.auth/email.txt', email);
});
