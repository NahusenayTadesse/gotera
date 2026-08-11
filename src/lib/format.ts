import { getLocale } from '$lib/paraglide/runtime';

// The business runs on London time — deliveries, cut-offs and billing periods are
// all quoted in it regardless of where the server happens to be running.
export const TIME_ZONE = 'Europe/London';

// Paraglide locale codes are short ("en", "am"); Intl wants BCP-47 tags.
const INTL_TAG: Record<string, string> = { en: 'en-GB', am: 'am-ET' };

const tag = (locale?: string) => INTL_TAG[locale ?? getLocale()] ?? 'en-GB';

/**
 * A calendar day with no time and no zone, as `YYYY-MM-DD`.
 *
 * Calendar dates are passed around as strings rather than Dates on purpose. A Date
 * always carries a zone, so "the 18th" normalised to UTC midnight reads back as the
 * 17th through local getters — converting twice would then silently shift the day.
 * Strings make the conversion idempotent: `toCalendarString` is safe to apply to its
 * own output, which Dates are not.
 */
export type CalendarDate = string;

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Normalise a `date` column into `YYYY-MM-DD`.
 *
 * MySQL DATE values carry no time and no zone, but mysql2 hands them back as a Date
 * at *local* midnight — so the calendar parts must be read with the local getters,
 * not the UTC ones. Strings are already zone-free and are simply truncated.
 */
export function toCalendarString(value: Date | CalendarDate): CalendarDate {
	if (typeof value === 'string') return value.slice(0, 10);
	return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;
}

/**
 * The same calendar day as a UTC-midnight Date, ready to hand to `Intl` with
 * `timeZone: 'UTC'`.
 *
 * Deliberately NOT exported. Its result must never be fed back through
 * `toCalendarString`, which reads local components and would move the day west of
 * UTC. Keeping it private means `CalendarDate` strings are the only calendar value
 * that crosses this module's boundary, so that round-trip cannot be written.
 */
function toCalendarDate(value: Date | CalendarDate): Date {
	const [y, m, d] = toCalendarString(value).split('-').map(Number);
	return new Date(Date.UTC(y, m - 1, d));
}

/** Shift a calendar date by whole days. DST can't interfere — there is no time here. */
export function shiftDays(value: Date | CalendarDate, days: number): CalendarDate {
	const d = toCalendarDate(value);
	d.setUTCDate(d.getUTCDate() + days);
	// Read back with the UTC getters to match how it was built.
	return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

/**
 * Today's calendar date in the business time zone. Comparable with any other
 * `CalendarDate` using plain string comparison — ISO dates sort chronologically.
 */
export function todayInTimeZone(): CalendarDate {
	return new Intl.DateTimeFormat('en-CA', {
		timeZone: TIME_ZONE,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(new Date());
}

const calendar = (
	value: Date | CalendarDate,
	options: Intl.DateTimeFormatOptions,
	locale?: string
) =>
	new Intl.DateTimeFormat(tag(locale), { ...options, timeZone: 'UTC' }).format(
		toCalendarDate(value)
	);

/** "Saturday, 18 April" — for a `date` column. */
export const fullDate = (value: Date | CalendarDate, locale?: string) =>
	calendar(value, { weekday: 'long', day: 'numeric', month: 'long' }, locale);

/** "18 April" — for a `date` column. */
export const dayMonth = (value: Date | CalendarDate, locale?: string) =>
	calendar(value, { day: 'numeric', month: 'long' }, locale);

/** "18 Apr 2026" — for a `date` column. */
export const shortDate = (value: Date | CalendarDate, locale?: string) =>
	calendar(value, { day: 'numeric', month: 'short', year: 'numeric' }, locale);

/** "18 April 2026" — for a `date` column. */
export const longDate = (value: Date | CalendarDate, locale?: string) =>
	calendar(value, { day: 'numeric', month: 'long', year: 'numeric' }, locale);

/**
 * "18 April 2026" for a `timestamp` column — a real instant, so it is rendered in
 * the business time zone rather than stripped of one.
 */
export const instantDate = (value: Date | string, locale?: string) =>
	new Intl.DateTimeFormat(tag(locale), {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: TIME_ZONE
	}).format(new Date(value));

/** "£24.00", localised. */
export const money = (pence: number, locale?: string) =>
	new Intl.NumberFormat(tag(locale), { style: 'currency', currency: 'GBP' }).format(pence / 100);

/**
 * Normalise a plan's price to a per-month figure so plans on different billing
 * intervals can be summed into one "per month" total. One-off plans contribute
 * nothing recurring.
 */
export function monthlyEquivalentPence(pricePence: number, interval: string): number {
	if (interval === 'bi_monthly') return pricePence / 2;
	if (interval === 'one_time') return 0;
	return pricePence;
}
