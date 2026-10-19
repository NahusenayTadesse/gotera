import { renderComponent } from '$lib/components/ui/data-table/index.js';
import Statuses from '$lib/components/Table/statuses.svelte';
import DataTableLinks from '$lib/components/Table/data-table-links.svelte';
import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
import { instantDate, shortDate } from '$lib/format';
import { formatGBP } from '$lib/components/dashboard/format';
import SelectHeader from '$lib/components/Table/select-header.svelte';
import SelectCell from '$lib/components/Table/select-cell.svelte';
import PartnerRowActions from './PartnerRowActions.svelte';
import { categoryLabel } from './labels';
import type { StatusChange } from './StatusDialog.svelte';

type OnAction = (status: StatusChange['status'], partners: StatusChange['partners']) => void;

/** Built per page so the row buttons can open that page's confirmation dialog. */
export const createColumns = (onAction: OnAction) => [
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
		accessorKey: 'businessName',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Business', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) =>
			renderComponent(DataTableLinks, {
				id: row.original.id,
				name: row.original.businessName,
				link: '/dashboard/partners'
			})
	},
	{
		accessorKey: 'type',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Type', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => (info.getValue() === 'supplier' ? 'Supplier' : 'Partner')
	},
	{
		accessorKey: 'category',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Category', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => categoryLabel(info.getValue())
	},
	{
		accessorKey: 'contactName',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Contact', onclick: column.getToggleSortingHandler() }),
		sortable: true
	},
	{
		accessorKey: 'email',
		header: 'Email'
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
		cell: (info) => info.getValue() || '—'
	},
	{
		accessorKey: 'city',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Location', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) =>
			[row.original.city, row.original.postcode].filter(Boolean).join(', ') || '—'
	},
	{
		accessorKey: 'status',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Status', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) => renderComponent(Statuses, { status: row.original.status })
	},
	{
		accessorKey: 'deliveryCount',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Deliveries', onclick: column.getToggleSortingHandler() }),
		sortable: true
	},
	{
		accessorKey: 'lastDelivery',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Last Delivery',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: (info) => (info.getValue() ? shortDate(info.getValue()) : '—')
	},
	{
		accessorKey: 'totalValuePence',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Value', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => (info.getValue() ? formatGBP(info.getValue()) : '—')
	},
	{
		accessorKey: 'nextScheduled',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Next Scheduled', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => (info.getValue() ? shortDate(info.getValue()) : '—')
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Applied', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => instantDate(info.getValue())
	},
	{
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => renderComponent(PartnerRowActions, { partner: row.original, onAction })
	}
];
