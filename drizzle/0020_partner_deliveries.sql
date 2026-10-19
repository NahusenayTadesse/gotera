CREATE TABLE `partner_deliveries` (
	`id` varchar(36) NOT NULL,
	`partner_id` varchar(36) NOT NULL,
	`delivered_on` date NOT NULL,
	`location` varchar(255) NOT NULL,
	`items` varchar(500) NOT NULL,
	`quantity` decimal(10,2) NOT NULL,
	`unit` varchar(20) NOT NULL,
	`value_pence` int,
	`reference` varchar(100),
	`status` enum('scheduled','delivered','cancelled') NOT NULL DEFAULT 'delivered',
	`notes` text,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3),
	`deleted_at` datetime,
	`deleted_by` varchar(255),
	CONSTRAINT `partner_deliveries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `partner_deliveries` ADD CONSTRAINT `partner_deliveries_partner_id_partner_applications_id_fk` FOREIGN KEY (`partner_id`) REFERENCES `partner_applications`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partner_deliveries` ADD CONSTRAINT `partner_deliveries_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partner_deliveries` ADD CONSTRAINT `partner_deliveries_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partner_deliveries` ADD CONSTRAINT `partner_deliveries_deleted_by_user_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `partner_deliveries_partner_idx` ON `partner_deliveries` (`partner_id`,`delivered_on`);