import { n as notifyAdminStockLow } from './email.js-BnPglp6p.js';
import { m as db, y as deliverySkipDates, z as stock, k as and, s as sql, j as eq, A as stockChanges, B as notifications, C as isNull, x as addons } from './db.js-BK-FhdZP.js';
import { s as shiftDays, t as toCalendarString, b as todayInTimeZone, f as fullDate } from './format.js-DhQga0l2.js';

/** 'main' for the product itself; an add-on's id for add-on stock. See `stock.scopeKey`. */
var MAIN_SCOPE = "main";
var scopeOf = (addonId) => addonId ?? "main";
var remainingOf = (row) => Math.max(0, row.capacity - row.used);
var isLow = (row) => remainingOf(row) <= row.lowThreshold;
/** CalendarDate -> Date at local midnight, matching how mysql2 hands `date` columns back. */
function toLocalMidnight$1(value) {
	const [y, m, d] = value.split("-").map(Number);
	return new Date(y, m - 1, d);
}
/**
* The stock row for a date+item, created on demand.
*
* Rows are lazy rather than pre-seeded for every future Saturday: the schedule is open
* ended, so seeding would mean either a backfill job or a row per date forever. Created
* here at the default capacity, which an admin can then edit on the stock dashboard.
*/
async function getOrCreateStock(date, addonId = null) {
	const calendar = toCalendarString(date);
	const scopeKey = scopeOf(addonId);
	const [existing] = await db.select().from(stock).where(and(eq(stock.deliveryDate, toLocalMidnight$1(calendar)), eq(stock.scopeKey, scopeKey)));
	if (existing) return existing;
	try {
		await db.insert(stock).values({
			deliveryDate: toLocalMidnight$1(calendar),
			addonId,
			scopeKey,
			capacity: 100,
			used: 0,
			lowThreshold: 10,
			criticalThreshold: 3
		});
	} catch {}
	const [row] = await db.select().from(stock).where(and(eq(stock.deliveryDate, toLocalMidnight$1(calendar)), eq(stock.scopeKey, scopeKey)));
	return row;
}
/**
* Reserve `units` against a date's stock.
*
* The UPDATE carries its own `used + units <= capacity` guard so two checkouts completing
* at once can't both pass a read-then-write check and oversell — whichever loses sees
* `affectedRows === 0` and is told the date is full.
*/
async function consumeStock(date, units, addonId = null) {
	const existing = await getOrCreateStock(date, addonId);
	const [result] = await db.update(stock).set({ used: sql`${stock.used} + ${units}` }).where(and(eq(stock.id, existing.id), sql`${stock.used} + ${units} <= ${stock.capacity}`));
	if (result.affectedRows === 0) return {
		ok: false,
		row: existing
	};
	const [row] = await db.select().from(stock).where(eq(stock.id, existing.id));
	await db.insert(stockChanges).values({
		stockId: row.id,
		field: "used",
		delta: units,
		valueAfter: row.used,
		reason: "Delivery booked"
	});
	await maybeAlertLowStock(row);
	return {
		ok: true,
		row
	};
}
/**
* Email the shop when a booking drops remaining stock to the critical line.
*
* `criticalAlertSentAt` is stamped first and used as the guard, so a busy date sends one
* warning rather than one per order. Failures are logged and swallowed: a booking that
* already succeeded must not be rolled back because SMTP was down.
*/
async function maybeAlertLowStock(row) {
	if (row.criticalAlertSentAt) return;
	if (remainingOf(row) > row.criticalThreshold) return;
	const [claimed] = await db.update(stock).set({ criticalAlertSentAt: /* @__PURE__ */ new Date() }).where(and(eq(stock.id, row.id), isNull(stock.criticalAlertSentAt)));
	if (claimed.affectedRows === 0) return;
	try {
		let itemLabel = "Main product";
		if (row.addonId) {
			const [addon] = await db.select().from(addons).where(eq(addons.id, row.addonId));
			itemLabel = addon?.name ?? "Add-on";
		}
		await notifyAdminStockLow({
			itemLabel,
			deliveryLabel: fullDate(row.deliveryDate),
			remaining: remainingOf(row),
			capacity: row.capacity
		});
	} catch (e) {
		console.error("low-stock alert email failed", e);
	}
}
/**
* Apply an admin's capacity edit and record it.
*
* Raising capacity back above the critical line clears `criticalAlertSentAt`, so the alert
* can fire again next time it is crossed rather than staying permanently suppressed.
*/
async function setCapacity(stockId, capacity, userId, reason) {
	const [before] = await db.select().from(stock).where(eq(stock.id, stockId));
	if (!before) return null;
	const clearsAlert = capacity - before.used > before.criticalThreshold;
	await db.update(stock).set({
		capacity,
		updatedBy: userId,
		...clearsAlert ? { criticalAlertSentAt: null } : {}
	}).where(eq(stock.id, stockId));
	await db.insert(stockChanges).values({
		stockId,
		field: "capacity",
		delta: capacity - before.capacity,
		valueAfter: capacity,
		reason: reason || "Capacity updated",
		createdBy: userId
	});
	const [after] = await db.select().from(stock).where(eq(stock.id, stockId));
	return after;
}
/** Main-product stock for a date, without creating a row — for read-only display. */
async function readMainStock(date) {
	const [row] = await db.select().from(stock).where(and(eq(stock.deliveryDate, toLocalMidnight$1(toCalendarString(date))), eq(stock.scopeKey, MAIN_SCOPE)));
	return row ?? null;
}
/** Record an in-app notification for a subscriber. */
async function notify(subscriberId, kind, title, body) {
	await db.insert(notifications).values({
		subscriberId,
		kind,
		title,
		body: body ?? null
	});
}
//#endregion
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

export { remainingOf as a, nextDeliveryDateAfter as b, nextDeliveryDateIgnoringCapacity as c, consumeStock as d, notify as e, getOrCreateStock as g, isLow as i, nextDeliveryDate as n, readMainStock as r, setCapacity as s };
//# sourceMappingURL=deliverySchedule.js-CYWOrYue.js.map
