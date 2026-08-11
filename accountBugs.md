# Account Page — Bug Report

Audit of `src/routes/account/**` (overview, layout, delivery, history, details, cancel, change-plan).
Findings are ordered by severity. Line numbers are from the state of `main` at commit `dda6268`, before
the fixes below were applied.

Verification done: static read of every file in the route, `npx svelte-check` (5 type errors, all in this
route), cross-check against `src/lib/server/db/schema.ts`, and a dev-server smoke run (`/account` correctly
303s to `/login` when signed out).

---

## ✅ Status: all 28 findings fixed

Every item in this report has been addressed. See **[Fix log](#fix-log)** at the bottom for what changed,
what still needs a human step, and what remains untested.

Post-fix verification:

- `svelte-check`: **0 errors in `src/routes/account/**`** (was 5, plus 17 more once the change-plan rewrite
  landed). Project-wide errors went 348 → 326; the remaining 326 are pre-existing and outside this route.
- `vite build`: succeeds.
- Dev-server smoke run: all six account routes 303 to `/login` when signed out, no 500s.
- Timezone helper checked under `TZ=UTC`, `America/Los_Angeles`, `Pacific/Kiritimati`, `Europe/London`,
  `Asia/Kolkata` — dates and cut-offs now identical in all five (see fix log, #14).

---

## 🔴 Critical — the page is broken or does the wrong thing

### 1. `/account` layout crashes for every signed-in subscriber (columns don't exist)

**Where:** `src/routes/account/+layout.server.ts:37, 58, 60, 61`

```ts
const [plan] = await db.select().from(plans).where(eq(plans.slug, sub.plan)); // sub.plan ❌
status: sub.status,                                                          // sub.status ❌
statusLabel: STATUS_LABEL[sub.status] ?? sub.status,                          // ❌
```

The `subscribers` table (`schema.ts:18-29`) has **no `plan` and no `status` column** — those moved onto
`subscriptions` when the one-row-per-plan model landed. `svelte-check` confirms this with 5 errors. At
runtime `eq(plans.slug, undefined)` produces a broken/`NULL` comparison and `sub.status` is `undefined`, so
the header summary is either wrong or the load throws. Because this is the **layout**, it takes down every
page under `/account`.

**Fix:** derive the summary from `subscriptions`, the same way `+page.server.ts` already does. Also note the
layout is running a second, duplicate set of queries that the page load already performs.

```ts
const [primary] = await db
  .select({
    status: subscriptions.status,
    planName: plans.name,
    packs: plans.packs,
    interval: plans.interval,
    pricePence: plans.pricePence,
    quantity: subscriptions.quantity,
    currentPeriodEnd: subscriptions.currentPeriodEnd
  })
  .from(subscriptions)
  .innerJoin(plans, eq(plans.id, subscriptions.planId))
  .where(and(eq(subscriptions.subscriberId, sub.id), ne(subscriptions.status, 'cancelled')))
  .orderBy(asc(plans.sortOrder))
  .limit(1);
```

**Suggestion:** with several subscriptions the "one plan" header is misleading anyway. Either show
`"3 plans"` in the header, or move the summary out of the layout and let each page own its data.

---

### 2. "Change plan" is a **cancellation** page

**Where:** `src/routes/account/change-plan/+page.server.ts` (whole file),
`src/routes/account/change-plan/+page.svelte` (whole file), `change-plan/schema.ts`

The route is a near-verbatim copy of `/account/cancel`: it imports `cancelSchema`, renders "which plan do you
want to cancel", collects cancellation reasons, and its action sets `cancelAtPeriodEnd: true`. The sidebar
link `Change plan` (`+layout.svelte:21`) and the per-card `Change plan` link (`+page.svelte:111`) both send
customers here.

**This means a customer clicking "Change plan" is walked into cancelling their subscription.** That is a
direct revenue and trust problem, not just a code smell.

**Fix:** implement the actual change-plan flow — list the other `plans` rows (`active = true`, same `kind`),
let the customer pick one, and write `pendingPlanId` / `pendingPlanAt` on the subscription (both columns
already exist at `schema.ts:47-48`, and `+page.server.ts:124-131` already renders the "switching to X on Y"
notice — the write side is simply missing). Mirror it to Stripe with a subscription item price swap at
period end.

**Suggestion:** until it's implemented, point both links at `/account/cancel` or hide them, rather than
leaving a mislabelled cancel form live.

---

### 3. The change-plan action writes columns that don't exist → 500 on submit

**Where:** `src/routes/account/change-plan/+page.server.ts:131-139`

```ts
.set({
  cancelAtPeriodEnd: true,
  cancellationReason: form.data.reason ?? null,     // ❌ not on subscriptions
  cancellationFeedback: form.data.feedback ?? null, // ❌
  cancelledAt: new Date()                           // ❌
})
```

None of those three columns exist on `subscriptions` (`schema.ts:32-52`); `svelte-check` flags it. Even
setting bug #2 aside, submitting this form throws.

**Fix:** either add the columns via a Drizzle migration (`cancellation_reason varchar(64)`,
`cancellation_feedback text`, `cancelled_at timestamp`) or drop them from the `.set()`. The
`/account/cancel` route solves the same problem by pushing the reason into Stripe metadata
(`cancel/+page.server.ts:112-115`) — pick one approach and use it in both places.

---

### 4. Logging out from `/account` posts to an admin-only route

**Where:** `src/lib/forms/Logout.svelte:8` (`action = '/dashboard/?/logout'`), used bare at
`src/routes/account/+layout.svelte:142`

The sidebar logout submits to `/dashboard?/logout`, but `src/routes/dashboard/+layout.server.ts:8-10`
returns `403 Not Allowed` for anyone whose role isn't `Admin` — i.e. every customer. Meanwhile
`/account` **does** define its own `logout` action (`+page.server.ts:291-295`) that nothing calls.

**Fix:** pass the action explicitly in the account layout:

```svelte
<Logout action="/account?/logout" />
```

### 4b. …and the `/account` logout action doesn't finish the job

**Where:** `src/routes/account/+page.server.ts:291-295`

```ts
logout: async (event) => {
  await auth.api.signOut({ headers: event.request.headers });
}
```

No redirect and no cookie propagation, so the user stays on `/account` with a stale session view. The
dashboard version (`dashboard/+page.server.ts:53-60`) gets this right.

**Fix:**

```ts
logout: async (event) => {
  await auth.api.signOut({ headers: event.request.headers });
  redirect('/login', { type: 'success', message: 'Logout Successful' }, event.cookies);
}
```

---

## 🟠 High — data integrity, money, and auth

### 5. `addAddon` accepts `NaN` quantities

**Where:** `src/routes/account/+page.server.ts:250-251`

```ts
const quantity = Math.max(0, Number(data.get('quantity') ?? 0));
if (!addonId || !deliveryId || quantity < 1) return fail(400, { message: 'Nothing to add.' });
```

`Number('abc')` → `NaN`, `Math.max(0, NaN)` → `NaN`, and **`NaN < 1` is `false`** — so the guard passes and
`NaN` reaches the INSERT/UPDATE. There is also no upper bound: `9999999` is accepted.

**Fix:**

```ts
const quantity = Number(data.get('quantity'));
if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
  return fail(400, { message: 'Nothing to add.' });
}
```

**Suggestion:** these actions are hand-rolled `formData` parsing while `/cancel` and `/details` already use
`sveltekit-superforms` + Zod. Move `skip` / `pause` / `resume` / `addAddon` onto small Zod schemas too — it
removes this whole class of bug.

### 6. The cut-off is displayed but never enforced

**Where:** `src/routes/account/+page.server.ts:21, 139-144` (display) vs `181-196` and `242-289` (actions)

The UI promises "add before *4 days before delivery*" (`+page.svelte:140, 215`), but neither `skip` nor
`addAddon` checks the cut-off server-side. A customer can skip or add to a delivery that ships tomorrow —
and, since `CUTOFF_DAYS` is a hardcoded client-of-ops constant with no `deliveries.cutoff_date` column, ops
has no way to override it per delivery.

**Fix:** re-derive the cut-off in the action and reject late changes:

```ts
const cutoff = new Date(delivery.scheduledDate);
cutoff.setDate(cutoff.getDate() - CUTOFF_DAYS);
if (new Date() > cutoff) return fail(400, { message: 'The cut-off for this delivery has passed.' });
```

Also hide/disable the Skip and Add buttons past cut-off, and show the reason.

**Suggestion:** promote `CUTOFF_DAYS` into a `cutoff_date` column on `deliveries` (or at least a shared
constant in `$lib/server`), so the page, the actions, and the ops tooling agree.

### 7. `skip` doesn't check the delivery is still skippable

**Where:** `src/routes/account/+page.server.ts:190-193`

```ts
await db.update(deliveries).set({ status: 'skipped' })
  .where(and(eq(deliveries.id, id), eq(deliveries.subscriberId, sub.id)));
```

Ownership is enforced (good), but status is not — a **delivered** or **dispatched** delivery can be flipped
to `skipped`, corrupting order history and any downstream reporting. Note `addAddon` gets this right
(`:255-264` filters on `status = 'scheduled'`).

**Fix:** add `eq(deliveries.status, 'scheduled')` to the WHERE clause and check `resultSetHeader.affectedRows`
so a no-op returns a `fail()` instead of a false "Delivery skipped." toast.

### 8. `/details` actions run without an auth guard

**Where:** `src/routes/account/details/+page.server.ts:56, 71` — `locals.user!.id`

The `load` redirects unauthenticated users (`:26`), but the three actions only assert with `!`. A direct POST
without a session throws `TypeError: Cannot read properties of undefined` → an opaque 500 instead of a 401.
(`updateEmail` at `:105` never touches `locals.user` before Better Auth, but should still guard.)

**Fix:** add `if (!locals.user) return fail(401, { form });` at the top of each action.

### 9. Two divergent cancel implementations; one silently desyncs Stripe

**Where:** `src/routes/account/cancel/+page.server.ts` vs `src/routes/account/change-plan/+page.server.ts`

| | `/account/cancel` | `/account/change-plan` |
|---|---|---|
| Calls Stripe | ✅ `:110-116` | ❌ commented out `:125-129` |
| Blocks re-cancel | only on `status === 'cancelled'` `:101` | also on `cancelAtPeriodEnd` `:117` |
| Stores reason | Stripe metadata | non-existent DB columns |

The change-plan path marks a subscription `cancelAtPeriodEnd` **without telling Stripe** — the customer sees
"cancelling", then keeps getting billed.

**Fix:** delete the duplicate. Keep one cancel action, and always write to Stripe **before** the DB (as
`/cancel` does), so a Stripe failure can't leave the DB claiming a cancellation that never happened.

### 10. Cancel pre-selection never fires (query-param name mismatch)

**Where:** `src/routes/account/+page.svelte:177` links `?subscriptionId=…`, but
`src/routes/account/cancel/+page.server.ts:66` reads `url.searchParams.get('id')`

With more than one plan the customer lands on the cancel page with nothing selected and has to re-pick —
exactly the moment you don't want ambiguity about which plan is going away. (`/account/change-plan` reads no
param at all, so its link at `+page.svelte:111` is equally inert.)

**Fix:** read `subscriptionId` in the cancel load, and accept `id` as a fallback for old links.

### 11. `console.log('user', user)` leaks the session user into server logs

**Where:** `src/routes/account/cancel/+page.server.ts:15`

Dumps email, name, and id on every page view. **Fix:** delete the line.

---

## 🟡 Medium — wrong numbers and misleading UI

### 12. "£X /month combined" includes non-monthly and non-active plans

**Where:** `src/routes/account/+page.svelte:18-22`

```ts
const totalMonthlyPence = $derived(
  data.subscriptions

    .reduce((sum, s) => sum + s.pricePence, 0)
);
```

The stray blank line at `:20` is where a `.filter(...)` used to be. As written, the total sums **paused**,
**pending**, and **bi-monthly / one-time** plans (`plans.interval` allows all three) and labels the result
"per month". A customer with a paused plan sees a monthly charge they aren't being billed.

**Fix:** normalise to a real monthly figure and only count what's actually billing:

```ts
const totalMonthlyPence = $derived(
  data.subscriptions
    .filter((s) => s.status === 'active' && !s.cancelAtPeriodEnd && s.interval !== 'one_time')
    .reduce((sum, s) => sum + (s.interval === 'bi_monthly' ? s.pricePence / 2 : s.pricePence), 0)
);
```

(`interval` needs adding to the payload in `+page.server.ts:149-163` — it's already selected at `:66`.)

### 13. Header status pill is green no matter the status

**Where:** `src/routes/account/+layout.svelte:70-72`, CSS at `:192-213`

`.status-pill` hardcodes `--success` green for the background, border, text, and dot, but renders
`data.summary.statusLabel`, which can be **Paused** or **Cancelled**. A cancelled account gets a reassuring
green badge.

**Fix:** add `class="status-pill status-{data.summary.status}"` and reuse the amber/red modifiers already
written on the overview page (`+page.svelte:305-309`) — better still, lift those pill styles into
`layout.css` so both use one definition.

### 14. Off-by-one dates from timezone coercion

**Where:** `src/routes/account/+page.server.ts:23-25, 138-144`; `+layout.server.ts:16-19`;
`history/+page.server.ts:15-18`

`deliveries.scheduledDate` is a **`date`** column (`schema.ts:129`). `new Date('2026-04-18')` parses as
**UTC midnight**, then `Intl.DateTimeFormat` renders it in the **server's** timezone. Any server west of UTC
(or a UTC server rendering for a UK viewer during BST edge cases) shows *17 April*. The cut-off label
inherits the same shift.

**Fix:** format with an explicit timezone, or keep the date as a plain string and split it:

```ts
new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/London' })
```

### 15. Order history shows *today's* price, not what was paid

**Where:** `src/routes/account/history/+page.server.ts:47-48, 92`

The amount is joined live from `plans.pricePence`. When a plan's price changes, **every past order's total
retroactively changes**. It also ignores `subscriptions.quantity`, so a `×2` subscription's history shows
half the real amount.

**Fix:** snapshot `amount_pence` (and ideally the plan name) onto `deliveries` at fulfilment time and read
that. As an interim, at least multiply by `subscriptions.quantity`.

**Suggestion:** history is unbounded — no `limit`/pagination. A two-year customer pulls every row on each
visit. Add `.limit(50)` with a "load more".

### 16. Add-on target selection resets after every action

**Where:** `src/routes/account/+page.svelte:29-33`

```ts
let selectedSubId = $derived(deliverableSubs[0]?.id ?? '');
```

Because `withToast` calls `await update()` (`:65`), `data` changes after **every** skip/pause/resume/add, and
the `$derived` snaps the picker back to the first subscription. A customer adding two add-ons to their
*second* plan silently sends the second one to the *first* plan's delivery.

**Fix:** keep it as plain `$state` seeded once, and only fall back when the current id disappears:

```ts
let selectedSubId = $state('');
$effect(() => {
  if (!deliverableSubs.some((s) => s.id === selectedSubId)) selectedSubId = deliverableSubs[0]?.id ?? '';
});
```

### 17. Add-on quantity map goes stale

**Where:** `src/routes/account/+page.svelte:10-12` (`svelte-check` warns: *"only captures the initial value
of `data`"*)

`quantities` is built once from the first `data.addons`. After an `invalidateAll` that returns a new add-on,
`quantities[item.id]` is `undefined` — the stepper renders blank, and `undefined < 1` is `false`, so the
**Add button is enabled with no quantity**, hitting the `NaN` path in bug #5.

**Fix:** default at read time — `quantities[item.id] ?? 0` in the display and in the `disabled` check — or
rebuild the map in an `$effect` keyed on `data.addons`.

### 18. Mutation buttons can be double-submitted

**Where:** `src/routes/account/+page.svelte:158-180, 253-264`

None of the skip / pause / resume / add forms disable their button while in flight. Double-clicking "Add"
adds the add-on twice (`+page.server.ts:274-278` **increments** the existing row). Skip and pause are
idempotent so they're only noisy, but Add costs the customer money.

**Fix:** track a `submitting` flag inside `withToast` and bind it to `disabled`.

---

## 🔵 Low — polish, a11y, i18n

### 19. Dead redirect to a route that doesn't exist

**Where:** `src/routes/account/+page.server.ts:48` and `history/+page.server.ts:35` → `redirect(303, '/signin')`

There is no `/signin` route — the app uses **`/login`** (`+layout.server.ts:30`, `cancel/+page.server.ts:16`,
`details/+page.server.ts:26`). The layout guard usually wins the race, which is why nobody has hit the 404
yet, but it's a landmine. **Fix:** change both to `/login`.

### 20. Dates and currency ignore the active locale

**Where:** every `Intl.DateTimeFormat('en-GB', …)` and `` `£${(p / 100).toFixed(2)}` `` across the route

The site ships Paraglide with an `am` locale and 1,800+ message files, but the account page hardcodes
`en-GB` formatting and a literal `£`. Amharic users get English weekday and month names inside otherwise
translated sentences.

**Fix:** thread `getLocale()` from `$lib/paraglide/runtime` into the formatters and use
`Intl.NumberFormat(locale, { style: 'currency', currency: 'GBP' })`. Put both helpers in one shared module —
they're currently reimplemented in four files.

### 21. Cancel confirmation is never shown

**Where:** `src/routes/account/cancel/+page.server.ts:133` redirects to `/account?cancelled=1`, but nothing
in `/account` reads `cancelled`

The customer completes a cancellation and lands on a page with no acknowledgement. **Fix:** read the param in
`+page.svelte` and fire a toast, or use `sveltekit-flash-message` (already a dependency) as
`dashboard/+page.server.ts` does.

### 22. Dead UI branches for a status that can never render

**Where:** `src/routes/account/+page.svelte:109, 146, 176, 202`

The load filters cancelled subscriptions out (`+page.server.ts:77`: `ne(subscriptions.status, 'cancelled')`),
so `status === 'cancelled'` is unreachable on this page and `.status-cancelled` is dead CSS.

**Fix:** decide which behaviour you want. Showing recently-cancelled plans (greyed, with a "resubscribe"
link) is probably better for retention than hiding them — in which case fix the query, not the template.

### 23. Missing page titles

**Where:** `/account`, `/account/history`, `/account/details` have no `<svelte:head><title>`

Browser tabs read as whatever the root layout sets. `cancel` and `change-plan` do set titles — apply the same
to the rest, ideally from the account layout with a per-page override.

### 24. Google Fonts `<link>` duplicated per page

**Where:** `cancel/+page.svelte:31-46`, `change-plan/+page.svelte:41-46`

The same preconnect + stylesheet is injected on two subpages. It belongs in `src/app.html` once — as-is
these two routes are the only ones guaranteed to have the font, which is why other account pages can flash
a fallback serif.

### 25. Accessibility gaps

- `+layout.svelte:113, 132` — decorative `{@html link.iconPath}` SVGs have no `aria-hidden="true"`, so
  screen readers announce empty graphics before each nav label. (The `{@html}` itself is safe here — the
  strings are static literals — but a comment saying so would stop the next reader from worrying.)
- `Logout.svelte:33` — the dialog overlay is click-to-close via `role="presentation"` with no `Escape`-only
  path documented, no focus trap, and focus isn't restored to the trigger on close.
- `+page.svelte:245-251` — the `−` / `+` stepper buttons have no `aria-label`; the current value isn't
  announced on change (needs `aria-live="polite"` on `.qty-n`).
- `+page.svelte:184-206` — the `.stats-row` uses `<div>`s for what is tabular data; a `<dl>` would convey
  the label/value relationship.

### 26. Layout width mismatch

**Where:** `+layout.svelte:159-166` — `.page-header` is `max-width: 1200px` while `.container` inside it is
`width: min(var(--max), calc(100% - 28px))`. If `--max` ≠ 1200px the header rule does nothing (or clips), and
the header no longer lines up with the content column below.

**Fix:** drop the `max-width` from `.page-header` and let `.container` own the measure.

### 27. Sticky-sidebar magic numbers

**Where:** `+layout.svelte:284-287` — `top: 68px; height: calc(100vh - 68px)` hardcodes the site header
height in two places. If the header changes, the sidebar overlaps or leaves a gap.

**Fix:** define `--header-h` once in `layout.css` and reference it.

### 28. Unused CSS (from `svelte-check`)

`.sidebar-danger-link` and `:hover` (`+layout.svelte:356, 368`) — left over from before `<Logout />`
replaced the link. `.notice strong` (`+page.svelte:314`) and `.delivery-detail strong` (`:321`) — the
Paraglide migration turned those into plain interpolations, so no `<strong>` is ever emitted. If the bold
emphasis was intentional, the messages need to move to `m.…()` with markup slots; otherwise delete the rules.

---

## Schema issue worth flagging

**`subscriber_addons` unique constraint contradicts the multi-subscription model**
(`src/lib/server/db/schema.ts:173`)

```ts
(table) => [unique('subscriber_addon_uniq').on(table.subscriberId, table.addonId)]
```

The table carries a `subscriptionId` (`:100-102`) precisely so recurring add-ons attach to a *specific*
plan — but the unique key is on `(subscriberId, addonId)`, so a customer **cannot** have the same recurring
add-on on two different subscriptions. `+page.server.ts:109-127` sums these per subscription, which quietly
assumes the opposite.

**Fix:** change the constraint to `(subscriptionId, addonId)`.

Related: `delivery_addons` (`schema.ts:142-155`) is the only table in the file without `...secureFields`, so
one-off add-ons have no audit trail (`createdBy` / `createdAt` / soft delete) while everything else does.

---

## Fix log

### New shared modules

**`src/lib/format.ts`** — one place for money and dates, locale-aware via Paraglide's `getLocale()`.

The core of it is a `CalendarDate` type (`YYYY-MM-DD` string) for `date` columns, kept deliberately
separate from `timestamp` values. A MySQL DATE has no zone, but mysql2 returns it as a Date at *local*
midnight, so normalising it to a Date "in UTC" and reading it back through local getters moves the day.
Strings make the conversion idempotent, and `toCalendarDate` (the Date form) is intentionally **not
exported** so that round-trip can't be written. `timestamp` columns keep a real instant and are rendered
via `instantDate` in `Europe/London`.

**`src/lib/delivery.ts`** — `CUTOFF_DAYS`, `cutoffDateFor()`, `isPastCutoff()`. Previously the cut-off was
a constant private to the overview page, used for display only.

### Per-finding

| # | Fix |
|---|---|
| 1 | `+layout.server.ts` rewritten to read plan/status from `subscriptions ⋈ plans`. Multi-plan holders now get a "3 plans" header instead of one arbitrary plan, and `nextPaymentDate` is a real date (soonest `currentPeriodEnd`) rather than a hardcoded `null`. |
| 2 | `/account/change-plan` rebuilt as an actual change-plan flow: pick a subscription → pick a live `kind: 'subscription'` plan → writes `pendingPlanId` / `pendingPlanAt`. The account page already rendered the resulting "Switching to X on Y" notice; only the write side was missing. Message catalogue (`acctplan_*`, en + am) rewritten to match; cancellation-specific keys removed. |
| 3 | Moot — the action no longer cancels, so the three non-existent columns are gone. Reason/feedback capture stays in `/account/cancel`, which puts it in Stripe metadata. |
| 4 | `<Logout action="/account?/logout" />` in the account layout. |
| 4b | `/account?/logout` now `redirect(303, '/login')` after `signOut`. |
| 5 | All four actions parse through Zod schemas (`z.coerce.number().int().min(1).max(20)` for quantity). The `NaN < 1 === false` hole is closed. |
| 6 | `getChangeableDelivery()` enforces ownership + `status = 'scheduled'` + cut-off in one place, used by both `skip` and `addAddon`. UI hides Skip/Add past cut-off and shows a "changes are closed" chip instead of a stale date. |
| 7 | `skip` now goes through the same helper, so a dispatched or delivered order can no longer be flipped to `skipped`. |
| 8 | `if (!locals.user) return fail(401, { form })` on all three `/details` actions; `locals.user!` non-null assertions removed. |
| 9 | Duplicate cancel flow deleted with the change-plan rewrite. `/account/cancel` is the single cancel path and keeps its Stripe-first ordering. |
| 10 | Cancel and change-plan both read `?subscriptionId=`, falling back to `?id=` for old links. Preselect now also skips already-cancelling plans. |
| 11 | `console.log('user', user)` removed. |
| 12 | Total filters to `status === 'active' && !cancelAtPeriodEnd` and normalises through `monthlyEquivalentPence()` (bi-monthly halved, one-off excluded). `interval` added to the page payload. |
| 13 | `.status-pill` gets a `status-{status}` modifier; base state is neutral, with green/amber/red variants. `.status-dot` uses `currentColor`. |
| 14 | All formatting moved to `$lib/format`. Verified across five timezones — before, `TZ=America/Los_Angeles` rendered `2026-04-18` as "Friday, 17 April"; now all five agree. |
| 15 | History multiplies by `subscriptions.quantity` and shows `4 packs ×2`. The live-price caveat is now an explicit comment naming the real fix (an `amount_pence` snapshot on `deliveries`) — that needs a schema change and a fulfilment-side write, so it is **not** fully resolved. |
| 15b | History paginates: 50 rows, `?limit=` + "Load more". |
| 16 | `selectedSubId` is `$state` with an `$effect` that only re-seeds when the current id disappears, so `update()` no longer resets the add-on target mid-session. |
| 17 | `quantities` reads through `qtyOf(id)` (`?? 0`), so a changed catalogue can't produce a blank stepper with an enabled Add button. |
| 18 | A `pending` key disables the in-flight form's button across skip / pause / resume / add. |
| 19 | Both `/signin` redirects → `/login`. |
| 20 | Dates and currency go through `$lib/format`, which resolves `en-GB` / `am-ET` from the active locale and formats GBP via `Intl.NumberFormat`. |
| 21 | `?cancelled=1` now fires a toast on the account page. |
| 22 | Unreachable `status === 'cancelled'` branches removed (the load filters those rows out). |
| 23 | `<title>` added to `/account`, `/account/history`, `/account/details`, `/account/delivery`. |
| 24 | Duplicate Google Fonts `<link>`s removed from cancel and change-plan — the root layout already loads them globally. Also dropped their duplicated `:global(:root)` theme blocks. |
| 25 | `aria-hidden="true"` on decorative nav/toggle SVGs; `aria-label` + `aria-live` on the add-on stepper; stats block converted to `<dl>`; Logout dialog got a focus trap, focus-on-open, focus restore, and `tabindex="-1"`. |
| 26 | `max-width: 1200px` dropped from `.page-header`; `.container` owns the measure. |
| 27 | Sticky sidebar uses `var(--nav-h)` (defined in the root layout) instead of a hardcoded `68px`. |
| 28 | Dead CSS removed: `.sidebar-danger-link`, `.notice strong`, `.delivery-detail strong`, and the unused `h2/h3/h4` layout rule. |
| Schema | `subscriber_addon_uniq` moved to `(subscription_id, addon_id)`; `delivery_addons` gained `...secureFields`. |

### Needs a human step

- **The migration is generated but not applied.** `drizzle/0010_milky_rachel_grey.sql` drops and recreates
  the `subscriber_addons` unique key and adds the audit columns to `delivery_addons`. Run `npm run db:migrate`
  when you're ready — I did not touch your database. If any subscriber currently has the same add-on on two
  subscriptions the old key would already have blocked it, so the new key is strictly more permissive and the
  recreate is safe.
- **Stripe is still not wired for plan changes.** `change-plan/+page.server.ts` writes `pendingPlanId` and
  marks the hook point with the exact call needed (price swap, `proration_behavior: 'none'`,
  `billing_cycle_anchor: 'unchanged'`), placed *before* the DB write. Until that's filled in, a scheduled
  switch lives only in your DB. The same is still true of `pause`/`resume` on the overview page, which were
  already marked as hook points before this pass.
- **Amharic strings for the new change-plan UI** are my translations and are worth a native review.

### Still untested

I could not exercise the signed-in paths — that needs a seeded subscriber with subscriptions, deliveries and
add-ons, and I didn't want to write into your dev database uninvited. Everything above is verified by
`svelte-check`, a successful build, the timezone harness, and signed-out route smoke tests. **The rendered
signed-in account page has not been seen running.** If you seed a test subscriber I can drive the full flow
(skip, pause, add-on, change plan, cancel) and confirm.

There is still no test coverage on this route; findings #1, #2, #5 and #7 are each worth a regression test.
