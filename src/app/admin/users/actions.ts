"use server";

import { createUser, getUser } from "@/db";
import { sendInviteEmail } from "@/lib/email.server";
import { createTempPassword } from "@/lib/utils.server";
import { revalidatePath } from "next/cache";
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

  await createUser({
    email,
    name,
    role,
    passwordPlaintext,
  });

  await sendInviteEmail(email, passwordPlaintext);

  revalidatePath("/admin/users");
}
