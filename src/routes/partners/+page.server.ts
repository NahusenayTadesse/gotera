import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db';
import { partnerApplications } from '$lib/server/db/schema';
import { notifyAdminPartnerApplication } from '$lib/server/email';
import { partnerSchema, type PartnerMessage } from './schema';
import { m } from '$lib/paraglide/messages.js';

export const load: PageServerLoad = async ({ url }) => {
	const form = await superValidate(zod4(partnerSchema));
	// /partners?type=supplier preselects the supplier tab.
	if (url.searchParams.get('type') === 'supplier') form.data.type = 'supplier';
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(partnerSchema));
		if (!form.valid) return fail(400, { form });

		const { company_url, consent: _consent, ...data } = form.data;

		// Bots fill the hidden field — pretend it worked and drop it.
		if (company_url) {
			return message(form, { type: 'success', text: m.partners_success_body() } satisfies PartnerMessage);
		}

		const row = {
			id: crypto.randomUUID(),
			...data,
			email: data.email.toLowerCase(),
			phone: data.phone || null,
			website: data.website || null,
			city: data.city || null,
			postcode: data.postcode ? data.postcode.toUpperCase() : null
		};

		try {
			await db.insert(partnerApplications).values(row);
		} catch (e) {
			console.error('partner application insert failed', e);
			return message(
				form,
				{ type: 'error', text: m.partners_error_generic() } satisfies PartnerMessage,
				{ status: 500 }
			);
		}

		// The application is saved; a failed notification shouldn't fail the request.
		notifyAdminPartnerApplication(row).catch((e) =>
			console.error('partner application email failed', e)
		);

		return message(form, { type: 'success', text: m.partners_success_body() } satisfies PartnerMessage);
	}
};
