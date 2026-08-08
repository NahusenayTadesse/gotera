import { m as db, q as plans, j as eq, a as asc } from '../../../chunks/db.js-BkD50_-0.js';

//#region src/routes/subscription-terms/+page.server.ts
var load = async () => {
	return { displayPlans: (await db.select({
		id: plans.id,
		name: plans.name,
		subtitle: plans.subtitle,
		pricePence: plans.pricePence,
		packs: plans.packs,
		interval: plans.interval,
		featured: plans.featured,
		bullets: plans.bullets
	}).from(plans).where(eq(plans.active, true)).orderBy(asc(plans.sortOrder), asc(plans.pricePence))).map((plan) => ({
		...plan,
		price: new Intl.NumberFormat("en-GB", {
			style: "currency",
			currency: "GBP"
		}).format(plan.pricePence / 100),
		intervalLabel: plan.interval === "monthly" ? "month" : plan.interval === "bi_monthly" ? "2 months" : "one-off",
		contents: `${plan.packs} ${plan.packs === 1 ? "pack" : "packs"}`
	})) };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-Cc0F2-om.js.map
