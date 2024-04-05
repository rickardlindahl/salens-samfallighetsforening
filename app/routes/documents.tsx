import { zodResolver } from "@hookform/resolvers/zod";
import { Await, Form, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, defer } from "@vercel/remix";
import { Suspense, useState } from "react";
import { useRemixForm } from "remix-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { authenticator } from "~/lib/auth.server";
import { uploadDocumentSchema } from "~/lib/schemas";
import { generateMimeTypes, useUploadThing } from "~/lib/uploadthing";

export const meta = () => [
  {
    title: "Remix DnB Stack | Books Edge Streaming",
  },
  {
    charset: "utf-8",
  },
  {
    viewport: "width=device-width,initial-scale=1",
  },
];

async function getDocuments() {
  return [];
}

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return defer({
    documents: getDocuments(),
  });
}

type FormData = z.infer<typeof uploadDocumentSchema>;

const resolver = zodResolver(uploadDocumentSchema);

export default function Documents() {
  const { documents } = useLoaderData<typeof loader>();

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing("documentUploader", {
    onUploadError: error => {
      toast.error("An error occurred while uploading the file.");
      console.error(error);
    },
    onClientUploadComplete: () => {
      toast.success("File uploaded successfully.");
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
    stringifyAllValues: false,
    submitHandlers: {
      onValid: async data => {
        const file = data.file.item(0);
        if (!file) {
          return;
        }

        await startUpload([file], { description: data.description });
        reset();
      },
    },
  });

  const allowedTypes = permittedFileInfo?.config ? Object.keys(permittedFileInfo?.config) : [];

  return (
    <main>
      <h1>Documents</h1>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          Description:
          <input type="text" {...register("description", { required: true })} className="text-black" />
          {errors.description && <p>{errors.description.message}</p>}
        </label>
        <label>
          File:
          <input
            type="file"
            {...register("file", { required: true })}
            disabled={!watch("description")}
            accept={generateMimeTypes(allowedTypes ?? [])?.join(", ")}
            className="text-black"
          />
          {errors.file && <p>{errors.file.message}</p>}
        </label>
        <button disabled={isUploading || !watch("description" || !watch("file") || watch("file")?.length === 0)}>
          Upload
        </button>
      </form>
      <Suspense fallback={<h1 className="mb-10 mt-5 text-center text-3xl font-bold">Loading books ...</h1>}>
        <Await resolve={documents}>
          {documents => (
            <div>
              {/*
              documents.map(doc => (
                <div key={doc.id} className="mb-5">
                  <h2 className="text-2xl font-bold">{doc.title}</h2>
                  <p>{doc.body}</p>
                </div>
              ))
              */}
            </div>
          )}
        </Await>
      </Suspense>
    </main>
  );
}
