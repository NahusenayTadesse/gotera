import { a0 as head, ai as await_block, a6 as escape_html } from '../../../../../chunks/server.js-qDPizQqb.js';
import { F as Frown, D as Data_table, r as renderComponent, a as Data_table_sort } from '../../../../../chunks/data-table-sort.js-jg0AudAq.js';
import { S as Statuses } from '../../../../../chunks/statuses.js-BOppkrP4.js';
import { P as Plus } from '../../../../../chunks/plus.js-l9nzajpf.js';
import { B as Button } from '../../../../../chunks/button.js-DWWbYMWk.js';
import { D as Data_table_links } from '../../../../../chunks/data-table-links.js-DosO1Me_.js';
import { L as Loading } from '../../../../../chunks/Loading.js-PcxT1jdC.js';
import '../../../../../chunks/shared.js-CgqsOrws.js';
import '../../../../../chunks/exports.js-BT-QlP_6.js';
import '../../../../../chunks/index-server.js-CaywUnPA.js';
import '../../../../../chunks/rolldown-runtime.js-BBx_TEkp.js';
import '../../../../../chunks/scroll-lock.js-DUdP1Ngb.js';
import '../../../../../chunks/legacy-client.js-BfOaXL26.js';
import '../../../../../chunks/create-id.js-BHb4azHX.js';
import '../../../../../chunks/state.js-B8LH1nIO.js';
import '../../../../../chunks/client.js-CWf6uOE8.js';
import '../../../../../chunks/routing.js-CJYUshuD.js';
import '../../../../../chunks/internal2.js-DJ3WVXqP.js';
import '../../../../../chunks/utils.js-BQt5v-8G.js';
import '../../../../../chunks/Icon.js-Dm6aSBgb.js';
import '../../../../../chunks/chevron-down.js-BUTnRWsm.js';
import '../../../../../chunks/scroll-area.js-DExXIpxT.js';
import '../../../../../chunks/utils2.js-BmcH287A.js';
import '../../../../../chunks/dropdown-menu.js-YJUTIf1N.js';
import '../../../../../chunks/minus.js-bwoMvjb2.js';
import '../../../../../chunks/popper-layer-force-mount.js-Bh-1o_Y0.js';
import '../../../../../chunks/menu.js-Bc8STZmC.js';
import '../../../../../chunks/is-mobile.svelte.js-C7rjivRg.js';
import '../../../../../chunks/input.js-DivymZKU.js';
import '@tanstack/table-core';
import 'papaparse';
import '../../../../../chunks/badge-check.js-YjTSRpIb.js';
import '../../../../../chunks/truck.js-CAOAaqne.js';
import '../../../../../chunks/tooltip.js-CDsBDgDD.js';
import '../../../../../chunks/safe-polygon.svelte.js-gTkJUGXN.js';

//#region src/routes/dashboard/admin-panel/roles/columns.ts
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
				link: "/dashboard/admin-panel/roles"
			});
		}
	},
	{
		accessorKey: "status",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "Status",
			onclick: column.getToggleSortingHandler()
		}),
		sortable: true,
		cell: ({ row }) => {
			return renderComponent(Statuses, { status: row.original.status ? "Active" : "Inactive" });
		}
	},
	{
		accessorKey: "userCount",
		header: ({ column }) => renderComponent(Data_table_sort, {
			name: "User Count",
			onclick: column.getToggleSortingHandler()
		}),
		cell: (info) => {
			return info.getValue() ? info.getValue() + " Users" : "No Users for this Role";
		}
	}
];
//#endregion
//#region src/routes/dashboard/admin-panel/roles/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("18wmnim", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Roles List</title>`);
			});
		});
		await_block($$renderer, data, () => {
			Loading($$renderer, { name: "Customers" });
		}, (customerList) => {
			if (data.roleList.length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="flex h-96 w-full min-w-0 flex-col items-center justify-center gap-4 px-4 lg:w-5xl"><p class="mt-4 flex flex-col items-center gap-3 text-center text-2xl text-balance sm:flex-row sm:gap-4 sm:text-4xl">`);
				Frown($$renderer, { class: "h-10 w-10 animate-bounce sm:h-12 sm:w-16" });
				$$renderer.push(`<!----> Roles List is Empty</p> `);
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
				$$renderer.push(`<h2 class="my-4 text-xl sm:text-2xl">No of Roles: ${escape_html(data.roleList?.length)}</h2> <div class="mt-2 mb-4 w-full min-w-0 max-w-full p-0 sm:mt-8 sm:pt-4">`);
				Data_table($$renderer, {
					data: data.roleList,
					columns,
					fileName: "Roles List"
				});
				$$renderer.push(`<!----></div>`);
			}
			$$renderer.push(`<!--]-->`);
		});
		$$renderer.push(`<!--]-->`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-Ic2cgCh9.js.map
