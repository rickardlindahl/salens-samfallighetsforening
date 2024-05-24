"use server";

import { db } from "@/db";
import { passwordResetTokens, users } from "@/db/schema";
import { generateRandomString, hashString } from "@/lib/utils.server";
import { eq } from "drizzle-orm";
import { TimeSpan, createDate } from "oslo";
import type { ResetPasswordFormData } from "./schema";
import { redirect } from "next/navigation";
import { sendPasswordResetTokenEmail } from "@/lib/email.server";

export async function createPasswordResetToken(
  userId: string,
): Promise<string> {
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.userId, userId));

  const tokenId = await generateRandomString(40);
  const tokenHash = await hashString(tokenId);

  await db.insert(passwordResetTokens).values({
    token: tokenHash,
    userId,
    expiresAt: createDate(new TimeSpan(2, "h")),
  });

  return tokenId;
}

export async function resetPasswordAction(data: ResetPasswordFormData) {
  const { email } = data;

  const [user] = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    // Don't reveal whether the email exists
    return redirect("/reset-password?state=success");
  }

  try {
    const verificationToken = await createPasswordResetToken(user.id);
    const verificationLink = `http://localhost:3000/reset-password/${verificationToken}`;

    await sendPasswordResetTokenEmail(email, verificationLink);

    return redirect("/reset-password?state=success");
  } catch (e) {
    return {
      isError: true,
    };
  }
}