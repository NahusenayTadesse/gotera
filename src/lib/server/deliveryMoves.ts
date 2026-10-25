import { and, eq, inArray, sql } from 'drizzle-orm';
import { db } from './db';
import { deliveries, deliverySkipDates, giftOrders, guestOrders, subscribers } from './db/schema';
import { moveOrderStock, syncDeliveryStock } from './stock';
import { syncAllocations } from './traceability';
import { isDeliveryDay } from './deliverySchedule';
import { todayInTimeZone, type CalendarDate } from '$lib/format';

/**
 * Moving bookings between delivery days, for the admin deliveries page.
 *
 * A "booking" is anything that still has to go out: a scheduled subscription delivery, or
 * a paid-but-unfulfilled guest / one-time order. Things already dispatched, delivered,
 * fulfilled, skipped or failed are left where they are.
 */
export type BookingType = 'subscription' | 'guest' | 'gift';
export type BookingRef = { type: BookingType; id: string };
export type Recipient = { email: string; name?: string };

/** CalendarDate -> Date at local midnight, matching how mysql2 hands `date` columns back. */
export function toLocalMidnight(value: CalendarDate): Date {
	const [y, m, d] = value.split('-').map(Number);
	return new Date(y, m - 1, d);
}

/** Everything still to go out on `date`. */
export async function bookingsOn(date: CalendarDate): Promise<BookingRef[]> {
	const [subs, guests, gifts] = await Promise.all([
		db
			.select({ id: deliveries.id })
			.from(deliveries)
			.where(and(eq(deliveries.status, 'scheduled'), eq(deliveries.scheduledDate, toLocalMidnight(date)))),
		db
			.select({ id: guestOrders.id })
			.from(guestOrders)
			.where(and(eq(guestOrders.status, 'paid'), sql`${guestOrders.deliveryDate} = ${date}`)),
		db
			.select({ id: giftOrders.id })
			.from(giftOrders)
			.where(and(eq(giftOrders.status, 'paid'), sql`${giftOrders.deliveryDate} = ${date}`))
	]);
	return [
		...subs.map((r) => ({ type: 'subscription' as const, id: r.id })),
		...guests.map((r) => ({ type: 'guest' as const, id: r.id })),
		...gifts.map((r) => ({ type: 'gift' as const, id: r.id }))
	];
}

/**
 * Why `date` can't take bookings, or null if it can: it has to be a Saturday, Sunday or
 * Monday, not in the past, and not skipped.
 */
export async function targetProblem(date: CalendarDate): Promise<string | null> {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return 'Pick a date.';
	if (!isDeliveryDay(date)) return 'We only deliver on Saturdays, Sundays and Mondays.';
	if (date < todayInTimeZone()) return 'That date has already passed.';
	const [skipped] = await db
		.select({ id: deliverySkipDates.id })
		.from(deliverySkipDates)
		.where(eq(deliverySkipDates.date, toLocalMidnight(date)));
	if (skipped) return 'That day is skipped — un-skip it first, or pick another day.';
	return null;
}

/**
 * Move bookings onto `to`, taking their stock with them and re-running batch allocation
 * (batches are picked by the ship date). Anything no longer movable is counted as left.
 * Returns the distinct recipients of what moved, for the "your delivery moved" email.
 */
export async function moveBookings(refs: BookingRef[], to: CalendarDate, userId?: string) {
	const target = toLocalMidnight(to);
	const moved: BookingRef[] = [];
	const recipients = new Map<string, Recipient>();
	let left = 0;

	for (const ref of refs) {
		try {
			if (ref.type === 'subscription') {
				const [res] = await db
					.update(deliveries)
					.set({ scheduledDate: target })
					.where(and(eq(deliveries.id, ref.id), eq(deliveries.status, 'scheduled')));
				if (res.affectedRows === 0) {
					left++;
					continue;
				}
				await syncDeliveryStock(ref.id);
			} else {
				const table = ref.type === 'gift' ? giftOrders : guestOrders;
				const [o] = await db.select({ status: table.status }).from(table).where(eq(table.id, ref.id));
				if (o?.status !== 'paid' || !(await moveOrderStock(ref.type, ref.id, target))) {
					left++;
					continue;
				}
			}
			moved.push(ref);
		} catch (err) {
			console.error('Moving booking failed:', ref, err);
			left++;
		}
	}

	if (moved.length) {
		try {
			await syncAllocations({ refs: moved }, userId);
		} catch (err) {
			console.error('Batch re-sync after move failed:', err);
		}
		for (const r of await recipientsOf(moved)) recipients.set(r.email, r);
	}

	return { moved: moved.length, left, recipients: [...recipients.values()] };
}

async function recipientsOf(refs: BookingRef[]): Promise<Recipient[]> {
	const ids = (type: BookingType) => refs.filter((r) => r.type === type).map((r) => r.id);
	const [subs, guests, gifts] = await Promise.all([
		ids('subscription').length
			? db
					.select({ email: subscribers.email, name: subscribers.fullName })
					.from(deliveries)
					.innerJoin(subscribers, eq(subscribers.id, deliveries.subscriberId))
					.where(inArray(deliveries.id, ids('subscription')))
			: [],
		ids('guest').length
			? db
					.select({ email: guestOrders.buyerEmail, name: guestOrders.buyerName })
					.from(guestOrders)
					.where(inArray(guestOrders.id, ids('guest')))
			: [],
		ids('gift').length
			? db
					.select({ email: giftOrders.buyerEmail, name: giftOrders.buyerName })
					.from(giftOrders)
					.where(inArray(giftOrders.id, ids('gift')))
			: []
	]);
	return [...subs, ...guests, ...gifts]
		.filter((r): r is { email: string; name: string | null } => !!r.email)
		.map((r) => ({ email: r.email, name: r.name ?? undefined }));
}
