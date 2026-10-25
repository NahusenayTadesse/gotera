import { a0 as head, a4 as ensure_array_like, $ as attr, ab as stringify$1, a6 as escape_html, T as derived, a7 as spread_props, aa as attr_class, a3 as clsx$1, ac as attr_style, a8 as bind_props, ae as store_get, af as unsubscribe_stores } from '../../../../chunks/server.js-qDPizQqb.js';
import { g as goto } from '../../../../chunks/client.js-C3Iq_YCw.js';
import { p as page } from '../../../../chunks/state.js-BA9nQlv7.js';
import { I as Icon } from '../../../../chunks/Icon.js-Dm6aSBgb.js';
import { F as FilterMenu } from '../../../../chunks/FilterMenu.js-BjbARZ0-.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../chunks/data-table-sort.js-CN953cry.js';
import { I as InputComp } from '../../../../chunks/InputComp.js-B5l34a7g.js';
import { B as Ban } from '../../../../chunks/ban.js-C6mDh4Ux.js';
import { B as Boxes } from '../../../../chunks/boxes.js-CpQYiZba.js';
import { C as Chevron_left } from '../../../../chunks/chevron-left.js-CzlLlj9a.js';
import { C as Chevron_right } from '../../../../chunks/chevron-right.js-Bu3_elXi.js';
import { S as SelectComp } from '../../../../chunks/SelectComp.js-DHbV5UZH.js';
import { B as Badge, S as Statuses } from '../../../../chunks/statuses.js-CqI0SEDd.js';
import { P as Pencil } from '../../../../chunks/pencil.js-DI8R1Xzc.js';
import { T as Trash_2 } from '../../../../chunks/trash-2.js-CiUzWTiQ.js';
import { U as Undo_2 } from '../../../../chunks/undo-2.js-xy86FTlI.js';
import { X } from '../../../../chunks/x.js-TlRuKVU4.js';
import { L as Label } from '../../../../chunks/label.js-B89gGnUJ.js';
import { B as Button } from '../../../../chunks/button.js-DWWbYMWk.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import { I as Input } from '../../../../chunks/input.js-DivymZKU.js';
import { f as formatEthiopianDate } from '../../../../chunks/global.svelte.js-Dj9QIDov.js';
import { L as LoadingBtn } from '../../../../chunks/LoadingBtn.js-CYZ6Npjp.js';
import { C as Card, b as Card_header, a as Card_content, c as Card_title, d as Card_description } from '../../../../chunks/card.js-CLGpEPTV.js';
import { b as superForm } from '../../../../chunks/client2.js-P7rUUC6q.js';
import { a as zodClient } from '../../../../chunks/adapters.js-DtwKAq2A.js';
import { R as RowActions } from '../../../../chunks/RowActions.js-CArzbBlU.js';
import { E as Errors } from '../../../../chunks/Errors.js-Czh0cSzk.js';
import { S as Select_cell, a as Select_header } from '../../../../chunks/select-cell.js-DvLHUk0e.js';
import { B as BulkEmailDialog } from '../../../../chunks/BulkEmailDialog.js-CB6qsFDG.js';
import { T as TypeBadge } from '../../../../chunks/TypeBadge.js-B-yRxSkm.js';
import { d as deliverySchema } from '../../../../chunks/schema10.js-CjrvrOQX.js';
import { B as BatchesCell } from '../../../../chunks/BatchesCell.js-bQMZXK7C.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/internal2.js-lGck33Tu.js';
import '../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../chunks/toast-state.svelte.js-CyESMgTY.js';
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
import '../../../../chunks/chevron-down.js-BUTnRWsm.js';
import '../../../../chunks/dropdown-menu.js-D5_JIqOL.js';
import '../../../../chunks/minus.js-JH-UUVfm.js';
import '../../../../chunks/menu.js-7FcOhF2b.js';
import '../../../../chunks/is-mobile.svelte.js-CSeMNCH2.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../chunks/badge-check.js-YjTSRpIb.js';
import '../../../../chunks/circle-alert.js-C4ujrG9B.js';
import '../../../../chunks/loader.js-BCe2CTsg.js';
import '../../../../chunks/textarea.js-BMgrLLbk.js';
import '../../../../chunks/checkbox2.js-DNmj6_T9.js';
import 'browser-image-compression';
import '../../../../index.js-B1Zbey_B.js';
import '../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../chunks/truck.js-CAOAaqne.js';
import '../../../../chunks/forms.js-qYr4b_YH.js';
import '../../../../chunks/stores.js-B52XgJS0.js';
import '../../../../chunks/access.js-j1_SnSd1.js';
import '../../../../chunks/ellipsis.js-Dns71XaR.js';
import '../../../../chunks/mail.js-QCnsJSf5.js';
import '../../../../chunks/send.js-DyYFjFrv.js';
import '../../../../chunks/DialogComp.js-Dv_gmm1G.js';
import '../../../../chunks/runtime.js-CbeSlHLA.js';
import '../../../../chunks/dialog.js-CxbB9n2U.js';
import '../../../../chunks/bulkEmail.js-DcIy_1Go.js';

