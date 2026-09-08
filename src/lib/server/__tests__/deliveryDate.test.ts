import { describe, it, expect } from 'vitest';
import { MIN_LEAD_DAYS } from '../deliverySchedule';
import { CUTOFF_DAYS, cutoffDateFor, isPastCutoff } from '$lib/delivery';
import { shiftDays, toCalendarString } from '$lib/format';

/**
 * The Saturday-picking arithmetic, isolated from the database.
 *
 * `nextDeliveryDate` itself queries skip dates and stock, so the pure rule is replicated
 * here and the DB-backed behaviour is covered in stock.integration.test.ts. Keeping this
 * split means the arithmetic is verified for every weekday without 7 round trips.
 */
function targetSaturday(from: string): string {
	const [y, m, d] = from.split('-').map(Number);
	const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
	let days = (6 - dow + 7) % 7;
	if (days < MIN_LEAD_DAYS) days += 7;
	return shiftDays(from, days);
}

const dayName = (iso: string) => {
	const [y, m, d] = iso.split('-').map(Number);
	return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
};

const daysBetween = (a: string, b: string) =>
	Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);

describe('delivery date selection', () => {
	// 2026-09-06 is a Sunday, so this walks Sun..Sat in order.
	const week = Array.from({ length: 7 }, (_, i) => shiftDays('2026-09-06', i));

	it('always lands on a Saturday', () => {
		for (const day of week) expect(dayName(targetSaturday(day))).toBe('Sat');
	});

	it('never books with less than MIN_LEAD_DAYS notice', () => {
		for (const day of week) {
			expect(daysBetween(day, targetSaturday(day))).toBeGreaterThanOrEqual(MIN_LEAD_DAYS);
		}
	});

	it('lets Sunday through Wednesday keep the coming Saturday', () => {
		expect(daysBetween('2026-09-06', targetSaturday('2026-09-06'))).toBe(6); // Sun
		expect(daysBetween('2026-09-07', targetSaturday('2026-09-07'))).toBe(5); // Mon
		expect(daysBetween('2026-09-08', targetSaturday('2026-09-08'))).toBe(4); // Tue
		expect(daysBetween('2026-09-09', targetSaturday('2026-09-09'))).toBe(3); // Wed
	});

	it('rolls Thursday and Friday orders to the following Saturday', () => {
		// This is the rule the user asked for: 2 days is too short to pick and pack.
		expect(targetSaturday('2026-09-10')).toBe('2026-09-19'); // Thu -> +9
		expect(targetSaturday('2026-09-11')).toBe('2026-09-19'); // Fri -> +8
	});

	it('never books a Saturday for that same Saturday', () => {
		expect(targetSaturday('2026-09-12')).toBe('2026-09-19');
		expect(daysBetween('2026-09-12', targetSaturday('2026-09-12'))).toBe(7);
	});

	it('handles month and year boundaries', () => {
		expect(dayName(targetSaturday('2026-12-31'))).toBe('Sat'); // Thu -> into January
		expect(targetSaturday('2026-12-31')).toBe('2027-01-09');
		expect(dayName(targetSaturday('2026-02-26'))).toBe('Sat'); // leap-year Feb
	});
});

describe('change cut-off', () => {
	it('sits CUTOFF_DAYS before the delivery', () => {
		expect(cutoffDateFor('2026-09-19')).toBe(shiftDays('2026-09-19', -CUTOFF_DAYS));
	});

	it('treats a far-future delivery as still changeable', () => {
		const far = toCalendarString(shiftDays(toCalendarString(new Date()), 60));
		expect(isPastCutoff(far)).toBe(false);
	});

	it('treats a past delivery as closed', () => {
		const past = toCalendarString(shiftDays(toCalendarString(new Date()), -10));
		expect(isPastCutoff(past)).toBe(true);
	});

	it('is why the reminder link cannot use the cut-off as its gate', () => {
		// Reminders send at T-2 but the cut-off is T-4, so the cut-off has already passed
		// when the "Add extras" email goes out. /addons/[token] gates on delivery status
		// instead; this test pins the relationship that makes that necessary.
		expect(CUTOFF_DAYS).toBeGreaterThan(2);
	});
});
