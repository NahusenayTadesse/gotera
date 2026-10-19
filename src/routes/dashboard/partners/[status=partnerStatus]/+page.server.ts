import type { Actions, PageServerLoad } from './$types';
import { loadPartners, setPartnerStatus } from '../partners.server';

export const load: PageServerLoad = async ({ url, params }) => loadPartners(url, params.status);

export const actions: Actions = { setStatus: setPartnerStatus };
