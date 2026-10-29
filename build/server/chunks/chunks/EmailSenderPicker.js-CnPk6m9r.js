import { a4 as ensure_array_like, a6 as escape_html, a8 as bind_props, a7 as spread_props, T as derived } from './server.js-qDPizQqb.js';
import { p as page } from './state.js-PKYHL-GZ.js';
import { I as Icon } from './Icon.js-Dm6aSBgb.js';
import { B as Button } from './button.js-DWWbYMWk.js';

//#region node_modules/@lucide/svelte/dist/icons/send.svelte
function Send($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "send" },
		props,
		{ iconNode: [["path", { "d": "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" }], ["path", { "d": "m21.854 2.147-10.94 10.939" }]] }
	]));
}
//#endregion
//#region src/lib/components/dashboard/EmailSenderPicker.svelte
function EmailSenderPicker($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		/** Picks which mailbox a bulk email goes out from. Renders nothing when only one is configured. */
		let { value = void 0 } = $$props;
		const senders = derived(() => page.data.emailSenders ?? []);
		if (senders().length > 1) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex flex-col gap-2"><span class="text-sm font-medium">Send from</span> <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Send from"><!--[-->`);
			const each_array = ensure_array_like(senders());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let s = each_array[$$index];
				Button($$renderer, {
					type: "button",
					size: "sm",
					variant: value === s.id ? "default" : "outline",
					role: "radio",
					"aria-checked": value === s.id,
					onclick: () => value = s.id,
					children: ($$renderer) => {
						$$renderer.push(`<!---->${escape_html(s.address)}`);
					},
					$$slots: { default: true }
				});
			}
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		bind_props($$props, { value });
	});
}

export { EmailSenderPicker as E, Send as S };
//# sourceMappingURL=EmailSenderPicker.js-CnPk6m9r.js.map
