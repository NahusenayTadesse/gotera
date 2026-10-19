# Project-wide Bug Hunt

Scope: whole app (`src/**`), focusing on auth, payments (Stripe), checkout, and server actions.
Line numbers are from `main` @ `1384712` plus the uncommitted working tree on 2026-10-19.
`accountBugs.md` already covers `src/routes/account/**`; this report doesn't repeat those findings.


---

## ✅ Status: all findings addressed (2026-10-19). **Apply migration 0022 before deploying.**

See **[Fix log](#fix-log)** at the bottom for what changed, what's verified, and what's still on you.

## How this was checked

| Check | Result |
| --- | --- |
| `vitest run --project server` | ✅ 13 files, 101 tests pass |
| `svelte-check` | ❌ **429 errors, 564 warnings** (paraglide generated files excluded) |
| `eslint src` | ❌ **401 errors, 1 warning** |
| Dev server probes (`curl`) | Reproduced finding #1 **live** using a harmless request: an empty payload that fails validation, so no data changed |
| Manual read | hooks, auth, Stripe webhook, `/subscribe`, `/addons/[token]`, `/partners`, account actions, admin users, stock, traceability, emails |

### Severity scale

- 🔴 **Critical**: security hole, lost money, or a core flow that doesn't work. Fix before the next deploy.
- 🟠 **High**: wrong data or a broken feature in a real but narrower path.
- 🟡 **Medium**: incorrect behaviour in edge cases, data-integrity drift, or a security weakness that needs an unlikely precondition.
- 🔵 **Low**: cosmetic, dead code, poor error messages, type-only problems.

### Summary

| # | Sev | Area | Title |
| --- | --- | --- | --- |
| 1 | 🔴 | Auth | Admin guard bypassed with the `/am/` locale prefix: anyone can run every dashboard action |
| 2 | 🔴 | Stripe | `invoice.subscription` no longer exists, so renewals never schedule deliveries |
| 3 | 🔴 | Checkout | Gift checkout sends a line item with no `quantity` to Stripe |
| 4 | 🔴 | Stripe | Subscription `checkout.session.completed` / `invoice.paid` aren't idempotent: duplicate deliveries |
| 5 | 🟠 | Email | HTML injection: customer-supplied names and addresses go raw into admin and customer emails |
| 6 | 🟠 | Admin | Edit-user duplicate-email path throws `setError is not defined` |
| 7 | 🟠 | Admin | Delete-user error path throws `form is not defined`, producing a 500 |
| 8 | 🟠 | Stock | Stock is never released when a delivery is skipped, paused or cancelled |
| 9 | 🟠 | Stock | One-off, gift and guest orders never reserve stock or create a delivery |
| 10 | 🟡 | Checkout | `quantity` is unbounded (`z.number()`) and stock reserves 1 unit no matter the quantity |
| 11 | 🟡 | Stripe | Delivery add-on fulfilment isn't atomic: a crash halfway loses paid items |
| 12 | 🟡 | Add-ons | `/addons/[token]` ignores the change cut-off that `/account` enforces |
| 13 | 🟡 | Checkout | `guestOrder` inserts an address before validating the plan, leaving orphan rows |
| 14 | 🟡 | UI | Desktop subscribe page calls `.trim()` on a `string[]` JSON column (latent crash) |
| 15 | 🟡 | Traceability | Guest and gift lines are dated by `createdAt`, not the delivery date, so FEFO picks wrong batches |
| 16 | 🟡 | Auth | Guest checkout auto-creates an account for any email typed into Stripe |
| 17 | 🔵 | Checkout | `updateSubscription` / `cancelSubscription` actions read a field their schema doesn't have (dead and always fail) |
| 18 | 🔵 | Errors | Raw exception messages are shown to users and admins |
| 19 | 🔵 | Admin | `{@html page.error?.message}` in the dashboard error page |
| 20 | 🔵 | Misc | Smaller issues (see list) |
| 21 | 🔵 | Tooling | 429 type errors and 401 lint errors hide the real problems |

---

## 🔴 Critical

### 1. Admin guard bypassed with the `/am/` locale prefix: anyone can run every dashboard action

**Where:** `src/hooks.server.ts:36` together with `src/hooks.ts:4`

```ts
// hooks.server.ts
if (event.url.pathname.startsWith('/dashboard')) { … 403 unless Admin … }
// hooks.ts
export const reroute = (request) => deLocalizeUrl(request.url).pathname;
```

`reroute` strips `/am` so that `/am/dashboard/...` matches the `/dashboard/...` route. But `event.url.pathname`
in `handle` is still the **original** `/am/dashboard/...`, so `startsWith('/dashboard')` is false and the
guard is skipped. The `+layout.server.ts` check still blocks **page loads**, but (as the comment in the hook
itself says) layout loads **don't run for form actions**. 15 of the 20 dashboard action files have no auth
check of their own.

**Reproduced live (no data changed):**

```
POST /dashboard/customers?/delete     (no session) → {"type":"redirect","status":302,"location":"/login"}
POST /am/dashboard/customers?/delete  (no session) → {"type":"failure","status":400, … "Too small: expected string …"}
```

The second request reached the `delete` action and stopped only because I sent no `id`. With a real ID,
an anonymous attacker can delete or edit customers, plans and add-ons, edit users and roles (privilege
escalation), send bulk email, change orders and partners, and so on.

**Fix:** guard on the delocalized path:

```ts
import { deLocalizeUrl } from '$lib/paraglide/runtime';
const path = deLocalizeUrl(event.url).pathname;
if (path === '/dashboard' || path.startsWith('/dashboard/')) { … }
```

Or, more robustly, use `event.route.id?.startsWith('/dashboard')`, which reflects the route that actually
matched. Also consider a `requireAdmin(locals)` call inside `contentCrud` actions as defence in depth.

### 2. `invoice.subscription` no longer exists, so renewals never schedule deliveries

**Where:** `src/routes/api/stripe/webhook/+server.ts:620-660`

```ts
const invoice = event.data.object as Stripe.Invoice & { subscription?: string };
if (invoice.subscription) { … scheduleDelivery(…) }
```

The installed SDK (`stripe@22`) targets API `2026-06-24.dahlia`. Since API `2025-03-31.basil`, Stripe moved
the subscription ID to `invoice.parent.subscription_details.subscription`, and `Invoice` has no `subscription`
field. The `& { subscription?: string }` cast hides the type error. For a webhook endpoint on any recent API
version:

- `invoice.paid`: **no delivery is ever scheduled for a renewal**. Customers are charged monthly and get
  only their first box.
- `invoice.payment_failed`: the customer and admin are never notified.

(The code already uses `items.data[0].current_period_end`, which is also a basil-era change, so the account is
almost certainly on a new API version.)

**Fix:**

```ts
const subId =
  (invoice.parent?.subscription_details?.subscription as string | undefined) ??
  (invoice as any).subscription; // legacy payloads
```

Also pin `apiVersion` in `src/lib/server/stripe.ts` so an SDK upgrade can't silently change payload shapes.

### 3. Gift checkout sends a line item with no `quantity` to Stripe

**Where:** `src/routes/subscribe/+page.server.ts:448-465` (svelte-check: *"Property 'quantity' is missing"*)

The `gift` action calls `oneTimeCheckout({...})` without `quantity`, so the line item becomes
`{ price, quantity: undefined }`. Stripe requires `quantity` for a `price` line item, so session creation
should fail and every gift purchase would end in *"checkout failed"*. The `giftOrders` row is still inserted
as `pending` first, which leaves junk rows behind.

**Fix:** pass `quantity: form.data.quantity ?? 1` (after the bounds check from #10). I couldn't call Stripe from
here, so test a real gift checkout to confirm.

### 4. Subscription webhooks aren't idempotent: duplicate deliveries and double stock use

**Where:** `webhook/+server.ts:521-600` and `620-636`

Stripe delivers events **at least once** and retries on any non-2xx or timeout. The gift and guest branches
guard with `alreadyPaid`, but the subscription branch doesn't. On a retried `checkout.session.completed`
(or a retried `invoice.paid`):

- `scheduleDelivery` inserts **another delivery row** and calls `consumeStock` again.
- Confirmation emails go out again.
- Add-ons are deleted and re-inserted (harmless).

The handler also does many slow steps (Stripe retrieve, emails) before it returns, which makes timeouts and
retries more likely.

**Fix:** record processed `event.id`s in a `stripe_events` table (unique) and return 200 early on a duplicate.
At minimum, skip scheduling when a delivery already exists for this subscription and period.

---

## 🟠 High

### 5. HTML injection in emails

**Where:** `src/lib/server/emailTemplates.ts` (for example lines 147, 278-281, 341-347, 411-421, 436-442, 482, 505-508, 537, 632)

Only the partner-application template uses `esc()`. Every other template interpolates `data.name`,
`buyerName`, `recipientName`, `addressLines` (joined with `<br />`), `addonNames` and so on **raw**. These come
from the public gift, guest and subscribe forms and from Stripe `customer_details.name`. An anonymous buyer can
put `<a href="https://evil">Click to approve refund</a>` in "recipient name" and it lands, styled as GOTERA,
in the **admin inbox** (`notifyAdminGiftOrder`, `notifyAdminOrder`, `notifyAdminNewSubscriber`) and in the
buyer's own confirmation.

**Fix:** run `esc()` on every interpolated user-provided string (or escape inside `detailRow`/`layout`).

### 6. Edit-user duplicate-email path throws `setError is not defined`

**Where:** `src/routes/dashboard/admin-panel/users/[id]/+page.server.ts:88`

`setError` isn't imported. Changing a user's email to one that already exists throws a `ReferenceError`,
which the `catch` turns into *"User Update Failed: setError is not defined"*. The intended validation message
never shows. **Fix:** `import { setError } from 'sveltekit-superforms'`.

### 7. Delete-user error path throws `form is not defined`, producing a 500

**Where:** same file, lines 123 and 133

- Line 123 references `err` outside any `catch` (a `ReferenceError` if `id` is missing).
- Line 133 calls `message(form, …)`, but `form` doesn't exist in `delete`, so the `catch` block **itself throws**
  and the admin gets a 500 instead of the flash message. Any failed delete (for example a foreign-key
  constraint because the user has sessions or subscribers) hits this.

**Fix:** return `fail(500, { message: … })` in the catch, and drop the `err` reference in the `!id` branch.

### 8. Stock is never released

**Where:** `src/lib/server/stock.ts` (only `consumeStock` exists) and `src/routes/account/+page.server.ts:241-266` (skip)

A booked delivery consumes 1 unit for its Saturday. Skipping it (`/account?/skip`), pausing or cancelling the
subscription, or an admin marking it skipped or failed never gives the unit back. Popular Saturdays show as
"full" while capacity is free, and later customers get rolled to the next week (`delivery-rolled` email)
for no reason.

**Fix:** add `releaseStock(date, units)` (with a `stockChanges` row) and call it everywhere a scheduled
delivery leaves the `scheduled` state without shipping.

### 9. One-off, gift and guest orders never reserve stock or create a delivery

**Where:** `webhook/+server.ts:347-515`

The payment-mode branches mark the order `paid` and send a "booked in for Saturday" email
(`deliveryLabel = nextDeliveryDate()`), but never call `consumeStock`. The stock dashboard undercounts, so
subscription customers can be booked onto a Saturday that's already physically full of one-off orders.

---

## 🟡 Medium

### 10. `quantity` is unbounded, and stock reserves 1 unit regardless of quantity

**Where:** `src/routes/subscribe/schema.ts:65` (`quantity: z.number().default(1)`), `webhook/+server.ts:270`

- Any number passes validation: `0`, `-3`, `2.5` and `10000` all reach Stripe. Stripe rejects the bad
  ones with an opaque "checkout failed". A huge value creates a real order the kitchen can't fulfil.
- `scheduleDelivery` → `consumeStock(date, 1)` reserves **one** unit whatever the subscription quantity or
  `plans.packs`, while traceability counts `packs × quantity`. The two disagree.

**Fix:** `z.coerce.number().int().min(1).max(N)`, and reserve `packs × quantity` units.

### 11. Delivery add-on fulfilment isn't atomic

**Where:** `webhook/+server.ts:149-175`

The `deliveryAddonPurchases` dedupe row is inserted **before** the `deliveryAddons` quantities are updated,
outside a transaction. If the process crashes or the DB errors partway, Stripe's retry sees the purchase as
"already processed" and returns early, so the customer paid and the items are never added. The
read-then-write `existing.quantity + item.quantity` is also racy against the account page's own edits.
**Fix:** wrap the insert and the updates in one `db.transaction`, and use
`quantity = quantity + ?` / `ON DUPLICATE KEY UPDATE`.

### 12. `/addons/[token]` ignores the change cut-off

**Where:** `src/routes/addons/[token]/+page.server.ts:53`

It checks only `status === 'scheduled'`. `/account?/addAddon` uses `getChangeableDelivery`, which also enforces
the cut-off. Through the email link a customer can pay for extras after packing (even on delivery day, until
the admin flips the status). The webhook adds them regardless. Stripe errors in this action are also uncaught
(a raw 500).

### 13. `guestOrder` inserts an address before validating the plan

**Where:** `src/routes/subscribe/+page.server.ts:558-574`

The address row (with no `subscriberId`) is written, *then* the plan is checked. Every rejected or failed guest
attempt, and every abandoned Stripe checkout, leaves an orphan `addresses` row with name, phone and postcode
(PII that is never cleaned up). The action also doesn't check `recipient`. **Fix:** validate the plan first, and
create the address in the webhook once the order is paid.

### 14. Desktop subscribe page calls `.trim()` on a `string[]`

**Where:** `src/routes/subscribe/+page.svelte:1017-1018`

```svelte
{#if plan.bullet && plan.bullet.trim() !== ''}
  {#each JSON.parse(plan.bullet) as item}
```

`plans.bullets` is `json(...).$type<string[]>().default([])`. On MySQL, mysql2 returns JSON columns
**already parsed**, so for any plan whose bullets are a real array (including the `[]` default, which is
truthy), `.trim` is not a function and the desktop `/subscribe` render throws. It works today only because the
dev DB evidently holds bullets as double-encoded strings. `src/routes/+page.server.ts:toCard` already handles
both shapes, so reuse that normalisation in `toPlan`.

### 15. Traceability dates guest and gift lines by `createdAt`

**Where:** `src/lib/server/traceability.ts:~190` (`const date = toCalendarString(o.createdAt)`)

Guest and gift orders ship on the **next Saturday**, but their shipment lines are dated by the order date. FEFO
eligibility (`producedOn <= line.date`) therefore rejects batches made between the order and the delivery,
which reports false "short" lines. The `from`/`to` range filters also put these orders in the wrong week.

### 16. Guest checkout auto-creates an account for any email

**Where:** `webhook/+server.ts:302-326, 507`

Whatever email is typed into Stripe Checkout gets a Better Auth user (with a `Math.random()` password) and a
magic link. Anyone can create accounts on behalf of third parties and send them sign-in emails. The webhook also
forwards **Stripe's** request headers to `signInMagicLink`. Consider requiring an explicit "create an account"
opt-in, and use `crypto.randomBytes` (or no password at all) for generated credentials.

---

## 🔵 Low

### 17. `updateSubscription` / `cancelSubscription` are dead and always fail

**Where:** `src/routes/subscribe/+page.server.ts:474-537`

Both read `form.data.subscriptionId`, but their schemas (`updateSubscriptionSchema`, `cancelSubscriptionSchema`)
define `subscriberId` instead. The ownership query always matches nothing, so the actions always fail.
`updateSubscription` would also change add-ons **without** updating Stripe billing. Nothing in the UI posts to
them. **Delete them** (the account pages own these flows).

### 18. Raw exception messages are shown to users and admins

`'User Update Failed: ' + err?.message` (admin users), and other similar spots. These leak SQL and driver errors.
Log the detail and show a generic message.

### 19. `{@html page.error?.message}` in `src/routes/dashboard/+error.svelte:8`

No `error()` call currently interpolates user input, so it isn't exploitable today. It becomes stored or
reflected XSS the moment one does. Render it as text.

### 20. Smaller issues

- `src/lib/server/auth.ts:76-77`: inserts `plan` and `status` into `subscribers`, columns that no longer exist
  (drizzle drops them silently; type error only).
- `src/routes/subscribe/+page.server.ts:367`: `phone` is set twice (`phone:` then `...recipientAddress`); harmless but confusing.
- `src/routes/subscribe/+page.server.ts:266`: `PlanSlug` type is undefined (type-only).
- `src/routes/+page.server.ts:7`: `typeof planRows` is used outside its scope (type-only, so `toCard` is untyped).
- `resolveAddons`: a duplicated id in `addonIds` makes `unknown` true, giving a bogus "add-on no longer exists" error.
- `src/lib/server/upload.ts`: accepts `undefined`, keeps the client's extension (`.html`/`.svg`), and has no
  size or type check. It's currently unused, but fix it before anything uses `fileFields`. Also, no route serves
  `/files/*` even though ~10 components reference it.
- `src/routes/dashboard/+layout.svelte:20`: reads `messageNumber`/`ordersNumber`, which the layout load doesn't
  return (the sidebar badges are always empty).
- `src/routes/dashboard/admin-panel/roles/[id]/+page.svelte:33,122`: reads `permissionList`/`allPermissions`, which
  aren't in the load data.
- `src/routes/dashboard/admin-panel/roles/add-roles/+page.server.ts:25`: reads `permissions` from a schema without it.
- `src/routes/dashboard/admin-panel/users/+page.server.ts:3`: imports `PageServerLoad` from the wrong `$types`.
- `src/routes/dashboard/admin-panel/users/[id]/+page.server.ts:52`: `eq(roleId, null)` for users with no role.
- `src/routes/subscribe/__tests__/checkout.test.ts`: 10 type errors (`.catch` on `MaybePromise<void>`). The tests
  pass, but they're typed wrong.
- An admin can delete their own account, or the last Admin.
- `nodemailer` has no types (`npm i -D @types/nodemailer`).
- Abandoned checkouts leave `pending` `subscriptions`, `giftOrders`, `guestOrders` and `addresses` rows forever.
  Add a cleanup job or create these rows in the webhook.

### 21. Tooling and type-check noise

- **svelte-check: 429 errors / 564 warnings.** About 260 errors are implicit-`any` in TanStack `columns.ts` files
  (`({ row }) =>` without `ColumnDef<T>` typing). 50 warnings are *"This reference only captures the initial
  value of `data`"* (state initialised from props that won't update on navigation, which is a real Svelte 5
  reactivity bug in forms that re-load). The rest are unused CSS and a11y.
- **ESLint: 401 errors**: 124 unused vars, 123 `svelte/no-navigation-without-resolve`, 85 `no-explicit-any`,
  40 `svelte/require-each-key`, 7 `no-at-html-tags`, 1 leftover `$inspect`.
- The noise is why #3, #6 and #7 (all flagged by svelte-check) went unnoticed. Getting `npm run check` to zero
  and running it in CI would have caught them.

---

## Suggested fix order

1. **#1 today**: a one-line guard fix. Then audit logs for `POST /am/dashboard` requests.
2. #2, #4 (renewals and idempotency), then #3 (gift checkout). Verify with `stripe trigger invoice.paid` and a
   real test-mode gift purchase.
3. #5–#9.
4. Medium items, then make `npm run check` clean and run it in CI.


---

## Fix log

### ⚠️ Required before deploying

1. **Run the migration.** New columns are needed by the webhook, stock, traceability and
   dashboard code. Nothing will work against an un-migrated database.
   - Dev: `npm run db:migrate` (applies `drizzle/0022_stock_holds_invoice_dedupe.sql`)
   - Prod: `mysql … < drizzle/stock_holds_production.sql` (run once; not re-runnable)
   - Both backfill `stock_units = 1` on every still-`scheduled` delivery (the 1 unit the old code consumed).
2. **Re-run the DB-backed tests** after migrating: `npm run test:server`. I didn't run them after the
   changes because they need the new columns (see "Not verified").
3. **Check `POST /am/dashboard…` in your access logs** for the period before this fix (#1).

### Changes, by finding

| # | Fix | Where |
| --- | --- | --- |
| 1 | Guard matches the resolved route (`event.route.id`) plus the delocalized path, so `/am/dashboard/*` and `/en/dashboard/*` are refused. Defence in depth: `contentCrud` add/edit/delete now refuse non-admins themselves. | `hooks.server.ts`, `lib/server/crud.ts` |
| 2 | New `invoiceSubscriptionId()` reads `invoice.parent.subscription_details.subscription` and falls back to the legacy field. Used by `invoice.paid` and `invoice.payment_failed`. | `lib/server/stripeInvoice.ts`, webhook |
| 3 | Gift checkout passes `quantity`. | `subscribe/+page.server.ts` |
| 4 | `deliveries.stripe_invoice_id` (unique). `scheduleDelivery` inserts with the invoice id (checkout uses `session.invoice`, renewals use `invoice.id`); a duplicate key means "already booked", so nothing is booked, reserved or emailed twice. Confirmation emails are only sent when a delivery was actually created. | webhook, schema |
| 5 | `escAll()` escapes every string in a template's data (arrays included) for the HTML. Subjects use the raw values (plain text). `esc()` also escapes `'`. Bulk email heading escaped. | `lib/server/emailTemplates.ts` |
| 6 | `setError` imported. | admin users `[id]` |
| 7 | Delete action rewritten: no undefined `form`/`err`, refuses self-delete and deleting the last Admin, generic error message, redirects to the list. | admin users `[id]` |
| 8 | `deliveries.stock_units` / `stock_date` record each booking's hold. `syncDeliveryStock()` releases it on skip/fail, moves it when the date changes, and re-reserves on un-skip, guarded by a compare-and-set against double release. Wired into the account skip, dashboard delivery edit/delete, and skip-date moves (which previously left stock on the skipped Saturday). | `lib/server/stock.ts`, account, dashboard deliveries |
| 9 | Paid gift and guest orders get `delivery_date` + `stock_units` and reserve stock (idempotently) in the webhook. Deleting them (dashboard) releases it. The confirmation email uses the booked date. | webhook, stock, dashboard orders |
| 10 | `quantity: z.coerce.number().int().min(1).max(20)` (`MAX_PLAN_QTY`, shared with the page's stepper). Subscriptions reserve `plans.packs × quantity` units, matching traceability. | `subscribe/schema.ts`, `subscribe/limits.ts`, stock |
| 11 | Add-on purchase dedupe row and quantity updates are one transaction. Quantities are incremented in SQL under a row lock. Only a duplicate-key error counts as "already applied"; any other error is rethrown so Stripe retries. | webhook |
| 12 | `/addons/[token]` enforces `isPastCutoff` in both load and action (and shows the cut-off date). Stripe errors are caught. Tests now pin a future date and restore the shared row. A cut-off test was added. | `addons/[token]` |
| 13 | `guestOrder` validates recipient, postcode, plan, price and add-ons **before** inserting the address. | `subscribe/+page.server.ts` |
| 14 | `bulletsOf()` normalises `plans.bullets` (parsed array, JSON string or double-encoded) to `string[]` on the server; the page just iterates it. | subscribe |
| 15 | Guest/gift traceability lines and the dashboard list use `delivery_date` (falling back to `createdAt` for old orders). | `lib/server/traceability.ts`, dashboard deliveries |
| 16 | The webhook no longer creates accounts. It only sends a magic link, and Better Auth creates the user when it's clicked (email ownership proven). The `Math.random()` password is gone. | webhook |
| 17 | Dead `updateSubscription` / `cancelSubscription` actions and their schemas removed. | subscribe |
| 18 | Raw error messages removed from admin user add/edit/delete and add-role. | admin panel |
| 19 | Dashboard error page renders the message as text. | `dashboard/+error.svelte` |
| 20 | `auth.ts` drops nonexistent columns. `phone` no longer set twice. `PlanSlug` exported. Root `toCard` typed. `resolveAddons` dedupes ids. `setError` on add-ons uses `addonIds._errors` (the message was never displayed before). `upload.ts` requires a file, allow-lists image MIME types, derives the extension from the type, and caps size at 10 MB. Junk sidebar props removed. Role edit/delete actions restored (they were commented out, so Save/Delete on a role failed): transactional, and delete refuses roles that still have users. Users page imports its own `$types`, prefills the form server-side and drops the nonexistent phone row. `SingleTable` prop typed as an array. Test files typed. `@types/nodemailer` added. Abandoned checkouts: the daily cron now deletes checkouts still `pending` with no Stripe id after **14 days**, plus their now-unreferenced addresses. | various, `lib/server/cleanup.ts` |
| 21 | All errors in `src/routes/**`, `src/lib/server/**` and hooks fixed. Project-wide svelte-check errors 429 → 358. **Not fixed:** the remaining 358 are implicit-`any` TanStack `columns.ts` files and unused legacy components (`EditAppointment`, `AddCustomer`, `navbar`, carousel…) in files this report didn't flag as bugs. Worth a separate cleanup pass. | — |

### Verified

- **#1 live on the dev server**: anonymous `POST /am/dashboard/customers?/delete` and `/en/...` now return
  the login redirect (previously reached the action). `/am/about` still serves 200.
- `/`, `/subscribe`, `/am/subscribe` and `/partners` render 200. Plan bullets render from the normalised arrays.
- New unit tests pass: `stripeInvoice.test.ts` (4), `emailTemplates.test.ts` (3).
- `svelte-check`: 0 errors in routes, server code and hooks. `vite build` succeeds.

### Not verified

- **DB-backed test suite** (`checkout`, `token`, `addonPurchase`, stock/schedule integration). It needs migration
  0022 applied. I didn't apply it because I couldn't confirm which database `.env` points at.
- **Real Stripe flows.** Please run in test mode: a gift purchase (#3), `stripe trigger invoice.paid` on an active
  subscription (#2), and re-sending the same `checkout.session.completed` event from the Dashboard to confirm
  no second delivery is created (#4).
- **The stock backfill assumption.** Scheduled deliveries created before the stock feature existed never consumed a
  unit. Skipping one now releases 1 unit (clamped at 0). Check the stock dashboard after migrating.
