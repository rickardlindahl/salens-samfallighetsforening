import { generateReactHelpers } from "@uploadthing/react";

import type { OurFileRouter } from "~/lib/uploadthing.server";

export const { useUploadThing } = generateReactHelpers<OurFileRouter>({
  url: "/api/uploadthing",
});

export const generateMimeTypes = (fileTypes: string[]) => {
  const accepted = fileTypes.map(type => (type !== "blob" ? `${type}/*` : "blob"));

  if (accepted.includes("blob")) {
    return undefined;
  }

  return accepted;
};
