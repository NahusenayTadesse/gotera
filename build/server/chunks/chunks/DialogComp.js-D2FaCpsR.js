import { a7 as bind_props, a6 as spread_props, a9 as escape_html } from './server.js-CPNQ0GBv.js';
import { h as getLocale } from './runtime.js-CYqc9Mf9.js';
import { D as Dialog, a as Dialog_trigger, b as Dialog_content } from './dialog.js-BhMsigOw.js';
import { B as Button } from './button.js-DMlVoc1I.js';

//#region src/lib/paraglide/messages/dialogcomp_default_eyebrow.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Dialogcomp_Default_EyebrowInputs */
var en_dialogcomp_default_eyebrow = () => {
	return `Manage account`;
};
var am_dialogcomp_default_eyebrow = () => {
	return `መለያ ያስተዳድሩ`;
};
/**
* | output |
* | --- |
* | "Manage account" |
*
* @param {Dialogcomp_Default_EyebrowInputs} inputs
* @param {{ locale?: "en" | "am" }} options
* @returns {LocalizedString}
*/
var dialogcomp_default_eyebrow = ((inputs = {}, options = {}) => {
	if ((options.locale ?? getLocale()) === "am") return am_dialogcomp_default_eyebrow();
	return en_dialogcomp_default_eyebrow();
});
//#endregion
//#region src/lib/formComponents/DialogComp.svelte
function DialogComp($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { title, label, eyebrow = dialogcomp_default_eyebrow(), children, variant = "default", class: className, IconComp, open = false } = $$props;
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			if (Dialog) {
				$$renderer.push("<!--[-->");
				Dialog($$renderer, {
					get open() {
						return open;
					},
					set open($$value) {
						open = $$value;
						$$settled = false;
					},
					children: ($$renderer) => {
						{
							function child($$renderer, { props }) {
								Button($$renderer, spread_props([props, {
									type: "button",
									variant,
									class: className,
									children: ($$renderer) => {
										if (IconComp) {
											$$renderer.push("<!--[0-->");
											if (IconComp) {
												$$renderer.push("<!--[-->");
												IconComp($$renderer, {});
												$$renderer.push("<!--]-->");
											} else {
												$$renderer.push("<!--[!-->");
												$$renderer.push("<!--]-->");
											}
										} else $$renderer.push("<!--[-1-->");
										$$renderer.push(`<!--]--> ${escape_html(label ?? title)}`);
									},
									$$slots: { default: true }
								}]));
							}
							if (Dialog_trigger) {
								$$renderer.push("<!--[-->");
								Dialog_trigger($$renderer, {
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
						if (Dialog_content) {
							$$renderer.push("<!--[-->");
							Dialog_content($$renderer, {
								class: "bg-[#faf8f3]",
								children: ($$renderer) => {
									children($$renderer);
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
		bind_props($$props, { open });
	});
}

export { DialogComp as D };
//# sourceMappingURL=DialogComp.js-D2FaCpsR.js.map
