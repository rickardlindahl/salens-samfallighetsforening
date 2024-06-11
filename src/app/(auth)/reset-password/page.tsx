import { Icons } from "@/components/icons";
import React, { Suspense } from "react";
import { ResetPasswordForm } from "./reset-password-form";

export default async function ResetPassword() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Återställ lösenord
        </h1>
        <p className="text-sm text-muted-foreground">
          Fyll i din epost för att återställa ditt lösenord.
        </p>
      </div>
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}
