import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { and, eq, inArray, ne } from 'drizzle-orm';

/**
 * Subscription renewals, retried events and stock holds, through the real webhook route.
 *
 * Only the Stripe client, outgoing email, auth and the delivery calendar are faked. The
 * calendar is pinned to a far-future Saturday so every stock row these tests touch is
 * their own, and every row they create is removed afterwards.
 */
const FAR_SATURDAY = new Date(2099, 1, 7); // 2099-02-07, local midnight like mysql2 returns
const MOVED_SATURDAY = new Date(2099, 1, 14);

let currentEvent: any = null;
let stripeSub: any = null;
vi.mock('$lib/server/stripe', () => ({
	stripe: {
		webhooks: { constructEvent: () => currentEvent },
		subscriptions: { retrieve: vi.fn(async () => stripeSub), update: vi.fn() },
		checkout: { sessions: { create: vi.fn() } }
	}
}));

vi.mock('$lib/server/deliverySchedule', () => ({
	nextDeliveryDate: vi.fn(async () => FAR_SATURDAY),
	nextDeliveryDateIgnoringCapacity: vi.fn(async () => FAR_SATURDAY),
	nextDeliveryDateAfter: vi.fn(async () => MOVED_SATURDAY)
}));

const sent: Record<string, number> = {};
vi.mock('$lib/server/email', async (orig) => {
	const real = await orig<Record<string, unknown>>();
	return Object.fromEntries(
		Object.keys(real).map((k) => [
			k,
			typeof real[k] === 'function'
				? async () => {
						sent[k] = (sent[k] ?? 0) + 1;
					}
				: real[k]
		])
	);
});

const magicLink = vi.fn(async () => ({ status: true }));
vi.mock('$lib/server/auth', () => ({ auth: { api: { signInMagicLink: magicLink } } }));

const { db } = await import('$lib/server/db');
const { subscribers, subscriptions, addresses, deliveries, plans, planPrices, guestOrders, stock, stockChanges } =
	await import('$lib/server/db/schema');
const { syncDeliveryStock, deleteReleasingStock, readMainStock } = await import('$lib/server/stock');
const { POST } = await import('../+server');
const { toCalendarString } = await import('$lib/format');

let plan: typeof plans.$inferSelect;
let subscriberId: string;
let subscriptionId: string;
let addressId: string;
let stripeSubId: string;
const guestIds: string[] = [];

const post = () =>
	POST({
		request: new Request('http://localhost/api/stripe/webhook', {
			method: 'POST',
			headers: { 'stripe-signature': 'test' },
			body: '{}'
		})
	} as any);

const usedOn = async (date: Date) => (await readMainStock(date))?.used ?? 0;

const myDeliveries = () =>
	db.select().from(deliveries).where(eq(deliveries.subscriptionId, subscriptionId));

/** Basil+ invoice shape: the subscription id lives under `parent`. */
const invoicePaid = (invoiceId: string, billingReason = 'subscription_cycle') => ({
	type: 'invoice.paid',
	data: {
		object: {
			id: invoiceId,
			billing_reason: billingReason,
			parent: { type: 'subscription_details', subscription_details: { subscription: stripeSubId } }
		}
	}
});

async function wipeStock() {
	for (const d of [FAR_SATURDAY, MOVED_SATURDAY]) {
		const row = await readMainStock(d);
		if (row) {
			await db.delete(stockChanges).where(eq(stockChanges.stockId, row.id));
			await db.delete(stock).where(eq(stock.id, row.id));
		}
	}
}

