import { m as db, t as plans, j as eq, v as isNull, a as asc, k as and, f as ne, w as planPrices } from '../../../../chunks/db.js-Can7tpXV.js';
import { s as stripe } from '../../../../chunks/stripe.js-DclyrhzZ.js';
import { b as syncPlanPrices } from '../../../../chunks/plans.js-z_C5usfw.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-D8k391-h.js';
import { s as superValidate, m as message, a as setError } from '../../../../chunks/client2.js-CuhGksyF.js';
import { z as zod } from '../../../../chunks/adapters.js-CrMSDpnl.js';
import { p as parseJsonColumn } from '../../../../chunks/format2.js-D8oyWA_y.js';
import { i as idSchema } from '../../../../chunks/crud.js-B8_XhxOz.js';
import { p as planSchema } from '../../../../chunks/schema15.js-BxX7KgVN.js';
import { v as error } from '../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/plans/+page.server.ts
/** One bullet per non-blank line. */
var lines = (raw) => (raw ?? "").split("\n").map((l) => l.trim()).filter(Boolean);
/** `datetime-local` value <-> Date. Blank / invalid = no limit. */
var toDate = (raw) => {
	if (!raw) return null;
	const d = new Date(raw);
	return Number.isNaN(d.getTime()) ? null : d;
};
var pad = (n) => String(n).padStart(2, "0");
var toLocalInput = (d) => d ? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}` : "";
var parseTranslations = (raw) => parseJsonColumn(raw, {}) ?? {};
/** Form -> the columns it writes. Other locales already stored are kept. */
function toRow(data, existing) {
	const translations = parseTranslations(existing?.translations);
	const am = {
		name: data.nameAm?.trim() || void 0,
		subtitle: data.subtitleAm?.trim() || void 0,
		freqLabel: data.freqLabelAm?.trim() || void 0,
		bullets: lines(data.bulletsAm).length ? lines(data.bulletsAm) : void 0
	};
	if (Object.values(am).some((v) => v !== void 0)) translations.am = am;
	else delete translations.am;
	return {
		slug: data.slug,
		name: data.name,
		subtitle: data.subtitle || null,
		pricePence: data.pricePence,
		freqLabel: data.freqLabel || null,
		bullets: lines(data.bullets),
		featured: data.featured,
		interval: data.interval,
		packs: data.packs,
		kind: data.kind,
		stripePriceId: data.stripePriceId?.trim() || null,
		active: data.active,
		sortOrder: data.sortOrder,
		quantity: data.quantity,
		injeraPerPack: data.injeraPerPack,
		maxQuantity: data.maxQuantity > 0 ? data.maxQuantity : null,
		availableFrom: toDate(data.availableFrom),
		availableUntil: toDate(data.availableUntil),
		translations: Object.keys(translations).length ? translations : null
	};
}
/**
* Checks the Stripe Price ID against what the plan claims, before it's saved.
*
* The site shows `pricePence` but Stripe charges whatever the Price says, and a
* subscription checkout needs a recurring Price (a one-off needs a one-time one). Any
* mismatch here means customers are charged something other than what they were shown,
* or checkout fails outright — so it blocks the save. If Stripe itself can't be reached
* the plan still saves, with a warning, so an outage doesn't lock the dashboard.
*/
async function checkStripePrice(data, planId) {
	const priceId = data.stripePriceId?.trim();
	if (!priceId) return data.active ? { warning: "Saved, but without a Stripe price ID customers cannot check out on this plan." } : null;
	const [usedByPlan] = await db.select({ name: plans.name }).from(plans).where(and(eq(plans.stripePriceId, priceId), planId ? ne(plans.id, planId) : void 0));
	const [usedByHistory] = await db.select({ name: plans.name }).from(planPrices).innerJoin(plans, eq(plans.id, planPrices.planId)).where(and(eq(planPrices.stripePriceId, priceId), planId ? ne(planPrices.planId, planId) : void 0));
	const owner = usedByPlan ?? usedByHistory;
	if (owner) return {
		field: "stripePriceId",
		error: `This Stripe price already belongs to the "${owner.name}" plan.`
	};
	let price;
	try {
		price = await stripe.prices.retrieve(priceId);
	} catch (e) {
		if (e?.code === "resource_missing") return {
			field: "stripePriceId",
			error: "Stripe has no price with this ID (check test vs live mode)."
		};
		console.error("plan save: could not verify Stripe price", e);
		return { warning: "Saved, but Stripe could not be reached to check the price ID — double-check it." };
	}
	if (!price.active) return {
		field: "stripePriceId",
		error: "This price is archived in Stripe; create a new one."
	};
	if (price.currency !== "gbp") return {
		field: "stripePriceId",
		error: `This price is in ${price.currency.toUpperCase()}, not GBP.`
	};
	if (price.unit_amount !== data.pricePence) return {
		field: "pricePence",
		error: `Stripe charges ${price.unit_amount == null ? "not a fixed amount" : `${price.unit_amount}p`} for this price, but you entered ${data.pricePence}p. To change a price, create a new Price in Stripe and paste its ID here.`
	};
	if (data.kind === "subscription") {
		const expected = data.interval === "bi_monthly" ? 2 : 1;
		const r = price.recurring;
		if (!r || r.interval !== "month" || r.interval_count !== expected) return {
			field: "stripePriceId",
			error: `A ${data.interval === "bi_monthly" ? "bi-monthly" : "monthly"} subscription needs a Stripe price that recurs every ${expected} month${expected > 1 ? "s" : ""}.`
		};
	} else if (price.recurring) return {
		field: "stripePriceId",
		error: "One-off orders and gifts need a one-time Stripe price, not a recurring one."
	};
	return null;
}
/** Only re-verify against Stripe when something Stripe cares about changed. */
var priceFieldsChanged = (data, existing) => (data.stripePriceId?.trim() || null) !== (existing.stripePriceId ?? null) || data.pricePence !== existing.pricePence || data.kind !== existing.kind || data.interval !== existing.interval;
var requireAdmin = (locals) => {
	if (!locals.user || locals.role !== "Admin") error(403, "Not Allowed");
};
async function save({ request, locals }, mode) {
	requireAdmin(locals);
	const form = await superValidate(request, zod(planSchema));
	if (!form.valid) return message(form, {
		type: "error",
		text: "Please check the form for errors"
	}, { status: 400 });
	let existing;
	if (mode === "edit") {
		if (!form.data.id) return message(form, {
			type: "error",
			text: "Missing plan id"
		}, { status: 400 });
		[existing] = await db.select().from(plans).where(eq(plans.id, form.data.id));
		if (!existing) return message(form, {
			type: "error",
			text: "Plan not found"
		}, { status: 404 });
	}
	const [slugTaken] = await db.select({ id: plans.id }).from(plans).where(and(eq(plans.slug, form.data.slug), existing ? ne(plans.id, existing.id) : void 0));
	if (slugTaken) return setError(form, "slug", "Another plan already uses this slug.");
	const check = !existing || priceFieldsChanged(form.data, existing) ? await checkStripePrice(form.data, existing?.id) : null;
	if (check && "error" in check) return setError(form, check.field, check.error);
	try {
		const values = toRow(form.data, existing);
		if (existing) await db.update(plans).set({
			...values,
			updatedBy: locals.user?.id
		}).where(eq(plans.id, existing.id));
		else await db.insert(plans).values({
			...values,
			createdBy: locals.user?.id
		});
		await syncPlanPrices();
	} catch (err) {
		console.error(`Failed to ${mode} plan:`, err);
		return message(form, {
			type: "error",
			text: `Could not ${mode === "add" ? "add" : "update"} plan`
		}, { status: 500 });
	}
	if (check && "warning" in check) return message(form, {
		type: "warning",
		text: check.warning
	});
	return message(form, {
		type: "success",
		text: mode === "add" ? "Plan added" : "Plan updated"
	});
}
var load = async () => {
	const [form, rawRows] = await Promise.all([superValidate(zod(planSchema)), db.select().from(plans).where(isNull(plans.deletedAt)).orderBy(asc(plans.sortOrder))]);
	return {
		form,
		rows: rawRows.map((p) => {
			const am = parseTranslations(p.translations).am;
			return {
				...p,
				bullets: parseJsonColumn(p.bullets, []),
				availableFromInput: toLocalInput(p.availableFrom),
				availableUntilInput: toLocalInput(p.availableUntil),
				nameAm: am?.name ?? "",
				subtitleAm: am?.subtitle ?? "",
				freqLabelAm: am?.freqLabel ?? "",
				bulletsAm: (am?.bullets ?? []).join("\n")
			};
		})
	};
};
var actions = {
	add: (event) => save(event, "add"),
	edit: (event) => save(event, "edit"),
	/**
	* Archives rather than deletes. Subscriptions, deliveries and orders point at their
	* plan, and Stripe keeps billing existing subscribers on it, so the row has to stay.
	* Archived plans drop out of the shop and this list; their Prices still resolve.
	*/
	delete: async ({ request, locals }) => {
		requireAdmin(locals);
		const form = await superValidate(request, zod(idSchema));
		if (!form.valid) return message(form, {
			type: "error",
			text: "Invalid request"
		}, { status: 400 });
		try {
			await db.update(plans).set({
				active: false,
				featured: false,
				deletedAt: /* @__PURE__ */ new Date(),
				updatedBy: locals.user?.id
			}).where(eq(plans.id, form.data.id));
			return message(form, {
				type: "success",
				text: "Plan archived"
			});
		} catch (err) {
			console.error("Failed to archive plan:", err);
			return message(form, {
				type: "error",
				text: "Could not archive plan"
			}, { status: 500 });
		}
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-F-V93IAF.js.map
