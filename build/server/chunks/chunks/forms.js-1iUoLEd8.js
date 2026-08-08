import { n as noop, p as parse } from './shared.js-CgqsOrws.js';
import { a as app } from './app.js-C6Wtb5Pa.js';
import { i as invalidateAll, a as applyAction } from './client.js-7a-rpZlk.js';

//#region node_modules/@sveltejs/kit/src/runtime/app/forms.js
/**
* Use this function to deserialize the response from a form submission.
* Usage:
*
* ```js
* import { deserialize } from '$app/forms';
*
* async function handleSubmit(event) {
*   const response = await fetch('/form?/action', {
*     method: 'POST',
*     body: new FormData(event.target)
*   });
*
*   const result = deserialize(await response.text());
*   // ...
* }
* ```
* @template {Record<string, unknown> | undefined} Success
* @template {Record<string, unknown> | undefined} Failure
* @param {string} result
* @returns {import('@sveltejs/kit').ActionResult<Success, Failure>}
*/
function deserialize(result) {
	const parsed = JSON.parse(result);
	if (parsed.data) parsed.data = parse(parsed.data, app.decoders);
	return parsed;
}
/**
* Shallow clone an element, so that we can access e.g. `form.action` without worrying
* that someone has added an `<input name="action">` (https://github.com/sveltejs/kit/issues/7593)
* @template {HTMLElement} T
* @param {T} element
* @returns {T}
*/
function clone(element) {
	return HTMLElement.prototype.cloneNode.call(element);
}
/**
* This action enhances a `<form>` element that otherwise would work without JavaScript.
*
* The `submit` function is called upon submission with the given FormData and the `action` that should be triggered.
* If `cancel` is called, the form will not be submitted.
* You can use the abort `controller` to cancel the submission in case another one starts.
* If a function is returned, that function is called with the response from the server.
* If nothing is returned, the fallback will be used.
*
* If this function or its return value isn't set, it
* - falls back to updating the `form` prop with the returned data if the action is on the same page as the form
* - updates `page.status`
* - resets the `<form>` element and invalidates all data in case of successful submission with no redirect response
* - redirects in case of a redirect response
* - redirects to the nearest error page in case of an unexpected error
*
* If you provide a custom function with a callback and want to use the default behavior, invoke `update` in your callback.
* It accepts an options object
* - `reset: false` if you don't want the `<form>` values to be reset after a successful submission
* - `invalidateAll: false` if you don't want the action to call `invalidateAll` after submission
* @template {Record<string, unknown> | undefined} Success
* @template {Record<string, unknown> | undefined} Failure
* @param {HTMLFormElement} form_element The form element
* @param {import('@sveltejs/kit').SubmitFunction<Success, Failure>} submit Submit callback
*/
function enhance(form_element, submit = noop) {
	/**
	* @param {{
	*   action: URL;
	*   invalidateAll?: boolean;
	*   result: import('@sveltejs/kit').ActionResult;
	*   reset?: boolean
	* }} opts
	*/
	const fallback_callback = async ({ action, result, reset = true, invalidateAll: shouldInvalidateAll = true }) => {
		if (result.type === "success") {
			if (reset) HTMLFormElement.prototype.reset.call(form_element);
			if (shouldInvalidateAll) await invalidateAll();
		}
		if (location.origin + location.pathname === action.origin + action.pathname || result.type === "redirect" || result.type === "error") await applyAction();
	};
	/** @param {SubmitEvent} event */
	async function handle_submit(event) {
		if ((event.submitter?.hasAttribute("formmethod") ? event.submitter.formMethod : clone(form_element).method) !== "post") return;
		event.preventDefault();
		const action = new URL(event.submitter?.hasAttribute("formaction") ? event.submitter.formAction : clone(form_element).action);
		const enctype = event.submitter?.hasAttribute("formenctype") ? event.submitter.formEnctype : clone(form_element).enctype;
		const form_data = new FormData(form_element, event.submitter);
		const controller = new AbortController();
		let cancelled = false;
		const cancel = () => cancelled = true;
		const callback = await submit({
			action,
			cancel,
			controller,
			formData: form_data,
			formElement: form_element,
			submitter: event.submitter
		}) ?? fallback_callback;
		if (cancelled) return;
		/** @type {import('@sveltejs/kit').ActionResult} */
		let result;
		try {
			const headers = new Headers({
				accept: "application/json",
				"x-sveltekit-action": "true"
			});
			if (enctype !== "multipart/form-data") headers.set("Content-Type", /^(:?application\/x-www-form-urlencoded|text\/plain)$/.test(enctype) ? enctype : "application/x-www-form-urlencoded");
			const body = enctype === "multipart/form-data" ? form_data : new URLSearchParams(form_data);
			const response = await fetch(action, {
				method: "POST",
				headers,
				cache: "no-store",
				body,
				signal: controller.signal
			});
			result = deserialize(await response.text());
			if (result.type === "error") result.status = response.status;
		} catch (error) {
			if (error?.name === "AbortError") return;
			result = {
				type: "error",
				error
			};
		}
		await callback({
			action,
			formData: form_data,
			formElement: form_element,
			update: (opts) => fallback_callback({
				action,
				result,
				reset: opts?.reset,
				invalidateAll: opts?.invalidateAll
			}),
			result
		});
	}
	HTMLFormElement.prototype.addEventListener.call(form_element, "submit", handle_submit);
	return { destroy() {
		HTMLFormElement.prototype.removeEventListener.call(form_element, "submit", handle_submit);
	} };
}

export { deserialize as d, enhance as e };
//# sourceMappingURL=forms.js-1iUoLEd8.js.map
