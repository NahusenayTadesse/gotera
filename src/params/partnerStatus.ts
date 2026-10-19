import type { ParamMatcher } from '@sveltejs/kit';

/** `/dashboard/partners/approved` etc. — keeps status pages from swallowing `[id]` UUIDs. */
export const match = ((param: string): param is 'new' | 'contacted' | 'approved' | 'declined' =>
	param === 'new' || param === 'contacted' || param === 'approved' || param === 'declined') satisfies ParamMatcher;
