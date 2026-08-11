import { z } from 'zod/v4';
import { m } from '$lib/paraglide/messages.js';

// Schedules a switch to a different plan. The switch is applied at the end of the
// current billing period, so this never charges or refunds anything today.
export const changePlanSchema = z.object({
	subscriptionId: z.string().min(1, m.acctplan_subscription_required()),
	planId: z.string().min(1, m.acctplan_plan_required())
});

export type ChangePlanSchema = typeof changePlanSchema;
export type ChangePlanMessage = { type: 'success' | 'error'; text: string };
