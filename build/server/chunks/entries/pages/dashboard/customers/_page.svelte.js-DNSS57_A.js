import { a0 as head, T as derived, a6 as escape_html, $ as attr, ae as store_get, af as unsubscribe_stores } from '../../../../chunks/server.js-qDPizQqb.js';
import { g as goto } from '../../../../chunks/client.js-D8k391-h.js';
import { p as page } from '../../../../chunks/state.js-PKYHL-GZ.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../chunks/data-table-sort.js-DI5dH2-_.js';
import { I as InputComp } from '../../../../chunks/InputComp.js-ZVACorVu.js';
import { F as FilterMenu } from '../../../../chunks/FilterMenu.js-BfdYSGhm.js';
import { S as Statuses } from '../../../../chunks/statuses.js-CqI0SEDd.js';
import { P as Plus } from '../../../../chunks/plus.js-l9nzajpf.js';
import { X } from '../../../../chunks/x.js-TlRuKVU4.js';
import { B as Button } from '../../../../chunks/button.js-DWWbYMWk.js';
import { f as formatEthiopianDate } from '../../../../chunks/global.svelte.js-Dj9QIDov.js';
import { L as LoadingBtn } from '../../../../chunks/LoadingBtn.js-CYZ6Npjp.js';
import { C as Card, b as Card_header, a as Card_content, c as Card_title } from '../../../../chunks/card.js-CLGpEPTV.js';
import { b as superForm } from '../../../../chunks/client2.js-CuhGksyF.js';
import { a as zodClient } from '../../../../chunks/adapters.js-CrMSDpnl.js';
import { R as RowActions } from '../../../../chunks/RowActions.js-CF83FWgG.js';
import { E as Errors } from '../../../../chunks/Errors.js-Czh0cSzk.js';
import { s as subscriberSchema } from '../../../../chunks/schema9.js-B0lOovCM.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/internal2.js-Ce3aipJv.js';
import '../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../chunks/scroll-lock.js-BWPmsymw.js';
import '../../../../chunks/index-server2.js-C2dghAGm.js';
import '../../../../chunks/create-id.js-BHb4azHX.js';
import '../../../../chunks/Icon.js-Dm6aSBgb.js';
import '../../../../chunks/chevron-down.js-BUTnRWsm.js';
import '../../../../chunks/scroll-area.js-DdAKf2Fa.js';
import '../../../../chunks/utils2.js-BmcH287A.js';
import '../../../../chunks/dropdown-menu.js-DR8iffqj.js';
import '../../../../chunks/check.js-BvFzUyRW.js';
import '../../../../chunks/minus.js-JH-UUVfm.js';
import '../../../../chunks/popper-layer-force-mount.js-C6YTj-1w.js';
import '../../../../chunks/menu.js-B_FjgJQX.js';
import '../../../../chunks/is-mobile.svelte.js-CSeMNCH2.js';
import '../../../../chunks/input.js-DivymZKU.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../chunks/toast-state.svelte.js-CyESMgTY.js';
import '../../../../chunks/badge-check.js-YjTSRpIb.js';
import '../../../../chunks/chevron-left.js-CzlLlj9a.js';
import '../../../../chunks/chevron-right.js-Bu3_elXi.js';
import '../../../../chunks/SelectComp.js-CBQ76iZ1.js';
import '../../../../chunks/hidden-input.js-C81YZGmV.js';
import '../../../../chunks/sr-only-styles.js-Bstyupqo.js';
import '../../../../chunks/popover.js-DgEWMg7U.js';
import '../../../../chunks/safe-polygon.svelte.js-CKn9Kv9j.js';
import '../../../../chunks/circle-alert.js-C4ujrG9B.js';
import '../../../../chunks/loader.js-BCe2CTsg.js';
import '../../../../chunks/command.js-Ddw69Zfe.js';
import '../../../../chunks/search.js-B59c9lYY.js';
import '../../../../chunks/dialog-overlay.js-8KJVmKPf.js';
import '../../../../chunks/label.js-B89gGnUJ.js';
import '../../../../chunks/textarea.js-BMgrLLbk.js';
import '../../../../chunks/checkbox2.js-CIPP1KlT.js';
import '../../../../chunks/checkbox.js-Q6JAT58V.js';
import 'browser-image-compression';
import '../../../../index.js-CZsLKCjb.js';
import '../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../chunks/activity.js-DMIkPBp9.js';
import '../../../../chunks/chart-area.js-CHQrzPbW.js';
import '../../../../chunks/tooltip.js-CYjxtSnB.js';
import '../../../../chunks/truck.js-CAOAaqne.js';
import '../../../../chunks/forms.js-DNc1GIZe.js';
import '../../../../chunks/stores.js-Bau3W-nc.js';
import '../../../../chunks/access.js-j1_SnSd1.js';
import '../../../../chunks/ellipsis.js-Dns71XaR.js';
import '../../../../chunks/pencil.js-DI8R1Xzc.js';
import '../../../../chunks/trash-2.js-CiUzWTiQ.js';

