import { a0 as head, ag as store_mutate, ae as store_get, a6 as escape_html, af as unsubscribe_stores } from '../../../../chunks/server.js-qDPizQqb.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../chunks/data-table-sort.js-DI5dH2-_.js';
import { I as InputComp } from '../../../../chunks/InputComp.js-ZVACorVu.js';
import { F as FilterMenu } from '../../../../chunks/FilterMenu.js-BfdYSGhm.js';
import { S as Statuses } from '../../../../chunks/statuses.js-CqI0SEDd.js';
import { E as EmailSenderPicker, S as Send } from '../../../../chunks/EmailSenderPicker.js-CnPk6m9r.js';
import { B as Button } from '../../../../chunks/button.js-DWWbYMWk.js';
import { f as formatEthiopianDate } from '../../../../chunks/global.svelte.js-Dj9QIDov.js';
import { L as LoadingBtn } from '../../../../chunks/LoadingBtn.js-CYZ6Npjp.js';
import { C as Card, b as Card_header, a as Card_content, c as Card_title, d as Card_description } from '../../../../chunks/card.js-CLGpEPTV.js';
import { b as superForm } from '../../../../chunks/client2.js-CuhGksyF.js';
import { a as zodClient } from '../../../../chunks/adapters.js-CrMSDpnl.js';
import { E as Errors } from '../../../../chunks/Errors.js-Czh0cSzk.js';
import { S as Select_cell, a as Select_header } from '../../../../chunks/select-cell.js-s6g7JHlM.js';
import { b as bulkEmailSchema } from '../../../../chunks/bulkEmail.js-CU4bRlQ5.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/scroll-lock.js-BWPmsymw.js';
import '../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../chunks/index-server2.js-C2dghAGm.js';
import '../../../../chunks/create-id.js-BHb4azHX.js';
import '../../../../chunks/state.js-PKYHL-GZ.js';
import '../../../../chunks/client.js-D8k391-h.js';
import '../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../chunks/internal2.js-Ce3aipJv.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';
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
import '../../../../chunks/x.js-TlRuKVU4.js';
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

//#region src/routes/dashboard/bulk-email/columns.ts
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
		accessorKey: "customerType",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Customer Type",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => renderComponent(Statuses, { status: row.original.customerType })
	},
	{
		accessorKey: "marketingOptIn",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Marketing",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => renderComponent(Statuses, { status: row.original.marketingOptIn ? "yes" : "no" })
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
	}
];
//#endregion
//#region src/routes/dashboard/bulk-email/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		let filteredRows = data.rows;
		let selectedRows = [];
		const { form, errors, delayed, allErrors} = superForm(data.bulkEmailForm, {
			dataType: "json",
			resetForm: false,
			invalidateAll: false,
			validators: zodClient(bulkEmailSchema),
			onUpdated({ form: f }) {
				if (f.valid) {
					store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).subject = "");
					store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).message = "");
				}
			}
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("10nppv5", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Bulk Email</title>`);
				});
			});
			$$renderer.push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-4"><h1 class="dash-heading text-2xl font-semibold">Bulk Email</h1></div> `);
			FilterMenu($$renderer, {
				data: data.rows,
				filterKeys: [
					"customerType",
					"marketingOptIn",
					"isActive"
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
				fileName: "Customers",
				get selected() {
					return selectedRows;
				},
				set selected($$value) {
					selectedRows = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			if (Card) {
				$$renderer.push("<!--[-->");
				Card($$renderer, {
					class: "mt-8 w-full",
					children: ($$renderer) => {
						if (Card_header) {
							$$renderer.push("<!--[-->");
							Card_header($$renderer, {
								children: ($$renderer) => {
									if (Card_title) {
										$$renderer.push("<!--[-->");
										Card_title($$renderer, {
											children: ($$renderer) => {
												$$renderer.push(`<!---->Compose email`);
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
												if (selectedRows.length > 0) {
													$$renderer.push("<!--[0-->");
													$$renderer.push(`Sending to ${escape_html(selectedRows.length)} selected customer${escape_html(selectedRows.length === 1 ? "" : "s")}.`);
												} else {
													$$renderer.push("<!--[-1-->");
													$$renderer.push(`Tick customers in the table above (use the filters to narrow by customer type), then write
				your email below.`);
												}
												$$renderer.push(`<!--]-->`);
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
									$$renderer.push(`<form method="POST" action="?/sendBulkEmail" id="bulk-email-form" class="flex flex-col gap-4">`);
									Errors($$renderer, { allErrors: store_get($$store_subs ??= {}, "$allErrors", allErrors) });
									$$renderer.push(`<!----> `);
									EmailSenderPicker($$renderer, {
										get value() {
											return store_get($$store_subs ??= {}, "$form", form).sender;
										},
										set value($$value) {
											store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).sender = $$value);
											$$settled = false;
										}
									});
									$$renderer.push(`<!----> `);
									InputComp($$renderer, {
										label: "Subject",
										form,
										errors,
										type: "text",
										name: "subject",
										placeholder: "What's this email about?",
										required: true
									});
									$$renderer.push(`<!----> `);
									InputComp($$renderer, {
										label: "Message",
										form,
										errors,
										type: "richtext",
										name: "message",
										placeholder: "Write your message..."
									});
									$$renderer.push(`<!----> `);
									Button($$renderer, {
										type: "submit",
										form: "bulk-email-form",
										disabled: selectedRows.length === 0 || store_get($$store_subs ??= {}, "$delayed", delayed),
										class: "w-fit",
										children: ($$renderer) => {
											if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
												$$renderer.push("<!--[0-->");
												LoadingBtn($$renderer, { name: "Sending" });
											} else {
												$$renderer.push("<!--[-1-->");
												Send($$renderer, { class: "h-4 w-4" });
												$$renderer.push(`<!----> Send to ${escape_html(selectedRows.length)} customer${escape_html(selectedRows.length === 1 ? "" : "s")}`);
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
//# sourceMappingURL=_page.svelte.js-f3bsiDgT.js.map
