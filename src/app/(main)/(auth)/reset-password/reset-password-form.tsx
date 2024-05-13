"use client";

import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/lib/providers/Auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as Icons from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const resetPasswordFormSchema = z.object({
	password: z.string().min(1),
	token: z.string().min(1),
});
type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;

export function ResetPasswordForm() {
	const { login } = useAuth();
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const {
		register,
		handleSubmit,
		formState: { errors, isLoading },
		reset,
	} = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordFormSchema),
	});

	const onSubmit = useCallback(
		async (data: ResetPasswordFormData) => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/reset-password`,
				{
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (response.ok) {
				const json = await response.json();

				// Automatically log the user in after they successfully reset password
				await login({ email: json.user.email, password: data.password });

				// Redirect them to `/account` with success message in URL
				router.push("/account?success=Password reset successfully.");
			} else {
				toast.error(
					"There was a problem while resetting your password. Please try again later.",
				);
			}
		},
		[router, login],
	);

	// when Next.js populates token within router,
	// reset form with new token value
	useEffect(() => {
		reset({ token: token || undefined });
	}, [reset, token]);

	return (
		<div className="grid gap-6">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label htmlFor="password">New Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="********"
							autoCorrect="off"
							disabled={isLoading}
							{...register("password")}
						/>
						{errors?.password && (
							<p className="px-1 text-xs text-red-600">
								{errors.password.message}
							</p>
						)}
						<input type="hidden" {...register("token")} />
					</div>
					<button
						type="submit"
						className={cn(buttonVariants())}
						disabled={isLoading}
					>
						{isLoading && (
							<Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Reset Password
					</button>
				</div>
			</form>
		</div>
	);
}
