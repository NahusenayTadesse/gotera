import { describe, it, expect, beforeEach, vi } from 'vitest';
import { and, eq } from 'drizzle-orm';

/**
 * Webhook fulfilment for add-ons bought from /account or the reminder email.
 *
 * Stripe does not guarantee exactly-once delivery, and applying a purchase twice would
 * silently double what the customer receives. The dedupe key is
 * `delivery_addon_purchases.stripe_payment_intent_id`; these tests drive the real handler
 * through the real POST route with only signature verification and email stubbed.
 */
let currentEvent: any = null;
vi.mock('$lib/server/stripe', () => ({
	stripe: {
		webhooks: { constructEvent: () => currentEvent },
		checkout: { sessions: { create: vi.fn() } },
		subscriptions: { update: vi.fn() }
	}
}));

const emailSpy = vi.fn().mockResolvedValue(undefined);
vi.mock('$lib/server/email', async (orig) => ({
	...(await orig<Record<string, unknown>>()),
	sendAddonsAdded: (...a: unknown[]) => emailSpy(...a)
}));

const { db } = await import('$lib/server/db');
const { addons, deliveries, deliveryAddons, deliveryAddonPurchases } = await import(
	'$lib/server/db/schema'
);
const { POST } = await import('../+server');

let deliveryId: string;
let addonId: string;

/** Reuse a real delivery from the seeded DB so foreign keys line up. */
beforeEach(async () => {
	emailSpy.mockClear();

	const [addon] = await db.select().from(addons).where(eq(addons.isActive, true));
	addonId = addon.id;

	const [existing] = await db.select().from(deliveries);
	deliveryId = existing.id;

	// Start from a clean slate for this delivery+addon pairing.
	await db
		.delete(deliveryAddons)
		.where(and(eq(deliveryAddons.deliveryId, deliveryId), eq(deliveryAddons.addonId, addonId)));
	await db.delete(deliveryAddonPurchases).where(eq(deliveryAddonPurchases.deliveryId, deliveryId));
});

function purchaseEvent(paymentIntentId: string, quantity = 2) {
	return {
		type: 'checkout.session.completed',
		data: {
			object: {
				id: `cs_${paymentIntentId}`,
				mode: 'payment',
				payment_intent: paymentIntentId,
				amount_total: 1000,
				metadata: {
					kind: 'delivery-addon',
					deliveryId,
					items: JSON.stringify([{ id: addonId, quantity }])
				}
			}
		}
	};
}

const post = () =>
	POST({
		request: new Request('http://localhost/api/stripe/webhook', {
			method: 'POST',
			headers: { 'stripe-signature': 'test' },
			body: '{}'
		})
	} as any);

describe('delivery add-on purchase fulfilment', () => {
	it('applies the purchase to the delivery', async () => {
		currentEvent = purchaseEvent(`pi_${crypto.randomUUID().slice(0, 12)}`, 2);
		await post();

		const [row] = await db
			.select()
			.from(deliveryAddons)
			.where(and(eq(deliveryAddons.deliveryId, deliveryId), eq(deliveryAddons.addonId, addonId)));

		expect(row).toBeDefined();
		expect(row.quantity).toBe(2);
	});

	it('records the payment so it can be deduped', async () => {
		const pi = `pi_${crypto.randomUUID().slice(0, 12)}`;
		currentEvent = purchaseEvent(pi, 1);
		await post();

		const [purchase] = await db
			.select()
			.from(deliveryAddonPurchases)
			.where(eq(deliveryAddonPurchases.stripePaymentIntentId, pi));

		expect(purchase).toBeDefined();
		expect(purchase.amountPence).toBe(1000);
	});

	it('is idempotent — a retried event does not double-add', async () => {
		const pi = `pi_${crypto.randomUUID().slice(0, 12)}`;
		currentEvent = purchaseEvent(pi, 3);

		await post();
		await post(); // Stripe retry
		await post(); // and again

		const [row] = await db
			.select()
			.from(deliveryAddons)
			.where(and(eq(deliveryAddons.deliveryId, deliveryId), eq(deliveryAddons.addonId, addonId)));

		expect(row.quantity).toBe(3); // not 9

		const purchases = await db
			.select()
			.from(deliveryAddonPurchases)
			.where(eq(deliveryAddonPurchases.stripePaymentIntentId, pi));
		expect(purchases).toHaveLength(1);
	});

	it('treats a genuinely separate payment as a new purchase', async () => {
		currentEvent = purchaseEvent(`pi_${crypto.randomUUID().slice(0, 12)}`, 2);
		await post();
		currentEvent = purchaseEvent(`pi_${crypto.randomUUID().slice(0, 12)}`, 3);
		await post();

		const [row] = await db
			.select()
			.from(deliveryAddons)
			.where(and(eq(deliveryAddons.deliveryId, deliveryId), eq(deliveryAddons.addonId, addonId)));

		expect(row.quantity).toBe(5); // bumped, not replaced
	});

	it('ignores an event with unparseable item metadata', async () => {
		const ev = purchaseEvent(`pi_${crypto.randomUUID().slice(0, 12)}`);
		ev.data.object.metadata.items = 'not-json';
		currentEvent = ev;

		await expect(post()).resolves.toBeDefined();

		const rows = await db
			.select()
			.from(deliveryAddons)
			.where(and(eq(deliveryAddons.deliveryId, deliveryId), eq(deliveryAddons.addonId, addonId)));
		expect(rows).toHaveLength(0);
	});

	it('ignores a payment event that is not an add-on purchase', async () => {
		const ev = purchaseEvent(`pi_${crypto.randomUUID().slice(0, 12)}`);
		(ev.data.object.metadata as any).kind = 'something-else';
		currentEvent = ev;

		await post();

		const rows = await db
			.select()
			.from(deliveryAddons)
			.where(and(eq(deliveryAddons.deliveryId, deliveryId), eq(deliveryAddons.addonId, addonId)));
		expect(rows).toHaveLength(0);
	});
});
