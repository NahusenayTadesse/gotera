import type { PageServerLoad } from './$types';
import { asc, inArray } from 'drizzle-orm';

// Adjust to your project's paths.
import { db } from '$lib/server/db';
import { plans } from '$lib/server/db/schema';
import { getLocale } from '$lib/paraglide/runtime';
import { localizePlan, sellablePlan } from '$lib/server/plans';

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
		bullets: plans.bullets,
		freqLabel: plans.freqLabel,
		injeraPerPack: plans.injeraPerPack,
		translations: plans.translations
	})
	.from(plans)
	.where(sellablePlan())
	.orderBy(
		asc(plans.sortOrder),
		asc(plans.pricePence)
	);

   const locale = getLocale();
   const displayPlans = subscriptionPlans.map((plan) => ({
	...plan,
	...localizePlan(plan, Array.isArray(plan.bullets) ? plan.bullets : [], locale),
	price: new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP'
	}).format(plan.pricePence / 100),

	intervalLabel:
		plan.interval === 'monthly'
			? 'month'
			: plan.interval === 'bi_monthly'
				? '2 months'
				: 'one-off',

	contents: `${plan.packs} ${plan.packs === 1 ? 'pack' : 'packs'} (${plan.packs * plan.injeraPerPack} injera)`
}));


    return {
        displayPlans
   
    };
};