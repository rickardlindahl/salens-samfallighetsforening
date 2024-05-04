"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/lib/providers/Auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPassword } from "@/lib/providers/Auth/types";

const resetPasswordFormSchema = z.object({
	password: z.string().min(1),
	token: z.string().min(1),
});
type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;

export function ResetPasswordForm() {
	const [error, setError] = useState("");
	const { login } = useAuth();
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const {
		register,
		handleSubmit,
		formState: { errors },
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
				setError(
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
		<form onSubmit={handleSubmit(onSubmit)}>
			<label>
				New Password
				<input {...register("password", { required: true })} type="password" />
			</label>
			{errors.password && <p>{errors.password.message}</p>}
			<input type="hidden" {...register("token")} />
			<button type="submit">Reset Password</button>
			{error && <p>{error}</p>}
		</form>
	);
}
