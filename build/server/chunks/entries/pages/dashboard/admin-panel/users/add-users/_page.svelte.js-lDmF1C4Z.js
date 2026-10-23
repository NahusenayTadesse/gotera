import { a0 as head, a8 as bind_props, ae as store_get, af as unsubscribe_stores } from '../../../../../../chunks/server.js-qDPizQqb.js';
import { I as InputComp } from '../../../../../../chunks/InputComp.js-DpxpEGST.js';
import { P as Plus } from '../../../../../../chunks/plus.js-l9nzajpf.js';
import { B as Button } from '../../../../../../chunks/button.js-DWWbYMWk.js';
import { L as LoadingBtn } from '../../../../../../chunks/LoadingBtn.js-CYZ6Npjp.js';
import { C as Card, b as Card_header, c as Card_title, a as Card_content } from '../../../../../../chunks/card.js-CLGpEPTV.js';
import { b as superForm } from '../../../../../../chunks/client2.js-CyJQ5fE8.js';
import { a as zodClient } from '../../../../../../chunks/adapters.js-CQlMjbyU.js';
import { E as Errors } from '../../../../../../chunks/Errors.js-Czh0cSzk.js';
import { a as add } from '../../../../../../chunks/schema7.js-BUQtH-_G.js';
import '../../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../../chunks/scroll-lock.js-CqHv4jWP.js';
import '../../../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../../../chunks/index-server2.js-C2dghAGm.js';
import '../../../../../../chunks/create-id.js-BHb4azHX.js';
import '../../../../../../chunks/toast-state.svelte.js-CyESMgTY.js';
import '../../../../../../chunks/Icon.js-Dm6aSBgb.js';
import '../../../../../../chunks/badge-check.js-YjTSRpIb.js';
import '../../../../../../chunks/check.js-BvFzUyRW.js';
import '../../../../../../chunks/chevron-down.js-BUTnRWsm.js';
import '../../../../../../chunks/chevron-left.js-CzlLlj9a.js';
import '../../../../../../chunks/chevron-right.js-Bu3_elXi.js';
import '../../../../../../chunks/SelectComp.js-DHbV5UZH.js';
import '../../../../../../chunks/scroll-area.js-CQyJtNcB.js';
import '../../../../../../chunks/utils2.js-BmcH287A.js';
import '../../../../../../chunks/hidden-input.js-C81YZGmV.js';
import '../../../../../../chunks/sr-only-styles.js-Bstyupqo.js';
import '../../../../../../chunks/popper-layer-force-mount.js-B57StPwG.js';
import '../../../../../../chunks/global.svelte.js-Dj9QIDov.js';
import '../../../../../../chunks/popover.js-C5botI74.js';
import '../../../../../../chunks/safe-polygon.svelte.js-LqQ_XdbY.js';
import '../../../../../../chunks/circle-alert.js-C4ujrG9B.js';
import '../../../../../../chunks/loader.js-BCe2CTsg.js';
import '../../../../../../chunks/x.js-TlRuKVU4.js';
import '../../../../../../chunks/command.js-D-5nnPhf.js';
import '../../../../../../chunks/search.js-B59c9lYY.js';
import '../../../../../../chunks/dialog-overlay.js-C7ZHZwQ8.js';
import '../../../../../../chunks/label.js-B89gGnUJ.js';
import '../../../../../../chunks/input.js-DivymZKU.js';
import '../../../../../../chunks/textarea.js-BMgrLLbk.js';
import '../../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../../chunks/client.js-lcRmDm_g.js';
import '../../../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../../../chunks/internal2.js-C5oX8Rtc.js';
import '../../../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../../../chunks/checkbox2.js-DNmj6_T9.js';
import '../../../../../../chunks/minus.js-JH-UUVfm.js';
import '../../../../../../chunks/checkbox.js-C4abJyiS.js';
import 'browser-image-compression';
import '../../../../../../index.js-Bt0ds7Zy.js';
import '../../../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../../../chunks/forms.js-DIm94891.js';
import '../../../../../../chunks/stores.js-CP2mn6hL.js';
import '../../../../../../chunks/access.js-j1_SnSd1.js';

//#region src/routes/dashboard/admin-panel/users/add-users/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		const { form, errors, delayed, allErrors, capture, restore} = superForm(data.form, {
			taintedMessage: () => {
				return new Promise((resolve) => {
					resolve(window.confirm("Do you want to leave?\nChanges you made may not be saved."));
				});
			},
			validators: zodClient(add)
		});
		const snapshot = {
			capture,
			restore
		};
		head("1msq1ji", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Add User</title>`);
			});
		});
		if (Card) {
			$$renderer.push("<!--[-->");
			Card($$renderer, {
				class: "flex w-full flex-col gap-4 lg:w-lg",
				children: ($$renderer) => {
					if (Card_header) {
						$$renderer.push("<!--[-->");
						Card_header($$renderer, {
							children: ($$renderer) => {
								if (Card_title) {
									$$renderer.push("<!--[-->");
									Card_title($$renderer, {
										class: "text-2xl",
										children: ($$renderer) => {
											$$renderer.push(`<!---->Add New User`);
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
					if (Card_content) {
						$$renderer.push("<!--[-->");
						Card_content($$renderer, {
							children: ($$renderer) => {
								$$renderer.push(`<form action="?/add" id="main" class="flex flex-col gap-4" method="post">`);
								Errors($$renderer, { allErrors: store_get($$store_subs ??= {}, "$allErrors", allErrors) });
								$$renderer.push(`<!----> `);
								InputComp($$renderer, {
									label: "Name",
									form,
									errors,
									type: "text",
									name: "name",
									placeholder: "Enter the name of new user",
									required: true
								});
								$$renderer.push(`<!----> `);
								InputComp($$renderer, {
									label: "Email",
									form,
									type: "email",
									errors,
									name: "email",
									placeholder: "Enter the email of new admin user",
									required: true
								});
								$$renderer.push(`<!----> `);
								InputComp($$renderer, {
									label: "Password",
									form,
									errors,
									name: "password",
									placeholder: "Enter password",
									required: true,
									type: "password"
								});
								$$renderer.push(`<!----> `);
								InputComp($$renderer, {
									form,
									errors,
									name: "role",
									type: "select",
									label: "Role",
									items: data?.allRoles,
									required: true
								});
								$$renderer.push(`<!----> `);
								Button($$renderer, {
									type: "submit",
									class: "mt-4",
									form: "main",
									children: ($$renderer) => {
										if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
											$$renderer.push("<!--[0-->");
											LoadingBtn($$renderer, { name: "Adding New User" });
										} else {
											$$renderer.push("<!--[-1-->");
											Plus($$renderer, { class: "h-4 w-4" });
											$$renderer.push(`<!----> Add User`);
										}
										$$renderer.push(`<!--]-->`);
									},
									$$slots: { default: true }
								});
								$$renderer.push(`<!----></form>`);
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
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { snapshot });
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-lDmF1C4Z.js.map
