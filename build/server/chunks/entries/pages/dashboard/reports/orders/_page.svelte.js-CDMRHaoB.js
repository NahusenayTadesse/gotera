import { a0 as head, a6 as spread_props, T as derived } from '../../../../../chunks/server.js-CPNQ0GBv.js';
import { I as Icon } from '../../../../../chunks/Icon.js-C-2f-rrd.js';
import { F as FilterMenu } from '../../../../../chunks/FilterMenu.js-B2Y5Z2zO.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../../chunks/data-table-sort.js-5j19d0fG.js';
import { C as Circle_check_big } from '../../../../../chunks/circle-check-big.js-BhJo-K7P.js';
import { S as Statuses } from '../../../../../chunks/statuses.js-e5MBhLkL.js';
import { G as Gift, U as User_x } from '../../../../../chunks/user-x.js-DDDy3Lp5.js';
import { L as Loader } from '../../../../../chunks/scroll-area.js-DLUPG4gi.js';
import { f as formatEthiopianDate } from '../../../../../chunks/global.svelte.js-Bc9BkX_a.js';
import { C as Card, b as Card_header, a as Card_content, c as Card_title, d as Card_description } from '../../../../../chunks/card.js-DgfKxiLl.js';
import { S as Stat_card } from '../../../../../chunks/stat-card.js-C3vQss_o.js';
import { D as DateRangeFilter, C as ChartCanvas, c as colorAt, a as colorList } from '../../../../../chunks/chartPalette.js-zIUoNTY2.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../chunks/toast-state.svelte.js-B2UfxrKz.js';
import '../../../../../chunks/chart-area.js-QvFMlwKF.js';
import '../../../../../chunks/minus.js-ESxlDJzH.js';
import '../../../../../chunks/popover.js-CeZILK5T.js';
import '../../../../../chunks/scroll-lock.js-DAwGTwcu.js';
import '../../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../../chunks/create-id.js-DpR0oe6q.js';
import '../../../../../chunks/hidden-input.js-BsjuO7xd.js';
import '../../../../../chunks/sr-only-styles.js-P-cDEe1k.js';
import '../../../../../chunks/popper-layer-force-mount.js-CzkC2vS6.js';
import '../../../../../chunks/safe-polygon.svelte.js-Dl7S_9Eh.js';
import '../../../../../chunks/utils2.js-BChetszu.js';
import '../../../../../chunks/command.js-CqffWVq4.js';
import '../../../../../chunks/dialog.js-BhMsigOw.js';
import '../../../../../chunks/button.js-DMlVoc1I.js';
import '../../../../../chunks/tooltip.js-e17nlGw5.js';
import '../../../../../chunks/label.js-FcotYhKU.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/state.js-BDNoTQbo.js';
import '../../../../../chunks/client.js-7a-rpZlk.js';
import '../../../../../chunks/routing.js-CU5UDpt8.js';
import '../../../../../chunks/internal2.js-CNjKCACj.js';
import '../../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../../chunks/chevron-down.js-ol8PFekw.js';
import '../../../../../chunks/dropdown-menu.js-BjUEFyFe.js';
import '../../../../../chunks/menu.js-CrFfA9Yr.js';
import '../../../../../chunks/input.js-BYtfwuM9.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../../chunks/badge-check.js-Dc-hXwTK.js';
import '../../../../../chunks/truck.js-rfGMc_Yv.js';
import '../../../../../chunks/reports.js-YS7wm2Ph.js';

