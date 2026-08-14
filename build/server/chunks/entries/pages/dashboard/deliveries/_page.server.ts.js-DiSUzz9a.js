import { m as db, p as subscribers, v as deliveries, j as eq, i as inArray, z as addresses, q as plans, t as subscriptions, a as asc } from '../../../../chunks/db.js-CVV5grlL.js';
import { g as sendDeliveryDelayed } from '../../../../chunks/email.js-GBZKpDVs.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/client.js-gbEA-723.js';
import { s as superValidate, m as message } from '../../../../chunks/client2.js-BQ9y1BAm.js';
import { z as zod } from '../../../../chunks/adapters.js-fGoXMZOl.js';
import { c as contentCrud } from '../../../../chunks/crud.js-9SuyrwrY.js';
import { d as delayEmailSchema, a as deliverySchema } from '../../../../chunks/schema8.js-DHgWwHPj.js';

//#region src/routes/dashboard/deliveries/+page.server.ts
var crud = contentCrud({
	table: deliveries,
	label: "Delivery",
	addSchema: deliverySchema,
	editSchema: deliverySchema
});
/** Matches the webhook's delivery-date formatting, so wording stays consistent across emails. */
var deliveryFmt = new Intl.DateTimeFormat("en-GB", {
	weekday: "long",
	day: "numeric",
	month: "long"
});
var load = async () => {
	const [form, delayEmailForm, rows] = await Promise.all([
		superValidate(zod(deliverySchema)),
		superValidate(zod(delayEmailSchema)),
		db.select({
			id: deliveries.id,
			scheduledDate: deliveries.scheduledDate,
			status: deliveries.status,
			subscriberEmail: subscribers.email,
			subscriberName: subscribers.fullName,
			planName: plans.name,
			addressLine1: addresses.line1,
			addressCity: addresses.city,
			addressPostcode: addresses.postcode,
			isActive: deliveries.isActive
		}).from(deliveries).leftJoin(subscribers, eq(subscribers.id, deliveries.subscriberId)).leftJoin(subscriptions, eq(subscriptions.id, deliveries.subscriptionId)).leftJoin(plans, eq(plans.id, subscriptions.planId)).leftJoin(addresses, eq(addresses.id, deliveries.addressId)).orderBy(asc(deliveries.scheduledDate))
	]);
	return {
		form,
		delayEmailForm,
		rows
	};
};
var actions = {
	edit: crud.actions.edit,
	delete: crud.actions.delete,
	sendDelayEmail: async ({ request }) => {
		const form = await superValidate(request, zod(delayEmailSchema));
		if (!form.valid) return message(form, {
			type: "error",
			text: "Please check the form for errors"
		}, { status: 400 });
		const recipients = (await db.select({
			id: deliveries.id,
			scheduledDate: deliveries.scheduledDate,
			subscriberEmail: subscribers.email,
			subscriberName: subscribers.fullName
		}).from(deliveries).leftJoin(subscribers, eq(subscribers.id, deliveries.subscriberId)).where(inArray(deliveries.id, form.data.deliveryIds))).filter((r) => r.subscriberEmail);
		try {
			await Promise.all(recipients.map((r) => sendDeliveryDelayed(r.subscriberEmail, {
				name: r.subscriberName || "there",
				deliveryLabel: deliveryFmt.format(new Date(r.scheduledDate)),
				message: form.data.message
			})));
		} catch (err) {
			console.error("Failed to send delay emails:", err);
			return message(form, {
				type: "error",
				text: "Some emails could not be sent. Please try again."
			}, { status: 500 });
		}
		return message(form, {
			type: "success",
			text: `Delay email sent to ${recipients.length} customer${recipients.length === 1 ? "" : "s"}`
		});
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

export { _page_server_ts as _ };
//# sourceMappingURL=_page.server.ts.js-DiSUzz9a.js.map
