import { a0 as head, T as derived, ae as store_get, $ as attr, af as unsubscribe_stores } from '../../../../../chunks/server.js-CPNQ0GBv.js';
import { g as goto } from '../../../../../chunks/client.js-gbEA-723.js';
import { p as page } from '../../../../../chunks/state.js-COqmE8cz.js';
import { F as FilterMenu } from '../../../../../chunks/FilterMenu.js-f3LM4b9Y.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../../chunks/data-table-sort.js-BaXmwuLm.js';
import { I as InputComp } from '../../../../../chunks/InputComp.js--TQ2T4TX.js';
import { E as Errors } from '../../../../../chunks/Errors.js-DYhtXrxd.js';
import { S as Statuses } from '../../../../../chunks/statuses.js-DdAFh5TI.js';
import { R as RowActions } from '../../../../../chunks/RowActions.js-DX976CuS.js';
import { X } from '../../../../../chunks/dialog.js-CNnZpwDX.js';
import { B as Button } from '../../../../../chunks/button.js-DMlVoc1I.js';
import { L as LoadingBtn } from '../../../../../chunks/LoadingBtn.js-B86u0wY7.js';
import { f as formatEthiopianDate } from '../../../../../chunks/global.svelte.js-Cx8Mv6jx.js';
import { C as Card, b as Card_header, a as Card_content, c as Card_title } from '../../../../../chunks/card.js-DgfKxiLl.js';
import { b as superForm } from '../../../../../chunks/client2.js-BQ9y1BAm.js';
import { a as zodClient } from '../../../../../chunks/adapters.js-fGoXMZOl.js';
import { g as guestOrderSchema } from '../../../../../chunks/schema9.js-C0x4Sr6K.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/routing.js-CU5UDpt8.js';
import '../../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../chunks/internal2.js-Cg6Fvaqd.js';
import '../../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../../chunks/toast-state.svelte.js-B2UfxrKz.js';
import '../../../../../chunks/Icon.js-C-2f-rrd.js';
import '../../../../../chunks/chart-area.js-QvFMlwKF.js';
import '../../../../../chunks/minus.js-ESxlDJzH.js';
import '../../../../../chunks/popover.js-D7HUu4n6.js';
import '../../../../../chunks/scroll-lock.js-DHsXOzO5.js';
import '../../../../../chunks/create-id.js-ChicdcAh.js';
import '../../../../../chunks/hidden-input.js-YZizwPAN.js';
import '../../../../../chunks/sr-only-styles.js-yoXwszuh.js';
import '../../../../../chunks/popper-layer-force-mount.js-B6h_X5Ed.js';
import '../../../../../chunks/safe-polygon.svelte.js-C4wqwQGo.js';
import '../../../../../chunks/utils2.js-BChetszu.js';
import '../../../../../chunks/command.js-C6EqICGc.js';
import '../../../../../chunks/tooltip.js-VqjggVyG.js';
import '../../../../../chunks/scroll-area.js-BG2EJRIs.js';
import '../../../../../chunks/label.js-BszTJLDi.js';
import '../../../../../chunks/chevron-down.js-ol8PFekw.js';
import '../../../../../chunks/dropdown-menu.js-CI6WexMj.js';
import '../../../../../chunks/menu.js--wyTAI_l.js';
import '../../../../../chunks/input.js-BYtfwuM9.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../../chunks/badge-check.js-Dc-hXwTK.js';
import '../../../../../chunks/chevron-left.js-Dl5KW7W_.js';
import '../../../../../chunks/chevron-right.js-ChVD6BGK.js';
import '../../../../../chunks/circle-alert.js-BYQ_-QxX.js';
import 'browser-image-compression';
import '../../../../../chunks/truck.js-rfGMc_Yv.js';
import '../../../../../chunks/ellipsis.js-BNid1SJZ.js';
import '../../../../../chunks/pencil.js-BNjnhhMl.js';
import '../../../../../chunks/forms.js-C2B4g7LG.js';
import '../../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../../chunks/stores.js-BKcqi_f1.js';
import '../../../../../index.js-8fXOoxmJ.js';
import '../../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../chunks/access.js-Cygy5klO.js';

//#region src/routes/dashboard/orders/guest/columns.ts
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
			name: "Placed",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => formatEthiopianDate(new Date(info.getValue()))
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => renderComponent(RowActions, {
			id: row.original.id,
			label: "guest order"
		})
	}
];
//#endregion
//#region src/routes/dashboard/orders/guest/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		let filteredRows = data.rows;
		const statuses = [
			{
				value: "pending",
				name: "Pending"
			},
			{
				value: "paid",
				name: "Paid"
			},
			{
				value: "fulfilled",
				name: "Fulfilled"
			}
		];
		const editingId = derived(() => page.url.searchParams.get("edit"));
		const { form, errors, delayed, allErrors} = superForm(data.form, {
			dataType: "json",
			resetForm: false,
			invalidateAll: true,
			validators: zodClient(guestOrderSchema),
			onUpdated({ form: f }) {
				if (f.valid) goto(page.url.pathname, {
					});
			}
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("1xf6vcw", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Guest Orders</title>`);
				});
			});
			$$renderer.push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-4"><h1 class="dash-heading text-2xl font-semibold">Guest Orders</h1></div> `);
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
													$$renderer.push(`<!---->Edit Guest Order`);
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
										$$renderer.push(`<form method="POST" action="?/edit" id="guest-order-form" class="flex flex-col gap-4">`);
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
											label: "Buyer email",
											form,
											errors,
											type: "email",
											name: "buyerEmail",
											placeholder: "jane@example.com"
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Quantity",
											form,
											errors,
											type: "number",
											name: "quantity",
											min: "1",
											placeholder: "1"
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
											form: "guest-order-form",
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
				filterKeys: ["status"],
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
				fileName: "Guest Orders"
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
//# sourceMappingURL=_page.svelte.js-BFlVmGQe.js.map
