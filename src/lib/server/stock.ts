import { and, eq, isNull, sql } from 'drizzle-orm';
import { db } from './db';
import {
	stock,
	stockChanges,
	notifications,
	subscribers,
	subscriptions,
	plans,
	deliveries,
	giftOrders,
	guestOrders
} from './db/schema';
import { toCalendarString, fullDate, type CalendarDate } from '$lib/format';
import { addons } from './db/schema';
import { notifyAdminStockLow } from './email';
import { sendPushToUser } from './push';

/** Capacity a delivery date gets the first time anything looks at it. */
export const DEFAULT_CAPACITY = 100;
export const DEFAULT_LOW_THRESHOLD = 10;
export const DEFAULT_CRITICAL_THRESHOLD = 3;

/** 'main' for the product itself; an add-on's id for add-on stock. See `stock.scopeKey`. */
export const MAIN_SCOPE = 'main';
const scopeOf = (addonId: string | null) => addonId ?? MAIN_SCOPE;

export type StockRow = typeof stock.$inferSelect;

export const remainingOf = (row: Pick<StockRow, 'capacity' | 'used'>) =>
	Math.max(0, row.capacity - row.used);
export const isFull = (row: Pick<StockRow, 'capacity' | 'used'>) => row.used >= row.capacity;
export const isLow = (row: Pick<StockRow, 'capacity' | 'used' | 'lowThreshold'>) =>
	remainingOf(row) <= row.lowThreshold;

/** CalendarDate -> Date at local midnight, matching how mysql2 hands `date` columns back. */
function toLocalMidnight(value: CalendarDate): Date {
	const [y, m, d] = value.split('-').map(Number);
	return new Date(y, m - 1, d);
}

/**
 * The stock row for a date+item, created on demand.
 *
 * Rows are lazy rather than pre-seeded for every future Saturday: the schedule is open
 * ended, so seeding would mean either a backfill job or a row per date forever. Created
 * here at the default capacity, which an admin can then edit on the stock dashboard.
 */
export async function getOrCreateStock(
	date: Date | CalendarDate,
	addonId: string | null = null
): Promise<StockRow> {
	const calendar = toCalendarString(date);
	const scopeKey = scopeOf(addonId);

	const [existing] = await db
		.select()
		.from(stock)
		.where(and(eq(stock.deliveryDate, toLocalMidnight(calendar)), eq(stock.scopeKey, scopeKey)));
	if (existing) return existing;

	try {
		await db.insert(stock).values({
			deliveryDate: toLocalMidnight(calendar),
			addonId,
			scopeKey,
			capacity: DEFAULT_CAPACITY,
			used: 0,
			lowThreshold: DEFAULT_LOW_THRESHOLD,
			criticalThreshold: DEFAULT_CRITICAL_THRESHOLD
		});
	} catch {
		// Unique constraint — a concurrent request created it first, which is fine.
	}

	const [row] = await db
		.select()
		.from(stock)
		.where(and(eq(stock.deliveryDate, toLocalMidnight(calendar)), eq(stock.scopeKey, scopeKey)));
	return row;
}

/**
 * Reserve `units` against a date's stock.
 *
 * The UPDATE carries its own `used + units <= capacity` guard so two checkouts completing
 * at once can't both pass a read-then-write check and oversell — whichever loses sees
 * `affectedRows === 0` and is told the date is full.
 */
export async function consumeStock(
	date: Date | CalendarDate,
	units: number,
	addonId: string | null = null,
	opts: { allowOver?: boolean; reason?: string } = {}
): Promise<{ ok: boolean; row: StockRow }> {
	const existing = await getOrCreateStock(date, addonId);

	// `allowOver` is for bookings that are happening regardless (an already-paid order, or
	// an admin moving deliveries off a skipped Saturday): the units must be recorded even
	// past capacity, so the dashboard shows the date as over-booked instead of under-counted.
	const [result] = await db
		.update(stock)
		.set({ used: sql`${stock.used} + ${units}` })
		.where(
			and(
				eq(stock.id, existing.id),
				opts.allowOver ? undefined : sql`${stock.used} + ${units} <= ${stock.capacity}`
			)
		);

	if (result.affectedRows === 0) return { ok: false, row: existing };

	const [row] = await db.select().from(stock).where(eq(stock.id, existing.id));

	await db.insert(stockChanges).values({
		stockId: row.id,
		field: 'used',
		delta: units,
		valueAfter: row.used,
		reason: opts.reason ?? 'Delivery booked'
	});

	await maybeAlertLowStock(row);

	return { ok: true, row };
}

/**
 * Give `units` back to a date's stock (a booking was skipped, failed, moved or deleted).
 * Clamped at zero so a release can never push `used` negative.
 */
