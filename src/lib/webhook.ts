import { z } from "zod";
import type { PostSchema, DocumentSchema } from "./zod-schema";

export const webhookPayloadSchema = <T extends PostSchema | DocumentSchema>({
  record,
  table,
  type,
}: {
  record: T;
  table: "posts" | "documents";
  type: "INSERT" | "UPDATE" | "DELETE";
}) =>
  z.object({
    type: z.literal(type),
    table: z.literal(table),
    schema: z.string(),
    record,
    old_record: record,
  });
