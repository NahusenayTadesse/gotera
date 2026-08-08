import { a6 as spread_props, a2 as attributes, a3 as clsx$1, a9 as escape_html, a7 as bind_props, a8 as props_id, ad as snapshot, T as derived, $ as attr } from './server.js-CPNQ0GBv.js';
import { n as noop, C as Context, r as afterTick, s as getFirstNonCommentChild, t as ENTER, H as HOME, v as ARROW_LEFT, x as ARROW_UP, y as ARROW_RIGHT, z as ARROW_DOWN, w as watch, B as afterSleep, u as useId } from './scroll-lock.js-DAwGTwcu.js';
import { I as Icon } from './Icon.js-C-2f-rrd.js';
import { C as Check } from './minus.js-ESxlDJzH.js';
import './dialog.js-BhMsigOw.js';
import { c as createBitsAttrs, v as createId, b as boxWith, a as attachRef, n as mergeProps, e as boolToStr, d as boolToEmptyStrOrUndef } from './create-id.js-DpR0oe6q.js';
import { s as srOnlyStyles } from './sr-only-styles.js-P-cDEe1k.js';
import { c as cn } from './utils2.js-BChetszu.js';
import { t as tv } from './button.js-DMlVoc1I.js';

//#region node_modules/@lucide/svelte/dist/icons/search.svelte
function Search($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "search" },
		props,
		{ iconNode: [["path", { "d": "m21 21-4.34-4.34" }], ["circle", {
			"cx": "11",
			"cy": "11",
			"r": "8"
		}]] }
	]));
}
//#endregion
//#region node_modules/bits-ui/dist/bits/command/utils.js
function findNextSibling(el, selector) {
	let sibling = el.nextElementSibling;
	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.nextElementSibling;
	}
}
function findPreviousSibling(el, selector) {
	let sibling = el.previousElementSibling;
	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.previousElementSibling;
	}
}
//#endregion
//#region node_modules/bits-ui/dist/internal/css-escape.js
/**
* https://github.com/mathiasbynens/CSS.escape
*
* @param value - The value to escape for use as a CSS identifier
* @returns The escaped CSS identifier string
*/
function cssEscape(value) {
	if (typeof CSS !== "undefined" && typeof CSS.escape === "function") return CSS.escape(value);
	const length = value.length;
	let index = -1;
	let codeUnit;
	let result = "";
	const firstCodeUnit = value.charCodeAt(0);
	if (length === 1 && firstCodeUnit === 45) return "\\" + value;
	while (++index < length) {
		codeUnit = value.charCodeAt(index);
		if (codeUnit === 0) {
			result += "�";
			continue;
		}
		if (codeUnit >= 1 && codeUnit <= 31 || codeUnit === 127 || index === 0 && codeUnit >= 48 && codeUnit <= 57 || index === 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit === 45) {
			result += "\\" + codeUnit.toString(16) + " ";
			continue;
		}
		if (codeUnit >= 128 || codeUnit === 45 || codeUnit === 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
			result += value.charAt(index);
			continue;
		}
		result += "\\" + value.charAt(index);
	}
	return result;
}
//#endregion
//#region node_modules/bits-ui/dist/bits/command/command.svelte.js
var COMMAND_VALUE_ATTR = "data-value";
var commandAttrs = createBitsAttrs({
	component: "command",
	parts: [
		"root",
		"list",
		"input",
		"separator",
		"loading",
		"empty",
		"group",
		"group-items",
		"group-heading",
		"item",
		"viewport",
		"input-label"
	]
});
var COMMAND_GROUP_SELECTOR = commandAttrs.selector("group");
var COMMAND_GROUP_ITEMS_SELECTOR = commandAttrs.selector("group-items");
var COMMAND_GROUP_HEADING_SELECTOR = commandAttrs.selector("group-heading");
var COMMAND_ITEM_SELECTOR = commandAttrs.selector("item");
var COMMAND_VALID_ITEM_SELECTOR = `${commandAttrs.selector("item")}:not([aria-disabled="true"])`;
var CommandRootContext = new Context("Command.Root");
var CommandListContext = new Context("Command.List");
var CommandGroupContainerContext = new Context("Command.Group");
var defaultState = {
	search: "",
	value: "",
	filtered: {
		count: 0,
		items: /* @__PURE__ */ new Map(),
		groups: /* @__PURE__ */ new Set()
	}
};
var CommandRootState = class CommandRootState {
	static create(opts) {
		return CommandRootContext.set(new CommandRootState(opts));
	}
	opts;
	attachment;
	#updateScheduled = false;
	#isInitialMount = true;
	sortAfterTick = false;
	sortAndFilterAfterTick = false;
	allItems = /* @__PURE__ */ new Set();
	allGroups = /* @__PURE__ */ new Map();
	allIds = /* @__PURE__ */ new Map();
	key = 0;
	viewportNode = null;
	inputNode = null;
	labelNode = null;
	commandState = defaultState;
	_commandState = defaultState;
	#snapshot() {
		return snapshot(this._commandState);
	}
	#scheduleUpdate() {
		if (this.#updateScheduled) return;
		this.#updateScheduled = true;
		afterTick(() => {
			this.#updateScheduled = false;
			const currentState = this.#snapshot();
			if (!Object.is(this.commandState, currentState)) {
				this.commandState = currentState;
				this.opts.onStateChange?.current?.(currentState);
			}
		});
	}
	setState(key, value, preventScroll) {
		if (Object.is(this._commandState[key], value)) return;
		this._commandState[key] = value;
		if (key === "search") {
			this.#filterItems();
			this.#sort();
		} else if (key === "value") {
			if (!preventScroll) this.#scrollSelectedIntoView();
		}
		this.#scheduleUpdate();
	}
	constructor(opts) {
		this.opts = opts;
		this.attachment = attachRef(this.opts.ref);
		const defaults = {
			...this._commandState,
			value: this.opts.value.current ?? ""
		};
		this._commandState = defaults;
		this.commandState = defaults;
		this.onkeydown = this.onkeydown.bind(this);
	}
	/**
	* Calculates score for an item based on search text and keywords.
	* Higher score = better match.
	*
	* @param value - Item's display text
	* @param keywords - Optional keywords to boost scoring
	* @returns Score from 0-1, where 0 = no match
	*/
	#score(value, keywords) {
		const filter = this.opts.filter.current ?? computeCommandScore;
		return value ? filter(value, this._commandState.search, keywords) : 0;
	}
	/**
	* Sorts items and groups based on search scores.
	* Groups are sorted by their highest scoring item.
	* When no search active, selects first item.
	*/
	#sort() {
		if (!this._commandState.search || this.opts.shouldFilter.current === false) {
			if (!this._commandState.value || !this.#isInitialMount) this.#selectFirstItem();
			else if (this.#isInitialMount && this._commandState.value) this.#scrollInitialValue();
			return;
		}
		const scores = this._commandState.filtered.items;
		const groups = [];
		for (const value of this._commandState.filtered.groups) {
			const items = this.allGroups.get(value);
			let max = 0;
			if (!items) {
				groups.push([value, max]);
				continue;
			}
			for (const item of items) {
				const score = scores.get(item);
				max = Math.max(score ?? 0, max);
			}
			groups.push([value, max]);
		}
		const listInsertionElement = this.viewportNode;
		const sorted = this.getValidItems().sort((a, b) => {
			const valueA = a.getAttribute("data-value");
			const valueB = b.getAttribute("data-value");
			const scoresA = scores.get(valueA) ?? 0;
			return (scores.get(valueB) ?? 0) - scoresA;
		});
		for (const item of sorted) {
			const group = item.closest(COMMAND_GROUP_ITEMS_SELECTOR);
			if (group) {
				const itemToAppend = item.parentElement === group ? item : item.closest(`${COMMAND_GROUP_ITEMS_SELECTOR} > *`);
				if (itemToAppend) group.appendChild(itemToAppend);
			} else {
				const itemToAppend = item.parentElement === listInsertionElement ? item : item.closest(`${COMMAND_GROUP_ITEMS_SELECTOR} > *`);
				if (itemToAppend) listInsertionElement?.appendChild(itemToAppend);
			}
		}
		const sortedGroups = groups.sort((a, b) => b[1] - a[1]);
		for (const group of sortedGroups) {
			const element = listInsertionElement?.querySelector(`${COMMAND_GROUP_SELECTOR}[${COMMAND_VALUE_ATTR}="${cssEscape(group[0])}"]`);
			element?.parentElement?.appendChild(element);
		}
		this.#selectFirstItem();
	}
	/**
	* Sets current value and triggers re-render if cleared.
	*
	* @param value - New value to set
	*/
	setValue(value, opts) {
		if (value !== this.opts.value.current && value === "") afterTick(() => {
			this.key++;
		});
		this.setState("value", value, opts);
		this.opts.value.current = value;
	}
	/**
	* Selects first non-disabled item on next tick.
	*/
	#selectFirstItem() {
		afterTick(() => {
			const value = this.getValidItems().find((item) => item.getAttribute("aria-disabled") !== "true")?.getAttribute(COMMAND_VALUE_ATTR);
			const shouldPreventScroll = this.#isInitialMount && this.opts.disableInitialScroll.current;
			this.setValue(value ?? "", shouldPreventScroll);
			this.#isInitialMount = false;
		});
	}
	/**
	* Scrolls the initial value into view if it exists and is not the first item.
	* Called during initial mount when a value is provided.
	*/
	#scrollInitialValue() {
		afterTick(() => {
			if (!this.opts.disableInitialScroll.current) this.#scrollSelectedIntoView();
			this.#isInitialMount = false;
		});
	}
	/**
	* Updates filtered items/groups based on search.
	* Recalculates scores and filtered count.
	*/
	#filterItems() {
		if (!this._commandState.search || this.opts.shouldFilter.current === false) {
			this._commandState.filtered.count = this.allItems.size;
			return;
		}
		this._commandState.filtered.groups = /* @__PURE__ */ new Set();
		let itemCount = 0;
		for (const id of this.allItems) {
			const value = this.allIds.get(id)?.value ?? "";
			const keywords = this.allIds.get(id)?.keywords ?? [];
			const rank = this.#score(value, keywords);
			this._commandState.filtered.items.set(id, rank);
			if (rank > 0) itemCount++;
		}
		for (const [groupId, group] of this.allGroups) for (const itemId of group) {
			const currItem = this._commandState.filtered.items.get(itemId);
			if (currItem && currItem > 0) {
				this._commandState.filtered.groups.add(groupId);
				break;
			}
		}
		this._commandState.filtered.count = itemCount;
	}
	/**
	* Gets all non-disabled, visible command items.
	*
	* @returns Array of valid item elements
	* @remarks Exposed for direct item access and bound checking
	*/
	getValidItems() {
		const node = this.opts.ref.current;
		if (!node) return [];
		return Array.from(node.querySelectorAll(COMMAND_VALID_ITEM_SELECTOR)).filter((el) => !!el);
	}
	/**
	* Gets all visible command items.
	*
	* @returns Array of valid item elements
	* @remarks Exposed for direct item access and bound checking
	*/
	getVisibleItems() {
		const node = this.opts.ref.current;
		if (!node) return [];
		return Array.from(node.querySelectorAll(COMMAND_ITEM_SELECTOR)).filter((el) => !!el);
	}
	/** Returns all visible items in a matrix structure
	*
	* @remarks Returns empty if the command isn't configured as a grid
	*
	* @returns
	*/
	get itemsGrid() {
		if (!this.isGrid) return [];
		const columns = this.opts.columns.current ?? 1;
		const items = this.getVisibleItems();
		const grid = [[]];
		let currentGroup = items[0]?.getAttribute("data-group");
		let column = 0;
		let row = 0;
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			const itemGroup = item?.getAttribute("data-group");
			if (currentGroup !== itemGroup) {
				currentGroup = itemGroup;
				column = 1;
				row++;
				grid.push([{
					index: i,
					firstRowOfGroup: true,
					ref: item
				}]);
			} else {
				column++;
				if (column > columns) {
					row++;
					column = 1;
					grid.push([]);
				}
				grid[row]?.push({
					index: i,
					firstRowOfGroup: grid[row]?.[0]?.firstRowOfGroup ?? i === 0,
					ref: item
				});
			}
		}
		return grid;
	}
	/**
	* Gets currently selected command item.
	*
	* @returns Selected element or undefined
	*/
	#getSelectedItem() {
		const node = this.opts.ref.current;
		if (!node) return;
		const selectedNode = node.querySelector(`${COMMAND_VALID_ITEM_SELECTOR}[data-selected]`);
		if (!selectedNode) return;
		return selectedNode;
	}
	/**
	* Scrolls selected item into view.
	* Special handling for first items in groups.
	*/
	#scrollSelectedIntoView() {
		afterTick(() => {
			const item = this.#getSelectedItem();
			if (!item) return;
			const grandparent = item.parentElement?.parentElement;
			if (!grandparent) return;
			if (this.isGrid) {
				const isFirstRowOfGroup = this.#itemIsFirstRowOfGroup(item);
				item.scrollIntoView({ block: "nearest" });
				if (isFirstRowOfGroup) {
					(item?.closest(COMMAND_GROUP_SELECTOR)?.querySelector(COMMAND_GROUP_HEADING_SELECTOR))?.scrollIntoView({ block: "nearest" });
					return;
				}
			} else {
				const firstChildOfParent = getFirstNonCommentChild(grandparent);
				if (firstChildOfParent && firstChildOfParent.dataset?.value === item.dataset?.value) {
					(item?.closest(COMMAND_GROUP_SELECTOR)?.querySelector(COMMAND_GROUP_HEADING_SELECTOR))?.scrollIntoView({ block: "nearest" });
					return;
				}
			}
			item.scrollIntoView({ block: "nearest" });
		});
	}
	#itemIsFirstRowOfGroup(item) {
		const grid = this.itemsGrid;
		if (grid.length === 0) return false;
		for (let r = 0; r < grid.length; r++) {
			const row = grid[r];
			if (row === void 0) continue;
			for (let c = 0; c < row.length; c++) {
				const column = row[c];
				if (column === void 0 || column.ref !== item) continue;
				return column.firstRowOfGroup;
			}
		}
		return false;
	}
	/**
	* Sets selection to item at specified index in valid items array.
	* If index is out of bounds, does nothing.
	*
	* @param index - Zero-based index of item to select
	* @remarks
	* Uses `getValidItems()` to get selectable items, filtering out disabled/hidden ones.
	* Access valid items directly via `getValidItems()` to check bounds before calling.
	*
	* @example
	* // get valid items length for bounds check
	* const items = getValidItems()
	* if (index < items.length) {
	*   updateSelectedToIndex(index)
	* }
	*/
	updateSelectedToIndex(index) {
		const item = this.getValidItems()[index];
		if (!item) return;
		this.setValue(item.getAttribute(COMMAND_VALUE_ATTR) ?? "");
	}
	/**
	* Updates selected item by moving up/down relative to current selection.
	* Handles wrapping when loop option is enabled.
	*
	* @param change - Direction to move: 1 for next item, -1 for previous item
	* @remarks
	* The loop behavior wraps:
	* - From last item to first when moving next
	* - From first item to last when moving previous
	*
	* Uses `getValidItems()` to get all selectable items, which filters out disabled/hidden items.
	* You can call `getValidItems()` directly to get the current valid items array.
	*
	* @example
	* // select next item
	* updateSelectedByItem(1)
	*
	* // get all valid items
	* const items = getValidItems()
	*/
	updateSelectedByItem(change) {
		const selected = this.#getSelectedItem();
		const items = this.getValidItems();
		const index = items.findIndex((item) => item === selected);
		let newSelected = items[index + change];
		if (this.opts.loop.current) newSelected = index + change < 0 ? items[items.length - 1] : index + change === items.length ? items[0] : items[index + change];
		if (newSelected) this.setValue(newSelected.getAttribute(COMMAND_VALUE_ATTR) ?? "");
	}
	/**
	* Moves selection to the first valid item in the next/previous group.
	* If no group is found, falls back to selecting the next/previous item globally.
	*
	* @param change - Direction to move: 1 for next group, -1 for previous group
	* @example
	* // move to first item in next group
	* updateSelectedByGroup(1)
	*
	* // move to first item in previous group
	* updateSelectedByGroup(-1)
	*/
	updateSelectedByGroup(change) {
		let group = this.#getSelectedItem()?.closest(COMMAND_GROUP_SELECTOR);
		let item;
		while (group && !item) {
			group = change > 0 ? findNextSibling(group, COMMAND_GROUP_SELECTOR) : findPreviousSibling(group, COMMAND_GROUP_SELECTOR);
			item = group?.querySelector(COMMAND_VALID_ITEM_SELECTOR);
		}
		if (item) this.setValue(item.getAttribute(COMMAND_VALUE_ATTR) ?? "");
		else this.updateSelectedByItem(change);
	}
	/**
	* Maps item id to display value and search keywords.
	* Returns cleanup function to remove mapping.
	*
	* @param id - Unique item identifier
	* @param value - Display text
	* @param keywords - Optional search boost terms
	* @returns Cleanup function
	*/
	registerValue(value, keywords) {
		if (!(value && value === this.allIds.get(value)?.value)) this.allIds.set(value, {
			value,
			keywords
		});
		this._commandState.filtered.items.set(value, this.#score(value, keywords));
		if (!this.sortAfterTick) {
			this.sortAfterTick = true;
			afterTick(() => {
				this.#sort();
				this.sortAfterTick = false;
			});
		}
		return () => {
			this.allIds.delete(value);
		};
	}
	/**
	* Registers item in command list and its group.
	* Handles filtering, sorting and selection updates.
	*
	* @param id - Item identifier
	* @param groupId - Optional group to add item to
	* @returns Cleanup function that handles selection
	*/
	registerItem(id, groupId) {
		this.allItems.add(id);
		if (groupId) if (!this.allGroups.has(groupId)) this.allGroups.set(groupId, /* @__PURE__ */ new Set([id]));
		else this.allGroups.get(groupId).add(id);
		if (!this.sortAndFilterAfterTick) {
			this.sortAndFilterAfterTick = true;
			afterTick(() => {
				this.#filterItems();
				this.#sort();
				this.sortAndFilterAfterTick = false;
			});
		}
		this.#scheduleUpdate();
		return () => {
			const selectedItem = this.#getSelectedItem();
			this.allItems.delete(id);
			this.commandState.filtered.items.delete(id);
			this.#filterItems();
			if (selectedItem?.getAttribute("id") === id) this.#selectFirstItem();
			this.#scheduleUpdate();
		};
	}
	/**
	* Creates empty group if not exists.
	*
	* @param id - Group identifier
	* @returns Cleanup function
	*/
	registerGroup(id) {
		if (!this.allGroups.has(id)) this.allGroups.set(id, /* @__PURE__ */ new Set());
		return () => {
			this.allIds.delete(id);
			this.allGroups.delete(id);
		};
	}
	get isGrid() {
		return this.opts.columns.current !== null;
	}
	/**
	* Selects last valid item.
	*/
	#last() {
		return this.updateSelectedToIndex(this.getValidItems().length - 1);
	}
	/**
	* Handles next item selection:
	* - Meta: Jump to last
	* - Alt: Next group
	* - Default: Next item
	*
	* @param e - Keyboard event
	*/
	#next(e) {
		e.preventDefault();
		if (e.metaKey) this.#last();
		else if (e.altKey) this.updateSelectedByGroup(1);
		else this.updateSelectedByItem(1);
	}
	#down(e) {
		if (this.opts.columns.current === null) return;
		e.preventDefault();
		if (e.metaKey) this.updateSelectedByGroup(1);
		else this.updateSelectedByItem(this.#nextRowColumnOffset(e));
	}
	#getColumn(item, grid) {
		if (grid.length === 0) return null;
		for (let r = 0; r < grid.length; r++) {
			const row = grid[r];
			if (row === void 0) continue;
			for (let c = 0; c < row.length; c++) {
				const column = row[c];
				if (column === void 0 || column.ref !== item) continue;
				return {
					columnIndex: c,
					rowIndex: r
				};
			}
		}
		return null;
	}
	#nextRowColumnOffset(e) {
		const grid = this.itemsGrid;
		const selected = this.#getSelectedItem();
		if (!selected) return 0;
		const column = this.#getColumn(selected, grid);
		if (!column) return 0;
		let newItem = null;
		const skipRows = e.altKey ? 1 : 0;
		if (e.altKey && column.rowIndex === grid.length - 2 && !this.opts.loop.current) newItem = this.#findNextNonDisabledItem({
			start: grid.length - 1,
			end: grid.length,
			expectedColumnIndex: column.columnIndex,
			grid
		});
		else if (column.rowIndex === grid.length - 1) {
			if (!this.opts.loop.current) return 0;
			newItem = this.#findNextNonDisabledItem({
				start: 0 + skipRows,
				end: column.rowIndex,
				expectedColumnIndex: column.columnIndex,
				grid
			});
		} else {
			newItem = this.#findNextNonDisabledItem({
				start: column.rowIndex + 1 + skipRows,
				end: grid.length,
				expectedColumnIndex: column.columnIndex,
				grid
			});
			if (newItem === null && this.opts.loop.current) newItem = this.#findNextNonDisabledItem({
				start: 0,
				end: column.rowIndex,
				expectedColumnIndex: column.columnIndex,
				grid
			});
		}
		return this.#calculateOffset(selected, newItem);
	}
	/** Attempts to find the next non-disabled column that matches the expected column.
	*
	* @remarks
	* - Skips over disabled columns
	* - When a row is shorter than the expected column it defaults to the last item in the row
	*
	* @param param0
	* @returns
	*/
	#findNextNonDisabledItem({ start, end, grid, expectedColumnIndex }) {
		let newItem = null;
		for (let r = start; r < end; r++) {
			const row = grid[r];
			newItem = row[expectedColumnIndex]?.ref ?? null;
			if (newItem !== null && itemIsDisabled(newItem)) {
				newItem = null;
				continue;
			}
			if (newItem === null) for (let i = row.length - 1; i >= 0; i--) {
				const item = row[row.length - 1];
				if (item === void 0 || itemIsDisabled(item.ref)) continue;
				newItem = item.ref;
				break;
			}
			break;
		}
		return newItem;
	}
	#calculateOffset(selected, newSelected) {
		if (newSelected === null) return 0;
		const items = this.getValidItems();
		const ogIndex = items.findIndex((item) => item === selected);
		return items.findIndex((item) => item === newSelected) - ogIndex;
	}
	#up(e) {
		if (this.opts.columns.current === null) return;
		e.preventDefault();
		if (e.metaKey) this.updateSelectedByGroup(-1);
		else this.updateSelectedByItem(this.#previousRowColumnOffset(e));
	}
	#previousRowColumnOffset(e) {
		const grid = this.itemsGrid;
		const selected = this.#getSelectedItem();
		if (selected === void 0) return 0;
		const column = this.#getColumn(selected, grid);
		if (column === null) return 0;
		let newItem = null;
		const skipRows = e.altKey ? 1 : 0;
		if (e.altKey && column.rowIndex === 1 && this.opts.loop.current === false) newItem = this.#findNextNonDisabledItemDesc({
			start: 0,
			end: 0,
			expectedColumnIndex: column.columnIndex,
			grid
		});
		else if (column.rowIndex === 0) {
			if (this.opts.loop.current === false) return 0;
			newItem = this.#findNextNonDisabledItemDesc({
				start: grid.length - 1 - skipRows,
				end: column.rowIndex + 1,
				expectedColumnIndex: column.columnIndex,
				grid
			});
		} else {
			newItem = this.#findNextNonDisabledItemDesc({
				start: column.rowIndex - 1 - skipRows,
				end: 0,
				expectedColumnIndex: column.columnIndex,
				grid
			});
			if (newItem === null && this.opts.loop.current) newItem = this.#findNextNonDisabledItemDesc({
				start: grid.length - 1,
				end: column.rowIndex + 1,
				expectedColumnIndex: column.columnIndex,
				grid
			});
		}
		return this.#calculateOffset(selected, newItem);
	}
	/**
	* Attempts to find the next non-disabled column that matches the expected column.
	*
	* @remarks
	* - Skips over disabled columns
	* - When a row is shorter than the expected column it defaults to the last item in the row
	*/
	#findNextNonDisabledItemDesc({ start, end, grid, expectedColumnIndex }) {
		let newItem = null;
		for (let r = start; r >= end; r--) {
			const row = grid[r];
			if (row === void 0) continue;
			newItem = row[expectedColumnIndex]?.ref ?? null;
			if (newItem !== null && itemIsDisabled(newItem)) {
				newItem = null;
				continue;
			}
			if (newItem === null) for (let i = row.length - 1; i >= 0; i--) {
				const item = row[row.length - 1];
				if (item === void 0 || itemIsDisabled(item.ref)) continue;
				newItem = item.ref;
				break;
			}
			break;
		}
		return newItem;
	}
	/**
	* Handles previous item selection:
	* - Meta: Jump to first
	* - Alt: Previous group
	* - Default: Previous item
	*
	* @param e - Keyboard event
	*/
	#prev(e) {
		e.preventDefault();
		if (e.metaKey) this.updateSelectedToIndex(0);
		else if (e.altKey) this.updateSelectedByGroup(-1);
		else this.updateSelectedByItem(-1);
	}
	onkeydown(e) {
		const isVim = this.opts.vimBindings.current && e.ctrlKey;
		switch (e.key) {
			case "n":
			case "j":
				if (isVim) if (this.isGrid) this.#down(e);
				else this.#next(e);
				break;
			case "l":
				if (isVim) {
					if (this.isGrid) this.#next(e);
				}
				break;
			case ARROW_DOWN:
				if (this.isGrid) this.#down(e);
				else this.#next(e);
				break;
			case ARROW_RIGHT:
				if (!this.isGrid) break;
				this.#next(e);
				break;
			case "p":
			case "k":
				if (isVim) if (this.isGrid) this.#up(e);
				else this.#prev(e);
				break;
			case "h":
				if (isVim && this.isGrid) this.#prev(e);
				break;
			case ARROW_UP:
				if (this.isGrid) this.#up(e);
				else this.#prev(e);
				break;
			case ARROW_LEFT:
				if (!this.isGrid) break;
				this.#prev(e);
				break;
			case HOME:
				e.preventDefault();
				this.updateSelectedToIndex(0);
				break;
			case "End":
				e.preventDefault();
				this.#last();
				break;
			case ENTER:
 /**
			* Check if IME composition is finished before triggering the select event.
			* This prevents unwanted triggering while user is still inputting text with IME.
			* e.keyCode === 229 is for the Japanese IME && Safari as `isComposing` does not
			* work with Japanese IME and Safari in combination.
			*/
			if (!e.isComposing && e.keyCode !== 229) {
				e.preventDefault();
				const item = this.#getSelectedItem();
				if (item) item?.click();
			}
		}
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "application",
		[commandAttrs.root]: "",
		tabindex: -1,
		onkeydown: this.onkeydown,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
function itemIsDisabled(item) {
	return item.getAttribute("aria-disabled") === "true";
}
var CommandEmptyState = class CommandEmptyState {
	static create(opts) {
		return new CommandEmptyState(opts, CommandRootContext.get());
	}
	opts;
	root;
	attachment;
	#shouldRender = derived(() => {
		return this.root._commandState.filtered.count === 0 && this.#isInitialRender === false || this.opts.forceMount.current;
	});
	get shouldRender() {
		return this.#shouldRender();
	}
	set shouldRender($$value) {
		return this.#shouldRender($$value);
	}
	#isInitialRender = true;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "presentation",
		[commandAttrs.empty]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CommandGroupContainerState = class CommandGroupContainerState {
	static create(opts) {
		return CommandGroupContainerContext.set(new CommandGroupContainerState(opts, CommandRootContext.get()));
	}
	opts;
	root;
	attachment;
	#shouldRender = derived(() => {
		if (this.opts.forceMount.current) return true;
		if (this.root.opts.shouldFilter.current === false) return true;
		if (!this.root.commandState.search) return true;
		return this.root._commandState.filtered.groups.has(this.trueValue);
	});
	get shouldRender() {
		return this.#shouldRender();
	}
	set shouldRender($$value) {
		return this.#shouldRender($$value);
	}
	headingNode = null;
	trueValue = "";
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
		this.trueValue = opts.value.current ?? opts.id.current;
		watch(() => this.trueValue, () => {
			return this.root.registerGroup(this.trueValue);
		});
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "presentation",
		hidden: this.shouldRender ? void 0 : true,
		"data-value": this.trueValue,
		[commandAttrs.group]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CommandGroupHeadingState = class CommandGroupHeadingState {
	static create(opts) {
		return new CommandGroupHeadingState(opts, CommandGroupContainerContext.get());
	}
	opts;
	group;
	attachment;
	constructor(opts, group) {
		this.opts = opts;
		this.group = group;
		this.attachment = attachRef(this.opts.ref, (v) => this.group.headingNode = v);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		[commandAttrs["group-heading"]]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CommandGroupItemsState = class CommandGroupItemsState {
	static create(opts) {
		return new CommandGroupItemsState(opts, CommandGroupContainerContext.get());
	}
	opts;
	group;
	attachment;
	constructor(opts, group) {
		this.opts = opts;
		this.group = group;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "group",
		[commandAttrs["group-items"]]: "",
		"aria-labelledby": this.group.headingNode?.id ?? void 0,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CommandInputState = class CommandInputState {
	static create(opts) {
		return new CommandInputState(opts, CommandRootContext.get());
	}
	opts;
	root;
	attachment;
	#selectedItemId = derived(() => {
		const item = this.root.viewportNode?.querySelector(`${COMMAND_ITEM_SELECTOR}[${COMMAND_VALUE_ATTR}="${cssEscape(this.root.opts.value.current)}"]`);
		if (item === void 0 || item === null) return;
		return item.getAttribute("id") ?? void 0;
	});
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref, (v) => this.root.inputNode = v);
		watch(() => this.opts.ref.current, () => {
			const node = this.opts.ref.current;
			if (node && this.opts.autofocus.current) afterSleep(10, () => node.focus());
		});
		watch(() => this.opts.value.current, () => {
			if (this.root.commandState.search !== this.opts.value.current) this.root.setState("search", this.opts.value.current);
		});
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		type: "text",
		[commandAttrs.input]: "",
		autocomplete: "off",
		autocorrect: "off",
		spellcheck: false,
		"aria-autocomplete": "list",
		role: "combobox",
		"aria-expanded": boolToStr(true),
		"aria-controls": this.root.viewportNode?.id ?? void 0,
		"aria-labelledby": this.root.labelNode?.id ?? void 0,
		"aria-activedescendant": this.#selectedItemId(),
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CommandItemState = class CommandItemState {
	static create(opts) {
		const group = CommandGroupContainerContext.getOr(null);
		return new CommandItemState({
			...opts,
			group
		}, CommandRootContext.get());
	}
	opts;
	root;
	attachment;
	#group = null;
	#trueForceMount = derived(() => {
		return this.opts.forceMount.current || this.#group?.opts.forceMount.current === true;
	});
	#shouldRender = derived(() => {
		this.opts.ref.current;
		if (this.#trueForceMount() || this.root.opts.shouldFilter.current === false || !this.root.commandState.search) return true;
		const currentScore = this.root.commandState.filtered.items.get(this.trueValue);
		if (currentScore === void 0) return false;
		return currentScore > 0;
	});
	get shouldRender() {
		return this.#shouldRender();
	}
	set shouldRender($$value) {
		return this.#shouldRender($$value);
	}
	#isSelected = derived(() => this.root.opts.value.current === this.trueValue && this.trueValue !== "");
	get isSelected() {
		return this.#isSelected();
	}
	set isSelected($$value) {
		return this.#isSelected($$value);
	}
	trueValue = "";
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.#group = CommandGroupContainerContext.getOr(null);
		this.trueValue = opts.value.current;
		this.attachment = attachRef(this.opts.ref);
		watch([
			() => this.trueValue,
			() => this.#group?.trueValue,
			() => this.opts.forceMount.current
		], () => {
			if (this.opts.forceMount.current || !this.trueValue) return;
			return this.root.registerItem(this.trueValue, this.#group?.trueValue);
		});
		watch([() => this.opts.value.current, () => this.opts.ref.current], () => {
			if (this.opts.value.current) this.trueValue = this.opts.value.current;
			else if (this.opts.ref.current?.textContent) this.trueValue = this.opts.ref.current.textContent.trim();
			if (this.trueValue) {
				this.root.registerValue(this.trueValue, opts.keywords.current.map((kw) => kw.trim()));
				this.opts.ref.current?.setAttribute(COMMAND_VALUE_ATTR, this.trueValue);
			}
		});
		this.onclick = this.onclick.bind(this);
		this.onpointermove = this.onpointermove.bind(this);
	}
	#onSelect() {
		if (this.opts.disabled.current) return;
		this.#select();
		this.opts.onSelect?.current();
	}
	#select() {
		if (this.opts.disabled.current) return;
		this.root.setValue(this.trueValue, true);
	}
	onpointermove(_) {
		if (this.opts.disabled.current || this.root.opts.disablePointerSelection.current) return;
		this.#select();
	}
	onclick(_) {
		if (this.opts.disabled.current) return;
		this.#onSelect();
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		"aria-disabled": boolToStr(this.opts.disabled.current),
		"aria-selected": boolToStr(this.isSelected),
		"data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
		"data-selected": boolToEmptyStrOrUndef(this.isSelected),
		"data-value": this.trueValue,
		"data-group": this.#group?.trueValue,
		[commandAttrs.item]: "",
		role: "option",
		onpointermove: this.onpointermove,
		onclick: this.onclick,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CommandListState = class CommandListState {
	static create(opts) {
		return CommandListContext.set(new CommandListState(opts, CommandRootContext.get()));
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "listbox",
		"aria-label": this.opts.ariaLabel.current,
		[commandAttrs.list]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CommandLabelState = class CommandLabelState {
	static create(opts) {
		return new CommandLabelState(opts, CommandRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref, (v) => this.root.labelNode = v);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		[commandAttrs["input-label"]]: "",
		for: this.opts.for?.current,
		style: srOnlyStyles,
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
//#region node_modules/bits-ui/dist/bits/command/components/_command-label.svelte
function _command_label($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, children, $$slots, $$events, ...restProps } = $$props;
		const labelState = CommandLabelState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, labelState.props));
		$$renderer.push(`<label${attributes({ ...mergedProps() })}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></label>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/command/components/command.svelte
function Command$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, value = "", onValueChange = noop, onStateChange = noop, loop = false, shouldFilter = true, filter = computeCommandScore, label = "", vimBindings = true, disablePointerSelection = false, disableInitialScroll = false, columns = null, children, child, $$slots, $$events, ...restProps } = $$props;
		const rootState = CommandRootState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			filter: boxWith(() => filter),
			shouldFilter: boxWith(() => shouldFilter),
			loop: boxWith(() => loop),
			value: boxWith(() => value, (v) => {
				if (value !== v) {
					value = v;
					onValueChange(v);
				}
			}),
			vimBindings: boxWith(() => vimBindings),
			disablePointerSelection: boxWith(() => disablePointerSelection),
			disableInitialScroll: boxWith(() => disableInitialScroll),
			onStateChange: boxWith(() => onStateChange),
			columns: boxWith(() => columns)
		});
		/**
		* Sets selection to item at specified index in valid items array.
		* If index is out of bounds, does nothing.
		*
		* @param index - Zero-based index of item to select
		* @remarks
		* Uses `getValidItems()` to get selectable items, filtering out disabled/hidden ones.
		* Access valid items directly via `getValidItems()` to check bounds before calling.
		*
		* @example
		* // get valid items length for bounds check
		* const items = getValidItems()
		* if (index < items.length) {
		*   updateSelectedToIndex(index)
		* }
		*/
		const updateSelectedToIndex = (i) => rootState.updateSelectedToIndex(i);
		/**
		* Moves selection to the first valid item in the next/previous group.
		* If no group is found, falls back to selecting the next/previous item globally.
		*
		* @param change - Direction to move: 1 for next group, -1 for previous group
		* @example
		* // move to first item in next group
		* updateSelectedByGroup(1)
		*
		* // move to first item in previous group
		* updateSelectedByGroup(-1)
		*/
		const updateSelectedByGroup = (c) => rootState.updateSelectedByGroup(c);
		/**
		* Updates selected item by moving up/down relative to current selection.
		* Handles wrapping when loop option is enabled.
		*
		* @param change - Direction to move: 1 for next item, -1 for previous item
		* @remarks
		* The loop behavior wraps:
		* - From last item to first when moving next
		* - From first item to last when moving previous
		*
		* Uses `getValidItems()` to get all selectable items, which filters out disabled/hidden items.
		* You can call `getValidItems()` directly to get the current valid items array.
		*
		* @example
		* // select next item
		* updateSelectedByItem(1)
		*
		* // get all valid items
		* const items = getValidItems()
		*/
		const updateSelectedByItem = (c) => rootState.updateSelectedByItem(c);
		/**
		* Gets all non-disabled, visible command items.
		*
		* @returns Array of valid item elements
		* @remarks Exposed for direct item access and bound checking
		*/
		const getValidItems = () => rootState.getValidItems();
		const mergedProps = derived(() => mergeProps(restProps, rootState.props));
		function Label($$renderer) {
			_command_label($$renderer, {
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(label)}`);
				},
				$$slots: { default: true }
			});
		}
		if (child) {
			$$renderer.push("<!--[0-->");
			Label($$renderer);
			$$renderer.push(`<!----> `);
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div${attributes({ ...mergedProps() })}>`);
			Label($$renderer);
			$$renderer.push(`<!----> `);
			children?.($$renderer);
			$$renderer.push(`<!----></div>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, {
			ref,
			value,
			updateSelectedToIndex,
			updateSelectedByGroup,
			updateSelectedByItem,
			getValidItems
		});
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/command/components/command-empty.svelte
function Command_empty$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, children, child, forceMount = false, $$slots, $$events, ...restProps } = $$props;
		const emptyState = CommandEmptyState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			forceMount: boxWith(() => forceMount)
		});
		const mergedProps = derived(() => mergeProps(emptyState.props, restProps));
		if (emptyState.shouldRender) {
			$$renderer.push("<!--[0-->");
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
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/command/components/command-group.svelte
function Command_group$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, value = "", forceMount = false, children, child, $$slots, $$events, ...restProps } = $$props;
		const groupState = CommandGroupContainerState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			forceMount: boxWith(() => forceMount),
			value: boxWith(() => value)
		});
		const mergedProps = derived(() => mergeProps(restProps, groupState.props));
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
//#region node_modules/bits-ui/dist/bits/command/components/command-group-heading.svelte
function Command_group_heading($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, children, child, $$slots, $$events, ...restProps } = $$props;
		const headingState = CommandGroupHeadingState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, headingState.props));
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
//#region node_modules/bits-ui/dist/bits/command/components/command-group-items.svelte
function Command_group_items($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, children, child, $$slots, $$events, ...restProps } = $$props;
		const groupItemsState = CommandGroupItemsState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, groupItemsState.props));
		$$renderer.push(`<div style="display: contents;">`);
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
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/command/components/command-input.svelte
function Command_input$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { value = "", autofocus = false, id = createId(uid), ref = null, child, $$slots, $$events, ...restProps } = $$props;
		const inputState = CommandInputState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			value: boxWith(() => value, (v) => {
				value = v;
			}),
			autofocus: boxWith(() => autofocus ?? false)
		});
		const mergedProps = derived(() => mergeProps(restProps, inputState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<input${attributes({
				...mergedProps(),
				value
			}, void 0, void 0, void 0, 4)}/>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, {
			value,
			ref
		});
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/command/components/command-item.svelte
function Command_item$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, value = "", disabled = false, children, child, onSelect = noop, forceMount = false, keywords = [], $$slots, $$events, ...restProps } = $$props;
		const itemState = CommandItemState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			value: boxWith(() => value),
			disabled: boxWith(() => disabled),
			onSelect: boxWith(() => onSelect),
			forceMount: boxWith(() => forceMount),
			keywords: boxWith(() => keywords)
		});
		const mergedProps = derived(() => mergeProps(restProps, itemState.props));
		$$renderer.push(`<!---->`);
		$$renderer.push(`<div style="display: contents;" data-item-wrapper=""${attr("data-value", itemState.trueValue)}>`);
		if (itemState.shouldRender) {
			$$renderer.push("<!--[0-->");
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
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		$$renderer.push(`<!---->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/command/components/command-list.svelte
function Command_list$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), ref = null, child, children, "aria-label": ariaLabel, $$slots, $$events, ...restProps } = $$props;
		const listState = CommandListState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			ariaLabel: boxWith(() => ariaLabel ?? "Suggestions...")
		});
		const mergedProps = derived(() => mergeProps(restProps, listState.props));
		$$renderer.push(`<!---->`);
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
		$$renderer.push(`<!---->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/command/compute-command-score.js
var SCORE_CONTINUE_MATCH = 1;
var SCORE_SPACE_WORD_JUMP = .9;
var SCORE_NON_SPACE_WORD_JUMP = .8;
var SCORE_CHARACTER_JUMP = .17;
var SCORE_TRANSPOSITION = .1;
var PENALTY_SKIPPED = .999;
var PENALTY_CASE_MISMATCH = .9999;
var PENALTY_NOT_COMPLETE = .99;
var IS_GAP_REGEXP = /[\\/_+.#"@[({&]/;
var COUNT_GAPS_REGEXP = /[\\/_+.#"@[({&]/g;
var IS_SPACE_REGEXP = /[\s-]/;
var COUNT_SPACE_REGEXP = /[\s-]/g;
function computeCommandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, stringIndex, abbreviationIndex, memoizedResults) {
	if (abbreviationIndex === abbreviation.length) {
		if (stringIndex === string.length) return SCORE_CONTINUE_MATCH;
		return PENALTY_NOT_COMPLETE;
	}
	const memoizeKey = `${stringIndex},${abbreviationIndex}`;
	if (memoizedResults[memoizeKey] !== void 0) return memoizedResults[memoizeKey];
	const abbreviationChar = lowerAbbreviation.charAt(abbreviationIndex);
	let index = lowerString.indexOf(abbreviationChar, stringIndex);
	let highScore = 0;
	let score, transposedScore, wordBreaks, spaceBreaks;
	while (index >= 0) {
		score = computeCommandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, index + 1, abbreviationIndex + 1, memoizedResults);
		if (score > highScore) {
			if (index === stringIndex) score *= SCORE_CONTINUE_MATCH;
			else if (IS_GAP_REGEXP.test(string.charAt(index - 1))) {
				score *= SCORE_NON_SPACE_WORD_JUMP;
				wordBreaks = string.slice(stringIndex, index - 1).match(COUNT_GAPS_REGEXP);
				if (wordBreaks && stringIndex > 0) score *= PENALTY_SKIPPED ** wordBreaks.length;
			} else if (IS_SPACE_REGEXP.test(string.charAt(index - 1))) {
				score *= SCORE_SPACE_WORD_JUMP;
				spaceBreaks = string.slice(stringIndex, index - 1).match(COUNT_SPACE_REGEXP);
				if (spaceBreaks && stringIndex > 0) score *= PENALTY_SKIPPED ** spaceBreaks.length;
			} else {
				score *= SCORE_CHARACTER_JUMP;
				if (stringIndex > 0) score *= PENALTY_SKIPPED ** (index - stringIndex);
			}
			if (string.charAt(index) !== abbreviation.charAt(abbreviationIndex)) score *= PENALTY_CASE_MISMATCH;
		}
		if (score < SCORE_TRANSPOSITION && lowerString.charAt(index - 1) === lowerAbbreviation.charAt(abbreviationIndex + 1) || lowerAbbreviation.charAt(abbreviationIndex + 1) === lowerAbbreviation.charAt(abbreviationIndex) && lowerString.charAt(index - 1) !== lowerAbbreviation.charAt(abbreviationIndex)) {
			transposedScore = computeCommandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, index + 1, abbreviationIndex + 2, memoizedResults);
			if (transposedScore * SCORE_TRANSPOSITION > score) score = transposedScore * SCORE_TRANSPOSITION;
		}
		if (score > highScore) highScore = score;
		index = lowerString.indexOf(abbreviationChar, index + 1);
	}
	memoizedResults[memoizeKey] = highScore;
	return highScore;
}
/**
*
* @param string
* @returns
*/
function formatInput(string) {
	return string.toLowerCase().replace(COUNT_SPACE_REGEXP, " ");
}
/**
* Given a command, a search query, and (optionally) a list of keywords for the command,
* computes a score between 0 and 1 that represents how well the search query matches the
* abbreviation and keywords. 1 is a perfect match, 0 is no match.
*
* The score is calculated based on the following rules:
* - The scores are arranged so that a continuous match of characters will result in a total
* score of 1. The best case, this character is a match, and either this is the start of the string
* or the previous character was also a match.
* - A new match at the start of a word scores better than a new match elsewhere as it's more likely
* that the user will type the starts of fragments.
* - Word jumps between spaces are scored slightly higher than slashes, brackets, hyphens, etc.
* - A continuous match of characters will result in a total score of 1.
* - A new match at the start of a word scores better than a new match elsewhere as it's more likely that the user will type the starts of fragments.
* - Any other match isn't ideal, but we include it for completeness.
* - If the user transposed two letters, it should be significantly penalized.
* - The goodness of a match should decay slightly with each missing character.
* - Match higher for letters closer to the beginning of the word.
*
* @param command - The value to score against the search string (e.g. a command name like "Calculator")
* @param search - The search string to score against the value/aliases
* @param commandKeywords - An optional list of aliases/keywords to score against the search string - e.g. ["math", "add", "divide", "multiply", "subtract"]
* @returns A score between 0 and 1 that represents how well the search string matches the
* command (and keywords)
*/
function computeCommandScore(command, search, commandKeywords) {
	/**
	* NOTE: We used to do lower-casing on each recursive call, but this meant that `toLowerCase()`
	* was the dominating cost in the algorithm. Passing both is a little ugly, but considerably
	* faster.
	*/
	command = commandKeywords && commandKeywords.length > 0 ? `${`${command} ${commandKeywords?.join(" ")}`}` : command;
	return computeCommandScoreInner(command, search, formatInput(command), formatInput(search), 0, 0, {});
}
//#endregion
//#region src/lib/components/ui/command/command.svelte
function Command($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { api = null, ref = null, value = "", class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Command$1) {
				$$renderer.push("<!--[-->");
				Command$1($$renderer, spread_props([
					{
						"data-slot": "command",
						class: cn("bg-popover text-popover-foreground rounded-xl! p-1 flex size-full flex-col overflow-hidden", className)
					},
					restProps,
					{
						get value() {
							return value;
						},
						set value($$value) {
							value = $$value;
							$$settled = false;
						},
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
			api,
			ref,
			value
		});
	});
}
//#endregion
//#region src/lib/components/ui/command/command-empty.svelte
function Command_empty($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Command_empty$1) {
				$$renderer.push("<!--[-->");
				Command_empty$1($$renderer, spread_props([
					{
						"data-slot": "command-empty",
						class: cn("py-6 text-center text-sm", className)
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
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/command/command-group.svelte
function Command_group($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, heading, value, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Command_group$1) {
				$$renderer.push("<!--[-->");
				Command_group$1($$renderer, spread_props([
					{
						"data-slot": "command-group",
						class: cn("text-foreground **:[[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium", className),
						value: value ?? heading ?? `----${useId()}`
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
							if (heading) {
								$$renderer.push("<!--[0-->");
								if (Command_group_heading) {
									$$renderer.push("<!--[-->");
									Command_group_heading($$renderer, {
										class: "text-muted-foreground px-2 py-1.5 text-xs font-medium",
										children: ($$renderer) => {
											$$renderer.push(`<!---->${escape_html(heading)}`);
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
							if (Command_group_items) {
								$$renderer.push("<!--[-->");
								Command_group_items($$renderer, { children });
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
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
//#region src/lib/components/ui/command/command-item.svelte
function Command_item($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Command_item$1) {
				$$renderer.push("<!--[-->");
				Command_item$1($$renderer, spread_props([
					{
						"data-slot": "command-item",
						class: cn("group/command-item data-selected:bg-muted data-selected:text-foreground data-selected:*:[svg]:text-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className)
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
							children?.($$renderer);
							$$renderer.push(`<!----> `);
							Check($$renderer, { class: "cn-command-item-indicator ml-auto opacity-0 group-has-[[data-slot=command-shortcut]]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" });
							$$renderer.push(`<!---->`);
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
//#region src/lib/components/ui/input-group/input-group.svelte
function Input_group($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...props } = $$props;
		$$renderer.push(`<div${attributes({
			"data-slot": "input-group",
			role: "group",
			class: clsx$1(cn("group/input-group border-input dark:bg-input/30 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-disabled:bg-input/50 dark:has-disabled:bg-input/80 h-8 rounded-lg border transition-colors in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-3 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5 relative flex w-full min-w-0 items-center outline-none has-[>textarea]:h-auto", className)),
			...props
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/input-group/input-group-addon.svelte
var inputGroupAddonVariants = tv({
	base: "text-muted-foreground h-auto gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 flex cursor-text items-center justify-center select-none",
	variants: { align: {
		"inline-start": "pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem] order-first",
		"inline-end": "pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem] order-last",
		"block-start": "px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2 order-first w-full justify-start",
		"block-end": "px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2 order-last w-full justify-start"
	} },
	defaultVariants: { align: "inline-start" }
});
function Input_group_addon($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, align = "inline-start", $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div${attributes({
			role: "group",
			"data-slot": "input-group-addon",
			"data-align": align,
			class: clsx$1(cn(inputGroupAddonVariants({ align }), className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
		bind_props($$props, { ref });
	});
}
tv({
	base: "gap-2 text-sm flex items-center shadow-none",
	variants: { size: {
		xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
		sm: "cn-input-group-button-size-sm",
		"icon-xs": "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
		"icon-sm": "size-8 p-0 has-[>svg]:p-0"
	} },
	defaultVariants: { size: "xs" }
});
//#endregion
//#region src/lib/components/ui/textarea/textarea.svelte
function Textarea($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, value = void 0, class: className, "data-slot": dataSlot = "textarea", $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<textarea${attributes({
			"data-slot": dataSlot,
			class: clsx$1(cn("border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 rounded-lg border bg-transparent px-2.5 py-2 text-base transition-colors focus-visible:ring-3 aria-invalid:ring-3 md:text-sm placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50", className)),
			...restProps
		})}>`);
		const $$body = escape_html(value);
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea>`);
		bind_props($$props, {
			ref,
			value
		});
	});
}
//#endregion
//#region src/lib/components/ui/command/command-input.svelte
function Command_input($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, value = "", $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			$$renderer.push(`<div data-slot="command-input-wrapper" class="p-1 pb-0">`);
			if (Input_group) {
				$$renderer.push("<!--[-->");
				Input_group($$renderer, {
					class: "bg-input/30 border-input/30 h-8! rounded-lg! shadow-none! *:data-[slot=input-group-addon]:pl-2!",
					children: ($$renderer) => {
						if (Command_input$1) {
							$$renderer.push("<!--[-->");
							Command_input$1($$renderer, spread_props([
								{
									"data-slot": "command-input",
									class: cn("w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50", className)
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
									get value() {
										return value;
									},
									set value($$value) {
										value = $$value;
										$$settled = false;
									}
								}
							]));
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
						$$renderer.push(` `);
						if (Input_group_addon) {
							$$renderer.push("<!--[-->");
							Input_group_addon($$renderer, {
								children: ($$renderer) => {
									Search($$renderer, { class: "size-4 shrink-0 opacity-50" });
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
			$$renderer.push(`</div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		bind_props($$props, {
			ref,
			value
		});
	});
}
//#endregion
//#region src/lib/components/ui/command/command-list.svelte
function Command_list($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Command_list$1) {
				$$renderer.push("<!--[-->");
				Command_list$1($$renderer, spread_props([
					{
						"data-slot": "command-list",
						class: cn("no-scrollbar max-h-72 scroll-py-1 outline-none overflow-x-hidden overflow-y-auto", className)
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
		bind_props($$props, { ref });
	});
}

export { Command as C, Search as S, Textarea as T, Command_input as a, Command_list as b, Command_empty as c, Command_group as d, Command_item as e };
//# sourceMappingURL=command.js-CqffWVq4.js.map
