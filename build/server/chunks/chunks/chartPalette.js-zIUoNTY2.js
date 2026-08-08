import { a4 as ensure_array_like, a9 as escape_html, ac as attr_style, ab as stringify$1 } from './server.js-CPNQ0GBv.js';
import { o as onDestroy } from './index-server.js-C9rOfj9g.js';
import { L as Label } from './label.js-FcotYhKU.js';
import { B as Button } from './button.js-DMlVoc1I.js';
import { I as Input } from './input.js-BYtfwuM9.js';
import { d as datePresets } from './reports.js-YS7wm2Ph.js';

//#region src/lib/components/dashboard/DateRangeFilter.svelte
function DateRangeFilter($$renderer, $$props) {
	let { preset, from, to } = $$props;
	let presetEl = void 0;
	$$renderer.push(`<form method="GET" class="mb-6 flex flex-wrap items-end gap-3 rounded-lg border border-border/60 bg-card/50 p-4"><div class="flex flex-col gap-1.5">`);
	Label($$renderer, {
		for: "preset",
		children: ($$renderer) => {
			$$renderer.push(`<!---->Preset`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> <select id="preset" name="preset" class="border-input h-9 rounded-md border bg-transparent px-3 text-sm capitalize"><!--[-->`);
	const each_array = ensure_array_like(datePresets);
	for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
		let p = each_array[$$index];
		$$renderer.option({
			value: p.value,
			selected: p.value === preset
		}, ($$renderer) => {
			$$renderer.push(`${escape_html(p.name)}`);
		});
	}
	$$renderer.push(`<!--]--></select></div> <div class="flex flex-col gap-1.5">`);
	Label($$renderer, {
		for: "from",
		children: ($$renderer) => {
			$$renderer.push(`<!---->From`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	Input($$renderer, {
		id: "from",
		type: "date",
		name: "from",
		value: from,
		class: "w-40",
		oninput: () => presetEl
	});
	$$renderer.push(`<!----></div> <div class="flex flex-col gap-1.5">`);
	Label($$renderer, {
		for: "to",
		children: ($$renderer) => {
			$$renderer.push(`<!---->To`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----> `);
	Input($$renderer, {
		id: "to",
		type: "date",
		name: "to",
		value: to,
		class: "w-40",
		oninput: () => presetEl
	});
	$$renderer.push(`<!----></div> `);
	Button($$renderer, {
		type: "submit",
		children: ($$renderer) => {
			$$renderer.push(`<!---->Apply`);
		},
		$$slots: { default: true }
	});
	$$renderer.push(`<!----></form>`);
}
//#endregion
//#region src/lib/components/dashboard/ChartCanvas.svelte
function ChartCanvas($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { type, data, options = {}, height = "280px" } = $$props;
		onDestroy(() => void 0);
		$$renderer.push(`<div${attr_style(`position: relative; height: ${stringify$1(height)}; width: 100%;`)}><canvas></canvas></div>`);
	});
}
//#endregion
//#region src/lib/components/dashboard/chartPalette.ts
/** Shared colour palette for report charts — matches FilterMenu's chart palette so charts
*  across the dashboard feel like one system. */
var CHART_COLORS = [
	"#6366f1",
	"#22d3ee",
	"#f59e0b",
	"#10b981",
	"#f43f5e",
	"#8b5cf6",
	"#14b8a6",
	"#fb923c",
	"#3b82f6",
	"#ec4899"
];
function colorAt(i, alpha = "cc") {
	return CHART_COLORS[i % CHART_COLORS.length] + alpha;
}
function colorList(n, alpha = "cc") {
	return Array.from({ length: n }, (_, i) => colorAt(i, alpha));
}

export { ChartCanvas as C, DateRangeFilter as D, colorList as a, colorAt as c };
//# sourceMappingURL=chartPalette.js-zIUoNTY2.js.map
