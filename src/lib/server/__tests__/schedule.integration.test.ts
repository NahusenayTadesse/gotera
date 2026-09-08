import { describe, it, expect, afterEach } from 'vitest';
import { eq, inArray } from 'drizzle-orm';
import { db } from '../db';
import { stock, stockChanges, deliverySkipDates } from '../db/schema';
import { nextDeliveryDate, nextDeliveryDateIgnoringCapacity } from '../deliverySchedule';
import { getOrCreateStock, setCapacity, consumeStock, readMainStock } from '../stock';
import { toCalendarString, shiftDays } from '$lib/format';

/** A Monday far in the future, so "the coming Saturday" is unambiguous and unused. */
const MONDAY = '2099-03-02';
const SAT_1 = '2099-03-07';
const SAT_2 = '2099-03-14';
const SAT_3 = '2099-03-21';
const SATS = [SAT_1, SAT_2, SAT_3];

async function cleanup() {
	const ids: string[] = [];
	for (const d of SATS) {
		const r = await readMainStock(d);
		if (r) ids.push(r.id);
	}
	if (ids.length) {
		await db.delete(stockChanges).where(inArray(stockChanges.stockId, ids));
		await db.delete(stock).where(inArray(stock.id, ids));
	}
	for (const d of SATS) {
		const [y, m, day] = d.split('-').map(Number);
		await db.delete(deliverySkipDates).where(eq(deliverySkipDates.date, new Date(y, m - 1, day)));
	}
}

afterEach(cleanup);

describe('nextDeliveryDate — capacity', () => {
	it('picks the coming Saturday when nothing blocks it', async () => {
		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(SAT_1);
	});

	it('rolls to the next Saturday when the first is full', async () => {
		const row = await getOrCreateStock(SAT_1);
		await setCapacity(row.id, 1, null, 'test');
		await consumeStock(SAT_1, 1); // now full

		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(SAT_2);
	});

	it('keeps rolling past consecutive full Saturdays', async () => {
		for (const sat of [SAT_1, SAT_2]) {
			const row = await getOrCreateStock(sat);
			await setCapacity(row.id, 1, null, 'test');
			await consumeStock(sat, 1);
		}
		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(SAT_3);
	});

	it('does not roll while capacity remains', async () => {
		const row = await getOrCreateStock(SAT_1);
		await setCapacity(row.id, 5, null, 'test');
		await consumeStock(SAT_1, 4); // one left

		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(SAT_1);
	});

	it('treats a date with no stock row as open, not full', async () => {
		// Capacity is created lazily, so an unseeded Saturday must not read as unavailable.
		expect(await readMainStock(SAT_1)).toBeNull();
		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(SAT_1);
	});
});

describe('nextDeliveryDate — skip dates stack with capacity', () => {
	it('skips an admin-marked Saturday', async () => {
		const [y, m, d] = SAT_1.split('-').map(Number);
		await db.insert(deliverySkipDates).values({ date: new Date(y, m - 1, d), reason: 'test' });

		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(SAT_2);
	});

	it('skips a skipped Saturday AND a full one', async () => {
		const [y, m, d] = SAT_1.split('-').map(Number);
		await db.insert(deliverySkipDates).values({ date: new Date(y, m - 1, d), reason: 'test' });

		const row = await getOrCreateStock(SAT_2);
		await setCapacity(row.id, 1, null, 'test');
		await consumeStock(SAT_2, 1);

		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(SAT_3);
	});
});

describe('nextDeliveryDateIgnoringCapacity', () => {
	it('ignores a full date so the "we moved you" notice only fires for stock', async () => {
		const row = await getOrCreateStock(SAT_1);
		await setCapacity(row.id, 1, null, 'test');
		await consumeStock(SAT_1, 1);

		expect(toCalendarString(await nextDeliveryDateIgnoringCapacity(MONDAY))).toBe(SAT_1);
		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(SAT_2);
	});

	it('still honours skip dates, so a bank holiday does not look like a stock roll', async () => {
		const [y, m, d] = SAT_1.split('-').map(Number);
		await db.insert(deliverySkipDates).values({ date: new Date(y, m - 1, d), reason: 'test' });

		// Both agree -> the webhook sends no "your delivery moved" email.
		const rolled = toCalendarString(await nextDeliveryDate(MONDAY));
		const baseline = toCalendarString(await nextDeliveryDateIgnoringCapacity(MONDAY));
		expect(rolled).toBe(baseline);
		expect(rolled).toBe(SAT_2);
	});
});

describe('lead time still applies with capacity in play', () => {
	it('a Thursday order skips the 2-day Saturday even when it has capacity', async () => {
		const thursday = shiftDays(SAT_1, -2);
		await getOrCreateStock(SAT_1); // plenty of capacity
		expect(toCalendarString(await nextDeliveryDate(thursday))).toBe(SAT_2);
	});
});
