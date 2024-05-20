import { createTempPassword, hashString } from "@/lib/utils.server";
import { neonConfig } from "@neondatabase/serverless";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";
import { drizzle as drizzleProd } from "drizzle-orm/vercel-postgres";
import { drizzle as drizzleDev } from "drizzle-orm/postgres-js";
import { type Role, users } from "./schema";
import postgres from "postgres";

const POSTGRES_URL = process.env.POSTGRES_URL;
if (!POSTGRES_URL) {
  throw new Error("Missing environment variable POSTGRES_URL");
}

let database: ReturnType<typeof drizzleDev> | ReturnType<typeof drizzleProd>;

// if we're running locally
if (!process.env.VERCEL_ENV) {
  const client = postgres(POSTGRES_URL);
  database = drizzleDev(client);

  console.log("Setting up wsProxy for postgres");
  // Set the WebSocket proxy to work with the local instance
  neonConfig.wsProxy = (host) => {
    console.log("wsProxy", { host });

    return `${host}:5433/v1`;
  };
  // Disable all authentication and encryption
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
} else {
  database = drizzleProd(sql);
}

//const client = postgres(`${POSTGRES_URL}?sslmode=require`);
export const db = database;

export async function getUser(email: string) {
  console.log("Calling getUser", email);
  return await database.select().from(users).where(eq(users.email, email));
}

export async function createUser(email: string, name: string, role: Role) {
  const tempPassword = await createTempPassword();
  const hashedPassword = await hashString(tempPassword);

  return await database
    .insert(users)
    .values({ email, password: hashedPassword, name, role });
}
