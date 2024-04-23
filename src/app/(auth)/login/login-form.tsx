"use client";

import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/lib/providers/Auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email().min(1),
	password: z.string().min(1),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const allParams = searchParams.toString()
		? `?${searchParams.toString()}`
		: "";
	const redirect = useRef(searchParams.get("redirect"));
	const { login } = useAuth();
	const router = useRouter();
	const [error, setError] = React.useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isLoading },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "user@salen.com",
			password: "password",
		},
	});

	const onSubmit = useCallback(
		async (data: LoginFormData) => {
			try {
				await login(data);
				if (redirect?.current) router.push(redirect.current as string);
				else router.push("/account");
			} catch (err) {
				console.error(err);

				setError(
					"There was an error with the credentials provided. Please try again.",
				);
			}
		},
		[login, router],
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<p>
				{"To log in, use the email "}
				<b>user@salen.com</b>
				{" with the password "}
				<b>password</b>
				{". To manage your users, "}
				<Link
					href={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/admin/collections/users`}
				>
					login to the admin dashboard
				</Link>
				.
			</p>
			<label>
				Email
				<input {...register("email", { required: true })} type="email" />
				{errors.email && <p>{errors.email.message}</p>}
			</label>
			<label>
				Password
				<input {...register("password", { required: true })} type="password" />
			</label>
			{errors.password && <p>{errors.password.message}</p>}
			<button type="submit" disabled={isLoading}>
				{isLoading ? "Processing" : "Login"}
			</button>
			{error && <p>{error}</p>}
			<div>
				<Link href={`/create-account${allParams}`}>Create an account</Link>
				<br />
				<Link href={`/recover-password${allParams}`}>
					Recover your password
				</Link>
			</div>
		</form>
	);
};
