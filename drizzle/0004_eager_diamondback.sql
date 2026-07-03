ALTER TABLE `plans` MODIFY COLUMN `stripe_price_id` varchar(255);--> statement-breakpoint
ALTER TABLE `addons` ADD `stripe_price_id` varchar(255);--> statement-breakpoint
ALTER TABLE `subscribers` ADD `current_period_end` timestamp(3);