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
  documentId: z.string().uuid(),
});

export type DeleteDocumentSchema = typeof deleteDocumentSchema;

export const passwordSchema = z.string().min(8, "Lösenordet måste vara minst 8 tecken långt");

export const loginFormSchema = z.object({
  email: z.string().email("Var god fyll i en giltig epost-adress"),
  password: z.string(),
});

export type LoginFormSchema = typeof loginFormSchema;

export const resetPasswordFormSchema = z.object({
  password: passwordSchema,
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
});

export type ResetPasswordFormSchema = typeof resetPasswordFormSchema;

export const postFormSchema = z.object({
  title: z.string().min(1, "Ange en rubrik"),
  draft: z.boolean(),
  updated_at: z.string().datetime({ offset: true }).nullable(),
  publish_date: z.string().datetime({ offset: true }).nullable(),
  image: z.string().nullable(),
});

export type PostFormSchema = typeof postFormSchema;

export const deletePostSchema = z.object({
  postId: z.string().uuid(),
});

export type DeletePostSchema = typeof deletePostSchema;

export const inviteUserFormSchema = z.object({
  email: z.string().email("Var vänlig fyll i en giltig epostadress"),
  full_name: z.string().min(2, "Var vänlig fyll i ett namn"),
  role: z.enum(["admin", "user"]),
  house_id: z.string().uuid("Var vänlig välj ett hushåll"),
});

export type InviteUserFormSchema = typeof inviteUserFormSchema;
