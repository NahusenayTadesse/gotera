import { h as getLocale } from './runtime.js-CbeSlHLA.js';

//#region src/lib/format.ts
var TIME_ZONE = "Europe/London";
var INTL_TAG = {
	en: "en-GB",
	am: "am-ET"
};
var tag = (locale) => INTL_TAG[getLocale()] ?? "en-GB";
var pad = (n) => String(n).padStart(2, "0");
/**
* Normalise a `date` column into `YYYY-MM-DD`.
*
* MySQL DATE values carry no time and no zone, but mysql2 hands them back as a Date
* at *local* midnight — so the calendar parts must be read with the local getters,
* not the UTC ones. Strings are already zone-free and are simply truncated.
*/
function toCalendarString(value) {
	if (typeof value === "string") return value.slice(0, 10);
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
function toCalendarDate(value) {
	const [y, m, d] = toCalendarString(value).split("-").map(Number);
	return new Date(Date.UTC(y, m - 1, d));
}
/** Shift a calendar date by whole days. DST can't interfere — there is no time here. */
function shiftDays(value, days) {
	const d = toCalendarDate(value);
	d.setUTCDate(d.getUTCDate() + days);
	return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}
/**
* Today's calendar date in the business time zone. Comparable with any other
* `CalendarDate` using plain string comparison — ISO dates sort chronologically.
*/
function todayInTimeZone() {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: TIME_ZONE,
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(/* @__PURE__ */ new Date());
}
var calendar = (value, options, locale) => new Intl.DateTimeFormat(tag(), {
	...options,
	timeZone: "UTC"
}).format(toCalendarDate(value));
/** "Saturday, 18 April" — for a `date` column. */
var fullDate = (value, locale) => calendar(value, {
	weekday: "long",
	day: "numeric",
	month: "long"
});
/** "18 April" — for a `date` column. */
var dayMonth = (value, locale) => calendar(value, {
	day: "numeric",
	month: "long"
});
/** "18 Apr 2026" — for a `date` column. */
var shortDate = (value, locale) => calendar(value, {
	day: "numeric",
	month: "short",
	year: "numeric"
});
/**
* "18 April 2026" for a `timestamp` column — a real instant, so it is rendered in
* the business time zone rather than stripped of one.
*/
var instantDate = (value, locale) => new Intl.DateTimeFormat(tag(), {
	day: "numeric",
	month: "long",
	year: "numeric",
	timeZone: TIME_ZONE
}).format(new Date(value));
/** "£24.00", localised. */
var money = (pence, locale) => new Intl.NumberFormat(tag(), {
	style: "currency",
	currency: "GBP"
}).format(pence / 100);
/**
* Normalise a plan's price to a per-month figure so plans on different billing
* intervals can be summed into one "per month" total. One-off plans contribute
* nothing recurring.
*/
function monthlyEquivalentPence(pricePence, interval) {
	if (interval === "bi_monthly") return pricePence / 2;
	if (interval === "one_time") return 0;
	return pricePence;
}

export { money as a, shortDate as b, dayMonth as d, fullDate as f, instantDate as i, monthlyEquivalentPence as m, shiftDays as s, todayInTimeZone as t };
//# sourceMappingURL=format.js-QHc94QbR.js.map
