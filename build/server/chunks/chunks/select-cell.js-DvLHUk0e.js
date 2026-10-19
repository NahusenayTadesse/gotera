import { C as Checkbox } from './checkbox2.js-DNmj6_T9.js';

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

export { Select_cell as S, Select_header as a };
//# sourceMappingURL=select-cell.js-DvLHUk0e.js.map
