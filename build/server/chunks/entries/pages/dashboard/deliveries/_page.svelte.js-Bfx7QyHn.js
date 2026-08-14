import { a0 as head, T as derived, a9 as escape_html, ae as store_get, af as unsubscribe_stores, $ as attr, a6 as spread_props } from '../../../../chunks/server.js-CPNQ0GBv.js';
import { g as goto } from '../../../../chunks/client.js-gbEA-723.js';
import { p as page } from '../../../../chunks/state.js-COqmE8cz.js';
import { I as Icon } from '../../../../chunks/Icon.js-C-2f-rrd.js';
import { F as FilterMenu } from '../../../../chunks/FilterMenu.js-f3LM4b9Y.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../chunks/data-table-sort.js-BaXmwuLm.js';
import { I as InputComp, C as Checkbox } from '../../../../chunks/InputComp.js--TQ2T4TX.js';
import { E as Errors } from '../../../../chunks/Errors.js-DYhtXrxd.js';
import { S as Statuses } from '../../../../chunks/statuses.js-DdAFh5TI.js';
import { R as RowActions } from '../../../../chunks/RowActions.js-DX976CuS.js';
import { X } from '../../../../chunks/dialog.js-CNnZpwDX.js';
import { D as DialogComp } from '../../../../chunks/DialogComp.js-heiIYoJF.js';
import { B as Button } from '../../../../chunks/button.js-DMlVoc1I.js';
import { L as LoadingBtn } from '../../../../chunks/LoadingBtn.js-B86u0wY7.js';
import { f as formatEthiopianDate } from '../../../../chunks/global.svelte.js-Cx8Mv6jx.js';
import { C as Card, b as Card_header, a as Card_content, c as Card_title } from '../../../../chunks/card.js-DgfKxiLl.js';
import { b as superForm } from '../../../../chunks/client2.js-BQ9y1BAm.js';
import { a as zodClient } from '../../../../chunks/adapters.js-fGoXMZOl.js';
import { a as deliverySchema, d as delayEmailSchema } from '../../../../chunks/schema8.js-DHgWwHPj.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/routing.js-CU5UDpt8.js';
import '../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/internal2.js-Cg6Fvaqd.js';
import '../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../chunks/toast-state.svelte.js-B2UfxrKz.js';
import '../../../../chunks/chart-area.js-QvFMlwKF.js';
import '../../../../chunks/minus.js-ESxlDJzH.js';
import '../../../../chunks/popover.js-D7HUu4n6.js';
import '../../../../chunks/scroll-lock.js-DHsXOzO5.js';
import '../../../../chunks/create-id.js-ChicdcAh.js';
import '../../../../chunks/hidden-input.js-YZizwPAN.js';
import '../../../../chunks/sr-only-styles.js-yoXwszuh.js';
import '../../../../chunks/popper-layer-force-mount.js-B6h_X5Ed.js';
import '../../../../chunks/safe-polygon.svelte.js-C4wqwQGo.js';
import '../../../../chunks/utils2.js-BChetszu.js';
import '../../../../chunks/command.js-C6EqICGc.js';
import '../../../../chunks/tooltip.js-VqjggVyG.js';
import '../../../../chunks/scroll-area.js-BG2EJRIs.js';
import '../../../../chunks/label.js-BszTJLDi.js';
import '../../../../chunks/chevron-down.js-ol8PFekw.js';
import '../../../../chunks/dropdown-menu.js-CI6WexMj.js';
import '../../../../chunks/menu.js--wyTAI_l.js';
import '../../../../chunks/input.js-BYtfwuM9.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../chunks/badge-check.js-Dc-hXwTK.js';
import '../../../../chunks/chevron-left.js-Dl5KW7W_.js';
import '../../../../chunks/chevron-right.js-ChVD6BGK.js';
import '../../../../chunks/circle-alert.js-BYQ_-QxX.js';
import 'browser-image-compression';
import '../../../../chunks/truck.js-rfGMc_Yv.js';
import '../../../../chunks/ellipsis.js-BNid1SJZ.js';
import '../../../../chunks/pencil.js-BNjnhhMl.js';
import '../../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../../chunks/forms.js-C2B4g7LG.js';
import '../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../chunks/stores.js-BKcqi_f1.js';
import '../../../../index.js-8fXOoxmJ.js';
import '../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../chunks/access.js-Cygy5klO.js';

