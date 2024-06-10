ALTER TABLE "document" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "document" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "document" ADD COLUMN "key" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "document" ADD CONSTRAINT "document_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "document" DROP COLUMN IF EXISTS "pathname";--> statement-breakpoint
ALTER TABLE "document" DROP COLUMN IF EXISTS "contentType";--> statement-breakpoint
ALTER TABLE "document" DROP COLUMN IF EXISTS "contentDisposition";