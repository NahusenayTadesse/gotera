import { a2 as attributes, a7 as bind_props, T as derived } from './server.js-CPNQ0GBv.js';
import { n as mergeProps } from './create-id.js-DpR0oe6q.js';
import { s as srOnlyStyles } from './sr-only-styles.js-P-cDEe1k.js';

//#region node_modules/bits-ui/dist/bits/utilities/hidden-input.svelte
function Hidden_input($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value = void 0, $$slots, $$events, ...restProps } = $$props;
		const mergedProps = derived(() => mergeProps(restProps, {
			"aria-hidden": "true",
			tabindex: -1,
			style: {
				...srOnlyStyles,
				position: "absolute",
				top: "0",
				left: "0"
			}
		}));
		if (mergedProps().type === "checkbox") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<input${attributes({
				...mergedProps(),
				value
			}, void 0, void 0, void 0, 4)}/>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<input${attributes({
				value,
				...mergedProps()
			}, void 0, void 0, void 0, 4)}/>`);
		}
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { value });
	});
}

export { Hidden_input as H };
//# sourceMappingURL=hidden-input.js-BsjuO7xd.js.map
