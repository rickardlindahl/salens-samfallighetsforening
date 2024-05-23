CREATE TABLE IF NOT EXISTS "post" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"title" varchar(256) NOT NULL,
	"body" json NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp,
	"publishDate" timestamp,
	"draft" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post" ADD CONSTRAINT "post_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
