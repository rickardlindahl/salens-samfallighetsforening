"use server";

import { db } from "@/db";
import { passwordResetTokens, users } from "@/db/schema";
import { env } from "@/env";
import { sendResetPasswordEmail } from "@/lib/email.server";
import { generateRandomString, hashString } from "@/lib/utils.server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { TimeSpan, createDate } from "oslo";
import type { ResetPasswordFormData } from "./schema";

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
    .select({ id: users.id, email: users.email, name: users.name })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    // Don't reveal whether the email exists
    redirect("/reset-password?state=success");
  }

  try {
    const verificationToken = await createPasswordResetToken(user.id);
    const verificationLink = `${env.NEXTAUTH_URL}/reset-password/${verificationToken}`;

    await sendResetPasswordEmail(user.email, user.name, verificationLink);
  } catch (e) {
    return {
      isError: true,
    };
  }

  redirect("/reset-password?state=success");
}
