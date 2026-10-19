-- Stock holds + invoice dedupe — production schema (same changes as 0022_stock_holds_invoice_dedupe.sql).
-- Run it with:  mysql -h <host> -u <user> -p <database> < drizzle/stock_holds_production.sql
--
-- What it does:
--   deliveries.stripe_invoice_id  unique — a retried Stripe webhook can't book a second delivery
--   deliveries.stock_units/date   the stock a delivery holds, so skip/move/delete gives it back
--   gift_orders / guest_orders    delivery_date + stock_units — one-off orders now reserve stock
-- Not idempotent (MySQL has no ADD COLUMN IF NOT EXISTS): run it once.

ALTER TABLE `deliveries`
	ADD `stripe_invoice_id` varchar(255),
	ADD `stock_units` int NOT NULL DEFAULT 0,
	ADD `stock_date` date,
	ADD CONSTRAINT `deliveries_stripe_invoice_id_unique` UNIQUE(`stripe_invoice_id`);

ALTER TABLE `gift_orders`
	ADD `delivery_date` date,
	ADD `stock_units` int NOT NULL DEFAULT 0;

ALTER TABLE `guest_orders`
	ADD `delivery_date` date,
	ADD `stock_units` int NOT NULL DEFAULT 0;

-- Every booking still `scheduled` consumed exactly 1 unit under the old webhook logic.
UPDATE `deliveries` SET `stock_units` = 1, `stock_date` = `scheduled_date` WHERE `status` = 'scheduled';
