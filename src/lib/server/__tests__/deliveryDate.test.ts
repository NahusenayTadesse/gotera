import { describe, it, expect } from 'vitest';
import { MIN_LEAD_DAYS, earliestDeliveryDay } from '../deliverySchedule';
import { CUTOFF_DAYS, cutoffDateFor, isPastCutoff } from '$lib/delivery';
import { shiftDays, toCalendarString } from '$lib/format';

/**
 * The day-picking arithmetic, isolated from the database.
 *
 * `nextDeliveryDate` also queries skip dates and stock; that DB-backed behaviour is
 * covered in schedule.integration.test.ts. `earliestDeliveryDay` is the pure rule
 * underneath it, so it's verified here for every weekday without 7 round trips.
 */
const dayName = (iso: string) => {
	const [y, m, d] = iso.split('-').map(Number);
	return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
};

const daysBetween = (a: string, b: string) =>
	Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);

describe('delivery date selection', () => {
	// 2026-09-06 is a Sunday, so this walks Sun..Sat in order.
	const week = Array.from({ length: 7 }, (_, i) => shiftDays('2026-09-06', i));

	it('always lands on a Saturday, Sunday or Monday', () => {
		for (const day of week) expect(['Sat', 'Sun', 'Mon']).toContain(dayName(earliestDeliveryDay(day)));
	});

	it('never books with less than MIN_LEAD_DAYS notice', () => {
		for (const day of week) {
			expect(daysBetween(day, earliestDeliveryDay(day))).toBeGreaterThanOrEqual(MIN_LEAD_DAYS);
		}
	});

	it('lets Sunday through Wednesday make the coming Saturday', () => {
		for (const day of ['2026-09-06', '2026-09-07', '2026-09-08', '2026-09-09']) {
			expect(earliestDeliveryDay(day)).toBe('2026-09-12');
		}
	});

	it('gives Thursday orders Sunday and Friday orders Monday', () => {
		expect(earliestDeliveryDay('2026-09-10')).toBe('2026-09-13'); // Thu -> Sun
		expect(earliestDeliveryDay('2026-09-11')).toBe('2026-09-14'); // Fri -> Mon
	});

	it('rolls a Saturday order to the following Saturday', () => {
		// Sun and Mon are only 1-2 days out — too short to pick and pack.
		expect(earliestDeliveryDay('2026-09-12')).toBe('2026-09-19');
	});

	it('handles month and year boundaries', () => {
		expect(earliestDeliveryDay('2026-12-31')).toBe('2027-01-03'); // Thu -> Sun in January
		expect(earliestDeliveryDay('2026-02-26')).toBe('2026-03-01'); // Thu -> Sun past Feb
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
