import { a0 as head, $ as attr, a6 as escape_html, a4 as ensure_array_like, T as derived, ab as stringify$1 } from '../../../../../../../chunks/server.js-qDPizQqb.js';
import { l as longDate, c as shortDate } from '../../../../../../../chunks/format.js-CaMNmk6h.js';
import { A as Arrow_left } from '../../../../../../../chunks/arrow-left.js-Bo8HsFsB.js';
import { S as Statuses, B as Badge } from '../../../../../../../chunks/statuses.js-CqI0SEDd.js';
import { F as Factory } from '../../../../../../../chunks/factory.js-CYPO6hAf.js';
import { T as Truck } from '../../../../../../../chunks/truck.js-CAOAaqne.js';
import { W as Wand_sparkles } from '../../../../../../../chunks/wand-sparkles.js-ChL_cO6h.js';
import { X } from '../../../../../../../chunks/x.js-TlRuKVU4.js';
import { B as Button } from '../../../../../../../chunks/button.js-DWWbYMWk.js';
import '../../../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../../../chunks/client.js-D8k391-h.js';
import { C as Card, b as Card_header, c as Card_title, d as Card_description, a as Card_content } from '../../../../../../../chunks/card.js-CLGpEPTV.js';
import { T as TypeBadge } from '../../../../../../../chunks/TypeBadge.js-B-yRxSkm.js';
import '../../../../../../../chunks/runtime.js-CbeSlHLA.js';
import '../../../../../../../chunks/Icon.js-Dm6aSBgb.js';
import '../../../../../../../chunks/badge-check.js-YjTSRpIb.js';
import '../../../../../../../chunks/loader.js-BCe2CTsg.js';
import '../../../../../../../chunks/utils2.js-BmcH287A.js';
import '../../../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../../../chunks/internal2.js-Ce3aipJv.js';
import '../../../../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../../../../chunks/utils.js-BQt5v-8G.js';

