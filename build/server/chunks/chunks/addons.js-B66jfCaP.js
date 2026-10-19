//#region src/lib/addons.ts
/**
* Add-on catalogue vocabulary, shared by the database schema, the dashboard editor and the
* public /addons shop. Client-safe: no server imports.
*
* Changing one of these lists means changing a MySQL enum (or the values stored in the
* `tags` JSON column), so add to the end and write a migration — never rename in place.
*/
/** What kind of product it is. Shown to admins as "Type". */
var ADDON_CATEGORIES = [
	"spice",
	"sauce",
	"pantry",
	"kit",
	"drink",
	"snack",
	"bundle"
];
var CATEGORY_LABELS = {
	spice: "Spice",
	sauce: "Sauce",
	pantry: "Pantry",
	kit: "Kit",
	drink: "Drink",
	snack: "Snack",
	bundle: "Bundle"
};
/**
* How an add-on can be bought.
*  - `both`        on its own from /addons, or alongside injera (the default)
*  - `standalone`  only on its own — e.g. something that ships separately
*  - `with_injera` only as an extra on an injera order or subscription
*/
var ADDON_AVAILABILITY = [
	"both",
	"standalone",
	"with_injera"
];
var AVAILABILITY_LABELS = {
	both: "On its own or with injera",
	standalone: "On its own only",
	with_injera: "With injera only"
};
/** Dietary / flavour tags customers can filter by. Stored as a JSON string array. */
var ADDON_TAGS = [
	"vegan",
	"gluten_free",
	"spicy",
	"organic",
	"nut_free",
	"dairy_free",
	"handmade"
];
var TAG_LABELS = {
	vegan: "Vegan",
	gluten_free: "Gluten free",
	spicy: "Spicy",
	organic: "Organic",
	nut_free: "Nut free",
	dairy_free: "Dairy free",
	handmade: "Handmade"
};
var canSellAlone = (a) => (a.availability ?? "both") !== "with_injera";
var canSellWithInjera = (a) => (a.availability ?? "both") !== "standalone";
/**
* Browser URL for an add-on's image, or null when it has none.
*
* Uploaded images are stored as a bare file name and served from /files. Rows created
* before uploads existed may hold a full URL typed into the old "Image URL" field; those
* are passed through untouched.
*/
function addonImageSrc(image) {
	if (!image) return null;
	if (/^(https?:)?\/\//.test(image) || image.startsWith("/")) return image;
	return `/files/${encodeURIComponent(image)}`;
}
/** `tags` as a clean string array, whatever shape the JSON column handed back. */
function tagsOf(value) {
	let parsed = value;
	if (typeof parsed === "string") try {
		parsed = JSON.parse(parsed);
	} catch {
		return [];
	}
	if (!Array.isArray(parsed)) return [];
	return parsed.filter((t) => ADDON_TAGS.includes(t));
}

export { ADDON_AVAILABILITY as A, CATEGORY_LABELS as C, TAG_LABELS as T, ADDON_CATEGORIES as a, addonImageSrc as b, canSellAlone as c, ADDON_TAGS as d, canSellWithInjera as e, AVAILABILITY_LABELS as f, tagsOf as t };
//# sourceMappingURL=addons.js-B66jfCaP.js.map
