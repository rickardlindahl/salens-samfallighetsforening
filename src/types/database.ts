import type { PostgrestError } from "@supabase/supabase-js";
import type { Database } from "./supabase";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> = Database["public"]["Enums"][T];

export type Insert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type Update<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
export type DbResultErr = PostgrestError;

export type Document = Tables<"documents">;
export type Post = Tables<"posts">;
export type Profile = Tables<"profiles">;
export type House = Tables<"houses">;
export type HouseholdMember = Tables<"household_members">;

export type Role = Enums<"role_enum">;
