import { o as object, c as boolean, s as string, y as email } from './access.js-HgBsL8za.js';

//#region src/routes/dashboard/customers/schema.ts
/** Admin editor form for a subscriber (customer). `id` present = edit; absent = create. */
var subscriberSchema = object({
	id: string().optional(),
	email: email({ error: "A valid email is required." }),
	fullName: string().max(255).optional(),
	phone: string().max(40).optional(),
	marketingOptIn: boolean().default(true),
	isActive: boolean().default(true)
});

export { subscriberSchema as s };
//# sourceMappingURL=schema7.js-Bk5x3RLZ.js.map
