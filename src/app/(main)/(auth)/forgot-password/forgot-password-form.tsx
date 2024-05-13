"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import * as Icons from "@/components/icons";

const forgotPasswordFormSchema = z.object({
	email: z.string().email().min(1),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

export function ForgotPasswordForm() {
	const [error, setError] = useState("");
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isLoading },
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordFormSchema),
	});

	const onSubmit = useCallback(
		async (data: ForgotPasswordFormData) => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/forgot-password`,
				{
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (response.ok) {
				router.push("/forgot-password/success");
				setError("");
			} else {
				setError(
					"There was a problem while attempting to send you a password reset email. Please try again.",
				);
			}
		},
		[router],
	);

	return (
		<div className="grid gap-6">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
							{...register("email")}
						/>
						{errors?.email && (
							<p className="px-1 text-xs text-red-600">
								{errors.email.message}
							</p>
						)}
					</div>
					<button
						type="submit"
						className={cn(buttonVariants())}
						disabled={isLoading}
					>
						{isLoading && (
							<Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Sign In
					</button>
					{error && <p className="px-1 text-xs text-red-600">{error}</p>}
				</div>
			</form>
		</div>
	);
}
