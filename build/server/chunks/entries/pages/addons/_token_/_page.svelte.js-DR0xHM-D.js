import { a0 as head, a6 as escape_html, a4 as ensure_array_like, $ as attr, T as derived } from '../../../../chunks/server.js-qDPizQqb.js';
import { a as money } from '../../../../chunks/format.js-DhQga0l2.js';
import { p as page } from '../../../../chunks/state.js-B8LH1nIO.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/client.js-CWf6uOE8.js';
import '../../../../chunks/runtime.js-CbeSlHLA.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/internal2.js-DJ3WVXqP.js';
import '../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/addons/[token]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let quantities = {};
		const qtyOf = (id) => quantities[id] ?? 0;
		const totalPence = derived(() => data.catalogue.reduce((sum, addon) => sum + addon.pricePence * qtyOf(addon.id), 0));
		const hasSelection = derived(() => totalPence() > 0);
		const success = derived(() => page.url.searchParams.has("success"));
		const canceled = derived(() => page.url.searchParams.has("canceled"));
		let submitting = false;
		head("1agli5m", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Add extras — GOTERA</title>`);
			});
			$$renderer.push(`<meta name="robots" content="noindex, nofollow"/>`);
		});
		$$renderer.push(`<div class="wrap svelte-1agli5m"><div class="card svelte-1agli5m"><h1 class="svelte-1agli5m">Add extras to your delivery</h1> <p class="sub svelte-1agli5m">${escape_html(data.deliveryLabel)} · Hi ${escape_html(data.name)}</p> `);
		if (success()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="banner banner--ok svelte-1agli5m">Thanks! We're processing your payment — you'll get an email once it's confirmed.</p>`);
		} else if (canceled()) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<p class="banner banner--warn svelte-1agli5m">Checkout was canceled — nothing was charged.</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (!data.open) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="banner banner--warn svelte-1agli5m">This delivery can no longer be changed, so extras can't be added to it.</p>`);
		} else if (data.catalogue.length === 0) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<p class="empty svelte-1agli5m">No extras are available right now — check back another time.</p>`);
		} else {
			$$renderer.push("<!--[-1-->");
			if (data.existingAddons.length > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="existing svelte-1agli5m"><p class="existing__label svelte-1agli5m">Already on this delivery</p> <ul class="svelte-1agli5m"><!--[-->`);
				const each_array = ensure_array_like(data.existingAddons);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let addon = each_array[$$index];
					$$renderer.push(`<li>${escape_html(addon.name)}${escape_html(addon.quantity > 1 ? ` x${addon.quantity}` : "")}</li>`);
				}
				$$renderer.push(`<!--]--></ul></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <form method="POST" action="?/checkout"><ul class="catalogue svelte-1agli5m"><!--[-->`);
			const each_array_1 = ensure_array_like(data.catalogue);
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let addon = each_array_1[$$index_1];
				$$renderer.push(`<li class="item svelte-1agli5m"><div class="item__info svelte-1agli5m"><span class="item__name svelte-1agli5m">${escape_html(addon.name)}</span> `);
				if (addon.description) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="item__desc svelte-1agli5m">${escape_html(addon.description)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <span class="item__price svelte-1agli5m">${escape_html(money(addon.pricePence))} each</span></div> <div class="stepper svelte-1agli5m"><button type="button" aria-label="Decrease quantity"${attr("disabled", qtyOf(addon.id) <= 0, true)} class="svelte-1agli5m">−</button> <input type="number"${attr("name", `qty_${addon.id}`)} min="0"${attr("max", data.maxQty)}${attr("value", qtyOf(addon.id))} class="svelte-1agli5m"/> <button type="button" aria-label="Increase quantity"${attr("disabled", qtyOf(addon.id) >= data.maxQty, true)} class="svelte-1agli5m">+</button></div></li>`);
			}
			$$renderer.push(`<!--]--></ul> `);
			if (form?.error) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<p class="banner banner--error svelte-1agli5m">${escape_html(form.error)}</p>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="footer svelte-1agli5m"><span class="total svelte-1agli5m">Total: ${escape_html(money(totalPence()))}</span> <button type="submit" class="cta svelte-1agli5m"${attr("disabled", !hasSelection() || submitting, true)}>${escape_html("Continue to payment")}</button></div></form>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-DR0xHM-D.js.map
