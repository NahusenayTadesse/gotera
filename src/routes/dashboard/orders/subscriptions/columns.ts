import { renderComponent } from '$lib/components/ui/data-table/index.js';
import Statuses from '$lib/components/Table/statuses.svelte';
import RowActions from '$lib/components/dashboard/RowActions.svelte';
import SubscriptionAddonsCell from '$lib/components/dashboard/SubscriptionAddonsCell.svelte';
import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
import SelectHeader from '$lib/components/Table/select-header.svelte';
import SelectCell from '$lib/components/Table/select-cell.svelte';
import { formatEthiopianDate } from '$lib/global.svelte';

export const columns = [
	{
		id: 'select',
		header: ({ table }) => renderComponent(SelectHeader, { table }),
		cell: ({ row }) => renderComponent(SelectCell, { row }),
		enableSorting: false,
		enableHiding: false
	},
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
		accessorKey: 'addons',
		header: 'Add-ons',
		enableSorting: false,
		cell: ({ row }) =>
			renderComponent(SubscriptionAddonsCell, { id: row.original.id, addons: row.original.addons })
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
		accessorKey: 'cancelAtPeriodEnd',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Cancels at period end',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: (info) => (info.getValue() ? 'Yes' : 'No')
	},
	{
		accessorKey: 'currentPeriodEnd',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Renews / ends',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: (info) => (info.getValue() ? formatEthiopianDate(new Date(info.getValue())) : '—')
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => renderComponent(RowActions, { id: row.original.id, label: 'subscription' })
	}
];
