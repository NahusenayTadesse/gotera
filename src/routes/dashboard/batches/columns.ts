import { renderComponent } from '$lib/components/ui/data-table/index.js';
import Statuses from '$lib/components/Table/statuses.svelte';
import DataTableLinks from '$lib/components/Table/data-table-links.svelte';
import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
import SelectHeader from '$lib/components/Table/select-header.svelte';
import SelectCell from '$lib/components/Table/select-cell.svelte';
import { shortDate } from '$lib/format';
import ExpiryCell from './ExpiryCell.svelte';
import UsageCell from './UsageCell.svelte';
import BatchRowActions from './BatchRowActions.svelte';
import type { BatchStatusChange } from './BatchStatusDialog.svelte';

type OnAction = (status: BatchStatusChange['status'], batches: BatchStatusChange['batches']) => void;

const sortHeader = (name: string) => ({ column }) =>
	renderComponent(DataTableSort, { name, onclick: column.getToggleSortingHandler() });

export const createColumns = (onAction: OnAction) => [
	{
		id: 'select',
		header: ({ table }) => renderComponent(SelectHeader, { table }),
		cell: ({ row }) => renderComponent(SelectCell, { row }),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'code',
		header: sortHeader('Batch'),
		sortable: true,
		cell: ({ row }) =>
			renderComponent(DataTableLinks, { id: row.original.id, name: row.original.code, link: '/dashboard/batches' })
	},
	{ accessorKey: 'productName', header: sortHeader('Product'), sortable: true },
	{ accessorKey: 'sourceLabel', header: sortHeader('Source'), sortable: true },
	{
		accessorKey: 'supplierLotRef',
		header: 'Supplier Lot',
		cell: (info) => info.getValue() || '—'
	},
	{
		accessorKey: 'producedOn',
		header: sortHeader('Produced'),
		sortable: true,
		cell: (info) => shortDate(info.getValue())
	},
	{
		accessorKey: 'bestBefore',
		header: sortHeader('Best Before'),
		sortable: true,
		cell: ({ row }) => renderComponent(ExpiryCell, { date: row.original.bestBefore, expiry: row.original.expiry })
	},
	{
		accessorKey: 'remaining',
		header: sortHeader('Stock'),
		sortable: true,
		cell: ({ row }) =>
			renderComponent(UsageCell, {
				allocated: row.original.allocated,
				quantity: row.original.quantity,
				unit: row.original.unit
			})
	},
	{
		accessorKey: 'status',
		header: sortHeader('Status'),
		sortable: true,
		cell: ({ row }) => renderComponent(Statuses, { status: row.original.status })
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => renderComponent(BatchRowActions, { batch: row.original, onAction })
	}
];
