import { k as and, f as ne, y as addons, j as eq } from './db.js-Can7tpXV.js';

//#region src/lib/server/addonCatalogue.ts
/**
* Add-ons a customer may put on an injera order, subscription or upcoming delivery:
* active, and not marked "on its own only".
*/
var sellableWithInjera = () => and(eq(addons.isActive, true), ne(addons.availability, "standalone"));

export { sellableWithInjera as s };
//# sourceMappingURL=addonCatalogue.js-CjZa1WMm.js.map
