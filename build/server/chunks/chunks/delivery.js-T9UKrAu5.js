import { s as shiftDays, b as todayInTimeZone } from './format.js-DhQga0l2.js';

//#region src/lib/delivery.ts
/** The last calendar day on which a delivery can still be changed. */
var cutoffDateFor = (scheduledDate) => shiftDays(scheduledDate, -4);
/**
* True once the cut-off day has fully passed in the business time zone.
* ISO calendar dates compare chronologically as plain strings.
*/
var isPastCutoff = (scheduledDate) => todayInTimeZone() > cutoffDateFor(scheduledDate);

export { cutoffDateFor as c, isPastCutoff as i };
//# sourceMappingURL=delivery.js-T9UKrAu5.js.map
