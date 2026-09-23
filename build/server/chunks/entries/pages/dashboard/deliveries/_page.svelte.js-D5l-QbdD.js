import { a0 as head, T as derived, a6 as escape_html, ab as stringify$1, ae as store_get, a4 as ensure_array_like, $ as attr, af as unsubscribe_stores } from '../../../../chunks/server.js-qDPizQqb.js';
import { a as toast } from '../../../../chunks/toast-state.svelte.js-CyESMgTY.js';
import { g as goto } from '../../../../chunks/client.js-CWf6uOE8.js';
import { p as page } from '../../../../chunks/state.js-B8LH1nIO.js';
import { F as FilterMenu } from '../../../../chunks/FilterMenu.js-C60C7aaG.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../chunks/data-table-sort.js-jg0AudAq.js';
import { I as InputComp } from '../../../../chunks/InputComp.js-CP7Ax51g.js';
import { E as Errors, S as SelectComp } from '../../../../chunks/Errors.js-ByQPBAAv.js';
import { S as Statuses, B as Badge } from '../../../../chunks/statuses.js-BOppkrP4.js';
import { P as Pencil } from '../../../../chunks/pencil.js-DI8R1Xzc.js';
import { S as Select_cell, a as Select_header } from '../../../../chunks/select-cell.js-Brzvdh52.js';
import { R as RowActions, T as Trash_2 } from '../../../../chunks/RowActions.js-BgIrkKfp.js';
import { X } from '../../../../chunks/dialog.js-CMONFBTM.js';
import { L as Label } from '../../../../chunks/label.js-B89gGnUJ.js';
import { B as Button } from '../../../../chunks/button.js-DWWbYMWk.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import { I as Input } from '../../../../chunks/input.js-DivymZKU.js';
import { L as LoadingBtn } from '../../../../chunks/LoadingBtn.js-47-9Nmem.js';
import { f as formatEthiopianDate } from '../../../../chunks/global.svelte.js-Bt1gRs1g.js';
import { C as Card, b as Card_header, a as Card_content, c as Card_title, d as Card_description } from '../../../../chunks/card.js-CLGpEPTV.js';
import { b as superForm } from '../../../../chunks/client2.js-ZnyZ4fKl.js';
import { a as zodClient } from '../../../../chunks/adapters.js-QNI96UbV.js';
import { d as deliverySchema, s as skipDateSchema } from '../../../../chunks/skipDateSchema.js-pEEZlLHW.js';
import { B as BulkEmailDialog } from '../../../../chunks/BulkEmailDialog.js-Cd5pFK8C.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/internal2.js-DJ3WVXqP.js';
import '../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../chunks/Icon.js-Dm6aSBgb.js';
import '../../../../chunks/chart-area.js-CHQrzPbW.js';
import '../../../../chunks/minus.js-bwoMvjb2.js';
import '../../../../chunks/popover.js-bYNo78g_.js';
import '../../../../chunks/scroll-lock.js-DUdP1Ngb.js';
import '../../../../chunks/create-id.js-BHb4azHX.js';
import '../../../../chunks/hidden-input.js-C81YZGmV.js';
import '../../../../chunks/sr-only-styles.js-Bstyupqo.js';
import '../../../../chunks/popper-layer-force-mount.js-Bh-1o_Y0.js';
import '../../../../chunks/safe-polygon.svelte.js-gTkJUGXN.js';
import '../../../../chunks/utils2.js-BmcH287A.js';
import '../../../../chunks/command.js-WxuuArWj.js';
import '../../../../chunks/tooltip.js-CDsBDgDD.js';
import '../../../../chunks/scroll-area.js-DExXIpxT.js';
import '../../../../chunks/chevron-down.js-BUTnRWsm.js';
import '../../../../chunks/dropdown-menu.js-YJUTIf1N.js';
import '../../../../chunks/menu.js-Bc8STZmC.js';
import '../../../../chunks/is-mobile.svelte.js-C7rjivRg.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../chunks/badge-check.js-YjTSRpIb.js';
import '../../../../chunks/chevron-left.js-CzlLlj9a.js';
import '../../../../chunks/chevron-right.js-Bu3_elXi.js';
import '../../../../chunks/circle-alert.js-C4ujrG9B.js';
import 'browser-image-compression';
import '../../../../index.js-C0U4KHbt.js';
import '../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../chunks/truck.js-CAOAaqne.js';
import '../../../../chunks/ellipsis.js-Dns71XaR.js';
import '../../../../chunks/forms.js-CSpodhVa.js';
import '../../../../chunks/stores.js-85RLlu2u.js';
import '../../../../chunks/access.js-BTJQW2Ke.js';
import '../../../../chunks/mail.js-QCnsJSf5.js';
import '../../../../chunks/DialogComp.js-qpyMtlLZ.js';
import '../../../../chunks/runtime.js-CbeSlHLA.js';
import '../../../../chunks/bulkEmail.js-BZDoWPwu.js';

