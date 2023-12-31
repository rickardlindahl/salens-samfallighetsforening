import { SupabaseClient, Session } from "@supabase/supabase-js";
import type { Database } from "./types/supabase";

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>;
      supabaseAdmin: SupabaseClient<Database>;
      getSession(): Promise<Session | null>;
    }
    interface PageData {
      session: Session | null;
    }
    interface Error {
      status: number;
    }
    // interface Platform {}
  }
}
