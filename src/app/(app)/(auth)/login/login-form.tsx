"use client";

import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/lib/providers/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { PasswordField } from "@/components/password-field";
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

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        await login(data);
        if (redirect?.current) router.push(redirect.current as string);
        else router.push("/overview");
      } catch (err) {
        console.error(err);
        toast.error("Något gick fel. Var god försök igen.");
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
              <FormLabel>E-post</FormLabel>
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
          Logga in
        </Button>
      </form>
    </Form>
  );
};
