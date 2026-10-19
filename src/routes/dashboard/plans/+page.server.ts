import type { PageServerLoad, Actions, RequestEvent } from './$types';
import { error } from '@sveltejs/kit';
import { superValidate, message, setError } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { and, asc, eq, isNull, ne } from 'drizzle-orm';
import type Stripe from 'stripe';
import { db } from '$lib/server/db';
import { planPrices, plans, type PlanTranslations } from '$lib/server/db/schema';
import { stripe } from '$lib/server/stripe';
import { idSchema } from '$lib/server/crud';
import { syncPlanPrices } from '$lib/server/plans';
import { parseJsonColumn } from '$lib/components/dashboard/format';
import { planSchema, type PlanFormMessage } from './schema';
import { z } from 'zod/v4';

type PlanForm = z.infer<typeof planSchema>;
type PlanRow = typeof plans.$inferSelect;

/** One bullet per non-blank line. */
const lines = (raw: string | undefined) =>
	(raw ?? '')
		.split('\n')
		.map((l) => l.trim())
		.filter(Boolean);

/** `datetime-local` value <-> Date. Blank / invalid = no limit. */
const toDate = (raw: string | undefined) => {
	if (!raw) return null;
	const d = new Date(raw);
	return Number.isNaN(d.getTime()) ? null : d;
};
const pad = (n: number) => String(n).padStart(2, '0');
const toLocalInput = (d: Date | null) =>
	d
		? `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
		: '';

const parseTranslations = (raw: unknown): PlanTranslations =>
	parseJsonColumn<PlanTranslations>(raw as PlanTranslations, {}) ?? {};

/** Form -> the columns it writes. Other locales already stored are kept. */
function toRow(data: PlanForm, existing?: PlanRow) {
	const translations = parseTranslations(existing?.translations);
	const am = {
		name: data.nameAm?.trim() || undefined,
		subtitle: data.subtitleAm?.trim() || undefined,
		freqLabel: data.freqLabelAm?.trim() || undefined,
		bullets: lines(data.bulletsAm).length ? lines(data.bulletsAm) : undefined
	};
	if (Object.values(am).some((v) => v !== undefined)) translations.am = am;
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

type PriceCheck = { field: 'stripePriceId' | 'pricePence'; error: string } | { warning: string } | null;

/**
 * Checks the Stripe Price ID against what the plan claims, before it's saved.
 *
 * The site shows `pricePence` but Stripe charges whatever the Price says, and a
 * subscription checkout needs a recurring Price (a one-off needs a one-time one). Any
 * mismatch here means customers are charged something other than what they were shown,
 * or checkout fails outright — so it blocks the save. If Stripe itself can't be reached
 * the plan still saves, with a warning, so an outage doesn't lock the dashboard.
 */
async function checkStripePrice(data: PlanForm, planId: string | undefined): Promise<PriceCheck> {
	const priceId = data.stripePriceId?.trim();
	if (!priceId) {
		return data.active
			? { warning: 'Saved, but without a Stripe price ID customers cannot check out on this plan.' }
			: null;
	}

	// A Price belongs to one plan: the webhook maps Prices back to plans, and sharing one
	// would make every subscriber on it look like they're on whichever plan matched first.
	const [usedByPlan] = await db
		.select({ name: plans.name })
		.from(plans)
		.where(and(eq(plans.stripePriceId, priceId), planId ? ne(plans.id, planId) : undefined));
	const [usedByHistory] = await db
		.select({ name: plans.name })
		.from(planPrices)
		.innerJoin(plans, eq(plans.id, planPrices.planId))
		.where(
			and(eq(planPrices.stripePriceId, priceId), planId ? ne(planPrices.planId, planId) : undefined)
		);
	const owner = usedByPlan ?? usedByHistory;
	if (owner) {
		return { field: 'stripePriceId', error: `This Stripe price already belongs to the "${owner.name}" plan.` };
	}

	let price: Stripe.Price;
	try {
		price = await stripe.prices.retrieve(priceId);
	} catch (e) {
		if ((e as { code?: string })?.code === 'resource_missing') {
			return { field: 'stripePriceId', error: 'Stripe has no price with this ID (check test vs live mode).' };
		}
		console.error('plan save: could not verify Stripe price', e);
		return { warning: 'Saved, but Stripe could not be reached to check the price ID — double-check it.' };
	}

	if (!price.active) {
		return { field: 'stripePriceId', error: 'This price is archived in Stripe; create a new one.' };
	}
	if (price.currency !== 'gbp') {
		return { field: 'stripePriceId', error: `This price is in ${price.currency.toUpperCase()}, not GBP.` };
	}
	if (price.unit_amount !== data.pricePence) {
		const stripeAmount = price.unit_amount == null ? 'not a fixed amount' : `${price.unit_amount}p`;
		return {
			field: 'pricePence',
			error: `Stripe charges ${stripeAmount} for this price, but you entered ${data.pricePence}p. To change a price, create a new Price in Stripe and paste its ID here.`
		};
	}
	if (data.kind === 'subscription') {
		const expected = data.interval === 'bi_monthly' ? 2 : 1;
		const r = price.recurring;
		if (!r || r.interval !== 'month' || r.interval_count !== expected) {
			return {
				field: 'stripePriceId',
				error: `A ${data.interval === 'bi_monthly' ? 'bi-monthly' : 'monthly'} subscription needs a Stripe price that recurs every ${expected} month${expected > 1 ? 's' : ''}.`
			};
		}
	} else if (price.recurring) {
		return { field: 'stripePriceId', error: 'One-off orders and gifts need a one-time Stripe price, not a recurring one.' };
	}
	return null;
}

/** Only re-verify against Stripe when something Stripe cares about changed. */
const priceFieldsChanged = (data: PlanForm, existing: PlanRow) =>
	(data.stripePriceId?.trim() || null) !== (existing.stripePriceId ?? null) ||
	data.pricePence !== existing.pricePence ||
	data.kind !== existing.kind ||
	data.interval !== existing.interval;

// hooks.server.ts already keeps non-admins out of /dashboard; these actions mutate the
// catalogue customers buy from, so they check again rather than rely on the route guard.
const requireAdmin = (locals: App.Locals) => {
	if (!locals.user || locals.role !== 'Admin') error(403, 'Not Allowed');
};

async function save({ request, locals }: RequestEvent, mode: 'add' | 'edit') {
	requireAdmin(locals);
	const form = await superValidate(request, zod4(planSchema));
	if (!form.valid) {
		return message(form, { type: 'error', text: 'Please check the form for errors' } satisfies PlanFormMessage, {
			status: 400
		});
	}

	let existing: PlanRow | undefined;
	if (mode === 'edit') {
		if (!form.data.id) return message(form, { type: 'error', text: 'Missing plan id' } satisfies PlanFormMessage, { status: 400 });
		[existing] = await db.select().from(plans).where(eq(plans.id, form.data.id));
		if (!existing) return message(form, { type: 'error', text: 'Plan not found' } satisfies PlanFormMessage, { status: 404 });
	}

	const [slugTaken] = await db
		.select({ id: plans.id })
		.from(plans)
		.where(and(eq(plans.slug, form.data.slug), existing ? ne(plans.id, existing.id) : undefined));
	if (slugTaken) return setError(form, 'slug', 'Another plan already uses this slug.');

	const check = !existing || priceFieldsChanged(form.data, existing) ? await checkStripePrice(form.data, existing?.id) : null;
	if (check && 'error' in check) return setError(form, check.field, check.error);

	try {
		const values = toRow(form.data, existing);
		if (existing) {
			await db.update(plans).set({ ...values, updatedBy: locals.user?.id }).where(eq(plans.id, existing.id));
		} else {
			await db.insert(plans).values({ ...values, createdBy: locals.user?.id });
		}
		// Record the (possibly new) Stripe Price in the plan's price history.
		await syncPlanPrices();
	} catch (err) {
		console.error(`Failed to ${mode} plan:`, err);
		return message(form, { type: 'error', text: `Could not ${mode === 'add' ? 'add' : 'update'} plan` } satisfies PlanFormMessage, {
			status: 500
		});
	}

	if (check && 'warning' in check) {
		return message(form, { type: 'warning', text: check.warning } satisfies PlanFormMessage);
	}
	return message(form, { type: 'success', text: mode === 'add' ? 'Plan added' : 'Plan updated' } satisfies PlanFormMessage);
}

export const load: PageServerLoad = async () => {
	const [form, rawRows] = await Promise.all([
		superValidate(zod4(planSchema)),
		db.select().from(plans).where(isNull(plans.deletedAt)).orderBy(asc(plans.sortOrder))
	]);

	const rows = rawRows.map((p) => {
		const am = parseTranslations(p.translations).am;
		return {
			...p,
			bullets: parseJsonColumn<string[]>(p.bullets as string[], []),
			availableFromInput: toLocalInput(p.availableFrom),
			availableUntilInput: toLocalInput(p.availableUntil),
			nameAm: am?.name ?? '',
			subtitleAm: am?.subtitle ?? '',
			freqLabelAm: am?.freqLabel ?? '',
			bulletsAm: (am?.bullets ?? []).join('\n')
		};
	});

	return { form, rows };
};

export const actions: Actions = {
	add: (event) => save(event, 'add'),
	edit: (event) => save(event, 'edit'),

	/**
	 * Archives rather than deletes. Subscriptions, deliveries and orders point at their
	 * plan, and Stripe keeps billing existing subscribers on it, so the row has to stay.
	 * Archived plans drop out of the shop and this list; their Prices still resolve.
	 */
	delete: async ({ request, locals }) => {
		requireAdmin(locals);
		const form = await superValidate(request, zod4(idSchema));
		if (!form.valid) return message(form, { type: 'error', text: 'Invalid request' }, { status: 400 });
		try {
			await db
				.update(plans)
				.set({ active: false, featured: false, deletedAt: new Date(), updatedBy: locals.user?.id })
				.where(eq(plans.id, form.data.id));
			return message(form, { type: 'success', text: 'Plan archived' });
		} catch (err) {
			console.error('Failed to archive plan:', err);
			return message(form, { type: 'error', text: 'Could not archive plan' }, { status: 500 });
		}
	}
};
