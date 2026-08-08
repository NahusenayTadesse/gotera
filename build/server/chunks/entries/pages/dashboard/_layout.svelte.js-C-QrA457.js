import { a7 as bind_props, F as setContext, T as derived, a2 as attributes, a3 as clsx$1, ab as stringify$1, a6 as spread_props, J as getContext, $ as attr, aa as attr_class, a8 as props_id, a9 as escape_html, a4 as ensure_array_like } from '../../../chunks/server.js-CPNQ0GBv.js';
import { o as on } from '../../../chunks/legacy-client.js-CYlmvPew.js';
import { s as setMode, r as resetMode } from '../../../chunks/dist.js-B83-UFht.js';
import { M as MediaQuery, C as Context, o as DOMContext, P as Portal, n as noop, q as PresenceManager, w as watch, r as afterTick } from '../../../chunks/scroll-lock.js-DAwGTwcu.js';
import { g as goto } from '../../../chunks/client.js-7a-rpZlk.js';
import { p as page } from '../../../chunks/state.js-BDNoTQbo.js';
import { I as Icon } from '../../../chunks/Icon.js-C-2f-rrd.js';
import { C as Chart_area } from '../../../chunks/chart-area.js-QvFMlwKF.js';
import { C as Chevron_right } from '../../../chunks/chevron-right.js-ChVD6BGK.js';
import { G as Gift, U as User_x } from '../../../chunks/user-x.js-DDDy3Lp5.js';
import { S as Scroll_area } from '../../../chunks/scroll-area.js-DLUPG4gi.js';
import { L as Log_out } from '../../../chunks/log-out.js-D_UjN7zq.js';
import { R as Refresh_cw } from '../../../chunks/refresh-cw.js-CGUVrsXQ.js';
import { S as Search, C as Command, a as Command_input, b as Command_list, c as Command_empty, d as Command_group, e as Command_item } from '../../../chunks/command.js-CqffWVq4.js';
import { S as Sheet$1 } from '../../../chunks/sheet.js-Nx3txAkw.js';
import { T as Truck } from '../../../chunks/truck.js-rfGMc_Yv.js';
import { U as Users } from '../../../chunks/users.js-B8RRgRJn.js';
import { D as Dialog, a as Dialog_trigger, b as Dialog_content, c as Dialog_header, d as Dialog$1, e as Dialog_content$1, f as Dialog_close, X, g as Dialog_overlay$1, h as Dialog_title, i as Dialog_title$1, j as DialogDescriptionState } from '../../../chunks/dialog.js-BhMsigOw.js';
import { c as createBitsAttrs, v as createId, b as boxWith, a as attachRef, n as mergeProps, d as boolToEmptyStrOrUndef, g as getDataOpenClosed, e as boolToStr, f as getDataTransitionAttrs } from '../../../chunks/create-id.js-DpR0oe6q.js';
import { T as Tooltip_provider, a as Tooltip, b as Tooltip_trigger, c as Tooltip_content } from '../../../chunks/tooltip.js-e17nlGw5.js';
import { D as Dropdown_menu, a as Dropdown_menu_trigger, b as Dropdown_menu_content, c as Dropdown_menu_item, d as Dropdown_menu_group, e as Dropdown_menu_label, f as Dropdown_menu_separator } from '../../../chunks/dropdown-menu.js-BjUEFyFe.js';
import { c as cn } from '../../../chunks/utils2.js-BChetszu.js';
import { t as tv, b as buttonVariants, B as Button } from '../../../chunks/button.js-DMlVoc1I.js';
import '../../../chunks/shared.js-CgqsOrws.js';
import { b as bgGradient } from '../../../chunks/global.svelte.js-Bc9BkX_a.js';
import '../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../chunks/exports.js-BT-QlP_6.js';
import '../../../chunks/routing.js-CU5UDpt8.js';
import '../../../chunks/internal2.js-CNjKCACj.js';
import '../../../chunks/utils.js-BQt5v-8G.js';
import '../../../chunks/minus.js-ESxlDJzH.js';
import '../../../chunks/sr-only-styles.js-P-cDEe1k.js';
import '../../../chunks/popper-layer-force-mount.js-CzkC2vS6.js';
import '../../../chunks/safe-polygon.svelte.js-Dl7S_9Eh.js';
import '../../../chunks/menu.js-CrFfA9Yr.js';

