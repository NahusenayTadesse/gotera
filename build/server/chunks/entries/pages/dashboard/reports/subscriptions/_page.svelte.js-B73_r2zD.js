import { a0 as head, T as derived } from '../../../../../chunks/server.js-CPNQ0GBv.js';
import { F as FilterMenu } from '../../../../../chunks/FilterMenu.js-B2Y5Z2zO.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../../chunks/data-table-sort.js-5j19d0fG.js';
import { C as Circle_check_big } from '../../../../../chunks/circle-check-big.js-BhJo-K7P.js';
import { C as Circle_pause, O as Octagon_minus, S as Statuses } from '../../../../../chunks/statuses.js-e5MBhLkL.js';
import { L as Loader } from '../../../../../chunks/scroll-area.js-DLUPG4gi.js';
import { R as Refresh_cw } from '../../../../../chunks/refresh-cw.js-CGUVrsXQ.js';
import { f as formatEthiopianDate } from '../../../../../chunks/global.svelte.js-Bc9BkX_a.js';
import { C as Card, b as Card_header, a as Card_content, c as Card_title, d as Card_description } from '../../../../../chunks/card.js-DgfKxiLl.js';
import { S as Stat_card } from '../../../../../chunks/stat-card.js-C3vQss_o.js';
import { D as DateRangeFilter, C as ChartCanvas, c as colorAt, a as colorList } from '../../../../../chunks/chartPalette.js-zIUoNTY2.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../chunks/toast-state.svelte.js-B2UfxrKz.js';
import '../../../../../chunks/Icon.js-C-2f-rrd.js';
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

