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
  console.log("entry", data);
  const tokenHash = await hashString(verificationToken);

  const [token] = await db
    .select()
    .from(passwordResetTokens)
    .where(eq(passwordResetTokens.token, tokenHash))
    .limit(1);
  console.log("Token", token);
  if (token) {
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.token, tokenHash));
  }

  if (!token || !isWithinExpirationDate(token.expiresAt)) {
    console.log("returning error");
    return {
      error: true,
      isInvalidToken: true,
    };
  }
  console.log("apparenttly all good");

  const hashedPassword = await hashString(password);
  console.log("hashedPassword", hashedPassword);
  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, token.userId));

  return redirect("/login");
}
