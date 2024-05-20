import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as Icons from "@/components/icons";

export default async function ForgotPasswordSuccessPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <Icons.Logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Request submitted
        </h1>
        <p className="text-sm text-muted-foreground">
          Check your email for a link that will allow you to securely reset your
          password.
        </p>
        <Link href="/" className={cn(buttonVariants({ variant: "link" }))}>
          Home
        </Link>
      </div>
    </>
  );
}
