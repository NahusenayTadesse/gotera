import { a0 as head, a4 as ensure_array_like, aa as attr_class, a3 as clsx$1, a6 as escape_html, T as derived, ab as stringify$1 } from '../../../../chunks/server.js-qDPizQqb.js';
import { c as shortDate } from '../../../../chunks/format.js-DDyQH27n.js';
import { p as page } from '../../../../chunks/state.js-BVJR4UXW.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../chunks/data-table-sort.js-D2nlKcr_.js';
import { B as Ban } from '../../../../chunks/ban.js-C6mDh4Ux.js';
import { C as Circle_check } from '../../../../chunks/circle-check.js-DmqAYTdV.js';
import { S as Statuses } from '../../../../chunks/statuses.js-CqI0SEDd.js';
import { E as Eye } from '../../../../chunks/eye.js-BLnu78mV.js';
import { P as Plus } from '../../../../chunks/plus.js-l9nzajpf.js';
import { B as BatchForm, S as Shield_alert, a as BatchStatusDialog, U as UsageCell, T as Triangle_alert } from '../../../../chunks/BatchStatusDialog.js-Cnu-fLtP.js';
import { U as Undo_2 } from '../../../../chunks/undo-2.js-xy86FTlI.js';
import { W as Wand_sparkles } from '../../../../chunks/wand-sparkles.js-ChL_cO6h.js';
import { L as Label } from '../../../../chunks/label.js-B89gGnUJ.js';
import { B as Button } from '../../../../chunks/button.js-DWWbYMWk.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/client.js-lcRmDm_g.js';
import { I as Input } from '../../../../chunks/input.js-DivymZKU.js';
import { C as Card, b as Card_header, a as Card_content, d as Card_description, c as Card_title } from '../../../../chunks/card.js-CLGpEPTV.js';
import { D as Data_table_links } from '../../../../chunks/data-table-links.js-B6YEbCXj.js';
import { S as Select_cell, a as Select_header } from '../../../../chunks/select-cell.js-DvLHUk0e.js';
import '../../../../chunks/runtime.js-CbeSlHLA.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/scroll-lock.js-CqHv4jWP.js';
import '../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../chunks/index-server2.js-C2dghAGm.js';
import '../../../../chunks/create-id.js-BHb4azHX.js';
import '../../../../chunks/Icon.js-Dm6aSBgb.js';
import '../../../../chunks/chevron-down.js-BUTnRWsm.js';
import '../../../../chunks/scroll-area.js-CQyJtNcB.js';
import '../../../../chunks/utils2.js-BmcH287A.js';
import '../../../../chunks/dropdown-menu.js-D5_JIqOL.js';
import '../../../../chunks/check.js-BvFzUyRW.js';
import '../../../../chunks/minus.js-JH-UUVfm.js';
import '../../../../chunks/popper-layer-force-mount.js-B57StPwG.js';
import '../../../../chunks/menu.js-7FcOhF2b.js';
import '../../../../chunks/is-mobile.svelte.js-CSeMNCH2.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../chunks/badge-check.js-YjTSRpIb.js';
import '../../../../chunks/loader.js-BCe2CTsg.js';
import '../../../../chunks/truck.js-CAOAaqne.js';
import '../../../../chunks/toast-state.svelte.js-CyESMgTY.js';
import '../../../../chunks/x.js-TlRuKVU4.js';
import '../../../../chunks/alert-dialog.js-Bhx9Aeqa.js';
import '../../../../chunks/dialog-overlay.js-C7ZHZwQ8.js';
import '../../../../chunks/dialog-description.js-DarLu6ho.js';
import '../../../../chunks/textarea.js-BMgrLLbk.js';
import '../../../../chunks/LoadingBtn.js-CYZ6Npjp.js';
import '../../../../chunks/client2.js-CyJQ5fE8.js';
import '../../../../chunks/forms.js-DIm94891.js';
import '../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../chunks/stores.js-CP2mn6hL.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../chunks/adapters.js-CQlMjbyU.js';
import '../../../../index.js-Bt0ds7Zy.js';
import '../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../chunks/internal2.js-C5oX8Rtc.js';
import '../../../../chunks/access.js-j1_SnSd1.js';
import '../../../../chunks/Errors.js-Czh0cSzk.js';
import '../../../../chunks/circle-alert.js-C4ujrG9B.js';
import '../../../../chunks/schema8.js-DuSA_iW7.js';
import '../../../../chunks/tooltip.js-DwR81Sc_.js';
import '../../../../chunks/safe-polygon.svelte.js-LqQ_XdbY.js';
import '../../../../chunks/checkbox2.js-DNmj6_T9.js';
import '../../../../chunks/checkbox.js-C4abJyiS.js';
import '../../../../chunks/hidden-input.js-C81YZGmV.js';
import '../../../../chunks/sr-only-styles.js-Bstyupqo.js';

