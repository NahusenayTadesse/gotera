import { renderComponent } from '$lib/components/ui/data-table/index.js';
import Statuses from '$lib/components/Table/statuses.svelte';
import RowActions from '$lib/components/dashboard/RowActions.svelte';
import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
import AddonThumb from '$lib/components/dashboard/AddonThumb.svelte';
import { formatGBP } from '$lib/components/dashboard/format';
import { AVAILABILITY_LABELS, CATEGORY_LABELS, TAG_LABELS, type AddonTag } from '$lib/addons';

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
		id: 'image',
		header: 'Photo',
		enableSorting: false,
		cell: ({ row }) =>
			renderComponent(AddonThumb, { image: row.original.imageUrl, name: row.original.name })
	},
	{
		accessorKey: 'name',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Name', onclick: column.getToggleSortingHandler() }),
		sortable: true
	},
	{
		accessorKey: 'category',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Type', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => CATEGORY_LABELS[info.getValue()] ?? '—'
	},
	{
		accessorKey: 'availability',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Sold', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => AVAILABILITY_LABELS[info.getValue()] ?? '—'
	},
	{
		accessorKey: 'unitLabel',
		header: 'Pack',
		cell: (info) => info.getValue() || '—'
	},
	{
		accessorKey: 'tags',
		header: 'Tags',
		enableSorting: false,
		cell: (info) =>
			(info.getValue() as AddonTag[]).map((t) => TAG_LABELS[t]).join(', ') || '—'
	},
	{
		accessorKey: 'pricePence',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Price', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => formatGBP(info.getValue())
	},
	{
		accessorKey: 'sortOrder',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Sort Order', onclick: column.getToggleSortingHandler() }),
		sortable: true
	},
	{
		accessorKey: 'isFeatured',
		header: ({ column }) =>
			renderComponent(DataTableSort, { name: 'Featured', onclick: column.getToggleSortingHandler() }),
		sortable: true,
		cell: (info) => (info.getValue() ? '★' : '')
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
		accessorKey: 'actions',
		header: 'Actions',
		cell: ({ row }) => renderComponent(RowActions, { id: row.original.id, label: 'add-on' })
	}
];
