import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { eq, inArray, like } from 'drizzle-orm';

/**
 * Batch allocation against the real database. Everything here is dated 2031 so no other
 * batch is eligible, and lives under a throwaway trade partner so the shipments are ours.
 */
const { db } = await import('$lib/server/db');
const { batches, batchAllocations, partnerApplications, partnerDeliveries } = await import(
	'$lib/server/db/schema'
);
const { syncAllocations, assignLineManually, lineKeyOf } = await import('../traceability');

const PARTNER = '7e57ace0-0000-4000-8000-000000000001';
const SHIP_A = '7e57ace0-0000-4000-8000-0000000000a1';
const SHIP_B = '7e57ace0-0000-4000-8000-0000000000b1';
const PREFIX = 'TEST-TRACE-';

const lineA = lineKeyOf('partner', SHIP_A, null);
const lineB = lineKeyOf('partner', SHIP_B, null);

async function cleanup() {
	await db.delete(batchAllocations).where(inArray(batchAllocations.partnerDeliveryId, [SHIP_A, SHIP_B]));
	await db.delete(batches).where(like(batches.code, `${PREFIX}%`));
	await db.delete(partnerApplications).where(eq(partnerApplications.id, PARTNER)); // cascades deliveries
}

async function batch(code: string, producedOn: string, bestBefore: string | null, quantity: number) {
	const id = crypto.randomUUID();
	await db.insert(batches).values({ id, code: PREFIX + code, product: 'injera', producedOn, bestBefore, quantity });
	return id;
}

const allocs = (lineKey: string) =>
	db
		.select({ batchId: batchAllocations.batchId, quantity: batchAllocations.quantity, method: batchAllocations.method })
		.from(batchAllocations)
		.where(eq(batchAllocations.lineKey, lineKey));

beforeEach(async () => {
	await cleanup();
	await db.insert(partnerApplications).values({
		id: PARTNER,
		type: 'partner',
		businessName: 'Trace Test Café',
		contactName: 'T',
		email: 'trace@test.example',
		category: 'restaurant',
		message: 'traceability integration test',
		status: 'approved'
	});
	await db.insert(partnerDeliveries).values([
		{ id: SHIP_A, partnerId: PARTNER, deliveredOn: '2031-03-10', location: 'X', items: 'Injera', quantity: '30', unit: 'pcs' },
		{ id: SHIP_B, partnerId: PARTNER, deliveredOn: '2031-03-12', location: 'X', items: 'Injera', quantity: '10', unit: 'pcs' }
	]);
});

afterAll(cleanup);

const refs = [
	{ type: 'partner' as const, id: SHIP_A },
	{ type: 'partner' as const, id: SHIP_B }
];

describe('syncAllocations', () => {
	it('allocates first-expiring-first, splits across batches, and depletes', async () => {
		const later = await batch('LATER', '2031-03-01', '2031-03-30', 100);
		const sooner = await batch('SOONER', '2031-03-05', '2031-03-15', 20);

		const r = await syncAllocations({ refs });
		expect(r.short).toEqual([]);

		// A (30, earliest) takes all 20 of the sooner-expiring batch, then 10 from the later one.
		const a = await allocs(lineA);
		expect(a.find((x) => x.batchId === sooner)?.quantity).toBe(20);
		expect(a.find((x) => x.batchId === later)?.quantity).toBe(10);
		expect((await allocs(lineB))[0]).toMatchObject({ batchId: later, quantity: 10 });

		const [s] = await db.select().from(batches).where(eq(batches.id, sooner));
		expect(s.status).toBe('depleted');
	});

	it('is idempotent', async () => {
		await batch('ONE', '2031-03-01', '2031-03-30', 100);
		await syncAllocations({ refs });
		const again = await syncAllocations({ refs });
		expect(again.unitsAssigned).toBe(0);
		expect(again.released).toBe(0);
	});

	it('skips expired, not-yet-made and held batches, and reports the shortfall', async () => {
		await batch('EXPIRED', '2031-02-01', '2031-03-01', 100);
		await batch('FUTURE', '2031-03-20', null, 100);
		const held = await batch('HELD', '2031-03-01', '2031-03-30', 100);
		await db.update(batches).set({ status: 'quarantined' }).where(eq(batches.id, held));

		const r = await syncAllocations({ refs });
		expect(r.unitsAssigned).toBe(0);
		expect(r.short.map((s) => s.lineKey).sort()).toEqual([lineA, lineB].sort());
	});

	it('releases units when a shipment is cancelled, reactivating a depleted batch', async () => {
		const only = await batch('ONLY', '2031-03-01', '2031-03-30', 40);
		await syncAllocations({ refs });
		expect((await db.select().from(batches).where(eq(batches.id, only)))[0].status).toBe('depleted');

		await db.update(partnerDeliveries).set({ status: 'cancelled' }).where(eq(partnerDeliveries.id, SHIP_B));
		const r = await syncAllocations({ refs });
		expect(r.released).toBe(10);
		expect(await allocs(lineB)).toEqual([]);
		expect((await db.select().from(batches).where(eq(batches.id, only)))[0].status).toBe('active');
	});
});

describe('assignLineManually', () => {
	it('puts a line on one batch and auto-sync keeps it', async () => {
		await batch('AUTO', '2031-03-01', '2031-03-20', 100);
		const picked = await batch('PICKED', '2031-03-01', '2031-03-30', 100);
		await syncAllocations({ refs });

		const res = await assignLineManually(lineA, picked);
		expect(res).toMatchObject({ ok: true });
		await syncAllocations({ refs });
		expect(await allocs(lineA)).toEqual([{ batchId: picked, quantity: 30, method: 'manual' }]);
	});

	it('refuses batches that are expired, not made yet, or too small', async () => {
		const expired = await batch('OLD', '2031-02-01', '2031-03-01', 100);
		const future = await batch('NEW', '2031-03-11', null, 100);
		const small = await batch('SMALL', '2031-03-01', null, 5);

		for (const id of [expired, future, small]) {
			expect(await assignLineManually(lineA, id)).toHaveProperty('error');
		}
		expect(await allocs(lineA)).toEqual([]);
	});
});
