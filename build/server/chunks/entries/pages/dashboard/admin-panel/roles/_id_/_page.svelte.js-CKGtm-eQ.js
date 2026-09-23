import { ag as store_mutate, ae as store_get, a0 as head, ab as stringify$1, af as unsubscribe_stores, a8 as bind_props, T as derived } from '../../../../../../chunks/server.js-qDPizQqb.js';
import { a as toast } from '../../../../../../chunks/toast-state.svelte.js-CyESMgTY.js';
import { S as SingleView, A as Arrow_left, T as Trash, D as Delete, a as SingleTable, b as Save } from '../../../../../../chunks/SingleView.js-NEBs7a57.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../../../chunks/data-table-sort.js-jg0AudAq.js';
import { I as InputComp } from '../../../../../../chunks/InputComp.js-CP7Ax51g.js';
import { E as Errors } from '../../../../../../chunks/Errors.js-ByQPBAAv.js';
import { P as Pencil } from '../../../../../../chunks/pencil.js-DI8R1Xzc.js';
import '../../../../../../chunks/runtime.js-CbeSlHLA.js';
import '../../../../../../chunks/dialog.js-CMONFBTM.js';
import { B as Button } from '../../../../../../chunks/button.js-DWWbYMWk.js';
import { L as LoadingBtn } from '../../../../../../chunks/LoadingBtn.js-47-9Nmem.js';
import { b as superForm } from '../../../../../../chunks/client2.js-ZnyZ4fKl.js';
import { a as zodClient } from '../../../../../../chunks/adapters.js-QNI96UbV.js';
import { D as Data_table_links } from '../../../../../../chunks/data-table-links.js-DosO1Me_.js';
import { e as editRoleSchema } from '../../../../../../chunks/schema3.js-C5ZAJLxq.js';
import '../../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../../chunks/client.js-CWf6uOE8.js';
import '../../../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../../chunks/internal2.js-DJ3WVXqP.js';
import '../../../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../../../chunks/Icon.js-Dm6aSBgb.js';
import '../../../../../../chunks/statuses.js-BOppkrP4.js';
import '../../../../../../chunks/badge-check.js-YjTSRpIb.js';
import '../../../../../../chunks/scroll-area.js-DExXIpxT.js';
import '../../../../../../chunks/scroll-lock.js-DUdP1Ngb.js';
import '../../../../../../chunks/create-id.js-BHb4azHX.js';
import '../../../../../../chunks/utils2.js-BmcH287A.js';
import '../../../../../../chunks/truck.js-CAOAaqne.js';
import '../../../../../../chunks/loader-circle.js-BHGq7rKE.js';
import '../../../../../../chunks/state.js-B8LH1nIO.js';
import '../../../../../../chunks/chevron-down.js-BUTnRWsm.js';
import '../../../../../../chunks/dropdown-menu.js-YJUTIf1N.js';
import '../../../../../../chunks/minus.js-bwoMvjb2.js';
import '../../../../../../chunks/popper-layer-force-mount.js-Bh-1o_Y0.js';
import '../../../../../../chunks/menu.js-Bc8STZmC.js';
import '../../../../../../chunks/is-mobile.svelte.js-C7rjivRg.js';
import '../../../../../../chunks/input.js-DivymZKU.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../../../chunks/chevron-left.js-CzlLlj9a.js';
import '../../../../../../chunks/chevron-right.js-Bu3_elXi.js';
import '../../../../../../chunks/popover.js-bYNo78g_.js';
import '../../../../../../chunks/hidden-input.js-C81YZGmV.js';
import '../../../../../../chunks/sr-only-styles.js-Bstyupqo.js';
import '../../../../../../chunks/safe-polygon.svelte.js-gTkJUGXN.js';
import '../../../../../../chunks/circle-alert.js-C4ujrG9B.js';
import '../../../../../../chunks/command.js-WxuuArWj.js';
import '../../../../../../chunks/label.js-B89gGnUJ.js';
import '../../../../../../chunks/global.svelte.js-Bt1gRs1g.js';
import 'browser-image-compression';
import '../../../../../../index.js-C0U4KHbt.js';
import '../../../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../../../chunks/forms.js-CSpodhVa.js';
import '../../../../../../chunks/stores.js-85RLlu2u.js';
import '../../../../../../chunks/access.js-BTJQW2Ke.js';
import '../../../../../../chunks/tooltip.js-CDsBDgDD.js';

//#region src/routes/dashboard/admin-panel/roles/[id]/columns.ts
var userColumns = [
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
		sortable: true,
		cell: ({ row }) => {
			return renderComponent(Data_table_links, {
				id: row.original.id,
				name: row.original.name,
				link: "/dashboard/users"
			});
		}
	},
	{
		accessorKey: "email",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Email",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	},
	{
		accessorKey: "isActive",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Active",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true
	}
];
//#endregion
//#region src/routes/dashboard/admin-panel/roles/[id]/+page.svelte
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
				name: "Description",
				value: data.singleUser?.description
			},
			{
				name: "User Count",
				value: data?.singleUser?.userCount || 0
			},
			{
				name: "Permission Count",
				value: data?.permissionList?.length || 0
			}
		]);
		const { form, errors, delayed, capture, restore, allErrors} = superForm(data.form, {
			validators: zodClient(editRoleSchema),
			dataType: "json",
			resetForm: false
		});
		const snapshot = {
			capture,
			restore
		};
		let edit = false;
		store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).name = data.singleUser?.name);
		store_mutate($$store_subs ??= {}, "$form", form, store_get($$store_subs ??= {}, "$form", form).description = data.singleUser?.description || "");
		head("ol2z7a", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Role Details</title>`);
			});
		});
		SingleView($$renderer, {
			title: "Role Details",
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
				if (data.singleUser?.userCount > 0) {
					$$renderer.push("<!--[0-->");
					Button($$renderer, {
						variant: "destructive",
						onclick: () => toast.error("Cannot delete role with users"),
						title: "Cannot delete role with users",
						children: ($$renderer) => {
							Trash($$renderer, {});
							$$renderer.push(`<!----> Delete`);
						},
						$$slots: { default: true }
					});
				} else {
					$$renderer.push("<!--[-1-->");
					Delete($$renderer, { redirect: "/dashboard/admin-panel/roles" });
				}
				$$renderer.push(`<!--]--></div> `);
				if (edit === false) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="w-full p-4">`);
					SingleTable($$renderer, { singleTable: singleTable() });
					$$renderer.push(`<!----></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (edit) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="w-full p-4"><form action="?/edit" id="main" class="flex flex-col gap-4" method="POST">`);
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
					InputComp($$renderer, {
						label: "Permissions",
						name: "permissions",
						type: "checkbox",
						form,
						errors,
						placeholder: "Enter Role Name",
						items: data?.allPermissions
					});
					$$renderer.push(`<!----> `);
					Button($$renderer, {
						type: "submit",
						class: "mt-4",
						form: "main",
						children: ($$renderer) => {
							if (store_get($$store_subs ??= {}, "$delayed", delayed)) {
								$$renderer.push("<!--[0-->");
								LoadingBtn($$renderer, { name: "Saving Change" });
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
		$$renderer.push(`<!----> <br/> `);
		if (data?.userList?.length) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="w-full max-w-full min-w-0"><h3 class="mb-2 text-lg font-semibold sm:text-xl">Users on this Role</h3> `);
			Data_table($$renderer, {
				data: data?.userList,
				columns: userColumns,
				fileName: `${stringify$1(data?.singleUser.name)} Users List`
			});
			$$renderer.push(`<!----></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { snapshot });
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-CKGtm-eQ.js.map
