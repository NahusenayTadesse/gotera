import { test, expect } from '@playwright/test';

/**
 * Signed-out access control. Runs in the `anonymous` project, which carries no
 * storageState, so these genuinely execute without a session.
 */
test.describe('signed-out access', () => {
	test('/account redirects to login', async ({ page }) => {
		await page.goto('/account');
		await expect(page).toHaveURL(/\/login/);
	});

	test('/dashboard redirects to login', async ({ page }) => {
		await page.goto('/dashboard');
		await expect(page).toHaveURL(/\/login/);
	});

	test('dashboard sub-pages are protected too', async ({ page }) => {
		for (const path of ['/dashboard/stock', '/dashboard/addons', '/dashboard/customers']) {
			await page.goto(path);
			await expect(page).toHaveURL(/\/login/);
		}
	});

	test('a dashboard form action cannot be POSTed without a session', async ({ request }) => {
		// The reason the guard lives in hooks.server.ts: SvelteKit does NOT run a parent
		// layout's `load` before a form action, so gating only in +layout.server.ts would
		// leave every ?/action reachable. This POSTs directly, bypassing any page render.
		const res = await request.post('/dashboard/stock?/setCapacity', {
			form: { stockId: 'x', capacity: '999999' },
			maxRedirects: 0
		});
		expect([302, 303, 401, 403]).toContain(res.status());
	});

	test('the cron endpoint rejects an unauthenticated call', async ({ request }) => {
		const res = await request.get('/api/cron/upcoming-deliveries');
		expect(res.status()).toBe(401);
	});

	test('the cron endpoint rejects a secret passed in the query string', async ({ request }) => {
		// Query-string secrets leak via access logs and Referer headers, so only the
		// Authorization header is accepted.
		const res = await request.get('/api/cron/upcoming-deliveries?secret=anything');
		expect(res.status()).toBe(401);
	});

	test('the add-on token page 404s an unknown token', async ({ page }) => {
		const res = await page.goto('/addons/definitely-not-a-real-token');
		expect(res?.status()).toBe(404);
	});
});
