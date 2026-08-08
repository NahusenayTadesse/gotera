import { a0 as head, T as derived, a9 as escape_html, $ as attr, ae as store_get, af as unsubscribe_stores } from '../../../../../chunks/server.js-CPNQ0GBv.js';
import { g as goto } from '../../../../../chunks/client.js-7a-rpZlk.js';
import { p as page } from '../../../../../chunks/state.js-BDNoTQbo.js';
import { F as FilterMenu } from '../../../../../chunks/FilterMenu.js-B2Y5Z2zO.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../../chunks/data-table-sort.js-5j19d0fG.js';
import { I as InputComp } from '../../../../../chunks/InputComp.js-DjIGM0dz.js';
import { E as Errors } from '../../../../../chunks/Errors.js-PqimIvij.js';
import { S as Statuses } from '../../../../../chunks/statuses.js-e5MBhLkL.js';
import { P as Plus } from '../../../../../chunks/plus.js-Dl_Aa2en.js';
import { R as RowActions } from '../../../../../chunks/RowActions.js-BjVX08YE.js';
import { X } from '../../../../../chunks/dialog.js-BhMsigOw.js';
import { B as Button } from '../../../../../chunks/button.js-DMlVoc1I.js';
import { L as LoadingBtn } from '../../../../../chunks/LoadingBtn.js-CvQQ0uH0.js';
import { f as formatEthiopianDate } from '../../../../../chunks/global.svelte.js-Bc9BkX_a.js';
import { C as Card, b as Card_header, a as Card_content, c as Card_title } from '../../../../../chunks/card.js-DgfKxiLl.js';
import { b as superForm } from '../../../../../chunks/client2.js--SBYKgBt.js';
import { a as zodClient } from '../../../../../chunks/adapters.js-D4rGtFDl.js';
import { s as subscriptionSchema } from '../../../../../chunks/schema11.js-Baqr_2q6.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/routing.js-CU5UDpt8.js';
import '../../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../chunks/internal2.js-CNjKCACj.js';
import '../../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../../chunks/toast-state.svelte.js-B2UfxrKz.js';
import '../../../../../chunks/Icon.js-C-2f-rrd.js';
import '../../../../../chunks/chart-area.js-QvFMlwKF.js';
import '../../../../../chunks/minus.js-ESxlDJzH.js';
import '../../../../../chunks/popover.js-CeZILK5T.js';
import '../../../../../chunks/scroll-lock.js-DAwGTwcu.js';
import '../../../../../chunks/create-id.js-DpR0oe6q.js';
import '../../../../../chunks/hidden-input.js-BsjuO7xd.js';
import '../../../../../chunks/sr-only-styles.js-P-cDEe1k.js';
import '../../../../../chunks/popper-layer-force-mount.js-CzkC2vS6.js';
import '../../../../../chunks/safe-polygon.svelte.js-Dl7S_9Eh.js';
import '../../../../../chunks/utils2.js-BChetszu.js';
import '../../../../../chunks/command.js-CqffWVq4.js';
import '../../../../../chunks/tooltip.js-e17nlGw5.js';
import '../../../../../chunks/scroll-area.js-DLUPG4gi.js';
import '../../../../../chunks/label.js-FcotYhKU.js';
import '../../../../../chunks/chevron-down.js-ol8PFekw.js';
import '../../../../../chunks/dropdown-menu.js-BjUEFyFe.js';
import '../../../../../chunks/menu.js-CrFfA9Yr.js';
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
import '../../../../../chunks/forms.js-1iUoLEd8.js';
import '../../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../../chunks/stores.js-DMULTZRY.js';
import '../../../../../index.js-CNe0N484.js';
import '../../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../chunks/access.js-HgBsL8za.js';

//#region src/routes/dashboard/orders/subscriptions/columns.ts
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
		accessorKey: "cancelAtPeriodEnd",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Cancels at period end",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => info.getValue() ? "Yes" : "No"
	},
	{
		accessorKey: "currentPeriodEnd",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Renews / ends",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => info.getValue() ? formatEthiopianDate(new Date(info.getValue())) : "—"
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => renderComponent(RowActions, {
			id: row.original.id,
			label: "subscription"
		})
	}
];
//#endregion
//#region src/routes/dashboard/orders/subscriptions/+page.svelte
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
				value: "active",
				name: "Active"
			},
			{
				value: "paused",
				name: "Paused"
			},
			{
				value: "cancelled",
				name: "Cancelled"
			}
		];
		const editingId = derived(() => page.url.searchParams.get("edit"));
		const adding = derived(() => page.url.searchParams.has("add"));
		const showForm = derived(() => adding() || !!editingId());
		const { form, errors, delayed, allErrors} = superForm(data.form, {
			dataType: "json",
			resetForm: false,
			invalidateAll: true,
			validators: zodClient(subscriptionSchema),
			onUpdated({ form: f }) {
				if (f.valid) goto(page.url.pathname, {
					});
			}
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("9v8spa", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Subscriptions</title>`);
				});
			});
			$$renderer.push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-4"><h1 class="dash-heading text-2xl font-semibold">Subscriptions</h1> `);
			Button($$renderer, {
				href: "?add=1",
				children: ($$renderer) => {
					Plus($$renderer, { class: "h-4 w-4" });
					$$renderer.push(`<!----> Add Subscription`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> `);
			if (showForm()) {
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
													$$renderer.push(`<!---->${escape_html(editingId() ? "Edit Subscription" : "Add Subscription")}`);
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
										$$renderer.push(`<form method="POST"${attr("action", editingId() ? "?/edit" : "?/add")} id="subscription-form" class="flex flex-col gap-4">`);
										Errors($$renderer, { allErrors: store_get($$store_subs ??= {}, "$allErrors", allErrors) });
										$$renderer.push(`<!----> `);
										if (editingId()) {
											$$renderer.push("<!--[0-->");
											$$renderer.push(`<input type="hidden" name="id"${attr("value", store_get($$store_subs ??= {}, "$form", form).id)}/>`);
										} else $$renderer.push("<!--[-1-->");
										$$renderer.push(`<!--]--> `);
										InputComp($$renderer, {
											label: "Customer",
											form,
											errors,
											type: "select",
											name: "subscriberId",
											items: data.subscriberOptions,
											required: true
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Plan",
											form,
											errors,
											type: "select",
											name: "planId",
											items: data.planOptions,
											required: true
										});
										$$renderer.push(`<!----> `);
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
											label: "Cancellation",
											form,
											errors,
											type: "checkboxSingle",
											name: "cancelAtPeriodEnd",
											placeholder: "Cancel at period end"
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
											form: "subscription-form",
											children: ($$renderer) => {
												if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
													$$renderer.push("<!--[0-->");
													LoadingBtn($$renderer, { name: editingId() ? "Saving" : "Adding" });
												} else {
													$$renderer.push("<!--[-1-->");
													$$renderer.push(`${escape_html(editingId() ? "Save changes" : "Add subscription")}`);
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
				filterKeys: [
					"status",
					"planName",
					"cancelAtPeriodEnd"
				],
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
				fileName: "Subscriptions"
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
//# sourceMappingURL=_page.svelte.js-CFoEgiTc.js.map
