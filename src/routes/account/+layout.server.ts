import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { and, asc, eq } from 'drizzle-orm';

// Adjust to your project's paths.
import { db } from '$lib/server/db';
import {
	subscribers,
	plans,
	deliveries,
	subscriberAddons,
	addons as addonsTable
} from '$lib/server/db/schema';

const monthLong = (d: Date) => new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(d);
const dayMonth = (d: Date | string) => {
	const x = new Date(d);
	return `${x.getDate()} ${monthLong(x)}`; // "18 April"
};
const intervalWord = (i?: string) =>
	i === 'bi_monthly' ? 'bi-monthly' : i === 'one_time' ? 'one-time' : 'monthly';

const STATUS_LABEL: Record<string, string> = {
	active: 'Active',
	paused: 'Paused',
	cancelled: 'Cancelled'
};

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/login');

	const firstName = locals.user.name?.split(' ')[0] ?? 'there';

	const [sub] = await db.select().from(subscribers).where(eq(subscribers.userId, locals.user.id));
	if (!sub) return { firstName, summary: null };

	const [plan] = await db.select().from(plans).where(eq(plans.slug, sub.plan));

	const [delivery] = await db
		.select({ scheduledDate: deliveries.scheduledDate })
		.from(deliveries)
		.where(and(eq(deliveries.subscriberId, sub.id), eq(deliveries.status, 'scheduled')))
		.orderBy(asc(deliveries.scheduledDate))
		.limit(1);

	const recurring = await db
		.select({ pricePence: addonsTable.pricePence, quantity: subscriberAddons.quantity })
		.from(subscriberAddons)
		.innerJoin(addonsTable, eq(subscriberAddons.addonId, addonsTable.id))
		.where(eq(subscriberAddons.subscriberId, sub.id));

	const amountPence =
		(plan?.pricePence ?? 0) + recurring.reduce((s, a) => s + a.pricePence * a.quantity, 0);

	return {
		firstName,
		summary: {
			planLabel: `${plan?.name ?? sub.plan} plan`, // "Regular plan"
			packsLabel: `${plan?.packs ?? '—'} packs ${intervalWord(plan?.interval)}`, // "4 packs monthly"
			status: sub.status,
			statusLabel: STATUS_LABEL[sub.status] ?? sub.status,
			nextDeliveryLabel: delivery ? dayMonth(delivery.scheduledDate) : null, // "18 April"
			nextPaymentAmount: `£${(amountPence / 100).toFixed(2)}`,
			// Next-payment DATE is Stripe's current_period_end, not in the DB.
			nextPaymentDate: null as string | null
		}
	};
};