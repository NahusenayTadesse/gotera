CREATE TABLE `page_views` (
	`id` int AUTO_INCREMENT NOT NULL,
	`visitor_hash` varchar(32) NOT NULL,
	`path` varchar(255) NOT NULL,
	`referrer` varchar(255),
	`device` enum('mobile','tablet','desktop') NOT NULL,
	`signed_in` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `page_views_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `idx_page_views_created_at` ON `page_views` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_page_views_path` ON `page_views` (`path`);