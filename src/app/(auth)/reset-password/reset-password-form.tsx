"use client";

import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { type ResetPasswordFormData, resetPasswordFormSchema } from "./schema";
import { resetPasswordAction } from "./actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const onSubmit = useCallback(async (data: ResetPasswordFormData) => {
    const response = await resetPasswordAction(data);

    if (response?.isError) {
      toast.error(
        "There was a problem resetting your password. Please try again later.",
      );
    }
  }, []);

  if (state === "success") {
    return (
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Password request submitted</AlertDialogTitle>
            <AlertDialogDescription>
              Check your email for instructions on how to create your new
              password.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Link href="/">Return to home</Link>
            </AlertDialogCancel>
            <AlertDialogAction>
              <Link href="/login">Login</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

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
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting && (
            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Reset Password
        </Button>
      </form>
    </Form>
  );
}