beforeEach(async () => {
	for (const k of Object.keys(sent)) delete sent[k];
	await wipeStock();

	const [regular] = await db.select().from(plans).where(eq(plans.slug, 'regular'));
	plan = regular;

	subscriberId = crypto.randomUUID();
	subscriptionId = crypto.randomUUID();
	addressId = crypto.randomUUID();
	stripeSubId = `sub_test_${crypto.randomUUID().slice(0, 12)}`;

	await db.insert(subscribers).values({ id: subscriberId, email: `vitest-${subscriberId}@test.co` });
	await db
		.insert(addresses)
		.values({ id: addressId, subscriberId, line1: '1 Test St', postcode: 'N17 0AB' });
	await db.insert(subscriptions).values({
		id: subscriptionId,
		subscriberId,
		planId: plan.id,
		addressId,
		status: 'active',
		quantity: 2,
		stripeSubscriptionId: stripeSubId
	});

	stripeSub = {
		id: stripeSubId,
		status: 'active',
		pause_collection: null,
		cancel_at_period_end: false,
		items: {
			data: [
				{
					price: { id: plan.stripePriceId },
					quantity: 2,
					current_period_end: Math.floor(Date.now() / 1000) + 30 * 86400
				}
			]
		}
	};
});

afterEach(async () => {
	// Explicit, child-first: a database built with `db:push` may not have the declared
	// ON DELETE CASCADE foreign keys, and leftovers would collide with the unique invoice id.
	await db.delete(deliveries).where(eq(deliveries.subscriberId, subscriberId));
	await db.delete(subscriptions).where(eq(subscriptions.subscriberId, subscriberId));
	await db.delete(addresses).where(eq(addresses.subscriberId, subscriberId));
	await db.delete(subscribers).where(eq(subscribers.id, subscriberId));
	if (guestIds.length) {
		await db.delete(guestOrders).where(inArray(guestOrders.id, guestIds.splice(0)));
	}
	await wipeStock();
});

describe('renewal invoices', () => {
	it('books a delivery from the basil+ invoice shape and reserves packs × quantity', async () => {
		currentEvent = invoicePaid('in_test_renewal_1');
		await post();

		const rows = await myDeliveries();
		expect(rows).toHaveLength(1);
		expect(rows[0].stripeInvoiceId).toBe('in_test_renewal_1');
		expect(rows[0].stockUnits).toBe(plan.packs * 2);
		expect(await usedOn(FAR_SATURDAY)).toBe(plan.packs * 2);
	});

	it('snapshots plan, packs, quantity and the billed unit price onto the delivery', async () => {
		stripeSub.items.data[0].price.unit_amount = plan.pricePence;
		currentEvent = invoicePaid('in_test_snapshot');
		await post();

		const [row] = await myDeliveries();
		expect(row.planId).toBe(plan.id);
		expect(row.packs).toBe(plan.packs);
		expect(row.quantity).toBe(2);
		expect(row.unitPricePence).toBe(plan.pricePence);
	});

	it('is idempotent: a retried invoice books nothing more', async () => {
		currentEvent = invoicePaid('in_test_retry');
		await post();
		await post();
		await post();

		expect(await myDeliveries()).toHaveLength(1);
		expect(await usedOn(FAR_SATURDAY)).toBe(plan.packs * 2);
	});

	it('books a new delivery for each genuinely new invoice', async () => {
		currentEvent = invoicePaid('in_test_month_1');
		await post();
		currentEvent = invoicePaid('in_test_month_2');
		await post();

		expect(await myDeliveries()).toHaveLength(2);
	});

	it('still understands the legacy top-level invoice.subscription', async () => {
		currentEvent = {
			type: 'invoice.paid',
			data: { object: { id: 'in_test_legacy', billing_reason: 'subscription_cycle', subscription: stripeSubId } }
		};
		await post();

		expect(await myDeliveries()).toHaveLength(1);
	});

	it('leaves the first invoice to checkout.session.completed', async () => {
		currentEvent = invoicePaid('in_test_first', 'subscription_create');
		await post();

		expect(await myDeliveries()).toHaveLength(0);
	});

	it('notifies on a first failed payment found via the new invoice shape', async () => {
		currentEvent = {
			type: 'invoice.payment_failed',
			data: {
				object: {
					id: 'in_test_failed',
					attempt_count: 1,
					parent: { subscription_details: { subscription: stripeSubId } }
				}
			}
		};
		await post();

		expect(sent.sendPaymentFailed).toBe(1);
		expect(sent.notifyAdminPaymentFailed).toBe(1);
	});
});

