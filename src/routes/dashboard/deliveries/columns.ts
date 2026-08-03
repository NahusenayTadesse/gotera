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
		accessorKey: 'scheduledDate',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Scheduled', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => formatEthiopianDate(new Date(info.getValue()))
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
		accessorKey: 'addressLine1',
		header: 'Ship to',
		cell: ({ row }) =>
			row.original.addressLine1
				? `${row.original.addressLine1}, ${row.original.addressCity} ${row.original.addressPostcode}`
				: '—'
	},
	{
		accessorKey: 'status',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Status', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) => renderComponent(Statuses, { status: row.original.status })
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => renderComponent(RowActions, { id: row.original.id, label: 'delivery' })
	}
];
