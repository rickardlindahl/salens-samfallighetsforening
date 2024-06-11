import { Icons } from "@/components/icons";
import type { Metadata } from "next";
import Link from "next/link";
import React, { Suspense } from "react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Välkommen tillbaka
        </h1>
        <p className="text-sm text-muted-foreground">
          Fyll i din epost och lösenord för att logga in
        </p>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/reset-password"
          className="hover:text-brand underline underline-offset-4"
        >
          Glömt ditt lösenord?
        </Link>
      </p>
    </>
  );
}
