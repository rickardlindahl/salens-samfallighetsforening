import { Icons } from "@/components/icons";
import React, { Suspense } from "react";
import { ResetPasswordForm } from "./reset-password-form";

export default async function ResetPassword() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Reset password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to request a password reset.
        </p>
      </div>
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}