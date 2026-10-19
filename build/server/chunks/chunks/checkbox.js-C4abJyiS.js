import { a9 as props_id, a2 as attributes, a8 as bind_props, T as derived, ad as snapshot, a7 as spread_props } from './server.js-qDPizQqb.js';
import { C as Context, w as watch, N as isHTMLElement } from './scroll-lock.js-CqHv4jWP.js';
import { v as createId, b as boxWith, a as attachRef, d as boolToEmptyStrOrUndef, e as boolToStr, q as getAriaChecked, n as mergeProps, c as createBitsAttrs } from './create-id.js-BHb4azHX.js';
import { H as Hidden_input } from './hidden-input.js-C81YZGmV.js';

//#region node_modules/bits-ui/dist/bits/checkbox/checkbox.svelte.js
var checkboxAttrs = createBitsAttrs({
	component: "checkbox",
	parts: [
		"root",
		"group",
		"group-label",
		"input"
	]
});
var CheckboxGroupContext = new Context("Checkbox.Group");
var CheckboxRootContext = new Context("Checkbox.Root");
var CheckboxRootState = class CheckboxRootState {
	static create(opts, group = null) {
		return CheckboxRootContext.set(new CheckboxRootState(opts, group));
	}
	opts;
	group;
	#trueName = derived(() => {
		if (this.group && this.group.opts.name.current) return this.group.opts.name.current;
		return this.opts.name.current;
	});
	get trueName() {
		return this.#trueName();
	}
	set trueName($$value) {
		return this.#trueName($$value);
	}
	#trueRequired = derived(() => {
		if (this.group && this.group.opts.required.current) return true;
		return this.opts.required.current;
	});
	get trueRequired() {
		return this.#trueRequired();
	}
	set trueRequired($$value) {
		return this.#trueRequired($$value);
	}
	#trueDisabled = derived(() => {
		if (this.group && this.group.opts.disabled.current) return true;
		return this.opts.disabled.current;
	});
	get trueDisabled() {
		return this.#trueDisabled();
	}
	set trueDisabled($$value) {
		return this.#trueDisabled($$value);
	}
	#trueReadonly = derived(() => {
		if (this.group && this.group.opts.readonly.current) return true;
		return this.opts.readonly.current;
	});
	get trueReadonly() {
		return this.#trueReadonly();
	}
	set trueReadonly($$value) {
		return this.#trueReadonly($$value);
	}
	attachment;
	constructor(opts, group) {
		this.opts = opts;
		this.group = group;
		this.attachment = attachRef(this.opts.ref);
		this.onkeydown = this.onkeydown.bind(this);
		this.onclick = this.onclick.bind(this);
		watch.pre([() => snapshot(this.group?.opts.value.current), () => this.opts.value.current], ([groupValue, value]) => {
			if (!groupValue || !value) return;
			this.opts.checked.current = groupValue.includes(value);
		});
		watch.pre(() => this.opts.checked.current, (checked) => {
			if (!this.group) return;
			if (checked) this.group?.addValue(this.opts.value.current);
			else this.group?.removeValue(this.opts.value.current);
		});
	}
	onkeydown(e) {
		if (this.trueDisabled || this.trueReadonly) return;
		if (e.key === "Enter") {
			e.preventDefault();
			if (this.opts.type.current === "submit") e.currentTarget.closest("form")?.requestSubmit();
			return;
		}
		if (e.key === " ") {
			e.preventDefault();
			this.#toggle();
		}
	}
	#toggle() {
		if (this.opts.indeterminate.current) {
			this.opts.indeterminate.current = false;
			this.opts.checked.current = true;
		} else this.opts.checked.current = !this.opts.checked.current;
	}
	onclick(e) {
		if (this.trueDisabled || this.trueReadonly) return;
		if (this.opts.type.current === "submit") {
			this.#toggle();
			return;
		}
		e.preventDefault();
		this.#toggle();
	}
	#snippetProps = derived(() => ({
		checked: this.opts.checked.current,
		indeterminate: this.opts.indeterminate.current
	}));
	get snippetProps() {
		return this.#snippetProps();
	}
	set snippetProps($$value) {
		return this.#snippetProps($$value);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		role: "checkbox",
		type: this.opts.type.current,
		disabled: this.trueDisabled,
		"aria-checked": getAriaChecked(this.opts.checked.current, this.opts.indeterminate.current),
		"aria-required": boolToStr(this.trueRequired),
		"aria-readonly": boolToStr(this.trueReadonly),
		"data-disabled": boolToEmptyStrOrUndef(this.trueDisabled),
		"data-readonly": boolToEmptyStrOrUndef(this.trueReadonly),
		"data-state": getCheckboxDataState(this.opts.checked.current, this.opts.indeterminate.current),
		[checkboxAttrs.root]: "",
		onclick: this.onclick,
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
var CheckboxInputState = class CheckboxInputState {
	static create() {
		return new CheckboxInputState(CheckboxRootContext.get());
	}
	root;
	#trueChecked = derived(() => {
		if (!this.root.group) return this.root.opts.checked.current;
		if (this.root.opts.value.current !== void 0 && this.root.group.opts.value.current.includes(this.root.opts.value.current)) return true;
		return false;
	});
	get trueChecked() {
		return this.#trueChecked();
	}
	set trueChecked($$value) {
		return this.#trueChecked($$value);
	}
	#shouldRender = derived(() => Boolean(this.root.trueName));
	get shouldRender() {
		return this.#shouldRender();
	}
	set shouldRender($$value) {
		return this.#shouldRender($$value);
	}
	constructor(root) {
		this.root = root;
		this.onfocus = this.onfocus.bind(this);
	}
	onfocus(_) {
		if (!isHTMLElement(this.root.opts.ref.current)) return;
		this.root.opts.ref.current.focus();
	}
	#props = derived(() => ({
		type: "checkbox",
		checked: this.root.opts.checked.current === true,
		disabled: this.root.trueDisabled,
		required: this.root.trueRequired,
		name: this.root.trueName,
		value: this.root.opts.value.current,
		readonly: this.root.trueReadonly,
		onfocus: this.onfocus
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
function getCheckboxDataState(checked, indeterminate) {
	if (indeterminate) return "indeterminate";
	return checked ? "checked" : "unchecked";
}
//#endregion
//#region node_modules/bits-ui/dist/bits/checkbox/components/checkbox-input.svelte
function Checkbox_input($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const inputState = CheckboxInputState.create();
		if (inputState.shouldRender) {
			$$renderer.push("<!--[0-->");
			Hidden_input($$renderer, spread_props([inputState.props]));
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/checkbox/components/checkbox.svelte
function Checkbox($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { checked = false, ref = null, onCheckedChange, children, disabled = false, required = false, name = void 0, value = "on", id = createId(uid), indeterminate = false, onIndeterminateChange, child, type = "button", readonly, $$slots, $$events, ...restProps } = $$props;
		const group = CheckboxGroupContext.getOr(null);
		if (group && value) if (group.opts.value.current.includes(value)) checked = true;
		else checked = false;
		watch.pre(() => value, () => {
			if (group && value) if (group.opts.value.current.includes(value)) checked = true;
			else checked = false;
		});
		const rootState = CheckboxRootState.create({
			checked: boxWith(() => checked, (v) => {
				checked = v;
				onCheckedChange?.(v);
			}),
			disabled: boxWith(() => disabled ?? false),
			required: boxWith(() => required),
			name: boxWith(() => name),
			value: boxWith(() => value),
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			indeterminate: boxWith(() => indeterminate, (v) => {
				indeterminate = v;
				onIndeterminateChange?.(v);
			}),
			type: boxWith(() => type),
			readonly: boxWith(() => Boolean(readonly))
		}, group);
		const mergedProps = derived(() => mergeProps({ ...restProps }, rootState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, {
				props: mergedProps(),
				...rootState.snippetProps
			});
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<button${attributes({ ...mergedProps() })}>`);
			children?.($$renderer, rootState.snippetProps);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]--> `);
		Checkbox_input($$renderer);
		$$renderer.push(`<!---->`);
		bind_props($$props, {
			checked,
			ref,
			indeterminate
		});
	});
}

export { Checkbox as C };
//# sourceMappingURL=checkbox.js-C4abJyiS.js.map
