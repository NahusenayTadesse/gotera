import { o as object, c as boolean, a1 as number, s as string, _ as _enum } from './access.js-HgBsL8za.js';

//#region src/routes/dashboard/orders/one-time/schema.ts
/** Admin editor form for a one-time / gift order. Orders are created at checkout — admins only edit them. */
var orderSchema = object({
	id: string().min(1),
	status: _enum([
		"pending",
		"paid",
		"fulfilled"
	]),
	buyerName: string().max(255).optional(),
	recipientName: string().min(1, { error: "Recipient name is required." }).max(255),
	giftMessage: string().max(2e3).optional(),
	durationMonths: number().int().min(1).default(1),
	quantity: number().int().min(1).default(1),
	isActive: boolean().default(true)
});

export { orderSchema as o };
//# sourceMappingURL=schema10.js-BZDK157h.js.map
