"use server";

import { signIn } from "@/auth";
import { InvalidLoginError } from "@/auth.config";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { LoginFormData } from "./schema";

export async function loginAction(credentials: LoginFormData) {
  let redirectUrl: string | null = null;

  try {
    const url = await signIn("credentials", {
      redirect: false,
      ...credentials,
    });

    if (url) {
      const searchParams = new URLSearchParams(url.split("?")[1]);
      redirectUrl = searchParams.get("callbackUrl") ?? "/";
    }
  } catch (e) {
    return {
      isError: true,
      isInvalidLoginError: e instanceof InvalidLoginError,
    };
  }

  if (redirectUrl) {
    revalidatePath("/");
    redirect(redirectUrl);
  } else {
    return {
      isError: true,
      isInvalidLoginError: false,
    };
  }
}
