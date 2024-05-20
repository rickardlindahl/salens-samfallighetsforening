"use server";

import { signIn } from "@/auth";
import { InvalidLoginError } from "@/auth.config";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { LoginFormData } from "./schema";

export async function login(credentials: LoginFormData) {
  console.log("server action - login - ", credentials);
  try {
    await signIn("credentials", credentials);
  } catch (e) {
    return {
      isError: true,
      isInvalidLoginError: e instanceof InvalidLoginError,
    };
  }

  revalidatePath("/");
  return redirect("/posts");
}
