import { o as object, n as number, s as string, y as email } from './access.js-HgBsL8za.js';

//#region src/routes/dashboard/admin-panel/users/add-users/schema.ts
var add = object({
	name: string("Name is Required").min(2).max(100),
	email: email("Email is Required"),
	password: string("Password is required!"),
	role: number("Role is required!")
});

export { add as a };
//# sourceMappingURL=schema6.js-C9Wdqslf.js.map
