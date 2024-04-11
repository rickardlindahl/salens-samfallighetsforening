CREATE TABLE `householdMembers` (
	`userId` integer NOT NULL,
	`householdId` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`householdId`) REFERENCES `households`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `households` (
	`id` integer PRIMARY KEY NOT NULL,
	`streetName` text NOT NULL,
	`houseNumber` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `member` ON `householdMembers` (`userId`,`householdId`);--> statement-breakpoint
CREATE UNIQUE INDEX `address` ON `households` (`streetName`,`houseNumber`);