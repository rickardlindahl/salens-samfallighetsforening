import { auth } from "@/auth";
import { db } from "@/db";
import { type NewDocument, documents } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { type FileRouter, createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  documentUploader: f({ pdf: { maxFileSize: "4MB" } })
    .input(
      z.object({
        description: z.string().min(1),
        createdAt: z.string().datetime({ offset: true }),
      }),
    )
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, input }) => {
      // This code runs on your server before upload
      console.log({ input });
      const session = await auth();

      // If you throw, the user will not be able to upload
      if (!session?.user) {
        throw new UploadThingError("Unauthorized");
      }

      return {
        userId: session.user.id as string,
        description: input.description,
        createdAt: input.createdAt,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      const { createdAt, ...formInputs } = metadata;
      const newDocument: NewDocument = {
        ...file,
        ...formInputs,
        createdAt: new Date(createdAt),
        updatedAt: new Date(),
      };

      await db.insert(documents).values(newDocument);

      revalidatePath("/admin/documents");
      revalidatePath("/documents");

      //await sendNewDocumentEmail(newDocument);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
