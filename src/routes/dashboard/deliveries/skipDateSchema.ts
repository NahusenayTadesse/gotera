import { z } from 'zod/v4';

const day = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'Pick a date.' });

/** Admin skips one delivery day (Sat, Sun or Mon) — bank holiday, van off the road, etc.
 * Anything still booked for it moves to `moveTo`, or the next open delivery day if empty. */
export const skipDaySchema = z.object({
	date: day,
	reason: z.string().trim().max(255).optional(),
	moveTo: day.or(z.literal('')).optional()
});

/** Move everything still booked on `from` to `to`, without skipping `from`. */
export const moveDaySchema = z.object({ from: day, to: day });

export type { MoveResult } from '$lib/delivery';
