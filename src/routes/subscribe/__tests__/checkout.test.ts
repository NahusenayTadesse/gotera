import { describe, it, expect, beforeEach, afterAll, vi } from 'vitest';
// superforms parses `__superform_json` with devalue, so the test must encode it the same way.
import { stringify as devalueStringify } from 'devalue';
import { eq, like } from 'drizzle-orm';

/**
 * Exercises the real subscribe/gift/guest actions against the local database, with only
 * Stripe faked. That boundary is deliberate: the things most worth protecting here are
 * what we *send* to Stripe (prices, modes, metadata) and what we write to the DB, and
 * both are lost if the whole action is mocked out.
 */
const created: any[] = [];
vi.mock('$lib/server/stripe', () => ({
	stripe: {
		checkout: {
			sessions: {
				create: vi.fn(async (args: any) => {
					created.push(args);
					return { id: 'cs_test_fake', url: 'https://checkout.stripe.test/session' };
				})
			}
		},
		subscriptions: { update: vi.fn(async () => ({})) }
	}
}));

const { db } = await import('$lib/server/db');
const { addons, plans, subscriptions, addresses, giftOrders, guestOrders } = await import(
	'$lib/server/db/schema'
);
// Actions are async, but SvelteKit types them as MaybePromise — narrow so `.catch` type-checks.
const actions = (await import('../+page.server')).actions as Record<string, (event: any) => Promise<any>>;

const TEST_PREFIX = 'vitest-';
let activeAddon: any;
let inactiveAddon: any;
let subPlan: any;
let orderPlan: any;
let giftPlan: any;

/** Wrap a FormData body in the RequestEvent shape these actions actually touch. */
function eventFrom(fd: FormData, user?: { id: string; email: string; name?: string }) {
	return {
		request: new Request('http://localhost/subscribe', { method: 'POST', body: fd }),
		locals: { user: user ?? null } as any,
		url: new URL('http://localhost/subscribe')
	} as any;
}

/** Flat form fields — how a no-JS submission arrives. */
function event(form: Record<string, string | string[]>, user?: { id: string; email: string; name?: string }) {
	const fd = new FormData();
	for (const [k, v] of Object.entries(form)) {
		if (Array.isArray(v)) v.forEach((x) => fd.append(k, x));
		else fd.append(k, v);
	}
	return eventFrom(fd, user);
}

/**
 * The page runs superForm with `dataType: 'json'`, which posts the whole object in a
 * single devalue-encoded `__superform_json` field rather than flat fields. Nested values
 * such as `addonQuantities` only survive that way, so quantity tests use this.
 */
function jsonEvent(data: Record<string, unknown>, user?: { id: string; email: string; name?: string }) {
	const fd = new FormData();
	fd.append('__superform_json', devalueStringify(data));
	return eventFrom(fd, user);
}

beforeEach(async () => {
	created.length = 0;

	// Reuse real plans from the seeded local DB so the test exercises production-shaped data.
	const allPlans = await db.select().from(plans).where(eq(plans.active, true));
	subPlan = allPlans.find((p) => p.slug === 'regular');
	orderPlan = allPlans.find((p) => p.slug === 'one-off');

	// Any live gift plan will do. Without one, use a fixture under a `vitest-` slug —
	// never a real slug like 'single-gift', which would pass a test row off as the real
	// product on the local site — and remove it again in afterAll.
	giftPlan = allPlans.find((p) => p.kind === 'gift') ?? (await testPlan({ kind: 'gift' }));

	const existing = await db.select().from(addons);
	activeAddon = existing.find((a) => a.isActive && !a.name.startsWith(TEST_PREFIX));
	if (!activeAddon) {
		const id = crypto.randomUUID();
		await db.insert(addons).values({
			id, name: `${TEST_PREFIX}active`, pricePence: 500, sortOrder: 900, isActive: true
		});
		[activeAddon] = await db.select().from(addons).where(eq(addons.id, id));
	}

	inactiveAddon = existing.find((a) => !a.isActive && a.name.startsWith(TEST_PREFIX));
	if (!inactiveAddon) {
		const id = crypto.randomUUID();
		await db.insert(addons).values({
			id, name: `${TEST_PREFIX}inactive`, pricePence: 700, sortOrder: 901, isActive: false
		});
		[inactiveAddon] = await db.select().from(addons).where(eq(addons.id, id));
	}
});

