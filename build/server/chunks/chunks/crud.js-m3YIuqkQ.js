import { m as db, k as and, j as eq, a as asc } from './db.js-1ke6Xzkd.js';
import { s as saveUploadedFile } from './upload.js-ioWcWUDr.js';
import './exports.js-BT-QlP_6.js';
import './client.js--DCHVHjx.js';
import { s as superValidate, m as message } from './client2.js-74WMIpvZ.js';
import { z as zod } from './adapters.js-B-iKxR35.js';
import { v as error } from './utils.js-BQt5v-8G.js';
import { o as object, s as string, a1 as number } from './access.js-j1_SnSd1.js';

//#region src/lib/server/crud.ts
/** Every content table is keyed by a `varchar(36)` UUID (see `$defaultFn` in schema.ts). */
var idSchema = object({ id: string().min(1) });
number().int().min(0).default(0);
/**
* Builds the `load` and `actions` for a content table's dashboard page.
*
* Every content page needs the same three forms and the same add/edit/delete
* round trip, so the only thing a route has to supply is its schemas and the
* handful of fields that need special treatment (files, JSON lists).
*/
function contentCrud({ table, label, addSchema, editSchema, fileFields = [], listFields = [], scope }) {
	const cols = table;
	/** Newest content sorts by the admin-chosen order; the rest falls back to id. */
	const orderColumn = cols.sortOrder ?? cols.id;
	/** `undefined` when unscoped, so `and(...)` and `.where()` both no-op cleanly. */
	const ownerCondition = async (locals) => scope ? eq(cols[scope.field], await scope.resolve(locals)) : void 0;
	/** Turns validated form data into a row, minus anything that must not change. */
	const toRow = async (data) => {
		const { id, ...values } = data;
		for (const field of fileFields) {
			const file = values[field];
			if (file instanceof File && file.size > 0) values[field] = await saveUploadedFile(file);
			else delete values[field];
		}
		for (const field of listFields) {
			const raw = values[field];
			values[field] = typeof raw === "string" ? raw.split("\n").map((line) => line.trim()).filter(Boolean) : raw ?? [];
		}
		return values;
	};
	const load = async (event) => {
		const [addForm, editForm, deleteForm, condition] = await Promise.all([
			superValidate(zod(addSchema)),
			superValidate(zod(editSchema)),
			superValidate(zod(idSchema)),
			ownerCondition(event.locals)
		]);
		return {
			addForm,
			editForm,
			deleteForm,
			rows: await db.select().from(table).where(condition).orderBy(asc(orderColumn))
		};
	};
	const requireAdmin = (locals) => {
		if (!locals.user || locals.role !== "Admin") error(403, "Not Allowed");
	};
	return {
		load,
		actions: {
			add: async ({ request, locals }) => {
				requireAdmin(locals);
				const form = await superValidate(request, zod(addSchema));
				if (!form.valid) return message(form, {
					type: "error",
					text: "Please check the form for errors"
				}, { status: 400 });
				try {
					const values = await toRow(form.data);
					if (scope) values[scope.field] = await scope.resolve(locals);
					await db.insert(table).values({
						...values,
						createdBy: locals.user?.id
					});
					return message(form, {
						type: "success",
						text: `${label} added`
					});
				} catch (err) {
					console.error(`Failed to add ${label}:`, err);
					return message(form, {
						type: "error",
						text: `Could not add ${label}`
					}, { status: 500 });
				}
			},
			edit: async ({ request, locals }) => {
				requireAdmin(locals);
				const form = await superValidate(request, zod(editSchema));
				if (!form.valid) return message(form, {
					type: "error",
					text: "Please check the form for errors"
				}, { status: 400 });
				try {
					const data = form.data;
					const values = await toRow(data);
					delete values[scope?.field ?? ""];
					const [result] = await db.update(table).set({
						...values,
						updatedBy: locals.user?.id
					}).where(and(eq(cols.id, data.id), await ownerCondition(locals)));
					if (scope && result.affectedRows === 0) return message(form, {
						type: "error",
						text: `${label} not found`
					}, { status: 404 });
					return message(form, {
						type: "success",
						text: `${label} updated`
					});
				} catch (err) {
					console.error(`Failed to update ${label}:`, err);
					return message(form, {
						type: "error",
						text: `Could not update ${label}`
					}, { status: 500 });
				}
			},
			delete: async ({ request, locals }) => {
				requireAdmin(locals);
				const form = await superValidate(request, zod(idSchema));
				if (!form.valid) return message(form, {
					type: "error",
					text: "Invalid request"
				}, { status: 400 });
				try {
					await db.delete(table).where(and(eq(cols.id, form.data.id), await ownerCondition(locals)));
					return message(form, {
						type: "success",
						text: `${label} deleted`
					});
				} catch (err) {
					console.error(`Failed to delete ${label}:`, err);
					return message(form, {
						type: "error",
						text: `Could not delete ${label}`
					}, { status: 500 });
				}
			}
		}
	};
}

export { contentCrud as c, idSchema as i };
//# sourceMappingURL=crud.js-m3YIuqkQ.js.map
