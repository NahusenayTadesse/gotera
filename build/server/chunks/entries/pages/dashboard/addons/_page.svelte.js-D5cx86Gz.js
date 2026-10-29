import { a0 as head, T as derived, a6 as escape_html, $ as attr, ae as store_get, ag as store_mutate, af as unsubscribe_stores } from '../../../../chunks/server.js-qDPizQqb.js';
import { a as ADDON_CATEGORIES, C as CATEGORY_LABELS, A as ADDON_AVAILABILITY, f as AVAILABILITY_LABELS, d as ADDON_TAGS, T as TAG_LABELS, b as addonImageSrc } from '../../../../chunks/addons.js-B66jfCaP.js';
import { r as resolve } from '../../../../chunks/paths.js-DLZCsmNl.js';
import { g as goto } from '../../../../chunks/client.js-D8k391-h.js';
import { p as page } from '../../../../chunks/state.js-PKYHL-GZ.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../chunks/data-table-sort.js-DI5dH2-_.js';
import { I as InputComp } from '../../../../chunks/InputComp.js-ZVACorVu.js';
import { F as FilterMenu } from '../../../../chunks/FilterMenu.js-BfdYSGhm.js';
import { S as Statuses } from '../../../../chunks/statuses.js-CqI0SEDd.js';
import { E as External_link } from '../../../../chunks/external-link.js-DQ4_LxqX.js';
import { P as Plus } from '../../../../chunks/plus.js-l9nzajpf.js';
import { T as Trash_2 } from '../../../../chunks/trash-2.js-CiUzWTiQ.js';
import { U as Undo_2 } from '../../../../chunks/undo-2.js-xy86FTlI.js';
import { X } from '../../../../chunks/x.js-TlRuKVU4.js';
import { B as Button } from '../../../../chunks/button.js-DWWbYMWk.js';
import { L as LoadingBtn } from '../../../../chunks/LoadingBtn.js-CYZ6Npjp.js';
import { C as Card, b as Card_header, c as Card_title, a as Card_content } from '../../../../chunks/card.js-CLGpEPTV.js';
import { b as superForm } from '../../../../chunks/client2.js-CuhGksyF.js';
import { a as zodClient } from '../../../../chunks/adapters.js-CrMSDpnl.js';
import { f as formatGBP } from '../../../../chunks/format2.js-D8oyWA_y.js';
import { a as addonSchema } from '../../../../chunks/schema3.js-CXxuJ-8y.js';
import { R as RowActions } from '../../../../chunks/RowActions.js-CF83FWgG.js';
import { E as Errors } from '../../../../chunks/Errors.js-Czh0cSzk.js';
import '../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../chunks/internal2.js-Ce3aipJv.js';
import '../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../chunks/scroll-lock.js-BWPmsymw.js';
import '../../../../chunks/index-server2.js-C2dghAGm.js';
import '../../../../chunks/create-id.js-BHb4azHX.js';
import '../../../../chunks/Icon.js-Dm6aSBgb.js';
import '../../../../chunks/chevron-down.js-BUTnRWsm.js';
import '../../../../chunks/scroll-area.js-DdAKf2Fa.js';
import '../../../../chunks/utils2.js-BmcH287A.js';
import '../../../../chunks/dropdown-menu.js-DR8iffqj.js';
import '../../../../chunks/check.js-BvFzUyRW.js';
import '../../../../chunks/minus.js-JH-UUVfm.js';
import '../../../../chunks/popper-layer-force-mount.js-C6YTj-1w.js';
import '../../../../chunks/menu.js-B_FjgJQX.js';
import '../../../../chunks/is-mobile.svelte.js-CSeMNCH2.js';
import '../../../../chunks/input.js-DivymZKU.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../chunks/toast-state.svelte.js-CyESMgTY.js';
import '../../../../chunks/badge-check.js-YjTSRpIb.js';
import '../../../../chunks/chevron-left.js-CzlLlj9a.js';
import '../../../../chunks/chevron-right.js-Bu3_elXi.js';
import '../../../../chunks/SelectComp.js-CBQ76iZ1.js';
import '../../../../chunks/hidden-input.js-C81YZGmV.js';
import '../../../../chunks/sr-only-styles.js-Bstyupqo.js';
import '../../../../chunks/global.svelte.js-Dj9QIDov.js';
import '../../../../chunks/popover.js-DgEWMg7U.js';
import '../../../../chunks/safe-polygon.svelte.js-CKn9Kv9j.js';
import '../../../../chunks/circle-alert.js-C4ujrG9B.js';
import '../../../../chunks/loader.js-BCe2CTsg.js';
import '../../../../chunks/command.js-Ddw69Zfe.js';
import '../../../../chunks/search.js-B59c9lYY.js';
import '../../../../chunks/dialog-overlay.js-8KJVmKPf.js';
import '../../../../chunks/label.js-B89gGnUJ.js';
import '../../../../chunks/textarea.js-BMgrLLbk.js';
import '../../../../chunks/checkbox2.js-CIPP1KlT.js';
import '../../../../chunks/checkbox.js-Q6JAT58V.js';
import 'browser-image-compression';
import '../../../../index.js-CZsLKCjb.js';
import '../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../chunks/activity.js-DMIkPBp9.js';
import '../../../../chunks/chart-area.js-CHQrzPbW.js';
import '../../../../chunks/tooltip.js-CYjxtSnB.js';
import '../../../../chunks/truck.js-CAOAaqne.js';
import '../../../../chunks/forms.js-DNc1GIZe.js';
import '../../../../chunks/stores.js-Bau3W-nc.js';
import '../../../../chunks/access.js-j1_SnSd1.js';
import '../../../../chunks/ellipsis.js-Dns71XaR.js';
import '../../../../chunks/pencil.js-DI8R1Xzc.js';

