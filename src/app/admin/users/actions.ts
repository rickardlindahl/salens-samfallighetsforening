"use server";

import { createUser, getUser } from "@/db";
import { env } from "@/env";
import { sendInviteEmail } from "@/lib/email.server";
import { createPasswordResetToken } from "@/lib/password.server";
import { createTempPassword } from "@/lib/utils.server";
import { revalidatePath } from "next/cache";
import { TimeSpan } from "oslo";
import type { InviteUserFormData } from "./schema";

export async function inviteUserAction(data: InviteUserFormData) {
  const { email, name, role } = data;

  const [existingUser] = await getUser(email);
  if (existingUser) {
    return {
      isError: true,
      isConflict: true,
    };
  }

  const passwordPlaintext = await createTempPassword();

  const [newUser] = await createUser({
    email,
    name,
    role,
    passwordPlaintext,
  });

  const verificationToken = await createPasswordResetToken(
    newUser.id,
    new TimeSpan(7, "d"),
  );
  const verificationLink = `${env.NEXTAUTH_URL}/reset-password/${verificationToken}`;

  await sendInviteEmail(
    newUser.email,
    newUser.name,
    verificationLink,
    "7 dagar",
  );

  revalidatePath("/admin/users");
}
