import { describe, it, expect, beforeEach, vi } from 'vitest';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'node:crypto';

/**
 * The unlisted add-on page reached from the reminder email.
 *
 * Its whole security model is the capability token, so the tests that matter are: an
 * unknown token 404s, a delivery that is no longer `scheduled` refuses changes, and
 * prices come from the catalogue rather than the form.
 */
const created: any[] = [];
vi.mock('$lib/server/stripe', () => ({
	stripe: {
		checkout: {
			sessions: {
				create: vi.fn(async (args: any) => {
					created.push(args);
					return { id: 'cs_test', url: 'https://checkout.stripe.test/s' };
				})
			}
		}
	}
}));

const { db } = await import('$lib/server/db');
const { deliveries, addons } = await import('$lib/server/db/schema');
const { load, actions } = await import('../+page.server');

let token: string;
let deliveryId: string;
let addonId: string;

beforeEach(async () => {
	created.length = 0;

	const [addon] = await db.select().from(addons).where(eq(addons.isActive, true));
	addonId = addon.id;

	const [delivery] = await db.select().from(deliveries);
	deliveryId = delivery.id;

	token = randomBytes(24).toString('base64url');
	await db
		.update(deliveries)
		.set({ addonAccessToken: token, status: 'scheduled' })
		.where(eq(deliveries.id, deliveryId));
});

const ev = (tok: string, form?: Record<string, string>) => {
	const fd = new FormData();
	for (const [k, v] of Object.entries(form ?? {})) fd.append(k, v);
	return {
		params: { token: tok },
		url: new URL(`http://localhost/addons/${tok}`),
		request: new Request('http://localhost/x', { method: 'POST', body: fd })
	} as any;
};

describe('token access', () => {
	it('loads the page for a valid token', async () => {
		const data: any = await load(ev(token));
		expect(data.open).toBe(true);
		expect(Array.isArray(data.catalogue)).toBe(true);
		expect(data.maxQty).toBe(20);
	});

	it('404s an unknown token', async () => {
		await expect(load(ev('not-a-real-token'))).rejects.toMatchObject({ status: 404 });
	});

	it('404s an empty token rather than matching a NULL column', async () => {
		// Deliveries that have never had a reminder sent carry addon_access_token = NULL;
		// an empty token must not accidentally match them.
		await expect(load(ev(''))).rejects.toMatchObject({ status: 404 });
	});

	it('only lists active add-ons', async () => {
		const data: any = await load(ev(token));
		const all = await db.select().from(addons);
		const inactive = all.filter((a) => !a.isActive).map((a) => a.id);
		for (const item of data.catalogue) expect(inactive).not.toContain(item.id);
	});
});

describe('checkout from the token page', () => {
	it('prices from the catalogue, not the submitted form', async () => {
		const [addon] = await db.select().from(addons).where(eq(addons.id, addonId));
		await actions
			.checkout(ev(token, { [`qty_${addonId}`]: '2', pricePence: '1' }))
			.catch(() => {});

		expect(created).toHaveLength(1);
		const line = created[0].line_items[0];
		expect(line.price_data.unit_amount).toBe(addon.pricePence);
		expect(line.quantity).toBe(2);
	});

	it('sends the metadata the webhook needs to fulfil', async () => {
		await actions.checkout(ev(token, { [`qty_${addonId}`]: '1' })).catch(() => {});

		const meta = created[0].metadata;
		expect(meta.kind).toBe('delivery-addon');
		expect(meta.deliveryId).toBe(deliveryId);
		expect(JSON.parse(meta.items)).toEqual([{ id: addonId, quantity: 1 }]);
	});

	it('rejects a quantity above the cap', async () => {
		const res: any = await actions.checkout(ev(token, { [`qty_${addonId}`]: '21' }));
		expect(res.status).toBe(400);
		expect(created).toHaveLength(0);
	});

	it('rejects a negative quantity', async () => {
		const res: any = await actions.checkout(ev(token, { [`qty_${addonId}`]: '-1' }));
		expect(res.status).toBe(400);
		expect(created).toHaveLength(0);
	});

	it('rejects an empty basket', async () => {
		const res: any = await actions.checkout(ev(token, { [`qty_${addonId}`]: '0' }));
		expect(res.status).toBe(400);
		expect(created).toHaveLength(0);
	});

	it('refuses once the delivery is no longer scheduled', async () => {
		await db.update(deliveries).set({ status: 'dispatched' }).where(eq(deliveries.id, deliveryId));

		const res: any = await actions.checkout(ev(token, { [`qty_${addonId}`]: '1' }));
		expect(res.status).toBe(400);
		expect(created).toHaveLength(0);

		await db.update(deliveries).set({ status: 'scheduled' }).where(eq(deliveries.id, deliveryId));
	});

	it('never writes delivery_addons before payment', async () => {
		const { deliveryAddons } = await import('$lib/server/db/schema');
		const before = await db
			.select()
			.from(deliveryAddons)
			.where(eq(deliveryAddons.deliveryId, deliveryId));

		await actions.checkout(ev(token, { [`qty_${addonId}`]: '3' })).catch(() => {});

		const after = await db
			.select()
			.from(deliveryAddons)
			.where(eq(deliveryAddons.deliveryId, deliveryId));
		expect(after.length).toBe(before.length);
	});
});
