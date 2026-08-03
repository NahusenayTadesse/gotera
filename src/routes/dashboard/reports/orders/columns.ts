import { renderComponent } from '$lib/components/ui/data-table/index.js';
import Statuses from '$lib/components/Table/statuses.svelte';
import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
import { formatEthiopianDate } from '$lib/global.svelte';

const indexColumn = {
	id: 'index',
	header: '#',
	cell: (info) => {
		const rowIndex = info.table.getRowModel().rows.findIndex((row) => row.id === info.row.id);
		return rowIndex + 1;
	},
	enableSorting: false
};

const statusColumn = {
	accessorKey: 'status',
	header: ({ column }) =>
		renderComponent(DataTableSort, { name: 'Status', onclick: column.getToggleSortingHandler() }),
	sortable: true,
	cell: ({ row }) => renderComponent(Statuses, { status: row.original.status })
};

const placedColumn = {
	accessorKey: 'createdAt',
	header: ({ column }) =>
		renderComponent(DataTableSort, { name: 'Placed', onclick: column.getToggleSortingHandler() }),
	sortable: true,
	cell: (info) => formatEthiopianDate(new Date(info.getValue()))
};

const quantityColumn = {
	accessorKey: 'quantity',
	header: ({ column }) =>
		renderComponent(DataTableSort, { name: 'Qty', onclick: column.getToggleSortingHandler() }),
	sortable: true
};

export const giftColumns = [
	indexColumn,
	{
		accessorKey: 'buyerEmail',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Buyer', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) => row.original.buyerName || row.original.buyerEmail
	},
	{
		accessorKey: 'recipientName',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Recipient', onclick: column.getToggleSortingHandler() }),
		sortable: true
	},
	quantityColumn,
	statusColumn,
	placedColumn
];

export const guestColumns = [
	indexColumn,
	{
		accessorKey: 'buyerEmail',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Buyer email', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => info.getValue() || '—'
	},
	{
		accessorKey: 'recipientAddress',
		header: 'Ship to',
		cell: ({ row }) => {
			const a = row.original.recipientAddress;
			return a ? `${a.line1}, ${a.city} ${a.postcode}` : '—';
		}
	},
	quantityColumn,
	statusColumn,
	placedColumn
];
