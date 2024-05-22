import { z } from "zod";

export const uploadDocumentFormSchema = z.object({
  description: z.string().min(1),
  createdAt: z.date(),
  file: z.custom<FileList>((v) => v instanceof FileList && v.length > 0, {
    message: "File is required",
  }),
});

export type UploadDocumentFormData = z.infer<typeof uploadDocumentFormSchema>;
