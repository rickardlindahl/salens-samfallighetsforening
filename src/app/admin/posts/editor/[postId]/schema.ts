import { z } from "zod";

export const editPostFormSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
});

export type EditPostFormData = z.infer<typeof editPostFormSchema>;