export async function releaseStock(
	date: Date | CalendarDate,
	units: number,
	addonId: string | null = null,
	reason = 'Delivery released'
) {
	if (units <= 0) return;
	const existing = await getOrCreateStock(date, addonId);

	await db
		.update(stock)
		.set({ used: sql`greatest(${stock.used} - ${units}, 0)` })
		.where(eq(stock.id, existing.id));

	const [row] = await db.select().from(stock).where(eq(stock.id, existing.id));
	await db.insert(stockChanges).values({
		stockId: row.id,
		field: 'used',
		delta: -units,
		valueAfter: row.used,
		reason
	});
}

/** Delivery statuses that still need their stock: everything except skipped/failed. */
const HOLDS_STOCK = new Set(['scheduled', 'dispatched', 'delivered']);

/**
 * Main-product units a subscription delivery needs: the plan's packs × the subscription
 * quantity — the same figure batch traceability allocates against.
 */
export async function deliveryUnits(subscriptionId: string): Promise<number> {
	const [row] = await db
		.select({ packs: plans.packs, quantity: subscriptions.quantity })
		.from(subscriptions)
		.innerJoin(plans, eq(plans.id, subscriptions.planId))
		.where(eq(subscriptions.id, subscriptionId));
	return Math.max(1, (row?.packs ?? 1) * (row?.quantity ?? 1));
}

/**
 * Bring one delivery's stock hold in line with its current status and date.
 *
 *  - skipped / failed           → release whatever it holds
 *  - live, but on a new date    → move the hold to the new date
 *  - scheduled and holding none → reserve (e.g. an admin un-skipped it)
 *
 * The hold is cleared on the delivery row with a compare-and-set before stock is
 * touched, so two concurrent syncs can't both release (or both reserve) the same units.
 * Call it after anything that changes a delivery's status or scheduled date.
 */
export async function syncDeliveryStock(deliveryId: string) {
	const [d] = await db
		.select({
			id: deliveries.id,
			status: deliveries.status,
			subscriptionId: deliveries.subscriptionId,
			scheduledDate: deliveries.scheduledDate,
			stockUnits: deliveries.stockUnits,
			stockDate: deliveries.stockDate
		})
		.from(deliveries)
		.where(eq(deliveries.id, deliveryId));
	if (!d) return;

	const live = HOLDS_STOCK.has(d.status);
	const heldDate = d.stockDate ?? d.scheduledDate;
	const sameDate = toCalendarString(heldDate) === toCalendarString(d.scheduledDate);

	const claim = async (set: { stockUnits: number; stockDate: Date | null }) => {
		const [res] = await db
			.update(deliveries)
			.set(set)
			.where(
				and(
					eq(deliveries.id, d.id),
					eq(deliveries.stockUnits, d.stockUnits),
					// Compared as a calendar day: a `date` read back from the driver is a UTC
					// midnight Date, which mysql2 would send back as a local *datetime* that
					// never equals the stored date in non-UTC timezones.
					d.stockDate
						? sql`${deliveries.stockDate} = ${toCalendarString(d.stockDate)}`
						: isNull(deliveries.stockDate)
				)
			);
		return res.affectedRows > 0;
	};

	if (d.stockUnits > 0 && (!live || !sameDate)) {
		if (!(await claim({ stockUnits: 0, stockDate: null }))) return;
		await releaseStock(heldDate, d.stockUnits, null, live ? 'Delivery moved' : `Delivery ${d.status}`);
		if (live) {
			// Moving is the admin's call (or a skipped Saturday), so it is booked even if the
			// new date is already full.
			await consumeStock(d.scheduledDate, d.stockUnits, null, { allowOver: true, reason: 'Delivery moved' });
			await db
				.update(deliveries)
				.set({ stockUnits: d.stockUnits, stockDate: d.scheduledDate })
				.where(eq(deliveries.id, d.id));
		}
		return;
	}

	if (d.stockUnits === 0 && d.status === 'scheduled') {
		const units = await deliveryUnits(d.subscriptionId);
		if (!(await claim({ stockUnits: units, stockDate: d.scheduledDate }))) return;
		await consumeStock(d.scheduledDate, units, null, { allowOver: true, reason: 'Delivery re-booked' });
	}
}

/**
 * Reserve stock for a paid one-off (gift or guest) order on the next delivery date, and
 * stamp the date on the order. Idempotent: an order that already holds stock is skipped,
 * so a retried webhook doesn't reserve twice.
 */
export async function reserveOrderStock(type: 'gift' | 'guest', orderId: string, units: number, date: Date) {
	const table = type === 'gift' ? giftOrders : guestOrders;
	const [res] = await db
		.update(table)
		.set({ stockUnits: units, deliveryDate: date })
		.where(and(eq(table.id, orderId), eq(table.stockUnits, 0)));
	if (res.affectedRows === 0) return;
	// Already paid for, so it is recorded even past capacity.
	await consumeStock(date, units, null, { allowOver: true, reason: 'One-off order booked' });
}

