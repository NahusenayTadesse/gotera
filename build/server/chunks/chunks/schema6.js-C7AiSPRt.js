import { o as object, a1 as number, s as string, y as email } from './access.js-j1_SnSd1.js';

//#region src/routes/dashboard/admin-panel/users/[id]/schema.ts
var editUserSchema = object({
	email: email("Email is required"),
	name: string("Name is required").min(2).max(100),
	role: number()
});

export { editUserSchema as e };
//# sourceMappingURL=schema6.js-C7AiSPRt.js.map
