import { a4 as ensure_array_like, $ as attr, ab as stringify$1, aa as attr_class, a6 as escape_html } from './server.js-qDPizQqb.js';

//#region src/lib/components/dashboard/BatchesCell.svelte
function BatchesCell($$renderer, $$props) {
	/** Batch numbers on a shipment, with source, and a link to its trace page. */
	let { type, id, state, batches } = $$props;
	$$renderer.push(`<div class="flex min-w-40 flex-col gap-0.5 text-xs"><!--[-->`);
	const each_array = ensure_array_like(batches);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let b = each_array[$$index];
		$$renderer.push(`<a${attr("href", `/dashboard/batches/${stringify$1(b.id)}`)} class="hover:underline"${attr("title", `Open batch ${stringify$1(b.code)}`)}><span${attr_class(`font-mono font-medium ${b.status === "recalled" || b.status === "quarantined" ? "text-red-600" : ""}`)}>${escape_html(b.code)}</span> <span class="text-muted-foreground">· ${escape_html(b.source)}</span> `);
		if (b.status === "recalled" || b.status === "quarantined") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="font-medium text-red-600 uppercase">${escape_html(b.status)}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></a>`);
	}
	$$renderer.push(`<!--]--> `);
	if (state === "missing" || state === "partial") {
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<a${attr("href", `/dashboard/batches/shipment/${stringify$1(type)}/${stringify$1(id)}`)} class="font-medium text-amber-600 hover:underline">${escape_html(state === "missing" ? "No batch — assign" : "Partly traced — finish")}</a>`);
	} else if (state === "traced") {
		$$renderer.push("<!--[1-->");
		$$renderer.push(`<a${attr("href", `/dashboard/batches/shipment/${stringify$1(type)}/${stringify$1(id)}`)} class="text-muted-foreground hover:underline">Trace</a>`);
	} else {
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<span class="text-muted-foreground">—</span>`);
	}
	$$renderer.push(`<!--]--></div>`);
}

export { BatchesCell as B };
//# sourceMappingURL=BatchesCell.js-bQMZXK7C.js.map
