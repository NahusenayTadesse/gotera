CREATE TABLE `notifications` (
	`id` varchar(36) NOT NULL,
	`subscriber_id` varchar(36) NOT NULL,
	`kind` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`body` text,
	`read_at` timestamp,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3),
	`deleted_at` datetime,
	`deleted_by` varchar(255),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stock` (
	`id` varchar(36) NOT NULL,
	`delivery_date` date NOT NULL,
	`addon_id` varchar(36),
	`scope_key` varchar(36) NOT NULL,
	`capacity` int NOT NULL,
	`used` int NOT NULL DEFAULT 0,
	`low_threshold` int NOT NULL DEFAULT 10,
	`critical_threshold` int NOT NULL DEFAULT 3,
	`critical_alert_sent_at` timestamp,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3),
	`deleted_at` datetime,
	`deleted_by` varchar(255),
	CONSTRAINT `stock_id` PRIMARY KEY(`id`),
	CONSTRAINT `stock_date_scope_uniq` UNIQUE(`delivery_date`,`scope_key`)
);
--> statement-breakpoint
CREATE TABLE `stock_changes` (
	`id` varchar(36) NOT NULL,
	`stock_id` varchar(36) NOT NULL,
	`field` enum('capacity','used') NOT NULL,
	`delta` int NOT NULL,
	`value_after` int NOT NULL,
	`reason` varchar(255),
	`is_active` boolean NOT NULL DEFAULT true,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3),
	`deleted_at` datetime,
	`deleted_by` varchar(255),
	CONSTRAINT `stock_changes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_subscriber_id_subscribers_id_fk` FOREIGN KEY (`subscriber_id`) REFERENCES `subscribers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_deleted_by_user_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock` ADD CONSTRAINT `stock_addon_id_addons_id_fk` FOREIGN KEY (`addon_id`) REFERENCES `addons`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock` ADD CONSTRAINT `stock_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock` ADD CONSTRAINT `stock_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock` ADD CONSTRAINT `stock_deleted_by_user_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock_changes` ADD CONSTRAINT `stock_changes_stock_id_stock_id_fk` FOREIGN KEY (`stock_id`) REFERENCES `stock`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock_changes` ADD CONSTRAINT `stock_changes_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock_changes` ADD CONSTRAINT `stock_changes_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stock_changes` ADD CONSTRAINT `stock_changes_deleted_by_user_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_notifications_subscriber_id` ON `notifications` (`subscriber_id`);--> statement-breakpoint
CREATE INDEX `idx_stock_delivery_date` ON `stock` (`delivery_date`);--> statement-breakpoint
CREATE INDEX `idx_stock_changes_stock_id` ON `stock_changes` (`stock_id`);