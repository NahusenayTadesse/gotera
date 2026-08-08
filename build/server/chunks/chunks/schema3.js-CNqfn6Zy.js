import { o as object, x as array, s as string } from './access.js-HgBsL8za.js';

//#region src/routes/dashboard/admin-panel/roles/[id]/schema.ts
var editRoleSchema = object({
	name: string().min(1, "Role name is required").max(100, "Role name must be under 100 characters"),
	description: string().min(1, "Role description is required").max(500, "Role description must be under 500 characters"),
	permissions: array(string().min(1)).nonempty("At least one permission must be selected")
});

export { editRoleSchema as e };
//# sourceMappingURL=schema3.js-CNqfn6Zy.js.map