/**
 * A throwaway plan under a `vitest-` slug, removed in afterAll. Plans are validated
 * against the DB rather than a hardcoded list, so these are buyable like any real plan.
 */
async function testPlan(overrides: Partial<typeof plans.$inferInsert> = {}) {
	const id = crypto.randomUUID();
	const kind = overrides.kind ?? 'order';
	await db.insert(plans).values({
		id,
		slug: `${TEST_PREFIX}${kind}-${id.slice(0, 8)}`,
		name: `${TEST_PREFIX}${kind}`,
		pricePence: 1234,
		interval: kind === 'subscription' ? 'monthly' : 'one_time',
		packs: 2,
		kind,
		active: true,
		stripePriceId: `price_${TEST_PREFIX}${id.slice(0, 8)}`,
		...overrides
	});
	const [row] = await db.select().from(plans).where(eq(plans.id, id));
	return row;
}

afterAll(async () => {
	await db.delete(plans).where(like(plans.slug, `${TEST_PREFIX}%`));
});

const baseAddress = {
	line1: '1 Test Street',
	city: 'London',
	postcode: 'E1 6AN',
	phone: '07000000000'
};

describe('subscribe action — auth and flow guards', () => {
	it('refuses an anonymous subscriber', async () => {
		const res: any = await actions.subscribe(
			event({ ...baseAddress, plan: subPlan.slug, recipient: 'me', quantity: '1' })
		);
		expect(res.status).toBe(401);
		expect(created).toHaveLength(0);
	});

	it('refuses when the gift flow is posted to the subscribe action', async () => {
		const res: any = await actions.subscribe(
			event(
				{ ...baseAddress, plan: subPlan.slug, recipient: 'gift', quantity: '1' },
				{ id: 'u1', email: 'a@b.co' }
			)
		);
		expect(res.status).toBe(400);
		expect(created).toHaveLength(0);
	});
});

describe('add-on pricing sent to Stripe', () => {
	it('prices add-ons inline from pricePence rather than a stored Stripe price', async () => {
		const user = { id: crypto.randomUUID(), email: 'buyer@test.co', name: 'Buyer' };
		await actions.subscribe(
			event(
				{
					...baseAddress,
					plan: subPlan.slug,
					recipient: 'me',
					quantity: '1',
					addonIds: [activeAddon.id]
				},
				user
			)
		).catch(() => {}); // the action ends in a redirect(), which throws

		expect(created).toHaveLength(1);
		const session = created[0];
		expect(session.mode).toBe('subscription');

		const addonLine = session.line_items.find((l: any) => l.price_data);
		expect(addonLine).toBeDefined();
		// The amount comes from the DB, never from the form.
		expect(addonLine.price_data.unit_amount).toBe(activeAddon.pricePence);
		expect(addonLine.price_data.currency).toBe('gbp');
		// Subscription mode requires a cadence on every recurring line item.
		expect(addonLine.price_data.recurring).toBeDefined();
		expect(addonLine.price_data.recurring.interval).toBe('month');
	});

	it('omits `recurring` for one-off payments', async () => {
		const user = { id: crypto.randomUUID(), email: 'buyer2@test.co', name: 'Buyer' };
		await actions.subscribe(
			event(
				{
					...baseAddress,
					plan: orderPlan.slug,
					recipient: 'me',
					quantity: '1',
					addonIds: [activeAddon.id]
				},
				user
			)
		).catch(() => {});

		expect(created).toHaveLength(1);
		expect(created[0].mode).toBe('payment');
		const addonLine = created[0].line_items.find((l: any) => l.price_data);
		expect(addonLine.price_data.recurring).toBeUndefined();
	});

	it('rejects a deactivated add-on instead of selling it', async () => {
		const user = { id: crypto.randomUUID(), email: 'buyer3@test.co', name: 'Buyer' };
		const res: any = await actions
			.subscribe(
				event(
					{
						...baseAddress,
						plan: subPlan.slug,
						recipient: 'me',
						quantity: '1',
						addonIds: [inactiveAddon.id]
					},
					user
				)
			)
			.catch((e: any) => e);

		// resolveAddons filters on isActive, so the id reads as unknown and setError fires.
		expect(created).toHaveLength(0);
		expect(res?.data?.form?.errors?.addonIds ?? res?.status).toBeTruthy();
	});
});

