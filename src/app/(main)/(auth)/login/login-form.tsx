"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "@/lib/providers/Auth";

import * as Icons from "@/components/icons";
import { PasswordField } from "@/components/password-field";
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
import { toast } from "sonner";
import { z } from "zod";

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

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "user@salen.com",
      password: "password",
    },
  });

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        const user = await login(data);
        console.log("Login successful", user);
        router.refresh();
        if (redirect?.current) router.push(redirect.current as string);
        else router.push("/posts");
      } catch (err) {
        console.error("error logging in", err);

        toast.error(
          "There was an error with the credentials provided. Please try again.",
        );
      }
    },
    [login, router],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PasswordField autoComplete="current-password" id="current-password" />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting && (
            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign In
        </Button>
      </form>
    </Form>
  );
};
