import { ag as store_mutate, ae as store_get, a0 as head, ab as stringify$1, af as unsubscribe_stores, a7 as bind_props, T as derived } from '../../../../../../chunks/server.js-CPNQ0GBv.js';
import { a as toast } from '../../../../../../chunks/toast-state.svelte.js-B2UfxrKz.js';
import { S as SingleView, A as Arrow_left, T as Trash, D as Delete, a as SingleTable, b as Save } from '../../../../../../chunks/SingleView.js-Cz6-cFBu.js';
import { D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../../../chunks/data-table-sort.js-5j19d0fG.js';
import { I as InputComp } from '../../../../../../chunks/InputComp.js-DjIGM0dz.js';
import { E as Errors } from '../../../../../../chunks/Errors.js-PqimIvij.js';
import { P as Pencil } from '../../../../../../chunks/pencil.js-BNjnhhMl.js';
import '../../../../../../chunks/runtime.js-CYqc9Mf9.js';
import '../../../../../../chunks/dialog.js-BhMsigOw.js';
import { B as Button } from '../../../../../../chunks/button.js-DMlVoc1I.js';
import { L as LoadingBtn } from '../../../../../../chunks/LoadingBtn.js-CvQQ0uH0.js';
import { b as superForm } from '../../../../../../chunks/client2.js--SBYKgBt.js';
import { a as zodClient } from '../../../../../../chunks/adapters.js-D4rGtFDl.js';
import { D as Data_table_links } from '../../../../../../chunks/data-table-links.js-CUJ5Vozb.js';
import { e as editRoleSchema } from '../../../../../../chunks/schema3.js-CNqfn6Zy.js';
import '../../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../../chunks/client.js-7a-rpZlk.js';
import '../../../../../../chunks/routing.js-CU5UDpt8.js';
import '../../../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../../chunks/internal2.js-CNjKCACj.js';
import '../../../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../../../chunks/Icon.js-C-2f-rrd.js';
import '../../../../../../chunks/statuses.js-e5MBhLkL.js';
import '../../../../../../chunks/badge-check.js-Dc-hXwTK.js';
import '../../../../../../chunks/scroll-area.js-DLUPG4gi.js';
import '../../../../../../chunks/scroll-lock.js-DAwGTwcu.js';
import '../../../../../../chunks/create-id.js-DpR0oe6q.js';
import '../../../../../../chunks/utils2.js-BChetszu.js';
import '../../../../../../chunks/truck.js-rfGMc_Yv.js';
import '../../../../../../chunks/loader-circle.js-ItH9sbLy.js';
import '../../../../../../chunks/state.js-BDNoTQbo.js';
import '../../../../../../chunks/chevron-down.js-ol8PFekw.js';
import '../../../../../../chunks/dropdown-menu.js-BjUEFyFe.js';
import '../../../../../../chunks/minus.js-ESxlDJzH.js';
import '../../../../../../chunks/popper-layer-force-mount.js-CzkC2vS6.js';
import '../../../../../../chunks/menu.js-CrFfA9Yr.js';
import '../../../../../../chunks/input.js-BYtfwuM9.js';
import '../../../../../../chunks/global.svelte.js-Bc9BkX_a.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../../../chunks/chevron-left.js-Dl5KW7W_.js';
import '../../../../../../chunks/chevron-right.js-ChVD6BGK.js';
import '../../../../../../chunks/popover.js-CeZILK5T.js';
import '../../../../../../chunks/hidden-input.js-BsjuO7xd.js';
import '../../../../../../chunks/sr-only-styles.js-P-cDEe1k.js';
import '../../../../../../chunks/safe-polygon.svelte.js-Dl7S_9Eh.js';
import '../../../../../../chunks/circle-alert.js-BYQ_-QxX.js';
import '../../../../../../chunks/command.js-CqffWVq4.js';
import '../../../../../../chunks/label.js-FcotYhKU.js';
import 'browser-image-compression';
import '../../../../../../chunks/forms.js-1iUoLEd8.js';
import '../../../../../../chunks/app.js-C6Wtb5Pa.js';
import '../../../../../../chunks/stores.js-DMULTZRY.js';
import '../../../../../../index.js-CNe0N484.js';
import '../../../../../../chunks/internal.js-B6-4oVm4.js';
import '../../../../../../chunks/shared-server.js-9-2j12mp.js';
import '../../../../../../chunks/access.js-HgBsL8za.js';
import '../../../../../../chunks/tooltip.js-e17nlGw5.js';

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
				$$renderer.push(`<div class="mt-4 flex w-full flex-row items-start justify-start gap-2 pl-4">`);
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
			$$renderer.push(`<h3>Users on this Role</h3> `);
			Data_table($$renderer, {
				data: data?.userList,
				columns: userColumns,
				fileName: `${stringify$1(data?.singleUser.name)} Users List`
			});
			$$renderer.push(`<!---->`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
		bind_props($$props, { snapshot });
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-9RJk7who.js.map
