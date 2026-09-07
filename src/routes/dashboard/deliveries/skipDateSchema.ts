import { z } from 'zod/v4';

/** Admin marks a Saturday as skipped (bank holiday, etc). Any deliveries already
 * booked for it get bumped to the next non-skipped Saturday automatically. */
export const skipDateSchema = z.object({
	date: z.string().min(1, { error: 'Pick a date.' }),
	reason: z.string().max(255).optional()
});

export type SkipDateSchema = typeof skipDateSchema;

/** Recipient shape handed to the "notify customers" dialog when a skip reschedules deliveries. */
export type AffectedRecipient = { email: string; name?: string };

export type SkipDateFormMessage =
	| {
			type: 'success';
			text: string;
			affected?: AffectedRecipient[];
			skippedDateLabel?: string;
			newDateLabel?: string;
	  }
	| { type: 'error'; text: string };
