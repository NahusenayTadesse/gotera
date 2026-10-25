import { shiftDays, todayInTimeZone, type CalendarDate } from '$lib/format';

/**
 * How many days before a delivery changes to it are locked (skips, add-ons).
 *
 * Derived rather than stored: there is no `cutoff_date` column on `deliveries` yet.
 * If ops ever needs a per-delivery override, add that column and read it here —
 * this is the single place the page, the actions and the UI copy all agree on.
 */
export const CUTOFF_DAYS = 4;

/** The last calendar day on which a delivery can still be changed. */
export const cutoffDateFor = (scheduledDate: Date | CalendarDate): CalendarDate =>
	shiftDays(scheduledDate, -CUTOFF_DAYS);

/**
 * True once the cut-off day has fully passed in the business time zone.
 * ISO calendar dates compare chronologically as plain strings.
 */
export const isPastCutoff = (scheduledDate: Date | CalendarDate) =>
	todayInTimeZone() > cutoffDateFor(scheduledDate);

/** A customer whose delivery an admin just moved — for the "your delivery moved" email. */
export type AffectedRecipient = { email: string; name?: string };

/** What an admin skip/move action hands back, so the page can toast and offer the notice email. */
export type MoveResult = {
	text: string;
	affected: AffectedRecipient[];
	fromLabel?: string;
	toLabel: string;
};
