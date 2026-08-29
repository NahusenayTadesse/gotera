import { z } from 'zod/v4';

/**
 * Shared by every "email selected rows" dialog across the dashboard (subscriptions, orders,
 * gifts, guest orders, deliveries) and the standalone Bulk Email page. Recipients travel as
 * email/name pairs rather than ids, since each page's rows come from a different table
 * (subscribers, guest_orders, gift_orders, or a merge of several) — the server would otherwise
 * need to know which table every id belongs to. Every page already renders these emails from
 * server-loaded data, and only Admins reach these routes, so trusting the pairs back is fine.
 */
export const bulkEmailSchema = z.object({
	recipients: z
		.array(
			z.object({
				email: z.email(),
				name: z.string().optional()
			})
		)
		.min(1, { error: 'Select at least one recipient.' }),
	subject: z.string().min(1, { error: 'Subject is required.' }).max(255),
	message: z.string().min(1, { error: 'Write a message.' }).max(50000)
});

export type BulkEmailSchema = typeof bulkEmailSchema;
export type BulkEmailFormMessage = { type: 'success' | 'error' | 'warning'; text: string };
