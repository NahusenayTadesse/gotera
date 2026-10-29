import { a8 as bind_props, a0 as head, ab as stringify$1, ae as store_get, af as unsubscribe_stores, T as derived, a6 as escape_html, ag as store_mutate } from '../../../../../../chunks/server.js-qDPizQqb.js';
import { A as Arrow_left } from '../../../../../../chunks/arrow-left.js-Bo8HsFsB.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../../../chunks/data-table-sort.js-DI5dH2-_.js';
import { S as SelectComp } from '../../../../../../chunks/SelectComp.js-CBQ76iZ1.js';
import { S as SingleView, D as Delete, a as SingleTable, b as Save } from '../../../../../../chunks/SingleView.js-BmomfKCP.js';
import { P as Pencil } from '../../../../../../chunks/pencil.js-DI8R1Xzc.js';
import { L as Label } from '../../../../../../chunks/label.js-B89gGnUJ.js';
import { B as Button } from '../../../../../../chunks/button.js-DWWbYMWk.js';
import { I as Input } from '../../../../../../chunks/input.js-DivymZKU.js';
import { L as LoadingBtn } from '../../../../../../chunks/LoadingBtn.js-CYZ6Npjp.js';
import { b as superForm } from '../../../../../../chunks/client2.js-CuhGksyF.js';
import { a as zodClient } from '../../../../../../chunks/adapters.js-CrMSDpnl.js';
import { E as Errors } from '../../../../../../chunks/Errors.js-Czh0cSzk.js';
import { e as editUserSchema } from '../../../../../../chunks/schema6.js-C7AiSPRt.js';
import '../../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../../chunks/Icon.js-Dm6aSBgb.js';
import '../../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../../chunks/scroll-lock.js-BWPmsymw.js';
import '../../../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../../../chunks/index-server2.js-C2dghAGm.js';
import '../../../../../../chunks/create-id.js-BHb4azHX.js';
import '../../../../../../chunks/state.js-PKYHL-GZ.js';
import '../../../../../../chunks/client.js-D8k391-h.js';
import '../../../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../../../chunks/internal2.js-Ce3aipJv.js';
import '../../../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../../../chunks/chevron-down.js-BUTnRWsm.js';
import '../../../../../../chunks/scroll-area.js-DdAKf2Fa.js';
import '../../../../../../chunks/utils2.js-BmcH287A.js';
import '../../../../../../chunks/dropdown-menu.js-DR8iffqj.js';
import '../../../../../../chunks/check.js-BvFzUyRW.js';
import '../../../../../../chunks/minus.js-JH-UUVfm.js';
import '../../../../../../chunks/popper-layer-force-mount.js-C6YTj-1w.js';
import '../../../../../../chunks/menu.js-B_FjgJQX.js';
import '../../../../../../chunks/is-mobile.svelte.js-CSeMNCH2.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../../../chunks/hidden-input.js-C81YZGmV.js';
import '../../../../../../chunks/sr-only-styles.js-Bstyupqo.js';
import '../../../../../../chunks/global.svelte.js-Dj9QIDov.js';
import '../../../../../../chunks/statuses.js-CqI0SEDd.js';
import '../../../../../../chunks/badge-check.js-YjTSRpIb.js';
import '../../../../../../chunks/loader.js-BCe2CTsg.js';
import '../../../../../../chunks/truck.js-CAOAaqne.js';
import '../../../../../../chunks/loader-circle.js-BHGq7rKE.js';
import '../../../../../../chunks/dialog.js-CvY6SrMR.js';
import '../../../../../../chunks/x.js-TlRuKVU4.js';
import '../../../../../../chunks/dialog-overlay.js-8KJVmKPf.js';
import '../../../../../../chunks/forms.js-DNc1GIZe.js';
import '../../../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../../../chunks/stores.js-Bau3W-nc.js';
import '../../../../../../index.js-CZsLKCjb.js';
import '../../../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../../chunks/access.js-j1_SnSd1.js';
import '../../../../../../chunks/circle-alert.js-C4ujrG9B.js';

