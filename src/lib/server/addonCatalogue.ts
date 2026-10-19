import { and, eq, ne } from 'drizzle-orm';
import { addons } from './db/schema';

/**
 * Add-ons a customer may put on an injera order, subscription or upcoming delivery:
 * active, and not marked "on its own only".
 */
export const sellableWithInjera = () =>
	and(eq(addons.isActive, true), ne(addons.availability, 'standalone'));

/** Add-ons that can be bought by themselves from /addons. */
export const sellableAlone = () =>
	and(eq(addons.isActive, true), ne(addons.availability, 'with_injera'));
