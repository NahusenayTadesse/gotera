import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { nextDeliveryDate } from '$lib/server/deliverySchedule';
import { readMainStock, remainingOf, isLow } from '$lib/server/stock';
import { fullDate } from '$lib/format';


export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.user) {
		const roleName = locals.role;
		if (roleName !== 'Admin') {
			return error(403, 'Not Allowed');
		}
	} else {
		return redirect(302, '/login');
	}

	const name = locals?.user?.name;

	// Header stock indicator. Read-only — `readMainStock` deliberately doesn't create a
	// row, so simply loading a dashboard page never seeds capacity as a side effect; the
	// stock page itself does that. No row yet means nothing to show.
	const upcoming = await nextDeliveryDate();
	const mainStock = await readMainStock(upcoming);

	return {
		name,
		stock: mainStock
			? {
					remaining: remainingOf(mainStock),
					capacity: mainStock.capacity,
					low: isLow(mainStock),
					dateLabel: fullDate(upcoming)
				}
			: null
	};
};
