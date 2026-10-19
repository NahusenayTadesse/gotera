import { z } from 'zod/v4';

export const BATCH_STATUSES = ['active', 'quarantined', 'recalled', 'depleted'] as const;

const optionalText = (max: number) =>
	z.preprocess((v) => (v === null ? '' : v), z.string().trim().max(max).optional().default(''));

/** Create/edit a batch. `id` present = edit. `productKey` is 'injera' or an add-on id. */
export const batchSchema = z
	.object({
		id: z.string().optional(),
		productKey: z.string().min(1, { error: 'Choose a product.' }),
		code: optionalText(40),
		source: z.enum(['in_house', 'external']).default('in_house'),
		sourcePartnerId: optionalText(36),
		sourceDeliveryId: optionalText(36),
		supplierLotRef: optionalText(100),
		inputIds: z.array(z.string()).default([]),
		producedOn: z.iso.date({ error: 'Pick the production / receiving date.' }),
		bestBefore: z.preprocess((v) => (v === '' || v === null ? undefined : v), z.iso.date().optional()),
		quantity: z.coerce.number({ error: 'Quantity is required.' }).int().min(1).max(1_000_000),
		unit: z.string().trim().min(1).max(20).default('packs'),
		notes: optionalText(2000)
	})
	.refine((d) => d.source === 'in_house' || !!d.sourcePartnerId, {
		message: 'Pick the supplier or partner it came from.',
		path: ['sourcePartnerId']
	})
	.refine((d) => !d.bestBefore || d.bestBefore >= d.producedOn, {
		message: 'Best-before must be on or after the production date.',
		path: ['bestBefore']
	});

export type BatchSchema = typeof batchSchema;
