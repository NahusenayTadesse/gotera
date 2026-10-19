import type { Actions, PageServerLoad } from './$types';
import { loadPartners, setPartnerStatus } from './partners.server';

export const load: PageServerLoad = async ({ url }) => loadPartners(url);

export const actions: Actions = { setStatus: setPartnerStatus };
