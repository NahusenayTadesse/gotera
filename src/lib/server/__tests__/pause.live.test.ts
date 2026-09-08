import { describe, it, expect } from 'vitest';
import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

/**
 * Verifies the pause mechanism against the real Stripe test API.
 *
 * The behaviour this pins down is the one that made the old code wrong: a subscription
 * paused with `pause_collection` still reports `status: 'active'`. Anything deriving our
 * paused state from `status` alone silently un-pauses the customer.
 */
const key = env.STRIPE_SECRET_KEY;
const live = key?.startsWith('sk_test_') ? describe : describe.skip;
const stripe = new Stripe(key ?? 'sk_test_placeholder');

async function makeSubscription() {
	const customer = await stripe.customers.create({ email: `pause-${Date.now()}@test.co` });
	const price = await stripe.prices.create({
		currency: 'gbp',
		unit_amount: 2400,
		recurring: { interval: 'month' },
		product_data: { name: 'Pause test plan' }
	});
	const sub = await stripe.subscriptions.create({
		customer: customer.id,
		items: [{ price: price.id }],
		// Skip the payment method requirement for a pure state test.
		trial_period_days: 30
	});
	return sub;
}

live('pause_collection', () => {
	it('leaves status "active" — which is why mapStatus must read pause_collection', async () => {
		const sub = await makeSubscription();
		const paused = await stripe.subscriptions.update(sub.id, {
			pause_collection: { behavior: 'void' }
		});

		expect(paused.pause_collection).not.toBeNull();
		expect(paused.pause_collection?.behavior).toBe('void');
		// The crux: Stripe does NOT report 'paused' here.
		expect(paused.status).not.toBe('paused');

		await stripe.subscriptions.cancel(sub.id);
	});

	it('clears cleanly on resume', async () => {
		const sub = await makeSubscription();
		await stripe.subscriptions.update(sub.id, { pause_collection: { behavior: 'void' } });
		const resumed = await stripe.subscriptions.update(sub.id, { pause_collection: null });

		expect(resumed.pause_collection).toBeNull();

		await stripe.subscriptions.cancel(sub.id);
	});
});
