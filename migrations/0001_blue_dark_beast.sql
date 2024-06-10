CREATE TABLE IF NOT EXISTS "document" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"name" text NOT NULL,
	"description" varchar(256) NOT NULL,
	"size" integer NOT NULL,
	"pathname" varchar(256) NOT NULL,
	"contentType" text NOT NULL,
	"contentDisposition" varchar(256) NOT NULL,
	"url" text NOT NULL
);
