import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, message, setError } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { and, asc, eq } from 'drizzle-orm';

// Adjust to your project's paths.
import { db } from '$lib/server/db';
import { subscribers, plans } from '$lib/server/db/schema';

import { changePlanSchema, type ChangePlanMessage } from './schema';

const gbpWhole = (pence: number) => {
	const p = pence / 100;
	return Number.isInteger(p) ? `£${p}` : `£${p.toFixed(2)}`;
};

const fmtDate = (d: Date) =>
	new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);

// First of next month — stand-in until Stripe's current_period_end is wired.
function nextCycle(from = new Date()) {
	const d = new Date(from);
	d.setMonth(d.getMonth() + 1, 1);
	d.setHours(0, 0, 0, 0);
	return d;
}

async function getSubscriber(userId: string) {
	const [s] = await db.select().from(subscribers).where(eq(subscribers.userId, userId));
	return s ?? null;
}

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/login');

	const sub = await getSubscriber(locals.user.id);
	// Only makes sense for an active subscriber with a real plan.
	if (!sub || !sub.plan || sub.status === 'cancelled') {
		return { subscription: false, currentPlanId: null, plans: [], effectiveDate: '', pending: null };
	}

	const rows = await db
		.select()
		.from(plans)
		.where(and(eq(plans.kind, 'subscription'), eq(plans.active, true)))
		.orderBy(asc(plans.sortOrder));

	const planCards = rows.map((p) => ({
		id: p.slug,
		name: p.name,
		desc: p.subtitle ?? '',
		price: gbpWhole(p.pricePence),
		pricePence: p.pricePence,
		packs: p.packs,
		freq: `Per month · ${p.packs} packs`,
		details: [`${p.packs} packs monthly`, ...((p.bullets as string[]) ?? [])],
		label: `${p.name} · ${gbpWhole(p.pricePence)}/month`
	}));

	const effective = nextCycle();

	return {
		subscription: true,
		currentPlanId: sub.plan,
		plans: planCards,
		effectiveDate: fmtDate(effective),
		pending: sub.pendingPlan
			? { plan: sub.pendingPlan, at: sub.pendingPlanAt ? fmtDate(new Date(sub.pendingPlanAt)) : '' }
			: null,
		form: await superValidate({ plan: sub.plan }, zod4(changePlanSchema))
	};
};

export const actions: Actions = {
	changePlan: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(changePlanSchema));
		if (!form.valid) return fail(400, { form });

		const sub = await getSubscriber(locals.user!.id);
		if (!sub || !sub.plan) {
			return message(form, { type: 'error', text: 'No active plan to change.' } satisfies ChangePlanMessage, {
				status: 400
			});
		}

		// Target must be a real, active subscription plan.
		const [target] = await db
			.select()
			.from(plans)
			.where(and(eq(plans.slug, form.data.plan), eq(plans.kind, 'subscription'), eq(plans.active, true)));
		if (!target) return setError(form, 'plan', "That plan isn't available.");
		if (form.data.plan === sub.plan) return setError(form, 'plan', "That's already your plan.");

		const effective = nextCycle();

		// ── Stripe hook point: schedule the plan change at period end ──
		// Requires pendingPlan + pendingPlanAt columns on subscribers (see note).
		// For an immediate change instead: .set({ plan: form.data.plan })
		await db
			.update(subscribers)
			.set({ pendingPlan: form.data.plan, pendingPlanAt: effective })
			.where(eq(subscribers.id, sub.id));

		return message(form, {
			type: 'success',
			text: `Plan change scheduled for ${fmtDate(effective)}.`
		} satisfies ChangePlanMessage);
	}
};