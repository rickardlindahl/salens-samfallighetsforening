"use server";

import { db } from "@/db";
import { passwordResetTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import { type TimeSpan, createDate } from "oslo";
import { generateRandomString, hashString } from "./utils.server";

export async function createPasswordResetToken(
  userId: string,
  expiresAt: TimeSpan,
): Promise<string> {
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.userId, userId));

  const tokenId = await generateRandomString(40);
  const tokenHash = await hashString(tokenId);

  await db.insert(passwordResetTokens).values({
    token: tokenHash,
    userId,
    expiresAt: createDate(expiresAt),
  });

  return tokenId;
}
