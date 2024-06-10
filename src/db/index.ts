import { hashString } from "@/lib/utils.server";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { type Role, users } from "./schema";
import postgres from "postgres";

const POSTGRES_URL = process.env.POSTGRES_URL;
if (!POSTGRES_URL) {
  throw new Error("Missing environment variable POSTGRES_URL");
}

const client = postgres(POSTGRES_URL);
export const db = drizzle(client);

export async function getUser(email: string) {
  return await db.select().from(users).where(eq(users.email, email)).limit(1);
}

export async function createUser({
  email,
  name,
  role,
  passwordPlaintext,
}: {
  email: string;
  name: string;
  role: Role;
  passwordPlaintext: string;
}) {
  const hashedPassword = await hashString(passwordPlaintext);

  return await db
    .insert(users)
    .values({ email, password: hashedPassword, name, role });
}
