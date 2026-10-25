import { a0 as head, a6 as escape_html, aa as attr_class, a3 as clsx$1, a4 as ensure_array_like, ab as stringify$1, $ as attr, T as derived, ae as store_get, ag as store_mutate, af as unsubscribe_stores, a7 as spread_props } from '../../../../../chunks/server.js-qDPizQqb.js';
import { c as shortDate, i as instantDate, l as longDate } from '../../../../../chunks/format.js-DDyQH27n.js';
import { g as goto } from '../../../../../chunks/client.js-C3Iq_YCw.js';
import { p as page } from '../../../../../chunks/state.js-BA9nQlv7.js';
import { I as Icon } from '../../../../../chunks/Icon.js-Dm6aSBgb.js';
import { A as Arrow_left } from '../../../../../chunks/arrow-left.js-Bo8HsFsB.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../../chunks/data-table-sort.js-CN953cry.js';
import { I as InputComp } from '../../../../../chunks/InputComp.js-B5l34a7g.js';
import { B as Ban } from '../../../../../chunks/ban.js-C6mDh4Ux.js';
import { C as Check } from '../../../../../chunks/check.js-BvFzUyRW.js';
import { S as Statuses } from '../../../../../chunks/statuses.js-CqI0SEDd.js';
import { M as Mail } from '../../../../../chunks/mail.js-QCnsJSf5.js';
import { M as Message_circle } from '../../../../../chunks/message-circle.js-DNYefDRi.js';
import { P as Plus } from '../../../../../chunks/plus.js-l9nzajpf.js';
import { X } from '../../../../../chunks/x.js-TlRuKVU4.js';
import { L as Label } from '../../../../../chunks/label.js-B89gGnUJ.js';
import { B as Button } from '../../../../../chunks/button.js-DWWbYMWk.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import { I as Input } from '../../../../../chunks/input.js-DivymZKU.js';
import { L as LoadingBtn } from '../../../../../chunks/LoadingBtn.js-CYZ6Npjp.js';
import { C as Card, b as Card_header, a as Card_content, c as Card_title, d as Card_description } from '../../../../../chunks/card.js-CLGpEPTV.js';
import { b as superForm } from '../../../../../chunks/client2.js-P7rUUC6q.js';
import { a as zodClient } from '../../../../../chunks/adapters.js-DtwKAq2A.js';
import { f as formatGBP } from '../../../../../chunks/format2.js-D8oyWA_y.js';
import { R as RowActions } from '../../../../../chunks/RowActions.js-CArzbBlU.js';
import { E as Errors } from '../../../../../chunks/Errors.js-Czh0cSzk.js';
import { B as BatchesCell } from '../../../../../chunks/BatchesCell.js-bQMZXK7C.js';
import { c as categoryLabel } from '../../../../../chunks/labels.js-D_c71aEk.js';
import { d as deliverySchema } from '../../../../../chunks/schema14.js-Dz2hlRO1.js';
import '../../../../../chunks/runtime.js-CbeSlHLA.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../chunks/internal2.js-lGck33Tu.js';
import '../../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../../chunks/scroll-lock.js-CqHv4jWP.js';
import '../../../../../chunks/index-server2.js-C2dghAGm.js';
import '../../../../../chunks/create-id.js-BHb4azHX.js';
import '../../../../../chunks/chevron-down.js-BUTnRWsm.js';
import '../../../../../chunks/scroll-area.js-CQyJtNcB.js';
import '../../../../../chunks/utils2.js-BmcH287A.js';
import '../../../../../chunks/dropdown-menu.js-D5_JIqOL.js';
import '../../../../../chunks/minus.js-JH-UUVfm.js';
import '../../../../../chunks/popper-layer-force-mount.js-B57StPwG.js';
import '../../../../../chunks/menu.js-7FcOhF2b.js';
import '../../../../../chunks/is-mobile.svelte.js-CSeMNCH2.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../../chunks/toast-state.svelte.js-CyESMgTY.js';
import '../../../../../chunks/badge-check.js-YjTSRpIb.js';
import '../../../../../chunks/chevron-left.js-CzlLlj9a.js';
import '../../../../../chunks/chevron-right.js-Bu3_elXi.js';
import '../../../../../chunks/SelectComp.js-DHbV5UZH.js';
import '../../../../../chunks/hidden-input.js-C81YZGmV.js';
import '../../../../../chunks/sr-only-styles.js-Bstyupqo.js';
import '../../../../../chunks/global.svelte.js-Dj9QIDov.js';
import '../../../../../chunks/popover.js-C5botI74.js';
import '../../../../../chunks/safe-polygon.svelte.js-LqQ_XdbY.js';
import '../../../../../chunks/circle-alert.js-C4ujrG9B.js';
import '../../../../../chunks/loader.js-BCe2CTsg.js';
import '../../../../../chunks/command.js-D-5nnPhf.js';
import '../../../../../chunks/search.js-B59c9lYY.js';
import '../../../../../chunks/dialog-overlay.js-C7ZHZwQ8.js';
import '../../../../../chunks/textarea.js-BMgrLLbk.js';
import '../../../../../chunks/checkbox2.js-DNmj6_T9.js';
import '../../../../../chunks/checkbox.js-C4abJyiS.js';
import 'browser-image-compression';
import '../../../../../index.js-B1Zbey_B.js';
import '../../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../../chunks/truck.js-CAOAaqne.js';
import '../../../../../chunks/forms.js-qYr4b_YH.js';
import '../../../../../chunks/stores.js-B52XgJS0.js';
import '../../../../../chunks/access.js-j1_SnSd1.js';
import '../../../../../chunks/ellipsis.js-Dns71XaR.js';
import '../../../../../chunks/pencil.js-DI8R1Xzc.js';
import '../../../../../chunks/trash-2.js-CiUzWTiQ.js';

