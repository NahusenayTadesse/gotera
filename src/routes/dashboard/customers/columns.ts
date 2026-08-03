import { renderComponent } from '$lib/components/ui/data-table/index.js';
import Statuses from '$lib/components/Table/statuses.svelte';
import RowActions from '$lib/components/dashboard/RowActions.svelte';
import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
import { formatEthiopianDate } from '$lib/global.svelte';

export const columns = [
	{
		id: 'index',
		header: '#',
		cell: (info) => {
			const rowIndex = info.table.getRowModel().rows.findIndex((row) => row.id === info.row.id);
			return rowIndex + 1;
		},
		enableSorting: false
	},
	{
		accessorKey: 'fullName',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Name', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => info.getValue() || '—'
	},
	{
		accessorKey: 'email',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Email', onclick: column.getToggleSortingHandler() }),
		sortable: true
	},
	{
		accessorKey: 'phone',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Phone', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => info.getValue() || '—'
	},
	{
		accessorKey: 'subscriptionCount',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Subscriptions',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true
	},
	{
		accessorKey: 'isActive',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Status', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) =>
			renderComponent(Statuses, { status: row.original.isActive ? 'active' : 'inactive' })
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Joined', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => formatEthiopianDate(new Date(info.getValue()))
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) =>
			renderComponent(RowActions, { id: row.original.id, label: 'customer' })
	}
];
