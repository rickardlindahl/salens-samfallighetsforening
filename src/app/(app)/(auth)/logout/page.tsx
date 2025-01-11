import React, { Suspense } from "react";

import { Icons } from "@/components/icons";
import { LogoutForm } from "./logout-form";

export default async function Logout() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Loggar ut</h1>
        <p className="text-sm text-muted-foreground">
          Vänligen vänta medan du loggas ut
        </p>
      </div>
      <Suspense>
        <LogoutForm />
      </Suspense>
    </>
  );
}
