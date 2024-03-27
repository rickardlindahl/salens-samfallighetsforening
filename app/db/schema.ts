import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

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
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(), // Date
});

export type Post = typeof posts.$inferSelect;
