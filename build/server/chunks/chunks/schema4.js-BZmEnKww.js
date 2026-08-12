import { o as object, s as string } from './access.js-Cygy5klO.js';

//#region src/routes/dashboard/admin-panel/roles/add-roles/schema.ts
var createRoleSchema = object({
	name: string().min(1, "Role name is required").max(100, "Role name must be under 100 characters"),
	description: string().min(1, "Role description is required").max(500, "Role description must be under 500 characters")
});

export { createRoleSchema as c };
//# sourceMappingURL=schema4.js-BZmEnKww.js.map
