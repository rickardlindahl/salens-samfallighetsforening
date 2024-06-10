import { z } from "zod";

export const resetPasswordFormSchema = z.object({
  email: z.string().email().min(1),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;