//#region src/lib/components/dashboard/TypeBadge.svelte
function TypeBadge($$renderer, $$props) {
	let { type } = $$props;
	const labels = {
		subscription: "Subscription",
		guest: "Guest",
		"one-time": "One-time"
	};
	Badge($$renderer, {
		variant: "outline",
		children: ($$renderer) => {
			$$renderer.push(`<!---->${escape_html(labels[type] ?? type)}`);
		},
		$$slots: { default: true }
	});
}
//#endregion
//#region src/lib/components/dashboard/DeliveryAddonsCell.svelte
function DeliveryAddonsCell($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { id, type, addons } = $$props;
		const summary = derived(() => addons.length ? addons.map((a) => `${a.name}${a.quantity > 1 ? ` x${a.quantity}` : ""}${a.recurring ? " (recurring)" : ""}`).join(", ") : "—");
		$$renderer.push(`<div class="flex items-center gap-2"><span class="text-sm">${escape_html(summary())}</span> `);
		if (type === "subscription") {
			$$renderer.push("<!--[0-->");
			Button($$renderer, {
				href: `?manageAddons=${stringify$1(id)}`,
				variant: "ghost",
				size: "icon",
				class: "size-6 shrink-0",
				"aria-label": "Manage add-ons",
				children: ($$renderer) => {
					Pencil($$renderer, { class: "h-3.5 w-3.5" });
				},
				$$slots: { default: true }
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
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
		accessorKey: "type",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Type",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => renderComponent(TypeBadge, { type: row.original.type })
	},
	{
		accessorKey: "scheduledDate",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Date",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => formatEthiopianDate(new Date(info.getValue()))
	},
	{
		accessorKey: "subscriberName",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Customer",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => row.original.subscriberName || "—"
	},
	{
		accessorKey: "subscriberEmail",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Customer Email",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => row.original.subscriberEmail || "—"
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
		accessorKey: "addons",
		header: "Add-ons",
		enableSorting: false,
		cell: ({ row }) => renderComponent(DeliveryAddonsCell, {
			id: row.original.id,
			type: row.original.type,
			addons: row.original.addons
		})
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
		cell: ({ row }) => {
			const { id, type } = row.original;
			if (type === "subscription") return renderComponent(RowActions, {
				id,
				label: "delivery"
			});
			return renderComponent(RowActions, {
				id,
				label: type === "guest" ? "guest order" : "one-time order",
				editHref: `${type === "guest" ? "/dashboard/orders/guest" : "/dashboard/orders/one-time"}?edit=${id}`,
				deleteAction: "?/deleteOrder",
				hiddenFields: { type }
			});
		}
	}
];
//#endregion
//#region src/routes/dashboard/deliveries/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		let notifyOpen = false;
		let notifyRows = [];
		let notifyPrefill = null;
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
		const managingAddonsId = derived(() => page.url.searchParams.get("manageAddons"));
		const managingDelivery = derived(() => data.rows.find((r) => r.id === managingAddonsId()));
		let newAddonId = "";
		let newAddonQty = 1;
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
		const { form: skipForm, errors: skipErrors, delayed: skipDelayed, allErrors: skipAllErrors } = superForm(data.skipDateForm, {
			id: "skip-date",
			resetForm: true,
			invalidateAll: true,
			validators: zodClient(skipDateSchema),
			onUpdated({ form: f }) {
				const msg = f.message;
				if (!msg) return;
				toast[msg.type === "error" ? "error" : "success"](msg.text);
				if (msg.type === "success" && msg.affected?.length) {
					notifyRows = msg.affected.map((r, i) => ({
						id: String(i),
						email: r.email,
						name: r.name
					}));
					notifyPrefill = {
						subject: `Your delivery has moved to ${msg.newDateLabel}`,
						message: `<p>Hi,</p><p>We're not delivering on ${msg.skippedDateLabel}, so your next delivery has moved to <strong>${msg.newDateLabel}</strong>. Nothing else changes — same order, same address.</p><p>Sorry for the short notice, and thanks for your patience.</p>`
					};
					notifyOpen = true;
				}
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
			$$renderer.push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-4"><h1 class="dash-heading text-2xl font-semibold">Deliveries &amp; Orders</h1> <div class="flex items-center gap-3"><a href="/dashboard/deliveries/route" class="rounded-md border px-3 py-1.5 text-sm hover:border-[#a45926] hover:text-[#a45926]">Plan delivery route</a> `);
			BulkEmailDialog($$renderer, {
				bulkEmailForm: data.bulkEmailForm,
				rows: selectedRows.map((r) => ({
					id: r.id,
					email: r.subscriberEmail,
					name: r.subscriberName
				}))
			});
			$$renderer.push(`<!----></div></div> `);
			BulkEmailDialog($$renderer, {
				bulkEmailForm: data.bulkEmailForm,
				rows: notifyRows,
				hideTrigger: true,
				prefill: notifyPrefill,
				get open() {
					return notifyOpen;
				},
				set open($$value) {
					notifyOpen = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			if (Card) {
				$$renderer.push("<!--[-->");
				Card($$renderer, {
					class: "mb-8 w-full lg:w-lg",
					children: ($$renderer) => {
						if (Card_header) {
							$$renderer.push("<!--[-->");
							Card_header($$renderer, {
								children: ($$renderer) => {
									if (Card_title) {
										$$renderer.push("<!--[-->");
										Card_title($$renderer, {
											children: ($$renderer) => {
												$$renderer.push(`<!---->Saturday delivery calendar`);
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
												$$renderer.push(`<!---->We deliver every Saturday by default. Skip a Saturday here and any deliveries already
			booked for it move automatically to the next one.`);
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
								class: "flex flex-col gap-5",
								children: ($$renderer) => {
									$$renderer.push(`<form method="POST" action="?/addSkipDate" id="skip-date-form" class="flex flex-col gap-4">`);
									Errors($$renderer, { allErrors: store_get($$store_subs ??= {}, "$skipAllErrors", skipAllErrors) });
									$$renderer.push(`<!----> `);
									InputComp($$renderer, {
										label: "Date to skip",
										form: skipForm,
										errors: skipErrors,
										type: "date",
										name: "date",
										oldDays: false,
										futureDays: false
									});
									$$renderer.push(`<!----> `);
									InputComp($$renderer, {
										label: "Reason (optional)",
										form: skipForm,
										errors: skipErrors,
										type: "text",
										name: "reason",
										placeholder: "e.g. Bank holiday"
									});
									$$renderer.push(`<!----> `);
									Button($$renderer, {
										type: "submit",
										form: "skip-date-form",
										class: "w-fit",
										children: ($$renderer) => {
											if (store_get($$store_subs ??= {}, "$skipDelayed", skipDelayed)) {
												$$renderer.push("<!--[0-->");
												LoadingBtn($$renderer, { name: "Saving" });
											} else {
												$$renderer.push("<!--[-1-->");
												$$renderer.push(`Skip this date`);
											}
											$$renderer.push(`<!--]-->`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----></form> `);
									if (data.skipDates.length > 0) {
										$$renderer.push("<!--[0-->");
										$$renderer.push(`<ul class="flex flex-col gap-2 border-t pt-4"><!--[-->`);
										const each_array = ensure_array_like(data.skipDates);
										for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
											let skip = each_array[$$index];
											$$renderer.push(`<li class="flex items-center justify-between gap-3 text-sm"><span>${escape_html(new Date(skip.date).toLocaleDateString("en-GB", {
												weekday: "long",
												day: "numeric",
												month: "long",
												year: "numeric"
											}))} `);
											if (skip.reason) {
												$$renderer.push("<!--[0-->");
												$$renderer.push(`<span class="text-muted-foreground">— ${escape_html(skip.reason)}</span>`);
											} else $$renderer.push("<!--[-1-->");
											$$renderer.push(`<!--]--></span> <form method="POST" action="?/deleteSkipDate"><input type="hidden" name="id"${attr("value", skip.id)}/> `);
											Button($$renderer, {
												type: "submit",
												variant: "ghost",
												size: "icon",
												"aria-label": "Remove skip date",
												children: ($$renderer) => {
													Trash_2($$renderer, { class: "h-4 w-4" });
												},
												$$slots: { default: true }
											});
											$$renderer.push(`<!----></form></li>`);
										}
										$$renderer.push(`<!--]--></ul>`);
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
			if (managingAddonsId() && managingDelivery()) {
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
													$$renderer.push(`<!---->Add-ons — ${escape_html(managingDelivery().subscriberName || managingDelivery().subscriberEmail)}`);
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
									class: "flex flex-col gap-5",
									children: ($$renderer) => {
										if (managingDelivery().addons.length > 0) {
											$$renderer.push("<!--[0-->");
											$$renderer.push(`<ul class="flex flex-col gap-2"><!--[-->`);
											const each_array_1 = ensure_array_like(managingDelivery().addons);
											for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
												let addon = each_array_1[$$index_1];
												$$renderer.push(`<li class="flex items-center justify-between gap-3 text-sm"><span>${escape_html(addon.name)}${escape_html(addon.quantity > 1 ? ` x${addon.quantity}` : "")} `);
												if (addon.recurring) {
													$$renderer.push("<!--[0-->");
													$$renderer.push(`<span class="text-muted-foreground">(recurring — edit on the subscription)</span>`);
												} else $$renderer.push("<!--[-1-->");
												$$renderer.push(`<!--]--></span> `);
												if (!addon.recurring) {
													$$renderer.push("<!--[0-->");
													$$renderer.push(`<form method="POST" action="?/removeDeliveryAddon"><input type="hidden" name="deliveryId"${attr("value", managingAddonsId())}/> <input type="hidden" name="name"${attr("value", addon.name)}/> `);
													Button($$renderer, {
														type: "submit",
														variant: "ghost",
														size: "icon",
														"aria-label": "Remove add-on",
														children: ($$renderer) => {
															Trash_2($$renderer, { class: "h-4 w-4" });
														},
														$$slots: { default: true }
													});
													$$renderer.push(`<!----></form>`);
												} else $$renderer.push("<!--[-1-->");
												$$renderer.push(`<!--]--></li>`);
											}
											$$renderer.push(`<!--]--></ul>`);
										} else {
											$$renderer.push("<!--[-1-->");
											$$renderer.push(`<p class="text-sm text-muted-foreground">No add-ons on this delivery yet.</p>`);
										}
										$$renderer.push(`<!--]--> <form method="POST" action="?/addDeliveryAddon" class="flex flex-wrap items-end gap-3 border-t pt-4"><input type="hidden" name="deliveryId"${attr("value", managingAddonsId())}/> <div class="flex flex-col gap-2">`);
										Label($$renderer, {
											for: "addDeliveryAddon-addonId",
											children: ($$renderer) => {
												$$renderer.push(`<!---->Add-on`);
											},
											$$slots: { default: true }
										});
										$$renderer.push(`<!----> `);
										SelectComp($$renderer, {
											name: "addonId",
											items: data.addonCatalogue.map((a) => ({
												value: a.id,
												name: a.name
											})),
											get value() {
												return newAddonId;
											},
											set value($$value) {
												newAddonId = $$value;
												$$settled = false;
											}
										});
										$$renderer.push(`<!----></div> <div class="flex flex-col gap-2">`);
										Label($$renderer, {
											for: "addDeliveryAddon-quantity",
											children: ($$renderer) => {
												$$renderer.push(`<!---->Qty`);
											},
											$$slots: { default: true }
										});
										$$renderer.push(`<!----> `);
										Input($$renderer, {
											type: "number",
											name: "quantity",
											min: "1",
											class: "w-20",
											get value() {
												return newAddonQty;
											},
											set value($$value) {
												newAddonQty = $$value;
												$$settled = false;
											}
										});
										$$renderer.push(`<!----></div> `);
										Button($$renderer, {
											type: "submit",
											disabled: !newAddonId,
											children: ($$renderer) => {
												$$renderer.push(`<!---->Add`);
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
				filterKeys: [
					"type",
					"status",
					"planName"
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
//# sourceMappingURL=_page.svelte.js-D5l-QbdD.js.map