describe('gift order creation', () => {
	it('writes a pending gift order and sends the buyer to Stripe', async () => {
		const email = `gift-${crypto.randomUUID().slice(0, 8)}@test.co`;
		const before = await db.select().from(giftOrders);
		await actions
			.gift(
				event({
					...baseAddress,
					plan: giftPlan.slug,
					recipient: 'gift',
					quantity: '1',
					recipientName: 'Gift Recipient',
					buyerEmail: email,
					buyerName: 'Gift Buyer',
					durationMonths: '1'
				})
			)
			.catch(() => {});

		const after = await db.select().from(giftOrders);
		expect(after.length).toBe(before.length + 1);

		const row = after.find((r) => r.buyerEmail === email);
		expect(row?.status).toBe('pending'); // only the webhook may mark it paid
		expect(created).toHaveLength(1);
		expect(created[0].mode).toBe('payment');
		expect(created[0].metadata.giftOrderId).toBe(row!.id);
		expect(row?.planId).toBe(giftPlan.id);
		expect(row?.unitPricePence).toBe(giftPlan.pricePence);
	});
});

describe('guest order creation', () => {
	it('creates address + guest order and carries the id in metadata', async () => {
		const marker = `Guest ${crypto.randomUUID().slice(0, 8)}`;
		const before = await db.select().from(guestOrders);
		await actions
			.guestOrder(
				event({
					...baseAddress,
					plan: orderPlan.slug,
					recipient: 'me',
					quantity: '1',
					recipientName: marker,
					buyerEmail: 'guest@test.co'
				})
			)
			.catch(() => {});

		const after = await db.select().from(guestOrders);
		expect(after.length).toBe(before.length + 1);

		const row = after.find((r) => r.recipientName === marker);
		expect(row?.status).toBe('pending');
		expect(created[0].metadata.guestOrderId).toBe(row!.id);
		// The address is written before redirecting so the form's data isn't lost.
		const [addr] = await db.select().from(addresses).where(eq(addresses.id, row!.addressId!));
		expect(addr.line1).toBe(baseAddress.line1);
	});
});

describe('subscription row creation', () => {
	it('creates the subscription as pending, never active, before payment', async () => {
		const user = { id: crypto.randomUUID(), email: 'pending@test.co', name: 'Pending' };
		await actions
			.subscribe(event({ ...baseAddress, plan: subPlan.slug, recipient: 'me', quantity: '2' }, user))
			.catch(() => {});

		const id = created[0].metadata.subscriptionId;
		const [row] = await db.select().from(subscriptions).where(eq(subscriptions.id, id));
		expect(row.status).toBe('pending');
		expect(row.quantity).toBe(2);
		// The webhook keys off this, so it must survive the round trip.
		expect(created[0].subscription_data.metadata.subscriptionId).toBe(id);
	});
});

