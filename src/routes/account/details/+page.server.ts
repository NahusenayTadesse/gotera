import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, message, setError } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { and, eq } from 'drizzle-orm';
import { APIError } from 'better-auth/api';

// Adjust to your project's paths.
import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { subscribers, addresses } from '$lib/server/db/schema';

import { emailSchema, phoneSchema, addressSchema, type DetailsMessage } from './schema';

async function getSubscriber(userId: string) {
	const [s] = await db.select().from(subscribers).where(eq(subscribers.userId, userId));
	return s ?? null;
}

async function getPrimaryAddress(subscriberId: string) {
	const rows = await db.select().from(addresses).where(eq(addresses.subscriberId, subscriberId));
	return rows.find((a) => a.isPrimary) ?? rows[0] ?? null;
}

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(303, '/login');

	const sub = await getSubscriber(locals.user.id);
	const addr = sub ? await getPrimaryAddress(sub.id) : null;

	return {
		email: locals.user.email,
		phone: sub?.phone ?? null,
		address: addr,
		emailForm: await superValidate({ email: locals.user.email }, zod4(emailSchema), { id: 'email' }),
		phoneForm: await superValidate({ phone: sub?.phone ?? '' }, zod4(phoneSchema), { id: 'phone' }),
		addressForm: await superValidate(
			{
				line1: addr?.line1 ?? '',
				line2: addr?.line2 ?? '',
				city: addr?.city ?? 'London',
				postcode: addr?.postcode ?? ''
			},
			zod4(addressSchema),
			{ id: 'address' }
		)
	};
};

export const actions: Actions = {
	// Phone → subscribers.phone
	updatePhone: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(phoneSchema), { id: 'phone' });
		if (!form.valid) return fail(400, { form });

		const sub = await getSubscriber(locals.user!.id);
		if (!sub) {
			return message(form, { type: 'error', text: 'No subscriber profile found.' } satisfies DetailsMessage, {
				status: 400
			});
		}

		await db.update(subscribers).set({ phone: form.data.phone }).where(eq(subscribers.id, sub.id));
		return message(form, { type: 'success', text: 'Phone number updated.' } satisfies DetailsMessage);
	},

	// Address → primary addresses row (update, or create if none)
	updateAddress: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(addressSchema), { id: 'address' });
		if (!form.valid) return fail(400, { form });

		const sub = await getSubscriber(locals.user!.id);
		if (!sub) {
			return message(form, { type: 'error', text: 'No subscriber profile found.' } satisfies DetailsMessage, {
				status: 400
			});
		}

		const values = {
			line1: form.data.line1,
			line2: form.data.line2 || null,
			city: form.data.city || 'London',
			postcode: form.data.postcode
		};

		const existing = await getPrimaryAddress(sub.id);
		if (existing) {
			await db
				.update(addresses)
				.set(values)
				.where(and(eq(addresses.id, existing.id), eq(addresses.subscriberId, sub.id)));
		} else {
			await db.insert(addresses).values({
				id: crypto.randomUUID(),
				subscriberId: sub.id,
				isPrimary: true,
				...values
			});
		}

		return message(form, { type: 'success', text: 'Delivery address updated.' } satisfies DetailsMessage);
	},

	// Email → Better Auth changeEmail (verification required; not a direct write)
	updateEmail: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(emailSchema), { id: 'email' });
		if (!form.valid) return fail(400, { form });

		if (form.data.email === locals.user!.email) {
			return setError(form, 'email', "That's already your email.");
		}

		try {
			await auth.api.changeEmail({
				body: { newEmail: form.data.email, callbackURL: '/account/details' },
				headers: request.headers
			});
		} catch (e) {
			if (e instanceof APIError) {
				return setError(form, 'email', e.body?.message ?? 'Could not change your email.');
			}
			console.error('changeEmail failed', e);
			return message(form, { type: 'error', text: 'Could not change your email.' } satisfies DetailsMessage, {
				status: 500
			});
		}

		// NOTE: user.email updates only after the verification link is confirmed.
		// Keep subscribers.email in sync via a Better Auth user-update hook
		// (or treat user.email as the single source of truth).
		return message(form, {
			type: 'success',
			text: 'Verification sent — confirm from your new inbox to finish.'
		} satisfies DetailsMessage);
	}
};