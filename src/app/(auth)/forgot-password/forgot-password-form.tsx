"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const forgotPasswordFormSchema = z.object({
	email: z.string().email().min(1),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

export function ForgotPasswordForm() {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordFormSchema),
	});

	const onSubmit = useCallback(async (data: ForgotPasswordFormData) => {
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
			setSuccess(true);
			setError("");
		} else {
			setError(
				"There was a problem while attempting to send you a password reset email. Please try again.",
			);
		}
	}, []);

	return (
		<>
			{!success && (
				<>
					<h1>Forgot Password</h1>
					<div>
						<p>
							{`Please enter your email below. You will receive an email message with instructions on
              how to reset your password. To manage your all users, `}
							<Link
								href={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/admin/collections/users`}
							>
								login to the admin dashboard
							</Link>
							{"."}
						</p>
						<form onSubmit={handleSubmit(onSubmit)}>
							<label>
								Email Address
								<input
									{...register("email", { required: true })}
									type="email"
								/>
							</label>
							{errors.email && <p>{errors.email.message}</p>}
							<button type="submit">Forgot Password</button>
						</form>
					</div>
				</>
			)}
			{success && (
				<>
					<h1>Request submitted</h1>
					<p>
						Check your email for a link that will allow you to securely reset
						your password.
					</p>
				</>
			)}
			{error && <p>{error}</p>}
		</>
	);
}
