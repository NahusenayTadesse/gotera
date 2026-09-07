CREATE TABLE `delivery_skip_dates` (
	`id` varchar(36) NOT NULL,
	`date` date NOT NULL,
	`reason` varchar(255),
	`is_active` boolean NOT NULL DEFAULT true,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3),
	`deleted_at` datetime,
	`deleted_by` varchar(255),
	CONSTRAINT `delivery_skip_dates_id` PRIMARY KEY(`id`),
	CONSTRAINT `delivery_skip_dates_date_unique` UNIQUE(`date`)
);
--> statement-breakpoint
ALTER TABLE `delivery_skip_dates` ADD CONSTRAINT `delivery_skip_dates_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `delivery_skip_dates` ADD CONSTRAINT `delivery_skip_dates_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `delivery_skip_dates` ADD CONSTRAINT `delivery_skip_dates_deleted_by_user_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;