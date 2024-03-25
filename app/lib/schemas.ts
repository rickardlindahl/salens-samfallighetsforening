import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const inviteUserSchema = z.object({
  email: z.string().email().min(1),
  name: z.string().min(1),
  role: z.enum(["admin", "user"]),
});

export const resetPasswordSchema = z.object({
  email: z.string().email().min(1),
});
