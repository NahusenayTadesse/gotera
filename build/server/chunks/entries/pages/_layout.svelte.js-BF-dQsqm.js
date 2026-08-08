import { a0 as head, a9 as escape_html, aa as attr_class, $ as attr, ab as stringify$1, a4 as ensure_array_like, a2 as attributes, a3 as clsx$1, a7 as bind_props, T as derived, a6 as spread_props, I as hasContext, J as getContext, F as setContext, E as run, ac as attr_style } from '../../chunks/server.js-CPNQ0GBv.js';
import '../../chunks/routing.js-CU5UDpt8.js';
import '../../chunks/internal2.js-CNjKCACj.js';
import '../../chunks/utils.js-BQt5v-8G.js';
import { h as getLocale, l as locales, j as setLocale } from '../../chunks/runtime.js-CYqc9Mf9.js';
import { M as Mode_watcher } from '../../chunks/dist.js-B83-UFht.js';
import { c as createSubscriber } from '../../chunks/scroll-lock.js-DAwGTwcu.js';
import { S as SonnerState, t as toastState, c as cn } from '../../chunks/toast-state.svelte.js-B2UfxrKz.js';
import { c as beforeNavigate, b as afterNavigate, i as invalidateAll } from '../../chunks/client.js-7a-rpZlk.js';
import { p as page } from '../../chunks/state.js-BDNoTQbo.js';
import { I as Icon } from '../../chunks/Icon.js-C-2f-rrd.js';
import { D as Dropdown_menu, a as Dropdown_menu_trigger, b as Dropdown_menu_content, c as Dropdown_menu_item } from '../../chunks/dropdown-menu.js-BjUEFyFe.js';
import { B as Button } from '../../chunks/button.js-DMlVoc1I.js';
import '../../chunks/shared.js-CgqsOrws.js';
import '../../chunks/legacy-client.js-CYlmvPew.js';
import '../../chunks/index-server.js-C9rOfj9g.js';
import '../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../chunks/create-id.js-DpR0oe6q.js';
import '../../chunks/exports.js-BT-QlP_6.js';
import '../../chunks/minus.js-ESxlDJzH.js';
import '../../chunks/popper-layer-force-mount.js-CzkC2vS6.js';
import '../../chunks/menu.js-CrFfA9Yr.js';
import '../../chunks/utils2.js-BChetszu.js';

