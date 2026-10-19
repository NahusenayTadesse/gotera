import { m as db, y as subscriberAddons, j as eq, L as deliveryAddons, z as addons, a as asc } from '../../../../chunks/db.js-1ke6Xzkd.js';
import { t as tagsOf } from '../../../../chunks/addons.js-B66jfCaP.js';
import { s as saveUploadedFile } from '../../../../chunks/upload.js-ioWcWUDr.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js--DCHVHjx.js';
import { s as superValidate, m as message } from '../../../../chunks/client2.js-74WMIpvZ.js';
import { z as zod } from '../../../../chunks/adapters.js-B-iKxR35.js';
import { a as addonSchema } from '../../../../chunks/schema3.js-CXxuJ-8y.js';
import { i as idSchema, c as contentCrud } from '../../../../chunks/crud.js-m3YIuqkQ.js';
import { v as error } from '../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/addons/+page.server.ts
var crud = contentCrud({
	table: addons,
	label: "Add-on",
	addSchema: addonSchema,
	editSchema: addonSchema
});
/** Validated form -> row values. Optional text left blank is stored as NULL, not ''. */
async function toRow(data) {
	const text = (v) => v?.trim() ? v.trim() : null;
	const row = {
		name: data.name.trim(),
		description: text(data.description),
		category: data.category ?? null,
		availability: data.availability,
		pricePence: data.pricePence,
		unitLabel: text(data.unitLabel),
		badge: text(data.badge),
		tags: [...new Set(data.tags)],
		spiceLevel: data.spiceLevel,
		ingredients: text(data.ingredients),
		sortOrder: data.sortOrder,
		isFeatured: data.isFeatured,
		isActive: data.isActive
	};
	if (data.image && data.image.size > 0) row.imageUrl = await saveUploadedFile(data.image);
	else if (data.removeImage) row.imageUrl = null;
	return row;
}
var requireAdmin = (locals) => {
	if (!locals.user || locals.role !== "Admin") error(403, "Not Allowed");
};
async function save(event, mode) {
	requireAdmin(event.locals);
	const form = await superValidate(event.request, zod(addonSchema), { allowFiles: true });
	if (!form.valid) return message(form, {
		type: "error",
		text: "Please check the form for errors"
	}, { status: 400 });
	if (mode === "edit" && !form.data.id) return message(form, {
		type: "error",
		text: "Missing add-on id"
	}, { status: 400 });
	let values;
	try {
		values = await toRow(form.data);
	} catch (e) {
		return message(form, {
			type: "error",
			text: e instanceof Error ? e.message : "Could not save the image"
		}, { status: 400 });
	}
	try {
		if (mode === "add") await db.insert(addons).values({
			...values,
			createdBy: event.locals.user?.id
		});
		else await db.update(addons).set({
			...values,
			updatedBy: event.locals.user?.id
		}).where(eq(addons.id, form.data.id));
	} catch (e) {
		console.error(`Failed to ${mode} add-on:`, e);
		return message(form, {
			type: "error",
			text: `Could not ${mode === "add" ? "add" : "update"} add-on`
		}, { status: 500 });
	}
	return message(form, {
		type: "success",
		text: mode === "add" ? "Add-on added" : "Add-on updated"
	});
}
var load = async () => {
	const [form, rows] = await Promise.all([superValidate(zod(addonSchema)), db.select().from(addons).orderBy(asc(addons.sortOrder))]);
	return {
		form,
		rows: rows.map((r) => ({
			...r,
			tags: tagsOf(r.tags)
		}))
	};
};
var actions = {
	add: (event) => save(event, "add"),
	edit: (event) => save(event, "edit"),
	delete: async (event) => {
		const form = await superValidate(event.request.clone(), zod(idSchema));
		if (!form.valid) return message(form, {
			type: "error",
			text: "Invalid request"
		}, { status: 400 });
		const { id } = form.data;
		const [[onSubscription], [onDelivery]] = await Promise.all([db.select({ id: subscriberAddons.id }).from(subscriberAddons).where(eq(subscriberAddons.addonId, id)).limit(1), db.select({ id: deliveryAddons.id }).from(deliveryAddons).where(eq(deliveryAddons.addonId, id)).limit(1)]);
		if (onSubscription || onDelivery) return message(form, {
			type: "error",
			text: `This add-on is on an existing ${onSubscription ? "subscription" : "delivery"} and can't be deleted. Set it to inactive instead — it will stop being offered to new customers.`
		}, { status: 409 });
		return crud.actions.delete(event);
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-Ci6no23J.js.map
