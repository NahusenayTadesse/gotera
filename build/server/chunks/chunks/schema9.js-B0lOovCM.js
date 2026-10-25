import { o as object, c as boolean, s as string, y as email } from './access.js-j1_SnSd1.js';

//#region src/routes/dashboard/customers/schema.ts
/** Admin editor form for a subscriber (customer). `id` present = edit; absent = create. */
var subscriberSchema = object({
	id: string().optional(),
	email: email({ error: "A valid email is required." }),
	fullName: string().max(255).optional(),
	phone: string().trim().min(5, { error: "A phone number is required." }).max(40).regex(/^[0-9+()\s-]+$/, { error: "Use digits and + ( ) - only." }),
	marketingOptIn: boolean().default(true),
	isActive: boolean().default(true)
});

export { subscriberSchema as s };
//# sourceMappingURL=schema9.js-B0lOovCM.js.map
