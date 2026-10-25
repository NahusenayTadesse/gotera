import { describe, it, expect, afterEach } from 'vitest';
import { eq, inArray } from 'drizzle-orm';
import { db } from '../db';
import { guestOrders, stock, stockChanges, deliverySkipDates } from '../db/schema';
import { bookingsOn, moveBookings, targetProblem, toLocalMidnight } from '../deliveryMoves';
import { readMainStock } from '../stock';
import { toCalendarString } from '$lib/format';

/** A far-future weekend, so nothing real is booked on it. */
const SAT = '2099-05-02';
const SUN = '2099-05-03';
const MON = '2099-05-04';
const TUE = '2099-05-05';

const created: string[] = [];

async function guestOrder(date: string, status: 'paid' | 'fulfilled' = 'paid', units = 2) {
	const id = crypto.randomUUID();
	await db.insert(guestOrders).values({
		id,
		buyerEmail: `move-test-${id}@example.test`,
		recipientAddress: { line1: '1 Test St', city: 'London', postcode: 'E1 1AA' },
		status,
		deliveryDate: toLocalMidnight(date),
		stockUnits: units
	});
	created.push(id);
	return id;
}

afterEach(async () => {
	if (created.length) await db.delete(guestOrders).where(inArray(guestOrders.id, created.splice(0)));
	for (const d of [SAT, SUN, MON]) {
		const row = await readMainStock(d);
		if (row) {
			await db.delete(stockChanges).where(eq(stockChanges.stockId, row.id));
			await db.delete(stock).where(eq(stock.id, row.id));
		}
		await db.delete(deliverySkipDates).where(eq(deliverySkipDates.date, toLocalMidnight(d)));
	}
});

describe('targetProblem', () => {
	it('accepts an open Saturday, Sunday or Monday', async () => {
		for (const d of [SAT, SUN, MON]) expect(await targetProblem(d)).toBeNull();
	});

	it('rejects other weekdays, past days and skipped days', async () => {
		expect(await targetProblem(TUE)).toMatch(/Saturdays, Sundays and Mondays/);
		expect(await targetProblem('2020-01-04')).toMatch(/passed/);
		await db.insert(deliverySkipDates).values({ date: toLocalMidnight(SUN), reason: 'test' });
		expect(await targetProblem(SUN)).toMatch(/skipped/);
	});
});

describe('moveBookings', () => {
	it('finds paid one-off orders on a day, but not fulfilled ones', async () => {
		const paid = await guestOrder(SAT);
		await guestOrder(SAT, 'fulfilled');
		const refs = await bookingsOn(SAT);
		expect(refs).toContainEqual({ type: 'guest', id: paid });
		expect(refs).toHaveLength(1);
	});

	it('moves a guest order and its stock to the new day', async () => {
		const id = await guestOrder(SAT, 'paid', 3);
		const res = await moveBookings([{ type: 'guest', id }], MON);

		expect(res.moved).toBe(1);
		expect(res.left).toBe(0);
		expect(res.recipients[0].email).toBe(`move-test-${id}@example.test`);

		const [o] = await db.select().from(guestOrders).where(eq(guestOrders.id, id));
		expect(toCalendarString(o.deliveryDate!)).toBe(MON);
		expect((await readMainStock(MON))?.used).toBe(3);
	});

	it('leaves a fulfilled order where it is', async () => {
		const id = await guestOrder(SAT, 'fulfilled');
		const res = await moveBookings([{ type: 'guest', id }], SUN);
		expect(res).toMatchObject({ moved: 0, left: 1 });

		const [o] = await db.select().from(guestOrders).where(eq(guestOrders.id, id));
		expect(toCalendarString(o.deliveryDate!)).toBe(SAT);
	});
});
