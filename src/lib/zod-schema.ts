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

export const documentSchema = z.object({
  created_at: z.string(),
  description: z.string(),
  email_notification_sent: z.boolean(),
  email_notification_sent_at: z.string().datetime({ offset: true }).nullable(),
  file_name: z.string(),
  file_size: z.number(),
  id: z.string().uuid(),
  profile_id: z.string().uuid(),
  storage_path: z.string(),
  user_id: z.string().uuid(),
});
export type DocumentSchema = typeof documentSchema;

export type Document = z.infer<typeof documentSchema>;
