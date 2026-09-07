CREATE TABLE `delivery_addon_purchases` (
	`id` varchar(36) NOT NULL,
	`delivery_id` varchar(36) NOT NULL,
	`stripe_payment_intent_id` varchar(255),
	`amount_pence` int NOT NULL,
	`items` json NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3),
	`deleted_at` datetime,
	`deleted_by` varchar(255),
	CONSTRAINT `delivery_addon_purchases_id` PRIMARY KEY(`id`),
	CONSTRAINT `delivery_addon_purchases_stripe_payment_intent_id_unique` UNIQUE(`stripe_payment_intent_id`)
);
--> statement-breakpoint
ALTER TABLE `deliveries` ADD `addon_access_token` varchar(64);--> statement-breakpoint
ALTER TABLE `deliveries` ADD CONSTRAINT `deliveries_addon_access_token_unique` UNIQUE(`addon_access_token`);--> statement-breakpoint
ALTER TABLE `delivery_addon_purchases` ADD CONSTRAINT `delivery_addon_purchases_delivery_id_deliveries_id_fk` FOREIGN KEY (`delivery_id`) REFERENCES `deliveries`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `delivery_addon_purchases` ADD CONSTRAINT `delivery_addon_purchases_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `delivery_addon_purchases` ADD CONSTRAINT `delivery_addon_purchases_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `delivery_addon_purchases` ADD CONSTRAINT `delivery_addon_purchases_deleted_by_user_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;