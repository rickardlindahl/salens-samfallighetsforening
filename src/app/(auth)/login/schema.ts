import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
