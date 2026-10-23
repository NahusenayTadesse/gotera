import { m as db, G as deliverySkipDates, C as stock, k as and, s as sql, j as eq } from './db.js-BrmBLP0N.js';
import { s as shiftDays, t as toCalendarString, b as todayInTimeZone } from './format.js-DDyQH27n.js';
import { M as MAIN_SCOPE } from './stock.js-GP03gyPH.js';

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
* The next Saturday on/after `from` (a CalendarDate, default: today in the business time
* zone) that isn't in `delivery_skip_dates`, isn't already at full capacity in `stock`,
* and is at least `MIN_LEAD_DAYS` away.
* Deliveries only ever run on Saturdays, and skips are the exception — this is the single
* place that turns "a Saturday" into "the Saturday we're actually delivering on", so every
* order, subscription and reschedule agrees with what the admin dashboard shows. Returns a
* Date at local midnight, ready to write straight into a `date` column.
*/
async function nextDeliveryDate(from = todayInTimeZone()) {
	let daysUntilSaturday = (6 - dayOfWeek(from) + 7) % 7;
	if (daysUntilSaturday < 3) daysUntilSaturday += 7;
	let candidate = shiftDays(from, daysUntilSaturday);
	const [skips, fullDates] = await Promise.all([db.select({ date: deliverySkipDates.date }).from(deliverySkipDates), db.select({ date: stock.deliveryDate }).from(stock).where(and(eq(stock.scopeKey, MAIN_SCOPE), sql`${stock.used} >= ${stock.capacity}`))]);
	const unavailable = /* @__PURE__ */ new Set([...skips.map((s) => toCalendarString(s.date)), ...fullDates.map((s) => toCalendarString(s.date))]);
	while (unavailable.has(candidate)) candidate = shiftDays(candidate, 7);
	return toLocalMidnight(candidate);
}
/**
* What `nextDeliveryDate` would return if no date were full — i.e. skip dates and the
* lead time still apply, but capacity doesn't.
*
* Used only to decide whether a customer was actually pushed back by stock, so the
* "we moved you" email and notification don't fire for someone who was always going to
* get that Saturday anyway (because of a bank holiday skip, say).
*/
async function nextDeliveryDateIgnoringCapacity(from = todayInTimeZone()) {
	let daysUntilSaturday = (6 - dayOfWeek(from) + 7) % 7;
	if (daysUntilSaturday < 3) daysUntilSaturday += 7;
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
async function nextDeliveryDateAfter(date) {
	return nextDeliveryDate(shiftDays(date, 1));
}

export { nextDeliveryDateIgnoringCapacity as a, nextDeliveryDateAfter as b, nextDeliveryDate as n };
//# sourceMappingURL=deliverySchedule.js-DdB1yKNq.js.map
