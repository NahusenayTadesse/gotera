import type { PageServerLoad } from './$types';
import { count, countDistinct, eq, asc } from 'drizzle-orm';
// Adjust to your project's paths.
import { db } from '$lib/server/db';
import { plans, subscriptions, deliveries, addresses } from '$lib/server/db/schema';

const toCard = (p: (typeof planRows)[number]) => {
  let bullets: string[] = [];

  if (Array.isArray(p.bullets)) {
    bullets = p.bullets;
  } else if (typeof p.bullets === 'string') {
    try {
      const parsed = JSON.parse(p.bullets);
      bullets = Array.isArray(parsed) ? parsed : [];
    } catch {
      bullets = [];
    }
  }

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle ?? '',
    price: p.pricePence / 100,
    freq: p.freqLabel ?? '',
    bullets,
    featured: p.featured,
    kind: p.kind
  };
};

export const load: PageServerLoad = async () => {
	try {
		const [planRows, subsRes, delsRes, cityRes] = await Promise.all([
			// ALL active plans, ordered — the page decides how to present them.
			db
				.select({
					id: plans.id,
					slug: plans.slug,
					name: plans.name,
					subtitle: plans.subtitle,
					pricePence: plans.pricePence,
					freqLabel: plans.freqLabel,
					bullets: plans.bullets,
					featured: plans.featured,
					kind: plans.kind,
					interval: plans.interval
				})
				.from(plans)
				.where(eq(plans.active, true))
				.orderBy(asc(plans.sortOrder)),

			// "Active subscribers" = distinct PEOPLE with >=1 active subscription
			// (home + office is one subscriber, not two).
			db
				.select({ n: countDistinct(subscriptions.subscriberId) })
				.from(subscriptions)
				.where(eq(subscriptions.status, 'active')),

			db.select({ n: count() }).from(deliveries).where(eq(deliveries.status, 'delivered')),
			db.select({ n: countDistinct(addresses.city) }).from(addresses)
		]);

		// Shape each plan the way the page consumes it (pounds, not pence).
		// const toCard = (p: (typeof planRows)[number]) => ({
		// 	id: p.id,
		// 	slug: p.slug,
		// 	name: p.name,
		// 	subtitle: p.subtitle ?? '',
		// 	price: p.pricePence / 100,
		// 	freq: p.freqLabel ?? '',
		// 	bullets: p.bullets ?? [],
		// 	featured: p.featured,
		// 	kind: p.kind
		// });

		const subscriptionPlans = planRows.filter((p) => p.kind !== 'gift').map(toCard);
		const giftPlans = planRows.filter((p) => p.kind === 'gift').map(toCard);

		// Also keep a slug-keyed map for pages that look up a specific card.
		const plansBySlug = Object.fromEntries(planRows.map((p) => [p.slug, toCard(p)]));

		// Real "from" prices — the actual lowest active price in each group.
		const lowest = (arr: { price: number }[]) =>
			arr.length ? Math.min(...arr.map((p) => p.price)) : null;




		return {
			subscriptionPlans,
			giftPlans,
			plans: plansBySlug,
			fromPrice: lowest([...subscriptionPlans, ...giftPlans]), // overall lowest
			subscriptionFromPrice: lowest(subscriptionPlans),
			giftFromPrice: lowest(giftPlans),
			stats: {
				subscribers: Number(subsRes[0]?.n ?? 0),
				deliveries: Number(delsRes[0]?.n ?? 0),
				cities: Number(cityRes[0]?.n ?? 0)
			}
		};
		
	} catch (err) {
		console.error('Error loading homepage data:', err);
		// Return a safe empty shape so the page never renders on undefined.
		return {
			subscriptionPlans: [],
			giftPlans: [],
			plans: {},
			fromPrice: null,
			subscriptionFromPrice: null,
			giftFromPrice: null,
			stats: { subscribers: 0, deliveries: 0, cities: 0 }
		};
	}
};

import type { Actions } from "./$types";
import { auth } from "$lib/server/auth";
import { redirect } from 'sveltekit-flash-message/server';

export const actions: Actions = {
	logout: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});
		redirect('/login', { type: 'success', message: 'Logout Successful' }, event.cookies);
	}
};