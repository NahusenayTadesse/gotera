import { a0 as head, T as derived, a9 as escape_html, $ as attr, ae as store_get, af as unsubscribe_stores } from '../../../../chunks/server.js-CPNQ0GBv.js';
import { g as goto } from '../../../../chunks/client.js-7a-rpZlk.js';
import { p as page } from '../../../../chunks/state.js-BDNoTQbo.js';
import { F as FilterMenu } from '../../../../chunks/FilterMenu.js-B2Y5Z2zO.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../chunks/data-table-sort.js-5j19d0fG.js';
import { I as InputComp } from '../../../../chunks/InputComp.js-DjIGM0dz.js';
import { E as Errors } from '../../../../chunks/Errors.js-PqimIvij.js';
import { S as Statuses } from '../../../../chunks/statuses.js-e5MBhLkL.js';
import { P as Plus } from '../../../../chunks/plus.js-Dl_Aa2en.js';
import { R as RowActions } from '../../../../chunks/RowActions.js-BjVX08YE.js';
import { X } from '../../../../chunks/dialog.js-BhMsigOw.js';
import { B as Button } from '../../../../chunks/button.js-DMlVoc1I.js';
import { L as LoadingBtn } from '../../../../chunks/LoadingBtn.js-CvQQ0uH0.js';
import { C as Card, b as Card_header, a as Card_content, c as Card_title } from '../../../../chunks/card.js-DgfKxiLl.js';
import { b as superForm } from '../../../../chunks/client2.js--SBYKgBt.js';
import { a as zodClient } from '../../../../chunks/adapters.js-D4rGtFDl.js';
import { f as formatGBP } from '../../../../chunks/format.js-D8oyWA_y.js';
import { p as planSchema } from '../../../../chunks/schema12.js-DRMVgqk9.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/routing.js-CU5UDpt8.js';
import '../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/internal2.js-CNjKCACj.js';
import '../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../chunks/toast-state.svelte.js-B2UfxrKz.js';
import '../../../../chunks/Icon.js-C-2f-rrd.js';
import '../../../../chunks/chart-area.js-QvFMlwKF.js';
import '../../../../chunks/minus.js-ESxlDJzH.js';
import '../../../../chunks/popover.js-CeZILK5T.js';
import '../../../../chunks/scroll-lock.js-DAwGTwcu.js';
import '../../../../chunks/create-id.js-DpR0oe6q.js';
import '../../../../chunks/hidden-input.js-BsjuO7xd.js';
import '../../../../chunks/sr-only-styles.js-P-cDEe1k.js';
import '../../../../chunks/popper-layer-force-mount.js-CzkC2vS6.js';
import '../../../../chunks/safe-polygon.svelte.js-Dl7S_9Eh.js';
import '../../../../chunks/utils2.js-BChetszu.js';
import '../../../../chunks/command.js-CqffWVq4.js';
import '../../../../chunks/tooltip.js-e17nlGw5.js';
import '../../../../chunks/scroll-area.js-DLUPG4gi.js';
import '../../../../chunks/label.js-FcotYhKU.js';
import '../../../../chunks/chevron-down.js-ol8PFekw.js';
import '../../../../chunks/dropdown-menu.js-BjUEFyFe.js';
import '../../../../chunks/menu.js-CrFfA9Yr.js';
import '../../../../chunks/input.js-BYtfwuM9.js';
import '../../../../chunks/global.svelte.js-Bc9BkX_a.js';
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
import '../../../../chunks/forms.js-1iUoLEd8.js';
import '../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../chunks/stores.js-DMULTZRY.js';
import '../../../../index.js-CNe0N484.js';
import '../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../chunks/access.js-HgBsL8za.js';

