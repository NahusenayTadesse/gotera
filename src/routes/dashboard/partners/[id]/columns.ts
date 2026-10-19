import { renderComponent } from '$lib/components/ui/data-table/index.js';
import Statuses from '$lib/components/Table/statuses.svelte';
import RowActions from '$lib/components/dashboard/RowActions.svelte';
import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
import { formatGBP } from '$lib/components/dashboard/format';
import { instantDate, shortDate } from '$lib/format';
import PartnerBatchesCell from './PartnerBatchesCell.svelte';

const weekday = (d: string) =>
	new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'short' });
const qty = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

export const columns = [
	{
		accessorKey: 'deliveredOn',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Date', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => `${weekday(info.getValue())} ${shortDate(info.getValue())}`
	},
	{
		accessorKey: 'items',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Items', onclick: column.getToggleSortingHandler() }),
		sortable: true
	},
	{
		accessorKey: 'quantity',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Quantity', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) => `${qty(row.original.quantity)} ${row.original.unit}`
	},
	{
		accessorKey: 'batches',
		header: 'Batches',
		enableSorting: false,
		cell: ({ row }) => renderComponent(PartnerBatchesCell, { row: row.original })
	},
	{
		accessorKey: 'location',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Location', onclick: column.getToggleSortingHandler() }),
		sortable: true
	},
	{
		accessorKey: 'valuePence',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Value', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => (info.getValue() == null ? '—' : formatGBP(info.getValue()))
	},
	{
		accessorKey: 'unitPricePence',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Unit Price', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) =>
			row.original.unitPricePence == null
				? '—'
				: `${formatGBP(row.original.unitPricePence)} / ${row.original.unit}`
	},
	{
		accessorKey: 'reference',
		header: 'Reference',
		cell: (info) => info.getValue() || '—'
	},
	{
		accessorKey: 'status',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Status', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) => renderComponent(Statuses, { status: row.original.status })
	},
	{
		accessorKey: 'notes',
		header: 'Notes',
		cell: (info) => info.getValue() || '—'
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Logged', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => instantDate(info.getValue())
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) =>
			renderComponent(RowActions, {
				id: row.original.id,
				label: 'delivery',
				deleteAction: '?/deleteDelivery'
			})
	}
];
