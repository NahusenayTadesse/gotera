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
--> statement-breakpoint
ALTER TABLE `deliveries` ADD `plan_id` varchar(36);--> statement-breakpoint
ALTER TABLE `deliveries` ADD `packs` int;--> statement-breakpoint
ALTER TABLE `deliveries` ADD `quantity` int;--> statement-breakpoint
ALTER TABLE `deliveries` ADD `unit_price_pence` int;--> statement-breakpoint
ALTER TABLE `gift_orders` ADD `plan_id` varchar(36);--> statement-breakpoint
ALTER TABLE `gift_orders` ADD `unit_price_pence` int;--> statement-breakpoint
ALTER TABLE `gift_orders` ADD `amount_pence` int;--> statement-breakpoint
ALTER TABLE `guest_orders` ADD `plan_id` varchar(36);--> statement-breakpoint
ALTER TABLE `guest_orders` ADD `unit_price_pence` int;--> statement-breakpoint
ALTER TABLE `guest_orders` ADD `amount_pence` int;--> statement-breakpoint
ALTER TABLE `plans` ADD `injera_per_pack` int DEFAULT 3 NOT NULL;--> statement-breakpoint
ALTER TABLE `plans` ADD `currency` varchar(3) DEFAULT 'gbp' NOT NULL;--> statement-breakpoint
ALTER TABLE `plans` ADD `available_from` datetime;--> statement-breakpoint
ALTER TABLE `plans` ADD `available_until` datetime;--> statement-breakpoint
ALTER TABLE `plans` ADD `max_quantity` int;--> statement-breakpoint
ALTER TABLE `plans` ADD `translations` json;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD `stripe_price_id` varchar(255);--> statement-breakpoint
ALTER TABLE `subscriptions` ADD `unit_price_pence` int;--> statement-breakpoint
CREATE INDEX `idx_plan_prices_plan_id` ON `plan_prices` (`plan_id`);--> statement-breakpoint
-- Backfill: seed the price history with every plan's current Stripe Price.
INSERT IGNORE INTO `plan_prices` (`id`, `plan_id`, `stripe_price_id`, `price_pence`, `currency`)
	SELECT UUID(), `id`, `stripe_price_id`, `price_pence`, `currency` FROM `plans`
	WHERE `stripe_price_id` IS NOT NULL AND `stripe_price_id` <> '';--> statement-breakpoint
-- Backfill: freeze existing deliveries at what history already shows for them (the
-- subscription's current plan and quantity at today's plan price). Only NULL rows.
UPDATE `deliveries` d
	JOIN `subscriptions` s ON s.`id` = d.`subscription_id`
	JOIN `plans` p ON p.`id` = s.`plan_id`
	SET d.`plan_id` = s.`plan_id`, d.`packs` = p.`packs`, d.`quantity` = s.`quantity`,
		d.`unit_price_pence` = p.`price_pence`
	WHERE d.`plan_id` IS NULL;--> statement-breakpoint
-- Slugs are lowercase (the dashboard enforces it); 'Family' predates that rule. Plans are
-- referenced by id everywhere, and the subscribe page lowercases ?plan=, so old links work.
UPDATE `plans` SET `slug` = LOWER(`slug`) WHERE BINARY `slug` <> LOWER(`slug`);
