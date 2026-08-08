import './exports.js-BT-QlP_6.js';
import { aa as attr_class, ab as stringify$1, $ as attr, a9 as escape_html, a6 as spread_props, ai as await_block, a4 as ensure_array_like } from './server.js-CPNQ0GBv.js';
import './client.js-7a-rpZlk.js';
import { I as Icon } from './Icon.js-C-2f-rrd.js';
import { S as Statuses } from './statuses.js-e5MBhLkL.js';
import { L as Loader_circle } from './loader-circle.js-ItH9sbLy.js';
import { S as Scroll_area } from './scroll-area.js-DLUPG4gi.js';
import { D as Dialog, a as Dialog_trigger, b as Dialog_content, c as Dialog_header, h as Dialog_title } from './dialog.js-BhMsigOw.js';
import { b as buttonVariants, B as Button } from './button.js-DMlVoc1I.js';
import './shared.js-CgqsOrws.js';

//#region node_modules/@lucide/svelte/dist/icons/arrow-left.svelte
function Arrow_left($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "arrow-left" },
		props,
		{ iconNode: [["path", { "d": "m12 19-7-7 7-7" }], ["path", { "d": "M19 12H5" }]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/save.svelte
function Save($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "save" },
		props,
		{ iconNode: [
			["path", { "d": "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" }],
			["path", { "d": "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" }],
			["path", { "d": "M7 3v4a1 1 0 0 0 1 1h7" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/trash.svelte
function Trash($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "trash" },
		props,
		{ iconNode: [
			["path", { "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
			["path", { "d": "M3 6h18" }],
			["path", { "d": "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }]
		] }
	]));
}
//#endregion
//#region src/lib/Copy.svelte
function Copy_1($$renderer, $$props) {
	let { data } = $$props;
	$$renderer.push(`<button${attr("title", `Copy ${stringify$1(data)}`)}>${escape_html(data)} <span class="relative p-4">`);
	$$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--></span></button>`);
}
//#endregion
//#region src/lib/components/SingleTable.svelte
function SingleTable($$renderer, $$props) {
	let { singleTable } = $$props;
	await_block($$renderer, singleTable, () => {
		$$renderer.push(`<h1 class="m-2 flex flex-row">Loading `);
		Loader_circle($$renderer, { class: "animate-spin" });
		$$renderer.push(`<!----></h1>`);
	}, (table) => {
		$$renderer.push(`<table id="table" class="w-full table-fixed border border-border text-left lg:w-full"><thead class="bg-muted font-semibold tracking-wider text-muted-foreground uppercase"><tr><th class="px-4 py-3">Detail</th><th class="px-4 py-3">Value</th></tr></thead><tbody class="divide-y divide-border text-foreground"><!--[-->`);
		const each_array = ensure_array_like(singleTable);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let value = each_array[$$index];
			$$renderer.push(`<tr><td class="px-4 py-3 font-semibold">${escape_html(value.name)}</td><td class="break-words capitalize">`);
			if (value.name === "Phone") {
				$$renderer.push("<!--[0-->");
				Copy_1($$renderer, { data: value.value });
			} else if (value.name === "Status") {
				$$renderer.push("<!--[1-->");
				Statuses($$renderer, { status: value.value });
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`${escape_html(value.value)}`);
			}
			$$renderer.push(`<!--]--></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table>`);
	});
	$$renderer.push(`<!--]-->`);
}
//#endregion
//#region src/lib/forms/Delete.svelte
function Delete($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let isOpen = false;
		let { redirect = "/dashboard" } = $$props;
		let deleting = false;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Dialog) {
				$$renderer.push("<!--[-->");
				Dialog($$renderer, {
					get open() {
						return isOpen;
					},
					set open($$value) {
						isOpen = $$value;
						$$settled = false;
					},
					children: ($$renderer) => {
						if (Dialog_trigger) {
							$$renderer.push("<!--[-->");
							Dialog_trigger($$renderer, {
								class: buttonVariants({ variant: "destructive" }),
								children: ($$renderer) => {
									Trash($$renderer, {});
									$$renderer.push(`<!----> Delete`);
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
						$$renderer.push(` `);
						if (Dialog_content) {
							$$renderer.push("<!--[-->");
							Dialog_content($$renderer, {
								class: "w-full",
								children: ($$renderer) => {
									if (Dialog_header) {
										$$renderer.push("<!--[-->");
										Dialog_header($$renderer, {
											children: ($$renderer) => {
												if (Dialog_title) {
													$$renderer.push("<!--[-->");
													Dialog_title($$renderer, {
														children: ($$renderer) => {
															$$renderer.push(`<!---->Delete`);
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
									Scroll_area($$renderer, {
										class: "h-auto rounded-md border p-2",
										children: ($$renderer) => {
											$$renderer.push(`<h5 class="text-center">Are you sure you want to Delete? This action is irreversable</h5> <div class="flex flex-row items-center justify-center gap-4 pt-4"><form method="post" action="?/delete">`);
											Button($$renderer, {
												type: "submit",
												disabled: deleting,
												variant: "destructive",
												size: "lg",
												children: ($$renderer) => {
													$$renderer.push("<!--[-1-->");
													Trash($$renderer, {});
													$$renderer.push(`<!----> Delete`);
													$$renderer.push(`<!--]-->`);
												},
												$$slots: { default: true }
											});
											$$renderer.push(`<!----></form> `);
											Button($$renderer, {
												onclick: () => isOpen = false,
												size: "lg",
												children: ($$renderer) => {
													$$renderer.push(`<!---->Cancel`);
												},
												$$slots: { default: true }
											});
											$$renderer.push(`<!----></div>`);
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
					},
					$$slots: { default: true }
				});
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
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
//#region src/lib/components/SingleView.svelte
function SingleView($$renderer, $$props) {
	let { title, children, class: className = "", photo = "" } = $$props;
	$$renderer.push(`<div${attr_class(`flex w-full flex-col items-center justify-center rounded-md border border-border bg-card shadow-none lg:w-md lg:min-w-3xl ${stringify$1(className)}`)}><div class="flex w-full flex-col items-center justify-start rounded-t-md border-b border-border bg-primary px-8 py-6 text-primary-foreground">`);
	if (photo !== "") {
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<img${attr("src", `/files/${stringify$1(photo)}`)} loading="lazy" class="h-48 w-48 rounded-full"${attr("alt", `${stringify$1(title)} photo`)}/>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]--> <h1 class="text-center">${escape_html(title)}</h1></div> `);
	children($$renderer);
	$$renderer.push(`<!----></div>`);
}

export { Arrow_left as A, Delete as D, SingleView as S, Trash as T, SingleTable as a, Save as b };
//# sourceMappingURL=SingleView.js-Cz6-cFBu.js.map