//#region node_modules/@lucide/svelte/dist/icons/arrow-right-left.svelte
function Arrow_right_left($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "arrow-right-left" },
		props,
		{ iconNode: [
			["path", { "d": "m16 3 4 4-4 4" }],
			["path", { "d": "M20 7H4" }],
			["path", { "d": "m8 21-4-4 4-4" }],
			["path", { "d": "M4 17h16" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/list-filter.svelte
function List_filter($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "list-filter" },
		props,
		{ iconNode: [
			["path", { "d": "M2 5h20" }],
			["path", { "d": "M6 12h12" }],
			["path", { "d": "M9 19h6" }]
		] }
	]));
}
//#endregion
//#region src/lib/components/dashboard/WeekendPlanner.svelte
function WeekendPlanner($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { weekend, upcoming, skipDates, dayFilter = null, onMoved } = $$props;
		/** Which day's skip / move form is open: `skip:<date>` or `move:<date>`. */
		let openForm = null;
		let busy = null;
		const weekendHref = (start) => {
			const url = new URL(page.url);
			if (start) url.searchParams.set("weekend", start);
			else url.searchParams.delete("weekend");
			url.searchParams.delete("edit");
			url.searchParams.delete("manageAddons");
			return `${url.pathname}${url.search}`;
		};
		const weekday = (label) => label.split(", ")[0];
		const dayMonth = (label) => label.split(", ")[1] ?? label;
		const targetsFor = (date) => upcoming.filter((u) => u.date !== date && !u.skipped);
		const range = derived(() => `${dayMonth(weekend.days[0].label)} – ${dayMonth(weekend.days[2].label)}`);
		function statusOf(d) {
			if (d.skip) return {
				text: "Skipped",
				variant: "destructive"
			};
			if (d.isPast) return {
				text: "Past",
				variant: "secondary"
			};
			if (d.used >= d.capacity) return {
				text: "Full",
				variant: "destructive"
			};
			if (d.isToday) return {
				text: "Today",
				variant: "default"
			};
			return {
				text: "Open",
				variant: "outline"
			};
		}
		const selectClass = "w-full rounded-md border border-border bg-background p-2 text-base md:text-sm";
		const inputClass = selectClass;
		if (Card) {
			$$renderer.push("<!--[-->");
			Card($$renderer, {
				class: "mb-8 w-full",
				children: ($$renderer) => {
					if (Card_header) {
						$$renderer.push("<!--[-->");
						Card_header($$renderer, {
							class: "flex flex-row flex-wrap items-start justify-between gap-4",
							children: ($$renderer) => {
								$$renderer.push(`<div class="flex flex-col gap-1.5">`);
								if (Card_title) {
									$$renderer.push("<!--[-->");
									Card_title($$renderer, {
										children: ($$renderer) => {
											$$renderer.push(`<!---->Delivery weekend`);
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
											$$renderer.push(`<!---->We deliver Saturday, Sunday and Monday. Skip a single day, or move its deliveries to
				another day. Customers are booked onto the earliest open day.`);
										},
										$$slots: { default: true }
									});
									$$renderer.push("<!--]-->");
								} else {
									$$renderer.push("<!--[!-->");
									$$renderer.push("<!--]-->");
								}
								$$renderer.push(`</div> <nav class="flex items-center gap-1" aria-label="Choose weekend">`);
								Button($$renderer, {
									href: weekendHref(weekend.prev),
									variant: "ghost",
									size: "icon",
									"aria-label": "Previous weekend",
									children: ($$renderer) => {
										Chevron_left($$renderer, { class: "h-4 w-4" });
									},
									$$slots: { default: true }
								});
								$$renderer.push(`<!----> <span class="min-w-40 text-center text-sm font-medium">${escape_html(range())}</span> `);
								Button($$renderer, {
									href: weekendHref(weekend.next),
									variant: "ghost",
									size: "icon",
									"aria-label": "Next weekend",
									children: ($$renderer) => {
										Chevron_right($$renderer, { class: "h-4 w-4" });
									},
									$$slots: { default: true }
								});
								$$renderer.push(`<!----> `);
								if (!weekend.isCurrent) {
									$$renderer.push("<!--[0-->");
									Button($$renderer, {
										href: weekendHref(""),
										variant: "outline",
										size: "sm",
										class: "ml-1",
										children: ($$renderer) => {
											$$renderer.push(`<!---->This weekend`);
										},
										$$slots: { default: true }
									});
								} else $$renderer.push("<!--[-1-->");
								$$renderer.push(`<!--]--></nav>`);
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
							class: "flex flex-col gap-6",
							children: ($$renderer) => {
								$$renderer.push(`<div class="grid gap-4 md:grid-cols-3"><!--[-->`);
								const each_array = ensure_array_like(weekend.days);
								for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
									let d = each_array[$$index_2];
									const status = statusOf(d);
									const pct = Math.min(100, Math.round(d.used / Math.max(1, d.capacity) * 100));
									const targets = targetsFor(d.date);
									$$renderer.push(`<section${attr_class(clsx$1([
										"flex flex-col gap-3 rounded-lg border p-4",
										d.isPast && "opacity-70",
										d.skip && "border-dashed",
										dayFilter === d.date && "ring-2 ring-[#a45926]"
									]))}${attr("aria-label", d.label)}><header class="flex items-start justify-between gap-2"><div><p class="text-xs tracking-wide text-muted-foreground uppercase">${escape_html(weekday(d.label))}</p> <p class="text-lg font-semibold">${escape_html(dayMonth(d.label))}</p></div> `);
									Badge($$renderer, {
										variant: status.variant,
										children: ($$renderer) => {
											$$renderer.push(`<!---->${escape_html(status.text)}`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----></header> `);
									if (d.skip) {
										$$renderer.push("<!--[0-->");
										$$renderer.push(`<p class="text-sm text-muted-foreground">Not delivering${escape_html(d.skip.reason ? ` — ${d.skip.reason}` : "")}.</p>`);
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--> <div class="text-sm"><p><strong>${escape_html(d.pending)}</strong> to go out`);
									if (d.done) {
										$$renderer.push("<!--[0-->");
										$$renderer.push(`<span class="text-muted-foreground">· ${escape_html(d.done)} done</span>`);
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--></p> `);
									if (d.pending) {
										$$renderer.push("<!--[0-->");
										$$renderer.push(`<p class="text-xs text-muted-foreground">${escape_html(d.byType.subscription)} subscription · ${escape_html(d.byType.guest)} guest · ${escape_html(d.byType.oneTime)} one-time</p>`);
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--></div> `);
									if (!d.skip) {
										$$renderer.push("<!--[0-->");
										$$renderer.push(`<div class="flex flex-col gap-1"${attr("title", `${stringify$1(d.used)} of ${stringify$1(d.capacity)} units booked`)}><div class="h-1.5 w-full overflow-hidden rounded-full bg-muted"><div${attr_class(`h-full rounded-full ${pct >= 100 ? "bg-destructive" : pct >= 85 ? "bg-amber-500" : "bg-[#a45926]"}`)}${attr_style(`width: ${stringify$1(pct)}%`)}></div></div> <p class="text-xs text-muted-foreground">${escape_html(d.used)} / ${escape_html(d.capacity)} units</p></div>`);
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--> <div class="mt-auto flex flex-wrap gap-2">`);
									Button($$renderer, {
										type: "button",
										size: "sm",
										variant: dayFilter === d.date ? "default" : "outline",
										onclick: () => dayFilter = dayFilter === d.date ? null : d.date,
										children: ($$renderer) => {
											List_filter($$renderer, { class: "h-4 w-4" });
											$$renderer.push(`<!----> ${escape_html(dayFilter === d.date ? "Showing" : "Show")}`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----> `);
									if (!d.isPast) {
										$$renderer.push("<!--[0-->");
										if (d.skip) {
											$$renderer.push("<!--[0-->");
											$$renderer.push(`<form method="POST" action="?/unskipDay"><input type="hidden" name="id"${attr("value", d.skip.id)}/> `);
											Button($$renderer, {
												type: "submit",
												size: "sm",
												variant: "outline",
												disabled: false,
												children: ($$renderer) => {
													Undo_2($$renderer, { class: "h-4 w-4" });
													$$renderer.push(`<!----> Un-skip`);
												},
												$$slots: { default: true }
											});
											$$renderer.push(`<!----></form>`);
										} else {
											$$renderer.push("<!--[-1-->");
											Button($$renderer, {
												type: "button",
												size: "sm",
												variant: openForm === `skip:${d.date}` ? "secondary" : "outline",
												onclick: () => openForm = openForm === `skip:${d.date}` ? null : `skip:${d.date}`,
												children: ($$renderer) => {
													Ban($$renderer, { class: "h-4 w-4" });
													$$renderer.push(`<!----> Skip`);
												},
												$$slots: { default: true }
											});
											$$renderer.push(`<!----> `);
											if (d.pending) {
												$$renderer.push("<!--[0-->");
												Button($$renderer, {
													type: "button",
													size: "sm",
													variant: openForm === `move:${d.date}` ? "secondary" : "outline",
													onclick: () => openForm = openForm === `move:${d.date}` ? null : `move:${d.date}`,
													children: ($$renderer) => {
														Arrow_right_left($$renderer, { class: "h-4 w-4" });
														$$renderer.push(`<!----> Move all`);
													},
													$$slots: { default: true }
												});
											} else $$renderer.push("<!--[-1-->");
											$$renderer.push(`<!--]-->`);
										}
										$$renderer.push(`<!--]-->`);
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--></div> `);
									if (openForm === `skip:${d.date}`) {
										$$renderer.push("<!--[0-->");
										$$renderer.push(`<form method="POST" action="?/skipDay" class="flex flex-col gap-3 border-t pt-3"><input type="hidden" name="date"${attr("value", d.date)}/> <label class="flex flex-col gap-1 text-sm">Reason (optional) <input name="reason" maxlength="255" placeholder="e.g. Bank holiday"${attr_class(clsx$1(inputClass))}/></label> `);
										if (d.pending) {
											$$renderer.push("<!--[0-->");
											$$renderer.push(`<label class="flex flex-col gap-1 text-sm">Move its ${escape_html(d.pending)} ${escape_html(d.pending === 1 ? "booking" : "bookings")} to <select name="moveTo"${attr_class(clsx$1(selectClass))}>`);
											$$renderer.option({ value: "" }, ($$renderer) => {
												$$renderer.push(`Next open day`);
											});
											$$renderer.push(`<!--[-->`);
											const each_array_1 = ensure_array_like(targets);
											for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
												let t = each_array_1[$$index];
												$$renderer.option({ value: t.date }, ($$renderer) => {
													$$renderer.push(`${escape_html(t.label)} · ${escape_html(t.remaining)} left`);
												});
											}
											$$renderer.push(`<!--]--></select></label>`);
										} else $$renderer.push("<!--[-1-->");
										$$renderer.push(`<!--]--> `);
										Button($$renderer, {
											type: "submit",
											size: "sm",
											variant: "destructive",
											class: "w-fit",
											disabled: false,
											children: ($$renderer) => {
												$$renderer.push(`<!---->${escape_html(busy === `skip:${d.date}` ? "Skipping…" : `Skip ${weekday(d.label)}`)}`);
											},
											$$slots: { default: true }
										});
										$$renderer.push(`<!----></form>`);
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--> `);
									if (openForm === `move:${d.date}`) {
										$$renderer.push("<!--[0-->");
										$$renderer.push(`<form method="POST" action="?/moveDay" class="flex flex-col gap-3 border-t pt-3"><input type="hidden" name="from"${attr("value", d.date)}/> <label class="flex flex-col gap-1 text-sm">Move all ${escape_html(d.pending)} to <select name="to" required=""${attr_class(clsx$1(selectClass))}><!--[-->`);
										const each_array_2 = ensure_array_like(targets);
										for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
											let t = each_array_2[$$index_1];
											$$renderer.option({ value: t.date }, ($$renderer) => {
												$$renderer.push(`${escape_html(t.label)} · ${escape_html(t.remaining)} left`);
											});
										}
										$$renderer.push(`<!--]--></select></label> <p class="text-xs text-muted-foreground">${escape_html(weekday(d.label))} stays open for new orders. Skip it instead to close it.</p> `);
										Button($$renderer, {
											type: "submit",
											size: "sm",
											class: "w-fit",
											disabled: false,
											children: ($$renderer) => {
												$$renderer.push(`<!---->${escape_html(busy === `move:${d.date}` ? "Moving…" : "Move bookings")}`);
											},
											$$slots: { default: true }
										});
										$$renderer.push(`<!----></form>`);
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--></section>`);
								}
								$$renderer.push(`<!--]--></div> `);
								if (skipDates.length) {
									$$renderer.push("<!--[0-->");
									$$renderer.push(`<div class="flex flex-col gap-2 border-t pt-4"><h3 class="text-sm font-medium">Upcoming skipped days</h3> <ul class="flex flex-col gap-1"><!--[-->`);
									const each_array_3 = ensure_array_like(skipDates);
									for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
										let s = each_array_3[$$index_3];
										$$renderer.push(`<li class="flex items-center justify-between gap-3 text-sm"><a${attr("href", weekendHref(s.weekend))} class="hover:text-[#a45926] hover:underline">${escape_html(s.label)} `);
										if (s.reason) {
											$$renderer.push("<!--[0-->");
											$$renderer.push(`<span class="text-muted-foreground">— ${escape_html(s.reason)}</span>`);
										} else $$renderer.push("<!--[-1-->");
										$$renderer.push(`<!--]--></a> <form method="POST" action="?/unskipDay"><input type="hidden" name="id"${attr("value", s.id)}/> `);
										Button($$renderer, {
											type: "submit",
											variant: "ghost",
											size: "icon",
											"aria-label": `Un-skip ${stringify$1(s.label)}`,
											disabled: false,
											children: ($$renderer) => {
												Trash_2($$renderer, { class: "h-4 w-4" });
											},
											$$slots: { default: true }
										});
										$$renderer.push(`<!----></form></li>`);
									}
									$$renderer.push(`<!--]--></ul></div>`);
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
		bind_props($$props, { dayFilter });
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
		accessorKey: "trace",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Batches",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => renderComponent(BatchesCell, {
			type: row.original.traceType,
			id: row.original.id,
			state: row.original.traceState,
			batches: row.original.batches
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
		/** Set from a weekend day card's "Show" — narrows the table to that one day. */
		let dayFilter = null;
		const tableRows = derived(() => dayFilter ? filteredRows.filter((r) => r.day === dayFilter) : filteredRows);
		const dayFilterLabel = derived(() => dayFilter ? data.weekend.days.find((d) => d.date === dayFilter)?.label ?? data.upcoming.find((u) => u.date === dayFilter)?.label ?? dayFilter : "");
		/** Rows the "move selected" bar can actually move: still to go out. */
		const movableSelected = derived(() => selectedRows.filter((r) => r.status === "scheduled" || r.status === "paid"));
		const moveTargets = derived(() => data.upcoming.filter((u) => !u.skipped));
		let moveTo = "";
		/** Open the notice email, prefilled, for whoever a skip/move just affected. */
		function offerNotice(r) {
			notifyRows = r.affected.map((a, i) => ({
				id: String(i),
				email: a.email,
				name: a.name
			}));
			notifyPrefill = {
				subject: `Your delivery has moved to ${r.toLabel}`,
				message: r.fromLabel ? `<p>Hi,</p><p>We've had to change our delivery plan for ${r.fromLabel}, so your delivery has moved to <strong>${r.toLabel}</strong>. Nothing else changes — same order, same address.</p><p>Sorry for any inconvenience, and thanks for your patience.</p>` : `<p>Hi,</p><p>Your next delivery has moved to <strong>${r.toLabel}</strong>. Nothing else changes — same order, same address.</p><p>Thanks for your patience.</p>`
			};
			notifyOpen = true;
		}
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
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("1k01ty6", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Deliveries</title>`);
				});
			});
			$$renderer.push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-4"><h1 class="dash-heading text-2xl font-semibold">Deliveries &amp; Orders</h1> <div class="flex items-center gap-3"><a href="/dashboard/deliveries/route" class="rounded-md border px-3 py-1.5 text-sm hover:border-[#a45926] hover:text-[#a45926]">Plan delivery route</a> `);
			if (movableSelected().length) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<form method="POST" action="?/moveSelected" class="flex items-center gap-2"><!--[-->`);
				const each_array = ensure_array_like(movableSelected());
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let r = each_array[$$index];
					$$renderer.push(`<input type="hidden" name="refs"${attr("value", `${stringify$1(r.traceType)}:${stringify$1(r.id)}`)}/>`);
				}
				$$renderer.push(`<!--]--> `);
				$$renderer.select({
					name: "to",
					required: true,
					value: moveTo,
					"aria-label": "Move selected to",
					class: "rounded-md border border-border bg-background p-1.5 text-base md:text-sm"
				}, ($$renderer) => {
					$$renderer.option({
						value: "",
						disabled: true
					}, ($$renderer) => {
						$$renderer.push(`Move to…`);
					});
					$$renderer.push(`<!--[-->`);
					const each_array_1 = ensure_array_like(moveTargets());
					for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
						let t = each_array_1[$$index_1];
						$$renderer.option({ value: t.date }, ($$renderer) => {
							$$renderer.push(`${escape_html(t.label)} · ${escape_html(t.remaining)} left`);
						});
					}
					$$renderer.push(`<!--]-->`);
				});
				$$renderer.push(` `);
				Button($$renderer, {
					type: "submit",
					size: "sm",
					variant: "outline",
					disabled: true,
					children: ($$renderer) => {
						Arrow_right_left($$renderer, { class: "h-4 w-4" });
						$$renderer.push(`<!----> ${escape_html(`Move (${movableSelected().length})`)}`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></form>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (selectedRows.length) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<form method="POST" action="?/assignBatches"><!--[-->`);
				const each_array_2 = ensure_array_like(selectedRows);
				for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
					let r = each_array_2[$$index_2];
					$$renderer.push(`<input type="hidden" name="refs"${attr("value", `${stringify$1(r.traceType)}:${stringify$1(r.id)}`)}/>`);
				}
				$$renderer.push(`<!--]--> `);
				Button($$renderer, {
					type: "submit",
					size: "sm",
					variant: "outline",
					children: ($$renderer) => {
						Boxes($$renderer, { class: "h-4 w-4" });
						$$renderer.push(`<!----> Assign batches (${escape_html(selectedRows.length)})`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></form>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
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
			WeekendPlanner($$renderer, {
				weekend: data.weekend,
				upcoming: data.upcoming,
				skipDates: data.skipDates,
				onMoved: offerNotice,
				get dayFilter() {
					return dayFilter;
				},
				set dayFilter($$value) {
					dayFilter = $$value;
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
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
											const each_array_3 = ensure_array_like(managingDelivery().addons);
											for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
												let addon = each_array_3[$$index_3];
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
			if (dayFilter) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="mb-3 flex items-center gap-2 text-sm"><span>Showing <strong>${escape_html(dayFilterLabel())}</strong> only</span> `);
				Button($$renderer, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onclick: () => dayFilter = null,
					children: ($$renderer) => {
						X($$renderer, { class: "h-4 w-4" });
						$$renderer.push(`<!----> Show all days`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			FilterMenu($$renderer, {
				data: data.rows,
				filterKeys: [
					"type",
					"status",
					"planName",
					"trace"
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
				data: tableRows(),
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
//# sourceMappingURL=_page.svelte.js-CigmvxUl.js.map
