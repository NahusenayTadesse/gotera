import { renderComponent } from '$lib/components/ui/data-table/index.js';
import Statuses from '$lib/components/Table/statuses.svelte';
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
		accessorKey: 'fullName',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Name', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => info.getValue() || '—'
	},
	{
		accessorKey: 'email',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Email', onclick: column.getToggleSortingHandler() }),
		sortable: true
	},
	{
		accessorKey: 'customerType',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Customer Type',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => renderComponent(Statuses, { status: row.original.customerType })
	},
	{
		accessorKey: 'marketingOptIn',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Marketing',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) =>
			renderComponent(Statuses, { status: row.original.marketingOptIn ? 'yes' : 'no' })
	},
	{
		accessorKey: 'isActive',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Status', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: ({ row }) =>
			renderComponent(Statuses, { status: row.original.isActive ? 'active' : 'inactive' })
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Joined', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => formatEthiopianDate(new Date(info.getValue()))
	}
];