//#region node_modules/@lucide/svelte/dist/icons/disc.svelte
function Disc($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "disc" },
		props,
		{ iconNode: [["circle", {
			"cx": "12",
			"cy": "12",
			"r": "10"
		}], ["circle", {
			"cx": "12",
			"cy": "12",
			"r": "2"
		}]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/key-round.svelte
function Key_round($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "key-round" },
		props,
		{ iconNode: [["path", { "d": "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" }], ["circle", {
			"cx": "16.5",
			"cy": "7.5",
			"r": ".5",
			"fill": "currentColor"
		}]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/layout-dashboard.svelte
function Layout_dashboard($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "layout-dashboard" },
		props,
		{ iconNode: [
			["rect", {
				"width": "7",
				"height": "9",
				"x": "3",
				"y": "3",
				"rx": "1"
			}],
			["rect", {
				"width": "7",
				"height": "5",
				"x": "14",
				"y": "3",
				"rx": "1"
			}],
			["rect", {
				"width": "7",
				"height": "9",
				"x": "14",
				"y": "12",
				"rx": "1"
			}],
			["rect", {
				"width": "7",
				"height": "5",
				"x": "3",
				"y": "16",
				"rx": "1"
			}]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/moon.svelte
function Moon($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "moon" },
		props,
		{ iconNode: [["path", { "d": "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" }]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/package-search.svelte
function Package_search($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "package-search" },
		props,
		{ iconNode: [
			["path", { "d": "M12 22V12" }],
			["path", { "d": "M20.27 18.27 22 20" }],
			["path", { "d": "M21 10.498V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.98-.559" }],
			["path", { "d": "M3.29 7 12 12l8.71-5" }],
			["path", { "d": "m7.5 4.27 8.997 5.148" }],
			["circle", {
				"cx": "18.5",
				"cy": "16.5",
				"r": "2.5"
			}]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/panel-left.svelte
function Panel_left($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "panel-left" },
		props,
		{ iconNode: [["rect", {
			"width": "18",
			"height": "18",
			"x": "3",
			"y": "3",
			"rx": "2"
		}], ["path", { "d": "M9 3v18" }]] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/sun.svelte
function Sun($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "sun" },
		props,
		{ iconNode: [
			["circle", {
				"cx": "12",
				"cy": "12",
				"r": "4"
			}],
			["path", { "d": "M12 2v2" }],
			["path", { "d": "M12 20v2" }],
			["path", { "d": "m4.93 4.93 1.41 1.41" }],
			["path", { "d": "m17.66 17.66 1.41 1.41" }],
			["path", { "d": "M2 12h2" }],
			["path", { "d": "M20 12h2" }],
			["path", { "d": "m6.34 17.66-1.41 1.41" }],
			["path", { "d": "m19.07 4.93-1.41 1.41" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/user-round-cog.svelte
function User_round_cog($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "user-round-cog" },
		props,
		{ iconNode: [
			["path", { "d": "m14.305 19.53.923-.382" }],
			["path", { "d": "m15.228 16.852-.923-.383" }],
			["path", { "d": "m16.852 15.228-.383-.923" }],
			["path", { "d": "m16.852 20.772-.383.924" }],
			["path", { "d": "m19.148 15.228.383-.923" }],
			["path", { "d": "m19.53 21.696-.382-.924" }],
			["path", { "d": "M2 21a8 8 0 0 1 10.434-7.62" }],
			["path", { "d": "m20.772 16.852.924-.383" }],
			["path", { "d": "m20.772 19.148.924.383" }],
			["circle", {
				"cx": "10",
				"cy": "8",
				"r": "5"
			}],
			["circle", {
				"cx": "18",
				"cy": "18",
				"r": "3"
			}]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/user.svelte
function User($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "user" },
		props,
		{ iconNode: [["path", { "d": "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }], ["circle", {
			"cx": "12",
			"cy": "7",
			"r": "4"
		}]] }
	]));
}
//#endregion
//#region node_modules/bits-ui/dist/bits/dialog/components/dialog-description.svelte
function Dialog_description($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { id = createId(uid), children, child, ref = null, $$slots, $$events, ...restProps } = $$props;
		const descriptionState = DialogDescriptionState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, descriptionState.props));
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
//#region node_modules/bits-ui/dist/bits/avatar/avatar.svelte.js
var avatarAttrs = createBitsAttrs({
	component: "avatar",
	parts: [
		"root",
		"image",
		"fallback"
	]
});
var AvatarRootContext = new Context("Avatar.Root");
var AvatarRootState = class AvatarRootState {
	static create(opts) {
		return AvatarRootContext.set(new AvatarRootState(opts));
	}
	opts;
	domContext;
	attachment;
	constructor(opts) {
		this.opts = opts;
		this.domContext = new DOMContext(this.opts.ref);
		this.loadImage = this.loadImage.bind(this);
		this.attachment = attachRef(this.opts.ref);
	}
	loadImage(src, crossorigin, referrerPolicy) {
		if (this.opts.loadingStatus.current === "loaded") return;
		let imageTimerId;
		const image = new Image();
		image.src = src;
		if (crossorigin !== void 0) image.crossOrigin = crossorigin;
		if (referrerPolicy) image.referrerPolicy = referrerPolicy;
		this.opts.loadingStatus.current = "loading";
		image.onload = () => {
			imageTimerId = this.domContext.setTimeout(() => {
				this.opts.loadingStatus.current = "loaded";
			}, this.opts.delayMs.current);
		};
		image.onerror = () => {
			this.opts.loadingStatus.current = "error";
		};
		return () => {
			if (!imageTimerId) return;
			this.domContext.clearTimeout(imageTimerId);
		};
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		[avatarAttrs.root]: "",
		"data-status": this.opts.loadingStatus.current,
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var AvatarFallbackState = class AvatarFallbackState {
	static create(opts) {
		return new AvatarFallbackState(opts, AvatarRootContext.get());
	}
	opts;
	root;
	attachment;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
	}
	#style = derived(() => this.root.opts.loadingStatus.current === "loaded" ? { display: "none" } : void 0);
	get style() {
		return this.#style();
	}
	set style($$value) {
		return this.#style($$value);
	}
	#props = derived(() => ({
		style: this.style,
		"data-status": this.root.opts.loadingStatus.current,
		[avatarAttrs.fallback]: "",
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
//#region node_modules/bits-ui/dist/bits/avatar/components/avatar.svelte
function Avatar$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { delayMs = 0, loadingStatus = "loading", onLoadingStatusChange, child, children, id = createId(uid), ref = null, $$slots, $$events, ...restProps } = $$props;
		const rootState = AvatarRootState.create({
			delayMs: boxWith(() => delayMs),
			loadingStatus: boxWith(() => loadingStatus, (v) => {
				if (loadingStatus !== v) {
					loadingStatus = v;
					onLoadingStatusChange?.(v);
				}
			}),
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, rootState.props));
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
			loadingStatus,
			ref
		});
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/avatar/components/avatar-fallback.svelte
function Avatar_fallback$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, id = createId(uid), ref = null, $$slots, $$events, ...restProps } = $$props;
		const fallbackState = AvatarFallbackState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, fallbackState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<span${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></span>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/collapsible/collapsible.svelte.js
var collapsibleAttrs = createBitsAttrs({
	component: "collapsible",
	parts: [
		"root",
		"content",
		"trigger"
	]
});
var CollapsibleRootContext = new Context("Collapsible.Root");
var CollapsibleRootState = class CollapsibleRootState {
	static create(opts) {
		return CollapsibleRootContext.set(new CollapsibleRootState(opts));
	}
	opts;
	attachment;
	contentNode = null;
	contentPresence;
	contentId = void 0;
	constructor(opts) {
		this.opts = opts;
		this.toggleOpen = this.toggleOpen.bind(this);
		this.attachment = attachRef(this.opts.ref);
		this.contentPresence = new PresenceManager({
			ref: boxWith(() => this.contentNode),
			open: this.opts.open,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		});
	}
	toggleOpen() {
		this.opts.open.current = !this.opts.open.current;
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		"data-state": getDataOpenClosed(this.opts.open.current),
		"data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
		[collapsibleAttrs.root]: "",
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CollapsibleContentState = class CollapsibleContentState {
	static create(opts) {
		return new CollapsibleContentState(opts, CollapsibleRootContext.get());
	}
	opts;
	root;
	attachment;
	#present = derived(() => {
		if (this.opts.hiddenUntilFound.current) return this.root.opts.open.current;
		return this.opts.forceMount.current || this.root.opts.open.current;
	});
	get present() {
		return this.#present();
	}
	set present($$value) {
		return this.#present($$value);
	}
	#originalStyles;
	#isMountAnimationPrevented = false;
	#width = 0;
	#height = 0;
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.#isMountAnimationPrevented = root.opts.open.current;
		this.root.contentId = this.opts.id.current;
		this.attachment = attachRef(this.opts.ref, (v) => this.root.contentNode = v);
		watch.pre(() => this.opts.id.current, (id) => {
			this.root.contentId = id;
		});
		watch.pre([() => this.opts.ref.current, () => this.opts.hiddenUntilFound.current], ([node, hiddenUntilFound]) => {
			if (!node || !hiddenUntilFound) return;
			const handleBeforeMatch = () => {
				if (this.root.opts.open.current) return;
				requestAnimationFrame(() => {
					this.root.opts.open.current = true;
				});
			};
			return on(node, "beforematch", handleBeforeMatch);
		});
		watch([() => this.opts.ref.current, () => this.present], ([node]) => {
			if (!node) return;
			afterTick(() => {
				if (!this.opts.ref.current) return;
				this.#originalStyles = this.#originalStyles || {
					transitionDuration: node.style.transitionDuration,
					animationName: node.style.animationName
				};
				node.style.transitionDuration = "0s";
				node.style.animationName = "none";
				const rect = node.getBoundingClientRect();
				this.#height = rect.height;
				this.#width = rect.width;
				if (!this.#isMountAnimationPrevented) {
					const { animationName, transitionDuration } = this.#originalStyles;
					node.style.transitionDuration = transitionDuration;
					node.style.animationName = animationName;
				}
			});
		});
	}
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
	#snippetProps = derived(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return this.#snippetProps();
	}
	set snippetProps($$value) {
		return this.#snippetProps($$value);
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		style: {
			"--bits-collapsible-content-height": this.#height ? `${this.#height}px` : void 0,
			"--bits-collapsible-content-width": this.#width ? `${this.#width}px` : void 0
		},
		hidden: this.opts.hiddenUntilFound.current && !this.root.opts.open.current ? "until-found" : void 0,
		"data-state": getDataOpenClosed(this.root.opts.open.current),
		...getDataTransitionAttrs(this.root.contentPresence.transitionStatus),
		"data-disabled": boolToEmptyStrOrUndef(this.root.opts.disabled.current),
		[collapsibleAttrs.content]: "",
		...this.opts.hiddenUntilFound.current && !this.shouldRender ? {} : { hidden: this.opts.hiddenUntilFound.current ? !this.shouldRender : this.opts.forceMount.current ? void 0 : !this.shouldRender },
		...this.attachment
	}));
	get props() {
		return this.#props();
	}
	set props($$value) {
		return this.#props($$value);
	}
};
var CollapsibleTriggerState = class CollapsibleTriggerState {
	static create(opts) {
		return new CollapsibleTriggerState(opts, CollapsibleRootContext.get());
	}
	opts;
	root;
	attachment;
	#isDisabled = derived(() => this.opts.disabled.current || this.root.opts.disabled.current);
	constructor(opts, root) {
		this.opts = opts;
		this.root = root;
		this.attachment = attachRef(this.opts.ref);
		this.onclick = this.onclick.bind(this);
		this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		if (this.#isDisabled()) return;
		if (e.button !== 0) return e.preventDefault();
		this.root.toggleOpen();
	}
	onkeydown(e) {
		if (this.#isDisabled()) return;
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			this.root.toggleOpen();
		}
	}
	#props = derived(() => ({
		id: this.opts.id.current,
		type: "button",
		disabled: this.#isDisabled(),
		"aria-controls": this.root.contentId,
		"aria-expanded": boolToStr(this.root.opts.open.current),
		"data-state": getDataOpenClosed(this.root.opts.open.current),
		"data-disabled": boolToEmptyStrOrUndef(this.#isDisabled()),
		[collapsibleAttrs.trigger]: "",
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
//#endregion
//#region node_modules/bits-ui/dist/bits/collapsible/components/collapsible.svelte
function Collapsible$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, id = createId(uid), ref = null, open = false, disabled = false, onOpenChange = noop, onOpenChangeComplete = noop, $$slots, $$events, ...restProps } = $$props;
		const rootState = CollapsibleRootState.create({
			open: boxWith(() => open, (v) => {
				open = v;
				onOpenChange(v);
			}),
			disabled: boxWith(() => disabled),
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			onOpenChangeComplete: boxWith(() => onOpenChangeComplete)
		});
		const mergedProps = derived(() => mergeProps(restProps, rootState.props));
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
			open
		});
	});
}
//#endregion
//#region node_modules/bits-ui/dist/bits/collapsible/components/collapsible-content.svelte
function Collapsible_content$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { child, ref = null, forceMount = false, hiddenUntilFound = false, children, id = createId(uid), $$slots, $$events, ...restProps } = $$props;
		const contentState = CollapsibleContentState.create({
			id: boxWith(() => id),
			forceMount: boxWith(() => forceMount),
			hiddenUntilFound: boxWith(() => hiddenUntilFound),
			ref: boxWith(() => ref, (v) => ref = v)
		});
		const mergedProps = derived(() => mergeProps(restProps, contentState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, {
				...contentState.snippetProps,
				props: mergedProps()
			});
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
//#region node_modules/bits-ui/dist/bits/collapsible/components/collapsible-trigger.svelte
function Collapsible_trigger$1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const uid = props_id($$renderer);
		let { children, child, ref = null, id = createId(uid), disabled = false, $$slots, $$events, ...restProps } = $$props;
		const triggerState = CollapsibleTriggerState.create({
			id: boxWith(() => id),
			ref: boxWith(() => ref, (v) => ref = v),
			disabled: boxWith(() => disabled)
		});
		const mergedProps = derived(() => mergeProps(restProps, triggerState.props));
		if (child) {
			$$renderer.push("<!--[0-->");
			child($$renderer, { props: mergedProps() });
			$$renderer.push(`<!---->`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<button${attributes({ ...mergedProps() })}>`);
			children?.($$renderer);
			$$renderer.push(`<!----></button>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/hooks/is-mobile.svelte.ts
var DEFAULT_MOBILE_BREAKPOINT = 768;
var IsMobile = class extends MediaQuery {
	constructor(breakpoint = DEFAULT_MOBILE_BREAKPOINT) {
		super(`max-width: ${breakpoint - 1}px`);
	}
};
//#endregion
//#region src/lib/components/ui/sidebar/constants.ts
var SIDEBAR_COOKIE_NAME = "sidebar:state";
var SIDEBAR_COOKIE_MAX_AGE = 3600 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
//#endregion
//#region src/lib/components/ui/sidebar/context.svelte.ts
var SidebarState = class {
	props;
	#open = derived(() => this.props.open());
	get open() {
		return this.#open();
	}
	set open($$value) {
		return this.#open($$value);
	}
	openMobile = false;
	setOpen;
	#isMobile;
	#state = derived(() => this.open ? "expanded" : "collapsed");
	get state() {
		return this.#state();
	}
	set state($$value) {
		return this.#state($$value);
	}
	constructor(props) {
		this.setOpen = props.setOpen;
		this.#isMobile = new IsMobile();
		this.props = props;
	}
	get isMobile() {
		return this.#isMobile.current;
	}
	handleShortcutKeydown = (e) => {
		if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			this.toggle();
		}
	};
	setOpenMobile = (value) => {
		this.openMobile = value;
	};
	toggle = () => {
		return this.#isMobile.current ? this.openMobile = !this.openMobile : this.setOpen(!this.open);
	};
};
var SYMBOL_KEY = "scn-sidebar";
/**
* Instantiates a new `SidebarState` instance and sets it in the context.
*
* @param props The constructor props for the `SidebarState` class.
* @returns  The `SidebarState` instance.
*/
function setSidebar(props) {
	return setContext(Symbol.for(SYMBOL_KEY), new SidebarState(props));
}
/**
* Retrieves the `SidebarState` instance from the context. This is a class instance,
* so you cannot destructure it.
* @returns The `SidebarState` instance.
*/
function useSidebar() {
	return getContext(Symbol.for(SYMBOL_KEY));
}
//#endregion
//#region src/lib/components/ui/sidebar/sidebar-content.svelte
function Sidebar_content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div${attributes({
			"data-slot": "sidebar-content",
			"data-sidebar": "content",
			class: clsx$1(cn("no-scrollbar gap-0 flex min-h-0 flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/sidebar/sidebar-footer.svelte
function Sidebar_footer($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div${attributes({
			"data-slot": "sidebar-footer",
			"data-sidebar": "footer",
			class: clsx$1(cn("gap-2 p-2 flex flex-col", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/sidebar/sidebar-group-content.svelte
function Sidebar_group_content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div${attributes({
			"data-slot": "sidebar-group-content",
			"data-sidebar": "group-content",
			class: clsx$1(cn("text-sm w-full", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/sidebar/sidebar-group-label.svelte
function Sidebar_group_label($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, children, child, class: className, $$slots, $$events, ...restProps } = $$props;
		const mergedProps = derived(() => ({
			class: cn("text-sidebar-foreground/70 ring-sidebar-ring h-8 rounded-md px-2 text-xs font-medium transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 flex shrink-0 items-center outline-hidden [&>svg]:shrink-0", className),
			"data-slot": "sidebar-group-label",
			"data-sidebar": "group-label",
			...restProps
		}));
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
//#region src/lib/components/ui/sidebar/sidebar-group.svelte
function Sidebar_group($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div${attributes({
			"data-slot": "sidebar-group",
			"data-sidebar": "group",
			class: clsx$1(cn("p-2 relative flex w-full min-w-0 flex-col", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/sidebar/sidebar-menu-button.svelte
var sidebarMenuButtonVariants = tv({
	base: "ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground gap-2 rounded-md p-2 text-left text-sm transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 data-active:font-medium peer/menu-button group/menu-button flex w-full items-center overflow-hidden outline-hidden disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_var(--sidebar-border)] hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Sidebar_menu_button($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, child, variant = "default", size = "default", isActive = false, tooltipContent, tooltipContentProps, $$slots, $$events, ...restProps } = $$props;
		const sidebar = useSidebar();
		const buttonProps = derived(() => ({
			class: cn(sidebarMenuButtonVariants({
				variant,
				size
			}), className),
			"data-slot": "sidebar-menu-button",
			"data-sidebar": "menu-button",
			"data-size": size,
			"data-active": isActive,
			...restProps
		}));
		function Button($$renderer, { props }) {
			const mergedProps = mergeProps(buttonProps(), props);
			if (child) {
				$$renderer.push("<!--[0-->");
				child($$renderer, { props: mergedProps });
				$$renderer.push(`<!---->`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<button${attributes({ ...mergedProps })}>`);
				children?.($$renderer);
				$$renderer.push(`<!----></button>`);
			}
			$$renderer.push(`<!--]-->`);
		}
		if (!tooltipContent) {
			$$renderer.push("<!--[0-->");
			Button($$renderer, {});
		} else {
			$$renderer.push("<!--[-1-->");
			if (Tooltip) {
				$$renderer.push("<!--[-->");
				Tooltip($$renderer, {
					children: ($$renderer) => {
						{
							function child($$renderer, { props }) {
								Button($$renderer, { props });
							}
							if (Tooltip_trigger) {
								$$renderer.push("<!--[-->");
								Tooltip_trigger($$renderer, {
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
							Tooltip_content($$renderer, spread_props([
								{
									side: "right",
									align: "center",
									hidden: sidebar.state !== "collapsed" || sidebar.isMobile
								},
								tooltipContentProps,
								{
									children: ($$renderer) => {
										if (typeof tooltipContent === "string") {
											$$renderer.push("<!--[0-->");
											$$renderer.push(`${escape_html(tooltipContent)}`);
										} else if (tooltipContent) {
											$$renderer.push("<!--[1-->");
											tooltipContent($$renderer);
											$$renderer.push(`<!---->`);
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
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/sidebar/sidebar-menu-item.svelte
function Sidebar_menu_item($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<li${attributes({
			"data-slot": "sidebar-menu-item",
			"data-sidebar": "menu-item",
			class: clsx$1(cn("group/menu-item relative", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></li>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/sidebar/sidebar-menu-sub-item.svelte
function Sidebar_menu_sub_item($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, children, class: className, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<li${attributes({
			"data-slot": "sidebar-menu-sub-item",
			"data-sidebar": "menu-sub-item",
			class: clsx$1(cn("group/menu-sub-item relative", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></li>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/sidebar/sidebar-menu-sub.svelte
function Sidebar_menu_sub($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<ul${attributes({
			"data-slot": "sidebar-menu-sub",
			"data-sidebar": "menu-sub",
			class: clsx$1(cn("border-sidebar-border mx-3.5 translate-x-px gap-1 border-l px-2.5 py-0.5 group-data-[collapsible=icon]:hidden flex min-w-0 flex-col", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></ul>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/sidebar/sidebar-menu.svelte
function Sidebar_menu($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<ul${attributes({
			"data-slot": "sidebar-menu",
			"data-sidebar": "menu",
			class: clsx$1(cn("gap-0 flex w-full min-w-0 flex-col", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></ul>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/sidebar/sidebar-provider.svelte
function Sidebar_provider($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, open = true, onOpenChange = () => {}, class: className, style, children, $$slots, $$events, ...restProps } = $$props;
		setSidebar({
			open: () => open,
			setOpen: (value) => {
				open = value;
				onOpenChange(value);
				document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
			}
		});
		if (Tooltip_provider) {
			$$renderer.push("<!--[-->");
			Tooltip_provider($$renderer, {
				delayDuration: 0,
				children: ($$renderer) => {
					$$renderer.push(`<div${attributes({
						"data-slot": "sidebar-wrapper",
						style: `--sidebar-width: ${stringify$1(SIDEBAR_WIDTH)}; --sidebar-width-icon: ${stringify$1(SIDEBAR_WIDTH_ICON)}; ${stringify$1(style)}`,
						class: clsx$1(cn("group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full", className)),
						...restProps
					})}>`);
					children?.($$renderer);
					$$renderer.push(`<!----></div>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		bind_props($$props, {
			ref,
			open
		});
	});
}
//#endregion
//#region src/lib/components/ui/sidebar/sidebar-trigger.svelte
function Sidebar_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, onclick, $$slots, $$events, ...restProps } = $$props;
		const sidebar = useSidebar();
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			Button($$renderer, spread_props([
				{
					"data-sidebar": "trigger",
					"data-slot": "sidebar-trigger",
					variant: "ghost",
					size: "icon-sm",
					class: cn("cn-sidebar-trigger", className),
					type: "button",
					onclick: (e) => {
						onclick?.(e);
						sidebar.toggle();
					}
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
						Panel_left($$renderer, {});
						$$renderer.push(`<!----> <span class="sr-only">Toggle Sidebar</span>`);
					},
					$$slots: { default: true }
				}
			]));
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
//#region src/lib/components/ui/sheet/sheet.svelte
function Sheet($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { open = false, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Dialog$1) {
				$$renderer.push("<!--[-->");
				Dialog$1($$renderer, spread_props([restProps, {
					get open() {
						return open;
					},
					set open($$value) {
						open = $$value;
						$$settled = false;
					}
				}]));
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
		bind_props($$props, { open });
	});
}
//#endregion
//#region src/lib/components/ui/sheet/sheet-portal.svelte
function Sheet_portal($$renderer, $$props) {
	let { $$slots, $$events, ...restProps } = $$props;
	if (Portal) {
		$$renderer.push("<!--[-->");
		Portal($$renderer, spread_props([restProps]));
		$$renderer.push("<!--]-->");
	} else {
		$$renderer.push("<!--[!-->");
		$$renderer.push("<!--]-->");
	}
}
//#endregion
//#region src/lib/components/ui/sheet/sheet-overlay.svelte
function Sheet_overlay($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Dialog_overlay$1) {
				$$renderer.push("<!--[-->");
				Dialog_overlay$1($$renderer, spread_props([
					{
						"data-slot": "sheet-overlay",
						class: cn("bg-black/10 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 z-50", className)
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
//#region src/lib/components/ui/sheet/sheet-content.svelte
function Sheet_content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, side = "right", showCloseButton = true, portalProps, children, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			Sheet_portal($$renderer, spread_props([portalProps, {
				children: ($$renderer) => {
					Sheet_overlay($$renderer, {});
					$$renderer.push(`<!----> `);
					if (Dialog_content$1) {
						$$renderer.push("<!--[-->");
						Dialog_content$1($$renderer, spread_props([
							{
								"data-slot": "sheet-content",
								"data-side": side,
								class: cn("bg-popover text-popover-foreground fixed z-50 flex flex-col gap-4 bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10", className)
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
									if (showCloseButton) {
										$$renderer.push("<!--[0-->");
										{
											function child($$renderer, { props }) {
												Button($$renderer, spread_props([
													{
														variant: "ghost",
														class: "absolute top-3 right-3",
														size: "icon-sm"
													},
													props,
													{
														children: ($$renderer) => {
															X($$renderer, {});
															$$renderer.push(`<!----> <span class="sr-only">Close</span>`);
														},
														$$slots: { default: true }
													}
												]));
											}
											if (Dialog_close) {
												$$renderer.push("<!--[-->");
												Dialog_close($$renderer, {
													"data-slot": "sheet-close",
													child,
													$$slots: { child: true }
												});
												$$renderer.push("<!--]-->");
											} else {
												$$renderer.push("<!--[!-->");
												$$renderer.push("<!--]-->");
											}
										}
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
				},
				$$slots: { default: true }
			}]));
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
//#region src/lib/components/ui/sheet/sheet-header.svelte
function Sheet_header($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, children, $$slots, $$events, ...restProps } = $$props;
		$$renderer.push(`<div${attributes({
			"data-slot": "sheet-header",
			class: clsx$1(cn("gap-0.5 p-4 flex flex-col", className)),
			...restProps
		})}>`);
		children?.($$renderer);
		$$renderer.push(`<!----></div>`);
		bind_props($$props, { ref });
	});
}
//#endregion
//#region src/lib/components/ui/sheet/sheet-title.svelte
function Sheet_title($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Dialog_title$1) {
				$$renderer.push("<!--[-->");
				Dialog_title$1($$renderer, spread_props([
					{
						"data-slot": "sheet-title",
						class: cn("font-heading text-foreground text-base font-medium", className)
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
//#region src/lib/components/ui/sheet/sheet-description.svelte
function Sheet_description($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Dialog_description) {
				$$renderer.push("<!--[-->");
				Dialog_description($$renderer, spread_props([
					{
						"data-slot": "sheet-description",
						class: cn("text-muted-foreground text-sm", className)
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
//#region src/lib/components/ui/sidebar/sidebar.svelte
function Sidebar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, side = "left", variant = "sidebar", collapsible = "offcanvas", class: className, children, $$slots, $$events, ...restProps } = $$props;
		const sidebar = useSidebar();
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (collapsible === "none") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div${attributes({
					class: clsx$1(cn("bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col", className)),
					...restProps
				})}>`);
				children?.($$renderer);
				$$renderer.push(`<!----></div>`);
			} else if (sidebar.isMobile) {
				$$renderer.push("<!--[1-->");
				var bind_get = () => sidebar.openMobile;
				var bind_set = (v) => sidebar.setOpenMobile(v);
				if (Sheet) {
					$$renderer.push("<!--[-->");
					Sheet($$renderer, spread_props([
						{
							get open() {
								return bind_get();
							},
							set open($$value) {
								bind_set($$value);
							}
						},
						restProps,
						{
							children: ($$renderer) => {
								if (Sheet_content) {
									$$renderer.push("<!--[-->");
									Sheet_content($$renderer, {
										"data-sidebar": "sidebar",
										"data-slot": "sidebar",
										"data-mobile": "true",
										class: cn("bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden", className),
										style: `--sidebar-width: ${stringify$1(SIDEBAR_WIDTH_MOBILE)};`,
										side,
										get ref() {
											return ref;
										},
										set ref($$value) {
											ref = $$value;
											$$settled = false;
										},
										children: ($$renderer) => {
											if (Sheet_header) {
												$$renderer.push("<!--[-->");
												Sheet_header($$renderer, {
													class: "sr-only",
													children: ($$renderer) => {
														if (Sheet_title) {
															$$renderer.push("<!--[-->");
															Sheet_title($$renderer, {
																children: ($$renderer) => {
																	$$renderer.push(`<!---->Sidebar`);
																},
																$$slots: { default: true }
															});
															$$renderer.push("<!--]-->");
														} else {
															$$renderer.push("<!--[!-->");
															$$renderer.push("<!--]-->");
														}
														$$renderer.push(` `);
														if (Sheet_description) {
															$$renderer.push("<!--[-->");
															Sheet_description($$renderer, {
																children: ($$renderer) => {
																	$$renderer.push(`<!---->Displays the mobile sidebar.`);
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
											$$renderer.push(` <div class="flex h-full w-full flex-col">`);
											children?.($$renderer);
											$$renderer.push(`<!----></div>`);
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
						}
					]));
					$$renderer.push("<!--]-->");
				} else {
					$$renderer.push("<!--[!-->");
					$$renderer.push("<!--]-->");
				}
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="text-sidebar-foreground group peer hidden md:block"${attr("data-state", sidebar.state)}${attr("data-collapsible", sidebar.state === "collapsed" ? collapsible : "")}${attr("data-variant", variant)}${attr("data-side", side)} data-slot="sidebar"><div data-slot="sidebar-gap"${attr_class(clsx$1(cn("transition-[width] duration-200 ease-linear relative w-(--sidebar-width) bg-transparent", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")))}></div> <div${attributes({
					"data-slot": "sidebar-container",
					class: clsx$1(cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex", side === "left" ? "start-0 group-data-[collapsible=offcanvas]:start-[calc(var(--sidebar-width)*-1)]" : "end-0 group-data-[collapsible=offcanvas]:end-[calc(var(--sidebar-width)*-1)]", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-e group-data-[side=right]:border-s", className)),
					...restProps
				})}><div data-sidebar="sidebar" data-slot="sidebar-inner" class="bg-sidebar group-data-[variant=floating]:ring-sidebar-border group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 flex size-full flex-col">`);
				children?.($$renderer);
				$$renderer.push(`<!----></div></div></div>`);
			}
			$$renderer.push(`<!--]-->`);
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
//#region src/lib/components/ui/collapsible/collapsible.svelte
function Collapsible($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, open = false, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Collapsible$1) {
				$$renderer.push("<!--[-->");
				Collapsible$1($$renderer, spread_props([
					{ "data-slot": "collapsible" },
					restProps,
					{
						get ref() {
							return ref;
						},
						set ref($$value) {
							ref = $$value;
							$$settled = false;
						},
						get open() {
							return open;
						},
						set open($$value) {
							open = $$value;
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
			open
		});
	});
}
//#endregion
//#region src/lib/components/ui/collapsible/collapsible-trigger.svelte
function Collapsible_trigger($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Collapsible_trigger$1) {
				$$renderer.push("<!--[-->");
				Collapsible_trigger$1($$renderer, spread_props([
					{ "data-slot": "collapsible-trigger" },
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
//#region src/lib/components/ui/collapsible/collapsible-content.svelte
function Collapsible_content($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Collapsible_content$1) {
				$$renderer.push("<!--[-->");
				Collapsible_content$1($$renderer, spread_props([
					{ "data-slot": "collapsible-content" },
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
//#region src/lib/components/NavMain.svelte
function NavMain($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { items } = $$props;
		function variantChecker(url) {
			const currentPath = page.url.pathname;
			if (url === "/dashboard") return currentPath === "/dashboard";
			return currentPath.startsWith(url) && currentPath !== "/dashboard";
		}
		function variantChecker2(url) {
			return page.url.pathname === url;
		}
		const formatCount = (count) => {
			return count > 99 ? "99+" : count.toString();
		};
		if (Sidebar_group) {
			$$renderer.push("<!--[-->");
			Sidebar_group($$renderer, {
				children: ($$renderer) => {
					if (Sidebar_menu) {
						$$renderer.push("<!--[-->");
						Sidebar_menu($$renderer, {
							class: "gap-1.5",
							children: ($$renderer) => {
								$$renderer.push(`<!--[-->`);
								const each_array = ensure_array_like(items);
								for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
									let item = each_array[$$index_1];
									if (item.items) {
										$$renderer.push("<!--[0-->");
										{
											function child($$renderer, { props }) {
												if (Sidebar_menu_item) {
													$$renderer.push("<!--[-->");
													Sidebar_menu_item($$renderer, spread_props([props, {
														children: ($$renderer) => {
															{
																function child($$renderer, { props }) {
																	if (Sidebar_menu_button) {
																		$$renderer.push("<!--[-->");
																		Sidebar_menu_button($$renderer, spread_props([props, {
																			class: "relative",
																			variant: variantChecker(item.url) ? "outline" : "default",
																			size: "lg",
																			title: `Goto ${stringify$1(item.title)}`,
																			tooltipContent: item.title,
																			children: ($$renderer) => {
																				if (item.icon) {
																					$$renderer.push("<!--[0-->");
																					if (item.icon) {
																						$$renderer.push("<!--[-->");
																						item.icon($$renderer, {});
																						$$renderer.push("<!--]-->");
																					} else {
																						$$renderer.push("<!--[!-->");
																						$$renderer.push("<!--]-->");
																					}
																				} else $$renderer.push("<!--[-1-->");
																				$$renderer.push(`<!--]--> <span>${escape_html(item.title)}</span> `);
																				Chevron_right($$renderer, { class: "ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" });
																				$$renderer.push(`<!---->`);
																			},
																			$$slots: { default: true }
																		}]));
																		$$renderer.push("<!--]-->");
																	} else {
																		$$renderer.push("<!--[!-->");
																		$$renderer.push("<!--]-->");
																	}
																	$$renderer.push(` `);
																	if (item.counter > 0) {
																		$$renderer.push("<!--[0-->");
																		$$renderer.push(`<span class="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">${escape_html(formatCount(item.counter))}</span>`);
																	} else $$renderer.push("<!--[-1-->");
																	$$renderer.push(`<!--]-->`);
																}
																if (Collapsible_trigger) {
																	$$renderer.push("<!--[-->");
																	Collapsible_trigger($$renderer, {
																		onclick: () => goto(item.url),
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
															if (Collapsible_content) {
																$$renderer.push("<!--[-->");
																Collapsible_content($$renderer, {
																	children: ($$renderer) => {
																		if (Sidebar_menu_sub) {
																			$$renderer.push("<!--[-->");
																			Sidebar_menu_sub($$renderer, {
																				children: ($$renderer) => {
																					$$renderer.push(`<!--[-->`);
																					const each_array_1 = ensure_array_like(item.items ?? []);
																					for (let $$index = 0, $$length = each_array_1.length; $$index < $$length; $$index++) {
																						let subItem = each_array_1[$$index];
																						if (Sidebar_menu_sub_item) {
																							$$renderer.push("<!--[-->");
																							Sidebar_menu_sub_item($$renderer, {
																								children: ($$renderer) => {
																									{
																										function child($$renderer, { props }) {
																											$$renderer.push(`<a${attributes({
																												href: subItem.url,
																												...props
																											})}>`);
																											if (subItem.icon) {
																												$$renderer.push("<!--[0-->");
																												if (subItem.icon) {
																													$$renderer.push("<!--[-->");
																													subItem.icon($$renderer, { class: "h-4 w-4" });
																													$$renderer.push("<!--]-->");
																												} else {
																													$$renderer.push("<!--[!-->");
																													$$renderer.push("<!--]-->");
																												}
																											} else $$renderer.push("<!--[-1-->");
																											$$renderer.push(`<!--]--> <span>${escape_html(subItem.title)}</span></a>`);
																										}
																										if (Sidebar_menu_button) {
																											$$renderer.push("<!--[-->");
																											Sidebar_menu_button($$renderer, spread_props([props, {
																												variant: variantChecker2(subItem.url) ? "outline" : "default",
																												size: "sm",
																												title: `Goto ${stringify$1(subItem.title)}`,
																												tooltipContent: subItem.title,
																												child,
																												$$slots: { child: true }
																											}]));
																											$$renderer.push("<!--]-->");
																										} else {
																											$$renderer.push("<!--[!-->");
																											$$renderer.push("<!--]-->");
																										}
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
														},
														$$slots: { default: true }
													}]));
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
											}
											if (Collapsible) {
												$$renderer.push("<!--[-->");
												Collapsible($$renderer, {
													open: item.isActive,
													class: "group/collapsible",
													child,
													$$slots: { child: true }
												});
												$$renderer.push("<!--]-->");
											} else {
												$$renderer.push("<!--[!-->");
												$$renderer.push("<!--]-->");
											}
										}
									} else {
										$$renderer.push("<!--[-1-->");
										if (Sidebar_menu) {
											$$renderer.push("<!--[-->");
											Sidebar_menu($$renderer, {
												class: "w-full gap-3",
												title: `Goto ${stringify$1(item.title)}`,
												children: ($$renderer) => {
													if (Sidebar_menu_item) {
														$$renderer.push("<!--[-->");
														Sidebar_menu_item($$renderer, {
															children: ($$renderer) => {
																{
																	function child($$renderer, { props }) {
																		$$renderer.push(`<a${attributes({
																			href: item.url,
																			...props
																		})}>`);
																		if (item.icon) {
																			$$renderer.push("<!--[-->");
																			item.icon($$renderer, { class: "h-5! w-5!" });
																			$$renderer.push("<!--]-->");
																		} else {
																			$$renderer.push("<!--[!-->");
																			$$renderer.push("<!--]-->");
																		}
																		$$renderer.push(` <span>${escape_html(item.title)}</span></a>`);
																	}
																	if (Sidebar_menu_button) {
																		$$renderer.push("<!--[-->");
																		Sidebar_menu_button($$renderer, {
																			size: "lg",
																			class: "relative",
																			variant: variantChecker(item.url) ? "outline" : "default",
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
																if (item.counter > 0) {
																	$$renderer.push("<!--[0-->");
																	$$renderer.push(`<span class="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">${escape_html(formatCount(item.counter))}</span>`);
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
	});
}
//#endregion
//#region src/lib/components/app-sidebar.svelte
function App_sidebar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { $$slots, $$events, ...restProps } = $$props;
		const navigation = [
			{
				title: "Dashboard",
				url: "/dashboard",
				icon: Layout_dashboard
			},
			{
				title: "Customers",
				url: "/dashboard/customers",
				icon: Users
			},
			{
				title: "Plans",
				url: "/dashboard/plans",
				icon: Sheet$1
			},
			{
				title: "Orders",
				url: "/dashboard/orders",
				icon: Package_search,
				items: [
					{
						title: "Subscriptions",
						url: "/dashboard/orders/subscriptions",
						icon: Refresh_cw
					},
					{
						title: "One-Time & Gift",
						url: "/dashboard/orders/one-time",
						icon: Gift
					},
					{
						title: "Guest Orders",
						url: "/dashboard/orders/guest",
						icon: User_x
					}
				]
			},
			{
				title: "Deliveries",
				url: "/dashboard/deliveries",
				icon: Truck
			},
			{
				title: "Reports",
				url: "/dashboard/reports",
				icon: Chart_area,
				items: [
					{
						title: "Subscriptions",
						url: "/dashboard/reports/subscriptions",
						icon: Refresh_cw
					},
					{
						title: "Deliveries",
						url: "/dashboard/reports/deliveries",
						icon: Truck
					},
					{
						title: "Orders",
						url: "/dashboard/reports/orders",
						icon: Gift
					}
				]
			},
			{
				title: "Admin Panel",
				url: "/dashboard/admin-panel",
				icon: User_round_cog,
				items: [
					{
						title: "Users",
						url: "/dashboard/admin-panel/users",
						icon: Users
					},
					{
						title: "Roles",
						url: "/dashboard/admin-panel/roles",
						icon: Users
					},
					{
						title: "Add-ons",
						url: "/dashboard/admin-panel/addons",
						icon: Sheet$1
					}
				]
			}
		];
		useSidebar();
		if (Sidebar) {
			$$renderer.push("<!--[-->");
			Sidebar($$renderer, spread_props([
				{ collapsible: "offcanvas" },
				restProps,
				{
					children: ($$renderer) => {
						if (Sidebar_content) {
							$$renderer.push("<!--[-->");
							Sidebar_content($$renderer, {
								class: `z-9999! h-full
  [scrollbar-width:thin] [scrollbar-color:#a3a3a3_transparent]
  overflow-y-scroll
  pt-4
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-thumb]:bg-gray-400
  [&::-webkit-scrollbar-thumb:hover]:bg-gray-500 [&::-webkit-scrollbar-track]:bg-transparent
  ${stringify$1(bgGradient)}
`,
								children: ($$renderer) => {
									if (Sidebar_group) {
										$$renderer.push("<!--[-->");
										Sidebar_group($$renderer, {
											children: ($$renderer) => {
												if (Sidebar_group_label) {
													$$renderer.push("<!--[-->");
													Sidebar_group_label($$renderer, {
														children: ($$renderer) => {
															$$renderer.push(`<div class="logo-row svelte-uukkgi"><a href="/" class="logo svelte-uukkgi">G O T E R A</a></div>`);
														},
														$$slots: { default: true }
													});
													$$renderer.push("<!--]-->");
												} else {
													$$renderer.push("<!--[!-->");
													$$renderer.push("<!--]-->");
												}
												$$renderer.push(` `);
												if (Sidebar_group_content) {
													$$renderer.push("<!--[-->");
													Sidebar_group_content($$renderer, {
														class: "my-4",
														children: ($$renderer) => {
															NavMain($$renderer, { items: navigation });
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
						if (Sidebar_footer) {
							$$renderer.push("<!--[-->");
							Sidebar_footer($$renderer, { class: "flex flex-row bg-white dark:bg-black" });
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
	});
}
//#endregion
//#region src/lib/components/DarkMode.svelte
function DarkMode($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		if (Dropdown_menu) {
			$$renderer.push("<!--[-->");
			Dropdown_menu($$renderer, {
				children: ($$renderer) => {
					if (Dropdown_menu_trigger) {
						$$renderer.push("<!--[-->");
						Dropdown_menu_trigger($$renderer, {
							class: buttonVariants({
								variant: "outline",
								size: "icon"
							}),
							children: ($$renderer) => {
								Sun($$renderer, { class: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0" });
								$$renderer.push(`<!----> `);
								Moon($$renderer, { class: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100" });
								$$renderer.push(`<!----> <span class="sr-only">Toggle theme</span>`);
							},
							$$slots: { default: true }
						});
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
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
										onclick: () => setMode("light"),
										children: ($$renderer) => {
											$$renderer.push(`<!---->Light`);
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
										onclick: () => setMode("dark"),
										children: ($$renderer) => {
											$$renderer.push(`<!---->Dark`);
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
										onclick: () => resetMode(),
										children: ($$renderer) => {
											$$renderer.push(`<!---->System`);
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
//#region src/lib/components/Search.svelte
function Search_1($$renderer) {
	let isOpen = false;
	let list = [
		{
			label: "Dashboard",
			path: "/dashboard"
		},
		{
			label: "Customers",
			path: "/dashboard/customers"
		},
		{
			label: "Plans",
			path: "/dashboard/plans"
		},
		{
			label: "Orders",
			path: "/dashboard/orders"
		},
		{
			label: "Subscription Orders",
			path: "/dashboard/orders/subscriptions"
		},
		{
			label: "One-Time & Gift Orders",
			path: "/dashboard/orders/one-time"
		},
		{
			label: "Guest Orders",
			path: "/dashboard/orders/guest"
		},
		{
			label: "Deliveries",
			path: "/dashboard/deliveries"
		},
		{
			label: "Reports",
			path: "/dashboard/reports"
		},
		{
			label: "Subscriptions Report",
			path: "/dashboard/reports/subscriptions"
		},
		{
			label: "Deliveries Report",
			path: "/dashboard/reports/deliveries"
		},
		{
			label: "Orders Report",
			path: "/dashboard/reports/orders"
		},
		{
			label: "Admin Panel",
			path: "/dashboard/admin-panel"
		},
		{
			label: "Users",
			path: "/dashboard/admin-panel/users"
		},
		{
			label: "Add User",
			path: "/dashboard/admin-panel/users/add-users"
		},
		{
			label: "Roles",
			path: "/dashboard/admin-panel/roles"
		},
		{
			label: "Add Role",
			path: "/dashboard/admin-panel/roles/add-roles"
		},
		{
			label: "Add-ons",
			path: "/dashboard/admin-panel/addons"
		}
	];
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
							class: "w-auto px-4",
							title: "Search for Pages",
							children: ($$renderer) => {
								Search($$renderer, {});
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
														$$renderer.push(`<!---->Search the whole site`);
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
										$$renderer.push(`<h5 class="text-center">Search Anything</h5> `);
										if (Command) {
											$$renderer.push("<!--[-->");
											Command($$renderer, {
												class: "rounded-lg shadow-md",
												children: ($$renderer) => {
													if (Command_input) {
														$$renderer.push("<!--[-->");
														Command_input($$renderer, {
															placeholder: "Type a command or search...",
															type: "search"
														});
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
																			$$renderer.push(`<!---->No results found.`);
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
																		heading: "Suggestions",
																		children: ($$renderer) => {
																			$$renderer.push(`<!--[-->`);
																			const each_array = ensure_array_like(list);
																			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
																				let item = each_array[$$index];
																				if (Command_item) {
																					$$renderer.push("<!--[-->");
																					Command_item($$renderer, {
																						children: ($$renderer) => {
																							Disc($$renderer, {});
																							$$renderer.push(`<!----> <a${attr("href", item.path)}>${escape_html(item.label)}</a>`);
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
}
//#endregion
//#region src/lib/components/ui/avatar/avatar.svelte
function Avatar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, loadingStatus = "loading", size = "default", class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Avatar$1) {
				$$renderer.push("<!--[-->");
				Avatar$1($$renderer, spread_props([
					{
						"data-slot": "avatar",
						"data-size": size,
						class: cn("size-8 rounded-full after:rounded-full data-[size=lg]:size-10 data-[size=sm]:size-6 after:border-border group/avatar relative flex shrink-0 select-none after:absolute after:inset-0 after:border after:mix-blend-darken dark:after:mix-blend-lighten", className)
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
						get loadingStatus() {
							return loadingStatus;
						},
						set loadingStatus($$value) {
							loadingStatus = $$value;
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
			loadingStatus
		});
	});
}
//#endregion
//#region src/lib/components/ui/avatar/avatar-fallback.svelte
function Avatar_fallback($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { ref = null, class: className, $$slots, $$events, ...restProps } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Avatar_fallback$1) {
				$$renderer.push("<!--[-->");
				Avatar_fallback$1($$renderer, spread_props([
					{
						"data-slot": "avatar-fallback",
						class: cn("bg-muted text-muted-foreground rounded-full flex size-full items-center justify-center text-sm group-data-[size=sm]/avatar:text-xs", className)
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
//#region src/lib/components/AvatarSettings.svelte
function AvatarSettings($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let deleting = false;
		if (Dropdown_menu) {
			$$renderer.push("<!--[-->");
			Dropdown_menu($$renderer, {
				children: ($$renderer) => {
					if (Dropdown_menu_trigger) {
						$$renderer.push("<!--[-->");
						Dropdown_menu_trigger($$renderer, {
							children: ($$renderer) => {
								if (Avatar) {
									$$renderer.push("<!--[-->");
									Avatar($$renderer, {
										children: ($$renderer) => {
											if (Avatar_fallback) {
												$$renderer.push("<!--[-->");
												Avatar_fallback($$renderer, {
													class: "flex items-center justify-center rounded-full border-0 bg-primary font-medium text-primary-foreground",
													children: ($$renderer) => {
														$$renderer.push(`<!---->${escape_html(data?.[0]?.toUpperCase() ?? "N")}`);
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
					if (Dropdown_menu_content) {
						$$renderer.push("<!--[-->");
						Dropdown_menu_content($$renderer, {
							class: "p-2",
							children: ($$renderer) => {
								if (Dropdown_menu_group) {
									$$renderer.push("<!--[-->");
									Dropdown_menu_group($$renderer, {
										children: ($$renderer) => {
											if (Dropdown_menu_label) {
												$$renderer.push("<!--[-->");
												Dropdown_menu_label($$renderer, {
													children: ($$renderer) => {
														$$renderer.push(`<!---->My Account`);
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
											if (Dropdown_menu_item) {
												$$renderer.push("<!--[-->");
												Dropdown_menu_item($$renderer, {
													onclick: () => goto(),
													children: ($$renderer) => {
														User($$renderer, {});
														$$renderer.push(`<!----> My Account`);
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
													onclick: () => goto(),
													children: ($$renderer) => {
														Key_round($$renderer, {});
														$$renderer.push(`<!----> Change Password`);
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
													children: ($$renderer) => {
														$$renderer.push(`<form method="post" action="/dashboard/?/logout"><button type="submit"${attr("disabled", deleting, true)} class="flex flex-row items-center justify-center gap-2">`);
														$$renderer.push("<!--[-1-->");
														Log_out($$renderer, { class: "" });
														$$renderer.push(`<!----> Logout`);
														$$renderer.push(`<!--]--></button></form>`);
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
	});
}
//#endregion
//#region src/routes/dashboard/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { children, data } = $$props;
		$$renderer.push(`<div class="dashboard-theme bg-background text-foreground">`);
		if (Sidebar_provider) {
			$$renderer.push("<!--[-->");
			Sidebar_provider($$renderer, {
				children: ($$renderer) => {
					App_sidebar($$renderer, {
						messageNumber: data?.messageNumber,
						ordersNumber: data?.ordersNumber
					});
					$$renderer.push(`<!----> <main class="min-w-0 flex-1 px-4"><div class="absolute top-3 left-3 z-10 flex w-[95%] flex-row justify-between rounded-lg border border-border bg-background/90 p-3 pr-5 align-middle backdrop-blur-md lg:sticky lg:w-full lg:pr-4">`);
					if (Sidebar_trigger) {
						$$renderer.push("<!--[-->");
						Sidebar_trigger($$renderer, { class: "rounded-lg border border-border bg-card p-4" });
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
					$$renderer.push(` <div class="flex flex-row items-center gap-4">`);
					Search_1($$renderer);
					$$renderer.push(`<!----> `);
					DarkMode($$renderer);
					$$renderer.push(`<!----> `);
					AvatarSettings($$renderer, { data: data?.name });
					$$renderer.push(`<!----></div></div> <div class="p-4 pt-28 pb-24 lg:pt-8 lg:pb-8">`);
					children?.($$renderer);
					$$renderer.push(`<!----></div></main>`);
				},
				$$slots: { default: true }
			});
			$$renderer.push("<!--]-->");
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push("<!--]-->");
		}
		$$renderer.push(`</div>`);
	});
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte.js-C-QrA457.js.map
