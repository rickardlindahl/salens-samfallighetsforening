import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";

import { getMeUser } from "@/lib/utilities/getMeUser";
import { LoginForm } from "./login-form";

import * as Icons from "@/components/icons";

export const metadata: Metadata = {
	title: "Login",
	description: "Login to your account",
};

export default async function LoginPage() {
	await getMeUser({
		validUserRedirect: `/posts?message=${encodeURIComponent(
			"You are already logged in.",
		)}`,
	});

	return (
		<>
			<div className="flex flex-col space-y-2 text-center">
				<Icons.Logo className="mx-auto h-6 w-6" />
				<h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
				<p className="text-sm text-muted-foreground">
					Enter your email to sign in to your account
				</p>
			</div>
			<Suspense>
				<LoginForm />
			</Suspense>
			<p className="px-8 text-center text-sm text-muted-foreground">
				<Link
					href="/forgot-password"
					className="hover:text-brand underline underline-offset-4"
				>
					Forgot password?
				</Link>
			</p>
		</>
	);
}