//#region src/routes/dashboard/batches/shipment/[type]/[id]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const h = derived(() => data.header);
		const allAssigned = derived(() => data.lines.every((l) => l.state === "assigned"));
		let picks = {};
		head("1qmi9d8", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Trace · ${escape_html(h().customer)}</title>`);
			});
		});
		$$renderer.push(`<div class="mb-6 flex flex-col gap-3"><a${attr("href", h().backHref)} class="inline-flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground">`);
		Arrow_left($$renderer, { class: "h-4 w-4" });
		$$renderer.push(`<!----> Back</a> <div class="flex flex-wrap items-center justify-between gap-3"><div><div class="flex flex-wrap items-center gap-2"><h1 class="dash-heading text-2xl font-semibold">${escape_html(h().customer)}</h1> `);
		TypeBadge($$renderer, { type: data.type });
		$$renderer.push(`<!----> `);
		Statuses($$renderer, { status: h().status });
		$$renderer.push(`<!----></div> <p class="text-sm text-muted-foreground">${escape_html(h().description)} · ${escape_html(longDate(h().date))}${escape_html(h().address ? ` · ${h().address}` : "")}</p></div> `);
		if (data.lines.length) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<form method="POST" action="?/auto">`);
			Button($$renderer, {
				type: "submit",
				variant: allAssigned() ? "outline" : "default",
				children: ($$renderer) => {
					Wand_sparkles($$renderer, { class: "h-4 w-4" });
					$$renderer.push(`<!----> Auto-assign (FEFO)`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></form>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> `);
		if (!data.lines.length) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<p class="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">Nothing in this shipment needs a batch — it's ${escape_html(h().status)}, so it isn't being sent.</p>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="grid gap-4"><!--[-->`);
		const each_array = ensure_array_like(data.lines);
		for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
			let line = each_array[$$index_2];
			if (Card) {
				$$renderer.push("<!--[-->");
				Card($$renderer, {
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
												$$renderer.push(`<!---->${escape_html(line.name)} <span class="text-sm font-normal text-muted-foreground">× ${escape_html(line.quantity)}</span>`);
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
												$$renderer.push(`<!---->${escape_html(line.allocated)} of ${escape_html(line.quantity)} traced to a batch`);
											},
											$$slots: { default: true }
										});
										$$renderer.push("<!--]-->");
									} else {
										$$renderer.push("<!--[!-->");
										$$renderer.push("<!--]-->");
									}
									$$renderer.push(`</div> `);
									Badge($$renderer, {
										class: line.state === "assigned" ? "bg-green-500 text-white" : line.state === "partial" ? "bg-amber-500 text-white" : "bg-red-500 text-white",
										children: ($$renderer) => {
											$$renderer.push(`<!---->${escape_html(line.state === "assigned" ? "Traced" : line.state === "partial" ? "Partly traced" : "No batch")}`);
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
								class: "flex flex-col gap-4",
								children: ($$renderer) => {
									if (line.allocations.length) {
										$$renderer.push("<!--[0-->");
										$$renderer.push(`<div class="overflow-x-auto"><table class="w-full text-left text-sm"><thead class="text-muted-foreground"><tr class="border-b border-border"><th class="py-1.5 pr-4 font-medium">Batch</th><th class="py-1.5 pr-4 font-medium">Source</th><th class="py-1.5 pr-4 font-medium">Best before</th><th class="py-1.5 pr-4 font-medium">Qty</th><th class="py-1.5 pr-4 font-medium">Batch status</th><th class="py-1.5 font-medium">Assigned</th></tr></thead><tbody><!--[-->`);
										const each_array_1 = ensure_array_like(line.allocations);
										for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
											let a = each_array_1[$$index];
											$$renderer.push(`<tr class="border-b border-border last:border-0"><td class="py-1.5 pr-4"><a${attr("href", `/dashboard/batches/${stringify$1(a.batchId)}`)} class="font-mono font-medium hover:underline">${escape_html(a.code)}</a></td><td class="py-1.5 pr-4"><span class="inline-flex items-center gap-1.5">`);
											if (a.source === "in_house") {
												$$renderer.push("<!--[0-->");
												Factory($$renderer, { class: "h-4 w-4 text-muted-foreground" });
												$$renderer.push(`<!----> In house`);
											} else {
												$$renderer.push("<!--[-1-->");
												Truck($$renderer, { class: "h-4 w-4 text-muted-foreground" });
												$$renderer.push(`<!----> ${escape_html(a.sourceName)} <span class="text-muted-foreground">(${escape_html(a.sourceType)})</span>`);
											}
											$$renderer.push(`<!--]--></span></td><td class="py-1.5 pr-4">${escape_html(a.bestBefore ? shortDate(a.bestBefore) : "—")}</td><td class="py-1.5 pr-4">${escape_html(a.quantity)}</td><td class="py-1.5 pr-4">`);
											Statuses($$renderer, { status: a.batchStatus });
											$$renderer.push(`<!----></td><td class="py-1.5">${escape_html(a.method === "manual" ? "Manually" : "Auto")}</td></tr>`);
										}
										$$renderer.push(`<!--]--></tbody></table></div>`);
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--> <div class="flex flex-wrap items-end gap-2"><form method="POST" action="?/assign" class="flex flex-wrap items-end gap-2"><input type="hidden" name="lineKey"${attr("value", line.lineKey)}/> <label class="flex flex-col gap-1 text-sm"><span class="text-muted-foreground">Put this line on batch</span> `);
									$$renderer.select({
										name: "batchId",
										class: "border-input h-9 min-w-72 rounded-md border bg-transparent px-3 text-sm dark:bg-input/30",
										value: picks[line.lineKey]
									}, ($$renderer) => {
										$$renderer.option({ value: "" }, ($$renderer) => {
											$$renderer.push(`Choose a batch…`);
										});
										$$renderer.push(`<!--[-->`);
										const each_array_2 = ensure_array_like(line.options);
										for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
											let o = each_array_2[$$index_1];
											$$renderer.option({
												value: o.id,
												disabled: o.expired || o.notYetMade || o.remaining < line.quantity && !line.allocations.some((a) => a.batchId === o.id)
											}, ($$renderer) => {
												$$renderer.push(`${escape_html(o.code)} · ${escape_html(o.source === "in_house" ? "In house" : o.sourceName)} · ${escape_html(o.remaining)} left
										${escape_html(o.bestBefore ? ` · BB ${shortDate(o.bestBefore)}` : "")}${escape_html(o.expired ? " · EXPIRED" : "")}${escape_html(o.notYetMade ? " · not made yet" : "")}`);
											});
										}
										$$renderer.push(`<!--]-->`);
									});
									$$renderer.push(`</label> `);
									Button($$renderer, {
										type: "submit",
										variant: "outline",
										disabled: !picks[line.lineKey],
										children: ($$renderer) => {
											$$renderer.push(`<!---->Assign`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----></form> `);
									if (line.allocations.length) {
										$$renderer.push("<!--[0-->");
										$$renderer.push(`<form method="POST" action="?/unassign"><input type="hidden" name="lineKey"${attr("value", line.lineKey)}/> `);
										Button($$renderer, {
											type: "submit",
											variant: "ghost",
											class: "text-red-600",
											children: ($$renderer) => {
												X($$renderer, { class: "h-4 w-4" });
												$$renderer.push(`<!----> Clear`);
											},
											$$slots: { default: true }
										});
										$$renderer.push(`<!----></form>`);
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--></div> `);
									if (!line.options.length) {
										$$renderer.push("<!--[0-->");
										$$renderer.push(`<p class="text-sm text-amber-600">No batches exist for ${escape_html(line.name)} yet. <a href="/dashboard/batches?add=1" class="underline">Create one</a>.</p>`);
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
		}
		$$renderer.push(`<!--]--></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-CjCmO4Y4.js.map
