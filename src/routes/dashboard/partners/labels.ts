/** Dashboard (English-only) labels for the category keys stored by the public /partners form. */
export const CATEGORY_LABELS: Record<string, string> = {
	restaurant: 'Restaurant / café',
	shop: 'Shop / grocery',
	caterer: 'Caterer / events',
	community: 'Church / community',
	corporate: 'Office / corporate',
	teff: 'Teff & grains',
	spices: 'Spices',
	produce: 'Fresh produce',
	packaging: 'Packaging',
	logistics: 'Delivery & logistics',
	other: 'Other'
};

export const categoryLabel = (key: string | null | undefined) =>
	(key && CATEGORY_LABELS[key]) || key || '—';

export const PARTNER_CATEGORY_KEYS = ['restaurant', 'shop', 'caterer', 'community', 'corporate', 'other'];
export const SUPPLIER_CATEGORY_KEYS = ['teff', 'spices', 'produce', 'packaging', 'logistics', 'other'];

export const STATUS_PAGES = [
	{ status: null, title: 'All', heading: 'Partners & Suppliers', href: '/dashboard/partners' },
	{ status: 'new', title: 'New', heading: 'New applications', href: '/dashboard/partners/new' },
	{ status: 'contacted', title: 'Contacted', heading: 'Contacted', href: '/dashboard/partners/contacted' },
	{ status: 'approved', title: 'Approved', heading: 'Approved partners & suppliers', href: '/dashboard/partners/approved' },
	{ status: 'declined', title: 'Declined / Ended', heading: 'Declined & ended', href: '/dashboard/partners/declined' }
] as const;
