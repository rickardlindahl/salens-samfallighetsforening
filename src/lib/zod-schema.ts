import { z } from "zod";

export const postSchema = z.object({
  draft: z.boolean(),
  email_notification_sent: z.boolean(),
  email_notification_sent_at: z.string().nullable(),
  id: z.string().uuid(),
  image: z.string().nullable(),
  profile_id: z.string().uuid(),
  publish_date: z.string().datetime({ offset: true }).nullable(),
  title: z.string(),
  updated_at: z.string().datetime({ offset: true }).nullable(),
  user_id: z.string().uuid(),
});
export type PostSchema = typeof postSchema;

export type Post = z.infer<typeof postSchema>;
