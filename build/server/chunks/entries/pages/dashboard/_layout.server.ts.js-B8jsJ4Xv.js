import { f as fullDate } from '../../../chunks/format.js-DDyQH27n.js';
import { r as readMainStock, i as isLow, a as remainingOf } from '../../../chunks/stock.js-CqhGxQcM.js';
import { n as nextDeliveryDate } from '../../../chunks/deliverySchedule.js-BT3zrLFF.js';
import { v as error, B as redirect } from '../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/+layout.server.ts
var load = async ({ locals }) => {
	if (locals.user) {
		if (locals.role !== "Admin") return error(403, "Not Allowed");
	} else return redirect(302, "/login");
	const name = locals?.user?.name;
	const upcoming = await nextDeliveryDate();
	const mainStock = await readMainStock(upcoming);
	return {
		name,
		stock: mainStock ? {
			remaining: remainingOf(mainStock),
			capacity: mainStock.capacity,
			low: isLow(mainStock),
			dateLabel: fullDate(upcoming)
		} : null
	};
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

export { _layout_server_ts as _ };
//# sourceMappingURL=_layout.server.ts.js-B8jsJ4Xv.js.map
