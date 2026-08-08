import { a0 as head, a6 as spread_props } from '../../../chunks/server.js-CPNQ0GBv.js';
import { I as Icon } from '../../../chunks/Icon.js-C-2f-rrd.js';
import { T as Truck } from '../../../chunks/truck.js-rfGMc_Yv.js';
import { U as Users } from '../../../chunks/users.js-B8RRgRJn.js';
import { S as Stat_card } from '../../../chunks/stat-card.js-C3vQss_o.js';
import { f as formatGBP } from '../../../chunks/format.js-D8oyWA_y.js';
import '../../../chunks/shared.js-CgqsOrws.js';
import '../../../chunks/card.js-DgfKxiLl.js';
import '../../../chunks/utils2.js-BChetszu.js';

//#region node_modules/@lucide/svelte/dist/icons/credit-card.svelte
function Credit_card($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "credit-card" },
		props,
		{ iconNode: [["rect", {
			"width": "20",
			"height": "14",
			"x": "2",
			"y": "5",
			"rx": "2"
		}], ["line", {
			"x1": "2",
			"x2": "22",
			"y1": "10",
			"y2": "10"
		}]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/package.svelte
function Package($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "package" },
		props,
		{ iconNode: [
			["path", { "d": "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" }],
			["path", { "d": "M12 22V12" }],
			["polyline", { "points": "3.29 7 12 12 20.71 7" }],
			["path", { "d": "m7.5 4.27 9 5.15" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/user-plus.svelte
function User_plus($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "user-plus" },
		props,
		{ iconNode: [
			["path", { "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }],
			["circle", {
				"cx": "9",
				"cy": "7",
				"r": "4"
			}],
			["line", {
				"x1": "19",
				"x2": "19",
				"y1": "8",
				"y2": "14"
			}],
			["line", {
				"x1": "22",
				"x2": "16",
				"y1": "11",
				"y2": "11"
			}]
		] }
	]));
}
//#endregion
//#region src/lib/components/dashboard/daily-stats.svelte
function Daily_stats($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { stats = {} } = $$props;
		/** Format number with commas */
		const formatNumber = (value) => {
			return new Intl.NumberFormat("en-US").format(Math.round(value));
		};
		$$renderer.push(`<div class="w-full"><div class="mb-8"><h2 class="dash-heading text-3xl font-semibold text-foreground">Daily Statistics</h2> <p class="mt-2 text-muted-foreground">Today's performance overview</p></div> <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">`);
		{
			function icon($$renderer) {
				Truck($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "Deliveries Made",
				value: formatNumber(stats.totalOrders || 0),
				description: "Delivered today",
				measure: "Deliveries",
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				Package($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "Items Delivered",
				value: formatNumber(stats.totalItemsSold || 0),
				description: "Total quantity",
				measure: "Items",
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				User_plus($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "New Subscribers",
				value: formatNumber(stats.newSubscribers || 0),
				description: "Signed up today",
				measure: "Subscribers",
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				Users($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "New Users",
				value: formatNumber(stats.newUsers || 0),
				description: "Accounts created today",
				measure: "Users",
				icon});
		}
		$$renderer.push(`<!----> `);
		{
			function icon($$renderer) {
				Credit_card($$renderer, { class: "size-6" });
			}
			Stat_card($$renderer, {
				title: "Payments Collected",
				value: formatGBP(stats.totalPaymentsCollected || 0),
				description: "From today's deliveries",
				icon});
		}
		$$renderer.push(`<!----></div></div>`);
	});
}
//#endregion
//#region src/routes/dashboard/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("x1i5gj", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Dashboard</title>`);
			});
		});
		$$renderer.push(`<div class="min-h-dvh w-full"><div class="border-b border-border"><div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><div class="flex items-center justify-between"><div class="space-y-1"><span class="dash-eyebrow">Overview</span> <h1 class="dash-heading text-3xl font-semibold text-foreground">Dashboard</h1> <p class="text-sm text-muted-foreground">Welcome back! Here's your daily overview.</p></div></div></div></div> <div class="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">`);
		Daily_stats($$renderer, { stats: data?.dailyStats });
		$$renderer.push(`<!----></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-Dpoym4DX.js.map
