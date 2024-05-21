"use server";

import { signIn } from "@/auth";
import { InvalidLoginError } from "@/auth.config";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { LoginFormData } from "./schema";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function loginAction(credentials: LoginFormData) {
  console.log("server action - login - ", credentials);
  try {
    await signIn("credentials", credentials);
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }
    console.error(e);
    return {
      isError: true,
      isInvalidLoginError: e instanceof InvalidLoginError,
    };
  } finally {
    revalidatePath("/");
    redirect("/posts");
  }
}
