import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { desc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { subscribers, subscriptions } from '$lib/server/db/schema';
import { sendBulkEmailAction } from '$lib/server/bulkEmail';
import { bulkEmailSchema } from '$lib/schemas/bulkEmail';

/** Best status wins when a subscriber holds more than one subscription (e.g. one cancelled, one active). */
const STATUS_PRIORITY = ['active', 'paused', 'pending', 'cancelled'] as const;

export const load: PageServerLoad = async () => {
	const [bulkEmailForm, subscriberRows, subscriptionRows] = await Promise.all([
		superValidate(zod4(bulkEmailSchema)),
		db
			.select({
				id: subscribers.id,
				email: subscribers.email,
				fullName: subscribers.fullName,
				marketingOptIn: subscribers.marketingOptIn,
				isActive: subscribers.isActive,
				createdAt: subscribers.createdAt
			})
			.from(subscribers)
			.orderBy(desc(subscribers.createdAt)),
		db.select({ subscriberId: subscriptions.subscriberId, status: subscriptions.status }).from(subscriptions)
	]);

	const bestStatusBySubscriber = new Map<string, (typeof STATUS_PRIORITY)[number]>();
	for (const { subscriberId, status } of subscriptionRows) {
		if (!STATUS_PRIORITY.includes(status as (typeof STATUS_PRIORITY)[number])) continue;
		const current = bestStatusBySubscriber.get(subscriberId);
		if (!current || STATUS_PRIORITY.indexOf(status as never) < STATUS_PRIORITY.indexOf(current)) {
			bestStatusBySubscriber.set(subscriberId, status as (typeof STATUS_PRIORITY)[number]);
		}
	}

	// Customer type = subscription status, or "lead" for a subscriber with no subscription
	// at all — this is what the bulk email sender filters/selects recipients by.
	const rows = subscriberRows.map((s) => ({
		...s,
		customerType: bestStatusBySubscriber.get(s.id) ?? 'lead'
	}));

	return { bulkEmailForm, rows };
};

export const actions: Actions = {
	sendBulkEmail: sendBulkEmailAction
};
