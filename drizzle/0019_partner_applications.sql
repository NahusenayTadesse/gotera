CREATE TABLE `partner_applications` (
	`id` varchar(36) NOT NULL,
	`type` enum('partner','supplier') NOT NULL,
	`business_name` varchar(255) NOT NULL,
	`contact_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(40),
	`website` varchar(255),
	`city` varchar(120),
	`postcode` varchar(16),
	`category` varchar(60) NOT NULL,
	`message` text NOT NULL,
	`status` enum('new','contacted','approved','declined') NOT NULL DEFAULT 'new',
	`is_active` boolean NOT NULL DEFAULT true,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3),
	`deleted_at` datetime,
	`deleted_by` varchar(255),
	CONSTRAINT `partner_applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `partner_applications` ADD CONSTRAINT `partner_applications_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partner_applications` ADD CONSTRAINT `partner_applications_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partner_applications` ADD CONSTRAINT `partner_applications_deleted_by_user_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `partner_applications_status_idx` ON `partner_applications` (`status`);