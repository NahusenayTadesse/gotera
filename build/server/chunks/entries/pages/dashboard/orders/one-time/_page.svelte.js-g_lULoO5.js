import { a0 as head, T as derived, ae as store_get, $ as attr, af as unsubscribe_stores } from '../../../../../chunks/server.js-qDPizQqb.js';
import { g as goto } from '../../../../../chunks/client.js-lcRmDm_g.js';
import { p as page } from '../../../../../chunks/state.js-BVJR4UXW.js';
import { F as FilterMenu } from '../../../../../chunks/FilterMenu.js-BjbARZ0-.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../../chunks/data-table-sort.js-D2nlKcr_.js';
import { I as InputComp } from '../../../../../chunks/InputComp.js-DpxpEGST.js';
import { S as Statuses } from '../../../../../chunks/statuses.js-CqI0SEDd.js';
import { X } from '../../../../../chunks/x.js-TlRuKVU4.js';
import { B as Button } from '../../../../../chunks/button.js-DWWbYMWk.js';
import { f as formatEthiopianDate } from '../../../../../chunks/global.svelte.js-Dj9QIDov.js';
import { L as LoadingBtn } from '../../../../../chunks/LoadingBtn.js-CYZ6Npjp.js';
import { C as Card, b as Card_header, a as Card_content, c as Card_title } from '../../../../../chunks/card.js-CLGpEPTV.js';
import { b as superForm } from '../../../../../chunks/client2.js-CyJQ5fE8.js';
import { a as zodClient } from '../../../../../chunks/adapters.js-CQlMjbyU.js';
import { R as RowActions } from '../../../../../chunks/RowActions.js-BY8OW8jH.js';
import { E as Errors } from '../../../../../chunks/Errors.js-Czh0cSzk.js';
import { S as Select_cell, a as Select_header } from '../../../../../chunks/select-cell.js-DvLHUk0e.js';
import { B as BulkEmailDialog } from '../../../../../chunks/BulkEmailDialog.js-CmOcAab8.js';
import { o as orderSchema } from '../../../../../chunks/schema11.js-CiuJcUAG.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../chunks/internal2.js-C5oX8Rtc.js';
import '../../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../../chunks/toast-state.svelte.js-CyESMgTY.js';
import '../../../../../chunks/Icon.js-Dm6aSBgb.js';
import '../../../../../chunks/chart-area.js-CHQrzPbW.js';
import '../../../../../chunks/check.js-BvFzUyRW.js';
import '../../../../../chunks/popover.js-C5botI74.js';
import '../../../../../chunks/scroll-lock.js-CqHv4jWP.js';
import '../../../../../chunks/index-server2.js-C2dghAGm.js';
import '../../../../../chunks/create-id.js-BHb4azHX.js';
import '../../../../../chunks/popper-layer-force-mount.js-B57StPwG.js';
import '../../../../../chunks/safe-polygon.svelte.js-LqQ_XdbY.js';
import '../../../../../chunks/utils2.js-BmcH287A.js';
import '../../../../../chunks/checkbox.js-C4abJyiS.js';
import '../../../../../chunks/hidden-input.js-C81YZGmV.js';
import '../../../../../chunks/sr-only-styles.js-Bstyupqo.js';
import '../../../../../chunks/tooltip.js-DwR81Sc_.js';
import '../../../../../chunks/scroll-area.js-CQyJtNcB.js';
import '../../../../../chunks/command.js-D-5nnPhf.js';
import '../../../../../chunks/search.js-B59c9lYY.js';
import '../../../../../chunks/dialog-overlay.js-C7ZHZwQ8.js';
import '../../../../../chunks/label.js-B89gGnUJ.js';
import '../../../../../chunks/chevron-down.js-BUTnRWsm.js';
import '../../../../../chunks/dropdown-menu.js-D5_JIqOL.js';
import '../../../../../chunks/minus.js-JH-UUVfm.js';
import '../../../../../chunks/menu.js-7FcOhF2b.js';
import '../../../../../chunks/is-mobile.svelte.js-CSeMNCH2.js';
import '../../../../../chunks/input.js-DivymZKU.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../../chunks/badge-check.js-YjTSRpIb.js';
import '../../../../../chunks/chevron-left.js-CzlLlj9a.js';
import '../../../../../chunks/chevron-right.js-Bu3_elXi.js';
import '../../../../../chunks/SelectComp.js-DHbV5UZH.js';
import '../../../../../chunks/circle-alert.js-C4ujrG9B.js';
import '../../../../../chunks/loader.js-BCe2CTsg.js';
import '../../../../../chunks/textarea.js-BMgrLLbk.js';
import '../../../../../chunks/checkbox2.js-DNmj6_T9.js';
import 'browser-image-compression';
import '../../../../../index.js-Bt0ds7Zy.js';
import '../../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../../chunks/truck.js-CAOAaqne.js';
import '../../../../../chunks/forms.js-DIm94891.js';
import '../../../../../chunks/stores.js-CP2mn6hL.js';
import '../../../../../chunks/access.js-j1_SnSd1.js';
import '../../../../../chunks/ellipsis.js-Dns71XaR.js';
import '../../../../../chunks/pencil.js-DI8R1Xzc.js';
import '../../../../../chunks/trash-2.js-CiUzWTiQ.js';
import '../../../../../chunks/mail.js-QCnsJSf5.js';
import '../../../../../chunks/send.js-DyYFjFrv.js';
import '../../../../../chunks/DialogComp.js-Dv_gmm1G.js';
import '../../../../../chunks/runtime.js-CbeSlHLA.js';
import '../../../../../chunks/dialog.js-CxbB9n2U.js';
import '../../../../../chunks/bulkEmail.js-DcIy_1Go.js';