//#region src/routes/dashboard/reports/subscriptions/columns.ts
var columns = [
	{
		id: "index",
		header: "#",
		cell: (info) => {
			return info.table.getRowModel().rows.findIndex((row) => row.id === info.row.id) + 1;
		},
		enableSorting: false
	},
	{
		accessorKey: "subscriberEmail",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Customer",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => row.original.subscriberName || row.original.subscriberEmail || "—"
	},
	{
		accessorKey: "planName",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Plan",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => info.getValue() || "—"
	},
	{
		accessorKey: "quantity",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Qty",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	},
	{
		accessorKey: "status",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Status",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => renderComponent(Statuses, { status: row.original.status })
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Created",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => formatEthiopianDate(new Date(info.getValue()))
	}
];
//#endregion
//#region src/routes/dashboard/reports/subscriptions/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let filteredRows = data.rows;
		const trendData = derived(() => ({
			labels: data.charts.trend.labels,
			datasets: [{
				label: "New subscriptions",
				data: data.charts.trend.counts,
				borderColor: colorAt(0).slice(0, 7),
				backgroundColor: colorAt(0, "33"),
				fill: true,
				tension: .35
			}]
		}));
		const statusData = derived(() => ({
			labels: [
				"Active",
				"Pending",
				"Paused",
				"Cancelled"
			],
			datasets: [{
				data: [
					data.charts.status.active,
					data.charts.status.pending,
					data.charts.status.paused,
					data.charts.status.cancelled
				],
				backgroundColor: colorList(4)
			}]
		}));
		const planMixData = derived(() => ({
			labels: data.charts.planMix.labels,
			datasets: [{
				label: "Subscriptions",
				data: data.charts.planMix.counts,
				backgroundColor: colorList(data.charts.planMix.labels.length),
				borderRadius: 6
			}]
		}));
		const planMixOptions = { };
		const mrrByPlanData = derived(() => ({
			labels: data.charts.mrrByPlan.labels,
			datasets: [{
				label: "MRR (£)",
				data: data.charts.mrrByPlan.values.map((p) => p / 100),
				backgroundColor: colorList(data.charts.mrrByPlan.labels.length)
			}]
		}));
		const mrrByPlanOptions = {
			};
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("6osomq", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Subscriptions Report</title>`);
				});
			});
			$$renderer.push(`<h1 class="dash-heading mb-6 text-2xl font-semibold">Subscriptions Report</h1> `);
			DateRangeFilter($$renderer, {
				preset: data.preset,
				from: data.from,
				to: data.to
			});
			$$renderer.push(`<!----> <div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">`);
			{
				function icon($$renderer) {
					Refresh_cw($$renderer, { class: "size-6" });
				}
				Stat_card($$renderer, {
					title: "New",
					value: data.stats.total,
					description: "Started in range",
					measure: `(${data.stats.quantity} packs)`,
					icon});
			}
			$$renderer.push(`<!----> `);
			{
				function icon($$renderer) {
					Circle_check_big($$renderer, { class: "size-6" });
				}
				Stat_card($$renderer, {
					title: "Active",
					value: data.stats.active,
					description: "Currently billing",
					icon});
			}
			$$renderer.push(`<!----> `);
			{
				function icon($$renderer) {
					Loader($$renderer, { class: "size-6" });
				}
				Stat_card($$renderer, {
					title: "Pending",
					value: data.stats.pending,
					description: "Awaiting first payment",
					icon});
			}
			$$renderer.push(`<!----> `);
			{
				function icon($$renderer) {
					Circle_pause($$renderer, { class: "size-6" });
				}
				Stat_card($$renderer, {
					title: "Paused",
					value: data.stats.paused,
					description: "Temporarily paused",
					icon});
			}
			$$renderer.push(`<!----> `);
			{
				function icon($$renderer) {
					Octagon_minus($$renderer, { class: "size-6" });
				}
				Stat_card($$renderer, {
					title: "Cancelled",
					value: data.stats.cancelled,
					description: "Ended in range",
					icon});
			}
			$$renderer.push(`<!----></div> <div class="mb-10 grid gap-6 lg:grid-cols-3">`);
			if (Card) {
				$$renderer.push("<!--[-->");
				Card($$renderer, {
					class: "lg:col-span-2",
					children: ($$renderer) => {
						if (Card_header) {
							$$renderer.push("<!--[-->");
							Card_header($$renderer, {
								children: ($$renderer) => {
									if (Card_title) {
										$$renderer.push("<!--[-->");
										Card_title($$renderer, {
											children: ($$renderer) => {
												$$renderer.push(`<!---->New subscriptions over time`);
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
												$$renderer.push(`<!---->Rise and falls in signups across the selected range`);
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
										type: "line",
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
			$$renderer.push(` `);
			if (Card) {
				$$renderer.push("<!--[-->");
				Card($$renderer, {
					children: ($$renderer) => {
						if (Card_header) {
							$$renderer.push("<!--[-->");
							Card_header($$renderer, {
								children: ($$renderer) => {
									if (Card_title) {
										$$renderer.push("<!--[-->");
										Card_title($$renderer, {
											children: ($$renderer) => {
												$$renderer.push(`<!---->Status breakdown`);
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
										type: "doughnut",
										data: statusData(),
										height: "240px"
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
			$$renderer.push(` `);
			if (Card) {
				$$renderer.push("<!--[-->");
				Card($$renderer, {
					children: ($$renderer) => {
						if (Card_header) {
							$$renderer.push("<!--[-->");
							Card_header($$renderer, {
								children: ($$renderer) => {
									if (Card_title) {
										$$renderer.push("<!--[-->");
										Card_title($$renderer, {
											children: ($$renderer) => {
												$$renderer.push(`<!---->Plan mix`);
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
												$$renderer.push(`<!---->Subscriptions started, by plan`);
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
										data: planMixData(),
										options: planMixOptions,
										height: "240px"
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
			$$renderer.push(` `);
			if (Card) {
				$$renderer.push("<!--[-->");
				Card($$renderer, {
					children: ($$renderer) => {
						if (Card_header) {
							$$renderer.push("<!--[-->");
							Card_header($$renderer, {
								children: ($$renderer) => {
									if (Card_title) {
										$$renderer.push("<!--[-->");
										Card_title($$renderer, {
											children: ($$renderer) => {
												$$renderer.push(`<!---->MRR by plan`);
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
												$$renderer.push(`<!---->From active subscriptions started in range`);
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
										data: mrrByPlanData(),
										options: mrrByPlanOptions,
										height: "240px"
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
			$$renderer.push(`</div> `);
			FilterMenu($$renderer, {
				data: data.rows,
				filterKeys: ["status", "planName"],
				class: "mb-4",
				get filteredList() {
					return filteredRows;
				},
				set filteredList($$value) {
					filteredRows = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			Data_table($$renderer, {
				data: filteredRows,
				columns,
				fileName: "Subscriptions Report"
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
//# sourceMappingURL=_page.svelte.js-B73_r2zD.js.map
