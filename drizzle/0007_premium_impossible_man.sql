ALTER TABLE `addresses` MODIFY COLUMN `subscriber_id` varchar(36);
ALTER TABLE `gift_orders` ADD `quantity` int DEFAULT 1 NOT NULL;
ALTER TABLE `guest_orders` ADD `quantity` int DEFAULT 1 NOT NULL;
ALTER TABLE `referrals` ADD `quantity` int DEFAULT 1 NOT NULL;