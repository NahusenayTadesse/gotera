import { a0 as head, ai as await_block, a9 as escape_html, $ as attr, ab as stringify$1, aa as attr_class, a3 as clsx$1, a6 as spread_props } from '../../../../../chunks/server.js-CPNQ0GBv.js';
import { I as Icon } from '../../../../../chunks/Icon.js-C-2f-rrd.js';
import { F as Frown, D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../../chunks/data-table-sort.js-5j19d0fG.js';
import { E as Ellipsis } from '../../../../../chunks/ellipsis.js-BNid1SJZ.js';
import { P as Plus } from '../../../../../chunks/plus.js-Dl_Aa2en.js';
import { D as Dropdown_menu, a as Dropdown_menu_trigger, b as Dropdown_menu_content, d as Dropdown_menu_group, e as Dropdown_menu_label, f as Dropdown_menu_separator, c as Dropdown_menu_item } from '../../../../../chunks/dropdown-menu.js-BjUEFyFe.js';
import { B as Button } from '../../../../../chunks/button.js-DMlVoc1I.js';
import { f as formatEthiopianDate, d as dropdownClass } from '../../../../../chunks/global.svelte.js-Bc9BkX_a.js';
import { D as Data_table_links } from '../../../../../chunks/data-table-links.js-CUJ5Vozb.js';
import { L as Loading } from '../../../../../chunks/Loading.js-BX8fCrei.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/index-server.js-C9rOfj9g.js';
import '../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../chunks/scroll-lock.js-DAwGTwcu.js';
import '../../../../../chunks/legacy-client.js-CYlmvPew.js';
import '../../../../../chunks/create-id.js-DpR0oe6q.js';
import '../../../../../chunks/state.js-BDNoTQbo.js';
import '../../../../../chunks/client.js-7a-rpZlk.js';
import '../../../../../chunks/routing.js-CU5UDpt8.js';
import '../../../../../chunks/internal2.js-CNjKCACj.js';
import '../../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../../chunks/chevron-down.js-ol8PFekw.js';
import '../../../../../chunks/scroll-area.js-DLUPG4gi.js';
import '../../../../../chunks/utils2.js-BChetszu.js';
import '../../../../../chunks/input.js-BYtfwuM9.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../../chunks/minus.js-ESxlDJzH.js';
import '../../../../../chunks/popper-layer-force-mount.js-CzkC2vS6.js';
import '../../../../../chunks/menu.js-CrFfA9Yr.js';
import '../../../../../chunks/tooltip.js-e17nlGw5.js';
import '../../../../../chunks/safe-polygon.svelte.js-Dl7S_9Eh.js';

//#region node_modules/@lucide/svelte/dist/icons/external-link.svelte
function External_link($$renderer, $$props) {
	let { $$slots, $$events, ...props } = $$props;
	Icon($$renderer, spread_props([
		{ name: "external-link" },
		props,
		{ iconNode: [
			["path", { "d": "M15 3h6v6" }],
			["path", { "d": "M10 14 21 3" }],
			["path", { "d": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }]
		] }
	]));
}
//#endregion
//#region src/routes/dashboard/admin-panel/users/data-table-actions.svelte
function Data_table_actions($$renderer, $$props) {
	let { id, name } = $$props;
	if (Dropdown_menu) {
		$$renderer.push("<!--[-->");
		Dropdown_menu($$renderer, {
			children: ($$renderer) => {
				{
					function child($$renderer, { props }) {
						Button($$renderer, spread_props([props, {
							variant: "ghost",
							size: "icon",
							class: "relative size-8 p-0",
							children: ($$renderer) => {
								$$renderer.push(`<span class="sr-only">Open menu</span> `);
								Ellipsis($$renderer, {});
								$$renderer.push(`<!---->`);
							},
							$$slots: { default: true }
						}]));
					}
					if (Dropdown_menu_trigger) {
						$$renderer.push("<!--[-->");
						Dropdown_menu_trigger($$renderer, {
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
				if (Dropdown_menu_content) {
					$$renderer.push("<!--[-->");
					Dropdown_menu_content($$renderer, {
						children: ($$renderer) => {
							if (Dropdown_menu_group) {
								$$renderer.push("<!--[-->");
								Dropdown_menu_group($$renderer, {
									children: ($$renderer) => {
										if (Dropdown_menu_label) {
											$$renderer.push("<!--[-->");
											Dropdown_menu_label($$renderer, {
												children: ($$renderer) => {
													$$renderer.push(`<!---->Actions`);
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
							if (Dropdown_menu_separator) {
								$$renderer.push("<!--[-->");
								Dropdown_menu_separator($$renderer, {});
								$$renderer.push("<!--]-->");
							} else {
								$$renderer.push("<!--[!-->");
								$$renderer.push("<!--]-->");
							}
							$$renderer.push(` `);
							if (Dropdown_menu_item) {
								$$renderer.push("<!--[-->");
								Dropdown_menu_item($$renderer, {
									children: ($$renderer) => {
										$$renderer.push(`<a${attr("href", `/dashboard/users/${stringify$1(id)}`)} target="_blank"${attr_class(clsx$1(dropdownClass))}>`);
										External_link($$renderer, {});
										$$renderer.push(`<!----> View ${escape_html(name)}'s Details</a>`);
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
//#region src/routes/dashboard/admin-panel/users/columns.ts
var columns = [
	{
		id: "index",
		header: "#",
		cell: (info) => {
			return info.table.getRowModel().rows.findIndex((row) => row.id === info.row.id) + 1;
		},
		enableSorting: false
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
				link: "/dashboard/admin-panel/users"
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
		accessorKey: "role",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Role",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => {
			return renderComponent(Data_table_links, {
				id: row.original.roleId,
				name: row.original.role,
				link: "/dashboard/admin-panel/roles"
			});
		}
	},
	{
		accessorKey: "permissionsCount",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Permissions Count",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => `${info.getValue()} Permissions`
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Added At",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: (info) => formatEthiopianDate(new Date(info.getValue()))
	},
	{
		accessorKey: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return renderComponent(Data_table_actions, {
				id: row.original.id,
				name: row.original.name
			});
		}
	}
];
//#endregion
//#region src/routes/dashboard/admin-panel/users/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("m1c7vv", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Users List</title>`);
			});
		});
		await_block($$renderer, data, () => {
			Loading($$renderer, { name: "Customers" });
		}, (customerList) => {
			if (data.userList.length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="flex h-96 w-full flex-col items-center justify-center lg:w-5xl"><p class="justify-self-cente mt-4 flex flex-row gap-4 text-center text-4xl">`);
				Frown($$renderer, { class: "h-12 w-16  animate-bounce" });
				$$renderer.push(`<!----> Users List is Empty</p> `);
				Button($$renderer, {
					href: "/dashboard/users/add-users",
					children: ($$renderer) => {
						Plus($$renderer, {});
						$$renderer.push(`<!---->Add New Users`);
					},
					$$slots: { default: true }
				});
				$$renderer.push(`<!----></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<h2 class="my-4 text-2xl">No of Users: ${escape_html(data.userList?.length)}</h2> <div class="mt-8 mb-4 w-[350px] p-0 pt-4 lg:w-full lg:p-0">`);
				Data_table($$renderer, {
					data: data.userList,
					columns,
					fileName: "Users List"
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]-->`);
		});
		$$renderer.push(`<!--]-->`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-jvf-WtQB.js.map
