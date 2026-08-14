#!/usr/bin/env bash
# Recover buyer email/name for guest_orders rows that the local backfill could not
# resolve (paid before sendMagicLink existed, or the buyer already had an account).
#
# Every paid row stores its PaymentIntent id, and the PaymentIntent keeps the
# billing details Checkout collected — so nothing is actually lost.
#
# Prints UPDATE statements to stdout; review them, then pipe to mysql.
#   ./drizzle/backfill_guest_orders_from_stripe.sh > /tmp/backfill.sql
#   mysql -u dev -h 127.0.0.1 gotera < /tmp/backfill.sql
#
# Requires the stripe CLI logged into the account that took the payments (use
# --live for production data).
set -euo pipefail

MYSQL_ARGS=${MYSQL_ARGS:--u dev -h 127.0.0.1 gotera}
STRIPE_ARGS=${STRIPE_ARGS:-}

esc() { printf "%s" "$1" | sed "s/'/''/g"; }

# shellcheck disable=SC2086
mysql $MYSQL_ARGS -N -B -e "
  SELECT id, stripe_payment_intent_id FROM guest_orders
  WHERE status IN ('paid','fulfilled')
    AND stripe_payment_intent_id IS NOT NULL
    AND (buyer_email IS NULL OR buyer_name IS NULL);" 2>/dev/null |
while IFS=$'\t' read -r order_id pi_id; do
  [ -z "${pi_id:-}" ] && continue

  # The billing details Checkout collected live on the charge, not the intent.
  # shellcheck disable=SC2086
  details=$(stripe charges list --payment-intent "$pi_id" $STRIPE_ARGS 2>/dev/null |
    python3 -c '
import json, sys
try:
    rows = json.load(sys.stdin).get("data") or []
except Exception:
    sys.exit(1)
if not rows:
    sys.exit(1)
c = rows[0]
b = c.get("billing_details") or {}
print((b.get("email") or c.get("receipt_email") or "") + "\t" + (b.get("name") or ""))
') || { echo "-- $order_id: could not read $pi_id" >&2; continue; }

  email=$(printf "%s" "$details" | cut -f1)
  name=$(printf "%s" "$details" | cut -f2)

  if [ -z "$email" ] && [ -z "$name" ]; then
    echo "-- $order_id ($pi_id): no billing details on the PaymentIntent" >&2
    continue
  fi

  sets=""
  [ -n "$email" ] && sets="buyer_email = coalesce(buyer_email, '$(esc "$email")')"
  if [ -n "$name" ]; then
    [ -n "$sets" ] && sets="$sets, "
    sets="${sets}buyer_name = coalesce(buyer_name, '$(esc "$name")')"
  fi
  echo "UPDATE guest_orders SET $sets WHERE id = '$(esc "$order_id")';"
done
