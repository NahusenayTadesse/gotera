//#region src/params/partnerStatus.ts
/** `/dashboard/partners/approved` etc. — keeps status pages from swallowing `[id]` UUIDs. */
var match = ((param) => param === "new" || param === "contacted" || param === "approved" || param === "declined");

export { match };
//# sourceMappingURL=partnerStatus.js-nDr4fxG5.js.map
