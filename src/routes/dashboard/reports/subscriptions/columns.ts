import { renderComponent } from '$lib/components/ui/data-table/index.js';
import Statuses from '$lib/components/Table/statuses.svelte';
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
		accessorKey: 'subscriberEmail',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Customer', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) => row.original.subscriberName || row.original.subscriberEmail || '—'
	},
	{
		accessorKey: 'planName',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Plan', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => info.getValue() || '—'
	},
	{
		accessorKey: 'quantity',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Qty', onclick: column.getToggleSortingHandler() }),
		sortable: true
	},
	{
		accessorKey: 'status',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Status', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) => renderComponent(Statuses, { status: row.original.status })
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Created', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => formatEthiopianDate(new Date(info.getValue()))
	}
];
