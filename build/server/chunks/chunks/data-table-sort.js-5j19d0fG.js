import './exports.js-BT-QlP_6.js';
import { a7 as bind_props, a6 as spread_props, a9 as escape_html, a8 as props_id, a2 as attributes, T as derived, I as hasContext, J as getContext, F as setContext, E as run, Z as clsx, ab as stringify$1, ad as snapshot, a4 as ensure_array_like, a3 as clsx$1 } from './server.js-CPNQ0GBv.js';
import { t as tick } from './index-server.js-C9rOfj9g.js';
import { c as createSubscriber } from './scroll-lock.js-DAwGTwcu.js';
import { p as page } from './state.js-BDNoTQbo.js';
import { I as Icon } from './Icon.js-C-2f-rrd.js';
import { C as Chevron_down } from './chevron-down.js-ol8PFekw.js';
import { S as Scroll_area } from './scroll-area.js-DLUPG4gi.js';
import { w as createAttachmentKey, S as StyleToObject } from './create-id.js-DpR0oe6q.js';
import { D as Dropdown_menu, a as Dropdown_menu_trigger, b as Dropdown_menu_content, g as Dropdown_menu_checkbox_item, c as Dropdown_menu_item } from './dropdown-menu.js-BjUEFyFe.js';
import { c as cn } from './utils2.js-BChetszu.js';
import { B as Button } from './button.js-DMlVoc1I.js';
import { I as Input } from './input.js-BYtfwuM9.js';
import { i as isMobile } from './global.svelte.js-Bc9BkX_a.js';
import { getFilteredRowModel, getSortedRowModel, getPaginationRowModel, getCoreRowModel, createTable } from '@tanstack/table-core';
import Papa from 'papaparse';

