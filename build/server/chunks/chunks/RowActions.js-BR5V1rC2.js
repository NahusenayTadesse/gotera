import { $ as attr, aa as attr_class, a3 as clsx$1, a4 as ensure_array_like, ab as stringify$1, a6 as spread_props } from './server.js-CPNQ0GBv.js';
import { I as Icon } from './Icon.js-C-2f-rrd.js';
import { E as Ellipsis } from './ellipsis.js-BNid1SJZ.js';
import { P as Pencil } from './pencil.js-BNjnhhMl.js';
import { D as Dropdown_menu, a as Dropdown_menu_trigger, b as Dropdown_menu_content, d as Dropdown_menu_group, e as Dropdown_menu_label, f as Dropdown_menu_separator, c as Dropdown_menu_item } from './dropdown-menu.js-BjUEFyFe.js';
import { B as Button } from './button.js-DMlVoc1I.js';
import './shared.js-CgqsOrws.js';
import './client.js-CZArKCj5.js';
import { d as dropdownClass } from './global.svelte.js-Bc9BkX_a.js';

//#region node_modules/@lucide/svelte/dist/icons/trash-2.svelte
function Trash_2($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "trash-2" },
		props,
		{ iconNode: [
			["path", { "d": "M10 11v6" }],
			["path", { "d": "M14 11v6" }],
			["path", { "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
			["path", { "d": "M3 6h18" }],
			["path", { "d": "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }]
		] }
	]));
}
//#endregion
//#region src/lib/components/dashboard/RowActions.svelte
function RowActions($$renderer, $$props) {
	let { id, editable = true, label = "record", editHref, deleteAction = "?/delete", hiddenFields = {} } = $$props;
	if (Dropdown_menu) {
		$$renderer.push("<!--[-->");
		Dropdown_menu($$renderer, {
			children: ($$renderer) => {
				{
					function child($$renderer, { props }) {
						Button($$renderer, spread_props([props, {
							variant: "ghost",
							size: "icon",
							class: "relative size-8 p-0",
							children: ($$renderer) => {
								$$renderer.push(`<span class="sr-only">Open menu</span> `);
								Ellipsis($$renderer, {});
								$$renderer.push(`<!---->`);
							},
							$$slots: { default: true }
						}]));
					}
					if (Dropdown_menu_trigger) {
						$$renderer.push("<!--[-->");
						Dropdown_menu_trigger($$renderer, {
							child,
							$$slots: { child: true }
						});
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				}
				$$renderer.push(` `);
				if (Dropdown_menu_content) {
					$$renderer.push("<!--[-->");
					Dropdown_menu_content($$renderer, {
						children: ($$renderer) => {
							if (Dropdown_menu_group) {
								$$renderer.push("<!--[-->");
								Dropdown_menu_group($$renderer, {
									children: ($$renderer) => {
										if (Dropdown_menu_label) {
											$$renderer.push("<!--[-->");
											Dropdown_menu_label($$renderer, {
												children: ($$renderer) => {
													$$renderer.push(`<!---->Actions`);
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
							if (Dropdown_menu_separator) {
								$$renderer.push("<!--[-->");
								Dropdown_menu_separator($$renderer, {});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
							$$renderer.push(` `);
							if (editable) {
								$$renderer.push("<!--[0-->");
								if (Dropdown_menu_item) {
									$$renderer.push("<!--[-->");
									Dropdown_menu_item($$renderer, {
										children: ($$renderer) => {
											$$renderer.push(`<a${attr("href", editHref ?? `?edit=${id}`)}${attr_class(clsx$1(dropdownClass))}>`);
											Pencil($$renderer, { class: "h-4 w-4" });
											$$renderer.push(`<!----> Edit</a>`);
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
							if (Dropdown_menu_item) {
								$$renderer.push("<!--[-->");
								Dropdown_menu_item($$renderer, {
									children: ($$renderer) => {
										$$renderer.push(`<form method="POST"${attr("action", deleteAction)}><input type="hidden" name="id"${attr("value", id)}/> <!--[-->`);
										const each_array = ensure_array_like(Object.entries(hiddenFields));
										for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
											let [name, value] = each_array[$$index];
											$$renderer.push(`<input type="hidden"${attr("name", name)}${attr("value", value)}/>`);
										}
										$$renderer.push(`<!--]--> <button type="submit"${attr_class(`${stringify$1(dropdownClass)} w-full text-red-600`)}>`);
										Trash_2($$renderer, { class: "h-4 w-4" });
										$$renderer.push(`<!----> Delete</button></form>`);
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

export { RowActions as R, Trash_2 as T };
//# sourceMappingURL=RowActions.js-BR5V1rC2.js.map
