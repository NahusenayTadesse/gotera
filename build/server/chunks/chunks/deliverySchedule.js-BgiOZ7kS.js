import { m as db, G as deliverySkipDates, C as stock, k as and, s as sql, j as eq } from './db.js-C0XyR4ft.js';
import { b as todayInTimeZone, t as toCalendarString, s as shiftDays } from './format.js-DDyQH27n.js';
import { M as MAIN_SCOPE } from './stock.js-DeYtX4qU.js';

//#region src/lib/server/deliverySchedule.ts
function dayOfWeek(value) {
	const [y, m, d] = value.split("-").map(Number);
	return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}
/** CalendarDate -> Date at local midnight, matching how mysql2 hands `date` columns back. */
function toLocalMidnight(value) {
	const [y, m, d] = value.split("-").map(Number);
	return new Date(y, m - 1, d);
}
/**
* Weekdays we deliver on, as `getUTCDay()` numbers: Saturday, Sunday and Monday.
* Every date the scheduler hands out is one of these, and skip dates and capacity are
* tracked per calendar day, so each of the three runs fills up independently.
*/
var DELIVERY_WEEKDAYS = [
	6,
	0,
	1
];
var isDeliveryDay = (value) => DELIVERY_WEEKDAYS.includes(dayOfWeek(value));
/** The first delivery day on/after `value`. Never more than five days out. */
function firstDeliveryDayOnOrAfter(value) {
	let candidate = value;
	while (!isDeliveryDay(candidate)) candidate = shiftDays(candidate, 1);
	return candidate;
}
/** The first delivery day strictly after `value`. */
var nextDeliveryDayAfter = (value) => firstDeliveryDayOnOrAfter(shiftDays(value, 1));
/** The earliest delivery day a new order placed on `from` could ship on, before skips and capacity. */
var earliestDeliveryDay = (from) => firstDeliveryDayOnOrAfter(shiftDays(from, 3));
async function skippedDates() {
	const skips = await db.select({ date: deliverySkipDates.date }).from(deliverySkipDates);
	return new Set(skips.map((s) => toCalendarString(s.date)));
}
/** Dates whose main-product capacity is already taken. A date with no stock row yet is
* simply not in this set — capacity is created lazily at the default, so an unseeded
* date is treated as open rather than full. */
async function fullDates() {
	const rows = await db.select({ date: stock.deliveryDate }).from(stock).where(and(eq(stock.scopeKey, MAIN_SCOPE), sql`${stock.used} >= ${stock.capacity}`));
	return new Set(rows.map((s) => toCalendarString(s.date)));
}
function firstAvailable(candidate, unavailable) {
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
async function nextDeliveryDate(from = todayInTimeZone()) {
	const [skips, full] = await Promise.all([skippedDates(), fullDates()]);
	return firstAvailable(earliestDeliveryDay(from), /* @__PURE__ */ new Set([...skips, ...full]));
}
/**
* What `nextDeliveryDate` would return if no date were full — i.e. skip dates and the
* lead time still apply, but capacity doesn't.
*
* Used only to decide whether a customer was actually pushed back by stock, so the
* "we moved you" email and notification don't fire for someone who was always going to
* get that day anyway (because of a bank holiday skip, say).
*/
async function nextDeliveryDateIgnoringCapacity(from = todayInTimeZone()) {
	return firstAvailable(earliestDeliveryDay(from), await skippedDates());
}
/**
* The next open delivery day strictly after `date` — for rescheduling off a just-skipped
* day. No lead time: those orders are already packed, so a skipped Saturday moves to
* Sunday (or Monday) rather than a week later.
*/
async function nextDeliveryDateAfter(date) {
	const [skips, full] = await Promise.all([skippedDates(), fullDates()]);
	return firstAvailable(nextDeliveryDayAfter(toCalendarString(date)), /* @__PURE__ */ new Set([...skips, ...full]));
}

export { nextDeliveryDateIgnoringCapacity as a, nextDeliveryDateAfter as b, isDeliveryDay as i, nextDeliveryDate as n };
//# sourceMappingURL=deliverySchedule.js-BgiOZ7kS.js.map