//#region src/routes/dashboard/admin-panel/users/[id]/columns.ts
var columns = [
	{
		accessorKey: "index",
		header: "#",
		cell: (info) => info.row.index + 1,
		sortable: false
	},
	{
		accessorKey: "name",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Name",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	},
	{
		accessorKey: "description",
		header: "Description"
	}
];
//#endregion
//#region src/routes/dashboard/admin-panel/users/[id]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { data } = $$props;
		let singleTable = derived(() => [
			{
				name: "Name",
				value: data.singleUser?.name
			},
			{
				name: "Email",
				value: data.singleUser?.email
			},
			{
				name: "Role",
				value: data.singleUser?.role
			},
			{
				name: "Created At",
				value: data.singleUser?.createdAt.toLocaleString()
			},
			{
				name: "Updated At",
				value: data.singleUser?.updatedAt.toLocaleString()
			}
		]);
		const { form, errors, delayed, capture, restore, allErrors} = superForm(data.form, {
			validators: zodClient(editUserSchema),
			resetForm: false
		});
		const snapshot = {
			capture,
			restore
		};
		let edit = false;
		function fe($$renderer, label = "", name = "name", type = "", placeholder = "", required = false, min = "", max = "") {
			$$renderer.push(`<div class="flex w-full flex-col justify-start gap-2">`);
			Label($$renderer, {
				for: name,
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(label)}`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			Input($$renderer, {
				type,
				name,
				placeholder,
				required,
				min,
				max,
				"aria-invalid": store_get($$store_subs ??= {}, "$errors", errors)[name] ? "true" : void 0,
				get value() {
					return store_get($$store_subs ??= {}, "$form", form)[name];
				},
				set value($$value) {
					store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form)[name] = $$value);
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			if (store_get($$store_subs ??= {}, "$errors", errors)[name]) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="text-red-500">${escape_html(store_get($$store_subs ??= {}, "$errors", errors)[name])}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		function selects($$renderer, name, items) {
			$$renderer.push(`<div class="flex w-full flex-col justify-start gap-2">`);
			Label($$renderer, {
				for: name,
				class: "capitalize",
				children: ($$renderer) => {
					$$renderer.push(`<!---->${escape_html(name.replace(/([a-z])([A-Z])/g, "$1 $2"))}:`);
				},
				$$slots: { default: true }
			});
			$$renderer.push(`<!----> `);
			SelectComp($$renderer, {
				name,
				items,
				get value() {
					return store_get($$store_subs ??= {}, "$form", form)[name];
				},
				set value($$value) {
					store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form)[name] = $$value);
					$$settled = false;
				}
			});
			$$renderer.push(`<!----> `);
			if (store_get($$store_subs ??= {}, "$errors", errors)[name]) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="text-red-500">${escape_html(store_get($$store_subs ??= {}, "$errors", errors)[name])}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		let $$settled = true;
		let $$inner_renderer;
		function $$render_inner($$renderer) {
			head("ljj9n7", $$renderer, ($$renderer) => {
				$$renderer.title(($$renderer) => {
					$$renderer.push(`<title>User Details</title>`);
				});
			});
			SingleView($$renderer, {
				title: "User Details",
				children: ($$renderer) => {
					$$renderer.push(`<div class="mt-4 flex w-full min-w-0 flex-row flex-wrap items-start justify-start gap-2 px-4">`);
					Button($$renderer, {
						onclick: () => edit = !edit,
						children: ($$renderer) => {
							if (!edit) {
								$$renderer.push("<!--[0-->");
								Pencil($$renderer, { class: "h-4 w-4" });
								$$renderer.push(`<!----> Edit`);
							} else {
								$$renderer.push("<!--[-1-->");
								Arrow_left($$renderer, { class: "h-4 w-4" });
								$$renderer.push(`<!----> Back`);
							}
							$$renderer.push(`<!--]-->`);
						},
						$$slots: { default: true }
					});
					$$renderer.push(`<!----> `);
					Delete($$renderer, { redirect: "/dashboard/products" });
					$$renderer.push(`<!----></div> `);
					if (edit === false) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<div class="w-full p-4">`);
						SingleTable($$renderer, { singleTable: singleTable() });
						$$renderer.push(`<!----></div>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> `);
					if (edit) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<div class="w-full min-w-0 p-4"><form action="?/editUser" class="flex flex-col gap-4" id="edit" method="post"><h3 class="text-center text-red-500">Any changes made here will signout the user from every device they are logged in on.</h3> `);
						Errors($$renderer, { allErrors: store_get($$store_subs ??= {}, "$allErrors", allErrors) });
						$$renderer.push(`<!----> `);
						fe($$renderer, "Name", "name", "text", "Change Name", true);
						$$renderer.push(`<!----> `);
						fe($$renderer, "Email", "email", "email", "Change email", true);
						$$renderer.push(`<!----> `);
						selects($$renderer, "role", data?.roleList);
						$$renderer.push(`<!----> `);
						Button($$renderer, {
							form: "edit",
							type: "submit",
							class: "mt-4",
							children: ($$renderer) => {
								if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
									$$renderer.push("<!--[0-->");
									LoadingBtn($$renderer, { name: "Saving Changes" });
								} else {
									$$renderer.push("<!--[-1-->");
									Save($$renderer, { class: "h-4 w-4" });
									$$renderer.push(`<!----> Save Changes`);
								}
								$$renderer.push(`<!--]-->`);
							},
							$$slots: { default: true }
						});
						$$renderer.push(`<!----></form></div>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]-->`);
				}});
			$$renderer.push(`<!----> <br/> <div class="w-full max-w-full min-w-0">`);
			Data_table($$renderer, {
				data: data?.permissionList,
				columns,
				fileName: `${stringify$1(data?.singleUser?.name)}Permission List`
			});
			$$renderer.push(`<!----></div>`);
		}
		do {
			$$settled = true;
			$$inner_renderer = $$renderer.copy();
			$$render_inner($$inner_renderer);
		} while (!$$settled);
		$$renderer.subsume($$inner_renderer);
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { snapshot });
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-CM1LJRuc.js.map
