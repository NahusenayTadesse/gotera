import type { PageServerLoad } from './$types';
import { asc, eq, inArray } from 'drizzle-orm';

// Adjust to your project's paths.
import { db } from '$lib/server/db';
import { plans } from '$lib/server/db/schema';

// The homepage curates a fixed set of cards (not "all plans"): the three
// self plans plus a single gift teaser. Prices/existence/featured come from
// the DB; the bespoke landing copy lives on the page.

export const load: PageServerLoad = async () => {
const subscriptionPlans = await db
	.select({
		id: plans.id,
		name: plans.name,
		subtitle: plans.subtitle,
		pricePence: plans.pricePence,
		packs: plans.packs,
		interval: plans.interval,
		featured: plans.featured,
		bullets: plans.bullets
	})
	.from(plans)
	.where(eq(plans.active, true))
	.orderBy(
		asc(plans.sortOrder),
		asc(plans.pricePence)
	);

    // Keyed by slug so the page can look up price/featured per card.


    return {
        subscriptionPlans
   
    };
};