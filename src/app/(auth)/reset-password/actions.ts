"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { env } from "@/env";
import { sendResetPasswordEmail } from "@/lib/email.server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { TimeSpan } from "oslo";
import type { ResetPasswordFormData } from "./schema";
import { createPasswordResetToken } from "@/lib/password.server";

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
    const verificationToken = await createPasswordResetToken(
      user.id,
      new TimeSpan(2, "h"),
    );
    const verificationLink = `${env.NEXTAUTH_URL}/reset-password/${verificationToken}`;

    await sendResetPasswordEmail(
      user.email,
      user.name,
      verificationLink,
      "2 timmar",
    );
  } catch (e) {
    return {
      isError: true,
    };
  }

  redirect("/reset-password?state=success");
}