//#region src/routes/dashboard/customers/columns.ts
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
		accessorKey: "fullName",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Name",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => info.getValue() || "—"
	},
	{
		accessorKey: "email",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Email",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	},
	{
		accessorKey: "phone",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Phone",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => info.getValue() || "—"
	},
	{
		accessorKey: "subscriptionCount",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Subscriptions",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	},
	{
		accessorKey: "isActive",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Status",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => renderComponent(Statuses, { status: row.original.isActive ? "active" : "inactive" })
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Joined",
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
			label: "customer"
		})
	}
];
//#endregion
//#region src/routes/dashboard/customers/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		let filteredRows = data.rows;
		const editingId = derived(() => page.url.searchParams.get("edit"));
		const adding = derived(() => page.url.searchParams.has("add"));
		const showForm = derived(() => adding() || !!editingId());
		const { form, errors, delayed, allErrors} = superForm(data.form, {
			dataType: "json",
			resetForm: false,
			invalidateAll: true,
			validators: zodClient(subscriberSchema),
			onUpdated({ form: f }) {
				if (f.valid) goto(page.url.pathname, {
					});
			}
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("16mfrz9", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Customers</title>`);
				});
			});
			$$renderer.push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-4"><h1 class="dash-heading text-2xl font-semibold">Customers</h1> `);
			Button($$renderer, {
				href: "?add=1",
				children: ($$renderer) => {
					Plus($$renderer, { class: "h-4 w-4" });
					$$renderer.push(`<!----> Add Customer`);
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
													$$renderer.push(`<!---->${escape_html(editingId() ? "Edit Customer" : "Add Customer")}`);
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
										$$renderer.push(`<form method="POST"${attr("action", editingId() ? "?/edit" : "?/add")} id="customer-form" class="flex flex-col gap-4">`);
										Errors($$renderer, { allErrors: store_get($$store_subs ??= {}, "$allErrors", allErrors) });
										$$renderer.push(`<!----> `);
										if (editingId()) {
											$$renderer.push("<!--[0-->");
											$$renderer.push(`<input type="hidden" name="id"${attr("value", store_get($$store_subs ??= {}, "$form", form).id)}/>`);
										} else $$renderer.push("<!--[-1-->");
										$$renderer.push(`<!--]--> `);
										InputComp($$renderer, {
											label: "Full name",
											form,
											errors,
											type: "text",
											name: "fullName",
											placeholder: "Jane Doe"
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Email",
											form,
											errors,
											type: "email",
											name: "email",
											placeholder: "jane@example.com",
											required: true
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Phone",
											form,
											errors,
											type: "tel",
											name: "phone",
											placeholder: "+44 7...",
											required: true
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Marketing",
											form,
											errors,
											type: "checkboxSingle",
											name: "marketingOptIn",
											placeholder: "Receives marketing emails"
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
											form: "customer-form",
											children: ($$renderer) => {
												if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
													$$renderer.push("<!--[0-->");
													LoadingBtn($$renderer, { name: editingId() ? "Saving" : "Adding" });
												} else {
													$$renderer.push("<!--[-1-->");
													$$renderer.push(`${escape_html(editingId() ? "Save changes" : "Add customer")}`);
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
				filterKeys: ["isActive", "marketingOptIn"],
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
				fileName: "Customers"
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
//# sourceMappingURL=_page.svelte.js-DNSS57_A.js.map
