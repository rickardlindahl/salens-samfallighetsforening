import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["user", "admin"] })
    .notNull()
    .default("user"),
});

export type User = typeof users.$inferSelect;

export const passwordResetTokens = sqliteTable("passwordResetTokens", {
  token: text("token").notNull().unique(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(), // Date
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export const documents = sqliteTable("documents", {
  id: integer("id").primaryKey(),
  description: text("description").notNull(),
  userId: integer("userId")
    .references(() => users.id)
    .notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  size: integer("size").notNull(),
  url: text("url").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
});

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;

export const households = sqliteTable(
  "households",
  {
    id: integer("id").primaryKey(),
    streetName: text("streetName").notNull(),
    houseNumber: integer("houseNumber").notNull(),
  },
  t => ({
    unq: unique("address").on(t.streetName, t.houseNumber),
  }),
);

export const householdMembers = sqliteTable(
  "householdMembers",
  {
    userId: integer("userId")
      .references(() => users.id)
      .notNull(),
    householdId: integer("householdId")
      .references(() => households.id)
      .notNull(),
  },
  t => ({
    unq: unique("member").on(t.userId, t.householdId),
  }),
);