//#region node_modules/@lucide/svelte/dist/icons/package-check.svelte
function Package_check($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "package-check" },
		props,
		{ iconNode: [
			["path", { "d": "M12 22V12" }],
			["path", { "d": "m16 17 2 2 4-4" }],
			["path", { "d": "M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753" }],
			["path", { "d": "M3.29 7 12 12l8.71-5" }],
			["path", { "d": "m7.5 4.27 8.997 5.148" }]
		] }
	]));
}
//#endregion
//#region src/routes/dashboard/reports/orders/columns.ts
var indexColumn = {
	id: "index",
	header: "#",
	cell: (info) => {
		return info.table.getRowModel().rows.findIndex((row) => row.id === info.row.id) + 1;
	},
	enableSorting: false
};
var statusColumn = {
	accessorKey: "status",
	header: ({ column }) => renderComponent(Data_table_sort, {
		name: "Status",
		onclick: column.getToggleSortingHandler()
	}),
	sortable: true,
	cell: ({ row }) => renderComponent(Statuses, { status: row.original.status })
};
var placedColumn = {
	accessorKey: "createdAt",
	header: ({ column }) => renderComponent(Data_table_sort, {
		name: "Placed",
		onclick: column.getToggleSortingHandler()
	}),
	sortable: true,
	cell: (info) => formatEthiopianDate(new Date(info.getValue()))
};
var quantityColumn = {
	accessorKey: "quantity",
	header: ({ column }) => renderComponent(Data_table_sort, {
		name: "Qty",
		onclick: column.getToggleSortingHandler()
	}),
	sortable: true
};
var giftColumns = [
	indexColumn,
	{
		accessorKey: "buyerEmail",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Buyer",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => row.original.buyerName || row.original.buyerEmail
	},
	{
		accessorKey: "recipientName",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Recipient",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	},
	quantityColumn,
	statusColumn,
	placedColumn
];
var guestColumns = [
	indexColumn,
	{
		accessorKey: "buyerEmail",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Buyer email",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => info.getValue() || "—"
	},
	{
		accessorKey: "recipientAddress",
		header: "Ship to",
		cell: ({ row }) => {
			const a = row.original.recipientAddress;
			return a ? `${a.line1}, ${a.city} ${a.postcode}` : "—";
		}
	},
	quantityColumn,
	statusColumn,
	placedColumn
];
//#endregion
//#region src/routes/dashboard/reports/orders/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let filteredGiftRows = data.giftRows;
		let filteredGuestRows = data.guestRows;
		const trendData = derived(() => ({
			labels: data.charts.trend.labels,
			datasets: [{
				label: "One-Time & Gift",
				data: data.charts.trend.gift,
				backgroundColor: colorAt(0),
				borderRadius: 4
			}, {
				label: "Guest",
				data: data.charts.trend.guest,
				backgroundColor: colorAt(4),
				borderRadius: 4
			}]
		}));
		const giftStatusData = derived(() => ({
			labels: [
				"Paid",
				"Fulfilled",
				"Pending"
			],
			datasets: [{
				data: [
					data.stats.giftPaid,
					data.stats.giftFulfilled,
					data.stats.giftPending
				],
				backgroundColor: colorList(3)
			}]
		}));
		const guestStatusData = derived(() => ({
			labels: [
				"Paid",
				"Fulfilled",
				"Pending"
			],
			datasets: [{
				data: [
					data.stats.guestPaid,
					data.stats.guestFulfilled,
					data.stats.guestPending
				],
				backgroundColor: colorList(3)
			}]
		}));
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("9anc6h", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Orders Report</title>`);
				});
			});
			$$renderer.push(`<h1 class="dash-heading mb-6 text-2xl font-semibold">Orders Report</h1> `);
			DateRangeFilter($$renderer, {
				preset: data.preset,
				from: data.from,
				to: data.to
			});
			$$renderer.push(`<!----> `);
			if (Card) {
				$$renderer.push("<!--[-->");
				Card($$renderer, {
					class: "mb-10",
					children: ($$renderer) => {
						if (Card_header) {
							$$renderer.push("<!--[-->");
							Card_header($$renderer, {
								children: ($$renderer) => {
									if (Card_title) {
										$$renderer.push("<!--[-->");
										Card_title($$renderer, {
											children: ($$renderer) => {
												$$renderer.push(`<!---->Order volume by channel`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(` `);
									if (Card_description) {
										$$renderer.push("<!--[-->");
										Card_description($$renderer, {
											children: ($$renderer) => {
												$$renderer.push(`<!---->One-time/gift vs guest checkout, over time`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
						$$renderer.push(` `);
						if (Card_content) {
							$$renderer.push("<!--[-->");
							Card_content($$renderer, {
								children: ($$renderer) => {
									ChartCanvas($$renderer, {
										type: "bar",
										data: trendData(),
										height: "280px"
									});
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(` <h2 class="mb-4 flex items-center gap-2 text-lg font-medium">`);
			Gift($$renderer, { class: "size-5" });
			$$renderer.push(`<!----> One-Time &amp; Gift Orders</h2> <div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">`);
			{
				function icon($$renderer) {
					Gift($$renderer, { class: "size-6" });
				}
				Stat_card($$renderer, {
					title: "Placed",
					value: data.stats.giftTotal,
					description: "In range",
					icon});
			}
			$$renderer.push(`<!----> `);
			{
				function icon($$renderer) {
					Circle_check_big($$renderer, { class: "size-6" });
				}
				Stat_card($$renderer, {
					title: "Paid",
					value: data.stats.giftPaid,
					description: "Payment confirmed",
					icon});
			}
			$$renderer.push(`<!----> `);
			{
				function icon($$renderer) {
					Package_check($$renderer, { class: "size-6" });
				}
				Stat_card($$renderer, {
					title: "Fulfilled",
					value: data.stats.giftFulfilled,
					description: "Shipped",
					icon});
			}
			$$renderer.push(`<!----> `);
			{
				function icon($$renderer) {
					Loader($$renderer, { class: "size-6" });
				}
				Stat_card($$renderer, {
					title: "Pending",
					value: data.stats.giftPending,
					description: "Awaiting payment",
					icon});
			}
			$$renderer.push(`<!----> `);
			if (Card) {
				$$renderer.push("<!--[-->");
				Card($$renderer, {
					class: "sm:col-span-2 lg:col-span-4",
					children: ($$renderer) => {
						if (Card_content) {
							$$renderer.push("<!--[-->");
							Card_content($$renderer, {
								class: "flex items-center justify-center py-4",
								children: ($$renderer) => {
									$$renderer.push(`<div class="h-48 w-48">`);
									ChartCanvas($$renderer, {
										type: "doughnut",
										data: giftStatusData(),
										height: "192px"
									});
									$$renderer.push(`<!----></div>`);
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(`</div> `);
			FilterMenu($$renderer, {
				data: data.giftRows,
				filterKeys: ["status"],
				class: "mb-4",
				get filteredList() {
					return filteredGiftRows;
				},
				set filteredList($$value) {
					filteredGiftRows = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> <div class="mb-10">`);
			Data_table($$renderer, {
				data: filteredGiftRows,
				columns: giftColumns,
				fileName: "One-Time and Gift Orders Report"
			});
			$$renderer.push(`<!----></div> <h2 class="mb-4 flex items-center gap-2 text-lg font-medium">`);
			User_x($$renderer, { class: "size-5" });
			$$renderer.push(`<!----> Guest Orders</h2> <div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">`);
			{
				function icon($$renderer) {
					User_x($$renderer, { class: "size-6" });
				}
				Stat_card($$renderer, {
					title: "Placed",
					value: data.stats.guestTotal,
					description: "In range",
					icon});
			}
			$$renderer.push(`<!----> `);
			{
				function icon($$renderer) {
					Circle_check_big($$renderer, { class: "size-6" });
				}
				Stat_card($$renderer, {
					title: "Paid",
					value: data.stats.guestPaid,
					description: "Payment confirmed",
					icon});
			}
			$$renderer.push(`<!----> `);
			{
				function icon($$renderer) {
					Package_check($$renderer, { class: "size-6" });
				}
				Stat_card($$renderer, {
					title: "Fulfilled",
					value: data.stats.guestFulfilled,
					description: "Shipped",
					icon});
			}
			$$renderer.push(`<!----> `);
			{
				function icon($$renderer) {
					Loader($$renderer, { class: "size-6" });
				}
				Stat_card($$renderer, {
					title: "Pending",
					value: data.stats.guestPending,
					description: "Awaiting payment",
					icon});
			}
			$$renderer.push(`<!----> `);
			if (Card) {
				$$renderer.push("<!--[-->");
				Card($$renderer, {
					class: "sm:col-span-2 lg:col-span-4",
					children: ($$renderer) => {
						if (Card_content) {
							$$renderer.push("<!--[-->");
							Card_content($$renderer, {
								class: "flex items-center justify-center py-4",
								children: ($$renderer) => {
									$$renderer.push(`<div class="h-48 w-48">`);
									ChartCanvas($$renderer, {
										type: "doughnut",
										data: guestStatusData(),
										height: "192px"
									});
									$$renderer.push(`<!----></div>`);
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(`</div> `);
			FilterMenu($$renderer, {
				data: data.guestRows,
				filterKeys: ["status"],
				class: "mb-4",
				get filteredList() {
					return filteredGuestRows;
				},
				set filteredList($$value) {
					filteredGuestRows = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			Data_table($$renderer, {
				data: filteredGuestRows,
				columns: guestColumns,
				fileName: "Guest Orders Report"
			});
			$$renderer.push(`<!---->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-CDMRHaoB.js.map
