import { and, eq, sql } from 'drizzle-orm';
import { db } from './db';
import { deliverySkipDates, stock } from './db/schema';
import { MAIN_SCOPE } from './stock';
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
 * Weekdays we deliver on, as `getUTCDay()` numbers: Saturday, Sunday and Monday.
 * Every date the scheduler hands out is one of these, and skip dates and capacity are
 * tracked per calendar day, so each of the three runs fills up independently.
 */
export const DELIVERY_WEEKDAYS: readonly number[] = [6, 0, 1];

export const isDeliveryDay = (value: CalendarDate): boolean =>
	DELIVERY_WEEKDAYS.includes(dayOfWeek(value));

/** The first delivery day on/after `value`. Never more than five days out. */
function firstDeliveryDayOnOrAfter(value: CalendarDate): CalendarDate {
	let candidate = value;
	while (!isDeliveryDay(candidate)) candidate = shiftDays(candidate, 1);
	return candidate;
}

/** The first delivery day strictly after `value`. */
const nextDeliveryDayAfter = (value: CalendarDate): CalendarDate =>
	firstDeliveryDayOnOrAfter(shiftDays(value, 1));

/**
 * Shortest gap we'll accept between an order landing and the day it ships on.
 *
 * Three days, so a Wednesday order makes Saturday, Thursday makes Sunday and Friday makes
 * Monday, but nothing is ever booked two days or less out — that isn't enough time to pick
 * and pack. This is deliberately a *lead time*, not the same thing as `CUTOFF_DAYS` in
 * `$lib/delivery.ts`: that one governs how late an existing delivery can still be changed,
 * this one governs which delivery day a new order can join in the first place.
 */
export const MIN_LEAD_DAYS = 3;

/** The earliest delivery day a new order placed on `from` could ship on, before skips and capacity. */
export const earliestDeliveryDay = (from: CalendarDate): CalendarDate =>
	firstDeliveryDayOnOrAfter(shiftDays(from, MIN_LEAD_DAYS));

async function skippedDates(): Promise<Set<CalendarDate>> {
	const skips = await db.select({ date: deliverySkipDates.date }).from(deliverySkipDates);
	return new Set(skips.map((s) => toCalendarString(s.date)));
}

/** Dates whose main-product capacity is already taken. A date with no stock row yet is
 * simply not in this set — capacity is created lazily at the default, so an unseeded
 * date is treated as open rather than full. */
async function fullDates(): Promise<Set<CalendarDate>> {
	const rows = await db
		.select({ date: stock.deliveryDate })
		.from(stock)
		.where(and(eq(stock.scopeKey, MAIN_SCOPE), sql`${stock.used} >= ${stock.capacity}`));
	return new Set(rows.map((s) => toCalendarString(s.date)));
}

function firstAvailable(candidate: CalendarDate, unavailable: Set<CalendarDate>): Date {
	while (unavailable.has(candidate)) candidate = nextDeliveryDayAfter(candidate);
	return toLocalMidnight(candidate);
}

/**
 * The earliest Saturday, Sunday or Monday at least `MIN_LEAD_DAYS` after `from` (a
 * CalendarDate, default: today in the business time zone) that isn't in
 * `delivery_skip_dates` and isn't already at full capacity in `stock`.
 * This is the single place that turns "a delivery day" into "the day we're actually
 * delivering on", so every order, subscription and reschedule agrees with what the admin
 * dashboard shows. Returns a Date at local midnight, ready to write straight into a
 * `date` column.
 */
export async function nextDeliveryDate(from: CalendarDate = todayInTimeZone()): Promise<Date> {
	const [skips, full] = await Promise.all([skippedDates(), fullDates()]);
	return firstAvailable(earliestDeliveryDay(from), new Set([...skips, ...full]));
}

/**
 * What `nextDeliveryDate` would return if no date were full — i.e. skip dates and the
 * lead time still apply, but capacity doesn't.
 *
 * Used only to decide whether a customer was actually pushed back by stock, so the
 * "we moved you" email and notification don't fire for someone who was always going to
 * get that day anyway (because of a bank holiday skip, say).
 */
export async function nextDeliveryDateIgnoringCapacity(
	from: CalendarDate = todayInTimeZone()
): Promise<Date> {
	return firstAvailable(earliestDeliveryDay(from), await skippedDates());
}

/**
 * The next open delivery day strictly after `date` — for rescheduling off a just-skipped
 * day. No lead time: those orders are already packed, so a skipped Saturday moves to
 * Sunday (or Monday) rather than a week later.
 */
export async function nextDeliveryDateAfter(date: Date | CalendarDate): Promise<Date> {
	const [skips, full] = await Promise.all([skippedDates(), fullDates()]);
	return firstAvailable(nextDeliveryDayAfter(toCalendarString(date)), new Set([...skips, ...full]));
}
