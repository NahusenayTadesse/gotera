import { describe, it, expect, afterAll } from 'vitest';
import { eq, like } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { planPrices, plans } from '$lib/server/db/schema';
import { localizePlan, planForStripePrice, syncPlanPrices } from '../plans';

/**
 * Price history against the local database. Every row here is under a `vitest-` slug or
 * `price_vitest_` id and removed afterwards; `syncPlanPrices` also visits the real plans,
 * but it's idempotent, so for them it's a no-op once their current Price is recorded.
 */
const tag = crypto.randomUUID().slice(0, 8);
const PRICE_A = `price_vitest_a_${tag}`;
const PRICE_B = `price_vitest_b_${tag}`;
const planId = crypto.randomUUID();

afterAll(async () => {
	await db.delete(planPrices).where(like(planPrices.stripePriceId, `price_vitest_%_${tag}`));
	await db.delete(plans).where(eq(plans.id, planId));
});

const historyFor = () => db.select().from(planPrices).where(eq(planPrices.planId, planId));

describe('syncPlanPrices', () => {
	it('records a price change without forgetting the old Price', async () => {
		await db.insert(plans).values({
			id: planId,
			slug: `vitest-prices-${tag}`,
			name: 'vitest prices',
			pricePence: 2000,
			interval: 'monthly',
			kind: 'subscription',
			active: false,
			stripePriceId: PRICE_A
		});
		await syncPlanPrices();
		let rows = await historyFor();
		expect(rows).toHaveLength(1);
		expect(rows[0]).toMatchObject({ stripePriceId: PRICE_A, pricePence: 2000, activeTo: null });

		// Running again changes nothing.
		await syncPlanPrices();
		expect(await historyFor()).toHaveLength(1);

		// New price: B becomes current, A is closed but kept.
		await db.update(plans).set({ stripePriceId: PRICE_B, pricePence: 2500 }).where(eq(plans.id, planId));
		await syncPlanPrices();
		rows = await historyFor();
		const a = rows.find((r) => r.stripePriceId === PRICE_A)!;
		const b = rows.find((r) => r.stripePriceId === PRICE_B)!;
		expect(a.activeTo).not.toBeNull();
		expect(b).toMatchObject({ pricePence: 2500, activeTo: null });

		// Subscribers still billed on A resolve to the same plan.
		expect((await planForStripePrice(PRICE_A))?.id).toBe(planId);
		expect((await planForStripePrice(PRICE_B))?.id).toBe(planId);
		expect(await planForStripePrice(`price_vitest_unknown_${tag}`)).toBeUndefined();

		// Switching back reopens A rather than duplicating it.
		await db.update(plans).set({ stripePriceId: PRICE_A, pricePence: 2000 }).where(eq(plans.id, planId));
		await syncPlanPrices();
		rows = await historyFor();
		expect(rows).toHaveLength(2);
		expect(rows.find((r) => r.stripePriceId === PRICE_A)!.activeTo).toBeNull();
		expect(rows.find((r) => r.stripePriceId === PRICE_B)!.activeTo).not.toBeNull();
	});
});

describe('localizePlan', () => {
	const plan = {
		name: 'Regular',
		subtitle: 'Our core plan.',
		freqLabel: 'Monthly · 4 packs',
		translations: { am: { name: 'መደበኛ', bullets: ['ምርጥ ዋጋ'] } }
	};

	it('uses the translation where there is one and English elsewhere', () => {
		expect(localizePlan(plan, ['Best value'], 'am')).toEqual({
			name: 'መደበኛ',
			subtitle: 'Our core plan.',
			freqLabel: 'Monthly · 4 packs',
			bullets: ['ምርጥ ዋጋ']
		});
	});

	it('falls back to English for a locale with no translation', () => {
		expect(localizePlan(plan, ['Best value'], 'en').name).toBe('Regular');
	});

	it('copes with translations stored as a JSON string or missing', () => {
		expect(localizePlan({ ...plan, translations: JSON.stringify(plan.translations) }, [], 'am').name).toBe('መደበኛ');
		expect(localizePlan({ ...plan, translations: null }, ['x'], 'am').bullets).toEqual(['x']);
	});

	it('treats blank translated fields and bullets as missing', () => {
		const blank = { ...plan, translations: { am: { name: '  ', subtitle: '', bullets: ['', '  '] } } };
		expect(localizePlan(blank, ['Best value'], 'am')).toEqual({
			name: 'Regular',
			subtitle: 'Our core plan.',
			freqLabel: 'Monthly · 4 packs',
			bullets: ['Best value']
		});
	});
});