//#region src/lib/components/dashboard/AddonThumb.svelte
function AddonThumb($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { image, name } = $$props;
		const src = derived(() => addonImageSrc(image));
		if (src()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img${attr("src", src())}${attr("alt", name)} loading="lazy" class="h-10 w-10 rounded-md border object-cover"/>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="flex h-10 w-10 items-center justify-center rounded-md border bg-muted text-xs font-semibold text-muted-foreground" aria-hidden="true">${escape_html(name.slice(0, 2).toUpperCase())}</div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/routes/dashboard/addons/columns.ts
var columns = [
	{
		id: "index",
		header: "#",
		cell: (info) => {
			return info.table.getRowModel().rows.findIndex((row) => row.id === info.row.id) + 1;
		},
		enableSorting: false
	},
	{
		id: "image",
		header: "Photo",
		enableSorting: false,
		cell: ({ row }) => renderComponent(AddonThumb, {
			image: row.original.imageUrl,
			name: row.original.name
		})
	},
	{
		accessorKey: "name",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Name",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	},
	{
		accessorKey: "category",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Type",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => CATEGORY_LABELS[info.getValue()] ?? "—"
	},
	{
		accessorKey: "availability",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Sold",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => AVAILABILITY_LABELS[info.getValue()] ?? "—"
	},
	{
		accessorKey: "unitLabel",
		header: "Pack",
		cell: (info) => info.getValue() || "—"
	},
	{
		accessorKey: "tags",
		header: "Tags",
		enableSorting: false,
		cell: (info) => info.getValue().map((t) => TAG_LABELS[t]).join(", ") || "—"
	},
	{
		accessorKey: "pricePence",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Price",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => formatGBP(info.getValue())
	},
	{
		accessorKey: "sortOrder",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Sort Order",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	},
	{
		accessorKey: "isFeatured",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Featured",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => info.getValue() ? "★" : ""
	},
	{
		accessorKey: "isActive",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Status",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => renderComponent(Statuses, { status: row.original.isActive ? "active" : "inactive" })
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => renderComponent(RowActions, {
			id: row.original.id,
			label: "add-on"
		})
	}
];
//#endregion
//#region src/routes/dashboard/addons/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		let filteredRows = data.rows;
		const categories = ADDON_CATEGORIES.map((value) => ({
			value,
			name: CATEGORY_LABELS[value]
		}));
		const availability = ADDON_AVAILABILITY.map((value) => ({
			value,
			name: AVAILABILITY_LABELS[value]
		}));
		const tags = ADDON_TAGS.map((value) => ({
			value,
			name: TAG_LABELS[value]
		}));
		const spiceLevels = Array.from({ length: 4 }, (_, i) => ({
			value: String(i),
			name: i === 0 ? "Not spicy" : "🌶".repeat(i)
		}));
		const editingId = derived(() => page.url.searchParams.get("edit"));
		const adding = derived(() => page.url.searchParams.has("add"));
		const editingRow = derived(() => editingId() ? data.rows.find((r) => r.id === editingId()) : void 0);
		const showForm = derived(() => adding() || !!editingRow());
		const currentImage = derived(() => addonImageSrc(editingRow()?.imageUrl));
		const { form, errors, delayed, allErrors} = superForm(data.form, {
			dataType: "json",
			resetForm: false,
			invalidateAll: true,
			applyAction: "never",
			validators: zodClient(addonSchema),
			onUpdated({ form: f }) {
				if (f.valid) goto(resolve("/dashboard/addons"), {
					});
			}
		});
		const pricePreview = derived(() => Number.isFinite(Number(store_get($$store_subs ??= {}, "$form", form).pricePence)) ? `£${(Number(store_get($$store_subs ??= {}, "$form", form).pricePence) / 100).toFixed(2)}` : "");
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("17jdcj3", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>Add-ons</title>`);
				});
			});
			$$renderer.push(`<div class="mb-6 flex flex-wrap items-center justify-between gap-4"><div><h1 class="dash-heading text-2xl font-semibold">Add-ons</h1> <p class="text-sm text-muted-foreground">Everything here with “On its own” selling appears in the public <a href="/addons" target="_blank" class="inline-flex items-center gap-1 underline">add-on shop `);
			External_link($$renderer, { class: "h-3 w-3" });
			$$renderer.push(`<!----></a></p></div> `);
			Button($$renderer, {
				href: "?add=1",
				children: ($$renderer) => {
					Plus($$renderer, { class: "h-4 w-4" });
					$$renderer.push(`<!----> Add Add-on`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----></div> `);
			if (showForm()) {
				$$renderer.push("<!--[0-->");
				if (Card) {
					$$renderer.push("<!--[-->");
					Card($$renderer, {
						class: "mb-8 w-full lg:max-w-3xl",
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
													$$renderer.push(`<!---->${escape_html(editingRow() ? `Edit ${editingRow().name}` : "Add Add-on")}`);
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
										$$renderer.push(`<form method="POST"${attr("action", editingRow() ? "?/edit" : "?/add")} enctype="multipart/form-data" id="addon-form" class="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2"><div class="md:col-span-2">`);
										Errors($$renderer, { allErrors: store_get($$store_subs ??= {}, "$allErrors", allErrors) });
										$$renderer.push(`<!----></div> `);
										if (editingRow()) {
											$$renderer.push("<!--[0-->");
											$$renderer.push(`<input type="hidden" name="id"${attr("value", store_get($$store_subs ??= {}, "$form", form).id)}/>`);
										} else $$renderer.push("<!--[-1-->");
										$$renderer.push(`<!--]--> <div class="md:col-span-2"><p class="p-1 text-sm font-medium">Photo</p> `);
										if (currentImage() && !store_get($$store_subs ??= {}, "$form", form).removeImage && !store_get($$store_subs ??= {}, "$form", form).image) {
											$$renderer.push("<!--[0-->");
											$$renderer.push(`<div class="flex items-center gap-4 rounded-lg border p-3"><img${attr("src", currentImage())}${attr("alt", editingRow()?.name)} class="h-24 w-24 rounded-md object-cover"/> <div class="flex flex-col gap-2 text-sm"><span class="text-muted-foreground">Current photo. Upload a new one below to replace it.</span> `);
											Button($$renderer, {
												type: "button",
												variant: "outline",
												size: "sm",
												class: "w-fit",
												onclick: () => store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).removeImage = true),
												children: ($$renderer) => {
													Trash_2($$renderer, { class: "h-4 w-4" });
													$$renderer.push(`<!----> Remove photo`);
												},
												$$slots: { default: true }
											});
											$$renderer.push(`<!----></div></div>`);
										} else if (currentImage() && store_get($$store_subs ??= {}, "$form", form).removeImage) {
											$$renderer.push("<!--[1-->");
											$$renderer.push(`<div class="flex items-center justify-between rounded-lg border border-dashed p-3 text-sm"><span class="text-muted-foreground">The photo will be removed when you save.</span> `);
											Button($$renderer, {
												type: "button",
												variant: "ghost",
												size: "sm",
												onclick: () => store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).removeImage = false),
												children: ($$renderer) => {
													Undo_2($$renderer, { class: "h-4 w-4" });
													$$renderer.push(`<!----> Undo`);
												},
												$$slots: { default: true }
											});
											$$renderer.push(`<!----></div>`);
										} else $$renderer.push("<!--[-1-->");
										$$renderer.push(`<!--]--> <div class="mt-2">`);
										InputComp($$renderer, {
											label: "",
											form,
											errors,
											type: "file",
											name: "image",
											placeholder: "JPG, PNG, WebP or AVIF · square works best"
										});
										$$renderer.push(`<!----></div></div> `);
										InputComp($$renderer, {
											label: "Name",
											form,
											errors,
											type: "text",
											name: "name",
											placeholder: "Berbere Spice",
											required: true
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Pack size",
											form,
											errors,
											type: "text",
											name: "unitLabel",
											placeholder: "250 g jar"
										});
										$$renderer.push(`<!----> <div class="md:col-span-2">`);
										InputComp($$renderer, {
											label: "Description",
											form,
											errors,
											type: "textarea",
											name: "description",
											rows: 3,
											placeholder: "What it is and how to use it with injera"
										});
										$$renderer.push(`<!----></div> `);
										InputComp($$renderer, {
											label: "Type",
											form,
											errors,
											type: "select",
											name: "category",
											items: categories
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Sold",
											form,
											errors,
											type: "select",
											name: "availability",
											items: availability
										});
										$$renderer.push(`<!----> <div class="flex flex-col">`);
										InputComp($$renderer, {
											label: "Price (pence)",
											form,
											errors,
											type: "number",
											name: "pricePence",
											placeholder: "500",
											required: true
										});
										$$renderer.push(`<!----> <span class="px-1 text-xs text-muted-foreground">${escape_html(pricePreview())}</span></div> `);
										InputComp($$renderer, {
											label: "Badge",
											form,
											errors,
											type: "text",
											name: "badge",
											placeholder: "New, Bestseller…"
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Spice level",
											form,
											errors,
											type: "select",
											name: "spiceLevel",
											items: spiceLevels
										});
										$$renderer.push(`<!----> `);
										InputComp($$renderer, {
											label: "Sort order",
											form,
											errors,
											type: "number",
											name: "sortOrder",
											placeholder: "0"
										});
										$$renderer.push(`<!----> <div class="md:col-span-2">`);
										InputComp($$renderer, {
											label: "Tags",
											form,
											errors,
											type: "checkbox",
											name: "tags",
											items: tags
										});
										$$renderer.push(`<!----></div> <div class="md:col-span-2">`);
										InputComp($$renderer, {
											label: "Ingredients & allergens",
											form,
											errors,
											type: "textarea",
											name: "ingredients",
											rows: 2,
											placeholder: "Chilli, garlic, ginger… Contains: sesame"
										});
										$$renderer.push(`<!----></div> `);
										InputComp($$renderer, {
											label: "Featured",
											form,
											errors,
											type: "checkboxSingle",
											name: "isFeatured",
											placeholder: "Show first in the shop"
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
										$$renderer.push(`<!----> <div class="md:col-span-2">`);
										Button($$renderer, {
											type: "submit",
											form: "addon-form",
											class: "w-full",
											children: ($$renderer) => {
												if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
													$$renderer.push("<!--[0-->");
													LoadingBtn($$renderer, { name: editingRow() ? "Saving" : "Adding" });
												} else {
													$$renderer.push("<!--[-1-->");
													$$renderer.push(`${escape_html(editingRow() ? "Save changes" : "Add add-on")}`);
												}
												$$renderer.push(`<!--]-->`);
											},
											$$slots: { default: true }
										});
										$$renderer.push(`<!----></div></form>`);
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
			FilterMenu($$renderer, {
				data: data.rows,
				filterKeys: [
					"category",
					"availability",
					"isActive",
					"isFeatured"
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
				data: filteredRows,
				columns,
				fileName: "Add-ons"
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
//# sourceMappingURL=_page.svelte.js-D5cx86Gz.js.map