//#region node_modules/svelte-sonner/dist/Loader.svelte
var bars = Array(12).fill(0);
function Loader($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { visible, class: className } = $$props;
		$$renderer.push(`<div${attr_class(clsx$1(["sonner-loading-wrapper", className].filter(Boolean).join(" ")))}${attr("data-visible", visible)}><div class="sonner-spinner"><!--[-->`);
		const each_array = ensure_array_like(bars);
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			each_array[i];
			$$renderer.push(`<div class="sonner-loading-bar"></div>`);
		}
		$$renderer.push(`<!--]--></div></div>`);
	});
}
//#endregion
//#region node_modules/svelte-sonner/node_modules/runed/dist/internal/configurable-globals.js
var defaultWindow = void 0;
//#endregion
//#region node_modules/svelte-sonner/node_modules/runed/dist/internal/utils/dom.js
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
//#region node_modules/svelte-sonner/node_modules/runed/dist/utilities/active-element/active-element.svelte.js
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
//#region node_modules/svelte-sonner/node_modules/runed/dist/utilities/context/context.js
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
var sonnerContext = new Context("<Toaster/>");
//#endregion
//#region node_modules/svelte-sonner/dist/types.js
function isAction(action) {
	return action.label !== void 0;
}
var GAP$1 = 14;
var TIME_BEFORE_UNMOUNT = 200;
var DEFAULT_TOAST_CLASSES = {
	toast: "",
	title: "",
	description: "",
	loader: "",
	closeButton: "",
	cancelButton: "",
	actionButton: "",
	action: "",
	warning: "",
	error: "",
	success: "",
	default: "",
	info: "",
	loading: ""
};
function Toast($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { toast, index, expanded, invert: invertFromToaster, position, visibleToasts, expandByDefault, closeButton: closeButtonFromToaster, interacting, cancelButtonStyle = "", actionButtonStyle = "", duration: durationFromToaster, descriptionClass = "", classes: classesProp, unstyled = false, loadingIcon, successIcon, errorIcon, warningIcon, closeIcon, infoIcon, defaultRichColors = false, swipeDirections: swipeDirectionsProp, closeButtonAriaLabel, pauseWhenPageIsHidden, $$slots, $$events, ...restProps } = $$props;
		const defaultClasses = { ...DEFAULT_TOAST_CLASSES };
		let mounted = false;
		let removed = false;
		let swiping = false;
		let swipeOut = false;
		let isSwiped = false;
		let offsetBeforeRemove = 0;
		let initialHeight = 0;
		toast.duration;
		let swipeOutDirection = null;
		const isFront = derived(() => index === 0);
		const isVisible = derived(() => index + 1 <= visibleToasts);
		const toastType = derived(() => toast.type);
		const dismissible = derived(() => toast.dismissible !== void 0 ? toast.dismissible !== false : toast.dismissable !== false);
		const toastClass = derived(() => toast.class || "");
		const toastDescriptionClass = derived(() => toast.descriptionClass || "");
		const heightIndex = derived(() => toastState.heights.findIndex((height) => height.toastId === toast.id) || 0);
		const closeButton = derived(() => toast.closeButton ?? closeButtonFromToaster);
		const coords = derived(() => position.split("-"));
		const toastsHeightBefore = derived(() => toastState.heights.reduce((prev, curr, reducerIndex) => {
			if (reducerIndex >= heightIndex()) return prev;
			return prev + curr.height;
		}, 0));
		const invert = derived(() => toast.invert || invertFromToaster);
		const disabled = derived(() => toastType() === "loading");
		const classes = derived(() => ({
			...defaultClasses,
			...classesProp
		}));
		const offset = derived(() => Math.round(heightIndex() * GAP$1 + toastsHeightBefore()));
		function deleteToast() {
			removed = true;
			offsetBeforeRemove = offset();
			toastState.removeHeight(toast.id);
			setTimeout(() => {
				toastState.remove(toast.id);
			}, TIME_BEFORE_UNMOUNT);
		}
		const icon = derived(() => {
			if (toast.icon) return toast.icon;
			if (toastType() === "success") return successIcon;
			if (toastType() === "error") return errorIcon;
			if (toastType() === "warning") return warningIcon;
			if (toastType() === "info") return infoIcon;
			if (toastType() === "loading") return loadingIcon;
			return null;
		});
		function LoadingIcon($$renderer) {
			if (loadingIcon) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div${attr_class(clsx$1(cn(classes()?.loader, toast?.classes?.loader, "sonner-loader")))}${attr("data-visible", toastType() === "loading")}>`);
				loadingIcon($$renderer);
				$$renderer.push(`<!----></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				Loader($$renderer, {
					class: cn(classes()?.loader, toast.classes?.loader),
					visible: toastType() === "loading"
				});
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<li${attr("tabindex", 0)}${attr_class(clsx$1(cn(restProps.class, toastClass(), classes()?.toast, toast?.classes?.toast, classes()?.[toastType()], toast?.classes?.[toastType()])))}${attr("aria-live", toast.important ? "assertive" : "polite")} aria-atomic="true" data-sonner-toast=""${attr("data-rich-colors", toast.richColors ?? defaultRichColors)}${attr("data-styled", !(toast.component || toast.unstyled || unstyled))}${attr("data-mounted", mounted)}${attr("data-promise", Boolean(toast.promise))}${attr("data-swiped", isSwiped)}${attr("data-removed", removed)}${attr("data-visible", isVisible())}${attr("data-y-position", coords()[0])}${attr("data-x-position", coords()[1])}${attr("data-index", index)}${attr("data-front", isFront())}${attr("data-swiping", swiping)}${attr("data-dismissible", dismissible())}${attr("data-type", toastType())}${attr("data-invert", invert())}${attr("data-swipe-out", swipeOut)}${attr("data-swipe-direction", swipeOutDirection)}${attr("data-expanded", Boolean(expanded || expandByDefault && mounted))}${attr_style(`${restProps.style} ${toast.style}`, {
			"--index": index,
			"--toasts-before": index,
			"--z-index": toastState.toasts.length - index,
			"--offset": `${removed ? offsetBeforeRemove : offset()}px`,
			"--initial-height": expandByDefault ? "auto" : `${initialHeight}px`
		})}>`);
		if (closeButton() && !toast.component && toastType() !== "loading" && closeIcon !== null) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button${attr("aria-label", closeButtonAriaLabel)}${attr("data-disabled", disabled())} data-close-button=""${attr_class(clsx$1(cn(classes()?.closeButton, toast?.classes?.closeButton)))}>`);
			closeIcon?.($$renderer);
			$$renderer.push(`<!----></button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (toast.component) {
			$$renderer.push("<!--[0-->");
			const Component = toast.component;
			if (Component) {
				$$renderer.push("<!--[-->");
				Component($$renderer, spread_props([toast.componentProps, { closeToast: deleteToast }]));
				$$renderer.push("<!--]-->");
			} else {
				$$renderer.push("<!--[!-->");
				$$renderer.push("<!--]-->");
			}
		} else {
			$$renderer.push("<!--[-1-->");
			if ((toastType() || toast.icon || toast.promise) && toast.icon !== null && (icon() !== null || toast.icon)) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div data-icon=""${attr_class(clsx$1(cn(classes()?.icon, toast?.classes?.icon)))}>`);
				if (toast.promise || toastType() === "loading") {
					$$renderer.push("<!--[0-->");
					if (toast.icon) {
						$$renderer.push("<!--[0-->");
						if (toast.icon) {
							$$renderer.push("<!--[-->");
							toast.icon($$renderer, {});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					} else {
						$$renderer.push("<!--[-1-->");
						LoadingIcon($$renderer);
					}
					$$renderer.push(`<!--]-->`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (toast.type !== "loading") {
					$$renderer.push("<!--[0-->");
					if (toast.icon) {
						$$renderer.push("<!--[0-->");
						if (toast.icon) {
							$$renderer.push("<!--[-->");
							toast.icon($$renderer, {});
							$$renderer.push("<!--]-->");
						} else {
							$$renderer.push("<!--[!-->");
							$$renderer.push("<!--]-->");
						}
					} else if (toastType() === "success") {
						$$renderer.push("<!--[1-->");
						successIcon?.($$renderer);
						$$renderer.push(`<!---->`);
					} else if (toastType() === "error") {
						$$renderer.push("<!--[2-->");
						errorIcon?.($$renderer);
						$$renderer.push(`<!---->`);
					} else if (toastType() === "warning") {
						$$renderer.push("<!--[3-->");
						warningIcon?.($$renderer);
						$$renderer.push(`<!---->`);
					} else if (toastType() === "info") {
						$$renderer.push("<!--[4-->");
						infoIcon?.($$renderer);
						$$renderer.push(`<!---->`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]-->`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div data-content=""${attr_class(clsx$1(cn(classes()?.content, toast?.classes?.content)))}><div data-title=""${attr_class(clsx$1(cn(classes()?.title, toast?.classes?.title)))}>`);
			if (toast.title) {
				$$renderer.push("<!--[0-->");
				if (typeof toast.title !== "string") {
					$$renderer.push("<!--[0-->");
					const Title = toast.title;
					if (Title) {
						$$renderer.push("<!--[-->");
						Title($$renderer, spread_props([toast.componentProps]));
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`${escape_html(toast.title)}`);
				}
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (toast.description) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div data-description=""${attr_class(clsx$1(cn(descriptionClass, toastDescriptionClass(), classes()?.description, toast.classes?.description)))}>`);
				if (typeof toast.description !== "string") {
					$$renderer.push("<!--[0-->");
					const Description = toast.description;
					if (Description) {
						$$renderer.push("<!--[-->");
						Description($$renderer, spread_props([toast.componentProps]));
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`${escape_html(toast.description)}`);
				}
				$$renderer.push(`<!--]--></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (toast.cancel) {
				$$renderer.push("<!--[0-->");
				if (typeof toast.cancel === "function") {
					$$renderer.push("<!--[0-->");
					if (toast.cancel) {
						$$renderer.push("<!--[-->");
						toast.cancel($$renderer, {});
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				} else if (isAction(toast.cancel)) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<button data-button="" data-cancel=""${attr_style(toast.cancelButtonStyle ?? cancelButtonStyle)}${attr_class(clsx$1(cn(classes()?.cancelButton, toast?.classes?.cancelButton)))}>${escape_html(toast.cancel.label)}</button>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (toast.action) {
				$$renderer.push("<!--[0-->");
				if (typeof toast.action === "function") {
					$$renderer.push("<!--[0-->");
					if (toast.action) {
						$$renderer.push("<!--[-->");
						toast.action($$renderer, {});
						$$renderer.push("<!--]-->");
					} else {
						$$renderer.push("<!--[!-->");
						$$renderer.push("<!--]-->");
					}
				} else if (isAction(toast.action)) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<button data-button=""${attr_style(toast.actionButtonStyle ?? actionButtonStyle)}${attr_class(clsx$1(cn(classes()?.actionButton, toast?.classes?.actionButton)))}>${escape_html(toast.action.label)}</button>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]-->`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></li>`);
	});
}
//#endregion
//#region node_modules/svelte-sonner/dist/icons/SuccessIcon.svelte
function SuccessIcon($$renderer) {
	$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-success-icon=""><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path></svg>`);
}
//#endregion
//#region node_modules/svelte-sonner/dist/icons/ErrorIcon.svelte
function ErrorIcon($$renderer) {
	$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-error-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>`);
}
//#endregion
//#region node_modules/svelte-sonner/dist/icons/WarningIcon.svelte
function WarningIcon($$renderer) {
	$$renderer.push(`<svg viewBox="0 0 64 64" fill="currentColor" height="20" width="20" data-sonner-warning-icon="" xmlns="http://www.w3.org/2000/svg"><path d="M32.427,7.987c2.183,0.124 4,1.165 5.096,3.281l17.936,36.208c1.739,3.66 -0.954,8.585 -5.373,8.656l-36.119,0c-4.022,-0.064 -7.322,-4.631 -5.352,-8.696l18.271,-36.207c0.342,-0.65 0.498,-0.838 0.793,-1.179c1.186,-1.375 2.483,-2.111 4.748,-2.063Zm-0.295,3.997c-0.687,0.034 -1.316,0.419 -1.659,1.017c-6.312,11.979 -12.397,24.081 -18.301,36.267c-0.546,1.225 0.391,2.797 1.762,2.863c12.06,0.195 24.125,0.195 36.185,0c1.325,-0.064 2.321,-1.584 1.769,-2.85c-5.793,-12.184 -11.765,-24.286 -17.966,-36.267c-0.366,-0.651 -0.903,-1.042 -1.79,-1.03Z"></path><path d="M33.631,40.581l-3.348,0l-0.368,-16.449l4.1,0l-0.384,16.449Zm-3.828,5.03c0,-0.609 0.197,-1.113 0.592,-1.514c0.396,-0.4 0.935,-0.601 1.618,-0.601c0.684,0 1.223,0.201 1.618,0.601c0.395,0.401 0.593,0.905 0.593,1.514c0,0.587 -0.193,1.078 -0.577,1.473c-0.385,0.395 -0.929,0.593 -1.634,0.593c-0.705,0 -1.249,-0.198 -1.634,-0.593c-0.384,-0.395 -0.576,-0.886 -0.576,-1.473Z"></path></svg>`);
}
//#endregion
//#region node_modules/svelte-sonner/dist/icons/InfoIcon.svelte
function InfoIcon($$renderer) {
	$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" height="20" width="20" data-sonner-info-icon=""><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd"></path></svg>`);
}
//#endregion
//#region node_modules/svelte-sonner/dist/icons/CloseIcon.svelte
function CloseIcon($$renderer) {
	$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-sonner-close-icon=""><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`);
}
//#endregion
//#region node_modules/svelte-sonner/dist/Toaster.svelte
var VISIBLE_TOASTS_AMOUNT = 3;
var VIEWPORT_OFFSET = "24px";
var MOBILE_VIEWPORT_OFFSET = "16px";
var TOAST_LIFETIME = 4e3;
var TOAST_WIDTH = 356;
var GAP = 14;
var DARK = "dark";
var LIGHT = "light";
function getOffsetObject(defaultOffset, mobileOffset) {
	const styles = {};
	[defaultOffset, mobileOffset].forEach((offset, index) => {
		const isMobile = index === 1;
		const prefix = isMobile ? "--mobile-offset" : "--offset";
		const defaultValue = isMobile ? MOBILE_VIEWPORT_OFFSET : VIEWPORT_OFFSET;
		function assignAll(offset) {
			[
				"top",
				"right",
				"bottom",
				"left"
			].forEach((key) => {
				styles[`${prefix}-${key}`] = typeof offset === "number" ? `${offset}px` : offset;
			});
		}
		if (typeof offset === "number" || typeof offset === "string") assignAll(offset);
		else if (typeof offset === "object") [
			"top",
			"right",
			"bottom",
			"left"
		].forEach((key) => {
			const value = offset[key];
			if (value === void 0) styles[`${prefix}-${key}`] = defaultValue;
			else styles[`${prefix}-${key}`] = typeof value === "number" ? `${value}px` : value;
		});
		else assignAll(defaultValue);
	});
	return styles;
}
function Toaster($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		function getInitialTheme(t) {
			if (t !== "system") return t;
			if (typeof window !== "undefined") {
				if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return DARK;
				return LIGHT;
			}
			return LIGHT;
		}
		let { invert = false, position = "bottom-right", hotkey = ["altKey", "KeyT"], expand = false, closeButton = false, offset = VIEWPORT_OFFSET, mobileOffset = MOBILE_VIEWPORT_OFFSET, theme = "light", richColors = false, duration = TOAST_LIFETIME, visibleToasts = VISIBLE_TOASTS_AMOUNT, toastOptions = {}, dir = "auto", gap = GAP, pauseWhenPageIsHidden = false, loadingIcon: loadingIconProp, successIcon: successIconProp, errorIcon: errorIconProp, warningIcon: warningIconProp, closeIcon: closeIconProp, infoIcon: infoIconProp, containerAriaLabel = "Notifications", class: className, closeButtonAriaLabel = "Close toast", onblur, onfocus, onmouseenter, onmousemove, onmouseleave, ondragend, onpointerdown, onpointerup, $$slots, $$events, ...restProps } = $$props;
		function getDocumentDirection() {
			if (dir !== "auto") return dir;
			if (typeof window === "undefined") return "ltr";
			if (typeof document === "undefined") return "ltr";
			const dirAttribute = document.documentElement.getAttribute("dir");
			if (dirAttribute === "auto" || !dirAttribute) {
				run(() => dir = window.getComputedStyle(document.documentElement).direction ?? "ltr");
				return dir;
			}
			run(() => dir = dirAttribute);
			return dirAttribute;
		}
		const possiblePositions = derived(() => Array.from(new Set([position, ...toastState.toasts.filter((toast) => toast.position).map((toast) => toast.position)].filter(Boolean))));
		let expanded = false;
		let interacting = false;
		let actualTheme = getInitialTheme(theme);
		const hotkeyLabel = derived(() => hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, ""));
		sonnerContext.set(new SonnerState());
		$$renderer.push(`<section${attr("aria-label", `${stringify$1(containerAriaLabel)} ${stringify$1(hotkeyLabel())}`)}${attr("tabindex", -1)} aria-live="polite" aria-relevant="additions text" aria-atomic="false" class="svelte-nbs0zk">`);
		if (toastState.toasts.length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<!--[-->`);
			const each_array = ensure_array_like(possiblePositions());
			for (let index = 0, $$length = each_array.length; index < $$length; index++) {
				let position = each_array[index];
				const [y, x] = position.split("-");
				const offsetObject = getOffsetObject(offset, mobileOffset);
				$$renderer.push(`<ol${attributes({
					tabindex: -1,
					dir: getDocumentDirection(),
					class: clsx$1(className),
					"data-sonner-toaster": true,
					"data-sonner-theme": actualTheme,
					"data-y-position": y,
					"data-x-position": x,
					style: restProps.style,
					...restProps
				}, "svelte-nbs0zk", void 0, {
					"--front-toast-height": `${toastState.heights[0]?.height}px`,
					"--width": `${TOAST_WIDTH}px`,
					"--gap": `${gap}px`,
					"--offset-top": offsetObject["--offset-top"],
					"--offset-right": offsetObject["--offset-right"],
					"--offset-bottom": offsetObject["--offset-bottom"],
					"--offset-left": offsetObject["--offset-left"],
					"--mobile-offset-top": offsetObject["--mobile-offset-top"],
					"--mobile-offset-right": offsetObject["--mobile-offset-right"],
					"--mobile-offset-bottom": offsetObject["--mobile-offset-bottom"],
					"--mobile-offset-left": offsetObject["--mobile-offset-left"]
				})}><!--[-->`);
				const each_array_1 = ensure_array_like(toastState.toasts.filter((toast) => !toast.position && index === 0 || toast.position === position));
				for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
					let toast = each_array_1[index];
					{
						function successIcon($$renderer) {
							if (successIconProp) {
								$$renderer.push("<!--[0-->");
								successIconProp?.($$renderer);
								$$renderer.push(`<!---->`);
							} else if (successIconProp !== null) {
								$$renderer.push("<!--[1-->");
								SuccessIcon($$renderer);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]-->`);
						}
						function errorIcon($$renderer) {
							if (errorIconProp) {
								$$renderer.push("<!--[0-->");
								errorIconProp?.($$renderer);
								$$renderer.push(`<!---->`);
							} else if (errorIconProp !== null) {
								$$renderer.push("<!--[1-->");
								ErrorIcon($$renderer);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]-->`);
						}
						function warningIcon($$renderer) {
							if (warningIconProp) {
								$$renderer.push("<!--[0-->");
								warningIconProp?.($$renderer);
								$$renderer.push(`<!---->`);
							} else if (warningIconProp !== null) {
								$$renderer.push("<!--[1-->");
								WarningIcon($$renderer);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]-->`);
						}
						function infoIcon($$renderer) {
							if (infoIconProp) {
								$$renderer.push("<!--[0-->");
								infoIconProp?.($$renderer);
								$$renderer.push(`<!---->`);
							} else if (infoIconProp !== null) {
								$$renderer.push("<!--[1-->");
								InfoIcon($$renderer);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]-->`);
						}
						function closeIcon($$renderer) {
							if (closeIconProp) {
								$$renderer.push("<!--[0-->");
								closeIconProp?.($$renderer);
								$$renderer.push(`<!---->`);
							} else if (closeIconProp !== null) {
								$$renderer.push("<!--[1-->");
								CloseIcon($$renderer);
							} else $$renderer.push("<!--[-1-->");
							$$renderer.push(`<!--]-->`);
						}
						Toast($$renderer, {
							index,
							toast,
							defaultRichColors: richColors,
							duration: toastOptions?.duration ?? duration,
							class: toastOptions?.class ?? "",
							descriptionClass: toastOptions?.descriptionClass || "",
							invert,
							visibleToasts,
							closeButton,
							interacting,
							position,
							style: toastOptions?.style ?? "",
							classes: toastOptions.classes || {},
							unstyled: toastOptions.unstyled ?? false,
							cancelButtonStyle: toastOptions?.cancelButtonStyle ?? "",
							actionButtonStyle: toastOptions?.actionButtonStyle ?? "",
							closeButtonAriaLabel: toastOptions?.closeButtonAriaLabel ?? closeButtonAriaLabel,
							expandByDefault: expand,
							expanded,
							pauseWhenPageIsHidden,
							loadingIcon: loadingIconProp,
							successIcon,
							errorIcon,
							warningIcon,
							infoIcon,
							closeIcon,
							$$slots: {
								successIcon: true,
								errorIcon: true,
								warningIcon: true,
								infoIcon: true,
								closeIcon: true
							}
						});
					}
				}
				$$renderer.push(`<!--]--></ol>`);
			}
			$$renderer.push(`<!--]-->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></section>`);
	});
}
//#endregion
//#region node_modules/@prgm/sveltekit-progress-bar/dist/ProgressBar.svelte
function ProgressBar($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { id = void 0, viewTransitionName = "sveltekit-progress-bar", busy = false, color = "currentColor", class: textColorClass = "", zIndex = 1, minimum: defaultMinimum = .08, maximum = .994, settleTime: defaultSettleTime = 700, intervalTime = 700, stepSizes = [
			0,
			.005,
			.01,
			.02
		], displayThresholdMs = 150, noNavigationProgress = false } = $$props;
		const getIncrement = (n) => {
			if (n >= 0 && n < .2) return .1;
			else if (n >= .2 && n < .5) return .04;
			else if (n >= .5 && n < .8) return .02;
			else if (n >= .8 && n < .99) return .005;
			return 0;
		};
		let running = false;
		let completed = false;
		let width = 0;
		let updater = null;
		/**
		* A timeout used to delay the display of the progress bar
		* (to prevent the progress bar from flashing in and out of display)
		*/
		let progressBarStartTimeout = null;
		const reset = (minimum = defaultMinimum) => {
			width = minimum;
			running = true;
		};
		/**
		* Continue the animation of the progress bar from whatever position it is in, using
		* a randomized step size to increment.
		*/
		const animate = () => {
			if (updater) clearInterval(updater);
			running = true;
			updater = setInterval(() => {
				const randomStep = stepSizes[Math.floor(Math.random() * stepSizes.length)] ?? 0;
				const step = getIncrement(width) + randomStep;
				if (width < maximum) width = width + step;
				if (width > maximum) {
					width = maximum;
					stop();
				}
			}, intervalTime);
		};
		/** Restart the bar at the minimum, and begin the auto-increment progress. */
		const start = (minimum) => {
			reset(minimum);
			animate();
		};
		/** Stop the progress bar from incrementing, but leave it visible. */
		const stop = () => {
			if (updater) clearInterval(updater);
		};
		/**
		* Moves the progress bar to the fully completed position, wait an appropriate
		* amount of time so the user can feel the completion, then hide and reset.
		*/
		const complete = (settleTime = defaultSettleTime) => {
			if (progressBarStartTimeout) {
				clearTimeout(progressBarStartTimeout);
				progressBarStartTimeout = null;
			}
			if (updater) clearInterval(updater);
			if (!running) return;
			width = 1;
			running = false;
			setTimeout(() => {
				completed = true;
				setTimeout(() => {
					completed = false;
					width = 0;
				}, settleTime);
			}, settleTime);
		};
		/** Stop the auto-increment functionality and manually set the width of the progress bar. */
		const setWidthRatio = (widthRatio) => {
			stop();
			width = widthRatio;
			completed = false;
			running = true;
		};
		const getState = () => {
			return {
				width,
				running,
				completed,
				color,
				defaultMinimum,
				maximum,
				defaultSettleTime,
				intervalTime,
				stepSizes
			};
		};
		const barStyle = derived(() => (color ? `background-color: ${color};` : "") + (width && width * 100 ? `width: ${width * 100}%;` : "") + `z-index: ${zIndex};view-transition-name: ${viewTransitionName}-bar;`);
		const leaderColorStyle = derived(() => (color ? `background-color: ${color}; color: ${color};` : "") + `z-index: ${zIndex + 1};view-transition-name: ${viewTransitionName}-leader;`);
		beforeNavigate((nav) => {
			if (progressBarStartTimeout) {
				clearTimeout(progressBarStartTimeout);
				progressBarStartTimeout = null;
			}
			if (noNavigationProgress) return;
			if (nav.to?.route.id) {
				if (displayThresholdMs > 0) progressBarStartTimeout = setTimeout(() => !noNavigationProgress && start(), displayThresholdMs);
				else start();
				nav.complete.catch().finally(() => {
					complete();
				});
			}
		});
		afterNavigate(() => {
			complete();
		});
		if (running || width > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<output${attr("id", id)} role="progressbar"${attr("aria-valuenow", width)}${attr("aria-valuemin", 0)}${attr("aria-valuemax", 1)}${attr_class(`svelte-progress-bar ${stringify$1(textColorClass)}`, "svelte-pe2dln", {
				"running": running,
				"svelte-progress-bar-hiding": completed
			})}${attr_style(barStyle())}>`);
			if (running) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="svelte-progress-bar-leader svelte-pe2dln"${attr_style(leaderColorStyle())}></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></output>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, {
			busy,
			reset,
			animate,
			start,
			stop,
			complete,
			setWidthRatio,
			getState
		});
	});
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/languages.svelte
function Languages($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "languages" },
		props,
		{ iconNode: [
			["path", { "d": "m5 8 6 6" }],
			["path", { "d": "m4 14 6-6 2-3" }],
			["path", { "d": "M2 5h12" }],
			["path", { "d": "M7 2h1" }],
			["path", { "d": "m22 22-5-10-5 10" }],
			["path", { "d": "M14 18h6" }]
		] }
	]));
}
//#endregion
//#region node_modules/@lucide/svelte/dist/icons/menu.svelte
function Menu($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "menu" },
		props,
		{ iconNode: [
			["path", { "d": "M4 5h16" }],
			["path", { "d": "M4 12h16" }],
			["path", { "d": "M4 19h16" }]
		] }
	]));
}
//#endregion
//#region src/lib/paraglide/messages/layout_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_TitleInputs */
var en_layout_title = () => {
	return `GOTERA — Premium Ethiopian Food`;
};
var am_layout_title = () => {
	return `ጎተራ — ልዩ የኢትዮጵያ ምግብ`;
};
/**
* | output |
* | --- |
* | "GOTERA — Premium Ethiopian Food" |
*
* @param {Layout_TitleInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_title = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_title();
	return en_layout_title();
});
//#endregion
//#region src/lib/paraglide/messages/layout_brand_logo.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Brand_LogoInputs */
var en_layout_brand_logo = () => {
	return `G O T E R A`;
};
var am_layout_brand_logo = () => {
	return `ጎ ተ ራ`;
};
/**
* | output |
* | --- |
* | "G O T E R A" |
*
* @param {Layout_Brand_LogoInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_brand_logo = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_brand_logo();
	return en_layout_brand_logo();
});
//#endregion
//#region src/lib/paraglide/messages/layout_nav_home.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Nav_HomeInputs */
var en_layout_nav_home = () => {
	return `Home`;
};
var am_layout_nav_home = () => {
	return `መነሻ`;
};
/**
* | output |
* | --- |
* | "Home" |
*
* @param {Layout_Nav_HomeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_nav_home = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_nav_home();
	return en_layout_nav_home();
});
//#endregion
//#region src/lib/paraglide/messages/layout_nav_subscribe.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Nav_SubscribeInputs */
var en_layout_nav_subscribe = () => {
	return `Subscribe`;
};
var am_layout_nav_subscribe = () => {
	return `ይመዝገቡ`;
};
/**
* | output |
* | --- |
* | "Subscribe" |
*
* @param {Layout_Nav_SubscribeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_nav_subscribe = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_nav_subscribe();
	return en_layout_nav_subscribe();
});
//#endregion
//#region src/lib/paraglide/messages/layout_nav_about.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Nav_AboutInputs */
var en_layout_nav_about = () => {
	return `About`;
};
var am_layout_nav_about = () => {
	return `ስለ እኛ`;
};
/**
* | output |
* | --- |
* | "About" |
*
* @param {Layout_Nav_AboutInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_nav_about = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_nav_about();
	return en_layout_nav_about();
});
//#endregion
//#region src/lib/paraglide/messages/layout_nav_signin.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Nav_SigninInputs */
var en_layout_nav_signin = () => {
	return `Sign In`;
};
var am_layout_nav_signin = () => {
	return `ግባ`;
};
/**
* | output |
* | --- |
* | "Sign In" |
*
* @param {Layout_Nav_SigninInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_nav_signin = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_nav_signin();
	return en_layout_nav_signin();
});
//#endregion
//#region src/lib/paraglide/messages/layout_nav_signup.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Nav_SignupInputs */
var en_layout_nav_signup = () => {
	return `Sign Up`;
};
var am_layout_nav_signup = () => {
	return `አካውንት ክፈት`;
};
/**
* | output |
* | --- |
* | "Sign Up" |
*
* @param {Layout_Nav_SignupInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_nav_signup = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_nav_signup();
	return en_layout_nav_signup();
});
//#endregion
//#region src/lib/paraglide/messages/layout_nav_plans.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Nav_PlansInputs */
var en_layout_nav_plans = () => {
	return `Plans`;
};
var am_layout_nav_plans = () => {
	return `ዕቅዶች`;
};
/**
* | output |
* | --- |
* | "Plans" |
*
* @param {Layout_Nav_PlansInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_nav_plans = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_nav_plans();
	return en_layout_nav_plans();
});
//#endregion
//#region src/lib/paraglide/messages/layout_nav_subscribe_btn.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Nav_Subscribe_BtnInputs */
var en_layout_nav_subscribe_btn = () => {
	return `Subscribe`;
};
var am_layout_nav_subscribe_btn = () => {
	return `ይመዝገቡ`;
};
/**
* | output |
* | --- |
* | "Subscribe" |
*
* @param {Layout_Nav_Subscribe_BtnInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_nav_subscribe_btn = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_nav_subscribe_btn();
	return en_layout_nav_subscribe_btn();
});
//#endregion
//#region src/lib/paraglide/messages/layout_nav_dashboard.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Nav_DashboardInputs */
var en_layout_nav_dashboard = () => {
	return `Dashboard`;
};
var am_layout_nav_dashboard = () => {
	return `ዳሽቦርድ`;
};
/**
* | output |
* | --- |
* | "Dashboard" |
*
* @param {Layout_Nav_DashboardInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_nav_dashboard = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_nav_dashboard();
	return en_layout_nav_dashboard();
});
//#endregion
//#region src/lib/paraglide/messages/layout_hero_nav_aria.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Hero_Nav_AriaInputs */
var en_layout_hero_nav_aria = () => {
	return `Site navigation`;
};
var am_layout_hero_nav_aria = () => {
	return `የገጽ ዳሰሳ`;
};
/**
* | output |
* | --- |
* | "Site navigation" |
*
* @param {Layout_Hero_Nav_AriaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_hero_nav_aria = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_hero_nav_aria();
	return en_layout_hero_nav_aria();
});
//#endregion
//#region src/lib/paraglide/messages/layout_hero_logo_aria.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Hero_Logo_AriaInputs */
var en_layout_hero_logo_aria = () => {
	return `GOTERA home`;
};
var am_layout_hero_logo_aria = () => {
	return `የጎተራ መነሻ ገጽ`;
};
/**
* | output |
* | --- |
* | "GOTERA home" |
*
* @param {Layout_Hero_Logo_AriaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_hero_logo_aria = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_hero_logo_aria();
	return en_layout_hero_logo_aria();
});
//#endregion
//#region src/lib/paraglide/messages/layout_menu_open_aria.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Menu_Open_AriaInputs */
var en_layout_menu_open_aria = () => {
	return `Open menu`;
};
var am_layout_menu_open_aria = () => {
	return `ምናሌ ክፈት`;
};
/**
* | output |
* | --- |
* | "Open menu" |
*
* @param {Layout_Menu_Open_AriaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_menu_open_aria = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_menu_open_aria();
	return en_layout_menu_open_aria();
});
//#endregion
//#region src/lib/paraglide/messages/layout_menu_close_aria.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Menu_Close_AriaInputs */
var en_layout_menu_close_aria = () => {
	return `Close menu`;
};
var am_layout_menu_close_aria = () => {
	return `ምናሌ ዝጋ`;
};
/**
* | output |
* | --- |
* | "Close menu" |
*
* @param {Layout_Menu_Close_AriaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_menu_close_aria = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_menu_close_aria();
	return en_layout_menu_close_aria();
});
//#endregion
//#region src/lib/paraglide/messages/layout_drawer_nav_aria.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Drawer_Nav_AriaInputs */
var en_layout_drawer_nav_aria = () => {
	return `Main menu`;
};
var am_layout_drawer_nav_aria = () => {
	return `ዋና ምናሌ`;
};
/**
* | output |
* | --- |
* | "Main menu" |
*
* @param {Layout_Drawer_Nav_AriaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_drawer_nav_aria = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_drawer_nav_aria();
	return en_layout_drawer_nav_aria();
});
//#endregion
//#region src/lib/paraglide/messages/layout_drawer_subscribe.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Drawer_SubscribeInputs */
var en_layout_drawer_subscribe = () => {
	return `Subscribe`;
};
var am_layout_drawer_subscribe = () => {
	return `ይመዝገቡ`;
};
/**
* | output |
* | --- |
* | "Subscribe" |
*
* @param {Layout_Drawer_SubscribeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_drawer_subscribe = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_drawer_subscribe();
	return en_layout_drawer_subscribe();
});
//#endregion
//#region src/lib/paraglide/messages/layout_drawer_about.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Drawer_AboutInputs */
var en_layout_drawer_about = () => {
	return `About`;
};
var am_layout_drawer_about = () => {
	return `ስለ እኛ`;
};
/**
* | output |
* | --- |
* | "About" |
*
* @param {Layout_Drawer_AboutInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_drawer_about = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_drawer_about();
	return en_layout_drawer_about();
});
//#endregion
//#region src/lib/paraglide/messages/layout_drawer_faq.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Drawer_FaqInputs */
var en_layout_drawer_faq = () => {
	return `FAQ`;
};
var am_layout_drawer_faq = () => {
	return `ተደጋጋሚ ጥያቄዎች`;
};
/**
* | output |
* | --- |
* | "FAQ" |
*
* @param {Layout_Drawer_FaqInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_drawer_faq = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_drawer_faq();
	return en_layout_drawer_faq();
});
//#endregion
//#region src/lib/paraglide/messages/layout_drawer_account.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Drawer_AccountInputs */
var en_layout_drawer_account = () => {
	return `My account`;
};
var am_layout_drawer_account = () => {
	return `መለያዬ`;
};
/**
* | output |
* | --- |
* | "My account" |
*
* @param {Layout_Drawer_AccountInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_drawer_account = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_drawer_account();
	return en_layout_drawer_account();
});
//#endregion
//#region src/lib/paraglide/messages/layout_drawer_signin.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Drawer_SigninInputs */
var en_layout_drawer_signin = () => {
	return `Signin`;
};
var am_layout_drawer_signin = () => {
	return `ግባ`;
};
/**
* | output |
* | --- |
* | "Signin" |
*
* @param {Layout_Drawer_SigninInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_drawer_signin = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_drawer_signin();
	return en_layout_drawer_signin();
});
//#endregion
//#region src/lib/paraglide/messages/layout_drawer_cta.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Drawer_CtaInputs */
var en_layout_drawer_cta = () => {
	return `Subscribe from £6.50 →`;
};
var am_layout_drawer_cta = () => {
	return `ከ£6.50 ጀምሮ ይመዝገቡ →`;
};
/**
* | output |
* | --- |
* | "Subscribe from £6.50 →" |
*
* @param {Layout_Drawer_CtaInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_drawer_cta = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_drawer_cta();
	return en_layout_drawer_cta();
});
//#endregion
//#region src/lib/paraglide/messages/layout_footer_tagline.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Footer_TaglineInputs */
var en_layout_footer_tagline = () => {
	return `Premium Ethiopian food · Delivered in London`;
};
var am_layout_footer_tagline = () => {
	return `ልዩ የኢትዮጵያ ምግብ · በለንደን ይደርሳል`;
};
/**
* | output |
* | --- |
* | "Premium Ethiopian food · Delivered in London" |
*
* @param {Layout_Footer_TaglineInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_footer_tagline = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_footer_tagline();
	return en_layout_footer_tagline();
});
//#endregion
//#region src/lib/paraglide/messages/layout_footer_site_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Footer_Site_HeadingInputs */
var en_layout_footer_site_heading = () => {
	return `Site`;
};
var am_layout_footer_site_heading = () => {
	return `ገጽ`;
};
/**
* | output |
* | --- |
* | "Site" |
*
* @param {Layout_Footer_Site_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_footer_site_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_footer_site_heading();
	return en_layout_footer_site_heading();
});
//#endregion
//#region src/lib/paraglide/messages/layout_footer_legal_heading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Footer_Legal_HeadingInputs */
var en_layout_footer_legal_heading = () => {
	return `Legal`;
};
var am_layout_footer_legal_heading = () => {
	return `ህጋዊ መረጃ`;
};
/**
* | output |
* | --- |
* | "Legal" |
*
* @param {Layout_Footer_Legal_HeadingInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_footer_legal_heading = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_footer_legal_heading();
	return en_layout_footer_legal_heading();
});
//#endregion
//#region src/lib/paraglide/messages/layout_footer_home.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Footer_HomeInputs */
var en_layout_footer_home = () => {
	return `Home`;
};
var am_layout_footer_home = () => {
	return `መነሻ`;
};
/**
* | output |
* | --- |
* | "Home" |
*
* @param {Layout_Footer_HomeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_footer_home = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_footer_home();
	return en_layout_footer_home();
});
//#endregion
//#region src/lib/paraglide/messages/layout_footer_subscribe.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Footer_SubscribeInputs */
var en_layout_footer_subscribe = () => {
	return `Subscribe`;
};
var am_layout_footer_subscribe = () => {
	return `ይመዝገቡ`;
};
/**
* | output |
* | --- |
* | "Subscribe" |
*
* @param {Layout_Footer_SubscribeInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_footer_subscribe = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_footer_subscribe();
	return en_layout_footer_subscribe();
});
//#endregion
//#region src/lib/paraglide/messages/layout_footer_about.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Footer_AboutInputs */
var en_layout_footer_about = () => {
	return `About`;
};
var am_layout_footer_about = () => {
	return `ስለ እኛ`;
};
/**
* | output |
* | --- |
* | "About" |
*
* @param {Layout_Footer_AboutInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_footer_about = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_footer_about();
	return en_layout_footer_about();
});
//#endregion
//#region src/lib/paraglide/messages/layout_footer_account.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Footer_AccountInputs */
var en_layout_footer_account = () => {
	return `Account`;
};
var am_layout_footer_account = () => {
	return `መለያ`;
};
/**
* | output |
* | --- |
* | "Account" |
*
* @param {Layout_Footer_AccountInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_footer_account = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_footer_account();
	return en_layout_footer_account();
});
//#endregion
//#region src/lib/paraglide/messages/layout_footer_privacy.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Footer_PrivacyInputs */
var en_layout_footer_privacy = () => {
	return `Privacy`;
};
var am_layout_footer_privacy = () => {
	return `ግላዊነት`;
};
/**
* | output |
* | --- |
* | "Privacy" |
*
* @param {Layout_Footer_PrivacyInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_footer_privacy = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_footer_privacy();
	return en_layout_footer_privacy();
});
//#endregion
//#region src/lib/paraglide/messages/layout_footer_terms.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Footer_TermsInputs */
var en_layout_footer_terms = () => {
	return `Terms`;
};
var am_layout_footer_terms = () => {
	return `ውሎች`;
};
/**
* | output |
* | --- |
* | "Terms" |
*
* @param {Layout_Footer_TermsInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_footer_terms = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_footer_terms();
	return en_layout_footer_terms();
});
//#endregion
//#region src/lib/paraglide/messages/layout_footer_subscription_terms.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Footer_Subscription_TermsInputs */
var en_layout_footer_subscription_terms = () => {
	return `Subscription Terms`;
};
var am_layout_footer_subscription_terms = () => {
	return `የደንበኝነት ውሎች`;
};
/**
* | output |
* | --- |
* | "Subscription Terms" |
*
* @param {Layout_Footer_Subscription_TermsInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_footer_subscription_terms = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_footer_subscription_terms();
	return en_layout_footer_subscription_terms();
});
//#endregion
//#region src/lib/paraglide/messages/layout_footer_delivery.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Footer_DeliveryInputs */
var en_layout_footer_delivery = () => {
	return `Delivery`;
};
var am_layout_footer_delivery = () => {
	return `ማድረስ`;
};
/**
* | output |
* | --- |
* | "Delivery" |
*
* @param {Layout_Footer_DeliveryInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_footer_delivery = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_footer_delivery();
	return en_layout_footer_delivery();
});
//#endregion
//#region src/lib/paraglide/messages/layout_footer_allergens.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Footer_AllergensInputs */
var en_layout_footer_allergens = () => {
	return `Allergens`;
};
var am_layout_footer_allergens = () => {
	return `አለርጂ አምጪ ንጥረ ነገሮች`;
};
/**
* | output |
* | --- |
* | "Allergens" |
*
* @param {Layout_Footer_AllergensInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_footer_allergens = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_footer_allergens();
	return en_layout_footer_allergens();
});
//#endregion
//#region src/lib/paraglide/messages/layout_footer_copyright.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ year: NonNullable<unknown> }} Layout_Footer_CopyrightInputs */
var en_layout_footer_copyright = (i) => {
	return `© ${i?.year} GOTERA Foods Ltd.`;
};
var am_layout_footer_copyright = (i) => {
	return `© ${i?.year} ጎተራ ፉድስ ሊሚትድ`;
};
/**
* | output |
* | --- |
* | "© {year} GOTERA Foods Ltd." |
*
* @param {Layout_Footer_CopyrightInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_footer_copyright = ((inputs, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_footer_copyright(inputs);
	return en_layout_footer_copyright(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/layout_footer_bottom_tagline.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Layout_Footer_Bottom_TaglineInputs */
