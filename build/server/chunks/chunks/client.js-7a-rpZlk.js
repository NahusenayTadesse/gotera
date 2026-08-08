import './shared.js-CgqsOrws.js';
import './exports.js-BT-QlP_6.js';
import './routing.js-CU5UDpt8.js';
import { G as noop } from './server.js-CPNQ0GBv.js';
import { i as index_server_exports } from './index-server.js-C9rOfj9g.js';
import './internal2.js-CNjKCACj.js';
import './utils.js-BQt5v-8G.js';

var is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
var placeholder_url = "a:";
if (is_legacy) {
	({
		data: {},
		form: null,
		error: null,
		params: {},
		route: { id: null },
		state: {},
		status: -1,
		url: new URL(placeholder_url)
	});
}
//#endregion
//#region node_modules/@sveltejs/kit/src/runtime/client/client.js
/** @import { RemoteFunctionDataNode, ServerNodesResponse, ServerRedirectNode } from 'types' */
/** @import { CacheEntry } from './remote-functions/cache.svelte.js' */
/** @import { Query } from './remote-functions/query/instance.svelte.js' */
/** @import { LiveQuery } from './remote-functions/query-live/instance.svelte.js' */
var { onMount, tick } = index_server_exports;
/**
* Note on before_navigate_callbacks, on_navigate_callbacks and after_navigate_callbacks:
* do not re-assign as some closures keep references to these Sets
*/
/** @type {Set<(navigation: import('@sveltejs/kit').BeforeNavigate) => void>} */
var before_navigate_callbacks = /* @__PURE__ */ new Set();
/** @type {Set<(navigation: import('@sveltejs/kit').AfterNavigate) => void>} */
var after_navigate_callbacks = /* @__PURE__ */ new Set();
/**
* @template {Function} T
* @param {Set<T>} callbacks
* @param {T} callback
*/
function add_navigation_callback(callbacks, callback) {
	onMount(() => {
		callbacks.add(callback);
		return () => {
			callbacks.delete(callback);
		};
	});
}
/**
* A lifecycle function that runs the supplied `callback` when the current component mounts, and also whenever we navigate to a URL.
*
* `afterNavigate` must be called during a component initialization. It remains active as long as the component is mounted.
* @param {(navigation: import('@sveltejs/kit').AfterNavigate) => void} callback
* @returns {void}
*/
function afterNavigate(callback) {
	add_navigation_callback(after_navigate_callbacks, callback);
}
/**
* A navigation interceptor that triggers before we navigate to a URL, whether by clicking a link, calling `goto(...)`, or using the browser back/forward controls.
*
* Calling `cancel()` will prevent the navigation from completing. If `navigation.type === 'leave'` — meaning the user is navigating away from the app (or closing the tab) — calling `cancel` will trigger the native browser unload confirmation dialog. In this case, the navigation may or may not be cancelled depending on the user's response.
*
* When a navigation isn't to a SvelteKit-owned route (and therefore controlled by SvelteKit's client-side router), `navigation.to.route.id` will be `null`.
*
* If the navigation will (if not cancelled) cause the document to unload — in other words `'leave'` navigations and `'link'` navigations where `navigation.to.route === null` — `navigation.willUnload` is `true`.
*
* `beforeNavigate` must be called during a component initialization. It remains active as long as the component is mounted.
* @param {(navigation: import('@sveltejs/kit').BeforeNavigate) => void} callback
* @returns {void}
*/
function beforeNavigate(callback) {
	add_navigation_callback(before_navigate_callbacks, callback);
}
/**
* Allows you to navigate programmatically to a given route, with options such as keeping the current element focused.
* Returns a Promise that resolves when SvelteKit navigates (or fails to navigate, in which case the promise rejects) to the specified `url`.
*
* For external URLs, use `window.location = url` instead of calling `goto(url)`.
*
* @param {string | URL} url Where to navigate to. Note that if you've set [`config.kit.paths.base`](https://svelte.dev/docs/kit/configuration#paths) and the URL is root-relative, you need to prepend the base path if you want to navigate within the app.
* @param {Object} [opts] Options related to the navigation
* @param {boolean} [opts.replaceState] If `true`, will replace the current `history` entry rather than creating a new one with `pushState`
* @param {boolean} [opts.noScroll] If `true`, the browser will maintain its scroll position rather than scrolling to the top of the page after navigation
* @param {boolean} [opts.keepFocus] If `true`, the currently focused element will retain focus after navigation. Otherwise, focus will be reset to the body
* @param {boolean} [opts.invalidateAll] If `true`, all `load` functions of the page will be rerun. See https://svelte.dev/docs/kit/load#rerunning-load-functions for more info on invalidation.
* @param {Array<string | URL | ((url: URL) => boolean)>} [opts.invalidate] Causes any load functions to re-run if they depend on one of the urls
* @param {App.PageState} [opts.state] An optional object that will be available as `page.state`
* @returns {Promise<void>}
*/
function goto(url, opts = {}) {
	throw new Error("Cannot call goto(...) on the server");
}
/**
* Causes all `load` and `query` functions belonging to the currently active page to re-run. Returns a `Promise` that resolves when the page is subsequently updated.
* @returns {Promise<void>}
*/
function invalidateAll() {
	throw new Error("Cannot call invalidateAll() on the server");
}
/**
* This action updates the `form` property of the current page with the given data and updates `page.status`.
* In case of an error, it redirects to the nearest error page.
* @template {Record<string, unknown> | undefined} Success
* @template {Record<string, unknown> | undefined} Failure
* @param {import('@sveltejs/kit').ActionResult<Success, Failure>} result
* @returns {Promise<void>}
*/
async function applyAction(result) {
	throw new Error("Cannot call applyAction(...) on the server");
}

export { applyAction as a, afterNavigate as b, beforeNavigate as c, goto as g, invalidateAll as i };
//# sourceMappingURL=client.js-7a-rpZlk.js.map
