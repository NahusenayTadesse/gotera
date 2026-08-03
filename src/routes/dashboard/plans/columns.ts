import { renderComponent } from '$lib/components/ui/data-table/index.js';
import Statuses from '$lib/components/Table/statuses.svelte';
import RowActions from '$lib/components/dashboard/RowActions.svelte';
import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
import { formatGBP } from '$lib/components/dashboard/format';

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
		accessorKey: 'name',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Name', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) => (row.original.featured ? `${row.original.name} ★` : row.original.name)
	},
	{
		accessorKey: 'slug',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Slug', onclick: column.getToggleSortingHandler() }),
		sortable: true
	},
	{
		accessorKey: 'kind',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Kind', onclick: column.getToggleSortingHandler() }),
		sortable: true
	},
	{
		accessorKey: 'pricePence',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Price', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => formatGBP(info.getValue())
	},
	{
		accessorKey: 'sortOrder',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Sort Order', onclick: column.getToggleSortingHandler() }),
		sortable: true
	},
	{
		accessorKey: 'active',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Status', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) =>
			renderComponent(Statuses, { status: row.original.active ? 'active' : 'inactive' })
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => renderComponent(RowActions, { id: row.original.id, label: 'plan' })
	}
];
