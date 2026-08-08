import { o as object, c as boolean, a1 as number, s as string, _ as _enum } from './access.js-HgBsL8za.js';

//#region src/routes/dashboard/orders/guest/schema.ts
/** Admin editor form for a guest (no-account) order. Orders are created at checkout — admins only edit them. */
var guestOrderSchema = object({
	id: string().min(1),
	status: _enum([
		"pending",
		"paid",
		"fulfilled"
	]),
	buyerEmail: string().max(255).optional(),
	quantity: number().int().min(1).default(1),
	isActive: boolean().default(true)
});

export { guestOrderSchema as g };
//# sourceMappingURL=schema9.js-B8G_ex6n.js.map
