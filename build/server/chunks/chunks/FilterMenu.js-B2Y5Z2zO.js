import { a7 as bind_props, aa as attr_class, ab as stringify$1, a6 as spread_props, a9 as escape_html, a4 as ensure_array_like, a3 as clsx$1, T as derived } from './server.js-CPNQ0GBv.js';
import { o as onDestroy } from './index-server.js-C9rOfj9g.js';
import { a as toast } from './toast-state.svelte.js-B2UfxrKz.js';
import { I as Icon } from './Icon.js-C-2f-rrd.js';
import { C as Chart_area } from './chart-area.js-QvFMlwKF.js';
import { C as Check } from './minus.js-ESxlDJzH.js';
import { P as Popover, a as Popover_trigger, b as Popover_content, C as Chevrons_up_down, c as Checkbox } from './popover.js-CeZILK5T.js';
import { B as Badge } from './statuses.js-e5MBhLkL.js';
import { C as Command, a as Command_input, b as Command_list, c as Command_empty, d as Command_group, e as Command_item } from './command.js-CqffWVq4.js';
import { X } from './dialog.js-BhMsigOw.js';
import { T as Tooltip_provider, a as Tooltip, b as Tooltip_trigger, c as Tooltip_content } from './tooltip.js-e17nlGw5.js';
import { L as Label } from './label.js-FcotYhKU.js';
import { b as buttonVariants, B as Button } from './button.js-DMlVoc1I.js';
import { C as Card, b as Card_header, c as Card_title, d as Card_description, a as Card_content } from './card.js-DgfKxiLl.js';

