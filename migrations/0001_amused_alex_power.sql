CREATE TABLE `passwordResetTokens` (
	`token` text,
	`userId` integer NOT NULL,
	`expiresAt` integer,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `passwordResetTokens_token_unique` ON `passwordResetTokens` (`token`);