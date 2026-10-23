import { describe, it, expect, afterEach } from 'vitest';
import { eq, inArray } from 'drizzle-orm';
import { db } from '../db';
import { stock, stockChanges, deliverySkipDates } from '../db/schema';
import {
	nextDeliveryDate,
	nextDeliveryDateAfter,
	nextDeliveryDateIgnoringCapacity
} from '../deliverySchedule';
import { getOrCreateStock, setCapacity, consumeStock, readMainStock } from '../stock';
import { toCalendarString, shiftDays } from '$lib/format';

/** A Monday far in the future, so "the coming weekend" is unambiguous and unused. */
const MONDAY = '2099-03-02';
const SAT_1 = '2099-03-07';
const SUN_1 = '2099-03-08';
const MON_1 = '2099-03-09';
const SAT_2 = '2099-03-14';
const DATES = [SAT_1, SUN_1, MON_1, SAT_2];

const asDate = (iso: string) => {
	const [y, m, d] = iso.split('-').map(Number);
	return new Date(y, m - 1, d);
};

async function fill(date: string) {
	const row = await getOrCreateStock(date);
	await setCapacity(row.id, 1, null, 'test');
	await consumeStock(date, 1);
}

const skip = (date: string) =>
	db.insert(deliverySkipDates).values({ date: asDate(date), reason: 'test' });

async function cleanup() {
	const ids: string[] = [];
	for (const d of DATES) {
		const r = await readMainStock(d);
		if (r) ids.push(r.id);
	}
	if (ids.length) {
		await db.delete(stockChanges).where(inArray(stockChanges.stockId, ids));
		await db.delete(stock).where(inArray(stock.id, ids));
	}
	for (const d of DATES) await db.delete(deliverySkipDates).where(eq(deliverySkipDates.date, asDate(d)));
}

afterEach(cleanup);

describe('nextDeliveryDate — capacity', () => {
	it('picks the coming Saturday when nothing blocks it', async () => {
		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(SAT_1);
	});

	it('rolls to Sunday when Saturday is full', async () => {
		await fill(SAT_1);
		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(SUN_1);
	});

	it('keeps rolling through Monday to the next Saturday', async () => {
		for (const d of [SAT_1, SUN_1]) await fill(d);
		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(MON_1);

		await fill(MON_1);
		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(SAT_2);
	});

	it('does not roll while capacity remains', async () => {
		const row = await getOrCreateStock(SAT_1);
		await setCapacity(row.id, 5, null, 'test');
		await consumeStock(SAT_1, 4); // one left

		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(SAT_1);
	});

	it('treats a date with no stock row as open, not full', async () => {
		// Capacity is created lazily, so an unseeded date must not read as unavailable.
		expect(await readMainStock(SAT_1)).toBeNull();
		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(SAT_1);
	});
});

describe('nextDeliveryDate — skip dates stack with capacity', () => {
	it('skips an admin-marked day', async () => {
		await skip(SAT_1);
		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(SUN_1);
	});

	it('skips a skipped day AND a full one', async () => {
		await skip(SAT_1);
		await fill(SUN_1);
		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(MON_1);
	});
});

describe('nextDeliveryDateIgnoringCapacity', () => {
	it('ignores a full date so the "we moved you" notice only fires for stock', async () => {
		await fill(SAT_1);
		expect(toCalendarString(await nextDeliveryDateIgnoringCapacity(MONDAY))).toBe(SAT_1);
		expect(toCalendarString(await nextDeliveryDate(MONDAY))).toBe(SUN_1);
	});

	it('still honours skip dates, so a bank holiday does not look like a stock roll', async () => {
		await skip(SAT_1);

		// Both agree -> the webhook sends no "your delivery moved" email.
		const rolled = toCalendarString(await nextDeliveryDate(MONDAY));
		const baseline = toCalendarString(await nextDeliveryDateIgnoringCapacity(MONDAY));
		expect(rolled).toBe(baseline);
		expect(rolled).toBe(SUN_1);
	});
});

describe('lead time still applies with capacity in play', () => {
	it('a Thursday order skips the 2-day Saturday and gets Sunday', async () => {
		const thursday = shiftDays(SAT_1, -2);
		await getOrCreateStock(SAT_1); // plenty of capacity
		expect(toCalendarString(await nextDeliveryDate(thursday))).toBe(SUN_1);
	});
});

describe('nextDeliveryDateAfter — rescheduling off a skipped day', () => {
	it('moves a skipped Saturday to the Sunday, with no lead time', async () => {
		await skip(SAT_1);
		expect(toCalendarString(await nextDeliveryDateAfter(SAT_1))).toBe(SUN_1);
	});

	it('moves a skipped Monday to the following Saturday', async () => {
		await skip(MON_1);
		expect(toCalendarString(await nextDeliveryDateAfter(MON_1))).toBe(SAT_2);
	});
});