//#region node_modules/@lucide/svelte/dist/icons/phone.svelte
function Phone($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "phone" },
		props,
		{ iconNode: [["path", { "d": "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" }]] }
	]));
}
//#endregion
//#region src/routes/dashboard/partners/[id]/PartnerBatchesCell.svelte
function PartnerBatchesCell($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { row } = $$props;
		if (row.kind === "partner") {
			$$renderer.push("<!--[0-->");
			BatchesCell($$renderer, {
				type: "partner",
				id: row.id,
				state: row.traceState,
				batches: row.batches
			});
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="flex min-w-36 flex-col gap-0.5 text-xs"><!--[-->`);
			const each_array = ensure_array_like(row.batches);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let b = each_array[$$index];
				$$renderer.push(`<a${attr("href", `/dashboard/batches/${stringify$1(b.id)}`)} class="hover:underline"><span class="font-mono font-medium">${escape_html(b.code)}</span> <span class="text-muted-foreground">· ${escape_html(b.source)}</span></a>`);
			}
			$$renderer.push(`<!--]--> `);
			if (row.status === "delivered") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<a${attr("href", `/dashboard/batches?add=1&receipt=${stringify$1(row.id)}`)} class="text-primary hover:underline">+ Create batch</a>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/routes/dashboard/partners/[id]/columns.ts
var weekday = (d) => (/* @__PURE__ */ new Date(`${d}T12:00:00`)).toLocaleDateString("en-GB", { weekday: "short" });
var qty = (n) => Number.isInteger(n) ? String(n) : n.toFixed(2);
var columns = [
	{
		accessorKey: "deliveredOn",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Date",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => `${weekday(info.getValue())} ${shortDate(info.getValue())}`
	},
	{
		accessorKey: "items",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Items",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	},
	{
		accessorKey: "quantity",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Quantity",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => `${qty(row.original.quantity)} ${row.original.unit}`
	},
	{
		accessorKey: "batches",
		header: "Batches",
		enableSorting: false,
		cell: ({ row }) => renderComponent(PartnerBatchesCell, { row: row.original })
	},
	{
		accessorKey: "location",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Location",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	},
	{
		accessorKey: "valuePence",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Value",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => info.getValue() == null ? "—" : formatGBP(info.getValue())
	},
	{
		accessorKey: "unitPricePence",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Unit Price",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => row.original.unitPricePence == null ? "—" : `${formatGBP(row.original.unitPricePence)} / ${row.original.unit}`
	},
	{
		accessorKey: "reference",
		header: "Reference",
		cell: (info) => info.getValue() || "—"
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
		accessorKey: "notes",
		header: "Notes",
		cell: (info) => info.getValue() || "—"
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Logged",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => instantDate(info.getValue())
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => renderComponent(RowActions, {
			id: row.original.id,
			label: "delivery",
			deleteAction: "?/deleteDelivery"
		})
	}
];
//#endregion
//#region src/routes/dashboard/partners/[id]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		const partner = derived(() => data.partner);
		const isSupplier = derived(() => partner().type === "supplier");
		const isApproved = derived(() => partner().status === "approved");
		const verb = derived(() => isSupplier() ? "Supplied" : "Delivered");
		const logTitle = derived(() => isSupplier() ? "Supply log" : "Delivery log");
		const editingId = derived(() => page.url.searchParams.get("edit"));
		const adding = derived(() => page.url.searchParams.has("add"));
		const showForm = derived(() => adding() || !!editingId());
		const delivered = derived(() => data.deliveries.filter((d) => d.status === "delivered"));
		const totalValue = derived(() => delivered().reduce((n, d) => n + (d.valuePence ?? 0), 0));
		const longDay = (d) => (/* @__PURE__ */ new Date(`${d}T12:00:00`)).toLocaleDateString("en-GB", { weekday: "short" }) + " " + longDate(d);
		const qty = (n) => Number.isInteger(n) ? String(n) : n.toFixed(2);
		const hasFilters = derived(() => Object.values(data.filters).some(Boolean));
		const selectClass = "border-input h-9 w-full rounded-md border bg-transparent px-3 text-base md:text-sm dark:bg-input/30";
		/** Current URL minus the add/edit flags — keeps the active filters when the form closes. */
		function listUrl(extra = {}) {
			const params = new URLSearchParams(page.url.searchParams);
			params.delete("add");
			params.delete("edit");
			for (const [k, v] of Object.entries(extra)) params.set(k, v);
			const qs = params.toString();
			return qs ? `${page.url.pathname}?${qs}` : page.url.pathname;
		}
		const statusItems = [
			{
				value: "delivered",
				name: "Delivered"
			},
			{
				value: "scheduled",
				name: "Scheduled"
			},
			{
				value: "cancelled",
				name: "Cancelled"
			}
		];
		const { form, errors, delayed, allErrors} = superForm(data.form, {
			dataType: "json",
			resetForm: false,
			invalidateAll: true,
			validators: zodClient(deliverySchema),
			onUpdated({ form: f }) {
				if (f.valid) goto(listUrl(), {
					});
			}
		});
		const details = derived(() => [
			{
				name: "Type",
				value: isSupplier() ? "Supplier" : "Partner"
			},
			{
				name: "Category",
				value: categoryLabel(partner().category)
			},
			{
				name: "Contact",
				value: partner().contactName
			},
			{
				name: "Email",
				value: partner().email
			},
			{
				name: "Phone",
				value: partner().phone || "—"
			},
			{
				name: "Website",
				value: partner().website || "—"
			},
			{
				name: "Location",
				value: [partner().city, partner().postcode].filter(Boolean).join(", ") || "—"
			},
			{
				name: "Applied",
				value: instantDate(partner().createdAt)
			}
		]);
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("o19vzv", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>${escape_html(partner().businessName)} · Partners</title>`);
				});
			});
			$$renderer.push(`<div class="mb-6 flex flex-col gap-3"><a href="/dashboard/partners" class="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground">`);
			Arrow_left($$renderer, { class: "h-4 w-4" });
			$$renderer.push(`<!----> All partners &amp; suppliers</a> <div class="flex flex-wrap items-center gap-3"><h1 class="dash-heading text-2xl font-semibold">${escape_html(partner().businessName)}</h1> `);
			Statuses($$renderer, { status: partner().status });
			$$renderer.push(`<!----></div></div> <div class="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">`);
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
												$$renderer.push(`<!---->Application`);
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
								class: "flex flex-col gap-4",
								children: ($$renderer) => {
									$$renderer.push(`<dl class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm"><!--[-->`);
									const each_array = ensure_array_like(details());
									for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
										let row = each_array[$$index];
										$$renderer.push(`<dt class="text-muted-foreground">${escape_html(row.name)}</dt> <dd class="min-w-0 break-words">${escape_html(row.value)}</dd>`);
									}
									$$renderer.push(`<!--]--></dl> <div><p class="mb-1 text-sm text-muted-foreground">Message</p> <p class="rounded-md border border-border bg-muted/40 p-3 text-sm whitespace-pre-line">${escape_html(partner().message)}</p></div> <div class="flex flex-wrap gap-2">`);
									Button($$renderer, {
										variant: "outline",
										size: "sm",
										href: `mailto:${stringify$1(partner().email)}`,
										children: ($$renderer) => {
											Mail($$renderer, { class: "h-4 w-4" });
											$$renderer.push(`<!----> Email`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----> `);
									if (partner().phone) {
										$$renderer.push("<!--[0-->");
										Button($$renderer, {
											variant: "outline",
											size: "sm",
											href: `tel:${stringify$1(partner().phone)}`,
											children: ($$renderer) => {
												Phone($$renderer, { class: "h-4 w-4" });
												$$renderer.push(`<!----> Call`);
											},
											$$slots: { default: true }
										});
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--></div>`);
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
			$$renderer.push(` <div class="flex flex-col gap-6">`);
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
												$$renderer.push(`<!---->Status`);
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
												if (isApproved()) {
													$$renderer.push("<!--[0-->");
													$$renderer.push(`Approved — log every ${escape_html(isSupplier() ? "supply" : "delivery")} below.`);
												} else {
													$$renderer.push("<!--[-1-->");
													$$renderer.push(`Approve this ${escape_html(isSupplier() ? "supplier" : "partner")} to start logging ${escape_html(isSupplier() ? "supplies" : "deliveries")}.`);
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
									$$renderer.push(`<form method="POST" action="?/setStatus" class="flex flex-wrap gap-2">`);
									if (partner().status !== "approved") {
										$$renderer.push("<!--[0-->");
										Button($$renderer, {
											type: "submit",
											name: "status",
											value: "approved",
											size: "sm",
											children: ($$renderer) => {
												Check($$renderer, { class: "h-4 w-4" });
												$$renderer.push(`<!----> Approve`);
											},
											$$slots: { default: true }
										});
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--> `);
									if (partner().status === "new") {
										$$renderer.push("<!--[0-->");
										Button($$renderer, {
											type: "submit",
											name: "status",
											value: "contacted",
											size: "sm",
											variant: "outline",
											children: ($$renderer) => {
												Message_circle($$renderer, { class: "h-4 w-4" });
												$$renderer.push(`<!----> Mark contacted`);
											},
											$$slots: { default: true }
										});
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--> `);
									if (partner().status !== "declined") {
										$$renderer.push("<!--[0-->");
										Button($$renderer, {
											type: "submit",
											name: "status",
											value: "declined",
											size: "sm",
											variant: "outline",
											class: "text-red-600",
											children: ($$renderer) => {
												Ban($$renderer, { class: "h-4 w-4" });
												$$renderer.push(`<!----> ${escape_html(isApproved() ? "End partnership" : "Decline")}`);
											},
											$$slots: { default: true }
										});
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--></form>`);
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
			if (data.overall.total > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="grid grid-cols-2 gap-3">`);
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
													$$renderer.push(`<!---->Entries logged`);
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
												class: "text-2xl tabular-nums",
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(data.overall.total)}`);
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
				$$renderer.push(` `);
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
													$$renderer.push(`<!---->Last ${escape_html(verb().toLowerCase())}`);
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
												class: "text-base",
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(data.overall.lastDelivered ? shortDate(data.overall.lastDelivered.deliveredOn) : "—")}`);
												},
												$$slots: { default: true }
											});
											$$renderer.push("<!--]-->");
										} else {
											$$renderer.push("<!--[!-->");
											$$renderer.push("<!--]-->");
										}
										$$renderer.push(` `);
										if (data.overall.lastDelivered) {
											$$renderer.push("<!--[0-->");
											$$renderer.push(`<p class="truncate text-xs text-muted-foreground">${escape_html(data.overall.lastDelivered.location)}</p>`);
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
						class: "col-span-2 gap-1 py-4",
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
													$$renderer.push(`<!---->Next scheduled`);
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
												class: "text-base",
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(data.overall.nextScheduled ? `${longDay(data.overall.nextScheduled.deliveredOn)} — ${data.overall.nextScheduled.items}` : "Nothing scheduled")}`);
												},
												$$slots: { default: true }
											});
											$$renderer.push("<!--]-->");
										} else {
											$$renderer.push("<!--[!-->");
											$$renderer.push("<!--]-->");
										}
										$$renderer.push(` `);
										if (data.overall.nextScheduled) {
											$$renderer.push("<!--[0-->");
											$$renderer.push(`<p class="truncate text-xs text-muted-foreground">${escape_html(data.overall.nextScheduled.location)}</p>`);
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
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(`</div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></div> <div class="mb-4 flex flex-wrap items-center justify-between gap-4"><h2 class="text-xl font-semibold">${escape_html(logTitle())}</h2> `);
			if (isApproved()) {
				$$renderer.push("<!--[0-->");
				Button($$renderer, {
					href: listUrl({ add: "1" }),
					children: ($$renderer) => {
						Plus($$renderer, { class: "h-4 w-4" });
						$$renderer.push(`<!----> Log ${escape_html(isSupplier() ? "supply" : "delivery")}`);
					},
					$$slots: { default: true }
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (data.overall.total > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<form method="GET" class="mb-6 grid gap-3 rounded-lg border border-border/60 bg-card/50 p-4 sm:grid-cols-2 lg:grid-cols-[repeat(6,minmax(0,1fr))_auto]"><div class="flex flex-col gap-1.5">`);
				Label($$renderer, {
					for: "f-from",
					children: ($$renderer) => {
						$$renderer.push(`<!---->From`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				Input($$renderer, {
					id: "f-from",
					type: "date",
					name: "from",
					value: data.filters.from
				});
				$$renderer.push(`<!----></div> <div class="flex flex-col gap-1.5">`);
				Label($$renderer, {
					for: "f-to",
					children: ($$renderer) => {
						$$renderer.push(`<!---->To`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				Input($$renderer, {
					id: "f-to",
					type: "date",
					name: "to",
					value: data.filters.to
				});
				$$renderer.push(`<!----></div> <div class="flex flex-col gap-1.5">`);
				Label($$renderer, {
					for: "f-status",
					children: ($$renderer) => {
						$$renderer.push(`<!---->Status`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> <select id="f-status" name="status"${attr_class(clsx$1(selectClass))}>`);
				$$renderer.option({
					value: "",
					selected: !data.filters.status
				}, ($$renderer) => {
					$$renderer.push(`All`);
				});
				$$renderer.push(`<!--[-->`);
				const each_array_1 = ensure_array_like(statusItems);
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let s = each_array_1[$$index_1];
					$$renderer.option({
						value: s.value,
						selected: data.filters.status === s.value
					}, ($$renderer) => {
						$$renderer.push(`${escape_html(s.name)}`);
					});
				}
				$$renderer.push(`<!--]--></select></div> <div class="flex flex-col gap-1.5">`);
				Label($$renderer, {
					for: "f-item",
					children: ($$renderer) => {
						$$renderer.push(`<!---->Item`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> <select id="f-item" name="item"${attr_class(clsx$1(selectClass))}>`);
				$$renderer.option({
					value: "",
					selected: !data.filters.item
				}, ($$renderer) => {
					$$renderer.push(`All items`);
				});
				$$renderer.push(`<!--[-->`);
				const each_array_2 = ensure_array_like(data.options.items);
				for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
					let item = each_array_2[$$index_2];
					$$renderer.option({
						value: item,
						selected: data.filters.item === item
					}, ($$renderer) => {
						$$renderer.push(`${escape_html(item)}`);
					});
				}
				$$renderer.push(`<!--]--></select></div> <div class="flex flex-col gap-1.5">`);
				Label($$renderer, {
					for: "f-location",
					children: ($$renderer) => {
						$$renderer.push(`<!---->Location`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> <select id="f-location" name="location"${attr_class(clsx$1(selectClass))}>`);
				$$renderer.option({
					value: "",
					selected: !data.filters.location
				}, ($$renderer) => {
					$$renderer.push(`All locations`);
				});
				$$renderer.push(`<!--[-->`);
				const each_array_3 = ensure_array_like(data.options.locations);
				for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
					let loc = each_array_3[$$index_3];
					$$renderer.option({
						value: loc,
						selected: data.filters.location === loc
					}, ($$renderer) => {
						$$renderer.push(`${escape_html(loc)}`);
					});
				}
				$$renderer.push(`<!--]--></select></div> <div class="flex flex-col gap-1.5">`);
				Label($$renderer, {
					for: "f-q",
					children: ($$renderer) => {
						$$renderer.push(`<!---->Search`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----> `);
				Input($$renderer, {
					id: "f-q",
					name: "q",
					value: data.filters.q,
					placeholder: "Ref, notes…"
				});
				$$renderer.push(`<!----></div> <div class="flex items-end gap-2">`);
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
				$$renderer.push(`<!--]--></div></form> <div class="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">`);
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
													$$renderer.push(`<!---->${escape_html(hasFilters() ? "Matching entries" : "All entries")}`);
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
												class: "text-2xl tabular-nums",
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(data.deliveries.length)}`);
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
				$$renderer.push(` `);
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
													$$renderer.push(`<!---->${escape_html(verb())}`);
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
												class: "text-2xl tabular-nums",
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(delivered().length)}×`);
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
				$$renderer.push(` `);
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
													$$renderer.push(`<!---->Value ${escape_html(verb().toLowerCase())}`);
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
												class: "text-2xl tabular-nums",
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(formatGBP(totalValue()))}`);
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
				$$renderer.push(` `);
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
													$$renderer.push(`<!---->Date span`);
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
												class: "text-base",
												children: ($$renderer) => {
													if (data.deliveries.length) {
														$$renderer.push("<!--[0-->");
														$$renderer.push(`${escape_html(shortDate(data.deliveries[data.deliveries.length - 1].deliveredOn))} – ${escape_html(shortDate(data.deliveries[0].deliveredOn))}`);
													} else {
														$$renderer.push("<!--[-1-->");
														$$renderer.push(`—`);
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
						},
						$$slots: { default: true }
					});
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
				$$renderer.push(`</div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (data.itemTotals.length > 0) {
				$$renderer.push("<!--[0-->");
				if (Card) {
					$$renderer.push("<!--[-->");
					Card($$renderer, {
						class: "mb-8",
						children: ($$renderer) => {
							if (Card_header) {
								$$renderer.push("<!--[-->");
								Card_header($$renderer, {
									children: ($$renderer) => {
										if (Card_title) {
											$$renderer.push("<!--[-->");
											Card_title($$renderer, {
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(isSupplier() ? "What they supplied" : "What we delivered")}`);
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
													$$renderer.push(`<!---->Delivered entries grouped by item${escape_html(hasFilters() ? ", within the current filters" : "")}.`);
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
									class: "overflow-x-auto",
									children: ($$renderer) => {
										$$renderer.push(`<table class="w-full text-left text-sm"><thead class="text-muted-foreground"><tr class="border-b border-border"><th class="py-2 pr-4 font-medium">Item</th><th class="py-2 pr-4 font-medium">Total</th><th class="py-2 pr-4 font-medium">Times</th><th class="py-2 pr-4 font-medium">Value</th><th class="py-2 pr-4 font-medium">First</th><th class="py-2 font-medium">Last</th></tr></thead><tbody><!--[-->`);
										const each_array_4 = ensure_array_like(data.itemTotals);
										for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
											let item = each_array_4[$$index_4];
											$$renderer.push(`<tr class="border-b border-border last:border-0"><td class="py-2 pr-4">${escape_html(item.items)}</td><td class="py-2 pr-4">${escape_html(qty(item.quantity))} ${escape_html(item.unit)}</td><td class="py-2 pr-4">${escape_html(item.count)}</td><td class="py-2 pr-4">${escape_html(item.valuePence ? formatGBP(item.valuePence) : "—")}</td><td class="py-2 pr-4">${escape_html(shortDate(item.first))}</td><td class="py-2">${escape_html(shortDate(item.last))}</td></tr>`);
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
			if (showForm() && (isApproved() || editingId())) {
				$$renderer.push("<!--[0-->");
				if (Card) {
					$$renderer.push("<!--[-->");
					Card($$renderer, {
						class: "mb-8 w-full lg:w-2xl",
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
													$$renderer.push(`<!---->${escape_html(editingId() ? "Edit entry" : isSupplier() ? "Log a supply" : "Log a delivery")}`);
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
											href: listUrl(),
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
										$$renderer.push(`<form method="POST" action="?/saveDelivery" id="delivery-form" class="grid gap-4 sm:grid-cols-2"><div class="sm:col-span-2">`);
										Errors($$renderer, { allErrors: store_get($$store_subs ??= {}, "$allErrors", allErrors) });
										$$renderer.push(`<!----></div> `);
										if (editingId()) {
											$$renderer.push("<!--[0-->");
											$$renderer.push(`<input type="hidden" name="id"${attr("value", store_get($$store_subs ??= {}, "$form", form).id)}/>`);
										} else $$renderer.push("<!--[-1-->");
										$$renderer.push(`<!--]--> <div class="flex flex-col gap-2 p-1">`);
										Label($$renderer, {
											for: "deliveredOn",
											children: ($$renderer) => {
												$$renderer.push(`<!---->Date`);
											},
											$$slots: { default: true }
										});
										$$renderer.push(`<!----> `);
										Input($$renderer, {
											id: "deliveredOn",
											name: "deliveredOn",
											type: "date",
											required: true,
											get value() {
												return store_get($$store_subs ??= {}, "$form", form).deliveredOn;
											},
											set value($$value) {
												store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).deliveredOn = $$value);
												$$settled = false;
											}
										});
										$$renderer.push(`<!----></div> `);
										InputComp($$renderer, {
											label: "Status",
											form,
											errors,
											type: "select",
											name: "status",
											items: statusItems
										});
										$$renderer.push(`<!----> <div class="sm:col-span-2">`);
										InputComp($$renderer, {
											label: isSupplier() ? "What was supplied" : "What was delivered",
											form,
											errors,
											type: "text",
											name: "items",
											placeholder: isSupplier() ? "Teff flour (ivory)" : "Injera — large",
											required: true
										});
										$$renderer.push(`<!----></div> `);
										InputComp($$renderer, {
											label: "Quantity",
											form,
											errors,
											type: "number",
											name: "quantity",
											min: "0",
											required: true
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Unit",
											form,
											errors,
											type: "text",
											name: "unit",
											placeholder: "kg, pcs, boxes",
											required: true
										});
										$$renderer.push(`<!----> <div class="sm:col-span-2">`);
										InputComp($$renderer, {
											label: isSupplier() ? "Received at" : "Delivered to",
											form,
											errors,
											type: "text",
											name: "location",
											placeholder: "Address or site",
											required: true
										});
										$$renderer.push(`<!----></div> `);
										InputComp($$renderer, {
											label: "Value (£)",
											form,
											errors,
											type: "number",
											name: "value",
											min: "0",
											placeholder: "Optional"
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Reference",
											form,
											errors,
											type: "text",
											name: "reference",
											placeholder: "Invoice / PO no."
										});
										$$renderer.push(`<!----> <div class="sm:col-span-2">`);
										InputComp($$renderer, {
											label: "Notes",
											form,
											errors,
											type: "textarea",
											name: "notes",
											rows: 3
										});
										$$renderer.push(`<!----></div> `);
										Button($$renderer, {
											type: "submit",
											form: "delivery-form",
											class: "sm:col-span-2",
											children: ($$renderer) => {
												if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
													$$renderer.push("<!--[0-->");
													LoadingBtn($$renderer, { name: "Saving" });
												} else {
													$$renderer.push("<!--[-1-->");
													$$renderer.push(`${escape_html(editingId() ? "Save changes" : "Save entry")}`);
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
			if (data.deliveries.length > 0) {
				$$renderer.push("<!--[0-->");
				Data_table($$renderer, {
					data: data.deliveries,
					columns,
					fileName: `${stringify$1(partner().businessName)} ${logTitle()}`
				});
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<p class="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">`);
				if (data.overall.total > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`No entries match these filters. <a${attr("href", page.url.pathname)} class="underline">Reset</a>`);
				} else if (isApproved()) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`Nothing logged yet. Use “Log ${escape_html(isSupplier() ? "supply" : "delivery")}” to record when, where and what
			was ${escape_html(isSupplier() ? "supplied" : "delivered")}.`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`Tracking starts once this ${escape_html(isSupplier() ? "supplier" : "partner")} is approved.`);
				}
				$$renderer.push(`<!--]--></p>`);
			}
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

export { _page as default };
//# sourceMappingURL=_page.svelte.js-C5oIksez.js.map