//#region src/routes/dashboard/batches/ExpiryCell.svelte
function ExpiryCell($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { date, expiry } = $$props;
		if (!date) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="text-muted-foreground">—</span>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<span${attr_class(clsx$1(expiry === "expired" ? "font-medium text-red-600" : expiry === "soon" ? "font-medium text-amber-600" : ""))}>${escape_html(shortDate(date))} `);
			if (expiry === "expired") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="text-xs">(expired)</span>`);
			} else if (expiry === "soon") {
				$$renderer.push("<!--[1-->");
				$$renderer.push(`<span class="text-xs">(soon)</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></span>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/routes/dashboard/batches/BatchRowActions.svelte
function BatchRowActions($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { batch, onAction } = $$props;
		$$renderer.push(`<div class="flex items-center gap-1">`);
		if (batch.status === "active" || batch.status === "depleted") {
			$$renderer.push("<!--[0-->");
			Button($$renderer, {
				size: "sm",
				variant: "outline",
				class: "h-8 px-2",
				title: "Hold this batch while you investigate",
				onclick: () => onAction("quarantined", [batch]),
				children: ($$renderer) => {
					Shield_alert($$renderer, { class: "h-4 w-4" });
					$$renderer.push(`<!----> Hold`);
				},
				$$slots: { default: true }
			});
		} else {
			$$renderer.push("<!--[-1-->");
			Button($$renderer, {
				size: "sm",
				variant: "outline",
				class: "h-8 px-2",
				onclick: () => onAction("active", [batch]),
				children: ($$renderer) => {
					Undo_2($$renderer, { class: "h-4 w-4" });
					$$renderer.push(`<!----> Release`);
				},
				$$slots: { default: true }
			});
		}
		$$renderer.push(`<!--]--> `);
		if (batch.status !== "recalled") {
			$$renderer.push("<!--[0-->");
			Button($$renderer, {
				size: "sm",
				variant: "outline",
				class: "h-8 px-2 text-red-600",
				onclick: () => onAction("recalled", [batch]),
				children: ($$renderer) => {
					Ban($$renderer, { class: "h-4 w-4" });
					$$renderer.push(`<!----> Recall`);
				},
				$$slots: { default: true }
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		Button($$renderer, {
			size: "icon",
			variant: "ghost",
			class: "size-8",
			href: `/dashboard/batches/${stringify$1(batch.id)}`,
			"aria-label": `Open ${stringify$1(batch.code)}`,
			children: ($$renderer) => {
				Eye($$renderer, { class: "h-4 w-4" });
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
//#region src/routes/dashboard/batches/columns.ts
var sortHeader = (name) => ({ column }) => renderComponent(Data_table_sort, {
	name,
	onclick: column.getToggleSortingHandler()
});
var createColumns = (onAction) => [
	{
		id: "select",
		header: ({ table }) => renderComponent(Select_header, { table }),
		cell: ({ row }) => renderComponent(Select_cell, { row }),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: "code",
		header: sortHeader("Batch"),
		sortable: true,
		cell: ({ row }) => renderComponent(Data_table_links, {
			id: row.original.id,
			name: row.original.code,
			link: "/dashboard/batches"
		})
	},
	{
		accessorKey: "productName",
		header: sortHeader("Product"),
		sortable: true
	},
	{
		accessorKey: "sourceLabel",
		header: sortHeader("Source"),
		sortable: true
	},
	{
		accessorKey: "supplierLotRef",
		header: "Supplier Lot",
		cell: (info) => info.getValue() || "—"
	},
	{
		accessorKey: "producedOn",
		header: sortHeader("Produced"),
		sortable: true,
		cell: (info) => shortDate(info.getValue())
	},
	{
		accessorKey: "bestBefore",
		header: sortHeader("Best Before"),
		sortable: true,
		cell: ({ row }) => renderComponent(ExpiryCell, {
			date: row.original.bestBefore,
			expiry: row.original.expiry
		})
	},
	{
		accessorKey: "remaining",
		header: sortHeader("Stock"),
		sortable: true,
		cell: ({ row }) => renderComponent(UsageCell, {
			allocated: row.original.allocated,
			quantity: row.original.quantity,
			unit: row.original.unit
		})
	},
	{
		accessorKey: "status",
		header: sortHeader("Status"),
		sortable: true,
		cell: ({ row }) => renderComponent(Statuses, { status: row.original.status })
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => renderComponent(BatchRowActions, {
			batch: row.original,
			onAction
		})
	}
];
//#endregion
//#region src/routes/dashboard/batches/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const adding = derived(() => page.url.searchParams.has("add"));
		const hasFilters = derived(() => Object.values(data.filters).some(Boolean));
		let change = null;
		let selected = [];
		const openDialog = (status, list) => change = {
			status,
			batches: list.map(({ id, code, allocated }) => ({
				id,
				code,
				allocated
			}))
		};
		const columns = createColumns(openDialog);
		const bulk = (status) => openDialog(status, selected.filter((b) => b.status !== status));
		let syncing = false;
		const stats = derived(() => [
			{
				label: "Active batches",
				value: data.stats.active
			},
			{
				label: "Units available",
				value: data.stats.unitsAvailable
			},
			{
				label: "Expiring ≤ 3 days",
				value: data.stats.expiringSoon,
				warn: data.stats.expiringSoon > 0
			},
			{
				label: "On hold / recalled",
				value: data.stats.onHold,
				warn: data.stats.onHold > 0
			}
		]);
		const selectClass = "border-input h-9 rounded-md border bg-transparent px-3 text-base md:text-sm dark:bg-input/30";
		const closeHref = derived(() => {
			const p = new URLSearchParams(page.url.searchParams);
			p.delete("add");
			p.delete("source");
			p.delete("receipt");
			const qs = p.toString();
			return qs ? `?${qs}` : page.url.pathname;
		});
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("1d62wyg", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Batches &amp; Traceability</title>`);
				});
			});
			$$renderer.push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-4"><div><h1 class="dash-heading text-2xl font-semibold">Batches &amp; Traceability</h1> <p class="text-sm text-muted-foreground">Every injera and add-on delivery is allocated to a batch, and every batch to its source.</p></div> `);
			Button($$renderer, {
				href: "?add=1",
				children: ($$renderer) => {
					Plus($$renderer, { class: "h-4 w-4" });
					$$renderer.push(`<!----> New batch`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> `);
			if (adding()) {
				$$renderer.push("<!--[0-->");
				BatchForm($$renderer, {
					data: data.form,
					options: data.options,
					closeHref: closeHref()
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4"><!--[-->`);
			const each_array = ensure_array_like(stats());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let stat = each_array[$$index];
				if (Card) {
					$$renderer.push("<!--[-->");
					Card($$renderer, {
						class: "gap-1 py-4",
						children: ($$renderer) => {
							if (Card_header) {
								$$renderer.push("<!--[-->");
								Card_header($$renderer, {
									class: "px-4",
									children: ($$renderer) => {
										if (Card_description) {
											$$renderer.push("<!--[-->");
											Card_description($$renderer, {
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(stat.label)}`);
												},
												$$slots: { default: true }
											});
											$$renderer.push("<!--]-->");
										} else {
											$$renderer.push("<!--[!-->");
											$$renderer.push("<!--]-->");
										}
										$$renderer.push(` `);
										if (Card_title) {
											$$renderer.push("<!--[-->");
											Card_title($$renderer, {
												class: `text-2xl tabular-nums ${stat.warn ? "text-amber-600" : ""}`,
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(stat.value)}`);
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
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			}
			$$renderer.push(`<!--]--></div> `);
			if (Card) {
				$$renderer.push("<!--[-->");
				Card($$renderer, {
					class: "mb-6",
					children: ($$renderer) => {
						if (Card_header) {
							$$renderer.push("<!--[-->");
							Card_header($$renderer, {
								class: "flex flex-row flex-wrap items-start justify-between gap-3",
								children: ($$renderer) => {
									$$renderer.push(`<div>`);
									if (Card_title) {
										$$renderer.push("<!--[-->");
										Card_title($$renderer, {
											class: "flex items-center gap-2",
											children: ($$renderer) => {
												if (data.unassigned.length) {
													$$renderer.push("<!--[0-->");
													Triangle_alert($$renderer, { class: "h-5 w-5 text-amber-600" });
													$$renderer.push(`<!----> Deliveries waiting for a batch`);
												} else {
													$$renderer.push("<!--[-1-->");
													Circle_check($$renderer, { class: "h-5 w-5 text-green-600" });
													$$renderer.push(`<!----> Every delivery has a batch`);
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
									$$renderer.push(` `);
									if (Card_description) {
										$$renderer.push("<!--[-->");
										Card_description($$renderer, {
											children: ($$renderer) => {
												$$renderer.push(`<!---->${escape_html(data.stats.linesInWindow)} delivery lines between ${escape_html(shortDate(data.window.from))} and
				${escape_html(shortDate(data.window.to))}. Auto-assign uses first-expiring-first-out from active batches.`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(`</div> <form method="POST" action="?/sync">`);
									Button($$renderer, {
										type: "submit",
										disabled: syncing,
										children: ($$renderer) => {
											$$renderer.push("<!--[-1-->");
											Wand_sparkles($$renderer, { class: "h-4 w-4" });
											$$renderer.push(`<!----> Auto-assign batches`);
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
						$$renderer.push(` `);
						if (data.unassigned.length) {
							$$renderer.push("<!--[0-->");
							if (Card_content) {
								$$renderer.push("<!--[-->");
								Card_content($$renderer, {
									class: "overflow-x-auto",
									children: ($$renderer) => {
										$$renderer.push(`<table class="w-full text-left text-sm"><thead class="text-muted-foreground"><tr class="border-b border-border"><th class="py-2 pr-4 font-medium">Product</th><th class="py-2 pr-4 font-medium">Lines</th><th class="py-2 pr-4 font-medium">Units needed</th><th class="py-2 pr-4 font-medium">Earliest</th><th class="py-2 font-medium"></th></tr></thead><tbody><!--[-->`);
										const each_array_1 = ensure_array_like(data.unassigned);
										for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
											let u = each_array_1[$$index_1];
											$$renderer.push(`<tr class="border-b border-border last:border-0"><td class="py-2 pr-4 font-medium">${escape_html(u.name)}</td><td class="py-2 pr-4 tabular-nums">${escape_html(u.lines)}</td><td class="py-2 pr-4 tabular-nums">${escape_html(u.units)}</td><td class="py-2 pr-4">${escape_html(shortDate(u.earliest))}</td><td class="py-2 text-right">`);
											Button($$renderer, {
												size: "sm",
												variant: "outline",
												href: "/dashboard/deliveries",
												children: ($$renderer) => {
													$$renderer.push(`<!---->See deliveries`);
												},
												$$slots: { default: true }
											});
											$$renderer.push(`<!----></td></tr>`);
										}
										$$renderer.push(`<!--]--></tbody></table>`);
									},
									$$slots: { default: true }
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
						} else $$renderer.push("<!--[-1-->");
						$$renderer.push(`<!--]-->`);
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
			$$renderer.push(` <form method="GET" class="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-border/60 bg-card/50 p-4"><div class="flex min-w-48 flex-1 flex-col gap-1.5">`);
			Label($$renderer, {
				for: "q",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Batch / lot number`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				id: "q",
				name: "q",
				value: data.filters.q,
				placeholder: "INJ-2610…, supplier lot"
			});
			$$renderer.push(`<!----></div> <div class="flex flex-col gap-1.5">`);
			Label($$renderer, {
				for: "product",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Product`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> <select id="product" name="product"${attr_class(clsx$1(selectClass))}>`);
			$$renderer.option({
				value: "",
				selected: !data.filters.product
			}, ($$renderer) => {
				$$renderer.push(`All`);
			});
			$$renderer.push(`<!--[-->`);
			const each_array_2 = ensure_array_like(data.options.products);
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let p = each_array_2[$$index_2];
				$$renderer.option({
					value: p.value,
					selected: data.filters.product === p.value
				}, ($$renderer) => {
					$$renderer.push(`${escape_html(p.name)}`);
				});
			}
			$$renderer.push(`<!--]--></select></div> <div class="flex flex-col gap-1.5">`);
			Label($$renderer, {
				for: "source",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Source`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> <select id="source" name="source"${attr_class(clsx$1(selectClass))}>`);
			$$renderer.option({
				value: "",
				selected: !data.filters.source
			}, ($$renderer) => {
				$$renderer.push(`All`);
			});
			$$renderer.option({
				value: "in_house",
				selected: data.filters.source === "in_house"
			}, ($$renderer) => {
				$$renderer.push(`In house`);
			});
			$$renderer.push(`<!--[-->`);
			const each_array_3 = ensure_array_like(data.options.sources);
			for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
				let s = each_array_3[$$index_3];
				$$renderer.option({
					value: s.id,
					selected: data.filters.source === s.id
				}, ($$renderer) => {
					$$renderer.push(`${escape_html(s.businessName)}`);
				});
			}
			$$renderer.push(`<!--]--></select></div> <div class="flex flex-col gap-1.5">`);
			Label($$renderer, {
				for: "status",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Status`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> <select id="status" name="status"${attr_class(clsx$1(selectClass))}>`);
			$$renderer.option({
				value: "",
				selected: !data.filters.status
			}, ($$renderer) => {
				$$renderer.push(`All`);
			});
			$$renderer.push(`<!--[-->`);
			const each_array_4 = ensure_array_like([
				"active",
				"quarantined",
				"recalled",
				"depleted"
			]);
			for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
				let s = each_array_4[$$index_4];
				$$renderer.option({
					value: s,
					selected: data.filters.status === s,
					class: "capitalize"
				}, ($$renderer) => {
					$$renderer.push(`${escape_html(s)}`);
				});
			}
			$$renderer.push(`<!--]--></select></div> <div class="flex flex-col gap-1.5">`);
			Label($$renderer, {
				for: "from",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Produced from`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				id: "from",
				type: "date",
				name: "from",
				value: data.filters.from,
				class: "w-40"
			});
			$$renderer.push(`<!----></div> <div class="flex flex-col gap-1.5">`);
			Label($$renderer, {
				for: "to",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Produced to`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				id: "to",
				type: "date",
				name: "to",
				value: data.filters.to,
				class: "w-40"
			});
			$$renderer.push(`<!----></div> `);
			Button($$renderer, {
				type: "submit",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Apply`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			if (hasFilters()) {
				$$renderer.push("<!--[0-->");
				Button($$renderer, {
					href: page.url.pathname,
					variant: "ghost",
					children: ($$renderer) => {
						$$renderer.push(`<!---->Reset`);
					},
					$$slots: { default: true }
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></form> `);
			if (selected.length > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="sticky top-24 z-10 mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background/95 p-3 shadow-sm backdrop-blur" role="toolbar" aria-label="Bulk actions"><span class="mr-2 text-sm font-medium">${escape_html(selected.length)} selected</span> `);
				if (selected.some((b) => b.status === "active" || b.status === "depleted")) {
					$$renderer.push("<!--[0-->");
					Button($$renderer, {
						size: "sm",
						variant: "outline",
						onclick: () => bulk("quarantined"),
						children: ($$renderer) => {
							Shield_alert($$renderer, { class: "h-4 w-4" });
							$$renderer.push(`<!----> Hold`);
						},
						$$slots: { default: true }
					});
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (selected.some((b) => b.status === "quarantined" || b.status === "recalled")) {
					$$renderer.push("<!--[0-->");
					Button($$renderer, {
						size: "sm",
						variant: "outline",
						onclick: () => bulk("active"),
						children: ($$renderer) => {
							Undo_2($$renderer, { class: "h-4 w-4" });
							$$renderer.push(`<!----> Release`);
						},
						$$slots: { default: true }
					});
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (selected.some((b) => b.status !== "recalled")) {
					$$renderer.push("<!--[0-->");
					Button($$renderer, {
						size: "sm",
						variant: "outline",
						class: "text-red-600",
						onclick: () => bulk("recalled"),
						children: ($$renderer) => {
							Ban($$renderer, { class: "h-4 w-4" });
							$$renderer.push(`<!----> Recall`);
						},
						$$slots: { default: true }
					});
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (data.rows.length > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<!---->`);
				Data_table($$renderer, {
					data: data.rows,
					columns,
					fileName: "Batches",
					get selected() {
						return selected;
					},
					set selected($$value) {
						selected = $$value;
						$$settled = false;
					}
				});
				$$renderer.push(`<!---->`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<p class="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">${escape_html(hasFilters() ? "No batches match these filters." : "No batches yet — create the first one.")}</p>`);
			}
			$$renderer.push(`<!--]--> `);
			BatchStatusDialog($$renderer, {
				onDone: () => selected = [],
				get change() {
					return change;
				},
				set change($$value) {
					change = $$value;
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
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-DxRNvExd.js.map
