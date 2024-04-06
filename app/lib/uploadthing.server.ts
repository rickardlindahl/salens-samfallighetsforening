import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { authenticator } from "./auth.server";
import { documents, NewDocument } from "~/db/schema";
import { db } from "~/db";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  documentUploader: f({ pdf: { maxFileSize: "4MB" } })
    .input(
      z.object({
        description: z.string().min(1),
      }),
    )
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, input }) => {
      console.log({ input });
      const user = await authenticator.isAuthenticated(req);
      // This code runs on your server before upload

      // If you throw, the user will not be able to upload
      if (!user) {
        throw new UploadThingError("Unauthorized");
      }

      return {
        userId: user.id,
        description: input.description,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      const newDocument: NewDocument = {
        ...metadata,
        ...file,
      };

      await db.insert(documents).values(newDocument);

      //await sendNewDocumentEmail(newDocument);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
