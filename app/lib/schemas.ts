import { z } from "zod";

const email = z.string().email().min(1);
const password = z.string().min(8, "Password must be at least 8 characters");

export const loginSchema = z.object({
  email,
  password,
});

export const inviteUserSchema = z.object({
  email,
  name: z.string().min(1),
  role: z.enum(["admin", "user"]),
});

export const resetPasswordSchema = z.object({
  email,
});

export const resetPasswordTokenSchema = z.object({
  password,
});
