import { m as db, t as plans, a as asc } from '../../../chunks/db.js-BrmBLP0N.js';
import { h as getLocale } from '../../../chunks/runtime.js-CbeSlHLA.js';
import { a as sellablePlan, l as localizePlan } from '../../../chunks/plans.js-CY9B-xN_.js';

//#region src/routes/subscription-terms/+page.server.ts
var load = async () => {
	const subscriptionPlans = await db.select({
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
	}).from(plans).where(sellablePlan()).orderBy(asc(plans.sortOrder), asc(plans.pricePence));
	const locale = getLocale();
	return { displayPlans: subscriptionPlans.map((plan) => ({
		...plan,
		...localizePlan(plan, Array.isArray(plan.bullets) ? plan.bullets : [], locale),
		price: new Intl.NumberFormat("en-GB", {
			style: "currency",
			currency: "GBP"
		}).format(plan.pricePence / 100),
		intervalLabel: plan.interval === "monthly" ? "month" : plan.interval === "bi_monthly" ? "2 months" : "one-off",
		contents: `${plan.packs} ${plan.packs === 1 ? "pack" : "packs"} (${plan.packs * plan.injeraPerPack} injera)`
	})) };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DUg7Nm7t.js.map
