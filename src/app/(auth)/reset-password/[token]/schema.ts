import { z } from "zod";

export const resetPasswordTokenFormSchema = z.object({
  password: z.string().min(1),
  token: z.string().min(1),
});

export type ResetPasswordTokenFormData = z.infer<
  typeof resetPasswordTokenFormSchema
>;