describe('price changes', () => {
	const OLD_PRICE = `price_vitest_old_${crypto.randomUUID().slice(0, 8)}`;
	afterEach(async () => {
		await db.delete(planPrices).where(eq(planPrices.stripePriceId, OLD_PRICE));
	});

	it('a customer still billed on a retired Price keeps their plan and their price', async () => {
		// Regular used to sell at OLD_PRICE (£19.99); it has since moved to a new Price.
		await db.insert(planPrices).values({
			planId: plan.id,
			stripePriceId: OLD_PRICE,
			pricePence: 1999,
			activeFrom: new Date(2025, 0, 1),
			activeTo: new Date(2026, 0, 1)
		});
		// Start the row on another plan, so only the price-history lookup can put it back.
		const [other] = await db
			.select()
			.from(plans)
			.where(and(eq(plans.kind, 'subscription'), ne(plans.id, plan.id)));
		await db.update(subscriptions).set({ planId: other.id }).where(eq(subscriptions.id, subscriptionId));

		stripeSub.items.data[0].price = { id: OLD_PRICE, unit_amount: 1999 };
		currentEvent = invoicePaid('in_test_grandfathered');
		await post();

		const [sub] = await db.select().from(subscriptions).where(eq(subscriptions.id, subscriptionId));
		expect(sub.planId).toBe(plan.id);
		expect(sub.stripePriceId).toBe(OLD_PRICE);
		expect(sub.unitPricePence).toBe(1999);

		// And the delivery records what they actually paid, not today's plan price.
		const [delivery] = await myDeliveries();
		expect(delivery.unitPricePence).toBe(1999);
	});
});

describe('subscription checkout', () => {
	const checkoutCompleted = () => ({
		type: 'checkout.session.completed',
		data: {
			object: {
				id: 'cs_test_sub',
				mode: 'subscription',
				subscription: stripeSubId,
				customer: 'cus_test',
				invoice: 'in_test_checkout_first',
				amount_total: plan.pricePence * 2,
				metadata: { subscriberId, subscriptionId, addressId, addonIds: '' }
			}
		}
	});

	it('books one delivery and sends confirmations once, however often Stripe retries', async () => {
		currentEvent = checkoutCompleted();
		await post();
		await post();

		const rows = await myDeliveries();
		expect(rows).toHaveLength(1);
		expect(rows[0].stripeInvoiceId).toBe('in_test_checkout_first');
		expect(sent.sendSubscriptionConfirmed).toBe(1);
		expect(sent.notifyAdminNewSubscriber).toBe(1);
	});

	it('and the matching first invoice.paid adds nothing', async () => {
		currentEvent = checkoutCompleted();
		await post();
		currentEvent = invoicePaid('in_test_checkout_first', 'subscription_cycle');
		await post();

		expect(await myDeliveries()).toHaveLength(1);
	});
});