//#region node_modules/@lucide/svelte/dist/icons/arrow-up-down.svelte
function Arrow_up_down($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "arrow-up-down" },
		props,
		{ iconNode: [
			["path", { "d": "m21 16-4 4-4-4" }],
			["path", { "d": "M17 20V4" }],
			["path", { "d": "m3 8 4-4 4 4" }],
			["path", { "d": "M7 4v16" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/download.svelte
function Download($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "download" },
		props,
		{ iconNode: [
			["path", { "d": "M12 15V3" }],
			["path", { "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }],
			["path", { "d": "m7 10 5 5 5-5" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/frown.svelte
function Frown($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "frown" },
		props,
		{ iconNode: [
			["circle", {
				"cx": "12",
				"cy": "12",
				"r": "10"
			}],
			["path", { "d": "M16 16s-1.5-2-4-2-4 2-4 2" }],
			["line", {
				"x1": "9",
				"x2": "9.01",
				"y1": "9",
				"y2": "9"
			}],
			["line", {
				"x1": "15",
				"x2": "15.01",
				"y1": "9",
				"y2": "9"
			}]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/grid-3x3.svelte
function Grid_3x3($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "grid-3x3" },
		props,
		{ iconNode: [
			["rect", {
				"width": "18",
				"height": "18",
				"x": "3",
				"y": "3",
				"rx": "2"
			}],
			["path", { "d": "M3 9h18" }],
			["path", { "d": "M3 15h18" }],
			["path", { "d": "M9 3v18" }],
			["path", { "d": "M15 3v18" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/list-ordered.svelte
function List_ordered($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "list-ordered" },
		props,
		{ iconNode: [
			["path", { "d": "M11 5h10" }],
			["path", { "d": "M11 12h10" }],
			["path", { "d": "M11 19h10" }],
			["path", { "d": "M4 4h1v5" }],
			["path", { "d": "M4 9h2" }],
			["path", { "d": "M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/printer.svelte
function Printer($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "printer" },
		props,
		{ iconNode: [
			["path", { "d": "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" }],
			["path", { "d": "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" }],
			["rect", {
				"x": "6",
				"y": "14",
				"width": "12",
				"height": "8",
				"rx": "1"
			}]
		] }
	]));
}
//#endregion
//#region src/lib/components/Table/pdf.svelte
function Pdf($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const { fileName = page.url.pathname.split("/").pop() || "export", table } = $$props;
		/**
		* Extracts clean data rows out of TanStack Table's internal memory state machine.
		* Completely isolates cell data values while bypassing UI components.
		*/
		function getTableData() {
			if (!table) {
				console.error("TanStack table instance was not provided to the export component.");
				return null;
			}
			const headerGroups = table.getHeaderGroups();
			const headers = [];
			const validColumnIds = [];
			headerGroups.forEach((headerGroup) => {
				headerGroup.headers.forEach((header) => {
					const id = header.id.toLowerCase();
					if (id === "index" || id === "actions" || id.includes("select")) return;
					validColumnIds.push(header.id);
					const cleanHeader = (typeof header.column.columnDef.header === "string" ? header.column.columnDef.header : header.id).replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
					headers.push(cleanHeader.trim());
				});
			});
			return {
				headers,
				rows: table.getRowModel().rows.map((row) => {
					return validColumnIds.map((columnId) => {
						const cell = row.getAllCells().find((c) => c.column.id === columnId);
						if (!cell) return "";
						let value = cell.renderValue();
						if (typeof value === "object" && value !== null) value = row.original[columnId] ?? "";
						if (value === void 0 || value === null) return "";
						const num = Number(value);
						if (!isNaN(num) && typeof value !== "boolean" && String(value).trim() !== "") {
							const lowerKey = columnId.toLowerCase();
							if (lowerKey.includes("phone") || lowerKey.includes("tin") || lowerKey.includes("id") || lowerKey.includes("code") || lowerKey.includes("number") || lowerKey.includes("index")) return String(value).trim();
							return num.toLocaleString("en-US", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							});
						}
						return String(value).trim();
					});
				})
			};
		}
		/** Escape user data so raw values can never break the print markup. */
		function escapeHtml(str) {
			return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
		}
		/** Cells that look like formatted numbers get right-aligned, like a ledger. */
		function isNumericCell(value) {
			return /^-?[\d,]+(\.\d+)?$/.test(value) && value !== "";
		}
		/**
		* Prints the table via a hidden iframe.
		* The browser's own layout engine handles column wrapping, page breaks,
		* and repeating <thead> on every page — which scales to any column count.
		*/
		function printTable() {
			const parsed = getTableData();
			if (!parsed) return;
			const columnCount = parsed.headers.length;
			let pageSize = "A4 portrait";
			let fontSize = 10;
			let cellPadding = 5;
			if (columnCount > 25) {
				pageSize = "A3 landscape";
				fontSize = 7;
				cellPadding = 3;
			} else if (columnCount > 15) {
				pageSize = "A3 landscape";
				fontSize = 8;
				cellPadding = 4;
			} else if (columnCount > 8) {
				pageSize = "A4 landscape";
				fontSize = 9;
				cellPadding = 4;
			}
			const headHtml = parsed.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("");
			const bodyHtml = parsed.rows.map((row) => `<tr>${row.map((cell) => {
				const safe = escapeHtml(cell);
				return isNumericCell(cell) ? `<td class="num">${safe}</td>` : `<td>${safe}</td>`;
			}).join("")}</tr>`).join("");
			const printedAt = (/* @__PURE__ */ new Date()).toLocaleString();
			const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHtml(fileName)}</title>
<style>
	@page {
		size: ${pageSize};
		margin: 12mm 10mm;
	}
	* { box-sizing: border-box; }
	html, body {
		margin: 0;
		padding: 0;
		font-family: Helvetica, Arial, sans-serif;
		color: #0f172a;
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
	}
	.report-title {
		font-size: ${fontSize + 4}px;
		font-weight: 700;
		margin: 0 0 2px 0;
		text-transform: capitalize;
	}
	.report-meta {
		font-size: ${Math.max(fontSize - 2, 6)}px;
		color: #64748b;
		margin: 0 0 8px 0;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: ${fontSize}px;
		table-layout: auto;
	}
	/* Repeats the header row automatically on every printed page */
	thead { display: table-header-group; }
	th {
		background: #1e293b; /* Dark Slate matching ERP structures */
		color: #ffffff;
		font-weight: 700;
		text-align: left;
		padding: ${cellPadding + 1}px ${cellPadding}px;
		border: 0.5px solid #334155;
		vertical-align: middle;
	}
	td {
		padding: ${cellPadding}px;
		border: 0.5px solid #e2e8f0;
		vertical-align: middle;
		word-break: break-word;
		overflow-wrap: anywhere; /* Continuous textual wraps inside narrow grids */
	}
	td.num {
		text-align: right;
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
	}
	tbody tr:nth-child(even) td { background: #f8fafc; }
	tr { break-inside: avoid; page-break-inside: avoid; }
</style>
</head>
<body>
	<h1 class="report-title">${escapeHtml(fileName.replace(/[-_]/g, " "))}</h1>
	<p class="report-meta">Printed ${escapeHtml(printedAt)} &middot; ${parsed.rows.length} rows</p>
	<table>
		<thead><tr>${headHtml}</tr></thead>
		<tbody>${bodyHtml}</tbody>
	</table>
</body>
</html>`;
			const iframe = document.createElement("iframe");
			iframe.style.position = "fixed";
			iframe.style.right = "0";
			iframe.style.bottom = "0";
			iframe.style.width = "0";
			iframe.style.height = "0";
			iframe.style.border = "0";
			iframe.setAttribute("aria-hidden", "true");
			document.body.appendChild(iframe);
			const cleanup = () => {
				setTimeout(() => iframe.remove(), 1e3);
			};
			iframe.onload = () => {
				const frameWindow = iframe.contentWindow;
				if (!frameWindow) {
					cleanup();
					return;
				}
				frameWindow.onafterprint = cleanup;
				requestAnimationFrame(() => {
					frameWindow.focus();
					frameWindow.print();
					setTimeout(cleanup, 6e4);
				});
			};
			const frameDoc = iframe.contentWindow?.document;
			if (!frameDoc) {
				iframe.remove();
				console.error("Unable to access print frame document.");
				return;
			}
			frameDoc.open();
			frameDoc.write(html);
			frameDoc.close();
		}
		function exportTableToCSV() {
			const parsed = getTableData();
			if (!parsed) return;
			const csvData = [parsed.headers, ...parsed.rows];
			const csv = Papa.unparse(csvData);
			const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `${fileName}.csv`;
			link.click();
			URL.revokeObjectURL(url);
		}
		if (Dropdown_menu) {
			$$renderer.push("<!--[-->");
			Dropdown_menu($$renderer, {
				children: ($$renderer) => {
					{
						function child($$renderer, { props }) {
							Button($$renderer, spread_props([props, {
								variant: "outline",
								class: "ml-auto",
								children: ($$renderer) => {
									Download($$renderer, { class: "size-5" });
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
							align: "end",
							children: ($$renderer) => {
								if (Dropdown_menu_item) {
									$$renderer.push("<!--[-->");
									Dropdown_menu_item($$renderer, {
										class: "capitalize",
										children: ($$renderer) => {
											Button($$renderer, {
												variant: "default",
												class: "w-full justify-start gap-2",
												onclick: printTable,
												children: ($$renderer) => {
													Printer($$renderer, { class: "size-4 text-white dark:text-black" });
													$$renderer.push(`<!----> Print`);
												},
												$$slots: { default: true }
											});
										},
										$$slots: { default: true }
									});
									$$renderer.push("<!--]-->");
								} else {
									$$renderer.push("<!--[!-->");
									$$renderer.push("<!--]-->");
								}
								$$renderer.push(` `);
								if (Dropdown_menu_item) {
									$$renderer.push("<!--[-->");
									Dropdown_menu_item($$renderer, {
										class: "capitalize",
										children: ($$renderer) => {
											Button($$renderer, {
												variant: "default",
												class: "w-full justify-start gap-2",
												onclick: exportTableToCSV,
												children: ($$renderer) => {
													Grid_3x3($$renderer, { class: "size-4 text-white dark:text-black" });
													$$renderer.push(`<!----> Export to CSV`);
												},
												$$slots: { default: true }
											});
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
	});
}
//#endregion
//#region src/lib/components/ui/data-table/render-helpers.ts
/**
* A helper class to make it easy to identify Svelte components in
* `columnDef.cell` and `columnDef.header` properties.
*
* > NOTE: This class should only be used internally by the adapter. If you're
* reading this and you don't know what this is for, you probably don't need it.
*
* @example
* ```svelte
* {@const result = content(context as any)}
* {#if result instanceof RenderComponentConfig}
*   {@const { component: Component, props } = result}
*   <Component {...props} />
* {/if}
* ```
*/
var RenderComponentConfig = class {
	component;
	props;
	constructor(component, props = {}) {
		this.component = component;
		this.props = props;
	}
};
/**
* A helper class to make it easy to identify Svelte Snippets in `columnDef.cell` and `columnDef.header` properties.
*
* > NOTE: This class should only be used internally by the adapter. If you're
* reading this and you don't know what this is for, you probably don't need it.
*
* @example
* ```svelte
* {@const result = content(context as any)}
* {#if result instanceof RenderSnippetConfig}
*   {@const { snippet, params } = result}
*   {@render snippet(params)}
* {/if}
* ```
*/
var RenderSnippetConfig = class {
	snippet;
	params;
	constructor(snippet, params) {
		this.snippet = snippet;
		this.params = params;
	}
};
/**
* A helper function to help create cells from Svelte components through ColumnDef's `cell` and `header` properties.
*
* This is only to be used with Svelte Components - use `renderSnippet` for Svelte Snippets.
*
* @param component A Svelte component
* @param props The props to pass to `component`
* @returns A `RenderComponentConfig` object that helps svelte-table know how to render the header/cell component.
* @example
* ```ts
* // +page.svelte
* const defaultColumns = [
*   columnHelper.accessor('name', {
*     header: header => renderComponent(SortHeader, { label: 'Name', header }),
*   }),
*   columnHelper.accessor('state', {
*     header: header => renderComponent(SortHeader, { label: 'State', header }),
*   }),
* ]
* ```
* @see {@link https://tanstack.com/table/latest/docs/guide/column-defs}
*/
function renderComponent(component, props = {}) {
	return new RenderComponentConfig(component, props);
}
//#endregion
//#region src/lib/components/ui/data-table/flex-render.svelte
function Flex_render($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** The cell or header field of the current cell's column definition. */
		/** The result of the `getContext()` function of the header or cell */
		/** Used to pass attachments that can't be gotten through context */
		let { content, context, attach } = $$props;
		if (typeof content === "string") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`${escape_html(content)}`);
		} else if (content instanceof Function) {
			$$renderer.push("<!--[1-->");
			const result = content(context);
			if (result instanceof RenderComponentConfig) {
				$$renderer.push("<!--[0-->");
				const { component: Component, props } = result;
				if (Component) {
					$$renderer.push("<!--[-->");
					Component($$renderer, spread_props([props, { attach }]));
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			} else if (result instanceof RenderSnippetConfig) {
				$$renderer.push("<!--[1-->");
				const { snippet, params } = result;
				snippet($$renderer, {
					...params,
					attach
				});
				$$renderer.push(`<!---->`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`${escape_html(result)}`);
			}
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/lib/components/ui/data-table/data-table.svelte.ts
function createSvelteTable(options) {
	const resolvedOptions = mergeObjects({
		state: {},
		onStateChange() {},
		renderFallbackValue: null,
		mergeOptions: (defaultOptions, options) => {
			return mergeObjects(defaultOptions, options);
		}
	}, options);
	const table = createTable(resolvedOptions);
	let state = table.initialState;
	function updateOptions() {
		table.setOptions(() => {
			return mergeObjects(resolvedOptions, options, {
				state: mergeObjects(state, options.state || {}),
				onStateChange: (updater) => {
					if (updater instanceof Function) state = updater(state);
					else state = mergeObjects(state, updater);
					options.onStateChange?.(updater);
				}
			});
		});
	}
	updateOptions();
	return table;
}
/**
* Lazily merges several objects (or thunks) while preserving
* getter semantics from every source.
*
* Proxy-based to avoid known WebKit recursion issue.
*/
function mergeObjects(...sources) {
	const resolve = (src) => typeof src === "function" ? src() ?? void 0 : src;
	const findSourceWithKey = (key) => {
		for (let i = sources.length - 1; i >= 0; i--) {
			const obj = resolve(sources[i]);
			if (obj && key in obj) return obj;
		}
	};
	return new Proxy(Object.create(null), {
		get(_, key) {
			return findSourceWithKey(key)?.[key];
		},
		has(_, key) {
			return !!findSourceWithKey(key);
		},
		ownKeys() {
			const all = /* @__PURE__ */ new Set();
			for (const s of sources) {
				const obj = resolve(s);
				if (obj) for (const k of Reflect.ownKeys(obj)) all.add(k);
			}
			return [...all];
		},
		getOwnPropertyDescriptor(_, key) {
			const src = findSourceWithKey(key);
			if (!src) return void 0;
			return {
				configurable: true,
				enumerable: true,
				value: src[key],
				writable: true
			};
		}
	});
}
//#endregion
//#region src/lib/components/ui/table/table.svelte
function Table($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div data-slot="table-container" class="relative w-full overflow-x-auto"><table${attributes({
			"data-slot": "table",
			class: clsx$1(cn("w-full caption-bottom text-sm", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></table></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/table/table-body.svelte
function Table_body($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<tbody${attributes({
			"data-slot": "table-body",
			class: clsx$1(cn("[&_tr:last-child]:border-0", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></tbody>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/table/table-cell.svelte
function Table_cell($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<td${attributes({
			"data-slot": "table-cell",
			class: clsx$1(cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></td>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/table/table-head.svelte
function Table_head($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<th${attributes({
			"data-slot": "table-head",
			class: clsx$1(cn("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></th>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/table/table-header.svelte
function Table_header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<thead${attributes({
			"data-slot": "table-header",
			class: clsx$1(cn("[&_tr]:border-b", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></thead>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/table/table-row.svelte
function Table_row($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<tr${attributes({
			"data-slot": "table-row",
			class: clsx$1(cn("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></tr>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/dist/utils/is.js
function isFunction(value) {
	return typeof value === "function";
}
function isObject(value) {
	return value !== null && typeof value === "object";
}
var CLASS_VALUE_PRIMITIVE_TYPES = [
	"string",
	"number",
	"bigint",
	"boolean"
];
function isClassValue(value) {
	if (value === null || value === void 0) return true;
	if (CLASS_VALUE_PRIMITIVE_TYPES.includes(typeof value)) return true;
	if (Array.isArray(value)) return value.every((item) => isClassValue(item));
	if (typeof value === "object") {
		if (Object.getPrototypeOf(value) !== Object.prototype) return false;
		return true;
	}
	return false;
}
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/dist/box/box.svelte.js
var BoxSymbol = Symbol("box");
var isWritableSymbol = Symbol("is-writable");
function isBox(value) {
	return isObject(value) && BoxSymbol in value;
}
/**
* @returns Whether the value is a WritableBox
*
* @see {@link https://runed.dev/docs/functions/box}
*/
function isWritableBox(value) {
	return box.isBox(value) && isWritableSymbol in value;
}
function box(initialValue) {
	let current = initialValue;
	return {
		[BoxSymbol]: true,
		[isWritableSymbol]: true,
		get current() {
			return current;
		},
		set current(v) {
			current = v;
		}
	};
}
function boxWith(getter, setter) {
	const derived$1 = derived(getter);
	if (setter) return {
		[BoxSymbol]: true,
		[isWritableSymbol]: true,
		get current() {
			return derived$1();
		},
		set current(v) {
			setter(v);
		}
	};
	return {
		[BoxSymbol]: true,
		get current() {
			return getter();
		}
	};
}
function boxFrom(value) {
	if (box.isBox(value)) return value;
	if (isFunction(value)) return box.with(value);
	return box(value);
}
/**
* Function that gets an object of boxes, and returns an object of reactive values
*
* @example
* const count = box(0)
* const flat = box.flatten({ count, double: box.with(() => count.current) })
* // type of flat is { count: number, readonly double: number }
*
* @see {@link https://runed.dev/docs/functions/box}
*/
function boxFlatten(boxes) {
	return Object.entries(boxes).reduce((acc, [key, b]) => {
		if (!box.isBox(b)) return Object.assign(acc, { [key]: b });
		if (box.isWritableBox(b)) Object.defineProperty(acc, key, {
			get() {
				return b.current;
			},
			set(v) {
				b.current = v;
			}
		});
		else Object.defineProperty(acc, key, { get() {
			return b.current;
		} });
		return acc;
	}, {});
}
/**
* Function that converts a box to a readonly box.
*
* @example
* const count = box(0) // WritableBox<number>
* const countReadonly = box.readonly(count) // ReadableBox<number>
*
* @see {@link https://runed.dev/docs/functions/box}
*/
function toReadonlyBox(b) {
	if (!box.isWritableBox(b)) return b;
	return {
		[BoxSymbol]: true,
		get current() {
			return b.current;
		}
	};
}
box.from = boxFrom;
box.with = boxWith;
box.flatten = boxFlatten;
box.readonly = toReadonlyBox;
box.isBox = isBox;
box.isWritableBox = isWritableBox;
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/dist/utils/compose-handlers.js
/**
* Composes event handlers into a single function that can be called with an event.
* If the previous handler cancels the event using `event.preventDefault()`, the handlers
* that follow will not be called.
*/
function composeHandlers(...handlers) {
	return function(e) {
		for (const handler of handlers) {
			if (!handler) continue;
			if (e.defaultPrevented) return;
			if (typeof handler === "function") handler.call(this, e);
			else handler.current?.call(this, e);
		}
	};
}
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/dist/utils/strings.js
var NUMBER_CHAR_RE = /\d/;
var STR_SPLITTERS = [
	"-",
	"_",
	"/",
	"."
];
function isUppercase(char = "") {
	if (NUMBER_CHAR_RE.test(char)) return void 0;
	return char !== char.toLowerCase();
}
function splitByCase(str) {
	const parts = [];
	let buff = "";
	let previousUpper;
	let previousSplitter;
	for (const char of str) {
		const isSplitter = STR_SPLITTERS.includes(char);
		if (isSplitter === true) {
			parts.push(buff);
			buff = "";
			previousUpper = void 0;
			continue;
		}
		const isUpper = isUppercase(char);
		if (previousSplitter === false) {
			if (previousUpper === false && isUpper === true) {
				parts.push(buff);
				buff = char;
				previousUpper = isUpper;
				continue;
			}
			if (previousUpper === true && isUpper === false && buff.length > 1) {
				const lastChar = buff.at(-1);
				parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
				buff = lastChar + char;
				previousUpper = isUpper;
				continue;
			}
		}
		buff += char;
		previousUpper = isUpper;
		previousSplitter = isSplitter;
	}
	parts.push(buff);
	return parts;
}
function pascalCase(str) {
	if (!str) return "";
	return splitByCase(str).map((p) => upperFirst(p)).join("");
}
function camelCase(str) {
	return lowerFirst(pascalCase(str || ""));
}
function upperFirst(str) {
	return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function lowerFirst(str) {
	return str ? str[0].toLowerCase() + str.slice(1) : "";
}
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/dist/utils/css-to-style-obj.js
function cssToStyleObj(css) {
	if (!css) return {};
	const styleObj = {};
	function iterator(name, value) {
		if (name.startsWith("-moz-") || name.startsWith("-webkit-") || name.startsWith("-ms-") || name.startsWith("-o-")) {
			styleObj[pascalCase(name)] = value;
			return;
		}
		if (name.startsWith("--")) {
			styleObj[name] = value;
			return;
		}
		styleObj[camelCase(name)] = value;
	}
	StyleToObject(css, iterator);
	return styleObj;
}
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/dist/utils/execute-callbacks.js
/**
* Executes an array of callback functions with the same arguments.
* @template T The types of the arguments that the callback functions take.
* @param callbacks array of callback functions to execute.
* @returns A new function that executes all of the original callback functions with the same arguments.
*/
function executeCallbacks(...callbacks) {
	return (...args) => {
		for (const callback of callbacks) if (typeof callback === "function") callback(...args);
	};
}
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/dist/utils/events.js
/**
* Adds an event listener to the specified target element(s) for the given event(s), and returns a function to remove it.
* @param target The target element(s) to add the event listener to.
* @param event The event(s) to listen for.
* @param handler The function to be called when the event is triggered.
* @param options An optional object that specifies characteristics about the event listener.
* @returns A function that removes the event listener from the target element(s).
*/
function addEventListener(target, event, handler, options) {
	const events = Array.isArray(event) ? event : [event];
	events.forEach((_event) => target.addEventListener(_event, handler, options));
	return () => {
		events.forEach((_event) => target.removeEventListener(_event, handler, options));
	};
}
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/dist/utils/style-to-css.js
function createParser(matcher, replacer) {
	const regex = RegExp(matcher, "g");
	return (str) => {
		if (typeof str !== "string") throw new TypeError(`expected an argument of type string, but got ${typeof str}`);
		if (!str.match(regex)) return str;
		return str.replace(regex, replacer);
	};
}
var camelToKebab = createParser(/[A-Z]/, (match) => `-${match.toLowerCase()}`);
function styleToCSS(styleObj) {
	if (!styleObj || typeof styleObj !== "object" || Array.isArray(styleObj)) throw new TypeError(`expected an argument of type object, but got ${typeof styleObj}`);
	return Object.keys(styleObj).map((property) => `${camelToKebab(property)}: ${styleObj[property]};`).join("\n");
}
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/dist/utils/style.js
function styleToString(style = {}) {
	return styleToCSS(style).replace("\n", " ");
}
styleToString({
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0",
	transform: "translateX(-100%)"
});
var EVENT_LIST_SET = /* @__PURE__ */ new Set([
	"onabort",
	"onanimationcancel",
	"onanimationend",
	"onanimationiteration",
	"onanimationstart",
	"onauxclick",
	"onbeforeinput",
	"onbeforetoggle",
	"onblur",
	"oncancel",
	"oncanplay",
	"oncanplaythrough",
	"onchange",
	"onclick",
	"onclose",
	"oncompositionend",
	"oncompositionstart",
	"oncompositionupdate",
	"oncontextlost",
	"oncontextmenu",
	"oncontextrestored",
	"oncopy",
	"oncuechange",
	"oncut",
	"ondblclick",
	"ondrag",
	"ondragend",
	"ondragenter",
	"ondragleave",
	"ondragover",
	"ondragstart",
	"ondrop",
	"ondurationchange",
	"onemptied",
	"onended",
	"onerror",
	"onfocus",
	"onfocusin",
	"onfocusout",
	"onformdata",
	"ongotpointercapture",
	"oninput",
	"oninvalid",
	"onkeydown",
	"onkeypress",
	"onkeyup",
	"onload",
	"onloadeddata",
	"onloadedmetadata",
	"onloadstart",
	"onlostpointercapture",
	"onmousedown",
	"onmouseenter",
	"onmouseleave",
	"onmousemove",
	"onmouseout",
	"onmouseover",
	"onmouseup",
	"onpaste",
	"onpause",
	"onplay",
	"onplaying",
	"onpointercancel",
	"onpointerdown",
	"onpointerenter",
	"onpointerleave",
	"onpointermove",
	"onpointerout",
	"onpointerover",
	"onpointerup",
	"onprogress",
	"onratechange",
	"onreset",
	"onresize",
	"onscroll",
	"onscrollend",
	"onsecuritypolicyviolation",
	"onseeked",
	"onseeking",
	"onselect",
	"onselectionchange",
	"onselectstart",
	"onslotchange",
	"onstalled",
	"onsubmit",
	"onsuspend",
	"ontimeupdate",
	"ontoggle",
	"ontouchcancel",
	"ontouchend",
	"ontouchmove",
	"ontouchstart",
	"ontransitioncancel",
	"ontransitionend",
	"ontransitionrun",
	"ontransitionstart",
	"onvolumechange",
	"onwaiting",
	"onwebkitanimationend",
	"onwebkitanimationiteration",
	"onwebkitanimationstart",
	"onwebkittransitionend",
	"onwheel"
]);
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/dist/utils/merge-props.js
/**
* Modified from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/utils/src/mergeProps.ts (see NOTICE.txt for source)
*/
function isEventHandler(key) {
	return EVENT_LIST_SET.has(key);
}
/**
* Given a list of prop objects, merges them into a single object.
* - Automatically composes event handlers (e.g. `onclick`, `oninput`, etc.)
* - Chains regular functions with the same name so they are called in order
* - Merges class strings with `clsx`
* - Merges style objects and converts them to strings
* - Handles a bug with Svelte where setting the `hidden` attribute to `false` doesn't remove it
* - Overrides other values with the last one
*/
function mergeProps(...args) {
	const result = { ...args[0] };
	for (let i = 1; i < args.length; i++) {
		const props = args[i];
		if (!props) continue;
		for (const key of Object.keys(props)) {
			const a = result[key];
			const b = props[key];
			const aIsFunction = typeof a === "function";
			const bIsFunction = typeof b === "function";
			if (aIsFunction && typeof bIsFunction && isEventHandler(key)) result[key] = composeHandlers(a, b);
			else if (aIsFunction && bIsFunction) result[key] = executeCallbacks(a, b);
			else if (key === "class") {
				const aIsClassValue = isClassValue(a);
				const bIsClassValue = isClassValue(b);
				if (aIsClassValue && bIsClassValue) result[key] = clsx(a, b);
				else if (aIsClassValue) result[key] = clsx(a);
				else if (bIsClassValue) result[key] = clsx(b);
			} else if (key === "style") {
				const aIsObject = typeof a === "object";
				const bIsObject = typeof b === "object";
				const aIsString = typeof a === "string";
				const bIsString = typeof b === "string";
				if (aIsObject && bIsObject) result[key] = {
					...a,
					...b
				};
				else if (aIsObject && bIsString) {
					const parsedStyle = cssToStyleObj(b);
					result[key] = {
						...a,
						...parsedStyle
					};
				} else if (aIsString && bIsObject) result[key] = {
					...cssToStyleObj(a),
					...b
				};
				else if (aIsString && bIsString) {
					const parsedStyleA = cssToStyleObj(a);
					const parsedStyleB = cssToStyleObj(b);
					result[key] = {
						...parsedStyleA,
						...parsedStyleB
					};
				} else if (aIsObject) result[key] = a;
				else if (bIsObject) result[key] = b;
				else if (aIsString) result[key] = a;
				else if (bIsString) result[key] = b;
			} else result[key] = b !== void 0 ? b : a;
		}
		for (const key of Object.getOwnPropertySymbols(props)) {
			const a = result[key];
			const b = props[key];
			result[key] = b !== void 0 ? b : a;
		}
	}
	if (typeof result.style === "object") result.style = styleToString(result.style).replaceAll("\n", " ");
	if (result.hidden !== true) {
		result.hidden = void 0;
		delete result.hidden;
	}
	if (result.disabled !== true) {
		result.disabled = void 0;
		delete result.disabled;
	}
	return result;
}
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/node_modules/runed/dist/internal/configurable-globals.js
var defaultWindow$1 = void 0;
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/node_modules/runed/dist/internal/utils/dom.js
/**
* Handles getting the active element in a document or shadow root.
* If the active element is within a shadow root, it will traverse the shadow root
* to find the active element.
* If not, it will return the active element in the document.
*
* @param document A document or shadow root to get the active element from.
* @returns The active element in the document or shadow root.
*/
function getActiveElement$2(document) {
	let activeElement = document.activeElement;
	while (activeElement?.shadowRoot) {
		const node = activeElement.shadowRoot.activeElement;
		if (node === activeElement) break;
		else activeElement = node;
	}
	return activeElement;
}
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/node_modules/runed/dist/utilities/active-element/active-element.svelte.js
var ActiveElement$1 = class {
	#document;
	#subscribe;
	constructor(options = {}) {
		const { window = defaultWindow$1, document = window?.document } = options;
		if (window === void 0) return;
		this.#document = document;
		this.#subscribe = createSubscriber();
	}
	get current() {
		this.#subscribe?.();
		if (!this.#document) return null;
		return getActiveElement$2(this.#document);
	}
};
new ActiveElement$1();
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/dist/utils/after-tick.js
function afterTick(fn) {
	(/* @__PURE__ */ tick()).then(fn);
}
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/dist/utils/dom.js
var DOCUMENT_NODE = 9;
function isDocument(node) {
	return isObject(node) && node.nodeType === DOCUMENT_NODE;
}
function isWindow(node) {
	return isObject(node) && node.constructor?.name === "VisualViewport";
}
function getDocument(node) {
	if (isDocument(node)) return node;
	if (isWindow(node)) return node.document;
	return node?.ownerDocument ?? document;
}
function getActiveElement$1(rootNode) {
	let activeElement = rootNode.activeElement;
	while (activeElement?.shadowRoot) {
		const el = activeElement.shadowRoot.activeElement;
		if (el === activeElement) break;
		else activeElement = el;
	}
	return activeElement;
}
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/dist/utils/dom-context.svelte.js
var DOMContext = class {
	element;
	#root = derived(() => {
		if (!this.element.current) return document;
		return this.element.current.getRootNode() ?? document;
	});
	get root() {
		return this.#root();
	}
	set root($$value) {
		return this.#root($$value);
	}
	constructor(element) {
		if (typeof element === "function") this.element = box.with(element);
		else this.element = element;
	}
	getDocument = () => {
		return getDocument(this.root);
	};
	getWindow = () => {
		return this.getDocument().defaultView ?? window;
	};
	getActiveElement = () => {
		return getActiveElement$1(this.root);
	};
	isActiveElement = (node) => {
		return node === this.getActiveElement();
	};
	getElementById(id) {
		return this.root.getElementById(id);
	}
	querySelector = (selector) => {
		if (!this.root) return null;
		return this.root.querySelector(selector);
	};
	querySelectorAll = (selector) => {
		if (!this.root) return [];
		return this.root.querySelectorAll(selector);
	};
	setTimeout = (callback, delay) => {
		return this.getWindow().setTimeout(callback, delay);
	};
	clearTimeout = (timeoutId) => {
		return this.getWindow().clearTimeout(timeoutId);
	};
};
//#endregion
//#region node_modules/paneforge/node_modules/svelte-toolbelt/dist/utils/attach-ref.js
/**
* Creates a Svelte Attachment that attaches a DOM element to a ref.
* The ref can be either a WritableBox or a callback function.
*
* @param ref - Either a WritableBox to store the element in, or a callback function that receives the element
* @param onChange - Optional callback that fires when the ref changes
* @returns An object with a spreadable attachment key that should be spread onto the element
*
* @example
* // Using with WritableBox
* const ref = box<HTMLDivElement | null>(null);
* <div {...attachRef(ref)}>Content</div>
*
* @example
* // Using with callback
* <div {...attachRef((node) => myNode = node)}>Content</div>
*
* @example
* // Using with onChange
* <div {...attachRef(ref, (node) => console.log(node))}>Content</div>
*/
function attachRef(ref, onChange) {
	return { [createAttachmentKey()]: (node) => {
		if (box.isBox(ref)) {
			ref.current = node;
			run(() => onChange?.(node));
			return () => {
				if ("isConnected" in node && node.isConnected) return;
				ref.current = null;
			};
		}
		ref(node);
		run(() => onChange?.(node));
		return () => {
			if ("isConnected" in node && node.isConnected) return;
			ref(null);
		};
	} };
}
//#endregion
//#region node_modules/paneforge/dist/internal/utils/aria.js
/**
* A utility function that calculates the `aria-valuemax`, `aria-valuemin`,
* and `aria-valuenow` values for a pane based on its layout and constraints.
*/
function calculateAriaValues({ layout, panesArray, pivotIndices }) {
	let currentMinSize = 0;
	let currentMaxSize = 100;
	let totalMinSize = 0;
	let totalMaxSize = 0;
	const firstIndex = pivotIndices[0];
	for (let i = 0; i < panesArray.length; i++) {
		const { maxSize = 100, minSize = 0 } = panesArray[i].constraints;
		if (i === firstIndex) {
			currentMinSize = minSize;
			currentMaxSize = maxSize;
		} else {
			totalMinSize += minSize;
			totalMaxSize += maxSize;
		}
	}
	return {
		valueMax: Math.min(currentMaxSize, 100 - totalMinSize),
		valueMin: Math.max(currentMinSize, 100 - totalMaxSize),
		valueNow: layout[firstIndex]
	};
}
//#endregion
//#region node_modules/paneforge/dist/internal/utils/assert.js
function assert(expectedCondition, message = "Assertion failed!") {
	if (!expectedCondition) {
		console.error(message);
		throw new Error(message);
	}
}
//#endregion
//#region node_modules/paneforge/dist/internal/utils/compare.js
/**
* Compares two numbers for equality with a given fractional precision.
*/
function areNumbersAlmostEqual(actual, expected, fractionDigits = 10) {
	return compareNumbersWithTolerance(actual, expected, fractionDigits) === 0;
}
/**
* Compares two numbers with a given tolerance.
*
* @returns `-1` if `actual` is less than `expected`, `0` if they are equal,
* and `1` if `actual` is greater than `expected`.
*/
function compareNumbersWithTolerance(actual, expected, fractionDigits = 10) {
	const roundedActual = roundTo(actual, fractionDigits);
	const roundedExpected = roundTo(expected, fractionDigits);
	return Math.sign(roundedActual - roundedExpected);
}
/**
* Compares two arrays for equality.
*/
function areArraysEqual(arrA, arrB) {
	if (arrA.length !== arrB.length) return false;
	for (let index = 0; index < arrA.length; index++) if (arrA[index] !== arrB[index]) return false;
	return true;
}
/**
* Rounds a number to a given number of decimal places.
*/
function roundTo(value, decimals) {
	return Number.parseFloat(value.toFixed(decimals));
}
//#endregion
//#region node_modules/paneforge/dist/internal/utils/is.js
var isBrowser = typeof document !== "undefined";
function isHTMLElement(element) {
	return element instanceof HTMLElement;
}
function isKeyDown(event) {
	return event.type === "keydown";
}
function isMouseEvent(event) {
	return event.type.startsWith("mouse");
}
function isTouchEvent(event) {
	return event.type.startsWith("touch");
}
//#endregion
//#region node_modules/paneforge/dist/internal/utils/resize.js
/**
* Resizes a pane based on its constraints.
*/
function resizePane({ paneConstraints: paneConstraintsArray, paneIndex, initialSize }) {
	const paneConstraints = paneConstraintsArray[paneIndex];
	assert(paneConstraints != null, "Pane constraints should not be null.");
	const { collapsedSize = 0, collapsible, maxSize = 100, minSize = 0 } = paneConstraints;
	let newSize = initialSize;
	if (compareNumbersWithTolerance(newSize, minSize) < 0) newSize = getAdjustedSizeForCollapsible(newSize, collapsible, collapsedSize, minSize);
	newSize = Math.min(maxSize, newSize);
	return Number.parseFloat(newSize.toFixed(10));
}
/**
* Adjusts the size of a pane based on its collapsible state.
*
* If the pane is collapsible, the size will be snapped to the collapsed size
* or the minimum size based on the halfway point.
*/
function getAdjustedSizeForCollapsible(size, collapsible, collapsedSize, minSize) {
	if (!collapsible) return minSize;
	return compareNumbersWithTolerance(size, (collapsedSize + minSize) / 2) < 0 ? collapsedSize : minSize;
}
//#endregion
//#region node_modules/paneforge/dist/internal/helpers.js
function noop() {}
function updateResizeHandleAriaValues({ groupId, layout, panesArray, domContext }) {
	const resizeHandleElements = getResizeHandleElementsForGroup(groupId, domContext);
	for (let index = 0; index < panesArray.length - 1; index++) {
		const { valueMax, valueMin, valueNow } = calculateAriaValues({
			layout,
			panesArray,
			pivotIndices: [index, index + 1]
		});
		const resizeHandleEl = resizeHandleElements[index];
		if (isHTMLElement(resizeHandleEl)) {
			const paneData = panesArray[index];
			resizeHandleEl.setAttribute("aria-controls", paneData.opts.id.current);
			resizeHandleEl.setAttribute("aria-valuemax", `${Math.round(valueMax)}`);
			resizeHandleEl.setAttribute("aria-valuemin", `${Math.round(valueMin)}`);
			resizeHandleEl.setAttribute("aria-valuenow", valueNow != null ? `${Math.round(valueNow)}` : "");
		}
	}
	return () => {
		for (const el of resizeHandleElements) {
			el.removeAttribute("aria-controls");
			el.removeAttribute("aria-valuemax");
			el.removeAttribute("aria-valuemin");
			el.removeAttribute("aria-valuenow");
		}
	};
}
function getResizeHandleElementsForGroup(groupId, domContext) {
	if (!isBrowser) return [];
	return Array.from(domContext.querySelectorAll(`[data-pane-resizer-id][data-pane-group-id="${groupId}"]`));
}
function getResizeHandleElementIndex({ groupId, id, domContext }) {
	if (!isBrowser) return null;
	return getResizeHandleElementsForGroup(groupId, domContext).findIndex((handle) => handle.getAttribute("data-pane-resizer-id") === id) ?? null;
}
function getPivotIndices({ groupId, dragHandleId, domContext }) {
	const index = getResizeHandleElementIndex({
		groupId,
		id: dragHandleId,
		domContext
	});
	return index != null ? [index, index + 1] : [-1, -1];
}
function paneDataHelper(panesArray, pane, layout) {
	const paneConstraintsArray = panesArray.map((paneData) => paneData.constraints);
	const paneIndex = findPaneDataIndex(panesArray, pane);
	const paneConstraints = paneConstraintsArray[paneIndex];
	const pivotIndices = paneIndex === panesArray.length - 1 ? [paneIndex - 1, paneIndex] : [paneIndex, paneIndex + 1];
	const paneSize = layout[paneIndex];
	return {
		...paneConstraints,
		paneSize,
		pivotIndices
	};
}
function findPaneDataIndex(panesArray, pane) {
	return panesArray.findIndex((prevPaneData) => prevPaneData.opts.id.current === pane.opts.id.current);
}
function callPaneCallbacks(panesArray, layout, paneIdToLastNotifiedSizeMap) {
	for (let index = 0; index < layout.length; index++) {
		const size = layout[index];
		const paneData = panesArray[index];
		assert(paneData);
		const { collapsedSize = 0, collapsible } = paneData.constraints;
		const lastNotifiedSize = paneIdToLastNotifiedSizeMap[paneData.opts.id.current];
		if (!(lastNotifiedSize == null || size !== lastNotifiedSize)) continue;
		paneIdToLastNotifiedSizeMap[paneData.opts.id.current] = size;
		const { onCollapse, onExpand, onResize } = paneData.callbacks;
		onResize?.(size, lastNotifiedSize);
		if (collapsible && (onCollapse || onExpand)) {
			if (onExpand && (lastNotifiedSize == null || lastNotifiedSize === collapsedSize) && size !== collapsedSize) onExpand();
			if (onCollapse && (lastNotifiedSize == null || lastNotifiedSize !== collapsedSize) && size === collapsedSize) onCollapse();
		}
	}
}
function getUnsafeDefaultLayout({ panesArray }) {
	const layout = Array(panesArray.length);
	const paneConstraintsArray = panesArray.map((paneData) => paneData.constraints);
	let numPanesWithSizes = 0;
	let remainingSize = 100;
	for (let index = 0; index < panesArray.length; index++) {
		const paneConstraints = paneConstraintsArray[index];
		assert(paneConstraints);
		const { defaultSize } = paneConstraints;
		if (defaultSize != null) {
			numPanesWithSizes++;
			layout[index] = defaultSize;
			remainingSize -= defaultSize;
		}
	}
	for (let index = 0; index < panesArray.length; index++) {
		const paneConstraints = paneConstraintsArray[index];
		assert(paneConstraints);
		const { defaultSize } = paneConstraints;
		if (defaultSize != null) continue;
		const numRemainingPanes = panesArray.length - numPanesWithSizes;
		const size = remainingSize / numRemainingPanes;
		numPanesWithSizes++;
		layout[index] = size;
		remainingSize -= size;
	}
	return layout;
}
function validatePaneGroupLayout({ layout: prevLayout, paneConstraints }) {
	const nextLayout = [...prevLayout];
	const nextLayoutTotalSize = nextLayout.reduce((accumulated, current) => accumulated + current, 0);
	if (nextLayout.length !== paneConstraints.length) throw new Error(`Invalid ${paneConstraints.length} pane layout: ${nextLayout.map((size) => `${size}%`).join(", ")}`);
	else if (!areNumbersAlmostEqual(nextLayoutTotalSize, 100)) for (let index = 0; index < paneConstraints.length; index++) {
		const unsafeSize = nextLayout[index];
		assert(unsafeSize != null);
		nextLayout[index] = 100 / nextLayoutTotalSize * unsafeSize;
	}
	let remainingSize = 0;
	for (let index = 0; index < paneConstraints.length; index++) {
		const unsafeSize = nextLayout[index];
		assert(unsafeSize != null);
		const safeSize = resizePane({
			paneConstraints,
			paneIndex: index,
			initialSize: unsafeSize
		});
		if (unsafeSize !== safeSize) {
			remainingSize += unsafeSize - safeSize;
			nextLayout[index] = safeSize;
		}
	}
	if (!areNumbersAlmostEqual(remainingSize, 0)) for (let index = 0; index < paneConstraints.length; index++) {
		const prevSize = nextLayout[index];
		assert(prevSize != null);
		const unsafeSize = prevSize + remainingSize;
		const safeSize = resizePane({
			paneConstraints,
			paneIndex: index,
			initialSize: unsafeSize
		});
		if (prevSize !== safeSize) {
			remainingSize -= safeSize - prevSize;
			nextLayout[index] = safeSize;
			if (areNumbersAlmostEqual(remainingSize, 0)) break;
		}
	}
	return nextLayout;
}
function getPaneGroupElement(id, domContext) {
	if (!isBrowser) return null;
	const element = domContext.querySelector(`[data-pane-group][data-pane-group-id="${id}"]`);
	if (element) return element;
	return null;
}
function getResizeHandleElement(id, domContext) {
	if (!isBrowser) return null;
	const element = domContext.querySelector(`[data-pane-resizer-id="${id}"]`);
	if (element) return element;
	return null;
}
function getDragOffsetPercentage({ event, dragHandleId, dir, initialDragState, domContext }) {
	const isHorizontal = dir === "horizontal";
	const handleElement = getResizeHandleElement(dragHandleId, domContext);
	assert(handleElement);
	const groupId = handleElement.getAttribute("data-pane-group-id");
	assert(groupId);
	const { initialCursorPosition } = initialDragState;
	const cursorPosition = getResizeEventCursorPosition(dir, event);
	const groupElement = getPaneGroupElement(groupId, domContext);
	assert(groupElement);
	const groupRect = groupElement.getBoundingClientRect();
	const groupSizeInPixels = isHorizontal ? groupRect.width : groupRect.height;
	return (cursorPosition - initialCursorPosition) / groupSizeInPixels * 100;
}
function getDeltaPercentage({ event, dragHandleId, dir, initialDragState, keyboardResizeBy, domContext }) {
	if (isKeyDown(event)) {
		const isHorizontal = dir === "horizontal";
		let delta = 0;
		if (event.shiftKey) delta = 100;
		else if (keyboardResizeBy != null) delta = keyboardResizeBy;
		else delta = 10;
		let movement = 0;
		switch (event.key) {
			case "ArrowDown":
				movement = isHorizontal ? 0 : delta;
				break;
			case "ArrowLeft":
				movement = isHorizontal ? -delta : 0;
				break;
			case "ArrowRight":
				movement = isHorizontal ? delta : 0;
				break;
			case "ArrowUp":
				movement = isHorizontal ? 0 : -delta;
				break;
			case "End":
				movement = 100;
				break;
			case "Home":
				movement = -100;
				break;
		}
		return movement;
	} else {
		if (initialDragState == null) return 0;
		return getDragOffsetPercentage({
			event,
			dragHandleId,
			dir,
			initialDragState,
			domContext
		});
	}
}
function getResizeEventCursorPosition(dir, e) {
	const isHorizontal = dir === "horizontal";
	if (isMouseEvent(e)) return isHorizontal ? e.clientX : e.clientY;
	else if (isTouchEvent(e)) {
		const firstTouch = e.touches[0];
		assert(firstTouch);
		return isHorizontal ? firstTouch.screenX : firstTouch.screenY;
	} else throw new Error(`Unsupported event type "${e.type}"`);
}
function getResizeHandlePaneIds({ groupId, handleId, panesArray, domContext }) {
	const handle = getResizeHandleElement(handleId, domContext);
	const handles = getResizeHandleElementsForGroup(groupId, domContext);
	const index = handle ? handles.indexOf(handle) : -1;
	return [panesArray[index]?.opts.id.current ?? null, panesArray[index + 1]?.opts.id.current ?? null];
}
//#endregion
//#region node_modules/paneforge/node_modules/runed/dist/internal/configurable-globals.js
var defaultWindow = void 0;
//#endregion
//#region node_modules/paneforge/node_modules/runed/dist/internal/utils/dom.js
/**
* Handles getting the active element in a document or shadow root.
* If the active element is within a shadow root, it will traverse the shadow root
* to find the active element.
* If not, it will return the active element in the document.
*
* @param document A document or shadow root to get the active element from.
* @returns The active element in the document or shadow root.
*/
function getActiveElement(document) {
	let activeElement = document.activeElement;
	while (activeElement?.shadowRoot) {
		const node = activeElement.shadowRoot.activeElement;
		if (node === activeElement) break;
		else activeElement = node;
	}
	return activeElement;
}
//#endregion
//#region node_modules/paneforge/node_modules/runed/dist/utilities/active-element/active-element.svelte.js
var ActiveElement = class {
	#document;
	#subscribe;
	constructor(options = {}) {
		const { window = defaultWindow, document = window?.document } = options;
		if (window === void 0) return;
		this.#document = document;
		this.#subscribe = createSubscriber();
	}
	get current() {
		this.#subscribe?.();
		if (!this.#document) return null;
		return getActiveElement(this.#document);
	}
};
new ActiveElement();
//#endregion
//#region node_modules/paneforge/node_modules/runed/dist/utilities/watch/watch.svelte.js
function runWatcher(sources, flush, effect, options = {}) {
	const { lazy = false } = options;
}
function watch(sources, effect, options) {
	runWatcher(sources, "post", effect, options);
}
function watchPre(sources, effect, options) {
	runWatcher(sources, "pre", effect, options);
}
watch.pre = watchPre;
//#endregion
//#region node_modules/paneforge/node_modules/runed/dist/utilities/context/context.js
var Context = class {
	#name;
	#key;
	/**
	* @param name The name of the context.
	* This is used for generating the context key and error messages.
	*/
	constructor(name) {
		this.#name = name;
		this.#key = Symbol(name);
	}
	/**
	* The key used to get and set the context.
	*
	* It is not recommended to use this value directly.
	* Instead, use the methods provided by this class.
	*/
	get key() {
		return this.#key;
	}
	/**
	* Checks whether this has been set in the context of a parent component.
	*
	* Must be called during component initialisation.
	*/
	exists() {
		return hasContext(this.#key);
	}
	/**
	* Retrieves the context that belongs to the closest parent component.
	*
	* Must be called during component initialisation.
	*
	* @throws An error if the context does not exist.
	*/
	get() {
		const context = getContext(this.#key);
		if (context === void 0) throw new Error(`Context "${this.#name}" not found`);
		return context;
	}
	/**
	* Retrieves the context that belongs to the closest parent component,
	* or the given fallback value if the context does not exist.
	*
	* Must be called during component initialisation.
	*/
	getOr(fallback) {
		const context = getContext(this.#key);
		if (context === void 0) return fallback;
		return context;
	}
	/**
	* Associates the given value with the current component and returns it.
	*
	* Must be called during component initialisation.
	*/
	set(context) {
		return setContext(this.#key, context);
	}
};
//#endregion
//#region node_modules/paneforge/dist/internal/utils/adjust-layout.js
/**
* Adjusts the layout of panes based on the delta of the resize handle.
* All units must be in percentages; pixel values should be pre-converted.
*
* Credit: https://github.com/bvaughn/react-resizable-panels
*/
function adjustLayoutByDelta({ delta, layout: prevLayout, paneConstraints: paneConstraintsArray, pivotIndices, trigger }) {
	if (areNumbersAlmostEqual(delta, 0)) return prevLayout;
	const nextLayout = [...prevLayout];
	const [firstPivotIndex, secondPivotIndex] = pivotIndices;
	let deltaApplied = 0;
	if (trigger === "keyboard") {
		{
			const index = delta < 0 ? secondPivotIndex : firstPivotIndex;
			const paneConstraints = paneConstraintsArray[index];
			assert(paneConstraints);
			if (paneConstraints.collapsible) {
				const prevSize = prevLayout[index];
				assert(prevSize != null);
				const paneConstraints = paneConstraintsArray[index];
				assert(paneConstraints);
				const { collapsedSize = 0, minSize = 0 } = paneConstraints;
				if (areNumbersAlmostEqual(prevSize, collapsedSize)) {
					const localDelta = minSize - prevSize;
					if (compareNumbersWithTolerance(localDelta, Math.abs(delta)) > 0) delta = delta < 0 ? 0 - localDelta : localDelta;
				}
			}
		}
		{
			const index = delta < 0 ? firstPivotIndex : secondPivotIndex;
			const paneConstraints = paneConstraintsArray[index];
			assert(paneConstraints);
			const { collapsible } = paneConstraints;
			if (collapsible) {
				const prevSize = prevLayout[index];
				assert(prevSize != null);
				const paneConstraints = paneConstraintsArray[index];
				assert(paneConstraints);
				const { collapsedSize = 0, minSize = 0 } = paneConstraints;
				if (areNumbersAlmostEqual(prevSize, minSize)) {
					const localDelta = prevSize - collapsedSize;
					if (compareNumbersWithTolerance(localDelta, Math.abs(delta)) > 0) delta = delta < 0 ? 0 - localDelta : localDelta;
				}
			}
		}
	}
	{
		const increment = delta < 0 ? 1 : -1;
		let index = delta < 0 ? secondPivotIndex : firstPivotIndex;
		let maxAvailableDelta = 0;
		while (true) {
			const prevSize = prevLayout[index];
			assert(prevSize != null);
			const delta = resizePane({
				paneConstraints: paneConstraintsArray,
				paneIndex: index,
				initialSize: 100
			}) - prevSize;
			maxAvailableDelta += delta;
			index += increment;
			if (index < 0 || index >= paneConstraintsArray.length) break;
		}
		const minAbsDelta = Math.min(Math.abs(delta), Math.abs(maxAvailableDelta));
		delta = delta < 0 ? 0 - minAbsDelta : minAbsDelta;
	}
	{
		let index = delta < 0 ? firstPivotIndex : secondPivotIndex;
		while (index >= 0 && index < paneConstraintsArray.length) {
			const deltaRemaining = Math.abs(delta) - Math.abs(deltaApplied);
			const prevSize = prevLayout[index];
			assert(prevSize != null);
			const unsafeSize = prevSize - deltaRemaining;
			const safeSize = resizePane({
				paneConstraints: paneConstraintsArray,
				paneIndex: index,
				initialSize: unsafeSize
			});
			if (!areNumbersAlmostEqual(prevSize, safeSize)) {
				deltaApplied += prevSize - safeSize;
				nextLayout[index] = safeSize;
				if (deltaApplied.toPrecision(3).localeCompare(Math.abs(delta).toPrecision(3), void 0, { numeric: true }) >= 0) break;
			}
			if (delta < 0) index--;
			else index++;
		}
	}
	if (areNumbersAlmostEqual(deltaApplied, 0)) return prevLayout;
	{
		const pivotIndex = delta < 0 ? secondPivotIndex : firstPivotIndex;
		const prevSize = prevLayout[pivotIndex];
		assert(prevSize != null);
		const unsafeSize = prevSize + deltaApplied;
		const safeSize = resizePane({
			paneConstraints: paneConstraintsArray,
			paneIndex: pivotIndex,
			initialSize: unsafeSize
		});
		nextLayout[pivotIndex] = safeSize;
		if (!areNumbersAlmostEqual(safeSize, unsafeSize)) {
			let deltaRemaining = unsafeSize - safeSize;
			let index = delta < 0 ? secondPivotIndex : firstPivotIndex;
			while (index >= 0 && index < paneConstraintsArray.length) {
				const prevSize = nextLayout[index];
				assert(prevSize != null);
				const unsafeSize = prevSize + deltaRemaining;
				const safeSize = resizePane({
					paneConstraints: paneConstraintsArray,
					paneIndex: index,
					initialSize: unsafeSize
				});
				if (!areNumbersAlmostEqual(prevSize, safeSize)) {
					deltaRemaining -= safeSize - prevSize;
					nextLayout[index] = safeSize;
				}
				if (areNumbersAlmostEqual(deltaRemaining, 0)) break;
				delta > 0 ? index-- : index++;
			}
		}
	}
	if (!areNumbersAlmostEqual(nextLayout.reduce((total, size) => size + total, 0), 100)) return prevLayout;
	return nextLayout;
}
//#endregion
//#region node_modules/paneforge/dist/internal/utils/style.js
var currentState = null;
var element = null;
/**
* Returns the cursor style for a given cursor state.
*/
function getCursorStyle(state) {
	switch (state) {
		case "horizontal": return "ew-resize";
		case "horizontal-max": return "w-resize";
		case "horizontal-min": return "e-resize";
		case "vertical": return "ns-resize";
		case "vertical-max": return "n-resize";
		case "vertical-min": return "s-resize";
	}
}
/**
* Resets the global cursor style to the default.
*/
function resetGlobalCursorStyle() {
	if (element === null) return;
	document.head.removeChild(element);
	currentState = null;
	element = null;
}
/**
* Sets the global cursor style to the given state.
*/
function setGlobalCursorStyle(state, doc) {
	if (currentState === state) return;
	currentState = state;
	const style = getCursorStyle(state);
	if (element === null) {
		element = doc.createElement("style");
		doc.head.appendChild(element);
	}
	element.innerHTML = `*{cursor: ${style}!important;}`;
}
/**
* Computes the flexbox style for a pane given its layout and drag state.
*/
function computePaneFlexBoxStyle({ defaultSize, dragState, layout, panesArray, paneIndex, precision = 3 }) {
	const size = layout[paneIndex];
	let flexGrow;
	if (size == null) flexGrow = defaultSize ?? "1";
	else if (panesArray.length === 1) flexGrow = "1";
	else flexGrow = size.toPrecision(precision);
	return {
		flexBasis: 0,
		flexGrow,
		flexShrink: 1,
		overflow: "hidden",
		pointerEvents: dragState !== null ? "none" : void 0
	};
}
//#endregion
//#region node_modules/paneforge/dist/internal/utils/storage.js
/**
* Initializes the storage object with the appropriate getItem
*  and setItem functions depending on the environment (browser or not).
*/
function initializeStorage(storageObject) {
	try {
		if (typeof localStorage === "undefined") throw new TypeError("localStorage is not supported in this environment");
		storageObject.getItem = (name) => localStorage.getItem(name);
		storageObject.setItem = (name, value) => localStorage.setItem(name, value);
	} catch (err) {
		console.error(err);
		storageObject.getItem = () => null;
		storageObject.setItem = () => {};
	}
}
/**
* Returns the key to use for storing the pane group state in local storage.
*/
function getPaneGroupKey(autoSaveId) {
	return `paneforge:${autoSaveId}`;
}
/**
* Returns a key to use for storing the pane state in local storage.
* The key is based on the pane order and constraints.
*/
function getPaneKey(panes) {
	return panes.map((pane) => {
		return pane.opts.order.current ? `${pane.opts.order.current}:${JSON.stringify(pane.constraints)}` : JSON.stringify(pane.constraints);
	}).sort().join(",");
}
/**
* Loads the serialized pane group state from local storage.
* If the state is not found, returns null.
*/
function loadSerializedPaneGroupState(autoSaveId, storage) {
	try {
		const paneGroupKey = getPaneGroupKey(autoSaveId);
		const serialized = storage.getItem(paneGroupKey);
		const parsed = JSON.parse(serialized || "");
		if (typeof parsed === "object" && parsed !== null) return parsed;
	} catch {}
	return null;
}
/**
* Loads the pane group state from local storage.
* If the state is not found, returns null.
*/
function loadPaneGroupState(autoSaveId, panesArray, storage) {
	return (loadSerializedPaneGroupState(autoSaveId, storage) || {})[getPaneKey(panesArray)] || null;
}
/**
* Saves the pane group state to local storage.
*/
function savePaneGroupState(autoSaveId, panesArray, paneSizesBeforeCollapse, sizes, storage) {
	const paneGroupKey = getPaneGroupKey(autoSaveId);
	const paneKey = getPaneKey(panesArray);
	const state = loadSerializedPaneGroupState(autoSaveId, storage) || {};
	state[paneKey] = {
		expandToSizes: Object.fromEntries(paneSizesBeforeCollapse.entries()),
		layout: sizes
	};
	try {
		storage.setItem(paneGroupKey, JSON.stringify(state));
	} catch (error) {
		console.error(error);
	}
}
var debounceMap = {};
/**
* Returns a debounced version of the given function.
*/
function debounce(callback, durationMs = 10) {
	let timeoutId = null;
	const callable = (...args) => {
		if (timeoutId !== null) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			callback(...args);
		}, durationMs);
	};
	return callable;
}
/**
* Updates the values in local storage based on the current state of
* the pane group.
* This function is debounced to limit the frequency of local storage writes.
*/
function updateStorageValues({ autoSaveId, layout, storage, panesArray, paneSizeBeforeCollapse }) {
	if (layout.length === 0 || layout.length !== panesArray.length) return;
	let debouncedSave = debounceMap[autoSaveId];
	if (debouncedSave == null) {
		debouncedSave = debounce(savePaneGroupState, 100);
		debounceMap[autoSaveId] = debouncedSave;
	}
	const clonedPanesArray = [...panesArray];
	const clonedPaneSizesBeforeCollapse = new Map(paneSizeBeforeCollapse);
	debouncedSave(autoSaveId, clonedPanesArray, clonedPaneSizesBeforeCollapse, layout, storage);
}
//#endregion
//#region node_modules/paneforge/dist/paneforge.svelte.js
var defaultStorage = {
	getItem: (name) => {
		initializeStorage(defaultStorage);
		return defaultStorage.getItem(name);
	},
	setItem: (name, value) => {
		initializeStorage(defaultStorage);
		defaultStorage.setItem(name, value);
	}
};
var PaneGroupContext = new Context("PaneGroup");
var PaneGroupState = class PaneGroupState {
	static create(opts) {
		return PaneGroupContext.set(new PaneGroupState(opts));
	}
	opts;
	attachment;
	domContext;
	dragState = null;
	layout = [];
	panesArray = [];
	panesArrayChanged = false;
	paneIdToLastNotifiedSizeMap = {};
	paneSizeBeforeCollapseMap = /* @__PURE__ */ new Map();
	prevDelta = 0;
	constructor(opts) {
		this.opts = opts;
		this.attachment = attachRef(this.opts.ref);
		this.domContext = new DOMContext(this.opts.ref);
		watch([
			() => this.opts.id.current,
			() => this.layout,
			() => this.panesArray
		], () => {
			return updateResizeHandleAriaValues({
				groupId: this.opts.id.current,
				layout: this.layout,
				panesArray: this.panesArray,
				domContext: this.domContext
			});
		});
		watch([
			() => this.opts.autoSaveId.current,
			() => this.layout,
			() => this.opts.storage.current
		], () => {
			if (!this.opts.autoSaveId.current) return;
			updateStorageValues({
				autoSaveId: this.opts.autoSaveId.current,
				layout: this.layout,
				storage: this.opts.storage.current,
				panesArray: this.panesArray,
				paneSizeBeforeCollapse: this.paneSizeBeforeCollapseMap
			});
		});
		watch(() => this.panesArrayChanged, () => {
			if (!this.panesArrayChanged) return;
			this.panesArrayChanged = false;
			const prevLayout = this.layout;
			let unsafeLayout = null;
			if (this.opts.autoSaveId.current) {
				const state = loadPaneGroupState(this.opts.autoSaveId.current, this.panesArray, this.opts.storage.current);
				if (state) {
					this.paneSizeBeforeCollapseMap = new Map(Object.entries(state.expandToSizes));
					unsafeLayout = state.layout;
				}
			}
			if (unsafeLayout == null) unsafeLayout = getUnsafeDefaultLayout({ panesArray: this.panesArray });
			const nextLayout = validatePaneGroupLayout({
				layout: unsafeLayout,
				paneConstraints: this.panesArray.map((paneData) => paneData.constraints)
			});
			if (areArraysEqual(prevLayout, nextLayout)) return;
			this.layout = nextLayout;
			this.opts.onLayout.current?.(nextLayout);
			callPaneCallbacks(this.panesArray, nextLayout, this.paneIdToLastNotifiedSizeMap);
		});
	}
	setLayout = (newLayout) => {
		this.layout = newLayout;
	};
	registerResizeHandle = (dragHandleId) => {
		return (event) => {
			event.preventDefault();
			const direction = this.opts.direction.current;
			const dragState = this.dragState;
			const groupId = this.opts.id.current;
			const keyboardResizeBy = this.opts.keyboardResizeBy.current;
			const prevLayout = this.layout;
			const paneDataArray = this.panesArray;
			const { initialLayout } = dragState ?? {};
			const doc = this.domContext.getDocument();
			const pivotIndices = getPivotIndices({
				groupId,
				dragHandleId,
				domContext: this.domContext
			});
			let delta = getDeltaPercentage({
				event,
				dragHandleId,
				dir: direction,
				initialDragState: dragState,
				keyboardResizeBy,
				domContext: this.domContext
			});
			if (delta === 0) return;
			const isHorizontal = direction === "horizontal";
			if (doc.dir === "rtl" && isHorizontal) delta = -delta;
			const paneConstraints = paneDataArray.map((paneData) => paneData.constraints);
			const nextLayout = adjustLayoutByDelta({
				delta,
				layout: initialLayout ?? prevLayout,
				paneConstraints,
				pivotIndices,
				trigger: isKeyDown(event) ? "keyboard" : "mouse-or-touch"
			});
			const layoutChanged = !areArraysEqual(prevLayout, nextLayout);
			if (isMouseEvent(event) || isTouchEvent(event)) {
				if (this.prevDelta !== delta) {
					this.prevDelta = delta;
					if (!layoutChanged) if (isHorizontal) setGlobalCursorStyle(delta < 0 ? "horizontal-min" : "horizontal-max", doc);
					else setGlobalCursorStyle(delta < 0 ? "vertical-min" : "vertical-max", doc);
					else setGlobalCursorStyle(isHorizontal ? "horizontal" : "vertical", doc);
				}
			}
			if (layoutChanged) {
				this.setLayout(nextLayout);
				this.opts.onLayout.current?.(nextLayout);
				callPaneCallbacks(paneDataArray, nextLayout, this.paneIdToLastNotifiedSizeMap);
			}
		};
	};
	resizePane = (paneState, unsafePaneSize) => {
		const prevLayout = this.layout;
		const panesArray = this.panesArray;
		const paneConstraintsArr = panesArray.map((paneData) => paneData.constraints);
		const { paneSize, pivotIndices } = paneDataHelper(panesArray, paneState, prevLayout);
		assert(paneSize != null);
		const nextLayout = adjustLayoutByDelta({
			delta: findPaneDataIndex(panesArray, paneState) === panesArray.length - 1 ? paneSize - unsafePaneSize : unsafePaneSize - paneSize,
			layout: prevLayout,
			paneConstraints: paneConstraintsArr,
			pivotIndices,
			trigger: "imperative-api"
		});
		if (areArraysEqual(prevLayout, nextLayout)) return;
		this.setLayout(nextLayout);
		this.opts.onLayout.current?.(nextLayout);
		callPaneCallbacks(panesArray, nextLayout, this.paneIdToLastNotifiedSizeMap);
	};
	startDragging = (dragHandleId, e) => {
		const direction = this.opts.direction.current;
		const layout = this.layout;
		const handleElement = getResizeHandleElement(dragHandleId, this.domContext);
		assert(handleElement);
		const initialCursorPosition = getResizeEventCursorPosition(direction, e);
		this.dragState = {
			dragHandleId,
			dragHandleRect: handleElement.getBoundingClientRect(),
			initialCursorPosition,
			initialLayout: layout
		};
	};
	stopDragging = () => {
		resetGlobalCursorStyle();
		this.dragState = null;
	};
	isPaneCollapsed = (pane) => {
		const paneDataArray = this.panesArray;
		const layout = this.layout;
		const { collapsedSize = 0, collapsible, paneSize } = paneDataHelper(paneDataArray, pane, layout);
		if (typeof paneSize !== "number" || typeof collapsedSize !== "number") return false;
		return collapsible === true && areNumbersAlmostEqual(paneSize, collapsedSize);
	};
	expandPane = (pane) => {
		const prevLayout = this.layout;
		const paneDataArray = this.panesArray;
		if (!pane.constraints.collapsible) return;
		const paneConstraintsArray = paneDataArray.map((paneData) => paneData.constraints);
		const { collapsedSize = 0, paneSize, minSize = 0, pivotIndices } = paneDataHelper(paneDataArray, pane, prevLayout);
		if (paneSize !== collapsedSize) return;
		const prevPaneSize = this.paneSizeBeforeCollapseMap.get(pane.opts.id.current);
		const baseSize = prevPaneSize != null && prevPaneSize >= minSize ? prevPaneSize : minSize;
		const nextLayout = adjustLayoutByDelta({
			delta: findPaneDataIndex(paneDataArray, pane) === paneDataArray.length - 1 ? paneSize - baseSize : baseSize - paneSize,
			layout: prevLayout,
			paneConstraints: paneConstraintsArray,
			pivotIndices,
			trigger: "imperative-api"
		});
		if (areArraysEqual(prevLayout, nextLayout)) return;
		this.setLayout(nextLayout);
		this.opts.onLayout.current?.(nextLayout);
		callPaneCallbacks(paneDataArray, nextLayout, this.paneIdToLastNotifiedSizeMap);
	};
	collapsePane = (pane) => {
		const prevLayout = this.layout;
		const paneDataArray = this.panesArray;
		if (!pane.constraints.collapsible) return;
		const paneConstraintsArray = paneDataArray.map((paneData) => paneData.constraints);
		const { collapsedSize = 0, paneSize, pivotIndices } = paneDataHelper(paneDataArray, pane, prevLayout);
		assert(paneSize != null);
		if (paneSize === collapsedSize) return;
		this.paneSizeBeforeCollapseMap.set(pane.opts.id.current, paneSize);
		const nextLayout = adjustLayoutByDelta({
			delta: findPaneDataIndex(paneDataArray, pane) === paneDataArray.length - 1 ? paneSize - collapsedSize : collapsedSize - paneSize,
			layout: prevLayout,
			paneConstraints: paneConstraintsArray,
			pivotIndices,
			trigger: "imperative-api"
		});
		if (areArraysEqual(prevLayout, nextLayout)) return;
		this.layout = nextLayout;
		this.opts.onLayout.current?.(nextLayout);
		callPaneCallbacks(paneDataArray, nextLayout, this.paneIdToLastNotifiedSizeMap);
	};
	getPaneSize = (pane) => {
		return paneDataHelper(this.panesArray, pane, this.layout).paneSize;
	};
	getPaneStyle = (pane, defaultSize) => {
		const paneDataArray = this.panesArray;
		const layout = this.layout;
		const dragState = this.dragState;
		return computePaneFlexBoxStyle({
			defaultSize,
			dragState,
			layout,
			panesArray: paneDataArray,
			paneIndex: findPaneDataIndex(paneDataArray, pane)
		});
	};
	isPaneExpanded = (pane) => {
		const { collapsedSize = 0, collapsible, paneSize } = paneDataHelper(this.panesArray, pane, this.layout);
		return !collapsible || paneSize > collapsedSize;
	};
	registerPane = (pane) => {
		const newPaneDataArray = [...this.panesArray, pane];
		newPaneDataArray.sort((paneA, paneB) => {
			const orderA = paneA.opts.order.current;
			const orderB = paneB.opts.order.current;
			if (orderA == null && orderB == null) return 0;
			else if (orderA == null) return -1;
			else if (orderB == null) return 1;
			else return orderA - orderB;
		});
		this.panesArray = newPaneDataArray;
		this.panesArrayChanged = true;
		return () => {
			const paneDataArray = [...this.panesArray];
			const index = findPaneDataIndex(this.panesArray, pane);
			if (index < 0) return;
			paneDataArray.splice(index, 1);
			this.panesArray = paneDataArray;
			delete this.paneIdToLastNotifiedSizeMap[pane.opts.id.current];
			this.panesArrayChanged = true;
		};
	};
	#setResizeHandlerEventListeners = () => {
		const groupId = this.opts.id.current;
		const handles = getResizeHandleElementsForGroup(groupId, this.domContext);
		const paneDataArray = this.panesArray;
		const unsubHandlers = handles.map((handle) => {
			const handleId = handle.getAttribute("data-pane-resizer-id");
			if (!handleId) return noop;
			const [idBefore, idAfter] = getResizeHandlePaneIds({
				groupId,
				handleId,
				panesArray: paneDataArray,
				domContext: this.domContext
			});
			if (idBefore == null || idAfter == null) return noop;
			const onKeydown = (e) => {
				if (e.defaultPrevented || e.key !== "Enter") return;
				e.preventDefault();
				const paneDataArray = this.panesArray;
				const index = paneDataArray.findIndex((paneData) => paneData.opts.id.current === idBefore);
				if (index < 0) return;
				const paneData = paneDataArray[index];
				assert(paneData);
				const layout = this.layout;
				const size = layout[index];
				const { collapsedSize = 0, collapsible, minSize = 0 } = paneData.constraints;
				if (!(size != null && collapsible)) return;
				const nextLayout = adjustLayoutByDelta({
					delta: areNumbersAlmostEqual(size, collapsedSize) ? minSize - size : collapsedSize - size,
					layout,
					paneConstraints: paneDataArray.map((paneData) => paneData.constraints),
					pivotIndices: getPivotIndices({
						groupId,
						dragHandleId: handleId,
						domContext: this.domContext
					}),
					trigger: "keyboard"
				});
				if (layout !== nextLayout) this.layout = nextLayout;
			};
			const unsubListener = addEventListener(handle, "keydown", onKeydown);
			return () => {
				unsubListener();
			};
		});
		return () => {
			for (const unsub of unsubHandlers) unsub();
		};
	};
	#props = derived(() => ({
		id: this.opts.id.current,
		"data-pane-group": "",
		"data-direction": this.opts.direction.current,
		"data-pane-group-id": this.opts.id.current,
		style: {
			display: "flex",
			flexDirection: this.opts.direction.current === "horizontal" ? "row" : "column",
			height: "100%",
			overflow: "hidden",
			width: "100%"
		},
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var resizeKeys = [
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"ArrowUp",
	"End",
	"Home"
];
var PaneResizerState = class PaneResizerState {
	static create(opts) {
		return new PaneResizerState(opts, PaneGroupContext.get());
	}
	opts;
	#group;
	attachment;
	domContext;
	#isDragging = derived(() => this.#group.dragState?.dragHandleId === this.opts.id.current);
	#isFocused = false;
	resizeHandler = null;
	constructor(opts, group) {
		this.opts = opts;
		this.#group = group;
		this.attachment = attachRef(this.opts.ref);
		this.domContext = new DOMContext(this.opts.ref);
	}
	#startDragging = (e) => {
		e.preventDefault();
		if (this.opts.disabled.current) return;
		this.#group.startDragging(this.opts.id.current, e);
		this.opts.onDraggingChange.current(true);
	};
	#stopDraggingAndBlur = () => {
		const node = this.opts.ref.current;
		if (!node) return;
		node.blur();
		this.#group.stopDragging();
		this.opts.onDraggingChange.current(false);
	};
	#onkeydown = (e) => {
		if (this.opts.disabled.current || !this.resizeHandler || e.defaultPrevented) return;
		if (resizeKeys.includes(e.key)) {
			e.preventDefault();
			this.resizeHandler(e);
			return;
		}
		if (e.key !== "F6") return;
		e.preventDefault();
		const handles = getResizeHandleElementsForGroup(this.#group.opts.id.current, this.domContext);
		const index = getResizeHandleElementIndex({
			groupId: this.#group.opts.id.current,
			id: this.opts.id.current,
			domContext: this.domContext
		});
		if (index === null) return;
		let nextIndex = 0;
		if (e.shiftKey) if (index > 0) nextIndex = index - 1;
		else nextIndex = handles.length - 1;
		else if (index + 1 < handles.length) nextIndex = index + 1;
		else nextIndex = 0;
		handles[nextIndex].focus();
	};
	#onblur = () => {
		this.#isFocused = false;
	};
	#onfocus = () => {
		this.#isFocused = true;
	};
	#onmousedown = (e) => {
		this.#startDragging(e);
	};
	#onmouseup = () => {
		this.#stopDraggingAndBlur();
	};
	#ontouchcancel = () => {
		this.#stopDraggingAndBlur();
	};
	#ontouchend = () => {
		this.#stopDraggingAndBlur();
	};
	#ontouchstart = (e) => {
		this.#startDragging(e);
	};
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "separator",
		"data-direction": this.#group.opts.direction.current,
		"data-pane-group-id": this.#group.opts.id.current,
		"data-active": this.#isDragging() ? "pointer" : this.#isFocused ? "keyboard" : void 0,
		"data-enabled": !this.opts.disabled.current,
		"data-pane-resizer-id": this.opts.id.current,
		"data-pane-resizer": "",
		tabIndex: this.opts.tabIndex.current,
		style: {
			cursor: getCursorStyle(this.#group.opts.direction.current),
			touchAction: "none",
			userSelect: "none",
			"-webkit-user-select": "none",
			"-webkit-touch-callout": "none"
		},
		onkeydown: this.#onkeydown,
		onblur: this.#onblur,
		onfocus: this.#onfocus,
		onmousedown: this.#onmousedown,
		onmouseup: this.#onmouseup,
		ontouchcancel: this.#ontouchcancel,
		ontouchend: this.#ontouchend,
		ontouchstart: this.#ontouchstart,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var PaneState = class PaneState {
	static create(opts) {
		return new PaneState(opts, PaneGroupContext.get());
	}
	opts;
	group;
	attachment;
	domContext;
	#paneTransitionState = "";
	#callbacks = derived(() => ({
		onCollapse: this.opts.onCollapse.current,
		onExpand: this.opts.onExpand.current,
		onResize: this.opts.onResize.current
	}));
	get callbacks() {
		return this.#callbacks();
	}
	set callbacks($$value) {
		return this.#callbacks($$value);
	}
	#constraints = derived(() => ({
		collapsedSize: this.opts.collapsedSize.current,
		collapsible: this.opts.collapsible.current,
		defaultSize: this.opts.defaultSize.current,
		maxSize: this.opts.maxSize.current,
		minSize: this.opts.minSize.current
	}));
	get constraints() {
		return this.#constraints();
	}
	set constraints($$value) {
		return this.#constraints($$value);
	}
	#handleTransition = (state) => {
		this.#paneTransitionState = state;
		afterTick(() => {
			if (this.opts.ref.current) {
				const element = this.opts.ref.current;
				if (!(getComputedStyle(element).transitionDuration !== "0s")) {
					this.#paneTransitionState = "";
					return;
				}
				const handleTransitionEnd = (event) => {
					if (event.propertyName === "flex-grow") {
						this.#paneTransitionState = "";
						element.removeEventListener("transitionend", handleTransitionEnd);
					}
				};
				element.addEventListener("transitionend", handleTransitionEnd);
			} else this.#paneTransitionState = "";
		});
	};
	pane = {
		collapse: () => {
			this.#handleTransition("collapsing");
			this.group.collapsePane(this);
		},
		expand: () => {
			this.#handleTransition("expanding");
			this.group.expandPane(this);
		},
		getSize: () => this.group.getPaneSize(this),
		isCollapsed: () => this.group.isPaneCollapsed(this),
		isExpanded: () => this.group.isPaneExpanded(this),
		resize: (size) => this.group.resizePane(this, size),
		getId: () => this.opts.id.current
	};
	constructor(opts, group) {
		this.opts = opts;
		this.group = group;
		this.attachment = attachRef(this.opts.ref);
		this.domContext = new DOMContext(this.opts.ref);
		watch(() => snapshot(this.constraints), () => {
			this.group.panesArrayChanged = true;
		});
	}
	#isCollapsed = derived(() => this.group.isPaneCollapsed(this));
	#paneState = derived(() => this.#paneTransitionState !== "" ? this.#paneTransitionState : this.#isCollapsed() ? "collapsed" : "expanded");
	#props = derived(() => ({
		id: this.opts.id.current,
		style: this.group.getPaneStyle(this, this.opts.defaultSize.current),
		"data-pane": "",
		"data-pane-id": this.opts.id.current,
		"data-pane-group-id": this.group.opts.id.current,
		"data-collapsed": this.#isCollapsed() ? "" : void 0,
		"data-expanded": this.#isCollapsed() ? void 0 : "",
		"data-pane-state": this.#paneState(),
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
//#endregion
//#region node_modules/paneforge/dist/components/pane-group.svelte
function Pane_group($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { autoSaveId = null, direction, id = uid, keyboardResizeBy = null, onLayoutChange = noop, storage = defaultStorage, ref = null, child, children, $$slots, $$events, ...restProps } = $$props;
		const paneGroupState = PaneGroupState.create({
			id: box.with(() => id ?? uid),
			ref: box.with(() => ref, (v) => ref = v),
			autoSaveId: box.with(() => autoSaveId),
			direction: box.with(() => direction),
			keyboardResizeBy: box.with(() => keyboardResizeBy),
			onLayout: box.with(() => onLayoutChange),
			storage: box.with(() => storage)
		});
		const getLayout = () => paneGroupState.layout;
		const setLayout = paneGroupState.setLayout;
		const getId = () => paneGroupState.opts.id.current;
		const mergedProps = derived(() => mergeProps(restProps, paneGroupState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, {
			ref,
			getLayout,
			setLayout,
			getId
		});
	});
}
//#endregion
//#region node_modules/paneforge/dist/components/pane.svelte
function Pane($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = uid, ref = null, collapsedSize, collapsible, defaultSize, maxSize, minSize, onCollapse = noop, onExpand = noop, onResize = noop, order, child, children, $$slots, $$events, ...restProps } = $$props;
		const paneState = PaneState.create({
			id: box.with(() => id),
			ref: box.with(() => ref, (v) => ref = v),
			collapsedSize: box.with(() => collapsedSize),
			collapsible: box.with(() => collapsible),
			defaultSize: box.with(() => defaultSize),
			maxSize: box.with(() => maxSize),
			minSize: box.with(() => minSize),
			onCollapse: box.with(() => onCollapse),
			onExpand: box.with(() => onExpand),
			onResize: box.with(() => onResize),
			order: box.with(() => order)
		});
		const collapse = paneState.pane.collapse;
		const expand = paneState.pane.expand;
		const getSize = paneState.pane.getSize;
		const isCollapsed = paneState.pane.isCollapsed;
		const isExpanded = paneState.pane.isExpanded;
		const resize = paneState.pane.resize;
		const getId = paneState.pane.getId;
		const mergedProps = derived(() => mergeProps(restProps, paneState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, {
			ref,
			collapse,
			expand,
			getSize,
			isCollapsed,
			isExpanded,
			resize,
			getId
		});
	});
}
//#endregion
//#region node_modules/paneforge/dist/components/pane-resizer.svelte
function Pane_resizer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = uid, ref = null, disabled = false, onDraggingChange = noop, tabindex = 0, child, children, $$slots, $$events, ...restProps } = $$props;
		const resizerState = PaneResizerState.create({
			id: box.with(() => id),
			ref: box.with(() => ref, (v) => ref = v),
			disabled: box.with(() => disabled),
			onDraggingChange: box.with(() => onDraggingChange),
			tabIndex: box.with(() => tabindex)
		});
		const mergedProps = derived(() => mergeProps(restProps, resizerState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/resizable/resizable-handle.svelte
function Resizable_handle($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, withHandle = false, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Pane_resizer) {
				$$renderer.push("<!--[-->");
				Pane_resizer($$renderer, spread_props([
					{
						"data-slot": "resizable-handle",
						class: cn("cn-resizable-handle bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[direction=vertical]:h-px data-[direction=vertical]:w-full data-[direction=vertical]:after:left-0 data-[direction=vertical]:after:h-1 data-[direction=vertical]:after:w-full data-[direction=vertical]:after:translate-x-0 data-[direction=vertical]:after:-translate-y-1/2 [&[data-direction=vertical]>div]:rotate-90", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						},
						children: ($$renderer) => {
							if (withHandle) {
								$$renderer.push("<!--[0-->");
								$$renderer.push(`<div class="bg-border h-6 w-1 rounded-lg z-10 flex shrink-0"></div>`);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]-->`);
						},
						$$slots: { default: true }
					}
				]));
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
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/resizable/resizable-pane-group.svelte
function Resizable_pane_group($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, this: paneGroup = void 0, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Pane_group) {
				$$renderer.push("<!--[-->");
				Pane_group($$renderer, spread_props([
					{
						"data-slot": "resizable-pane-group",
						class: cn("cn-resizable-panel-group flex h-full w-full data-[direction=vertical]:flex-col", className)
					},
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						}
					}
				]));
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
		bind_props($$props, {
			ref,
			this: paneGroup
		});
	});
}
//#endregion
//#region src/lib/components/Table/data-table.svelte
function Data_table($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, columns, search = true, class: className = "", fileName = "File", selected = void 0 } = $$props;
		let pagination = {
			pageIndex: 0,
			pageSize: data.length
		};
		let columnFilters = [];
		let sorting = [];
		let globalFilter = void 0;
		let columnVisibility = {};
		let rowSelection = {};
		const table = createSvelteTable({
			get data() {
				return data;
			},
			columns,
			state: {
				get pagination() {
					return pagination;
				},
				get sorting() {
					return sorting;
				},
				get columnFilters() {
					return columnFilters;
				},
				get columnVisibility() {
					return columnVisibility;
				},
				get globalFilter() {
					return globalFilter;
				},
				get rowSelection() {
					return rowSelection;
				}
			},
			onPaginationChange: (updater) => {
				if (typeof updater === "function") pagination = updater(pagination);
				else pagination = updater;
			},
			onSortingChange: (updater) => {
				if (typeof updater === "function") sorting = updater(sorting);
				else sorting = updater;
			},
			onColumnFiltersChange: (updater) => {
				if (typeof updater === "function") columnFilters = updater(columnFilters);
				else columnFilters = updater;
			},
			onColumnVisibilityChange: (updater) => {
				if (typeof updater === "function") columnVisibility = updater(columnVisibility);
				else columnVisibility = updater;
			},
			onRowSelectionChange: (updater) => {
				if (typeof updater === "function") rowSelection = updater(rowSelection);
				else rowSelection = updater;
			},
			getCoreRowModel: getCoreRowModel(),
			getPaginationRowModel: getPaginationRowModel(),
			getSortedRowModel: getSortedRowModel(),
			getFilteredRowModel: getFilteredRowModel()
		});
		const uniqueTableId = `table-${Math.random().toString(36).substring(2, 15)}`;
		function getTableBreakpoints(data) {
			const totalItems = data.length;
			const step = 10;
			const breakpoints = [];
			for (let i = step; i < totalItems; i += step) breakpoints.push(i);
			if (totalItems > 0) breakpoints.push(totalItems);
			return breakpoints;
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Resizable_pane_group) {
				$$renderer.push("<!--[-->");
				Resizable_pane_group($$renderer, {
					direction: "horizontal",
					class: `mt-4 flex gap-0 rounded-lg lg:w-fit lg:min-w-2xl ${stringify$1(className)}`,
					children: ($$renderer) => {
						if (Pane) {
							$$renderer.push("<!--[-->");
							Pane($$renderer, {
								defaultSize: isMobile() ? 100 : table.getAllColumns().filter((col) => col.getIsVisible()).length * 20,
								class: "bg-background",
								children: ($$renderer) => {
									Scroll_area($$renderer, {
										orientation: "both",
										class: "w-full rounded-lg p-2",
										children: ($$renderer) => {
											$$renderer.push(`<div class="flex min-w-full flex-col gap-2 rounded-md border-0 px-1">`);
											if (search) {
												$$renderer.push("<!--[0-->");
												Scroll_area($$renderer, {
													orientation: "horizontal",
													class: "flex flex-row items-start justify-start rounded-md border",
													children: ($$renderer) => {
														$$renderer.push(`<div class="flex max-w-4xl flex-row items-start justify-start gap-2 p-4">`);
														Input($$renderer, {
															type: "search",
															placeholder: "Search Table...",
															class: "w-64 lg:w-xl",
															oninput: () => table.setGlobalFilter(globalFilter),
															get value() {
																return globalFilter;
															},
															set value($$value) {
																globalFilter = $$value;
																$$settled = false;
															}
														});
														$$renderer.push(`<!----> `);
														if (Dropdown_menu) {
															$$renderer.push("<!--[-->");
															Dropdown_menu($$renderer, {
																children: ($$renderer) => {
																	{
																		function child($$renderer, { props }) {
																			Button($$renderer, spread_props([props, {
																				variant: "outline",
																				class: "ml-auto",
																				children: ($$renderer) => {
																					$$renderer.push(`<!---->Columns `);
																					Chevron_down($$renderer, { class: "size-5" });
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
																			align: "end",
																			children: ($$renderer) => {
																				$$renderer.push(`<!--[-->`);
																				const each_array = ensure_array_like(table.getAllColumns().filter((col) => col.getCanHide()));
																				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
																					let column = each_array[$$index];
																					var bind_get = () => column.getIsVisible();
																					var bind_set = (v) => column.toggleVisibility(!!v);
																					if (Dropdown_menu_checkbox_item) {
																						$$renderer.push("<!--[-->");
																						Dropdown_menu_checkbox_item($$renderer, {
																							class: "capitalize",
																							get checked() {
																								return bind_get();
																							},
																							set checked($$value) {
																								bind_set($$value);
																							},
																							children: ($$renderer) => {
																								$$renderer.push(`<!---->${escape_html(column.id.replace(/([a-z])([A-Z])/g, "$1 $2"))}`);
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
														$$renderer.push(` `);
														if (Dropdown_menu) {
															$$renderer.push("<!--[-->");
															Dropdown_menu($$renderer, {
																children: ($$renderer) => {
																	{
																		function child($$renderer, { props }) {
																			Button($$renderer, spread_props([props, {
																				variant: "outline",
																				class: "ml-auto",
																				children: ($$renderer) => {
																					$$renderer.push(`<!---->Pages `);
																					Chevron_down($$renderer, { class: "size-5" });
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
																			align: "center",
																			class: "flex w-4! flex-col",
																			children: ($$renderer) => {
																				$$renderer.push(`<!--[-->`);
																				const each_array_1 = ensure_array_like(getTableBreakpoints(data));
																				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
																					let column = each_array_1[$$index_1];
																					{
																						function child($$renderer, { props }) {
																							Button($$renderer, spread_props([props, {
																								variant: pagination.pageSize === column ? "default" : "ghost",
																								size: "icon",
																								class: "max-w-16",
																								children: ($$renderer) => {
																									$$renderer.push(`<!---->${escape_html(column)}`);
																								},
																								$$slots: { default: true }
																							}]));
																						}
																						if (Dropdown_menu_item) {
																							$$renderer.push("<!--[-->");
																							Dropdown_menu_item($$renderer, {
																								class: "w-4! capitalize",
																								onclick: () => {
																									table.setPageSize(column);
																								},
																								child,
																								$$slots: { child: true }
																							});
																							$$renderer.push("<!--]-->");
																						} else {
																							$$renderer.push("<!--[!-->");
																							$$renderer.push("<!--]-->");
																						}
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
														$$renderer.push(` `);
														Pdf($$renderer, {
															fileName,
															table
														});
														$$renderer.push(`<!----> `);
														Button($$renderer, {
															variant: "outline",
															children: ($$renderer) => {
																List_ordered($$renderer, {});
																$$renderer.push(`<!----> ${escape_html(table.getFilteredRowModel().rows.length)} Results`);
															},
															$$slots: { default: true }
														});
														$$renderer.push(`<!----></div>`);
													},
													$$slots: { default: true }
												});
											} else $$renderer.push("<!--[-1-->");
											$$renderer.push(`<!--]--> <div class="rounded-md border">`);
											if (Table) {
												$$renderer.push("<!--[-->");
												Table($$renderer, {
													id: uniqueTableId,
													class: "relative overflow-x-auto",
													children: ($$renderer) => {
														if (Table_header) {
															$$renderer.push("<!--[-->");
															Table_header($$renderer, {
																children: ($$renderer) => {
																	$$renderer.push(`<!--[-->`);
																	const each_array_2 = ensure_array_like(table.getHeaderGroups());
																	for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
																		let headerGroup = each_array_2[$$index_3];
																		if (Table_row) {
																			$$renderer.push("<!--[-->");
																			Table_row($$renderer, {
																				children: ($$renderer) => {
																					$$renderer.push(`<!--[-->`);
																					const each_array_3 = ensure_array_like(headerGroup.headers);
																					for (let index = 0, $$length = each_array_3.length; index < $$length; index++) {
																						let header = each_array_3[index];
																						if (Table_head) {
																							$$renderer.push("<!--[-->");
																							Table_head($$renderer, {
																								colspan: header.colSpan,
																								children: ($$renderer) => {
																									if (!header.isPlaceholder) {
																										$$renderer.push("<!--[0-->");
																										Flex_render($$renderer, {
																											content: header.column.columnDef.header,
																											context: header.getContext()
																										});
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
														$$renderer.push(` `);
														if (Table_body) {
															$$renderer.push("<!--[-->");
															Table_body($$renderer, {
																children: ($$renderer) => {
																	const each_array_4 = ensure_array_like(table.getRowModel().rows);
																	if (each_array_4.length !== 0) {
																		$$renderer.push("<!--[-->");
																		for (let $$index_5 = 0, $$length = each_array_4.length; $$index_5 < $$length; $$index_5++) {
																			let row = each_array_4[$$index_5];
																			if (Table_row) {
																				$$renderer.push("<!--[-->");
																				Table_row($$renderer, {
																					"data-state": row.getIsSelected() && "selected",
																					children: ($$renderer) => {
																						$$renderer.push(`<!--[-->`);
																						const each_array_5 = ensure_array_like(row.getVisibleCells());
																						for (let index = 0, $$length = each_array_5.length; index < $$length; index++) {
																							let cell = each_array_5[index];
																							if (Table_cell) {
																								$$renderer.push("<!--[-->");
																								Table_cell($$renderer, {
																									children: ($$renderer) => {
																										Flex_render($$renderer, {
																											content: cell.column.columnDef.cell,
																											context: cell.getContext()
																										});
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
																		}
																	} else {
																		$$renderer.push("<!--[!-->");
																		if (Table_row) {
																			$$renderer.push("<!--[-->");
																			Table_row($$renderer, {
																				children: ($$renderer) => {
																					if (Table_cell) {
																						$$renderer.push("<!--[-->");
																						Table_cell($$renderer, {
																							colspan: columns.length,
																							class: "text-center font-2xl",
																							children: ($$renderer) => {
																								$$renderer.push(`<div class="flex flex-row items-center justify-center gap-2">`);
																								Frown($$renderer, { class: "animate-bounce" });
																								$$renderer.push(`<!----> Nothing found here.</div>`);
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
											if (table.getPageCount() > 1) {
												$$renderer.push("<!--[0-->");
												$$renderer.push(`<div class="absolute -bottom-5 flex w-full items-end justify-end space-x-2 justify-self-center py-4">`);
												Button($$renderer, {
													variant: "outline",
													size: "sm",
													onclick: () => table.previousPage(),
													disabled: !table.getCanPreviousPage(),
													children: ($$renderer) => {
														$$renderer.push(`<!---->Previous`);
													},
													$$slots: { default: true }
												});
												$$renderer.push(`<!----> `);
												Button($$renderer, {
													variant: "outline",
													size: "sm",
													onclick: () => table.nextPage(),
													disabled: !table.getCanNextPage(),
													children: ($$renderer) => {
														$$renderer.push(`<!---->Next`);
													},
													$$slots: { default: true }
												});
												$$renderer.push(`<!----></div>`);
											} else $$renderer.push("<!--[-1-->");
											$$renderer.push(`<!--]--></div></div>`);
										},
										$$slots: { default: true }
									});
								},
								$$slots: { default: true }
							});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
						$$renderer.push(` `);
						Resizable_handle($$renderer, { withHandle: true });
						$$renderer.push(`<!----> `);
						if (isMobile()) {
							$$renderer.push("<!--[0-->");
							if (Pane) {
								$$renderer.push("<!--[-->");
								Pane($$renderer, { defaultSize: 0 });
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
						} else {
							$$renderer.push("<!--[-1-->");
							if (Pane) {
								$$renderer.push("<!--[-->");
								Pane($$renderer, {});
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
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, { selected });
	});
}
//#endregion
//#region src/lib/components/Table/data-table-sort.svelte
function Data_table_sort($$renderer, $$props) {
	let { variant = "ghost", name, $$slots, $$events, ...restProps } = $$props;
	Button($$renderer, spread_props([
		{
			variant,
			class: "text-center!"
		},
		restProps,
		{
			children: ($$renderer) => {
				$$renderer.push(`<!---->${escape_html(name)} `);
				Arrow_up_down($$renderer, { class: "" });
				$$renderer.push(`<!---->`);
			},
			$$slots: { default: true }
		}
	]));
}

export { Data_table as D, Frown as F, List_ordered as L, Data_table_sort as a, renderComponent as r };
//# sourceMappingURL=data-table-sort.js-5j19d0fG.js.map
