import type { PageServerLoad, Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { superValidate, message, setError } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { asc, eq } from 'drizzle-orm';

// Adjust to your project's paths.
import { db } from '$lib/server/db';
import { plans } from '$lib/server/db/schema';

import { planFormSchema, type PlanFormMessage } from './schema';

/** Adjust to your Better Auth admin check (roles / admin plugin / allowlist). */
function requireAdmin(locals: App.Locals) {
	if (!locals.user || locals.role !== "Admin") throw error(403, 'Admins only.');
	return locals.user;
}

export const load: PageServerLoad = async () => {
	const all = await db.select().from(plans).orderBy(asc(plans.sortOrder));
	const form = await superValidate(zod4(planFormSchema));
  const parsed = all.map((p) => ({
  ...p,
  bullets:
    typeof p.bullets === 'string'
      ? JSON.parse(p.bullets)
      : (p.bullets ?? [])
}));
	return { plans: parsed, form };
};

export const actions: Actions = {
	save: async ({ request, locals }) => {
		requireAdmin(locals);

		const form = await superValidate(request, zod4(planFormSchema));
		if (!form.valid) return fail(400, { form });

		const v = form.data;
		const values = {
			slug: v.slug,
			name: v.name,
			subtitle: v.subtitle || null,
			pricePence: v.pricePence,
			freqLabel: v.freqLabel || null,
			bullets: v.bullets,
			featured: v.featured,
			interval: v.interval,
			packs: v.packs,
			kind: v.kind,
			active: v.active,
			sortOrder: v.sortOrder
		};

		try {
			if (v.id) {
				await db.update(plans).set(values).where(eq(plans.id, v.id));
			} else {
				await db.insert(plans).values({ id: crypto.randomUUID(), ...values });
			}
		} catch (e) {
			// Most likely a duplicate slug (unique constraint).
			console.error('save plan failed', e);
			return setError(form, 'slug', 'That slug is already in use.');
		}

		return message(form, {
			type: 'success',
			text: v.id ? 'Plan updated.' : 'Plan created.'
		} satisfies PlanFormMessage);
	},

	// Hard delete. (Prefer toggling `active` off for plans that have historical
	// orders — deleting a referenced plan can strand old records.)
	delete: async ({ request, locals }) => {
		requireAdmin(locals);
		const data = await request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Missing id.' });

		try {
			await db.delete(plans).where(eq(plans.id, id));
		} catch (e) {
			console.error('delete plan failed', e);
			return fail(400, { message: 'Could not delete plan.' });
		}
		return { deleted: true };
	}
};