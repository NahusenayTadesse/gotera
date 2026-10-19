ALTER TABLE `addons` MODIFY COLUMN `category` enum('spice','sauce','pantry','kit','drink','snack','bundle');--> statement-breakpoint
ALTER TABLE `addons` ADD `availability` enum('both','standalone','with_injera') DEFAULT 'both' NOT NULL;--> statement-breakpoint
ALTER TABLE `addons` ADD `unit_label` varchar(64);--> statement-breakpoint
ALTER TABLE `addons` ADD `badge` varchar(32);--> statement-breakpoint
ALTER TABLE `addons` ADD `tags` json;--> statement-breakpoint
ALTER TABLE `addons` ADD `spice_level` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `addons` ADD `ingredients` text;--> statement-breakpoint
ALTER TABLE `addons` ADD `is_featured` boolean DEFAULT false NOT NULL;