CREATE TABLE `guest_orders` (
	`id` varchar(36) NOT NULL,
	`buyer_email` varchar(255),
	`recipient_name` varchar(255) NOT NULL,
	`recipient_address` json NOT NULL,
	`stripe_payment_intent_id` varchar(255),
	`status` enum('pending','paid','fulfilled') NOT NULL DEFAULT 'pending',
	`is_active` boolean NOT NULL DEFAULT true,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3),
	`deleted_at` datetime,
	`deleted_by` varchar(255),
	CONSTRAINT `guest_orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `guest_orders_stripe_payment_intent_id_unique` UNIQUE(`stripe_payment_intent_id`)
);
--> statement-breakpoint
ALTER TABLE `gift_orders` MODIFY COLUMN `buyer_email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `gift_orders` ADD `buyer_name` varchar(255);--> statement-breakpoint
ALTER TABLE `gift_orders` ADD `gift_message` text;--> statement-breakpoint
ALTER TABLE `gift_orders` ADD `duration_months` int DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `guest_orders` ADD CONSTRAINT `guest_orders_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `guest_orders` ADD CONSTRAINT `guest_orders_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `guest_orders` ADD CONSTRAINT `guest_orders_deleted_by_user_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;