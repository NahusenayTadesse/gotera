import { a0 as head, a6 as escape_html, a4 as ensure_array_like, aa as attr_class, a3 as clsx$1, T as derived, a8 as bind_props, ab as stringify$1, $ as attr } from './server.js-qDPizQqb.js';
import { c as shortDate, i as instantDate } from './format.js-CaMNmk6h.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from './data-table-sort.js-DI5dH2-_.js';
import { C as Check } from './check.js-BvFzUyRW.js';
import { S as Statuses } from './statuses.js-CqI0SEDd.js';
import { E as Eye } from './eye.js-BLnu78mV.js';
import { M as Message_circle } from './message-circle.js-DNYefDRi.js';
import { X } from './x.js-TlRuKVU4.js';
import { A as Alert_dialog, a as Alert_dialog_content, b as Alert_dialog_header, d as Alert_dialog_title, e as Alert_dialog_description, c as Alert_dialog_footer, f as Alert_dialog_cancel } from './alert-dialog.js-BzbLjukm.js';
import { L as Label } from './label.js-B89gGnUJ.js';
import { B as Button } from './button.js-DWWbYMWk.js';
import './shared.js-CgqsOrws.js';
import './client.js-D8k391-h.js';
import { I as Input } from './input.js-DivymZKU.js';
import { C as Card, b as Card_header, d as Card_description, c as Card_title } from './card.js-CLGpEPTV.js';
import { f as formatGBP } from './format2.js-D8oyWA_y.js';
import { D as Data_table_links } from './data-table-links.js-BsaFS2s5.js';
import { S as Select_cell, a as Select_header } from './select-cell.js-s6g7JHlM.js';
import { S as STATUS_PAGES, C as CATEGORY_LABELS, P as PARTNER_CATEGORY_KEYS, a as SUPPLIER_CATEGORY_KEYS, c as categoryLabel } from './labels.js-D_c71aEk.js';