/**
 * Run a delete of a delivery or one-off order and give back the stock it held.
 *
 * The hold is read first and released only once the row is confirmed gone, so a delete
 * that fails (foreign key, validation, wrong id) never leaves stock under-counted.
 */
export async function deleteReleasingStock<T>(
	kind: 'delivery' | 'gift' | 'guest',
	id: string,
	runDelete: () => Promise<T>
): Promise<T> {
	const hold = await holdOf(kind, id);
	const result = await runDelete();
	if (hold && hold.units > 0 && hold.date && !(await holdOf(kind, id))) {
		await releaseStock(hold.date, hold.units, null, kind === 'delivery' ? 'Delivery deleted' : 'One-off order deleted');
	}
	return result;
}

async function holdOf(kind: 'delivery' | 'gift' | 'guest', id: string) {
	if (kind === 'delivery') {
		const [d] = await db
			.select({ units: deliveries.stockUnits, stockDate: deliveries.stockDate, scheduledDate: deliveries.scheduledDate })
			.from(deliveries)
			.where(eq(deliveries.id, id));
		return d ? { units: d.units, date: d.stockDate ?? d.scheduledDate } : null;
	}
	const table = kind === 'gift' ? giftOrders : guestOrders;
	const [o] = await db
		.select({ units: table.stockUnits, date: table.deliveryDate })
		.from(table)
		.where(eq(table.id, id));
	return o ?? null;
}

/**
 * Email the shop when a booking drops remaining stock to the critical line.
 *
 * `criticalAlertSentAt` is stamped first and used as the guard, so a busy date sends one
 * warning rather than one per order. Failures are logged and swallowed: a booking that
 * already succeeded must not be rolled back because SMTP was down.
 */
async function maybeAlertLowStock(row: StockRow) {
	if (row.criticalAlertSentAt) return;
	if (remainingOf(row) > row.criticalThreshold) return;

	// Conditional update doubles as the lock — whoever sets it first sends the email.
	const [claimed] = await db
		.update(stock)
		.set({ criticalAlertSentAt: new Date() })
		.where(and(eq(stock.id, row.id), isNull(stock.criticalAlertSentAt)));
	if (claimed.affectedRows === 0) return;

	try {
		let itemLabel = 'Main product';
		if (row.addonId) {
			const [addon] = await db.select().from(addons).where(eq(addons.id, row.addonId));
			itemLabel = addon?.name ?? 'Add-on';
		}

		await notifyAdminStockLow({
			itemLabel,
			deliveryLabel: fullDate(row.deliveryDate),
			remaining: remainingOf(row),
			capacity: row.capacity
		});
	} catch (e) {
		console.error('low-stock alert email failed', e);
	}
}

/**
 * Apply an admin's capacity edit and record it.
 *
 * Raising capacity back above the critical line clears `criticalAlertSentAt`, so the alert
 * can fire again next time it is crossed rather than staying permanently suppressed.
 */
export async function setCapacity(
	stockId: string,
	capacity: number,
	userId: string | null,
	reason?: string
) {
	const [before] = await db.select().from(stock).where(eq(stock.id, stockId));
	if (!before) return null;

	const clearsAlert = capacity - before.used > before.criticalThreshold;

	await db
		.update(stock)
		.set({
			capacity,
			updatedBy: userId,
			...(clearsAlert ? { criticalAlertSentAt: null } : {})
		})
		.where(eq(stock.id, stockId));

	await db.insert(stockChanges).values({
		stockId,
		field: 'capacity',
		delta: capacity - before.capacity,
		valueAfter: capacity,
		reason: reason || 'Capacity updated',
		createdBy: userId
	});

	const [after] = await db.select().from(stock).where(eq(stock.id, stockId));
	return after;
}

/** Main-product stock for a date, without creating a row — for read-only display. */
export async function readMainStock(date: Date | CalendarDate): Promise<StockRow | null> {
	const [row] = await db
		.select()
		.from(stock)
		.where(
			and(
				eq(stock.deliveryDate, toLocalMidnight(toCalendarString(date))),
				eq(stock.scopeKey, MAIN_SCOPE)
			)
		);
	return row ?? null;
}

/**
 * Record an in-app notification for a subscriber, and push it to any device they've
 * enabled notifications on (guest subscribers without an account just get the banner).
 */
export async function notify(
	subscriberId: string,
	kind: string,
	title: string,
	body?: string
) {
	await db.insert(notifications).values({ subscriberId, kind, title, body: body ?? null });

	const [sub] = await db
		.select({ userId: subscribers.userId })
		.from(subscribers)
		.where(eq(subscribers.id, subscriberId));
	if (sub?.userId) {
		await sendPushToUser(sub.userId, { title, body, tag: kind, url: '/account' });
	}
}

/** Unread notifications for the signed-in customer's /account banner. */
export async function unreadNotifications(subscriberId: string) {
	return db
		.select()
		.from(notifications)
		.where(and(eq(notifications.subscriberId, subscriberId), isNull(notifications.readAt)));
}
