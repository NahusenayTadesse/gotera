import { and, eq, isNull, sql } from 'drizzle-orm';
import { db } from './db';
import { stock, stockChanges, notifications } from './db/schema';
import { toCalendarString, fullDate, type CalendarDate } from '$lib/format';
import { addons } from './db/schema';
import { notifyAdminStockLow } from './email';

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
	addonId: string | null = null
): Promise<{ ok: boolean; row: StockRow }> {
	const existing = await getOrCreateStock(date, addonId);

	const [result] = await db
		.update(stock)
		.set({ used: sql`${stock.used} + ${units}` })
		.where(and(eq(stock.id, existing.id), sql`${stock.used} + ${units} <= ${stock.capacity}`));

	if (result.affectedRows === 0) return { ok: false, row: existing };

	const [row] = await db.select().from(stock).where(eq(stock.id, existing.id));

	await db.insert(stockChanges).values({
		stockId: row.id,
		field: 'used',
		delta: units,
		valueAfter: row.used,
		reason: 'Delivery booked'
	});

	await maybeAlertLowStock(row);

	return { ok: true, row };
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

/** Record an in-app notification for a subscriber. */
export async function notify(
	subscriberId: string,
	kind: string,
	title: string,
	body?: string
) {
	await db.insert(notifications).values({ subscriberId, kind, title, body: body ?? null });
}

/** Unread notifications for the signed-in customer's /account banner. */
export async function unreadNotifications(subscriberId: string) {
	return db
		.select()
		.from(notifications)
		.where(and(eq(notifications.subscriberId, subscriberId), isNull(notifications.readAt)));
}
