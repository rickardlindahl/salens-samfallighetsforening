"use client";

import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/lib/providers/Auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as Icons from "@/components/icons";
import { toast } from "sonner";

export const loginFormSchema = z.object({
	email: z.string().email().min(1),
	password: z.string().min(1),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const redirect = useRef(searchParams.get("redirect"));
	const { login } = useAuth();
	const router = useRouter();

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
				else router.push("/posts");
			} catch (err) {
				toast.error(
					"There was an error with the credentials provided. Please try again.",
				);
			}
		},
		[login, router],
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

						<Label className="sr-only" htmlFor="password">
							Password
						</Label>
						<Input
							id="password"
							placeholder="********"
							type="password"
							autoComplete="current-password"
							disabled={isLoading}
							{...register("password")}
						/>
						{errors?.password && (
							<p className="px-1 text-xs text-red-600">
								{errors.password.message}
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
				</div>
			</form>
		</div>
	);
};
