import { k as and, f as ne, z as addons, j as eq } from './db.js-C0XyR4ft.js';

//#region src/lib/server/addonCatalogue.ts
/**
* Add-ons a customer may put on an injera order, subscription or upcoming delivery:
* active, and not marked "on its own only".
*/
var sellableWithInjera = () => and(eq(addons.isActive, true), ne(addons.availability, "standalone"));

export { sellableWithInjera as s };
//# sourceMappingURL=addonCatalogue.js-DaKISk6W.js.map
