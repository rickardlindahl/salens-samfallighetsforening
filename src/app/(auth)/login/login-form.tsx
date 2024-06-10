"use client";

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import { Icons } from "@/components/icons";
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
import { loginAction } from "./actions";
import { type LoginFormData, loginFormSchema } from "./schema";

export const LoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = useCallback(async (data: LoginFormData) => {
    const response = await loginAction(data);

    if (response?.isError) {
      toast.error(
        response?.isInvalidLoginError
          ? "Invalid email or password"
          : "Something went wrong. Please try again.",
      );
    } else {
      toast.success("Successfully logged in!");
    }
  }, []);

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
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Sign In
        </Button>
      </form>
    </Form>
  );
};
