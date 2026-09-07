import { db } from './db';
import { deliverySkipDates } from './db/schema';
import { shiftDays, toCalendarString, todayInTimeZone, type CalendarDate } from '$lib/format';

function dayOfWeek(value: CalendarDate): number {
	const [y, m, d] = value.split('-').map(Number);
	return new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0 = Sunday .. 6 = Saturday
}

/** CalendarDate -> Date at local midnight, matching how mysql2 hands `date` columns back. */
function toLocalMidnight(value: CalendarDate): Date {
	const [y, m, d] = value.split('-').map(Number);
	return new Date(y, m - 1, d);
}

/**
 * Shortest gap we'll accept between an order landing and the Saturday it ships on.
 *
 * Three days, so an order placed on Wednesday still makes that Saturday, but Thursday,
 * Friday and Saturday orders roll to the following week — two days or less isn't enough
 * time to pick and pack. This is deliberately a *lead time*, not the same thing as
 * `CUTOFF_DAYS` in `$lib/delivery.ts`: that one governs how late an existing delivery can
 * still be changed, this one governs which Saturday a new order can join in the first place.
 */
export const MIN_LEAD_DAYS = 3;

/**
 * The next Saturday on/after `from` (a CalendarDate, default: today in the business time
 * zone) that isn't in `delivery_skip_dates` and is at least `MIN_LEAD_DAYS` away.
 * Deliveries only ever run on Saturdays, and skips are the exception — this is the single
 * place that turns "a Saturday" into "the Saturday we're actually delivering on", so every
 * order, subscription and reschedule agrees with what the admin dashboard shows. Returns a
 * Date at local midnight, ready to write straight into a `date` column.
 */
export async function nextDeliveryDate(from: CalendarDate = todayInTimeZone()): Promise<Date> {
	// Roll past a Saturday that's too close to pack for. This also subsumes the old `|| 7`
	// that stopped `from` being a Saturday returning that same day (0 days out).
	let daysUntilSaturday = (6 - dayOfWeek(from) + 7) % 7;
	if (daysUntilSaturday < MIN_LEAD_DAYS) daysUntilSaturday += 7;

	let candidate = shiftDays(from, daysUntilSaturday);

	const skips = await db.select({ date: deliverySkipDates.date }).from(deliverySkipDates);
	const skipped = new Set(skips.map((s) => toCalendarString(s.date)));

	while (skipped.has(candidate)) candidate = shiftDays(candidate, 7);

	return toLocalMidnight(candidate);
}

/**
 * Same as `nextDeliveryDate`, but strictly after `date` — for rescheduling off a
 * just-skipped Saturday. `date + 1` is a Sunday, six days from the following Saturday, so
 * `MIN_LEAD_DAYS` never pushes a reschedule an extra week.
 */
export async function nextDeliveryDateAfter(date: Date | CalendarDate): Promise<Date> {
	return nextDeliveryDate(shiftDays(date, 1));
}