//#region src/routes/dashboard/plans/columns.ts
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
		accessorKey: "name",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Name",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => row.original.featured ? `${row.original.name} ★` : row.original.name
	},
	{
		accessorKey: "slug",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Slug",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	},
	{
		accessorKey: "kind",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Kind",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	},
	{
		accessorKey: "pricePence",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Price",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => formatGBP(info.getValue())
	},
	{
		accessorKey: "sortOrder",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Sort Order",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	},
	{
		accessorKey: "active",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Status",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => renderComponent(Statuses, { status: row.original.active ? "active" : "inactive" })
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => renderComponent(RowActions, {
			id: row.original.id,
			label: "plan"
		})
	}
];
//#endregion
//#region src/routes/dashboard/plans/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		let filteredRows = data.rows;
		const kinds = [
			{
				value: "subscription",
				name: "Subscription"
			},
			{
				value: "order",
				name: "One-off order"
			},
			{
				value: "gift",
				name: "Gift"
			}
		];
		const intervals = [
			{
				value: "monthly",
				name: "Monthly"
			},
			{
				value: "bi_monthly",
				name: "Bi-monthly"
			},
			{
				value: "one_time",
				name: "One-time"
			}
		];
		const editingId = derived(() => page.url.searchParams.get("edit"));
		const adding = derived(() => page.url.searchParams.has("add"));
		const showForm = derived(() => adding() || !!editingId());
		const { form, errors, delayed, allErrors} = superForm(data.form, {
			dataType: "json",
			resetForm: false,
			invalidateAll: true,
			validators: zodClient(planSchema),
			onUpdated({ form: f }) {
				if (f.valid) goto(page.url.pathname, {
					});
			}
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("1ip0aps", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Plans</title>`);
				});
			});
			$$renderer.push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-4"><h1 class="dash-heading text-2xl font-semibold">Plans</h1> `);
			Button($$renderer, {
				href: "?add=1",
				children: ($$renderer) => {
					Plus($$renderer, { class: "h-4 w-4" });
					$$renderer.push(`<!----> Add Plan`);
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
													$$renderer.push(`<!---->${escape_html(editingId() ? "Edit Plan" : "Add Plan")}`);
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
										$$renderer.push(`<form method="POST"${attr("action", editingId() ? "?/edit" : "?/add")} id="plan-form" class="flex flex-col gap-4">`);
										Errors($$renderer, { allErrors: store_get($$store_subs ??= {}, "$allErrors", allErrors) });
										$$renderer.push(`<!----> `);
										if (editingId()) {
											$$renderer.push("<!--[0-->");
											$$renderer.push(`<input type="hidden" name="id"${attr("value", store_get($$store_subs ??= {}, "$form", form).id)}/>`);
										} else $$renderer.push("<!--[-1-->");
										$$renderer.push(`<!--]--> `);
										InputComp($$renderer, {
											label: "Name",
											form,
											errors,
											type: "text",
											name: "name",
											placeholder: "Regular",
											required: true
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Slug",
											form,
											errors,
											type: "text",
											name: "slug",
											placeholder: "regular",
											required: true
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Subtitle",
											form,
											errors,
											type: "text",
											name: "subtitle",
											placeholder: "Our core plan."
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Kind",
											form,
											errors,
											type: "select",
											name: "kind",
											items: kinds,
											required: true
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Interval",
											form,
											errors,
											type: "select",
											name: "interval",
											items: intervals,
											required: true
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Price (pence)",
											form,
											errors,
											type: "number",
											name: "pricePence",
											placeholder: "2400",
											required: true
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Packs",
											form,
											errors,
											type: "number",
											name: "packs",
											min: "1",
											placeholder: "1"
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Frequency label",
											form,
											errors,
											type: "text",
											name: "freqLabel",
											placeholder: "Monthly · 4 packs"
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Bullets (one per line)",
											form,
											errors,
											type: "textarea",
											name: "bullets",
											placeholder: "Best value\nMost popular"
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Stripe price ID",
											form,
											errors,
											type: "text",
											name: "stripePriceId",
											placeholder: "price_..."
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Sort order",
											form,
											errors,
											type: "number",
											name: "sortOrder",
											placeholder: "0"
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Default quantity",
											form,
											errors,
											type: "number",
											name: "quantity",
											min: "1",
											placeholder: "1"
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Featured",
											form,
											errors,
											type: "checkboxSingle",
											name: "featured",
											placeholder: "Featured"
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Status",
											form,
											errors,
											type: "checkboxSingle",
											name: "active",
											placeholder: "Active"
										});
										$$renderer.push(`<!----> `);
										Button($$renderer, {
											type: "submit",
											form: "plan-form",
											children: ($$renderer) => {
												if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
													$$renderer.push("<!--[0-->");
													LoadingBtn($$renderer, { name: editingId() ? "Saving" : "Adding" });
												} else {
													$$renderer.push("<!--[-1-->");
													$$renderer.push(`${escape_html(editingId() ? "Save changes" : "Add plan")}`);
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
					"kind",
					"interval",
					"active",
					"featured"
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
				fileName: "Plans"
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
//# sourceMappingURL=_page.svelte.js-BiJTgyRw.js.map
