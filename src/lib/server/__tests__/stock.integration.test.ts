import { describe, it, expect, beforeEach, afterAll, vi } from 'vitest';
import { and, eq, inArray } from 'drizzle-orm';

// The low-stock alert sends real SMTP mail; stub it so tests never email anyone and so we
// can assert on *when* it fires.
const stockLowSpy = vi.fn().mockResolvedValue(undefined);
vi.mock('../email', () => ({
	notifyAdminStockLow: (...args: unknown[]) => stockLowSpy(...args)
}));

const { db } = await import('../db');
const { stock, stockChanges } = await import('../db/schema');
const { getOrCreateStock, consumeStock, setCapacity, readMainStock, remainingOf, isFull, isLow, MAIN_SCOPE } =
	await import('../stock');

/** Far-future Saturdays, so tests never collide with real rows or each other. */
const DATE_A = '2099-01-03';
const DATE_B = '2099-01-10';
const DATE_C = '2099-01-17';
const ALL = [DATE_A, DATE_B, DATE_C];

/** Remove only the far-future rows these tests own, leaving real data untouched. */
async function wipe() {
	const mine: string[] = [];
	for (const d of ALL) {
		const r = await readMainStock(d);
		if (r) mine.push(r.id);
	}
	if (mine.length) {
		await db.delete(stockChanges).where(inArray(stockChanges.stockId, mine));
		await db.delete(stock).where(inArray(stock.id, mine));
	}
}

beforeEach(async () => {
	stockLowSpy.mockClear();
	await wipe();
});
afterAll(wipe);

describe('getOrCreateStock', () => {
	it('creates a row lazily at the default capacity', async () => {
		const row = await getOrCreateStock(DATE_A);
		expect(row.capacity).toBeGreaterThan(0);
		expect(row.used).toBe(0);
		expect(row.scopeKey).toBe(MAIN_SCOPE);
	});

	it('is idempotent — the same date returns the same row', async () => {
		const first = await getOrCreateStock(DATE_A);
		const second = await getOrCreateStock(DATE_A);
		expect(second.id).toBe(first.id);
	});

	it('does not duplicate under concurrent creation', async () => {
		// The unique(delivery_date, scope_key) constraint is the real guard here; without
		// `scopeKey` MySQL would treat the NULL addon_id as distinct and allow duplicates.
		await Promise.all(Array.from({ length: 5 }, () => getOrCreateStock(DATE_B)));
		const rows = await db
			.select()
			.from(stock)
			.where(and(eq(stock.scopeKey, MAIN_SCOPE), eq(stock.deliveryDate, new Date(2099, 0, 10))));
		expect(rows).toHaveLength(1);
	});
});

describe('consumeStock', () => {
	it('reserves units and records the change', async () => {
		const created = await getOrCreateStock(DATE_A);
		const { ok, row } = await consumeStock(DATE_A, 3);

		expect(ok).toBe(true);
		expect(row.used).toBe(3);
		expect(remainingOf(row)).toBe(created.capacity - 3);

		const log = await db.select().from(stockChanges).where(eq(stockChanges.stockId, row.id));
		expect(log).toHaveLength(1);
		expect(log[0].field).toBe('used');
		expect(log[0].delta).toBe(3);
		expect(log[0].valueAfter).toBe(3);
	});

	it('refuses to oversell past capacity', async () => {
		const created = await getOrCreateStock(DATE_A);
		await setCapacity(created.id, 2, null, 'test');

		expect((await consumeStock(DATE_A, 2)).ok).toBe(true);
		const third = await consumeStock(DATE_A, 1);
		expect(third.ok).toBe(false);
		expect(third.row.used).toBe(2); // unchanged
	});

	it('does not oversell when many bookings land at once', async () => {
		// The conditional UPDATE is what makes this safe — a read-then-write check would
		// let several of these through and push `used` past `capacity`.
		const created = await getOrCreateStock(DATE_C);
		await setCapacity(created.id, 5, null, 'test');

		const results = await Promise.all(
			Array.from({ length: 20 }, () => consumeStock(DATE_C, 1))
		);

		const granted = results.filter((r) => r.ok).length;
		expect(granted).toBe(5);

		const final = await readMainStock(DATE_C);
		expect(final!.used).toBe(5);
		expect(final!.used).toBeLessThanOrEqual(final!.capacity);
	});

	it('marks a date full once capacity is gone', async () => {
		const created = await getOrCreateStock(DATE_A);
		await setCapacity(created.id, 1, null, 'test');
		await consumeStock(DATE_A, 1);

		const row = await readMainStock(DATE_A);
		expect(isFull(row!)).toBe(true);
		expect(remainingOf(row!)).toBe(0);
	});
});