//#region src/routes/dashboard/orders/one-time/columns.ts
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
	{
		accessorKey: "recipientAddress",
		header: "Ship to",
		cell: ({ row }) => {
			const a = row.original.recipientAddress;
			return a ? `${a.line1}, ${a.city} ${a.postcode}` : "—";
		}
	},
	{
		accessorKey: "addons",
		header: "Add-ons",
		enableSorting: false,
		cell: ({ row }) => {
			const addons = row.original.addons;
			return addons?.length ? addons.map((a) => `${a.name}${a.quantity > 1 ? ` x${a.quantity}` : ""}`).join(", ") : "—";
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
			label: "order"
		})
	}
];
//#endregion
//#region src/routes/dashboard/orders/one-time/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		let filteredRows = data.rows;
		let selectedRows = [];
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
			validators: zodClient(orderSchema),
			onUpdated({ form: f }) {
				if (f.valid) goto(page.url.pathname, {
					});
			}
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("1c11l14", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>One-Time &amp; Gift Orders</title>`);
				});
			});
			$$renderer.push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-4"><h1 class="dash-heading text-2xl font-semibold">One-Time &amp; Gift Orders</h1> `);
			BulkEmailDialog($$renderer, {
				bulkEmailForm: data.bulkEmailForm,
				rows: selectedRows.map((r) => ({
					id: r.id,
					email: r.buyerEmail,
					name: r.buyerName || r.recipientName
				}))
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
													$$renderer.push(`<!---->Edit Order`);
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
										$$renderer.push(`<form method="POST" action="?/edit" id="order-form" class="flex flex-col gap-4">`);
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
											label: "Buyer name",
											form,
											errors,
											type: "text",
											name: "buyerName",
											placeholder: "Jane Doe"
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Recipient name",
											form,
											errors,
											type: "text",
											name: "recipientName",
											placeholder: "Jane Doe",
											required: true
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Gift message",
											form,
											errors,
											type: "textarea",
											name: "giftMessage",
											placeholder: "..."
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Duration (months)",
											form,
											errors,
											type: "number",
											name: "durationMonths",
											min: "1",
											placeholder: "1"
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
											form: "order-form",
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
				fileName: "One-Time and Gift Orders",
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
//# sourceMappingURL=_page.svelte.js-g_lULoO5.js.map
