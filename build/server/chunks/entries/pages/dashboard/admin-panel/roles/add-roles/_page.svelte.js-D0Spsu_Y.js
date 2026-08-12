import { a0 as head, a7 as bind_props, a9 as escape_html, ab as stringify$1, ae as store_get, af as unsubscribe_stores } from '../../../../../../chunks/server.js-CPNQ0GBv.js';
import { I as InputComp } from '../../../../../../chunks/InputComp.js-BbUKmbyM.js';
import { E as Errors } from '../../../../../../chunks/Errors.js-DYhtXrxd.js';
import { P as Plus } from '../../../../../../chunks/plus.js-Dl_Aa2en.js';
import { B as Button } from '../../../../../../chunks/button.js-DMlVoc1I.js';
import { L as LoadingBtn } from '../../../../../../chunks/LoadingBtn.js-B86u0wY7.js';
import { C as Card, b as Card_header, c as Card_title, d as Card_description, a as Card_content } from '../../../../../../chunks/card.js-DgfKxiLl.js';
import { b as superForm } from '../../../../../../chunks/client2.js-CDGhsFzy.js';
import { a as zodClient } from '../../../../../../chunks/adapters.js-me4_fML1.js';
import { c as createRoleSchema } from '../../../../../../chunks/schema4.js-BZmEnKww.js';
import '../../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../../chunks/scroll-lock.js-DHsXOzO5.js';
import '../../../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../../../chunks/create-id.js-ChicdcAh.js';
import '../../../../../../chunks/toast-state.svelte.js-B2UfxrKz.js';
import '../../../../../../chunks/Icon.js-C-2f-rrd.js';
import '../../../../../../chunks/badge-check.js-Dc-hXwTK.js';
import '../../../../../../chunks/minus.js-ESxlDJzH.js';
import '../../../../../../chunks/chevron-down.js-ol8PFekw.js';
import '../../../../../../chunks/chevron-left.js-Dl5KW7W_.js';
import '../../../../../../chunks/chevron-right.js-ChVD6BGK.js';
import '../../../../../../chunks/popover.js-D7HUu4n6.js';
import '../../../../../../chunks/hidden-input.js-YZizwPAN.js';
import '../../../../../../chunks/sr-only-styles.js-yoXwszuh.js';
import '../../../../../../chunks/popper-layer-force-mount.js-B6h_X5Ed.js';
import '../../../../../../chunks/safe-polygon.svelte.js-C4wqwQGo.js';
import '../../../../../../chunks/utils2.js-BChetszu.js';
import '../../../../../../chunks/circle-alert.js-BYQ_-QxX.js';
import '../../../../../../chunks/scroll-area.js-BG2EJRIs.js';
import '../../../../../../chunks/command.js-C6EqICGc.js';
import '../../../../../../chunks/dialog.js-CNnZpwDX.js';
import '../../../../../../chunks/label.js-BszTJLDi.js';
import '../../../../../../chunks/input.js-BYtfwuM9.js';
import '../../../../../../chunks/global.svelte.js-Cx8Mv6jx.js';
import '../../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../../chunks/client.js-BDsczQUc.js';
import '../../../../../../chunks/routing.js-CU5UDpt8.js';
import '../../../../../../chunks/internal2.js-DPaAU_wy.js';
import '../../../../../../chunks/utils.js-BQt5v-8G.js';
import 'browser-image-compression';
import '../../../../../../chunks/forms.js-DVwMti4V.js';
import '../../../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../../../chunks/stores.js-CbY9E368.js';
import '../../../../../../index.js--NEm1bOu.js';
import '../../../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../../chunks/access.js-Cygy5klO.js';

//#region src/lib/formComponents/FormCard.svelte
function FormCard($$renderer, $$props) {
	let { title, children, description = "", className = "" } = $$props;
	if (Card) {
		$$renderer.push("<!--[-->");
		Card($$renderer, {
			class: `flex w-full flex-col gap-4 lg:w-2xl ${stringify$1(className)}`,
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
										$$renderer.push(`<!---->${escape_html(title)}`);
									},
									$$slots: { default: true }
								});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
							$$renderer.push(` `);
							if (Card_description) {
								$$renderer.push("<!--[-->");
								Card_description($$renderer, {
									children: ($$renderer) => {
										$$renderer.push(`<!---->${escape_html(description)}`);
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
							children?.($$renderer);
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
//#endregion
//#region src/routes/dashboard/admin-panel/roles/add-roles/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		const { form, errors, delayed, capture, restore, allErrors } = superForm(data.form, {
			dataType: "json",
			validators: zodClient(createRoleSchema)
		});
		const snapshot = {
			capture,
			restore
		};
		head("1ckc1g2", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Add New Role</title>`);
			});
		});
		FormCard($$renderer, {
			title: "Add New Role",
			children: ($$renderer) => {
				$$renderer.push(`<form action="?/add" id="main" class="flex flex-col gap-4" method="POST">`);
				Errors($$renderer, { allErrors: store_get($$store_subs ??= {}, "$allErrors", allErrors) });
				$$renderer.push(`<!----> `);
				InputComp($$renderer, {
					label: "Name",
					name: "name",
					type: "text",
					form,
					errors,
					placeholder: "Enter Role Name"
				});
				$$renderer.push(`<!----> `);
				InputComp($$renderer, {
					label: "Description",
					name: "description",
					type: "textarea",
					form,
					errors,
					placeholder: "Enter Role Description"
				});
				$$renderer.push(`<!----> `);
				Button($$renderer, {
					type: "submit",
					class: "mt-4",
					form: "main",
					children: ($$renderer) => {
						if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
							$$renderer.push("<!--[0-->");
							LoadingBtn($$renderer, { name: "Adding Role" });
						} else {
							$$renderer.push("<!--[-1-->");
							Plus($$renderer, { class: "h-4 w-4" });
							$$renderer.push(`<!----> Add Role`);
						}
						$$renderer.push(`<!--]-->`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></form>`);
			}});
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { snapshot });
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-D0Spsu_Y.js.map
