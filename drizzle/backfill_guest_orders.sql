-- Backfill for guest_orders rows created before the email/name/address fix.
--
-- Three bugs left every guest order anonymous: the insert dropped recipient_name
-- and address_id, and the webhook never wrote the email/name Stripe had collected.
-- Two local sources can recover most of it without calling Stripe:
--
--   1. addresses  — the guestOrder action DID insert an address row (orphaned,
--                   subscriber_id NULL) in the same request as the order.
--   2. user       — from 2026-07-18 onward the webhook's sendMagicLink() created
--                   a Better Auth user with the buyer's exact email + name a few
--                   seconds after the order was marked paid.
--
-- Run the SELECTs first and eyeball them. The UPDATEs only ever fill NULLs.
--
-- Note: guest_orders.created_at is a TIMESTAMP (rendered in the session timezone)
-- while user.created_at is a DATETIME holding UTC, so the join has to normalise.
-- @tz_off is the session's offset from UTC in seconds.

SET @tz_off := timestampdiff(second, utc_timestamp(), now());

-- ─────────────────────────────────────────────────────────────────────────
-- 1. address_id — match the orphaned address row from the same request.
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
SET g.address_id = a.id
WHERE g.address_id IS NULL;

-- ─────────────────────────────────────────────────────────────────────────
-- 2. recipient_name — the address row carries the label the buyer typed;
--    the real recipient name was never persisted anywhere local, so this is
--    left to the Stripe backfill (billing name) below.
-- ─────────────────────────────────────────────────────────────────────────

-- ─────────────────────────────────────────────────────────────────────────
-- 3. buyer_email / buyer_name — from the account the webhook auto-created.
--    Only accept a match when the user was created in the 60s AFTER the order
--    was marked paid, and when exactly ONE user falls in that window (an
--    unrelated signup at the same moment must not be attributed to the order).
-- ─────────────────────────────────────────────────────────────────────────

-- PREVIEW
SELECT g.id AS order_id, g.updated_at AS paid_at, u.email, u.name, u.created_at
FROM guest_orders g
JOIN user u
  ON u.created_at BETWEEN date_add(g.updated_at, INTERVAL -@tz_off SECOND)
                      AND date_add(g.updated_at, INTERVAL (60 - @tz_off) SECOND)
WHERE g.status IN ('paid', 'fulfilled')
  AND g.buyer_email IS NULL
  AND (SELECT count(*) FROM user u2
       WHERE u2.created_at BETWEEN date_add(g.updated_at, INTERVAL -@tz_off SECOND)
                               AND date_add(g.updated_at, INTERVAL (60 - @tz_off) SECOND)) = 1;

-- APPLY
UPDATE guest_orders g
JOIN user u
  ON u.created_at BETWEEN date_add(g.updated_at, INTERVAL -@tz_off SECOND)
                      AND date_add(g.updated_at, INTERVAL (60 - @tz_off) SECOND)
SET g.buyer_email = coalesce(g.buyer_email, u.email),
    g.buyer_name  = coalesce(g.buyer_name, u.name)
WHERE g.status IN ('paid', 'fulfilled')
  AND g.buyer_email IS NULL
  AND (SELECT count(*) FROM user u2
       WHERE u2.created_at BETWEEN date_add(g.updated_at, INTERVAL -@tz_off SECOND)
                               AND date_add(g.updated_at, INTERVAL (60 - @tz_off) SECOND)) = 1;

-- ─────────────────────────────────────────────────────────────────────────
-- 4. What is left. These rows predate sendMagicLink (2026-07-18) or belong to
--    a returning customer who already had an account, so only Stripe has the
--    details — every paid row stores its PaymentIntent id, so they are
--    reachable via `stripe payment_intents retrieve <id>`.
-- ─────────────────────────────────────────────────────────────────────────
SELECT id, status, created_at, stripe_payment_intent_id
FROM guest_orders
WHERE status IN ('paid', 'fulfilled') AND buyer_email IS NULL;
