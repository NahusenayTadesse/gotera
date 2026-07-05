import type { PageServerLoad } from './$types';
import { and, count, countDistinct, eq, inArray } from 'drizzle-orm';

// Adjust to your project's paths.
import { db } from '$lib/server/db';
import { plans, subscribers, deliveries, addresses } from '$lib/server/db/schema';

// The homepage curates a fixed set of cards (not "all plans"): the three
// self plans plus a single gift teaser. Prices/existence/featured come from
// the DB; the bespoke landing copy lives on the page.
const HOMEPAGE_SLUGS = ['one-off', 'starter', 'regular', 'single-gift'];

export const load: PageServerLoad = async () => {
	try {
	const [planRows, subsRes, delsRes, cityRes] = await Promise.all([
		db
			.select({
				slug: plans.slug,
				name: plans.name,
				pricePence: plans.pricePence,
				featured: plans.featured
			})
			.from(plans)
			.where(and(inArray(plans.slug, HOMEPAGE_SLUGS), eq(plans.active, true))),

		db.select({ n: count() }).from(subscribers).where(eq(subscribers.status, 'active')),
		db.select({ n: count() }).from(deliveries).where(eq(deliveries.status, 'delivered')),
		db.select({ n: countDistinct(addresses.city) }).from(addresses)
	]);

	// Keyed by slug so the page can look up price/featured per card.
	const plansBySlug = Object.fromEntries(
		planRows.map((p) => [p.slug, { name: p.name, price: p.pricePence / 100, featured: p.featured }])
	);

	return {
		plans: plansBySlug,
		stats: {
			subscribers: Number(subsRes[0]?.n ?? 0),
			deliveries: Number(delsRes[0]?.n ?? 0),
			cities: Number(cityRes[0]?.n ?? 0)
		}
	};
	} catch (err) {
		console.error('Error loading homepage data:', err);
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