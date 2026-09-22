import { a0 as head, a9 as escape_html, $ as attr, a4 as ensure_array_like, T as derived, aa as attr_class } from '../../../../../chunks/server.js-CPNQ0GBv.js';
import { f as fullDate } from '../../../../../chunks/format.js-DhQga0l2.js';
import '../../../../../chunks/client.js-BEm1lywY.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../chunks/runtime.js-CbeSlHLA.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../chunks/internal2.js-BO8lukLW.js';
import '../../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/lib/components/dashboard/RouteMap.svelte
function RouteMap($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<div${attr_class("route-map svelte-1m240o", void 0, { "is-failed": false })}>`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
//#region src/routes/dashboard/deliveries/route/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		/**
		* Google Maps caps a single directions URL at 10 points (origin, destination and 8
		* waypoints between them), so a busy Saturday has to be handed to the driver as
		* several consecutive links rather than one. Each leg starts where the last ended so
		* the chain is continuous, and the final one closes the loop back at the depot.
		*/
		const WAYPOINTS_PER_LINK = 8;
		const mapsLinks = derived(() => {
			const depot = data.depotPostcode;
			const stops = data.ordered.map((s) => `${s.line1}, ${s.postcode}`);
			if (stops.length === 0) return [];
			const links = [];
			for (let i = 0; i < stops.length; i += WAYPOINTS_PER_LINK) {
				const chunk = stops.slice(i, i + WAYPOINTS_PER_LINK);
				const origin = i === 0 ? depot : stops[i - 1];
				const destination = stops[i + WAYPOINTS_PER_LINK] ?? depot;
				const params = new URLSearchParams({
					api: "1",
					origin,
					destination,
					travelmode: "driving",
					waypoints: chunk.join("|")
				});
				links.push({
					label: stops.length <= WAYPOINTS_PER_LINK ? "Open in Google Maps" : `Stops ${i + 1}–${Math.min(i + WAYPOINTS_PER_LINK, stops.length)}`,
					url: `https://www.google.com/maps/dir/?${params}`
				});
			}
			return links;
		});
		const markers = derived(() => [...data.depot ? [{
			latitude: data.depot.latitude,
			longitude: data.depot.longitude,
			label: "⌂",
			title: `Depot · ${data.depotPostcode}`
		}] : [], ...data.ordered.map((s, i) => ({
			latitude: s.latitude,
			longitude: s.longitude,
			label: String(i + 1),
			title: `${i + 1}. ${s.name} — ${s.line1}, ${s.postcode}`
		}))]);
		const miles = derived(() => data.totals ? (data.totals.metres / 1609.344).toFixed(1) : null);
		const drive = derived(() => {
			if (!data.totals?.seconds) return null;
			const mins = Math.round(data.totals.seconds / 60);
			return `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, "0")}m`;
		});
		head("1kscmd8", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Delivery route · ${escape_html(data.date)}</title>`);
			});
		});
		$$renderer.push(`<div class="route-page svelte-1kscmd8"><header class="route-head svelte-1kscmd8"><div><h1 class="svelte-1kscmd8">Delivery route</h1> <p class="route-sub svelte-1kscmd8">${escape_html(fullDate(data.date))}</p></div> <label class="route-date svelte-1kscmd8"><span>Delivery date</span> <input type="date"${attr("value", data.date)} class="svelte-1kscmd8"/></label></header> `);
		if (data.totals) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="route-stats svelte-1kscmd8"><div class="svelte-1kscmd8"><strong class="svelte-1kscmd8">${escape_html(data.totals.stops)}</strong><span class="svelte-1kscmd8">stops</span></div> <div class="svelte-1kscmd8"><strong class="svelte-1kscmd8">${escape_html(miles())}</strong><span class="svelte-1kscmd8">miles${escape_html(data.estimated ? " (est.)" : "")}</span></div> `);
			if (drive()) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="svelte-1kscmd8"><strong class="svelte-1kscmd8">${escape_html(drive())}</strong><span class="svelte-1kscmd8">driving</span></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.unscheduledCount > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="route-note svelte-1kscmd8">${escape_html(data.scheduledCount)} subscription ${escape_html(data.scheduledCount === 1 ? "delivery is" : "deliveries are")}
			scheduled for this date. The other ${escape_html(data.unscheduledCount)} stop${escape_html(data.unscheduledCount === 1 ? "" : "s")}
			${escape_html(data.unscheduledCount === 1 ? "is a" : "are")} paid guest or gift order${escape_html(data.unscheduledCount === 1 ? "" : "s")} awaiting fulfilment — those carry no delivery date, so they appear on every date until
			marked fulfilled.</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.estimated && data.ordered.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="route-note svelte-1kscmd8">Distances are straight-line estimates — real driving times were unavailable. The stop order is
			still optimised; only the totals are approximate.</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (!data.depot) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="route-empty svelte-1kscmd8">The depot postcode <code class="svelte-1kscmd8">${escape_html(data.depotPostcode)}</code> couldn't be located, so no route could be
			built. Check <code class="svelte-1kscmd8">DEPOT_POSTCODE</code>.</p>`);
		} else if (data.ordered.length === 0) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`<p class="route-empty svelte-1kscmd8">No deliveries to route on this date.</p>`);
		} else {
			$$renderer.push("<!--[-1-->");
			RouteMap($$renderer, {
				depot: markers()[0],
				stops: markers().slice(1)
			});
			$$renderer.push(`<!----> <div class="route-actions svelte-1kscmd8"><!--[-->`);
			const each_array = ensure_array_like(mapsLinks());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let link = each_array[$$index];
				$$renderer.push(`<a class="route-btn svelte-1kscmd8"${attr("href", link.url)} target="_blank" rel="noopener noreferrer">${escape_html(link.label)}</a>`);
			}
			$$renderer.push(`<!--]--> <button class="route-btn svelte-1kscmd8" type="button">CSV</button> <button class="route-btn svelte-1kscmd8" type="button">PDF</button></div> <ol class="route-stops svelte-1kscmd8"><li class="is-depot svelte-1kscmd8"><span class="n svelte-1kscmd8">⌂</span> <div class="svelte-1kscmd8"><strong>Depot</strong><span class="svelte-1kscmd8">${escape_html(data.depotPostcode)}</span></div></li> <!--[-->`);
			const each_array_1 = ensure_array_like(data.ordered);
			for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
				let stop = each_array_1[i];
				$$renderer.push(`<li class="svelte-1kscmd8"><span class="n svelte-1kscmd8">${escape_html(i + 1)}</span> <div class="svelte-1kscmd8"><strong>${escape_html(stop.name)}`);
				if (stop.kind !== "subscription") {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<em class="tag svelte-1kscmd8">${escape_html(stop.kind)}</em>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></strong> <span class="svelte-1kscmd8">${escape_html([
					stop.line1,
					stop.line2,
					stop.city
				].filter(Boolean).join(", "))} · ${escape_html(stop.postcode)}</span></div></li>`);
			}
			$$renderer.push(`<!--]--> <li class="is-depot svelte-1kscmd8"><span class="n svelte-1kscmd8">⌂</span> <div class="svelte-1kscmd8"><strong>Back to depot</strong><span class="svelte-1kscmd8">${escape_html(data.depotPostcode)}</span></div></li></ol>`);
		}
		$$renderer.push(`<!--]--> `);
		if (data.unplaceable.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<section class="route-unplaceable svelte-1kscmd8"><h2 class="svelte-1kscmd8">${escape_html(data.unplaceable.length)} stop${escape_html(data.unplaceable.length === 1 ? "" : "s")} not on the route</h2> <p class="svelte-1kscmd8">These postcodes couldn't be located, so they aren't in the order above. They still need
				delivering — fix the postcode on the customer's address and reload.</p> <ul class="svelte-1kscmd8"><!--[-->`);
			const each_array_2 = ensure_array_like(data.unplaceable);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let stop = each_array_2[$$index_2];
				$$renderer.push(`<li><strong>${escape_html(stop.name)}</strong> — ${escape_html(stop.line1)}, ${escape_html(stop.postcode || "(no postcode)")}</li>`);
			}
			$$renderer.push(`<!--]--></ul></section>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-OWHHX1-F.js.map
