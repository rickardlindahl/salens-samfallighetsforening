import { z } from "zod";
import type { PostSchema, DocumentSchema } from "./zod-schema";

export const webhookInsertPayloadSchema = <T extends PostSchema | DocumentSchema>({
  record,
  table,
}: {
  record: T;
  table: "posts" | "documents";
}) =>
  z.object({
    type: z.literal("INSERT"),
    table: z.literal(table),
    schema: z.string(),
    record,
    old_record: z.null(),
  });

export const webhookUpdatePayloadSchema = <T extends PostSchema | DocumentSchema>({
  record,
  table,
}: {
  record: T;
  table: "posts" | "documents";
}) =>
  z.object({
    type: z.literal("UPDATE"),
    table: z.literal(table),
    schema: z.string(),
    record,
    old_record: record,
  });
