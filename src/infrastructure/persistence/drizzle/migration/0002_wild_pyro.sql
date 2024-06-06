ALTER TABLE `servers` MODIFY COLUMN `name` varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE `servers` MODIFY COLUMN `owner_id` bigint unsigned NOT NULL;