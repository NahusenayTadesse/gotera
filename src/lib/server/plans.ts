import { and, eq, gt, isNull, lte, ne, or, sql, type SQL } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { planPrices, plans, subscriptions, type PlanTranslation } from '$lib/server/db/schema';

type PlanRow = typeof plans.$inferSelect;

/**
 * The unit price a subscription is actually billed at.
 *
 * `subscriptions.unitPricePence` is mirrored from Stripe by the webhook and stays at the
 * price the customer signed up on; `plans.pricePence` is only what a NEW checkout costs.
 * Rows the webhook hasn't synced since the column was added fall back to the plan price.
 * Use in any select that joins `plans` to `subscriptions`.
 */
export const subscriptionUnitPrice = sql<number>`coalesce(${subscriptions.unitPricePence}, ${plans.pricePence})`.mapWith(Number);

/**
 * Plans a customer may buy right now: switched on in the dashboard, not archived, and
 * inside the plan's optional sale window.
 */
export function sellablePlan(now = new Date()): SQL {
	return and(
		eq(plans.active, true),
		isNull(plans.deletedAt),
		or(isNull(plans.availableFrom), lte(plans.availableFrom, now)),
		or(isNull(plans.availableUntil), gt(plans.availableUntil, now))
	)!;
}

/**
 * The plan a Stripe Price belongs to — including Prices the plan no longer sells at.
 *
 * After a price change, customers who subscribed earlier are still billed on the old
 * Price, so matching only `plans.stripePriceId` (the current one) would lose their plan.
 * `plan_prices` remembers every Price a plan has used; the `plans` lookup is a fallback
 * for a Price added straight to the database without going through the dashboard.
 */
export async function planForStripePrice(priceId: string): Promise<PlanRow | undefined> {
	const [hit] = await db
		.select({ plan: plans })
		.from(planPrices)
		.innerJoin(plans, eq(plans.id, planPrices.planId))
		.where(eq(planPrices.stripePriceId, priceId))
		.limit(1);
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
export async function syncPlanPrices(now = new Date()) {
	const rows = await db.select().from(plans);
	for (const plan of rows) {
		const priceId = plan.stripePriceId?.trim();
		if (priceId) {
			const [existing] = await db
				.select()
				.from(planPrices)
				.where(eq(planPrices.stripePriceId, priceId));
			if (!existing) {
				await db.insert(planPrices).values({
					planId: plan.id,
					stripePriceId: priceId,
					pricePence: plan.pricePence,
					currency: plan.currency,
					activeFrom: now
				});
			} else if (existing.planId === plan.id && existing.activeTo) {
				// Switched back to a Price used before: it's current again.
				await db.update(planPrices).set({ activeTo: null }).where(eq(planPrices.id, existing.id));
			}
		}
		await db
			.update(planPrices)
			.set({ activeTo: now })
			.where(
				and(
					eq(planPrices.planId, plan.id),
					isNull(planPrices.activeTo),
					priceId ? ne(planPrices.stripePriceId, priceId) : undefined
				)
			);
	}
}

/**
 * Normalises a `?plan=` / form slug. Slugs are stored lowercase; links written before
 * that (e.g. `?plan=Family`) still resolve.
 */
export const normaliseSlug = (slug: string | null | undefined) => (slug ?? '').trim().toLowerCase();

/**
 * Customer-facing plan text in `locale`, falling back field by field to the English
 * columns. `bullets` must already be parsed to an array by the caller.
 */
export function localizePlan<
	T extends {
		name: string;
		subtitle?: string | null;
		freqLabel?: string | null;
		translations?: unknown;
	}
>(plan: T, bullets: string[], locale: string) {
	const t = translationFor(plan.translations, locale);
	return {
		name: t?.name?.trim() || plan.name,
		subtitle: t?.subtitle?.trim() || plan.subtitle || '',
		freqLabel: t?.freqLabel?.trim() || plan.freqLabel || '',
		bullets: t?.bullets?.length ? t.bullets : bullets
	};
}

function translationFor(raw: unknown, locale: string): PlanTranslation | undefined {
	let value = raw;
	// JSON columns come back parsed from mysql2, but tolerate a stored string too.
	if (typeof value === 'string') {
		try {
			value = JSON.parse(value);
		} catch {
			return undefined;
		}
	}
	if (!value || typeof value !== 'object') return undefined;
	const entry = (value as Record<string, unknown>)[locale];
	return entry && typeof entry === 'object' ? (entry as PlanTranslation) : undefined;
}