//#region node_modules/@lucide/svelte/dist/icons/activity.svelte
function Activity($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "activity" },
		props,
		{ iconNode: [["path", { "d": "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" }]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/chart-column-big.svelte
function Chart_column_big($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "chart-column-big" },
		props,
		{ iconNode: [
			["path", { "d": "M3 3v16a2 2 0 0 0 2 2h16" }],
			["rect", {
				"x": "15",
				"y": "5",
				"width": "4",
				"height": "12",
				"rx": "1"
			}],
			["rect", {
				"x": "7",
				"y": "8",
				"width": "4",
				"height": "9",
				"rx": "1"
			}]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/chart-pie.svelte
function Chart_pie($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "chart-pie" },
		props,
		{ iconNode: [["path", { "d": "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" }], ["path", { "d": "M21.21 15.89A10 10 0 1 1 8 2.83" }]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/rotate-ccw.svelte
function Rotate_ccw($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "rotate-ccw" },
		props,
		{ iconNode: [["path", { "d": "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }], ["path", { "d": "M3 3v5h5" }]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/sliders-horizontal.svelte
function Sliders_horizontal($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "sliders-horizontal" },
		props,
		{ iconNode: [
			["path", { "d": "M10 5H3" }],
			["path", { "d": "M12 19H3" }],
			["path", { "d": "M14 3v4" }],
			["path", { "d": "M16 17v4" }],
			["path", { "d": "M21 12h-9" }],
			["path", { "d": "M21 19h-5" }],
			["path", { "d": "M21 5h-7" }],
			["path", { "d": "M8 10v4" }],
			["path", { "d": "M8 12H3" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/trending-up.svelte
function Trending_up($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "trending-up" },
		props,
		{ iconNode: [["path", { "d": "M16 7h6v6" }], ["path", { "d": "m22 7-8.5 8.5-5-5L2 17" }]] }
	]));
}
//#endregion
//#region src/lib/hooks/pluralize.ts
function pluralize(word) {
	if (!word) return word;
	const irregulars = {
		person: "people",
		man: "men",
		woman: "women",
		child: "children",
		tooth: "teeth",
		foot: "feet",
		mouse: "mice",
		goose: "geese",
		ox: "oxen",
		leaf: "leaves",
		knife: "knives",
		life: "lives",
		wife: "wives",
		wolf: "wolves",
		shelf: "shelves",
		elf: "elves",
		half: "halves",
		calf: "calves",
		loaf: "loaves",
		scarf: "scarves",
		status: "statuses",
		campus: "campuses",
		focus: "focuses",
		category: "categories",
		city: "cities",
		country: "countries"
	};
	const lower = word.toLowerCase();
	if (irregulars[lower]) return word[0] === word[0].toUpperCase() ? irregulars[lower][0].toUpperCase() + irregulars[lower].slice(1) : irregulars[lower];
	if (/(?:s|sh|ch|x|z)$/i.test(word)) return word + "es";
	if (/[^aeiou]y$/i.test(word)) return word.slice(0, -1) + "ies";
	if (/(?:f|fe)$/i.test(word)) return word.replace(/(?:f|fe)$/, "ves");
	return word + "s";
}
//#endregion
//#region src/lib/components/Table/FilterMenu.svelte
function FilterMenu($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, filterKeys, filteredList = data, class: className = "" } = $$props;
		const CHART_TYPES = [
			{
				value: "bar",
				label: "Bar"
			},
			{
				value: "line",
				label: "Line"
			},
			{
				value: "pie",
				label: "Pie"
			},
			{
				value: "doughnut",
				label: "Doughnut"
			},
			{
				value: "polarArea",
				label: "Polar Area"
			},
			{
				value: "radar",
				label: "Radar"
			}
		];
		let type = void 0;
		let chartTypeOpen = false;
		let selectedFilters = {};
		let filtersOpen = false;
		let chartOpen = false;
		let activeChartKey = derived(() => filterKeys[0] ?? "");
		let chartInstances = {};
		const humanLabel = (key) => pluralize(key).replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^\w/, (c) => c.toUpperCase());
		const getDistinctValues = (key) => Array.from(new Set(data.map((item) => item[key]).filter((v) => v !== void 0 && v !== null))).map(String).sort();
		const getCountForValue = (filterKey, value) => data.filter((item) => filterKeys.every((key) => {
			if (key === filterKey) return String(item[key]) === value;
			const sel = selectedFilters[key];
			return sel.length === 0 || sel.includes(String(item[key]));
		})).length;
		const toggleFilterValue = (key, value) => {
			const cur = selectedFilters[key];
			selectedFilters[key] = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
		};
		const isValueSelected = (key, value) => selectedFilters[key]?.includes(value) ?? false;
		let isResetting = false;
		const resetFilters = () => {
			isResetting = true;
			selectedFilters = {};
			filterKeys.forEach((key) => selectedFilters[key] = []);
			filteredList = data;
			toast.success("Filters reset");
			isResetting = false;
		};
		const activeFilterCount = derived(() => Object.values(selectedFilters).reduce((acc, arr) => acc + arr.length, 0));
		onDestroy(() => {
			Object.values(chartInstances).forEach((c) => c?.destroy());
		});
		const chartTypeIcon = (t) => {
			if (t === "pie" || t === "doughnut") return Chart_pie;
			if (t === "line") return Trending_up;
			if (t === "radar" || t === "polarArea") return Activity;
			return Chart_column_big;
		};
		const ChartIcon = derived(() => chartTypeIcon(type));
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div${attr_class(`flex ${stringify$1(className)} flex-wrap items-center gap-2`)}><div class="items-between flex w-full flex-row flex-wrap justify-between">`);
			if (Tooltip_provider) {
				$$renderer.push("<!--[-->");
				Tooltip_provider($$renderer, {
					children: ($$renderer) => {
						if (Tooltip) {
							$$renderer.push("<!--[-->");
							Tooltip($$renderer, {
								children: ($$renderer) => {
									{
										function child($$renderer, props) {
											Button($$renderer, spread_props([
												{
													onclick: () => filtersOpen = !filtersOpen,
													class: "w-40"
												},
												props,
												{
													children: ($$renderer) => {
														if (filtersOpen) {
															$$renderer.push("<!--[0-->");
															X($$renderer, { class: "size-4" });
														} else {
															$$renderer.push("<!--[-1-->");
															Sliders_horizontal($$renderer, { class: "size-4" });
														}
														$$renderer.push(`<!--]--> Table Filters ${escape_html(activeFilterCount() > 0 ? `(${activeFilterCount()})` : "")}`);
													},
													$$slots: { default: true }
												}
											]));
										}
										if (Tooltip_trigger) {
											$$renderer.push("<!--[-->");
											Tooltip_trigger($$renderer, {
												class: buttonVariants({ variant: "outline" }),
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
									if (Tooltip_content) {
										$$renderer.push("<!--[-->");
										Tooltip_content($$renderer, {
											children: ($$renderer) => {
												$$renderer.push(`<p>Filter Charts</p>`);
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
			$$renderer.push(` <div>`);
			if (Tooltip_provider) {
				$$renderer.push("<!--[-->");
				Tooltip_provider($$renderer, {
					children: ($$renderer) => {
						if (Tooltip) {
							$$renderer.push("<!--[-->");
							Tooltip($$renderer, {
								children: ($$renderer) => {
									{
										function child($$renderer, props) {
											Button($$renderer, spread_props([
												{
													onclick: () => {
														chartOpen = !chartOpen;
														type = "bar";
													},
													class: "w-40"
												},
												props,
												{
													children: ($$renderer) => {
														if (chartOpen) {
															$$renderer.push("<!--[0-->");
															X($$renderer, { class: "size-4" });
														} else {
															$$renderer.push("<!--[-1-->");
															Chart_area($$renderer, { class: "size-4" });
														}
														$$renderer.push(`<!--]--> Chart ${escape_html(activeFilterCount() > 0 ? `(${activeFilterCount()})` : "")}`);
													},
													$$slots: { default: true }
												}
											]));
										}
										if (Tooltip_trigger) {
											$$renderer.push("<!--[-->");
											Tooltip_trigger($$renderer, {
												class: buttonVariants({ variant: "outline" }),
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
									if (Tooltip_content) {
										$$renderer.push("<!--[-->");
										Tooltip_content($$renderer, {
											children: ($$renderer) => {
												$$renderer.push(`<p>Filter Charts</p>`);
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
			$$renderer.push(`</div></div></div> `);
			if (filtersOpen) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="mt-4">`);
				Card($$renderer, {
					class: "w-full",
					children: ($$renderer) => {
						Card_header($$renderer, {
							children: ($$renderer) => {
								Card_title($$renderer, {
									children: ($$renderer) => {
										$$renderer.push(`<!---->Filter Charts`);
									},
									$$slots: { default: true }
								});
								$$renderer.push(`<!----> `);
								Card_description($$renderer, {
									children: ($$renderer) => {
										$$renderer.push(`<!---->Narrow the data shown in each chart`);
									},
									$$slots: { default: true }
								});
								$$renderer.push(`<!---->`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----> `);
						Card_content($$renderer, {
							children: ($$renderer) => {
								$$renderer.push(`<div class="space-y-2 rounded-xl border border-border bg-background p-6 shadow-none"><div class="flex items-center justify-between"><div class="flex items-center gap-2">`);
								Sliders_horizontal($$renderer, { class: "size-5 text-primary" });
								$$renderer.push(`<!----> <h3 class="text-base font-semibold">Filters</h3> `);
								if (activeFilterCount() > 0) {
									$$renderer.push("<!--[0-->");
									Badge($$renderer, {
										variant: "secondary",
										class: "ml-2",
										children: ($$renderer) => {
											$$renderer.push(`<!---->${escape_html(activeFilterCount())} active`);
										},
										$$slots: { default: true }
									});
								} else $$renderer.push("<!--[-1-->");
								$$renderer.push(`<!--]--></div> `);
								Button($$renderer, {
									variant: "outline",
									size: "sm",
									class: "gap-2 hover:bg-destructive/10 hover:text-destructive",
									onclick: resetFilters,
									children: ($$renderer) => {
										Rotate_ccw($$renderer, { class: `size-4 ${isResetting ? "animate-spin" : ""}` });
										$$renderer.push(`<!----> <span class="hidden sm:inline">Reset</span>`);
									},
									$$slots: { default: true }
								});
								$$renderer.push(`<!----></div> <div class="flex flex-row flex-wrap gap-4"><!--[-->`);
								const each_array = ensure_array_like(filterKeys);
								for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
									let filterKey = each_array[$$index_2];
									$$renderer.push(`<div class="min-w-50 space-y-2">`);
									Label($$renderer, {
										class: "text-sm font-medium capitalize",
										children: ($$renderer) => {
											$$renderer.push(`<!---->${escape_html(humanLabel(filterKey))}`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----> `);
									if (Popover) {
										$$renderer.push("<!--[-->");
										Popover($$renderer, {
											children: ($$renderer) => {
												{
													function child($$renderer, { props }) {
														Button($$renderer, spread_props([
															{
																variant: "outline",
																role: "combobox",
																class: "w-full justify-between"
															},
															props,
															{
																children: ($$renderer) => {
																	$$renderer.push(`<span class="truncate">`);
																	if (selectedFilters[filterKey]?.length === 0) {
																		$$renderer.push("<!--[0-->");
																		$$renderer.push(`<span class="text-muted-foreground">All ${escape_html(humanLabel(filterKey))}</span>`);
																	} else if (selectedFilters[filterKey]?.length === 1) {
																		$$renderer.push("<!--[1-->");
																		$$renderer.push(`<span class="font-medium">${escape_html(selectedFilters[filterKey][0])}</span>`);
																	} else {
																		$$renderer.push("<!--[-1-->");
																		$$renderer.push(`<span class="font-medium">${escape_html(selectedFilters[filterKey].length)} selected</span>`);
																	}
																	$$renderer.push(`<!--]--></span> `);
																	Chevrons_up_down($$renderer, { class: "ml-2 h-4 w-4 shrink-0 opacity-50" });
																	$$renderer.push(`<!---->`);
																},
																$$slots: { default: true }
															}
														]));
													}
													if (Popover_trigger) {
														$$renderer.push("<!--[-->");
														Popover_trigger($$renderer, {
															class: "w-full",
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
												if (Popover_content) {
													$$renderer.push("<!--[-->");
													Popover_content($$renderer, {
														class: "w-50 p-0",
														children: ($$renderer) => {
															if (Command) {
																$$renderer.push("<!--[-->");
																Command($$renderer, {
																	children: ($$renderer) => {
																		if (Command_input) {
																			$$renderer.push("<!--[-->");
																			Command_input($$renderer, { placeholder: `Search ${pluralize(filterKey)}...` });
																			$$renderer.push("<!--]-->");
																		} else {
																			$$renderer.push("<!--[!-->");
																			$$renderer.push("<!--]-->");
																		}
																		$$renderer.push(` `);
																		if (Command_list) {
																			$$renderer.push("<!--[-->");
																			Command_list($$renderer, {
																				children: ($$renderer) => {
																					if (Command_empty) {
																						$$renderer.push("<!--[-->");
																						Command_empty($$renderer, {
																							children: ($$renderer) => {
																								$$renderer.push(`<!---->No ${escape_html(pluralize(filterKey))} found.`);
																							},
																							$$slots: { default: true }
																						});
																						$$renderer.push("<!--]-->");
																					} else {
																						$$renderer.push("<!--[!-->");
																						$$renderer.push("<!--]-->");
																					}
																					$$renderer.push(` `);
																					if (Command_group) {
																						$$renderer.push("<!--[-->");
																						Command_group($$renderer, {
																							children: ($$renderer) => {
																								$$renderer.push(`<!--[-->`);
																								const each_array_1 = ensure_array_like(getDistinctValues(filterKey));
																								for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
																									let value = each_array_1[$$index];
																									if (Command_item) {
																										$$renderer.push("<!--[-->");
																										Command_item($$renderer, {
																											value,
																											onSelect: () => toggleFilterValue(filterKey, value),
																											class: "flex cursor-pointer items-center gap-2",
																											children: ($$renderer) => {
																												{
																													function children($$renderer, { checked }) {
																														if (checked) {
																															$$renderer.push("<!--[0-->");
																															Check($$renderer, { class: "size-3.5 text-primary" });
																														} else $$renderer.push("<!--[-1-->");
																														$$renderer.push(`<!--]-->`);
																													}
																													if (Checkbox) {
																														$$renderer.push("<!--[-->");
																														Checkbox($$renderer, {
																															checked: isValueSelected(filterKey, value),
																															class: "flex size-4 items-center justify-center rounded-sm border border-primary/50",
																															children,
																															$$slots: { default: true }
																														});
																														$$renderer.push("<!--]-->");
																													} else {
																														$$renderer.push("<!--[!-->");
																														$$renderer.push("<!--]-->");
																													}
																												}
																												$$renderer.push(` <span class="flex-1 capitalize">${escape_html(value)}</span> <span class="text-xs text-muted-foreground">(${escape_html(getCountForValue(filterKey, value))})</span>`);
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
									if (selectedFilters[filterKey]?.length > 0) {
										$$renderer.push("<!--[0-->");
										$$renderer.push(`<div class="mt-2 flex flex-wrap gap-1"><!--[-->`);
										const each_array_2 = ensure_array_like(selectedFilters[filterKey]);
										for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
											let selectedValue = each_array_2[$$index_1];
											Badge($$renderer, {
												variant: "secondary",
												class: "gap-1 pr-1",
												children: ($$renderer) => {
													$$renderer.push(`<!---->${escape_html(selectedValue)} <button class="ml-1 hover:text-destructive">`);
													X($$renderer, { class: "size-3" });
													$$renderer.push(`<!----></button>`);
												},
												$$slots: { default: true }
											});
										}
										$$renderer.push(`<!--]--></div>`);
									} else $$renderer.push("<!--[-1-->");
									$$renderer.push(`<!--]--></div>`);
								}
								$$renderer.push(`<!--]--></div></div> <div class="mt-4 flex items-center justify-between rounded-lg bg-muted/30 px-4 py-3"><p class="text-sm text-muted-foreground">Showing <span class="font-semibold text-foreground">${escape_html(filteredList.length)}</span> of <span class="font-semibold text-foreground">${escape_html(data.length)}</span> records</p> `);
								if (activeFilterCount() > 0) {
									$$renderer.push("<!--[0-->");
									$$renderer.push(`<p class="text-xs text-muted-foreground">${escape_html(activeFilterCount())} active filter${escape_html(activeFilterCount() > 1 ? "s" : "")}</p>`);
								} else $$renderer.push("<!--[-1-->");
								$$renderer.push(`<!--]--></div>`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!---->`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (chartOpen) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="mt-6 space-y-4">`);
				if (Popover) {
					$$renderer.push("<!--[-->");
					Popover($$renderer, {
						get open() {
							return chartTypeOpen;
						},
						set open($$value) {
							chartTypeOpen = $$value;
							$$settled = false;
						},
						children: ($$renderer) => {
							{
								function child($$renderer, { props }) {
									Button($$renderer, spread_props([
										{
											variant: "outline",
											class: "w-44 justify-between"
										},
										props,
										{
											children: ($$renderer) => {
												$$renderer.push(`<span class="flex items-center gap-2">`);
												if (ChartIcon()) {
													$$renderer.push("<!--[-->");
													ChartIcon()($$renderer, { class: "size-4 text-primary" });
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
												$$renderer.push(` <span>${escape_html(CHART_TYPES.find((c) => c.value === type)?.label ?? "Chart Type")}</span></span> `);
												Chevrons_up_down($$renderer, { class: "ml-2 h-4 w-4 shrink-0 opacity-50" });
												$$renderer.push(`<!---->`);
											},
											$$slots: { default: true }
										}
									]));
								}
								if (Popover_trigger) {
									$$renderer.push("<!--[-->");
									Popover_trigger($$renderer, {
										class: buttonVariants({ variant: "outline" }),
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
							if (Popover_content) {
								$$renderer.push("<!--[-->");
								Popover_content($$renderer, {
									class: "w-44 p-0",
									children: ($$renderer) => {
										if (Command) {
											$$renderer.push("<!--[-->");
											Command($$renderer, {
												children: ($$renderer) => {
													if (Command_list) {
														$$renderer.push("<!--[-->");
														Command_list($$renderer, {
															children: ($$renderer) => {
																if (Command_group) {
																	$$renderer.push("<!--[-->");
																	Command_group($$renderer, {
																		children: ($$renderer) => {
																			$$renderer.push(`<!--[-->`);
																			const each_array_3 = ensure_array_like(CHART_TYPES);
																			for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
																				let ct = each_array_3[$$index_3];
																				if (Command_item) {
																					$$renderer.push("<!--[-->");
																					Command_item($$renderer, {
																						value: ct.value,
																						onSelect: () => {
																							type = ct.value;
																							chartTypeOpen = false;
																						},
																						class: "flex cursor-pointer items-center gap-2",
																						children: ($$renderer) => {
																							Check($$renderer, { class: `size-4 ${type === ct.value ? "text-primary opacity-100" : "opacity-0"}` });
																							$$renderer.push(`<!----> ${escape_html(ct.label)}`);
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
				$$renderer.push(` <div class="flex gap-2 overflow-x-auto rounded-xl border border-border bg-muted/30 p-1"><!--[-->`);
				const each_array_4 = ensure_array_like(filterKeys);
				for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
					let key = each_array_4[$$index_4];
					$$renderer.push(`<button${attr_class(`flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${activeChartKey() === key ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`)}>`);
					if (ChartIcon()) {
						$$renderer.push("<!--[-->");
						ChartIcon()($$renderer, { class: "size-4" });
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
					$$renderer.push(` ${escape_html(humanLabel(key))} `);
					if (selectedFilters[key]?.length > 0) {
						$$renderer.push("<!--[0-->");
						Badge($$renderer, {
							variant: "secondary",
							class: "ml-1 px-1.5 py-0 text-xs",
							children: ($$renderer) => {
								$$renderer.push(`<!---->${escape_html(selectedFilters[key].length)}`);
							},
							$$slots: { default: true }
						});
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></button>`);
				}
				$$renderer.push(`<!--]--></div> <!--[-->`);
				const each_array_5 = ensure_array_like(filterKeys);
				for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
					let key = each_array_5[$$index_5];
					$$renderer.push(`<div${attr_class(clsx$1(activeChartKey() === key ? "block" : "hidden"))}>`);
					Card($$renderer, {
						class: "w-full",
						children: ($$renderer) => {
							Card_header($$renderer, {
								children: ($$renderer) => {
									$$renderer.push(`<div class="flex items-center justify-between"><div>`);
									Card_title($$renderer, {
										class: "flex items-center gap-2",
										children: ($$renderer) => {
											if (ChartIcon()) {
												$$renderer.push("<!--[-->");
												ChartIcon()($$renderer, { class: "size-5 text-primary" });
												$$renderer.push("<!--]-->");
											} else {
												$$renderer.push("<!--[!-->");
												$$renderer.push("<!--]-->");
											}
											$$renderer.push(` ${escape_html(humanLabel(key))}`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----> `);
									Card_description($$renderer, {
										class: "mt-1",
										children: ($$renderer) => {
											$$renderer.push(`<!---->Distribution of ${escape_html(humanLabel(key).toLowerCase())} across
									${escape_html(filteredList.length)} record${escape_html(filteredList.length !== 1 ? "s" : "")} `);
											if (selectedFilters[key]?.length > 0) {
												$$renderer.push("<!--[0-->");
												$$renderer.push(`· <span class="text-primary">${escape_html(selectedFilters[key].length)} value${escape_html(selectedFilters[key].length > 1 ? "s" : "")} highlighted</span>`);
											} else $$renderer.push("<!--[-1-->");
											$$renderer.push(`<!--]-->`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----></div> `);
									Badge($$renderer, {
										variant: "outline",
										class: "capitalize",
										children: ($$renderer) => {
											$$renderer.push(`<!---->${escape_html(type)}`);
										},
										$$slots: { default: true }
									});
									$$renderer.push(`<!----></div>`);
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!----> `);
							Card_content($$renderer, {
								children: ($$renderer) => {
									if (type === "bar" || type === "line") {
										$$renderer.push("<!--[0-->");
										$$renderer.push(`<p class="mb-3 text-xs text-muted-foreground">💡 Click a bar to toggle that value as a filter</p>`);
									} else {
										$$renderer.push("<!--[-1-->");
										$$renderer.push(`<p class="mb-3 text-xs text-muted-foreground">💡 Click a segment to toggle that value as a filter</p>`);
									}
									$$renderer.push(`<!--]--> <div class="relative h-72 w-full"><canvas></canvas></div>`);
								},
								$$slots: { default: true }
							});
							$$renderer.push(`<!---->`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { filteredList });
	});
}

export { FilterMenu as F };
//# sourceMappingURL=FilterMenu.js-B2Y5Z2zO.js.map