describe('stock holds', () => {
	async function bookOne() {
		currentEvent = invoicePaid(`in_test_${crypto.randomUUID().slice(0, 8)}`);
		await post();
		const [row] = await myDeliveries();
		return row;
	}

	it('skipping gives the units back, and un-skipping takes them again', async () => {
		const d = await bookOne();
		const units = d.stockUnits;

		await db.update(deliveries).set({ status: 'skipped' }).where(eq(deliveries.id, d.id));
		await syncDeliveryStock(d.id);
		expect(await usedOn(FAR_SATURDAY)).toBe(0);

		await syncDeliveryStock(d.id); // a second sync can't release twice
		expect(await usedOn(FAR_SATURDAY)).toBe(0);

		await db.update(deliveries).set({ status: 'scheduled' }).where(eq(deliveries.id, d.id));
		await syncDeliveryStock(d.id);
		expect(await usedOn(FAR_SATURDAY)).toBe(units);
	});

	it('rescheduling moves the hold to the new date', async () => {
		const d = await bookOne();

		await db.update(deliveries).set({ scheduledDate: MOVED_SATURDAY }).where(eq(deliveries.id, d.id));
		await syncDeliveryStock(d.id);

		expect(await usedOn(FAR_SATURDAY)).toBe(0);
		expect(await usedOn(MOVED_SATURDAY)).toBe(d.stockUnits);
	});

	it('deleting a delivery releases its hold', async () => {
		const d = await bookOne();

		await deleteReleasingStock('delivery', d.id, () => db.delete(deliveries).where(eq(deliveries.id, d.id)));

		expect(await usedOn(FAR_SATURDAY)).toBe(0);
	});

	it('a failed delete keeps the hold', async () => {
		const d = await bookOne();

		await expect(
			deleteReleasingStock('delivery', d.id, async () => {
				throw new Error('FK violation');
			})
		).rejects.toThrow();

		expect(await usedOn(FAR_SATURDAY)).toBe(d.stockUnits);
	});
});

describe('one-off orders', () => {
	async function guestOrder(quantity: number) {
		const id = crypto.randomUUID();
		guestIds.push(id);
		await db.insert(guestOrders).values({
			id,
			recipientName: 'vitest guest',
			recipientAddress: { line1: '1 Test St', line2: null, city: 'London', postcode: 'N17 0AB', phone: null },
			quantity,
			status: 'pending'
		});
		return id;
	}

	const guestPaid = (guestOrderId: string) => ({
		type: 'checkout.session.completed',
		data: {
			object: {
				id: `cs_${guestOrderId}`,
				mode: 'payment',
				payment_intent: `pi_${guestOrderId.slice(0, 12)}`,
				amount_total: 1000,
				customer_details: { email: `vitest-${guestOrderId}@test.co`, name: 'Guest' },
				metadata: { guestOrderId, kind: 'order', addonIds: '' }
			}
		}
	});

	it('records the total Stripe charged on the order', async () => {
		const id = await guestOrder(1);
		currentEvent = guestPaid(id);
		await post();

		const [order] = await db.select().from(guestOrders).where(eq(guestOrders.id, id));
		expect(order.amountPence).toBe(1000);
	});

	it('a paid guest order reserves its quantity on the booked date, once', async () => {
		const id = await guestOrder(3);
		currentEvent = guestPaid(id);
		await post();
		await post(); // retry

		const [order] = await db.select().from(guestOrders).where(eq(guestOrders.id, id));
		expect(order.status).toBe('paid');
		expect(order.stockUnits).toBe(3);
		expect(order.deliveryDate && toCalendarString(order.deliveryDate)).toBe('2099-02-07');
		expect(await usedOn(FAR_SATURDAY)).toBe(3);
		expect(sent.sendOrderConfirmed).toBe(1);
	});

	it('sends a magic link without creating an account', async () => {
		magicLink.mockClear();
		const id = await guestOrder(1);
		currentEvent = guestPaid(id);
		await post();

		expect(magicLink).toHaveBeenCalledTimes(1);
		expect((magicLink.mock.calls[0] as any[])[0].body.email).toBe(`vitest-${id}@test.co`);
	});

	it('deleting a paid order releases its stock', async () => {
		const id = await guestOrder(2);
		currentEvent = guestPaid(id);
		await post();

		await deleteReleasingStock('guest', id, () => db.delete(guestOrders).where(eq(guestOrders.id, id)));

		expect(await usedOn(FAR_SATURDAY)).toBe(0);
		expect(await db.select().from(guestOrders).where(and(eq(guestOrders.id, id)))).toHaveLength(0);
	});
});
