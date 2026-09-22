ALTER TABLE `addresses` ADD `latitude` decimal(9,6);--> statement-breakpoint
ALTER TABLE `addresses` ADD `longitude` decimal(9,6);--> statement-breakpoint
ALTER TABLE `addresses` ADD `geocoded_at` timestamp;