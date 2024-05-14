"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const forgotPasswordFormSchema = z.object({
	email: z.string().email().min(1),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

export function ForgotPasswordForm() {
	const router = useRouter();

	const form = useForm<ForgotPasswordFormData>({
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
			} else {
				toast.error(
					"There was a problem while attempting to send you a password reset email. Please try again.",
				);
			}
		},
		[router],
	);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="name@example.com"
									type="email"
									autoCapitalize="none"
									autoComplete="email"
									autoCorrect="off"
									disabled={form.formState.isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={form.formState.isLoading}>
					{form.formState.isLoading && (
						<Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
					)}
					Submit
				</Button>
			</form>
		</Form>
	);
}