describe('low-stock alerting', () => {
	it('emails once when remaining drops to the critical level, not on every booking', async () => {
		const created = await getOrCreateStock(DATE_A);
		await setCapacity(created.id, 10, null, 'test');
		await db
			.update(stock)
			.set({ lowThreshold: 5, criticalThreshold: 2 })
			.where(eq(stock.id, created.id));

		await consumeStock(DATE_A, 7); // remaining 3 — above critical
		expect(stockLowSpy).not.toHaveBeenCalled();

		await consumeStock(DATE_A, 1); // remaining 2 — hits critical
		expect(stockLowSpy).toHaveBeenCalledTimes(1);

		await consumeStock(DATE_A, 1); // remaining 1 — already alerted
		expect(stockLowSpy).toHaveBeenCalledTimes(1);
	});

	it('re-arms the alert when capacity is topped back up', async () => {
		const created = await getOrCreateStock(DATE_A);
		await setCapacity(created.id, 3, null, 'test');
		await db
			.update(stock)
			.set({ lowThreshold: 3, criticalThreshold: 2 })
			.where(eq(stock.id, created.id));

		await consumeStock(DATE_A, 2); // remaining 1 -> alert
		expect(stockLowSpy).toHaveBeenCalledTimes(1);

		await setCapacity(created.id, 50, null, 'restock');
		const after = await readMainStock(DATE_A);
		expect(after!.criticalAlertSentAt).toBeNull();

		await setCapacity(created.id, 4, null, 'test');
		await consumeStock(DATE_A, 1); // remaining 1 again -> alert fires afresh
		expect(stockLowSpy).toHaveBeenCalledTimes(2);
	});

	it('flags low stock before it is critical', async () => {
		const created = await getOrCreateStock(DATE_A);
		await setCapacity(created.id, 10, null, 'test');
		await db
			.update(stock)
			.set({ lowThreshold: 5, criticalThreshold: 1 })
			.where(eq(stock.id, created.id));

		await consumeStock(DATE_A, 6); // remaining 4
		const row = await readMainStock(DATE_A);
		expect(isLow(row!)).toBe(true);
		expect(stockLowSpy).not.toHaveBeenCalled(); // low, but not critical
	});
});

describe('setCapacity', () => {
	it('writes an audit row with the admin who made the change', async () => {
		const created = await getOrCreateStock(DATE_A);
		await setCapacity(created.id, 42, null, 'Manual restock');

		const log = await db
			.select()
			.from(stockChanges)
			.where(and(eq(stockChanges.stockId, created.id), eq(stockChanges.field, 'capacity')));

		expect(log).toHaveLength(1);
		expect(log[0].valueAfter).toBe(42);
		expect(log[0].reason).toBe('Manual restock');
	});

	it('records the delta relative to the previous capacity', async () => {
		const created = await getOrCreateStock(DATE_A);
		const before = created.capacity;
		await setCapacity(created.id, before + 15, null, 'test');

		const [log] = await db
			.select()
			.from(stockChanges)
			.where(and(eq(stockChanges.stockId, created.id), eq(stockChanges.field, 'capacity')));
		expect(log.delta).toBe(15);
	});

	it('returns null for an unknown row', async () => {
		expect(await setCapacity('does-not-exist', 5, null)).toBeNull();
	});
});
