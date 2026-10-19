ALTER TABLE `deliveries` ADD `stripe_invoice_id` varchar(255);--> statement-breakpoint
ALTER TABLE `deliveries` ADD `stock_units` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `deliveries` ADD `stock_date` date;--> statement-breakpoint
ALTER TABLE `gift_orders` ADD `delivery_date` date;--> statement-breakpoint
ALTER TABLE `gift_orders` ADD `stock_units` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `guest_orders` ADD `delivery_date` date;--> statement-breakpoint
ALTER TABLE `guest_orders` ADD `stock_units` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `deliveries` ADD CONSTRAINT `deliveries_stripe_invoice_id_unique` UNIQUE(`stripe_invoice_id`);--> statement-breakpoint
-- Backfill: every booking still `scheduled` consumed exactly 1 unit of stock under the old
-- webhook logic. Record that hold so skipping, moving or deleting it gives the unit back.
UPDATE `deliveries` SET `stock_units` = 1, `stock_date` = `scheduled_date` WHERE `status` = 'scheduled';
