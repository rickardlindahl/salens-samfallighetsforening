import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DB_URL is not set");
}

if (!process.env.DATABASE_AUTH_TOKEN) {
  throw new Error("DB_AUTH_TOKEN is not set");
}

export default defineConfig({
  driver: "turso",
  out: "./migrations",
  schema: "./app/db/schema.ts",
  breakpoints: true,
  dbCredentials: {
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
});
