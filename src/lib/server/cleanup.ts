import { and, eq, inArray, isNull, lt } from 'drizzle-orm';
import { db } from '$lib/server/db';
import {
	addresses,
	deliveries,
	giftOrders,
	guestOrders,
	subscriptions
} from '$lib/server/db/schema';

/**
 * How old an unpaid checkout must be before it is treated as abandoned.
 *
 * Stripe Checkout sessions expire after 24 hours and webhook retries stop after 3 days,
 * so anything still pending (with no Stripe id) after two weeks can never be paid. The
 * margin is deliberately wide: deleting a row that was about to be fulfilled would lose
 * an order, while keeping an abandoned one a little longer costs nothing.
 */
export const ABANDONED_AFTER_DAYS = 14;

/**
 * Delete checkouts that were started but never paid, and the address rows created for
 * them, so personal data from abandoned attempts doesn't accumulate forever.
 *
 * Only rows that are still `pending` *and* never received a Stripe id are touched.
 * Addresses are removed only if nothing else (another subscription, guest order or
 * delivery) still references them.
 */
export async function cleanupAbandonedCheckouts(now = new Date()) {
	const cutoff = new Date(now.getTime() - ABANDONED_AFTER_DAYS * 24 * 60 * 60 * 1000);

	const staleSubs = await db
		.select({ id: subscriptions.id, addressId: subscriptions.addressId })
		.from(subscriptions)
		.where(
			and(
				eq(subscriptions.status, 'pending'),
				isNull(subscriptions.stripeSubscriptionId),
				lt(subscriptions.createdAt, cutoff)
			)
		);
	const staleGuests = await db
		.select({ id: guestOrders.id, addressId: guestOrders.addressId })
		.from(guestOrders)
		.where(
			and(
				eq(guestOrders.status, 'pending'),
				isNull(guestOrders.stripePaymentIntentId),
				lt(guestOrders.createdAt, cutoff)
			)
		);

	if (staleSubs.length) {
		await db.delete(subscriptions).where(
			inArray(
				subscriptions.id,
				staleSubs.map((s) => s.id)
			)
		);
	}
	if (staleGuests.length) {
		await db.delete(guestOrders).where(
			inArray(
				guestOrders.id,
				staleGuests.map((g) => g.id)
			)
		);
	}
	const [giftResult] = await db
		.delete(giftOrders)
		.where(
			and(
				eq(giftOrders.status, 'pending'),
				isNull(giftOrders.stripePaymentIntentId),
				lt(giftOrders.createdAt, cutoff)
			)
		);

	// Addresses that belonged to the deleted rows and are now referenced by nothing.
	const candidateIds = [
		...new Set(
			[...staleSubs, ...staleGuests].map((r) => r.addressId).filter((id): id is string => !!id)
		)
	];
	let addressesDeleted = 0;
	if (candidateIds.length) {
		const [usedBySubs, usedByGuests, usedByDeliveries] = await Promise.all([
			db
				.select({ id: subscriptions.addressId })
				.from(subscriptions)
				.where(inArray(subscriptions.addressId, candidateIds)),
			db
				.select({ id: guestOrders.addressId })
				.from(guestOrders)
				.where(inArray(guestOrders.addressId, candidateIds)),
			db
				.select({ id: deliveries.addressId })
				.from(deliveries)
				.where(inArray(deliveries.addressId, candidateIds))
		]);
		const stillUsed = new Set(
			[...usedBySubs, ...usedByGuests, ...usedByDeliveries].map((r) => r.id)
		);
		const orphans = candidateIds.filter((id) => !stillUsed.has(id));
		if (orphans.length) {
			const [res] = await db.delete(addresses).where(inArray(addresses.id, orphans));
			addressesDeleted = res.affectedRows;
		}
	}

	return {
		subscriptions: staleSubs.length,
		guestOrders: staleGuests.length,
		giftOrders: giftResult.affectedRows,
		addresses: addressesDeleted
	};
}
