import { renderComponent } from '$lib/components/ui/data-table/index.js';
import Statuses from '$lib/components/Table/statuses.svelte';
import TypeBadge from '$lib/components/dashboard/TypeBadge.svelte';
import DeliveryAddonsCell from '$lib/components/dashboard/DeliveryAddonsCell.svelte';
import RowActions from '$lib/components/dashboard/RowActions.svelte';
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
		accessorKey: 'type',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Type', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) => renderComponent(TypeBadge, { type: row.original.type })
	},
	{
		accessorKey: 'scheduledDate',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Date', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => formatEthiopianDate(new Date(info.getValue()))
	},
	{
		accessorKey: 'subscriberName',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Customer', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) => row.original.subscriberName || '—'
	},
		{
		accessorKey: 'subscriberEmail',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Customer Email', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) => row.original.subscriberEmail || '—'
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
		// Only subscription deliveries can take a manually-added one-off add-on —
		// guest/gift orders are already paid for exactly what's in their Stripe line items.
		cell: ({ row }) =>
			renderComponent(DeliveryAddonsCell, {
				id: row.original.id,
				type: row.original.type,
				addons: row.original.addons
			})
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
		cell: ({ row }) => {
			const { id, type } = row.original;
			if (type === 'subscription') {
				return renderComponent(RowActions, { id, label: 'delivery' });
			}
			const base = type === 'guest' ? '/dashboard/orders/guest' : '/dashboard/orders/one-time';
			return renderComponent(RowActions, {
				id,
				label: type === 'guest' ? 'guest order' : 'one-time order',
				editHref: `${base}?edit=${id}`,
				deleteAction: '?/deleteOrder',
				hiddenFields: { type }
			});
		}
	}
];
