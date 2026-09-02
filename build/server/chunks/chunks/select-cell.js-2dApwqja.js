import { a6 as spread_props } from './server.js-CPNQ0GBv.js';
import { I as Icon } from './Icon.js-C-2f-rrd.js';
import { C as Checkbox } from './InputComp.js-CelOedfE.js';

//#region node_modules/@lucide/svelte/dist/icons/send.svelte
function Send($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "send" },
		props,
		{ iconNode: [["path", { "d": "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" }], ["path", { "d": "m21.854 2.147-10.94 10.939" }]] }
	]));
}
//#endregion
//#region src/lib/components/Table/select-header.svelte
function Select_header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { table } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			var bind_get = () => table.getIsAllPageRowsSelected();
			var bind_set = (v) => table.toggleAllPageRowsSelected(!!v);
			Checkbox($$renderer, {
				"aria-label": "Select all",
				indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
				get checked() {
					return bind_get();
				},
				set checked($$value) {
					bind_set($$value);
				}
			});
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}
//#endregion
//#region src/lib/components/Table/select-cell.svelte
function Select_cell($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { row } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			var bind_get = () => row.getIsSelected();
			var bind_set = (v) => row.toggleSelected(!!v);
			Checkbox($$renderer, {
				"aria-label": "Select row",
				onclick: (e) => e.stopPropagation(),
				get checked() {
					return bind_get();
				},
				set checked($$value) {
					bind_set($$value);
				}
			});
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
	});
}

export { Select_cell as S, Select_header as a, Send as b };
//# sourceMappingURL=select-cell.js-2dApwqja.js.map
