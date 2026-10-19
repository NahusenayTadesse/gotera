/**
 * Add-on catalogue vocabulary, shared by the database schema, the dashboard editor and the
 * public /addons shop. Client-safe: no server imports.
 *
 * Changing one of these lists means changing a MySQL enum (or the values stored in the
 * `tags` JSON column), so add to the end and write a migration — never rename in place.
 */

/** What kind of product it is. Shown to admins as "Type". */
export const ADDON_CATEGORIES = ['spice', 'sauce', 'pantry', 'kit', 'drink', 'snack', 'bundle'] as const;
export type AddonCategory = (typeof ADDON_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<AddonCategory, string> = {
	spice: 'Spice',
	sauce: 'Sauce',
	pantry: 'Pantry',
	kit: 'Kit',
	drink: 'Drink',
	snack: 'Snack',
	bundle: 'Bundle'
};

/**
 * How an add-on can be bought.
 *  - `both`        on its own from /addons, or alongside injera (the default)
 *  - `standalone`  only on its own — e.g. something that ships separately
 *  - `with_injera` only as an extra on an injera order or subscription
 */
export const ADDON_AVAILABILITY = ['both', 'standalone', 'with_injera'] as const;
export type AddonAvailability = (typeof ADDON_AVAILABILITY)[number];

export const AVAILABILITY_LABELS: Record<AddonAvailability, string> = {
	both: 'On its own or with injera',
	standalone: 'On its own only',
	with_injera: 'With injera only'
};

/** Dietary / flavour tags customers can filter by. Stored as a JSON string array. */
export const ADDON_TAGS = [
	'vegan',
	'gluten_free',
	'spicy',
	'organic',
	'nut_free',
	'dairy_free',
	'handmade'
] as const;
export type AddonTag = (typeof ADDON_TAGS)[number];

export const TAG_LABELS: Record<AddonTag, string> = {
	vegan: 'Vegan',
	gluten_free: 'Gluten free',
	spicy: 'Spicy',
	organic: 'Organic',
	nut_free: 'Nut free',
	dairy_free: 'Dairy free',
	handmade: 'Handmade'
};

/** Hottest value of `spiceLevel`; 0 means not spicy. */
export const MAX_SPICE_LEVEL = 3;

/** Same per-line cap as /subscribe, /account and /addons/[token]. */
export const MAX_ADDON_QTY = 20;

export const canSellAlone = (a: { availability?: AddonAvailability | null }) =>
	(a.availability ?? 'both') !== 'with_injera';

export const canSellWithInjera = (a: { availability?: AddonAvailability | null }) =>
	(a.availability ?? 'both') !== 'standalone';

/**
 * Browser URL for an add-on's image, or null when it has none.
 *
 * Uploaded images are stored as a bare file name and served from /files. Rows created
 * before uploads existed may hold a full URL typed into the old "Image URL" field; those
 * are passed through untouched.
 */
export function addonImageSrc(image: string | null | undefined): string | null {
	if (!image) return null;
	if (/^(https?:)?\/\//.test(image) || image.startsWith('/')) return image;
	return `/files/${encodeURIComponent(image)}`;
}

/** `tags` as a clean string array, whatever shape the JSON column handed back. */
export function tagsOf(value: unknown): AddonTag[] {
	let parsed = value;
	if (typeof parsed === 'string') {
		try {
			parsed = JSON.parse(parsed);
		} catch {
			return [];
		}
	}
	if (!Array.isArray(parsed)) return [];
	return parsed.filter((t): t is AddonTag => (ADDON_TAGS as readonly string[]).includes(t));
}