describe('plans come from the database, not a hardcoded list', () => {
	it('sells a plan added to the catalogue without any code change', async () => {
		const plan = await testPlan({ kind: 'order' });
		const marker = `New plan ${crypto.randomUUID().slice(0, 8)}`;
		await actions
			.guestOrder(
				event({ ...baseAddress, plan: plan.slug, recipient: 'me', quantity: '2', recipientName: marker })
			)
			.catch(() => {});

		expect(created).toHaveLength(1);
		expect(created[0].line_items[0]).toEqual({ price: plan.stripePriceId, quantity: 2 });
		// The order records which plan it was and the unit price it was sold at.
		const [row] = await db.select().from(guestOrders).where(eq(guestOrders.recipientName, marker));
		expect(row.planId).toBe(plan.id);
		expect(row.unitPricePence).toBe(plan.pricePence);
	});

	it('matches slugs case-insensitively, so old ?plan=Family links still work', async () => {
		const plan = await testPlan({ kind: 'order' });
		await actions
			.guestOrder(event({ ...baseAddress, plan: plan.slug.toUpperCase(), recipient: 'me', quantity: '1', recipientName: 'Caps' }))
			.catch(() => {});
		expect(created).toHaveLength(1);
		expect(created[0].line_items[0].price).toBe(plan.stripePriceId);
	});

	it('refuses a plan whose sale window has ended', async () => {
		const plan = await testPlan({ kind: 'order', availableUntil: new Date(Date.now() - 60_000) });
		const res: any = await actions
			.guestOrder(event({ ...baseAddress, plan: plan.slug, recipient: 'me', quantity: '1', recipientName: 'Late' }))
			.catch((e: any) => e);
		expect(res.status).toBe(400);
		expect(created).toHaveLength(0);
	});

	it('refuses a plan that has not gone on sale yet', async () => {
		const plan = await testPlan({ kind: 'order', availableFrom: new Date(Date.now() + 86_400_000) });
		const res: any = await actions
			.guestOrder(event({ ...baseAddress, plan: plan.slug, recipient: 'me', quantity: '1', recipientName: 'Early' }))
			.catch((e: any) => e);
		expect(res.status).toBe(400);
		expect(created).toHaveLength(0);
	});

	it("enforces a plan's own max quantity", async () => {
		const plan = await testPlan({ kind: 'order', maxQuantity: 2 });
		const res: any = await actions
			.guestOrder(event({ ...baseAddress, plan: plan.slug, recipient: 'me', quantity: '3', recipientName: 'Bulk' }))
			.catch((e: any) => e);
		expect(res.status).toBe(400);
		expect(res.data.form.errors.quantity).toBeTruthy();
		expect(created).toHaveLength(0);
	});

	it('refuses a gift plan posted to the "for me" flow', async () => {
		const user = { id: crypto.randomUUID(), email: 'kind@test.co', name: 'Kind' };
		const res: any = await actions
			.subscribe(event({ ...baseAddress, plan: giftPlan.slug, recipient: 'me', quantity: '1' }, user))
			.catch((e: any) => e);
		expect(res.status).toBe(400);
		expect(created).toHaveLength(0);
	});
});

describe('add-on quantities', () => {
	it('sends the chosen quantity to Stripe and into metadata', async () => {
		const user = { id: crypto.randomUUID(), email: 'qty@test.co', name: 'Qty' };
		await actions
			.subscribe(
				jsonEvent(
					{
						...baseAddress,
						plan: subPlan.slug,
						recipient: 'me',
						quantity: 1,
						addonIds: [activeAddon.id],
						addonQuantities: { [activeAddon.id]: 3 }
					},
					user
				)
			)
			.catch(() => {});

		const line = created[0].line_items.find((l: any) => l.price_data);
		expect(line.quantity).toBe(3);
		// Metadata is `id:qty` so the webhook can rebuild the same basket.
		expect(created[0].metadata.addonIds).toBe(`${activeAddon.id}:3`);
	});

	it('defaults to 1 when no quantity is supplied', async () => {
		const user = { id: crypto.randomUUID(), email: 'qty1@test.co', name: 'Qty' };
		await actions
			.subscribe(
				jsonEvent(
					{ ...baseAddress, plan: subPlan.slug, recipient: 'me', quantity: 1, addonIds: [activeAddon.id] },
					user
				)
			)
			.catch(() => {});

		const line = created[0].line_items.find((l: any) => l.price_data);
		expect(line.quantity).toBe(1);
		expect(created[0].metadata.addonIds).toBe(`${activeAddon.id}:1`);
	});

	it('clamps a quantity above the cap rather than trusting the form', async () => {
		const user = { id: crypto.randomUUID(), email: 'qtymax@test.co', name: 'Qty' };
		const res: any = await actions
			.subscribe(
				jsonEvent(
					{
						...baseAddress,
						plan: subPlan.slug,
						recipient: 'me',
						quantity: 1,
						addonIds: [activeAddon.id],
						addonQuantities: { [activeAddon.id]: 999 }
					},
					user
				)
			)
			.catch((e: any) => e);

		if (created.length) {
			// Accepted only if clamped — never 999.
			const line = created[0].line_items.find((l: any) => l.price_data);
			expect(line.quantity).toBeLessThanOrEqual(20);
		} else {
			// Or rejected outright by the schema, which is equally safe.
			expect(res).toBeTruthy();
		}
	});
});
