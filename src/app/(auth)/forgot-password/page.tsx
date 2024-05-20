import React, { Suspense } from "react";

import { ForgotPasswordForm } from "./forgot-password-form";
import * as Icons from "@/components/icons";

export default async function ForgotPassword() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <Icons.Logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Forgot Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Please enter your email below. You will receive an email message with
          instructions on how to reset your password.
        </p>
      </div>

      <Suspense>
        <ForgotPasswordForm />
      </Suspense>
    </>
  );
}
