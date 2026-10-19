-- Plan catalogue future-proofing — production schema (same changes as 0024_plan_catalogue_futureproof.sql).
-- Run it with:  mysql -h <host> -u <user> -p <database> < drizzle/plan_catalogue_production.sql
--
-- Purely additive: one new table, new nullable/defaulted columns, and backfills that only
-- write into those new columns. No existing column is dropped, renamed or retyped.
--
-- What it does:
--   plan_prices                         every Stripe Price a plan has sold at, so customers on an
--                                       older price still match their plan after a price change
--   subscriptions.stripe_price_id/      what Stripe is actually billing each subscription
--     unit_price_pence                  (filled in by the webhook from now on)
--   deliveries.plan_id/packs/quantity/  a snapshot of each delivery, so order history no longer
--     unit_price_pence                  changes when a plan's price does
--   gift_orders / guest_orders          plan_id, unit_price_pence, amount_pence (total paid)
--   plans.injera_per_pack/currency/     product definition, sale window, per-order cap and
--     available_from/until/max_quantity/ Amharic (or any locale) copy
--     translations
--   plans.slug                          lowercased ('Family' -> 'family')
-- The new plan_id columns have no foreign key on purpose (plans.id can have a different
-- charset from the tables referencing it, which MariaDB rejects; plans are never deleted).
-- Not idempotent (MySQL has no ADD COLUMN IF NOT EXISTS): run it once.

CREATE TABLE `plan_prices` (
	`id` varchar(36) NOT NULL,
	`plan_id` varchar(36) NOT NULL,
	`stripe_price_id` varchar(255) NOT NULL,
	`price_pence` int NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'gbp',
	`active_from` timestamp NOT NULL DEFAULT (now()),
	`active_to` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `plan_prices_id` PRIMARY KEY(`id`),
	CONSTRAINT `plan_prices_stripe_price_id_unique` UNIQUE(`stripe_price_id`)
);
CREATE INDEX `idx_plan_prices_plan_id` ON `plan_prices` (`plan_id`);

ALTER TABLE `plans`
	ADD `injera_per_pack` int NOT NULL DEFAULT 3,
	ADD `currency` varchar(3) NOT NULL DEFAULT 'gbp',
	ADD `available_from` datetime,
	ADD `available_until` datetime,
	ADD `max_quantity` int,
	ADD `translations` json;

ALTER TABLE `subscriptions`
	ADD `stripe_price_id` varchar(255),
	ADD `unit_price_pence` int;

ALTER TABLE `deliveries`
	ADD `plan_id` varchar(36),
	ADD `packs` int,
	ADD `quantity` int,
	ADD `unit_price_pence` int;

ALTER TABLE `gift_orders`
	ADD `plan_id` varchar(36),
	ADD `unit_price_pence` int,
	ADD `amount_pence` int;

ALTER TABLE `guest_orders`
	ADD `plan_id` varchar(36),
	ADD `unit_price_pence` int,
	ADD `amount_pence` int;

-- Seed the price history with every plan's current Stripe Price.
INSERT IGNORE INTO `plan_prices` (`id`, `plan_id`, `stripe_price_id`, `price_pence`, `currency`)
	SELECT UUID(), `id`, `stripe_price_id`, `price_pence`, `currency` FROM `plans`
	WHERE `stripe_price_id` IS NOT NULL AND `stripe_price_id` <> '';

-- Freeze existing deliveries at what order history already shows for them.
UPDATE `deliveries` d
	JOIN `subscriptions` s ON s.`id` = d.`subscription_id`
	JOIN `plans` p ON p.`id` = s.`plan_id`
	SET d.`plan_id` = s.`plan_id`, d.`packs` = p.`packs`, d.`quantity` = s.`quantity`,
		d.`unit_price_pence` = p.`price_pence`
	WHERE d.`plan_id` IS NULL;

-- Lowercase slugs ('Family' -> 'family'). Plans are referenced by id, and /subscribe
-- lowercases ?plan=, so existing links keep working.
UPDATE `plans` SET `slug` = LOWER(`slug`) WHERE BINARY `slug` <> LOWER(`slug`);
