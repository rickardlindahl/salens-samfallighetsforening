import { Icons } from "@/components/icons";
import React, { Suspense } from "react";
import { ResetPasswordTokenForm } from "./reset-password-token-form";

export default async function ResetPassword({
  params,
}: { params: { token: string } }) {
  const { token } = params;
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">New password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your new password below.
        </p>
      </div>
      <Suspense>
        <ResetPasswordTokenForm token={token} />
      </Suspense>
    </>
  );
}
