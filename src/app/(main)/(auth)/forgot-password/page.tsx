import React, { Suspense } from "react";

import { ForgotPasswordForm } from "./forgot-password-form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import * as Icons from "@/components/icons";

export default async function ForgotPassword() {
	return (
		<div className="container flex h-screen w-screen flex-col items-center justify-center">
			<Link
				href="/"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute left-4 top-4 md:left-8 md:top-8",
				)}
			>
				<>
					<Icons.ArrowLeft className="mr-2 h-4 w-4" />
					Back
				</>
			</Link>
			<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<div className="flex flex-col space-y-2 text-center">
					<Icons.Logo className="mx-auto h-6 w-6" />
					<h1 className="text-2xl font-semibold tracking-tight">
						Forgot Password
					</h1>
					<p className="text-sm text-muted-foreground">
						Please enter your email below. You will receive an email message
						with instructions on how to reset your password.
					</p>
				</div>

				<Suspense>
					<ForgotPasswordForm />
				</Suspense>
			</div>
		</div>
	);
}
