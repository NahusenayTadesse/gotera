-- Batch traceability — production schema (same tables as 0021_traceability.sql).
-- Requires partners_production.sql to have been run first (references partner tables).
-- Safe to re-run: IF NOT EXISTS everywhere, FKs/indexes inline.
-- Run it with:  mysql -h <host> -u <user> -p <database> < drizzle/traceability_production.sql

CREATE TABLE IF NOT EXISTS `batches` (
	`id` varchar(36) NOT NULL,
	`code` varchar(40) NOT NULL,
	`product` enum('injera','addon') NOT NULL,
	`addon_id` varchar(36),
	`source` enum('in_house','external') NOT NULL DEFAULT 'in_house',
	`source_partner_id` varchar(36),
	`source_delivery_id` varchar(36),
	`supplier_lot_ref` varchar(100),
	`produced_on` date NOT NULL,
	`best_before` date,
	`quantity` int NOT NULL,
	`unit` varchar(20) NOT NULL DEFAULT 'packs',
	`status` enum('active','quarantined','recalled','depleted') NOT NULL DEFAULT 'active',
	`notes` text,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3),
	`deleted_at` datetime,
	`deleted_by` varchar(255),
	CONSTRAINT `batches_id` PRIMARY KEY(`id`),
	CONSTRAINT `batches_code_unique` UNIQUE(`code`),
	INDEX `batches_product_idx` (`product`,`addon_id`,`status`),
	INDEX `batches_source_partner_idx` (`source_partner_id`),
	CONSTRAINT `batches_addon_id_addons_id_fk` FOREIGN KEY (`addon_id`) REFERENCES `addons`(`id`) ON DELETE no action ON UPDATE no action,
	CONSTRAINT `batches_source_partner_id_partner_applications_id_fk` FOREIGN KEY (`source_partner_id`) REFERENCES `partner_applications`(`id`) ON DELETE restrict ON UPDATE no action,
	CONSTRAINT `batches_source_delivery_id_partner_deliveries_id_fk` FOREIGN KEY (`source_delivery_id`) REFERENCES `partner_deliveries`(`id`) ON DELETE set null ON UPDATE no action,
	CONSTRAINT `batches_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action,
	CONSTRAINT `batches_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action,
	CONSTRAINT `batches_deleted_by_user_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action
);

CREATE TABLE IF NOT EXISTS `batch_inputs` (
	`id` varchar(36) NOT NULL,
	`batch_id` varchar(36) NOT NULL,
	`partner_delivery_id` varchar(36) NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3),
	`deleted_at` datetime,
	`deleted_by` varchar(255),
	CONSTRAINT `batch_inputs_id` PRIMARY KEY(`id`),
	CONSTRAINT `batch_inputs_uniq` UNIQUE(`batch_id`,`partner_delivery_id`),
	CONSTRAINT `batch_inputs_batch_id_batches_id_fk` FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE cascade ON UPDATE no action,
	CONSTRAINT `batch_inputs_partner_delivery_id_partner_deliveries_id_fk` FOREIGN KEY (`partner_delivery_id`) REFERENCES `partner_deliveries`(`id`) ON DELETE restrict ON UPDATE no action,
	CONSTRAINT `batch_inputs_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action,
	CONSTRAINT `batch_inputs_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action,
	CONSTRAINT `batch_inputs_deleted_by_user_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action
);

-- guest_order_id has no FK here; it's added below with a collation copied from
-- guest_orders.id, which differs from the other tables in some environments.
CREATE TABLE IF NOT EXISTS `batch_allocations` (
	`id` varchar(36) NOT NULL,
	`batch_id` varchar(36) NOT NULL,
	`shipment_type` enum('subscription','guest','gift','partner') NOT NULL,
	`delivery_id` varchar(36),
	`guest_order_id` varchar(36),
	`gift_order_id` varchar(36),
	`partner_delivery_id` varchar(36),
	`addon_id` varchar(36),
	`line_key` varchar(120) NOT NULL,
	`quantity` int NOT NULL,
	`method` enum('auto','manual') NOT NULL DEFAULT 'auto',
	`is_active` boolean NOT NULL DEFAULT true,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3),
	`deleted_at` datetime,
	`deleted_by` varchar(255),
	CONSTRAINT `batch_allocations_id` PRIMARY KEY(`id`),
	CONSTRAINT `batch_allocations_line_batch_uniq` UNIQUE(`line_key`,`batch_id`),
	INDEX `batch_allocations_batch_idx` (`batch_id`),
	INDEX `batch_allocations_line_idx` (`line_key`),
	CONSTRAINT `batch_allocations_batch_id_batches_id_fk` FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE restrict ON UPDATE no action,
	CONSTRAINT `batch_allocations_delivery_id_deliveries_id_fk` FOREIGN KEY (`delivery_id`) REFERENCES `deliveries`(`id`) ON DELETE cascade ON UPDATE no action,
	CONSTRAINT `batch_allocations_gift_order_id_gift_orders_id_fk` FOREIGN KEY (`gift_order_id`) REFERENCES `gift_orders`(`id`) ON DELETE cascade ON UPDATE no action,
	CONSTRAINT `batch_allocations_partner_delivery_id_partner_deliveries_id_fk` FOREIGN KEY (`partner_delivery_id`) REFERENCES `partner_deliveries`(`id`) ON DELETE cascade ON UPDATE no action,
	CONSTRAINT `batch_allocations_addon_id_addons_id_fk` FOREIGN KEY (`addon_id`) REFERENCES `addons`(`id`) ON DELETE no action ON UPDATE no action,
	CONSTRAINT `batch_allocations_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action,
	CONSTRAINT `batch_allocations_updated_by_user_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action,
	CONSTRAINT `batch_allocations_deleted_by_user_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action
);

-- Match guest_order_id's charset/collation to guest_orders.id, then add its FK (once).
SET @gcs = (SELECT character_set_name FROM information_schema.columns
	WHERE table_schema = DATABASE() AND table_name = 'guest_orders' AND column_name = 'id');
SET @gco = (SELECT collation_name FROM information_schema.columns
	WHERE table_schema = DATABASE() AND table_name = 'guest_orders' AND column_name = 'id');
SET @sql = CONCAT('ALTER TABLE `batch_allocations` MODIFY `guest_order_id` varchar(36) CHARACTER SET ', @gcs, ' COLLATE ', @gco);
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @has_fk = (SELECT COUNT(*) FROM information_schema.table_constraints
	WHERE table_schema = DATABASE() AND table_name = 'batch_allocations'
	AND constraint_name = 'batch_allocations_guest_order_id_guest_orders_id_fk');
SET @sql = IF(@has_fk = 0,
	'ALTER TABLE `batch_allocations` ADD CONSTRAINT `batch_allocations_guest_order_id_guest_orders_id_fk` FOREIGN KEY (`guest_order_id`) REFERENCES `guest_orders`(`id`) ON DELETE cascade ON UPDATE no action',
	'DO 0');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
