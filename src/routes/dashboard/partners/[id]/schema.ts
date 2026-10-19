import { z } from 'zod/v4';

export const PARTNER_STATUSES = ['new', 'contacted', 'approved', 'declined'] as const;
export const DELIVERY_STATUSES = ['delivered', 'scheduled', 'cancelled'] as const;

const blankToUndefined = (v: unknown) => (v === '' || v === null ? undefined : v);

/** One hand-over with an approved partner/supplier. `id` present = edit; absent = create. */
export const deliverySchema = z.object({
	id: z.string().optional(),
	deliveredOn: z.iso.date({ error: 'Pick a date.' }),
	location: z.string().trim().min(1, { error: 'Where did it happen?' }).max(255),
	items: z.string().trim().min(1, { error: 'What was delivered?' }).max(500),
	quantity: z.coerce.number({ error: 'Quantity is required.' }).positive().max(99_999_999),
	unit: z.string().trim().min(1, { error: 'Unit is required.' }).max(20).default('kg'),
	/** Entered in pounds, stored as pence. */
	value: z.preprocess(blankToUndefined, z.coerce.number().min(0).max(10_000_000).optional()),
	reference: z.string().trim().max(100).optional(),
	status: z.enum(DELIVERY_STATUSES).default('delivered'),
	notes: z.string().trim().max(2000).optional()
});

export type DeliverySchema = typeof deliverySchema;
