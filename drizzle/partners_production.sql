-- Partners & suppliers portal — production schema.
-- Same tables as 0019_partner_applications.sql + 0020_partner_deliveries.sql, but
-- written to be safe to run by hand and to re-run: IF NOT EXISTS, with the foreign
-- keys and indexes inline (MySQL has no IF NOT EXISTS for ADD CONSTRAINT / CREATE INDEX).
-- Run it with:  mysql -h <host> -u <user> -p <database> < drizzle/partners_production.sql

CREATE TABLE IF NOT EXISTS `partner_applications` (
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
	CONSTRAINT `partner_applications_id` PRIMARY KEY(`id`),
	INDEX `partner_applications_status_idx` (`status`),
	CONSTRAINT `partner_applications_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action,
	CONSTRAINT `partner_applications_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action,
	CONSTRAINT `partner_applications_deleted_by_user_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action
);

CREATE TABLE IF NOT EXISTS `partner_deliveries` (
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
	CONSTRAINT `partner_deliveries_id` PRIMARY KEY(`id`),
	INDEX `partner_deliveries_partner_idx` (`partner_id`,`delivered_on`),
	CONSTRAINT `partner_deliveries_partner_id_partner_applications_id_fk` FOREIGN KEY (`partner_id`) REFERENCES `partner_applications`(`id`) ON DELETE cascade ON UPDATE no action,
	CONSTRAINT `partner_deliveries_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action,
	CONSTRAINT `partner_deliveries_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action,
	CONSTRAINT `partner_deliveries_deleted_by_user_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action
);
