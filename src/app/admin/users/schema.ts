import { roles } from "@/db/schema";
import { z } from "zod";

export const inviteUserFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  role: z.enum(roles),
});

export type InviteUserFormData = z.infer<typeof inviteUserFormSchema>;
