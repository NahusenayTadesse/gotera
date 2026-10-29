import { a9 as props_id, a2 as attributes, a8 as bind_props, T as derived } from './server.js-qDPizQqb.js';
import { v as createId, b as boxWith, n as mergeProps } from './create-id.js-BHb4azHX.js';
import { f as DialogDescriptionState } from './dialog-overlay.js-8KJVmKPf.js';

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

export { Dialog_description as D };
//# sourceMappingURL=dialog-description.js-Chgs6s0w.js.map
