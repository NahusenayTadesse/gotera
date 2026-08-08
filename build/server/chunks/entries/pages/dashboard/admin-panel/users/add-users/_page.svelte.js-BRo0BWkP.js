import { a0 as head, a7 as bind_props, ae as store_get, af as unsubscribe_stores } from '../../../../../../chunks/server.js-CPNQ0GBv.js';
import { I as InputComp } from '../../../../../../chunks/InputComp.js-DjIGM0dz.js';
import { E as Errors } from '../../../../../../chunks/Errors.js-PqimIvij.js';
import { P as Plus } from '../../../../../../chunks/plus.js-Dl_Aa2en.js';
import { B as Button } from '../../../../../../chunks/button.js-DMlVoc1I.js';
import { L as LoadingBtn } from '../../../../../../chunks/LoadingBtn.js-CvQQ0uH0.js';
import { C as Card, b as Card_header, c as Card_title, a as Card_content } from '../../../../../../chunks/card.js-DgfKxiLl.js';
import { b as superForm } from '../../../../../../chunks/client2.js--SBYKgBt.js';
import { a as zodClient } from '../../../../../../chunks/adapters.js-D4rGtFDl.js';
import { a as add } from '../../../../../../chunks/schema6.js-C9Wdqslf.js';
import '../../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../../chunks/scroll-lock.js-DAwGTwcu.js';
import '../../../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../../../chunks/create-id.js-DpR0oe6q.js';
import '../../../../../../chunks/toast-state.svelte.js-B2UfxrKz.js';
import '../../../../../../chunks/Icon.js-C-2f-rrd.js';
import '../../../../../../chunks/badge-check.js-Dc-hXwTK.js';
import '../../../../../../chunks/minus.js-ESxlDJzH.js';
import '../../../../../../chunks/chevron-down.js-ol8PFekw.js';
import '../../../../../../chunks/chevron-left.js-Dl5KW7W_.js';
import '../../../../../../chunks/chevron-right.js-ChVD6BGK.js';
import '../../../../../../chunks/popover.js-CeZILK5T.js';
import '../../../../../../chunks/hidden-input.js-BsjuO7xd.js';
import '../../../../../../chunks/sr-only-styles.js-P-cDEe1k.js';
import '../../../../../../chunks/popper-layer-force-mount.js-CzkC2vS6.js';
import '../../../../../../chunks/safe-polygon.svelte.js-Dl7S_9Eh.js';
import '../../../../../../chunks/utils2.js-BChetszu.js';
import '../../../../../../chunks/circle-alert.js-BYQ_-QxX.js';
import '../../../../../../chunks/scroll-area.js-DLUPG4gi.js';
import '../../../../../../chunks/command.js-CqffWVq4.js';
import '../../../../../../chunks/dialog.js-BhMsigOw.js';
import '../../../../../../chunks/label.js-FcotYhKU.js';
import '../../../../../../chunks/input.js-BYtfwuM9.js';
import '../../../../../../chunks/global.svelte.js-Bc9BkX_a.js';
import '../../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../../chunks/client.js-7a-rpZlk.js';
import '../../../../../../chunks/routing.js-CU5UDpt8.js';
import '../../../../../../chunks/internal2.js-CNjKCACj.js';
import '../../../../../../chunks/utils.js-BQt5v-8G.js';
import 'browser-image-compression';
import '../../../../../../chunks/forms.js-1iUoLEd8.js';
import '../../../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../../../chunks/stores.js-DMULTZRY.js';
import '../../../../../../index.js-CNe0N484.js';
import '../../../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../../chunks/access.js-HgBsL8za.js';

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
//# sourceMappingURL=_page.svelte.js-BRo0BWkP.js.map
