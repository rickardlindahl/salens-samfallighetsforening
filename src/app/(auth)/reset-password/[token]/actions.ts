"use server";

import { hashString } from "@/lib/utils.server";
import type { ResetPasswordTokenFormData } from "./schema";
import { db } from "@/db";
import { passwordResetTokens, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isWithinExpirationDate } from "oslo";
import { redirect } from "next/navigation";

export async function resetPasswordTokenAction(
  data: ResetPasswordTokenFormData,
) {
  const { password, token: verificationToken } = data;
  const tokenHash = await hashString(verificationToken);

  const [token] = await db
    .select()
    .from(passwordResetTokens)
    .where(eq(passwordResetTokens.token, tokenHash))
    .limit(1);

  if (token) {
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.token, tokenHash));
  }

  if (!token || !isWithinExpirationDate(token.expiresAt)) {
    return {
      isError: true,
      isInvalidToken: true,
    };
  }

  const hashedPassword = await hashString(password);
  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, token.userId));

  return redirect("/login");
}
