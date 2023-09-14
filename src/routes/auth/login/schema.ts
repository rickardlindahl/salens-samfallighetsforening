import { z } from "zod";

export const passwordSchema = z.string().min(8, "Lösenordet måste vara minst 8 tecken långt");

export const loginFormSchema = z.object({
  email: z.string().email("Var god fyll i en giltig epost-adress"),
  password: passwordSchema,
});

export type LoginFormSchema = typeof loginFormSchema;
