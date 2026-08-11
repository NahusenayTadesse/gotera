ALTER TABLE `subscriber_addons` DROP INDEX `subscriber_addon_uniq`;--> statement-breakpoint
ALTER TABLE `delivery_addons` ADD `is_active` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `delivery_addons` ADD `created_by` varchar(255);--> statement-breakpoint
ALTER TABLE `delivery_addons` ADD `updated_by` varchar(255);--> statement-breakpoint
ALTER TABLE `delivery_addons` ADD `created_at` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `delivery_addons` ADD `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `delivery_addons` ADD `deleted_at` datetime;--> statement-breakpoint
ALTER TABLE `delivery_addons` ADD `deleted_by` varchar(255);--> statement-breakpoint
ALTER TABLE `subscriber_addons` ADD CONSTRAINT `subscriber_addon_uniq` UNIQUE(`subscription_id`,`addon_id`);--> statement-breakpoint
ALTER TABLE `delivery_addons` ADD CONSTRAINT `delivery_addons_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `delivery_addons` ADD CONSTRAINT `delivery_addons_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `delivery_addons` ADD CONSTRAINT `delivery_addons_deleted_by_user_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;