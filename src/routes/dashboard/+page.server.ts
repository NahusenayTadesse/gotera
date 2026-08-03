import type { Actions, PageServerLoad } from "./$types";
import { auth } from "$lib/server/auth";
import { redirect } from "sveltekit-flash-message/server";
import { eq, and } from "drizzle-orm";
import { db } from "$lib/server/db";
import { deliveries, subscriptions, subscribers, plans, user } from "$lib/server/db/schema";
import { resolveDateRange, dateRangeCondition } from "$lib/server/reports";

export const load: PageServerLoad = async () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const todayRange = resolveDateRange('today');

	// What actually shipped today, per subscription quantity, plus its plan price —
	// the same revenue formula the Reports page uses (pricePence * quantity), since
	// Stripe is the source of truth for what was *charged* but this is what was
	// *delivered and billed for* today, which is what "payments collected" means here.
	const [deliveredToday, newSubscribersToday, newUsersToday] = await Promise.all([
		db
			.select({ quantity: subscriptions.quantity, pricePence: plans.pricePence })
			.from(deliveries)
			.innerJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId))
			.leftJoin(plans, eq(plans.id, subscriptions.planId))
			.where(and(eq(deliveries.status, 'delivered'), eq(deliveries.scheduledDate, today))),
		db
			.select({ id: subscribers.id })
			.from(subscribers)
			.where(dateRangeCondition(subscribers.createdAt, todayRange)),
		db
			.select({ id: user.id })
			.from(user)
			.where(dateRangeCondition(user.createdAt, todayRange))
	]);

	const dailyStats = {
		totalOrders: deliveredToday.length,
		totalItemsSold: deliveredToday.reduce((sum, r) => sum + (r.quantity ?? 0), 0),
		totalPaymentsCollected: deliveredToday.reduce(
			(sum, r) => sum + (r.pricePence ?? 0) * r.quantity,
			0
		),
		newSubscribers: newSubscribersToday.length,
		newUsers: newUsersToday.length
	};

	// No stock/reorder-level tracking exists on the add-ons catalogue yet.
	const reorderProducts: { name: string; quantity: number }[] = [];

	return { dailyStats, reorderProducts };
};

export const actions: Actions = {
	logout: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});
		redirect('/login', { type: 'success', message: 'Logout Successful' }, event.cookies);
	}
};