import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import type { RequestEvent } from '@sveltejs/kit';
import { sendBulkEmail } from './email';
import { sanitizeRichTextHtml } from './sanitizeHtml';
import { bulkEmailSchema } from '$lib/schemas/bulkEmail';

/**
 * Reusable `?/sendBulkEmail` form action — spread this into any route's `actions` to get the
 * BulkEmailDialog/bulk-email page working there. One implementation for every page that emails
 * a set of selected rows, instead of re-deriving recipients per table on each route.
 */
export async function sendBulkEmailAction({ request }: RequestEvent) {
	const form = await superValidate(request, zod4(bulkEmailSchema));
	if (!form.valid) {
		return message(
			form,
			{ type: 'error', text: 'Please check the form for errors' },
			{ status: 400 }
		);
	}

	const bodyHtml = sanitizeRichTextHtml(form.data.message);

	// The same person can show up twice across selected rows (e.g. two orders, one email) —
	// de-dupe so nobody gets the same email sent to them twice.
	const seen = new Set<string>();
	const recipients = form.data.recipients.filter((r) => {
		if (seen.has(r.email)) return false;
		seen.add(r.email);
		return true;
	});

	const results = await Promise.allSettled(
		recipients.map((r) => sendBulkEmail(r.email, { subject: form.data.subject, bodyHtml }))
	);

	const failed = results.filter((r) => r.status === 'rejected').length;
	const sent = results.length - failed;

	if (sent === 0) {
		return message(
			form,
			{ type: 'error', text: 'No emails could be sent. Please try again.' },
			{ status: 500 }
		);
	}

	return message(form, {
		type: failed > 0 ? 'warning' : 'success',
		text:
			failed > 0
				? `Sent to ${sent} customer${sent === 1 ? '' : 's'}, ${failed} failed.`
				: `Sent to ${sent} customer${sent === 1 ? '' : 's'}.`
	});
}
