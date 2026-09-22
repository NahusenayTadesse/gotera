import { a0 as head, a4 as ensure_array_like, T as derived, a9 as escape_html, aa as attr_class, $ as attr } from '../../../../chunks/server.js-CPNQ0GBv.js';
import { P as Plus } from '../../../../chunks/plus.js-Dl_Aa2en.js';
import { B as Button } from '../../../../chunks/button.js-DMlVoc1I.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/client.js-BEm1lywY.js';
import { C as Card, b as Card_header, c as Card_title, a as Card_content } from '../../../../chunks/card.js-DgfKxiLl.js';
import '../../../../chunks/Icon.js-C-2f-rrd.js';
import '../../../../chunks/utils2.js-BChetszu.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/internal2.js-BO8lukLW.js';
import '../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/stock/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let pending = null;
		/** Rows grouped by date so each Saturday reads as one block. */
		const byDate = derived(() => {
			const map = /* @__PURE__ */ new Map();
			for (const row of data.rows) {
				const list = map.get(row.dateLabel) ?? [];
				list.push(row);
				map.set(row.dateLabel, list);
			}
			return [...map.entries()];
		});
		const level = (row) => row.remaining <= row.criticalThreshold ? "critical" : row.remaining <= row.lowThreshold ? "low" : "ok";
		head("khkb4e", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Stock</title>`);
			});
		});
		$$renderer.push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-4"><div><h1 class="dash-heading text-2xl font-semibold">Stock</h1> <p class="text-sm text-muted-foreground">Capacity per delivery Saturday. When a date fills up, new orders roll to the next one
			automatically.</p></div></div> `);
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
											$$renderer.push(`<!---->Open a date`);
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
								$$renderer.push(`<form method="POST" action="?/createRow" class="flex flex-wrap items-end gap-3"><label class="flex flex-col gap-1 text-sm">Saturday <input type="date" name="date" required="" class="rounded-md border border-border bg-background p-2 text-base md:text-sm"/></label> <label class="flex flex-col gap-1 text-sm">Item <select name="addonId" class="rounded-md border border-border bg-background p-2 text-base md:text-sm">`);
								$$renderer.option({ value: "main" }, ($$renderer) => {
									$$renderer.push(`Main product`);
								});
								$$renderer.push(`<!--[-->`);
								const each_array = ensure_array_like(data.catalogue);
								for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
									let a = each_array[$$index];
									$$renderer.option({ value: a.id }, ($$renderer) => {
										$$renderer.push(`${escape_html(a.name)}`);
									});
								}
								$$renderer.push(`<!--]--></select></label> `);
								Button($$renderer, {
									type: "submit",
									disabled: false,
									children: ($$renderer) => {
										Plus($$renderer, { class: "h-4 w-4" });
										$$renderer.push(`<!----> Open`);
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
		$$renderer.push(` `);
		if (byDate().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="text-sm text-muted-foreground">No upcoming dates yet.</p>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--[-->`);
			const each_array_1 = ensure_array_like(byDate());
			for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
				let [dateLabel, rows] = each_array_1[$$index_2];
				if (Card) {
					$$renderer.push("<!--[-->");
					Card($$renderer, {
						class: "mb-6",
						children: ($$renderer) => {
							if (Card_header) {
								$$renderer.push("<!--[-->");
								Card_header($$renderer, {
									children: ($$renderer) => {
										if (Card_title) {
											$$renderer.push("<!--[-->");
											Card_title($$renderer, {
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(dateLabel)}`);
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
										$$renderer.push(`<!--[-->`);
										const each_array_2 = ensure_array_like(rows);
										for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
											let row = each_array_2[$$index_1];
											$$renderer.push(`<div class="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0"><div class="min-w-40"><div class="font-medium">${escape_html(row.itemLabel)}</div> <div${attr_class("text-sm", void 0, { "text-red-600": level(row) !== "ok" })}>${escape_html(row.remaining)} left of ${escape_html(row.capacity)} `);
											if (level(row) === "critical") {
												$$renderer.push("<!--[0-->");
												$$renderer.push(`· critically low`);
											} else if (level(row) === "low") {
												$$renderer.push("<!--[1-->");
												$$renderer.push(`· low`);
											} else $$renderer.push("<!--[-1-->");
											$$renderer.push(`<!--]--></div></div> <form method="POST" action="?/setCapacity" class="flex flex-wrap items-end gap-2"><input type="hidden" name="stockId"${attr("value", row.id)}/> <label class="flex flex-col gap-1 text-xs">Capacity <input type="number" name="capacity" min="0"${attr("value", row.capacity)} class="w-24 rounded-md border border-border bg-background p-2 text-base md:text-sm"/></label> <label class="flex flex-col gap-1 text-xs">Reason <input type="text" name="reason" placeholder="Restocked" class="w-40 rounded-md border border-border bg-background p-2 text-base md:text-sm"/></label> `);
											Button($$renderer, {
												type: "submit",
												variant: "outline",
												disabled: pending === `cap:${row.id}`,
												children: ($$renderer) => {
													$$renderer.push(`<!---->Save`);
												},
												$$slots: { default: true }
											});
											$$renderer.push(`<!----></form> <form method="POST" action="?/setThresholds" class="flex flex-wrap items-end gap-2"><input type="hidden" name="stockId"${attr("value", row.id)}/> <label class="flex flex-col gap-1 text-xs">Low at <input type="number" name="lowThreshold" min="0"${attr("value", row.lowThreshold)} class="w-20 rounded-md border border-border bg-background p-2 text-base md:text-sm"/></label> <label class="flex flex-col gap-1 text-xs">Email at <input type="number" name="criticalThreshold" min="0"${attr("value", row.criticalThreshold)} class="w-20 rounded-md border border-border bg-background p-2 text-base md:text-sm"/></label> `);
											Button($$renderer, {
												type: "submit",
												variant: "ghost",
												disabled: pending === `th:${row.id}`,
												children: ($$renderer) => {
													$$renderer.push(`<!---->Save`);
												},
												$$slots: { default: true }
											});
											$$renderer.push(`<!----></form></div>`);
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
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--> `);
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
											$$renderer.push(`<!---->Recent changes`);
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
								if (data.changes.length === 0) {
									$$renderer.push("<!--[0-->");
									$$renderer.push(`<p class="text-sm text-muted-foreground">Nothing recorded yet.</p>`);
								} else {
									$$renderer.push("<!--[-1-->");
									$$renderer.push(`<div class="overflow-x-auto"><table class="w-full text-sm"><thead class="text-left text-muted-foreground"><tr><th class="py-2 pr-4">When</th><th class="py-2 pr-4">Date</th><th class="py-2 pr-4">Item</th><th class="py-2 pr-4">Field</th><th class="py-2 pr-4">Change</th><th class="py-2 pr-4">After</th><th class="py-2 pr-4">By</th><th class="py-2">Reason</th></tr></thead><tbody><!--[-->`);
									const each_array_3 = ensure_array_like(data.changes);
									for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
										let c = each_array_3[$$index_3];
										$$renderer.push(`<tr class="border-t border-border"><td class="py-2 pr-4 whitespace-nowrap">${escape_html(c.createdAt.toLocaleString())}</td><td class="py-2 pr-4 whitespace-nowrap">${escape_html(c.dateLabel)}</td><td class="py-2 pr-4">${escape_html(c.itemLabel)}</td><td class="py-2 pr-4">${escape_html(c.field)}</td><td${attr_class("py-2 pr-4", void 0, { "text-red-600": c.delta < 0 })}>${escape_html(c.delta > 0 ? "+" : "")}${escape_html(c.delta)}</td><td class="py-2 pr-4">${escape_html(c.valueAfter)}</td><td class="py-2 pr-4">${escape_html(c.byName ?? "System")}</td><td class="py-2">${escape_html(c.reason ?? "—")}</td></tr>`);
									}
									$$renderer.push(`<!--]--></tbody></table></div>`);
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
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-Bu8vzFne.js.map