var en_layout_footer_bottom_tagline = () => {
	return `Made & packed in Ethiopia · Distributed in the UK`;
};
var am_layout_footer_bottom_tagline = () => {
	return `የተመረተውና የታሸገው በኢትዮጵያ · የሚሰራጨው በዩኬ`;
};
/**
* | output |
* | --- |
* | "Made & packed in Ethiopia · Distributed in the UK" |
*
* @param {Layout_Footer_Bottom_TaglineInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var layout_footer_bottom_tagline = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_layout_footer_bottom_tagline();
	return en_layout_footer_bottom_tagline();
});
//#endregion
//#region src/lib/components/LanguageSelector.svelte
function LanguageSelector($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const localeLabels = {
			en: "English",
			am: "አማርኛ (Amharic)"
		};
		const localeShort = {
			en: "EN",
			am: "አማ"
		};
		const currentLang = getLocale();
		function changeLang(locale) {
			setLocale(locale);
			invalidateAll();
		}
		if (Dropdown_menu) {
			$$renderer.push("<!--[-->");
			Dropdown_menu($$renderer, {
				children: ($$renderer) => {
					{
						function child($$renderer, { props }) {
							Button($$renderer, spread_props([props, {
								variant: "ghost",
								size: "sm",
								class: "flex h-9 items-center gap-2 rounded-full px-3 transition-colors hover:bg-primary/5",
								children: ($$renderer) => {
									Languages($$renderer, { class: "h-4 w-4 text-primary" });
									$$renderer.push(`<!----> <span class="text-xs font-bold tracking-wider uppercase">${escape_html(localeShort[currentLang])}</span>`);
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
							class: "w-40 rounded-2xl border-primary/10 p-2 shadow-xl",
							children: ($$renderer) => {
								$$renderer.push(`<!--[-->`);
								const each_array = ensure_array_like(locales);
								for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
									let locale = each_array[$$index];
									if (Dropdown_menu_item) {
										$$renderer.push("<!--[-->");
										Dropdown_menu_item($$renderer, {
											class: `cursor-pointer rounded-xl ${currentLang === locale ? "bg-primary/5 font-semibold text-primary" : ""}`,
											onclick: () => changeLang(locale),
											children: ($$renderer) => {
												$$renderer.push(`<!---->${escape_html(localeLabels[locale])}`);
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
	});
}
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, children } = $$props;
		let isDrawerOpen = false;
		let isScrolled = false;
		const nonWhiteBG = derived(() => page.url.pathname === "/" || page.url.pathname.startsWith("/subscribe"));
		head("12qhfyh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(layout_title())}</title>`);
			});
			$$renderer.push(`<link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&amp;family=Jost:wght@300;400;500;600&amp;display=swap" rel="stylesheet"/>`);
		});
		Mode_watcher($$renderer, {});
		$$renderer.push(`<!----> `);
		Toaster($$renderer, {
			position: "bottom-right",
			richColors: true,
			closeButton: true
		});
		$$renderer.push(`<!----> `);
		ProgressBar($$renderer, {
			color: "#bc3d00",
			zIndex: 1e3
		});
		$$renderer.push(`<!----> `);
		if (!page.url.pathname.startsWith("/dashboard")) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<nav class="nav desktop-only svelte-12qhfyh"><div class="container nav-inner svelte-12qhfyh"><a href="/" class="logo svelte-12qhfyh">${escape_html(layout_brand_logo())}</a> <div class="nav-links svelte-12qhfyh"><a href="/" class="svelte-12qhfyh">${escape_html(layout_nav_home())}</a> <a href="/subscribe" class="svelte-12qhfyh">${escape_html(layout_nav_subscribe())}</a> <a href="/about" class="svelte-12qhfyh">${escape_html(layout_nav_about())}</a></div> <div class="nav-right svelte-12qhfyh">`);
			if (!data.user) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<a href="/login" class="nav-signin svelte-12qhfyh">${escape_html(layout_nav_signin())}</a> <a href="/signup" class="nav-signin svelte-12qhfyh">${escape_html(layout_nav_signup())}</a> <a href="/subscribe" class="btn-outline svelte-12qhfyh">${escape_html(layout_nav_plans())}</a> <a href="/subscribe" class="btn svelte-12qhfyh">${escape_html(layout_nav_subscribe_btn())}</a>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<a href="/account" class="btn-outline svelte-12qhfyh">${escape_html(layout_nav_dashboard())}</a>`);
			}
			$$renderer.push(`<!--]--></div></div></nav> <nav${attr_class("nav--hero mobile-only svelte-12qhfyh", void 0, { "nav--scrolled": isScrolled })}${attr("aria-label", layout_hero_nav_aria())}><a href="/"${attr_class(`nav-logo ${nonWhiteBG() && true ? "text-white!" : ""}`, "svelte-12qhfyh")}${attr("aria-label", layout_hero_logo_aria())}>GOTERA</a> <button${attr_class(`hamburger ${nonWhiteBG() && true ? "text-white!" : "text-primary!"}`, "svelte-12qhfyh", { "open": isDrawerOpen })}${attr("aria-label", layout_menu_open_aria())}${attr("aria-expanded", isDrawerOpen)}>`);
			Menu($$renderer, {});
			$$renderer.push(`<!----></button></nav> <div role="presentation"${attr_class("overlay svelte-12qhfyh", void 0, { "open": isDrawerOpen })}></div> <div${attr_class("drawer svelte-12qhfyh", void 0, { "open": isDrawerOpen })}><div class="drawer-head svelte-12qhfyh"><span class="drawer-logo svelte-12qhfyh">GOTERA</span> <button class="drawer-close svelte-12qhfyh"${attr("aria-label", layout_menu_close_aria())}><svg viewBox="0 0 24 24" class="svelte-12qhfyh"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div> <nav class="drawer-nav svelte-12qhfyh"${attr("aria-label", layout_drawer_nav_aria())}><a href="/subscribe" class="drawer-link svelte-12qhfyh">${escape_html(layout_drawer_subscribe())}</a> <a href="/about" class="drawer-link svelte-12qhfyh">${escape_html(layout_drawer_about())}</a> <a href="/faq" class="drawer-link svelte-12qhfyh">${escape_html(layout_drawer_faq())}</a> <a href="/account" class="drawer-link svelte-12qhfyh">${escape_html(data?.user ? layout_drawer_account() : layout_drawer_signin())}</a></nav> <div class="drawer-bottom svelte-12qhfyh"><a href="/subscribe" class="drawer-cta svelte-12qhfyh">${escape_html(layout_drawer_cta())}</a></div></div> <main>`);
			children($$renderer);
			$$renderer.push(`<!----></main> <footer class="footer svelte-12qhfyh"><div class="container svelte-12qhfyh"><div class="footer-grid svelte-12qhfyh"><div><div class="footer-logo svelte-12qhfyh">${escape_html(layout_brand_logo())}</div> <p class="footer-tagline svelte-12qhfyh">${escape_html(layout_footer_tagline())}</p></div> <div><h4 class="svelte-12qhfyh">${escape_html(layout_footer_site_heading())}</h4> <div class="footer-links svelte-12qhfyh"><a href="/" class="svelte-12qhfyh">${escape_html(layout_footer_home())}</a> <a href="/subscribe" class="svelte-12qhfyh">${escape_html(layout_footer_subscribe())}</a> <a href="/about" class="svelte-12qhfyh">${escape_html(layout_footer_about())}</a> <a href="/account" class="svelte-12qhfyh">${escape_html(layout_footer_account())}</a></div></div> <div><h4 class="svelte-12qhfyh">${escape_html(layout_footer_legal_heading())}</h4> <div class="footer-links svelte-12qhfyh"><a href="/privacy" class="svelte-12qhfyh">${escape_html(layout_footer_privacy())}</a> <a href="/terms" class="svelte-12qhfyh">${escape_html(layout_footer_terms())}</a> <a href="/subscription-terms" class="svelte-12qhfyh">${escape_html(layout_footer_subscription_terms())}</a> <a href="/delivery" class="svelte-12qhfyh">${escape_html(layout_footer_delivery())}</a> <a href="/allergens" class="svelte-12qhfyh">${escape_html(layout_footer_allergens())}</a></div></div></div> <div class="footer-bottom svelte-12qhfyh"><span>${escape_html(layout_footer_copyright({ year: (/* @__PURE__ */ new Date()).getFullYear().toString() }))}</span> <span class="flex flex-row gap-2">${escape_html(layout_footer_bottom_tagline())} `);
			LanguageSelector($$renderer);
			$$renderer.push(`<!----></span></div></div></footer>`);
		} else {
			$$renderer.push("<!--[-1-->");
			children($$renderer);
			$$renderer.push(`<!---->`);
		}
		$$renderer.push(`<!--]-->`);
	});
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte.js-BF-dQsqm.js.map
