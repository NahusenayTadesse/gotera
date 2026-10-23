import { a0 as head, T as derived, a6 as escape_html, $ as attr, ae as store_get, af as unsubscribe_stores } from '../../../../chunks/server.js-qDPizQqb.js';
import { r as resolve } from '../../../../chunks/paths.js-CsbWBvv1.js';
import { g as goto } from '../../../../chunks/client.js-lcRmDm_g.js';
import { p as page } from '../../../../chunks/state.js-BVJR4UXW.js';
import { F as FilterMenu } from '../../../../chunks/FilterMenu.js-BjbARZ0-.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../chunks/data-table-sort.js-D2nlKcr_.js';
import { I as InputComp } from '../../../../chunks/InputComp.js-DpxpEGST.js';
import { S as Statuses } from '../../../../chunks/statuses.js-CqI0SEDd.js';
import { P as Plus } from '../../../../chunks/plus.js-l9nzajpf.js';
import { X } from '../../../../chunks/x.js-TlRuKVU4.js';
import { B as Button } from '../../../../chunks/button.js-DWWbYMWk.js';
import { L as LoadingBtn } from '../../../../chunks/LoadingBtn.js-CYZ6Npjp.js';
import { C as Card, b as Card_header, a as Card_content, c as Card_title } from '../../../../chunks/card.js-CLGpEPTV.js';
import { b as superForm } from '../../../../chunks/client2.js-CyJQ5fE8.js';
import { a as zodClient } from '../../../../chunks/adapters.js-CQlMjbyU.js';
import { f as formatGBP } from '../../../../chunks/format2.js-D8oyWA_y.js';
import { R as RowActions } from '../../../../chunks/RowActions.js-BY8OW8jH.js';
import { E as Errors } from '../../../../chunks/Errors.js-Czh0cSzk.js';
import { p as planSchema } from '../../../../chunks/schema14.js-BxX7KgVN.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../chunks/internal2.js-C5oX8Rtc.js';
import '../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/toast-state.svelte.js-CyESMgTY.js';
import '../../../../chunks/Icon.js-Dm6aSBgb.js';
import '../../../../chunks/chart-area.js-CHQrzPbW.js';
import '../../../../chunks/check.js-BvFzUyRW.js';
import '../../../../chunks/popover.js-C5botI74.js';
import '../../../../chunks/scroll-lock.js-CqHv4jWP.js';
import '../../../../chunks/index-server2.js-C2dghAGm.js';
import '../../../../chunks/create-id.js-BHb4azHX.js';
import '../../../../chunks/popper-layer-force-mount.js-B57StPwG.js';
import '../../../../chunks/safe-polygon.svelte.js-LqQ_XdbY.js';
import '../../../../chunks/utils2.js-BmcH287A.js';
import '../../../../chunks/checkbox.js-C4abJyiS.js';
import '../../../../chunks/hidden-input.js-C81YZGmV.js';
import '../../../../chunks/sr-only-styles.js-Bstyupqo.js';
import '../../../../chunks/tooltip.js-DwR81Sc_.js';
import '../../../../chunks/scroll-area.js-CQyJtNcB.js';
import '../../../../chunks/command.js-D-5nnPhf.js';
import '../../../../chunks/search.js-B59c9lYY.js';
import '../../../../chunks/dialog-overlay.js-C7ZHZwQ8.js';
import '../../../../chunks/label.js-B89gGnUJ.js';
import '../../../../chunks/chevron-down.js-BUTnRWsm.js';
import '../../../../chunks/dropdown-menu.js-D5_JIqOL.js';
import '../../../../chunks/minus.js-JH-UUVfm.js';
import '../../../../chunks/menu.js-7FcOhF2b.js';
import '../../../../chunks/is-mobile.svelte.js-CSeMNCH2.js';
import '../../../../chunks/input.js-DivymZKU.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../chunks/badge-check.js-YjTSRpIb.js';
import '../../../../chunks/chevron-left.js-CzlLlj9a.js';
import '../../../../chunks/chevron-right.js-Bu3_elXi.js';
import '../../../../chunks/SelectComp.js-DHbV5UZH.js';
import '../../../../chunks/global.svelte.js-Dj9QIDov.js';
import '../../../../chunks/circle-alert.js-C4ujrG9B.js';
import '../../../../chunks/loader.js-BCe2CTsg.js';
import '../../../../chunks/textarea.js-BMgrLLbk.js';
import '../../../../chunks/checkbox2.js-DNmj6_T9.js';
import 'browser-image-compression';
import '../../../../index.js-Bt0ds7Zy.js';
import '../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../chunks/truck.js-CAOAaqne.js';
import '../../../../chunks/forms.js-DIm94891.js';
import '../../../../chunks/stores.js-CP2mn6hL.js';
import '../../../../chunks/access.js-j1_SnSd1.js';
import '../../../../chunks/ellipsis.js-Dns71XaR.js';
import '../../../../chunks/pencil.js-DI8R1Xzc.js';
import '../../../../chunks/trash-2.js-CiUzWTiQ.js';

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
		const editingRow = derived(() => editingId() ? data.rows.find((r) => r.id === editingId()) : void 0);
		const showForm = derived(() => adding() || !!editingRow());
		const { form, errors, delayed, allErrors} = superForm(data.form, {
			dataType: "json",
			resetForm: false,
			invalidateAll: true,
			applyAction: "never",
			validators: zodClient(planSchema),
			onUpdated({ form: f }) {
				if (f.valid) goto(resolve("/dashboard/plans"), {
					});
			}
		});
		const intervalChoices = derived(() => store_get($$store_subs ??= {}, "$form", form).kind === "subscription" ? intervals.filter((i) => i.value !== "one_time") : intervals.filter((i) => i.value === "one_time"));
		const pricePreview = derived(() => Number.isFinite(Number(store_get($$store_subs ??= {}, "$form", form).pricePence)) ? `£${(Number(store_get($$store_subs ??= {}, "$form", form).pricePence) / 100).toFixed(2)}` : "");
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
						class: "mb-8 w-full lg:max-w-3xl",
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
													$$renderer.push(`<!---->${escape_html(editingRow() ? `Edit ${editingRow().name}` : "Add Plan")}`);
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
											"aria-label": "Close",
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
										$$renderer.push(`<form method="POST"${attr("action", editingRow() ? "?/edit" : "?/add")} id="plan-form" class="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2"><div class="md:col-span-2">`);
										Errors($$renderer, { allErrors: store_get($$store_subs ??= {}, "$allErrors", allErrors) });
										$$renderer.push(`<!----></div> <h3 class="text-muted-foreground mt-2 text-xs font-semibold tracking-wider uppercase md:col-span-2">Shown to customers</h3> `);
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
											label: "Frequency label",
											form,
											errors,
											type: "text",
											name: "freqLabel",
											placeholder: "Monthly · 4 packs"
										});
										$$renderer.push(`<!----> <div class="md:col-span-2">`);
										InputComp($$renderer, {
											label: "Bullets (one per line)",
											form,
											errors,
											type: "textarea",
											name: "bullets",
											rows: 3,
											placeholder: "One bullet per line"
										});
										$$renderer.push(`<!----></div> <h3 class="text-muted-foreground mt-4 text-xs font-semibold tracking-wider uppercase md:col-span-2">Pricing &amp; billing</h3> `);
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
											items: intervalChoices(),
											required: true
										});
										$$renderer.push(`<!----> <div>`);
										InputComp($$renderer, {
											label: "Price (pence)",
											form,
											errors,
											type: "number",
											name: "pricePence",
											min: "0",
											placeholder: "2400",
											required: true
										});
										$$renderer.push(`<!----> <p class="text-muted-foreground px-1 text-xs">${escape_html(pricePreview())}</p></div> <div>`);
										InputComp($$renderer, {
											label: "Stripe price ID",
											form,
											errors,
											type: "text",
											name: "stripePriceId",
											placeholder: "price_..."
										});
										$$renderer.push(`<!----> <p class="text-muted-foreground px-1 text-xs">Must charge the price on the left. New price? Create a new Price in Stripe and paste its ID
						— existing subscribers stay on their old one.</p></div> <h3 class="text-muted-foreground mt-4 text-xs font-semibold tracking-wider uppercase md:col-span-2">What's in it</h3> `);
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
											label: "Injera per pack",
											form,
											errors,
											type: "number",
											name: "injeraPerPack",
											min: "1",
											placeholder: "3"
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
											label: "Max per order (0 = no limit)",
											form,
											errors,
											type: "number",
											name: "maxQuantity",
											min: "0",
											placeholder: "0"
										});
										$$renderer.push(`<!----> <h3 class="text-muted-foreground mt-4 text-xs font-semibold tracking-wider uppercase md:col-span-2">Availability</h3> `);
										InputComp($$renderer, {
											label: "Available from (optional)",
											form,
											errors,
											type: "datetime-local",
											name: "availableFrom"
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Available until (optional)",
											form,
											errors,
											type: "datetime-local",
											name: "availableUntil"
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Sort order",
											form,
											errors,
											type: "number",
											name: "sortOrder",
											min: "0",
											placeholder: "0"
										});
										$$renderer.push(`<!----> <div class="flex items-end gap-6 pb-2">`);
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
										$$renderer.push(`<!----></div> <details class="mt-4 rounded-md border p-3 md:col-span-2"${attr("open", !!(editingRow()?.nameAm || editingRow()?.subtitleAm), true)}><summary class="cursor-pointer text-sm font-medium">Amharic text <span class="text-muted-foreground font-normal">(optional — blank shows English)</span></summary> <div class="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">`);
										InputComp($$renderer, {
											label: "Name (አማርኛ)",
											form,
											errors,
											type: "text",
											name: "nameAm"
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Subtitle (አማርኛ)",
											form,
											errors,
											type: "text",
											name: "subtitleAm"
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Frequency label (አማርኛ)",
											form,
											errors,
											type: "text",
											name: "freqLabelAm"
										});
										$$renderer.push(`<!----> <div class="md:col-span-2">`);
										InputComp($$renderer, {
											label: "Bullets (አማርኛ, one per line)",
											form,
											errors,
											type: "textarea",
											name: "bulletsAm",
											rows: 3
										});
										$$renderer.push(`<!----></div></div></details> <div class="mt-4 flex justify-end gap-2 md:col-span-2">`);
										Button($$renderer, {
											href: page.url.pathname,
											variant: "outline",
											children: ($$renderer) => {
												$$renderer.push(`<!---->Cancel`);
											},
											$$slots: { default: true }
										});
										$$renderer.push(`<!----> `);
										Button($$renderer, {
											type: "submit",
											disabled: store_get($$store_subs ??= {}, "$delayed", delayed),
											children: ($$renderer) => {
												if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
													$$renderer.push("<!--[0-->");
													LoadingBtn($$renderer, { name: editingRow() ? "Saving" : "Adding" });
												} else {
													$$renderer.push("<!--[-1-->");
													$$renderer.push(`${escape_html(editingRow() ? "Save changes" : "Add plan")}`);
												}
												$$renderer.push(`<!--]-->`);
											},
											$$slots: { default: true }
										});
										$$renderer.push(`<!----></div></form>`);
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
//# sourceMappingURL=_page.svelte.js-CKViDy16.js.map