//#region node_modules/@lucide/svelte/dist/icons/mail.svelte
function Mail($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "mail" },
		props,
		{ iconNode: [["path", { "d": "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }], ["rect", {
			"x": "2",
			"y": "4",
			"width": "20",
			"height": "16",
			"rx": "2"
		}]] }
	]));
}
//#endregion
//#region src/lib/components/Table/select-header.svelte
function Select_header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { table } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			var bind_get = () => table.getIsAllPageRowsSelected();
			var bind_set = (v) => table.toggleAllPageRowsSelected(!!v);
			Checkbox($$renderer, {
				"aria-label": "Select all",
				indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
				get checked() {
					return bind_get();
				},
				set checked($$value) {
					bind_set($$value);
				}
			});
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
//#region src/lib/components/Table/select-cell.svelte
function Select_cell($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { row } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			var bind_get = () => row.getIsSelected();
			var bind_set = (v) => row.toggleSelected(!!v);
			Checkbox($$renderer, {
				"aria-label": "Select row",
				onclick: (e) => e.stopPropagation(),
				get checked() {
					return bind_get();
				},
				set checked($$value) {
					bind_set($$value);
				}
			});
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
//#region src/routes/dashboard/deliveries/columns.ts
var columns = [
	{
		id: "select",
		header: ({ table }) => renderComponent(Select_header, { table }),
		cell: ({ row }) => renderComponent(Select_cell, { row }),
		enableSorting: false,
		enableHiding: false
	},
	{
		id: "index",
		header: "#",
		cell: (info) => {
			return info.table.getRowModel().rows.findIndex((row) => row.id === info.row.id) + 1;
		},
		enableSorting: false
	},
	{
		accessorKey: "scheduledDate",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Scheduled",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => formatEthiopianDate(new Date(info.getValue()))
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
		accessorKey: "addressLine1",
		header: "Ship to",
		cell: ({ row }) => row.original.addressLine1 ? `${row.original.addressLine1}, ${row.original.addressCity} ${row.original.addressPostcode}` : "—"
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
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => renderComponent(RowActions, {
			id: row.original.id,
			label: "delivery"
		})
	}
];
//#endregion
//#region src/routes/dashboard/deliveries/DelayEmailDialog.svelte
function DelayEmailDialog($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { delayEmailForm, rows } = $$props;
		let open = false;
		const { form, errors, delayed, allErrors} = superForm(delayEmailForm, {
			id: "delay-email",
			dataType: "json",
			resetForm: true,
			invalidateAll: true,
			validators: zodClient(delayEmailSchema),
			onUpdated({ form: f }) {
				if (f.valid) open = false;
			}
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (rows.length > 0) {
				$$renderer.push("<!--[0-->");
				DialogComp($$renderer, {
					title: "Notify customers of delay",
					label: `Notify ${rows.length} selected`,
					IconComp: Mail,
					class: "",
					get open() {
						return open;
					},
					set open($$value) {
						open = $$value;
						$$settled = false;
					},
					children: ($$renderer) => {
						$$renderer.push(`<h3 class="mb-1 text-lg font-semibold">Notify ${escape_html(rows.length)}
			${escape_html(rows.length === 1 ? "customer" : "customers")} of a delay</h3> <p class="mb-4 text-sm text-muted-foreground">${escape_html(rows.map((r) => r.subscriberName || r.subscriberEmail || "Unknown").join(", "))}</p> <form method="POST" action="?/sendDelayEmail" id="delay-email-form" class="flex flex-col gap-4">`);
						Errors($$renderer, { allErrors: store_get($$store_subs ??= {}, "$allErrors", allErrors) });
						$$renderer.push(`<!----> `);
						InputComp($$renderer, {
							label: "Message to customers",
							form,
							errors,
							type: "textarea",
							name: "message",
							rows: 5,
							placeholder: "e.g. Due to high demand this week's delivery will arrive a day later than planned.",
							required: true
						});
						$$renderer.push(`<!----> `);
						Button($$renderer, {
							type: "submit",
							form: "delay-email-form",
							disabled: rows.length === 0,
							children: ($$renderer) => {
								if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
									$$renderer.push("<!--[0-->");
									LoadingBtn($$renderer, { name: "Sending" });
								} else {
									$$renderer.push("<!--[-1-->");
									$$renderer.push(`Send delay email`);
								}
								$$renderer.push(`<!--]-->`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----></form>`);
					},
					$$slots: { default: true }
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
//#region src/routes/dashboard/deliveries/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		let filteredRows = data.rows;
		let selectedRows = [];
		const statuses = [
			{
				value: "scheduled",
				name: "Scheduled"
			},
			{
				value: "dispatched",
				name: "Dispatched"
			},
			{
				value: "delivered",
				name: "Delivered"
			},
			{
				value: "skipped",
				name: "Skipped"
			},
			{
				value: "failed",
				name: "Failed"
			}
		];
		const editingId = derived(() => page.url.searchParams.get("edit"));
		const { form, errors, delayed, allErrors} = superForm(data.form, {
			dataType: "json",
			resetForm: false,
			invalidateAll: true,
			validators: zodClient(deliverySchema),
			onUpdated({ form: f }) {
				if (f.valid) goto(page.url.pathname, {
					});
			}
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("1k01ty6", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Deliveries</title>`);
				});
			});
			$$renderer.push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-4"><h1 class="dash-heading text-2xl font-semibold">Upcoming Deliveries</h1> `);
			DelayEmailDialog($$renderer, {
				delayEmailForm: data.delayEmailForm,
				rows: selectedRows
			});
			$$renderer.push(`<!----></div> `);
			if (editingId()) {
				$$renderer.push("<!--[0-->");
				if (Card) {
					$$renderer.push("<!--[-->");
					Card($$renderer, {
						class: "mb-8 w-full lg:w-lg",
						children: ($$renderer) => {
							if (Card_header) {
								$$renderer.push("<!--[-->");
								Card_header($$renderer, {
									class: "flex flex-row items-center justify-between",
									children: ($$renderer) => {
										if (Card_title) {
											$$renderer.push("<!--[-->");
											Card_title($$renderer, {
												children: ($$renderer) => {
													$$renderer.push(`<!---->Edit Delivery`);
												},
												$$slots: { default: true }
											});
											$$renderer.push("<!--]-->");
										} else {
											$$renderer.push("<!--[!-->");
											$$renderer.push("<!--]-->");
										}
										$$renderer.push(` `);
										Button($$renderer, {
											href: page.url.pathname,
											variant: "ghost",
											size: "icon",
											children: ($$renderer) => {
												X($$renderer, { class: "h-4 w-4" });
											},
											$$slots: { default: true }
										});
										$$renderer.push(`<!---->`);
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
										$$renderer.push(`<form method="POST" action="?/edit" id="delivery-form" class="flex flex-col gap-4">`);
										Errors($$renderer, { allErrors: store_get($$store_subs ??= {}, "$allErrors", allErrors) });
										$$renderer.push(`<!----> <input type="hidden" name="id"${attr("value", store_get($$store_subs ??= {}, "$form", form).id)}/> `);
										InputComp($$renderer, {
											label: "Status",
											form,
											errors,
											type: "select",
											name: "status",
											items: statuses,
											required: true
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Scheduled date",
											form,
											errors,
											type: "date",
											name: "scheduledDate",
											oldDays: true,
											futureDays: false
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Status",
											form,
											errors,
											type: "checkboxSingle",
											name: "isActive",
											placeholder: "Active"
										});
										$$renderer.push(`<!----> `);
										Button($$renderer, {
											type: "submit",
											form: "delivery-form",
											children: ($$renderer) => {
												if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
													$$renderer.push("<!--[0-->");
													LoadingBtn($$renderer, { name: "Saving" });
												} else {
													$$renderer.push("<!--[-1-->");
													$$renderer.push(`Save changes`);
												}
												$$renderer.push(`<!--]-->`);
											},
											$$slots: { default: true }
										});
										$$renderer.push(`<!----></form>`);
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
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
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
				fileName: "Deliveries",
				get selected() {
					return selectedRows;
				},
				set selected($$value) {
					selectedRows = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!---->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-Bfx7QyHn.js.map
