import { m as db, q as plans, j as eq, a as asc, x as countDistinct, y as subscriptions, c as count, t as deliveries, z as addresses } from '../../chunks/db.js-BkD50_-0.js';
import { a as auth } from '../../chunks/auth.js-DZBRJAcg.js';
import { r as redirect$1 } from '../../chunks/server2.js-BivggJkG.js';

//#region src/routes/+page.server.ts
var toCard = (p) => {
	let bullets = [];
	if (Array.isArray(p.bullets)) bullets = p.bullets;
	else if (typeof p.bullets === "string") try {
		const parsed = JSON.parse(p.bullets);
		bullets = Array.isArray(parsed) ? parsed : [];
	} catch {
		bullets = [];
	}
	return {
		id: p.id,
		slug: p.slug,
		name: p.name,
		subtitle: p.subtitle ?? "",
		price: p.pricePence / 100,
		freq: p.freqLabel ?? "",
		bullets,
		featured: p.featured,
		kind: p.kind
	};
};
var load = async () => {
	try {
		const [planRows, subsRes, delsRes, cityRes] = await Promise.all([
			db.select({
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
			}).from(plans).where(eq(plans.active, true)).orderBy(asc(plans.sortOrder)),
			db.select({ n: countDistinct(subscriptions.subscriberId) }).from(subscriptions).where(eq(subscriptions.status, "active")),
			db.select({ n: count() }).from(deliveries).where(eq(deliveries.status, "delivered")),
			db.select({ n: countDistinct(addresses.city) }).from(addresses)
		]);
		const subscriptionPlans = planRows.filter((p) => p.kind !== "gift").map(toCard);
		const giftPlans = planRows.filter((p) => p.kind === "gift").map(toCard);
		const plansBySlug = Object.fromEntries(planRows.map((p) => [p.slug, toCard(p)]));
		const lowest = (arr) => arr.length ? Math.min(...arr.map((p) => p.price)) : null;
		return {
			subscriptionPlans,
			giftPlans,
			plans: plansBySlug,
			fromPrice: lowest([...subscriptionPlans, ...giftPlans]),
			subscriptionFromPrice: lowest(subscriptionPlans),
			giftFromPrice: lowest(giftPlans),
			stats: {
				subscribers: Number(subsRes[0]?.n ?? 0),
				deliveries: Number(delsRes[0]?.n ?? 0),
				cities: Number(cityRes[0]?.n ?? 0)
			}
		};
	} catch (err) {
		console.error("Error loading homepage data:", err);
		return {
			subscriptionPlans: [],
			giftPlans: [],
			plans: {},
			fromPrice: null,
			subscriptionFromPrice: null,
			giftFromPrice: null,
			stats: {
				subscribers: 0,
				deliveries: 0,
				cities: 0
			}
		};
	}
};
var actions = { logout: async (event) => {
	await auth.api.signOut({ headers: event.request.headers });
	redirect$1("/login", {
		type: "success",
		message: "Logout Successful"
	}, event.cookies);
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-BD0HSKwE.js.map
