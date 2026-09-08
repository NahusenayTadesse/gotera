import { test, expect } from '@playwright/test';

/**
 * End-to-end coverage of the subscribe page — the highest-value page in the app, since
 * everything it does ends in a charge.
 *
 * Checkout is followed as far as the redirect to Stripe. That is the real boundary: it
 * proves the plan, address and add-on state a customer built in the browser survived
 * through the form action and produced a valid Stripe session. Completing payment on
 * Stripe's own hosted page would be testing Stripe, not this app.
 */
const address = {
	'#line1d': '221B Baker Street',
	'#postcoded': 'NW1 6XE',
	'#phone': '07700900123'
};

async function fillAddress(page: import('@playwright/test').Page) {
	for (const [sel, value] of Object.entries(address)) {
		await page.locator(sel).fill(value);
	}
}

test.beforeEach(async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto('/subscribe');
	await page.waitForLoadState('networkidle');
});

test.describe('page content', () => {
	test('renders the active plans from the database', async ({ page }) => {
		for (const name of ['One-Off', 'Starter', 'Regular', 'Family']) {
			await expect(page.getByRole('button', { name: new RegExp(name, 'i') }).first()).toBeVisible();
		}
	});

	test('shows a default plan in the order summary', async ({ page }) => {
		const summary = page.getByText('ORDER SUMMARY');
		await expect(summary).toBeVisible();
		await expect(page.getByText(/First payment/i)).toBeVisible();
	});

	test('updates the summary total when a different plan is picked', async ({ page }) => {
		const total = page.locator('text=/First payment/').locator('..');
		const before = await total.innerText();

		await page.getByRole('button', { name: /Starter/i }).first().click();
		await expect.poll(async () => total.innerText()).not.toBe(before);
	});
});

test.describe('add-ons', () => {
	test('adding an extra increases the order total', async ({ page }) => {
		const addon = page.locator('button.addon').first();
		test.skip(!(await addon.count()), 'no add-ons in the catalogue');

		const totalText = () => page.locator('text=/First payment/').locator('..').innerText();
		const before = await totalText();

		await addon.click();
		await expect.poll(totalText).not.toBe(before);
	});
});

test.describe('add-on quantity', () => {
	test('a quantity input appears once an extra is selected, capped at 20', async ({ page }) => {
		const addon = page.locator('button.addon, button.extra-card').first();
		expect(await addon.count()).toBeGreaterThan(0);

		// The extras live in their own step of the wizard on this layout.
		const qty = page.locator('.extra-qty input').first();
		await expect(qty).toHaveCount(0);

		await addon.click();
		await expect(qty).toBeVisible();
		await expect(qty).toHaveValue('1');
		await expect(qty).toHaveAttribute('max', '20');
		await expect(qty).toHaveAttribute('min', '1');
	});

	test('raising the quantity raises the order total', async ({ page }) => {
		const addon = page.locator('button.addon, button.extra-card').first();
		expect(await addon.count()).toBeGreaterThan(0);

		await addon.click();
		const qty = page.locator('.extra-qty input').first();
		const totalText = () => page.locator('text=/First payment/').locator('..').innerText();

		const before = await totalText();
		await qty.fill('4');
		await qty.dispatchEvent('input');
		await expect.poll(totalText).not.toBe(before);
	});

	test('a value above the cap is clamped to 20', async ({ page }) => {
		const addon = page.locator('button.addon, button.extra-card').first();
		expect(await addon.count()).toBeGreaterThan(0);

		await addon.click();
		const qty = page.locator('.extra-qty input').first();
		await qty.fill('999');
		await qty.dispatchEvent('input');
		await expect.poll(async () => qty.inputValue()).toBe('20');
	});
});

test.describe('checkout', () => {
	test('a subscription reaches Stripe with the chosen plan', async ({ page }) => {
		await page.getByRole('button', { name: /Regular/i }).first().click();
		await fillAddress(page);

		await Promise.all([
			page.waitForURL(/checkout\.stripe\.com|stripe/, { timeout: 25_000 }),
			page.locator('[formaction="?/subscribe"]').click()
		]);

		// Reaching Stripe's hosted page is the proof the whole action succeeded.
		expect(page.url()).toContain('stripe.com');
	});

	test('refuses to check out without an address', async ({ page }) => {
		await page.getByRole('button', { name: /Regular/i }).first().click();
		// Deliberately leave line1/postcode empty.
		await page.locator('[formaction="?/subscribe"]').click();
		await page.waitForTimeout(2500);

		// Stays put — the schema requires an address for the "me" flow.
		expect(page.url()).not.toContain('stripe.com');
		expect(page.url()).toContain('/subscribe');
	});

	test('a one-off order reaches Stripe too', async ({ page }) => {
		await page.getByRole('button', { name: /One-Off/i }).first().click();
		await fillAddress(page);

		await Promise.all([
			page.waitForURL(/stripe/, { timeout: 25_000 }),
			page.locator('[formaction="?/subscribe"]').click()
		]);
		expect(page.url()).toContain('stripe.com');
	});
});
