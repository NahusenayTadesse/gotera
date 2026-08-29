-- Backfill for guest_orders rows created before the email/name/address fix.
--
-- Three bugs left every guest order anonymous: the insert dropped recipient_name
-- and address_id, and the webhook never wrote the email/name Stripe had collected.
-- Two local sources can recover most of it without calling Stripe:
--
--   1. user       — from 2026-07-18 onward the webhook's sendMagicLink() created
--                   a Better Auth user with the buyer's exact email + name a few
--                   seconds after the order was marked paid.
--   2. addresses  — the guestOrder action DID insert an address row (orphaned,
--                   subscriber_id NULL) in the same request as the order.
--
-- Run drizzle/backfill_guest_orders_preview.sql first — it is read-only and
-- reports what each section below would actually recover.
--
-- ── TWO THINGS THAT WILL BITE ────────────────────────────────────────────
--
-- ORDER MATTERS. updated_at is ON UPDATE CURRENT_TIMESTAMP and section 1
-- correlates on it. Any UPDATE to a row rewrites that key, so the user-matching
-- section MUST run before the address section, and can only ever run once.
-- Every UPDATE here therefore sets `updated_at = updated_at` explicitly, which
-- suppresses the ON UPDATE clause and preserves the correlation key. Do not
-- drop that assignment, and do not run any other migration against these rows
-- in between.
--
-- CLOCK SKEW. user.created_at holds UTC-rendered values while guest_orders
-- timestamps are session-local — both columns are `timestamp`, so the column
-- types do NOT reveal this. Rather than guess, section 1 accepts a match under
-- either interpretation (raw, or shifted by the session's UTC offset) and still
-- demands exactly one candidate, so an ambiguous window is rejected rather than
-- misattributed.

SET @tz_off := timestampdiff(second, utc_timestamp(), now());

-- ─────────────────────────────────────────────────────────────────────────
-- 1. buyer_email / buyer_name — from the account the webhook auto-created.
--    RUN THIS SECTION FIRST. Only accept a user created in the 60s AFTER the
--    order was marked paid, and only when exactly ONE user falls in that
--    window — an unrelated signup at the same moment must never be
--    attributed to the order.
-- ─────────────────────────────────────────────────────────────────────────

-- PREVIEW
SELECT g.id AS order_id, g.updated_at AS paid_at, u.email, u.name, u.created_at,
       timestampdiff(second, g.updated_at, u.created_at) AS delta_sec
FROM guest_orders g
JOIN user u
  ON (u.created_at BETWEEN g.updated_at
                       AND date_add(g.updated_at, INTERVAL 60 SECOND)
   OR u.created_at BETWEEN date_add(g.updated_at, INTERVAL -@tz_off SECOND)
                       AND date_add(g.updated_at, INTERVAL (60 - @tz_off) SECOND))
WHERE g.status IN ('paid', 'fulfilled')
  AND g.buyer_email IS NULL
  AND (SELECT count(*) FROM user u2
       WHERE u2.created_at BETWEEN g.updated_at
                               AND date_add(g.updated_at, INTERVAL 60 SECOND)
          OR u2.created_at BETWEEN date_add(g.updated_at, INTERVAL -@tz_off SECOND)
                               AND date_add(g.updated_at, INTERVAL (60 - @tz_off) SECOND)) = 1;

-- APPLY
UPDATE guest_orders g
JOIN user u
  ON (u.created_at BETWEEN g.updated_at
                       AND date_add(g.updated_at, INTERVAL 60 SECOND)
   OR u.created_at BETWEEN date_add(g.updated_at, INTERVAL -@tz_off SECOND)
                       AND date_add(g.updated_at, INTERVAL (60 - @tz_off) SECOND))
SET g.buyer_email = coalesce(g.buyer_email, u.email),
    g.buyer_name  = coalesce(g.buyer_name, u.name),
    g.updated_at  = g.updated_at  -- keep the correlation key; see header
WHERE g.status IN ('paid', 'fulfilled')
  AND g.buyer_email IS NULL
  AND (SELECT count(*) FROM user u2
       WHERE u2.created_at BETWEEN g.updated_at
                               AND date_add(g.updated_at, INTERVAL 60 SECOND)
          OR u2.created_at BETWEEN date_add(g.updated_at, INTERVAL -@tz_off SECOND)
                               AND date_add(g.updated_at, INTERVAL (60 - @tz_off) SECOND)) = 1;

-- ─────────────────────────────────────────────────────────────────────────
-- 2. address_id — match the orphaned address row from the same request.
--    Keyed on created_at, which nothing rewrites, so this is order-independent
--    in itself — but it rewrites updated_at unless suppressed, which is why it
--    runs second and pins updated_at anyway.
-- ─────────────────────────────────────────────────────────────────────────

-- PREVIEW
SELECT g.id AS order_id, a.id AS address_id, a.line1, a.postcode
FROM guest_orders g
JOIN addresses a
  ON a.subscriber_id IS NULL
 AND abs(timestampdiff(second, a.created_at, g.created_at)) <= 2
 AND a.line1 = json_unquote(json_extract(g.recipient_address, '$.line1'))
WHERE g.address_id IS NULL;

-- APPLY
UPDATE guest_orders g
JOIN addresses a
  ON a.subscriber_id IS NULL
 AND abs(timestampdiff(second, a.created_at, g.created_at)) <= 2
 AND a.line1 = json_unquote(json_extract(g.recipient_address, '$.line1'))
SET g.address_id = a.id,
    g.updated_at = g.updated_at
WHERE g.address_id IS NULL;

-- ─────────────────────────────────────────────────────────────────────────
-- 3. recipient_name — the address row carries only the label the buyer typed;
--    the real recipient name was never persisted anywhere local, so it is left
--    to the Stripe backfill (billing name) below.
-- ─────────────────────────────────────────────────────────────────────────

-- ─────────────────────────────────────────────────────────────────────────
-- 4. What is left. These rows predate sendMagicLink (2026-07-18), belong to a
--    returning customer who already had an account, or were rejected by the
--    uniqueness guard — so only Stripe has the details. Every paid row stores
--    its PaymentIntent id, so they are reachable:
--      ./drizzle/backfill_guest_orders_from_stripe.sh
-- ─────────────────────────────────────────────────────────────────────────
SELECT id, status, created_at, stripe_payment_intent_id
FROM guest_orders
WHERE status IN ('paid', 'fulfilled') AND buyer_email IS NULL;
