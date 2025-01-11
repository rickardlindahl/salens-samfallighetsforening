import { Icons } from "@/components/icons";
import React, { Suspense } from "react";
import { ForgotPasswordForm } from "./forgot-password-form";

export default async function ForgotPassword() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Glömt lösenord
        </h1>
        <p className="text-sm text-muted-foreground">
          Vänligen ange din e-postadress nedan. Du kommer att få ett
          e-postmeddelande med instruktioner om hur du återställer ditt
          lösenord.
        </p>
      </div>
      <Suspense>
        <ForgotPasswordForm />
      </Suspense>
    </>
  );
}
