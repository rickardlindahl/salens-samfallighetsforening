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
        console.log("onValid", data);
        const file = data.file.item(0);
        if (!file) {
          return;
        }
        console.log("SUBMITTING TO UPLOAD THING", { description: data.description, size: file.size });
        await startUpload([file], { description: data.description, size: file.size });
        reset();
      },
    },
  });

  console.log("watch('file')", watch("file"));

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
      {/*
      <div className="ut-flex ut-flex-col ut-gap-1 ut-items-center ut-justify-center">
        <input
          className="ut-rounded-md ut-w-96 ut-h-10 ut-p-3 ut-border-gray-300 ut-border ut-border-solid text-black"
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <label className="ut-bg-blue-600 ut-rounded-md ut-w-36 ut-h-10 ut-flex ut-items-center ut-justify-center ut-cursor-pointer">
          <input
            className="ut-hidden"
            type="file"
            multiple={false}
            disabled={description === "" || isUploading}
            accept={generateMimeTypes(allowedTypes ?? [])?.join(", ")}
            onChange={e => {
              if (!e.target.files) {
                return;
              }
              setFile(e.target.files[0]);
            }}
          />
        </label>
        <div className="ut-h-[1.25rem]">
          {allowedTypes && (
            <p className="ut-text-xs ut-leading-5 ut-text-gray-600">Allowed file types: {allowedTypes.join(", ")}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={!Boolean(file) || isUploading}
          className="ut-bg-blue-600 ut-rounded-md ut-w-36 ut-h-10 ut-text-white"
          onClick={() => {
            console.log("Button onClick", file);
            if (!file) {
              return;
            }
            void startUpload([file], { description, size: file.size });
          }}>
          {isUploading ? "Uploading file..." : "Upload"}
        </button>
      </div>
        */}
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
