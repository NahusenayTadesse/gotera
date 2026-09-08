import { describe, it, expect } from 'vitest';
import Stripe from 'stripe';
// `$env/dynamic/private` is what loads .env under vitest — process.env is not populated.
import { env } from '$env/dynamic/private';

/**
 * Hits the real Stripe API in test mode.
 *
 * The point is to prove the payloads we build are actually *accepted*, not merely shaped
 * the way we expect. The bug this guards against was invisible to a mocked test: an
 * add-on carrying a stored Stripe Price can only ever be recurring or one-time, so it
 * broke whichever checkout mode it wasn't created for. Inline `price_data` fixes that,
 * and only the live API can confirm it.
 */
const key = env.STRIPE_SECRET_KEY;
const live = key?.startsWith('sk_test_') ? describe : describe.skip;

// Guard against ever pointing this at a real account.
if (key && !key.startsWith('sk_test_')) {
	throw new Error('stripe.live.test.ts must only run against a test-mode key');
}

const stripe = new Stripe(key ?? 'sk_test_placeholder');

const ADDON = { name: 'Berbere Spice', pricePence: 500 };

live('Stripe accepts our add-on line items', () => {
	it('takes inline price_data in payment mode', async () => {
		const session = await stripe.checkout.sessions.create({
			mode: 'payment',
			line_items: [
				{
					price_data: {
						currency: 'gbp',
						product_data: { name: ADDON.name },
						unit_amount: ADDON.pricePence
					},
					quantity: 2
				}
			],
			success_url: 'https://gotera.co.uk/account?success=1',
			cancel_url: 'https://gotera.co.uk/subscribe'
		});

		expect(session.id).toMatch(/^cs_test_/);
		expect(session.amount_total).toBe(ADDON.pricePence * 2);
		expect(session.url).toContain('checkout.stripe.com');
	});

	it('takes inline recurring price_data in subscription mode', async () => {
		const session = await stripe.checkout.sessions.create({
			mode: 'subscription',
			line_items: [
				{
					price_data: {
						currency: 'gbp',
						product_data: { name: 'Regular plan' },
						unit_amount: 2400,
						recurring: { interval: 'month', interval_count: 1 }
					},
					quantity: 1
				},
				{
					// The add-on must share the plan's cadence or Stripe rejects the session.
					price_data: {
						currency: 'gbp',
						product_data: { name: ADDON.name },
						unit_amount: ADDON.pricePence,
						recurring: { interval: 'month', interval_count: 1 }
					},
					quantity: 1
				}
			],
			success_url: 'https://gotera.co.uk/account?welcome=1',
			cancel_url: 'https://gotera.co.uk/subscribe'
		});

		expect(session.id).toMatch(/^cs_test_/);
		expect(session.mode).toBe('subscription');
	});

	it('supports the bi-monthly cadence our Family/bi_monthly plans use', async () => {
		const session = await stripe.checkout.sessions.create({
			mode: 'subscription',
			line_items: [
				{
					price_data: {
						currency: 'gbp',
						product_data: { name: 'Bi-monthly plan' },
						unit_amount: 4000,
						recurring: { interval: 'month', interval_count: 2 }
					},
					quantity: 1
				}
			],
			success_url: 'https://gotera.co.uk/account',
			cancel_url: 'https://gotera.co.uk/subscribe'
		});
		expect(session.id).toMatch(/^cs_test_/);
	});

	it('rejects mixed cadences, which is why recurringFor derives from the plan', async () => {
		await expect(
			stripe.checkout.sessions.create({
				mode: 'subscription',
				line_items: [
					{
						price_data: {
							currency: 'gbp',
							product_data: { name: 'Monthly plan' },
							unit_amount: 2400,
							recurring: { interval: 'month', interval_count: 1 }
						},
						quantity: 1
					},
					{
						price_data: {
							currency: 'gbp',
							product_data: { name: ADDON.name },
							unit_amount: ADDON.pricePence,
							recurring: { interval: 'month', interval_count: 2 }
						},
						quantity: 1
					}
				],
				success_url: 'https://gotera.co.uk/account',
				cancel_url: 'https://gotera.co.uk/subscribe'
			})
		).rejects.toThrow();
	});

	it('rejects a one-time price in subscription mode — the old stripePriceId bug', async () => {
		await expect(
			stripe.checkout.sessions.create({
				mode: 'subscription',
				line_items: [
					{
						price_data: {
							currency: 'gbp',
							product_data: { name: ADDON.name },
							unit_amount: ADDON.pricePence
							// no `recurring` — exactly what a one-time stored Price looked like
						},
						quantity: 1
					}
				],
				success_url: 'https://gotera.co.uk/account',
				cancel_url: 'https://gotera.co.uk/subscribe'
			})
		).rejects.toThrow();
	});

	it('enforces the 500-character metadata cap our basket guard anticipates', async () => {
		await expect(
			stripe.checkout.sessions.create({
				mode: 'payment',
				line_items: [
					{
						price_data: { currency: 'gbp', product_data: { name: 'x' }, unit_amount: 100 },
						quantity: 1
					}
				],
				metadata: { items: 'x'.repeat(501) },
				success_url: 'https://gotera.co.uk/account',
				cancel_url: 'https://gotera.co.uk/subscribe'
			})
		).rejects.toThrow();
	});
});
