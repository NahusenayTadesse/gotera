import { q as subscriptions, t as plans, s as sql, k as and, o as or, g as gt, v as isNull, e as lte, j as eq, m as db, w as planPrices, f as ne } from './db.js-C0XyR4ft.js';

//#region src/lib/server/plans.ts
/**
* The unit price a subscription is actually billed at.
*
* `subscriptions.unitPricePence` is mirrored from Stripe by the webhook and stays at the
* price the customer signed up on; `plans.pricePence` is only what a NEW checkout costs.
* Rows the webhook hasn't synced since the column was added fall back to the plan price.
* Use in any select that joins `plans` to `subscriptions`.
*/
var subscriptionUnitPrice = sql`coalesce(${subscriptions.unitPricePence}, ${plans.pricePence})`.mapWith(Number);
/**
* Plans a customer may buy right now: switched on in the dashboard, not archived, and
* inside the plan's optional sale window.
*/
function sellablePlan(now = /* @__PURE__ */ new Date()) {
	return and(eq(plans.active, true), isNull(plans.deletedAt), or(isNull(plans.availableFrom), lte(plans.availableFrom, now)), or(isNull(plans.availableUntil), gt(plans.availableUntil, now)));
}
/**
* The plan a Stripe Price belongs to — including Prices the plan no longer sells at.
*
* After a price change, customers who subscribed earlier are still billed on the old
* Price, so matching only `plans.stripePriceId` (the current one) would lose their plan.
* `plan_prices` remembers every Price a plan has used; the `plans` lookup is a fallback
* for a Price added straight to the database without going through the dashboard.
*/
async function planForStripePrice(priceId) {
	const [hit] = await db.select({ plan: plans }).from(planPrices).innerJoin(plans, eq(plans.id, planPrices.planId)).where(eq(planPrices.stripePriceId, priceId)).limit(1);
	if (hit) return hit.plan;
	const [plan] = await db.select().from(plans).where(eq(plans.stripePriceId, priceId)).limit(1);
	return plan;
}
/**
* Bring `plan_prices` in line with each plan's current `stripePriceId`.
*
* For every plan: its current Price gets an open row (`activeTo` NULL), and any other
* open row for that plan is closed. Rows are never deleted, so old Prices keep resolving
* to their plan. Idempotent — the dashboard runs it after every plan save.
*/
async function syncPlanPrices(now = /* @__PURE__ */ new Date()) {
	const rows = await db.select().from(plans);
	for (const plan of rows) {
		const priceId = plan.stripePriceId?.trim();
		if (priceId) {
			const [existing] = await db.select().from(planPrices).where(eq(planPrices.stripePriceId, priceId));
			if (!existing) await db.insert(planPrices).values({
				planId: plan.id,
				stripePriceId: priceId,
				pricePence: plan.pricePence,
				currency: plan.currency,
				activeFrom: now
			});
			else if (existing.planId === plan.id && existing.activeTo) await db.update(planPrices).set({ activeTo: null }).where(eq(planPrices.id, existing.id));
		}
		await db.update(planPrices).set({ activeTo: now }).where(and(eq(planPrices.planId, plan.id), isNull(planPrices.activeTo), priceId ? ne(planPrices.stripePriceId, priceId) : void 0));
	}
}
/**
* Normalises a `?plan=` / form slug. Slugs are stored lowercase; links written before
* that (e.g. `?plan=Family`) still resolve.
*/
var normaliseSlug = (slug) => (slug ?? "").trim().toLowerCase();
/**
* Customer-facing plan text in `locale`, falling back field by field to the English
* columns. `bullets` must already be parsed to an array by the caller.
*/
function localizePlan(plan, bullets, locale) {
	const t = translationFor(plan.translations, locale);
	const translatedBullets = Array.isArray(t?.bullets) ? t.bullets.filter((b) => typeof b === "string" && b.trim()) : [];
	return {
		name: t?.name?.trim() || plan.name,
		subtitle: t?.subtitle?.trim() || plan.subtitle || "",
		freqLabel: t?.freqLabel?.trim() || plan.freqLabel || "",
		bullets: translatedBullets.length ? translatedBullets : bullets
	};
}
function translationFor(raw, locale) {
	let value = raw;
	if (typeof value === "string") try {
		value = JSON.parse(value);
	} catch {
		return;
	}
	if (!value || typeof value !== "object") return void 0;
	const entry = value[locale];
	return entry && typeof entry === "object" ? entry : void 0;
}

export { sellablePlan as a, syncPlanPrices as b, localizePlan as l, normaliseSlug as n, planForStripePrice as p, subscriptionUnitPrice as s };
//# sourceMappingURL=plans.js-CLuCyM_n.js.map
