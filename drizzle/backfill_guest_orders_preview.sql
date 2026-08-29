-- READ-ONLY. Nothing here writes. Safe to run against production.
-- Answers, in order: is the schema ready, is the timezone assumption valid,
-- and how many rows would each half of the backfill actually recover.
--
--   mysql <prod args> < drizzle/backfill_guest_orders_preview.sql
--
-- Then run the APPLY statements in backfill_guest_orders.sql — but only the
-- sections whose counts below look right.

SET @tz_off := timestampdiff(second, utc_timestamp(), now());

-- ─────────────────────────────────────────────────────────────────────────
-- 0. Preconditions. buyer_name must exist on guest_orders.
-- ─────────────────────────────────────────────────────────────────────────
SELECT @tz_off AS session_offset_from_utc_seconds, @@session.time_zone AS session_tz;

SELECT table_name, column_name, column_type
FROM information_schema.columns
WHERE table_schema = database()
  AND (
    (table_name = 'guest_orders' AND column_name IN ('buyer_name', 'buyer_email', 'created_at', 'updated_at'))
    OR (table_name = 'user' AND column_name = 'created_at')
  )
ORDER BY table_name, column_name;

-- ─────────────────────────────────────────────────────────────────────────
-- 0b. Clock skew probe. better-auth writes user.created_at as UTC while the
--     app writes guest_orders timestamps in session-local time — both columns
--     are `timestamp`, so the types above will NOT reveal this. Measure it
--     instead, on the guest orders that already carry an email.
--
--     Expect delta_sec to cluster either near 0 (no skew) or near -@tz_off
--     (skewed). Section 1 of the backfill accepts both, so this is diagnostic
--     rather than a gate — but if the deltas are scattered with no clustering,
--     the correlation is not trustworthy and you should go straight to Stripe.
--
--     Returns nothing if no guest order has an email yet; that is fine.
-- ─────────────────────────────────────────────────────────────────────────
SELECT timestampdiff(second, g.updated_at, u.created_at) AS delta_sec,
       count(*) AS n
FROM guest_orders g
JOIN user u ON u.email = g.buyer_email
WHERE g.status IN ('paid', 'fulfilled')
GROUP BY delta_sec
ORDER BY n DESC
LIMIT 10;

-- ─────────────────────────────────────────────────────────────────────────
-- 1. The damage. How many paid guest orders are missing what.
-- ─────────────────────────────────────────────────────────────────────────
SELECT
  count(*)                                                    AS paid_orders,
  sum(buyer_email IS NULL)                                    AS missing_email,
  sum(address_id IS NULL)                                     AS missing_address,
  sum(buyer_email IS NULL AND stripe_payment_intent_id IS NOT NULL) AS recoverable_via_stripe,
  min(created_at)                                             AS oldest,
  max(created_at)                                             AS newest
FROM guest_orders
WHERE status IN ('paid', 'fulfilled');

-- ─────────────────────────────────────────────────────────────────────────
-- 2. address_id — what the address section of the backfill would link.
--    A count higher than the number of affected orders means an ambiguous
--    match (two orders to the same line1 in the same second); stop and look
--    at the detail query below before applying.
-- ─────────────────────────────────────────────────────────────────────────
SELECT count(*) AS address_matches, count(DISTINCT g.id) AS orders_covered
FROM guest_orders g
JOIN addresses a
  ON a.subscriber_id IS NULL
 AND abs(timestampdiff(second, a.created_at, g.created_at)) <= 2
 AND a.line1 = json_unquote(json_extract(g.recipient_address, '$.line1'))
WHERE g.address_id IS NULL;

SELECT g.id AS order_id, a.id AS address_id, a.line1, a.postcode, g.created_at
FROM guest_orders g
JOIN addresses a
  ON a.subscriber_id IS NULL
 AND abs(timestampdiff(second, a.created_at, g.created_at)) <= 2
 AND a.line1 = json_unquote(json_extract(g.recipient_address, '$.line1'))
WHERE g.address_id IS NULL
ORDER BY g.created_at;

-- ─────────────────────────────────────────────────────────────────────────
-- 3. buyer_email / buyer_name — what the user-matching section would recover
--    from the account sendMagicLink auto-created. Only orders paid on or after
--    2026-07-18 can match. Eyeball these pairs before applying: the name and
--    the delivery address should look like they belong together.
-- ─────────────────────────────────────────────────────────────────────────
SELECT g.id AS order_id, g.updated_at AS paid_at, u.email, u.name, u.created_at,
       timestampdiff(second, g.updated_at, u.created_at) AS delta_sec,
       json_unquote(json_extract(g.recipient_address, '$.line1')) AS ships_to
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
                               AND date_add(g.updated_at, INTERVAL (60 - @tz_off) SECOND)) = 1
ORDER BY g.updated_at;

-- ─────────────────────────────────────────────────────────────────────────
-- 3b. Orders the guard REJECTED — a user was created in the window, but so
--     was someone else, so attribution is not safe. Production has real
--     concurrent signups, so expect entries here that local testing had none
--     of. These are not lost; they fall through to the Stripe backfill.
-- ─────────────────────────────────────────────────────────────────────────
SELECT g.id AS order_id, g.updated_at AS paid_at,
       (SELECT count(*) FROM user u2
        WHERE u2.created_at BETWEEN g.updated_at
                                AND date_add(g.updated_at, INTERVAL 60 SECOND)
           OR u2.created_at BETWEEN date_add(g.updated_at, INTERVAL -@tz_off SECOND)
                                AND date_add(g.updated_at, INTERVAL (60 - @tz_off) SECOND)) AS candidates
FROM guest_orders g
WHERE g.status IN ('paid', 'fulfilled')
  AND g.buyer_email IS NULL
  AND (SELECT count(*) FROM user u2
       WHERE u2.created_at BETWEEN g.updated_at
                               AND date_add(g.updated_at, INTERVAL 60 SECOND)
          OR u2.created_at BETWEEN date_add(g.updated_at, INTERVAL -@tz_off SECOND)
                               AND date_add(g.updated_at, INTERVAL (60 - @tz_off) SECOND)) > 1
ORDER BY g.updated_at;

-- ─────────────────────────────────────────────────────────────────────────
-- 4. The remainder — too old for the magic-link account, or a returning
--    customer who already had one. Only Stripe has these, and every row
--    below keeps its PaymentIntent, so run:
--      STRIPE_ARGS=--live MYSQL_ARGS='<prod args>' \
--        ./drizzle/backfill_guest_orders_from_stripe.sh > /tmp/backfill.sql
-- ─────────────────────────────────────────────────────────────────────────
SELECT id, status, created_at, stripe_payment_intent_id
FROM guest_orders
WHERE status IN ('paid', 'fulfilled')
  AND buyer_email IS NULL
  AND stripe_payment_intent_id IS NOT NULL
ORDER BY created_at;

-- Paid, no email, and no PaymentIntent either. Nothing can recover these.
SELECT id, status, created_at
FROM guest_orders
WHERE status IN ('paid', 'fulfilled')
  AND buyer_email IS NULL
  AND stripe_payment_intent_id IS NULL
ORDER BY created_at;