//#region src/routes/dashboard/partners/PartnerRowActions.svelte
function PartnerRowActions($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { partner, onAction } = $$props;
		$$renderer.push(`<div class="flex items-center gap-1">`);
		if (partner.status !== "approved") {
			$$renderer.push("<!--[0-->");
			Button($$renderer, {
				size: "sm",
				class: "h-8 px-2",
				onclick: () => onAction("approved", [partner]),
				children: ($$renderer) => {
					Check($$renderer, { class: "h-4 w-4" });
					$$renderer.push(`<!----> Approve`);
				},
				$$slots: { default: true }
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (partner.status === "new") {
			$$renderer.push("<!--[0-->");
			Button($$renderer, {
				size: "icon",
				variant: "outline",
				class: "size-8",
				title: "Mark as contacted",
				"aria-label": `Mark ${stringify$1(partner.businessName)} as contacted`,
				onclick: () => onAction("contacted", [partner]),
				children: ($$renderer) => {
					Message_circle($$renderer, { class: "h-4 w-4" });
				},
				$$slots: { default: true }
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (partner.status !== "declined") {
			$$renderer.push("<!--[0-->");
			Button($$renderer, {
				size: "sm",
				variant: "outline",
				class: "h-8 px-2 text-red-600",
				onclick: () => onAction("declined", [partner]),
				children: ($$renderer) => {
					X($$renderer, { class: "h-4 w-4" });
					$$renderer.push(`<!----> ${escape_html(partner.status === "approved" ? "End" : "Decline")}`);
				},
				$$slots: { default: true }
			});
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		Button($$renderer, {
			size: "icon",
			variant: "ghost",
			class: "size-8",
			href: `/dashboard/partners/${stringify$1(partner.id)}`,
			title: "Open",
			"aria-label": `Open ${stringify$1(partner.businessName)}`,
			children: ($$renderer) => {
				Eye($$renderer, { class: "h-4 w-4" });
			},
			$$slots: { default: true }
		});
		$$renderer.push(`<!----></div>`);
	});
}
//#endregion
//#region src/routes/dashboard/partners/columns.ts
/** Built per page so the row buttons can open that page's confirmation dialog. */
var createColumns = (onAction) => [
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
		accessorKey: "businessName",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Business",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => renderComponent(Data_table_links, {
			id: row.original.id,
			name: row.original.businessName,
			link: "/dashboard/partners"
		})
	},
	{
		accessorKey: "type",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Type",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => info.getValue() === "supplier" ? "Supplier" : "Partner"
	},
	{
		accessorKey: "category",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Category",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => categoryLabel(info.getValue())
	},
	{
		accessorKey: "contactName",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Contact",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	},
	{
		accessorKey: "email",
		header: "Email"
	},
	{
		accessorKey: "phone",
		header: "Phone",
		cell: (info) => info.getValue() || "—"
	},
	{
		accessorKey: "city",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Location",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => [row.original.city, row.original.postcode].filter(Boolean).join(", ") || "—"
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
		accessorKey: "deliveryCount",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Deliveries",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	},
	{
		accessorKey: "lastDelivery",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Last Delivery",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => info.getValue() ? shortDate(info.getValue()) : "—"
	},
	{
		accessorKey: "totalValuePence",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Value",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => info.getValue() ? formatGBP(info.getValue()) : "—"
	},
	{
		accessorKey: "nextScheduled",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Next Scheduled",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => info.getValue() ? shortDate(info.getValue()) : "—"
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Applied",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => instantDate(info.getValue())
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => renderComponent(PartnerRowActions, {
			partner: row.original,
			onAction
		})
	}
];
//#endregion
//#region src/routes/dashboard/partners/StatusDialog.svelte
function StatusDialog($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { change = void 0, onDone } = $$props;
		let submitting = false;
		const COPY = {
			approved: {
				verb: "Approve",
				body: "They move to Approved and you can start logging their deliveries.",
				done: "approved"
			},
			contacted: {
				verb: "Mark as contacted",
				body: "Use this once you have been in touch and the conversation is ongoing.",
				done: "marked as contacted"
			},
			declined: {
				verb: "Decline",
				body: "Declined applications, and approved ones whose partnership has ended, move to Declined / Ended. Delivery history is kept.",
				done: "declined"
			}
		};
		const copy = derived(() => change ? COPY[change.status] : null);
		const count = derived(() => change?.partners.length ?? 0);
		const endsPartnership = derived(() => change?.status === "declined" && change.partners.some((p) => p.status === "approved"));
		const shown = derived(() => change?.partners.slice(0, 8) ?? []);
		if (Alert_dialog) {
			$$renderer.push("<!--[-->");
			Alert_dialog($$renderer, {
				open: !!change,
				onOpenChange: (open) => {
					if (!open && true) change = null;
				},
				children: ($$renderer) => {
					if (Alert_dialog_content) {
						$$renderer.push("<!--[-->");
						Alert_dialog_content($$renderer, {
							children: ($$renderer) => {
								if (change && copy()) {
									$$renderer.push("<!--[0-->");
									if (Alert_dialog_header) {
										$$renderer.push("<!--[-->");
										Alert_dialog_header($$renderer, {
											children: ($$renderer) => {
												if (Alert_dialog_title) {
													$$renderer.push("<!--[-->");
													Alert_dialog_title($$renderer, {
														children: ($$renderer) => {
															$$renderer.push(`<!---->${escape_html(copy().verb)}
					${escape_html(count() === 1 ? change.partners[0].businessName : `${count()} applications`)}?`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
												$$renderer.push(` `);
												if (Alert_dialog_description) {
													$$renderer.push("<!--[-->");
													Alert_dialog_description($$renderer, {
														children: ($$renderer) => {
															$$renderer.push(`<!---->${escape_html(copy().body)} `);
															if (endsPartnership()) {
																$$renderer.push("<!--[0-->");
																$$renderer.push(`<strong class="mt-2 block text-foreground">This ends the partnership for ${escape_html(count() === 1 ? "an approved partner" : "approved partners")} in
							the selection.</strong>`);
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
									if (count() > 1) {
										$$renderer.push("<!--[0-->");
										$$renderer.push(`<ul class="max-h-48 overflow-y-auto rounded-md border border-border p-3 text-sm"><!--[-->`);
										const each_array = ensure_array_like(shown());
										for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
											let p = each_array[$$index];
											$$renderer.push(`<li class="flex justify-between gap-3 py-0.5"><span class="truncate">${escape_html(p.businessName)}</span> <span class="shrink-0 text-muted-foreground capitalize">${escape_html(p.status)}</span></li>`);
										}
										$$renderer.push(`<!--]--> `);
										if (count() > shown().length) {
											$$renderer.push("<!--[0-->");
											$$renderer.push(`<li class="pt-1 text-muted-foreground">+${escape_html(count() - shown().length)} more</li>`);
										} else $$renderer.push("<!--[-1-->");
										$$renderer.push(`<!--]--></ul>`);
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--> <form method="POST" action="?/setStatus"><input type="hidden" name="status"${attr("value", change.status)}/> <!--[-->`);
									const each_array_1 = ensure_array_like(change.partners);
									for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
										let p = each_array_1[$$index_1];
										$$renderer.push(`<input type="hidden" name="ids"${attr("value", p.id)}/>`);
									}
									$$renderer.push(`<!--]--> `);
									if (Alert_dialog_footer) {
										$$renderer.push("<!--[-->");
										Alert_dialog_footer($$renderer, {
											children: ($$renderer) => {
												if (Alert_dialog_cancel) {
													$$renderer.push("<!--[-->");
													Alert_dialog_cancel($$renderer, {
														type: "button",
														disabled: submitting,
														children: ($$renderer) => {
															$$renderer.push(`<!---->Cancel`);
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
													type: "submit",
													disabled: submitting,
													variant: change.status === "declined" ? "destructive" : "default",
													children: ($$renderer) => {
														$$renderer.push("<!--[-1-->");
														$$renderer.push(`${escape_html(endsPartnership() && count() === 1 ? "End partnership" : copy().verb)}`);
														$$renderer.push(`<!--]-->`);
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
									$$renderer.push(`</form>`);
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
		bind_props($$props, { change });
	});
}
//#endregion
//#region src/routes/dashboard/partners/PartnersList.svelte
function PartnersList($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const current = derived(() => STATUS_PAGES.find((p) => p.status === data.status) ?? STATUS_PAGES[0]);
		const total = derived(() => Object.values(data.statusCounts).reduce((a, b) => a + b, 0));
		const countFor = (status) => status ? data.statusCounts[status] : total();
		const categoryKeys = derived(() => data.filters.type === "partner" ? PARTNER_CATEGORY_KEYS : data.filters.type === "supplier" ? SUPPLIER_CATEGORY_KEYS : [.../* @__PURE__ */ new Set([...PARTNER_CATEGORY_KEYS, ...SUPPLIER_CATEGORY_KEYS])]);
		const hasFilters = derived(() => Object.values(data.filters).some(Boolean));
		const stats = derived(() => [
			{
				label: "Showing",
				value: String(data.rows.length)
			},
			{
				label: "Partners",
				value: String(data.rows.filter((r) => r.type === "partner").length)
			},
			{
				label: "Suppliers",
				value: String(data.rows.filter((r) => r.type === "supplier").length)
			},
			{
				label: "Deliveries",
				value: String(data.rows.reduce((n, r) => n + r.deliveryCount, 0))
			},
			{
				label: "Delivered value",
				value: formatGBP(data.rows.reduce((n, r) => n + r.totalValuePence, 0))
			}
		]);
		let change = null;
		let selected = [];
		const openDialog = (status, partners) => change = {
			status,
			partners: partners.map(({ id, businessName, status }) => ({
				id,
				businessName,
				status
			}))
		};
		const columns = createColumns(openDialog);
		const canApprove = derived(() => selected.some((r) => r.status !== "approved"));
		const canContact = derived(() => selected.some((r) => r.status === "new"));
		const canDecline = derived(() => selected.some((r) => r.status !== "declined"));
		const bulk = (status) => openDialog(status, selected.filter((r) => r.status !== status));
		const selectClass = "border-input h-9 rounded-md border bg-transparent px-3 text-base md:text-sm dark:bg-input/30";
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("d816uq", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>${escape_html(current().heading)}</title>`);
				});
			});
			$$renderer.push(`<h1 class="dash-heading mb-4 text-2xl font-semibold">${escape_html(current().heading)}</h1> <nav class="mb-6 flex flex-wrap gap-2" aria-label="Partner status"><!--[-->`);
			const each_array = ensure_array_like(STATUS_PAGES);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let tab = each_array[$$index];
				Button($$renderer, {
					href: tab.href,
					size: "sm",
					variant: tab.status === data.status ? "default" : "outline",
					"aria-current": tab.status === data.status ? "page" : void 0,
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(tab.title)} <span class="rounded-full bg-background/20 px-1.5 text-xs tabular-nums">${escape_html(countFor(tab.status))}</span>`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></nav> <form method="GET" class="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-border/60 bg-card/50 p-4"><div class="flex min-w-48 flex-1 flex-col gap-1.5">`);
			Label($$renderer, {
				for: "q",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Search`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				id: "q",
				name: "q",
				value: data.filters.q,
				placeholder: "Business, contact, email, city…"
			});
			$$renderer.push(`<!----></div> <div class="flex flex-col gap-1.5">`);
			Label($$renderer, {
				for: "type",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Type`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> <select id="type" name="type"${attr_class(clsx$1(selectClass))}>`);
			$$renderer.option({
				value: "",
				selected: !data.filters.type
			}, ($$renderer) => {
				$$renderer.push(`All`);
			});
			$$renderer.option({
				value: "partner",
				selected: data.filters.type === "partner"
			}, ($$renderer) => {
				$$renderer.push(`Partners`);
			});
			$$renderer.option({
				value: "supplier",
				selected: data.filters.type === "supplier"
			}, ($$renderer) => {
				$$renderer.push(`Suppliers`);
			});
			$$renderer.push(`</select></div> <div class="flex flex-col gap-1.5">`);
			Label($$renderer, {
				for: "category",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Category`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> <select id="category" name="category"${attr_class(clsx$1(selectClass))}>`);
			$$renderer.option({
				value: "",
				selected: !data.filters.category
			}, ($$renderer) => {
				$$renderer.push(`All`);
			});
			$$renderer.push(`<!--[-->`);
			const each_array_1 = ensure_array_like(categoryKeys());
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let key = each_array_1[$$index_1];
				$$renderer.option({
					value: key,
					selected: data.filters.category === key
				}, ($$renderer) => {
					$$renderer.push(`${escape_html(CATEGORY_LABELS[key])}`);
				});
			}
			$$renderer.push(`<!--]--></select></div> <div class="flex flex-col gap-1.5">`);
			Label($$renderer, {
				for: "from",
				children: ($$renderer) => {
					$$renderer.push(`<!---->Applied from`);
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
					$$renderer.push(`<!---->Applied to`);
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
					href: current().href,
					variant: "ghost",
					children: ($$renderer) => {
						$$renderer.push(`<!---->Reset`);
					},
					$$slots: { default: true }
				});
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></form> <div class="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5"><!--[-->`);
			const each_array_2 = ensure_array_like(stats());
			for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
				let stat = each_array_2[$$index_2];
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
												class: "text-2xl tabular-nums",
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
			if (selected.length > 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="sticky top-24 z-10 mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background/95 p-3 shadow-sm backdrop-blur" role="toolbar" aria-label="Bulk actions"><span class="mr-2 text-sm font-medium">${escape_html(selected.length)} selected</span> `);
				if (canApprove()) {
					$$renderer.push("<!--[0-->");
					Button($$renderer, {
						size: "sm",
						onclick: () => bulk("approved"),
						children: ($$renderer) => {
							Check($$renderer, { class: "h-4 w-4" });
							$$renderer.push(`<!----> Approve`);
						},
						$$slots: { default: true }
					});
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (canContact()) {
					$$renderer.push("<!--[0-->");
					Button($$renderer, {
						size: "sm",
						variant: "outline",
						onclick: () => bulk("contacted"),
						children: ($$renderer) => {
							Message_circle($$renderer, { class: "h-4 w-4" });
							$$renderer.push(`<!----> Mark contacted`);
						},
						$$slots: { default: true }
					});
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (canDecline()) {
					$$renderer.push("<!--[0-->");
					Button($$renderer, {
						size: "sm",
						variant: "outline",
						class: "text-red-600",
						onclick: () => bulk("declined"),
						children: ($$renderer) => {
							X($$renderer, { class: "h-4 w-4" });
							$$renderer.push(`<!----> Decline`);
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
					fileName: current().heading,
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
				$$renderer.push(`<p class="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">${escape_html(hasFilters() ? "Nothing matches these filters." : "Nothing here yet.")}</p>`);
			}
			$$renderer.push(`<!--]--> `);
			StatusDialog($$renderer, {
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

export { PartnersList as P };
//# sourceMappingURL=PartnersList.js-DqfwmnY2.js.map
