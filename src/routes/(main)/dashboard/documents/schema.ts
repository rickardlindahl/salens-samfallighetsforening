import { z } from "zod";

export const uploadDocumentSchema = z.object({
  description: z.string().min(2, "Fyll i en beskrivning"),
  file: z.any(),
});

export type UploadDocumentSchema = typeof uploadDocumentSchema;

const oneKiB = 1024;
const oneMiB = 1000 * oneKiB;

export const fileSchema = z
  .instanceof(File, { message: "Var god välj en fil" })
  .refine((file) => file.size !== 0, "Var god välj en fil")
  .refine((file) => file.size < 5 * oneMiB, "Filen får inte vara större än 5 MiB");

export const deleteDocumentSchema = z.object({
  documentId: z.string().min(2),
});

export type DeleteDocumentSchema = typeof deleteDocumentSchema;
