import { renderComponent } from '$lib/components/ui/data-table/index.js';
import Statuses from '$lib/components/Table/statuses.svelte';
import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
import TypeBadge from '$lib/components/dashboard/TypeBadge.svelte';
import ShipmentLink from '../ShipmentLink.svelte';
import { shortDate } from '$lib/format';

const sortHeader = (name: string) => ({ column }) =>
	renderComponent(DataTableSort, { name, onclick: column.getToggleSortingHandler() });

export const columns = [
	{
		accessorKey: 'date',
		header: sortHeader('Date'),
		sortable: true,
		cell: (info) => shortDate(info.getValue())
	},
	{
		accessorKey: 'shipmentType',
		header: sortHeader('Type'),
		sortable: true,
		cell: ({ row }) => renderComponent(TypeBadge, { type: row.original.shipmentType })
	},
	{
		accessorKey: 'customer',
		header: sortHeader('Customer'),
		sortable: true,
		cell: ({ row }) =>
			renderComponent(ShipmentLink, {
				type: row.original.shipmentType,
				id: row.original.shipmentId,
				label: row.original.customer
			})
	},
	{ accessorKey: 'email', header: 'Email', cell: (info) => info.getValue() || '—' },
	{ accessorKey: 'address', header: 'Delivered To', cell: (info) => info.getValue() || '—' },
	{ accessorKey: 'item', header: sortHeader('Item'), sortable: true },
	{ accessorKey: 'quantity', header: sortHeader('Qty'), sortable: true },
	{
		accessorKey: 'method',
		header: 'Assigned',
		cell: (info) => (info.getValue() === 'manual' ? 'Manually' : 'Auto (FEFO)')
	},
	{
		accessorKey: 'shipmentStatus',
		header: sortHeader('Delivery Status'),
		sortable: true,
		cell: ({ row }) => renderComponent(Statuses, { status: row.original.shipmentStatus })
	}
];
