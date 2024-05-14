"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import * as Icons from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/providers/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { PasswordField } from "@/components/password-field";

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

	const form = useForm<ResetPasswordFormData>({
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
		form.reset({ token: token || undefined });
	}, [form.reset, token]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<PasswordField id="new-password" autoComplete="new-password" />
				<FormField
					control={form.control}
					name="token"
					render={({ field }) => (
						<FormControl>
							<Input type="hidden" {...field} />
						</FormControl>
					)}
				/>
				<Button type="submit" disabled={form.formState.isLoading}>
					{form.formState.isLoading && (
						<Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
					)}
					Reset Password
				</Button>
			</form>
		</Form>
	);
}
