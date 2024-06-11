"use client";

import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import { Icons } from "@/components/icons";
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
import Link from "next/link";
import { toast } from "sonner";
import { resetPasswordAction } from "./actions";
import { type ResetPasswordFormData, resetPasswordFormSchema } from "./schema";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback(async (data: ResetPasswordFormData) => {
    const response = await resetPasswordAction(data);

    if (response?.isError) {
      toast.error(
        "Något gick fel när ditt lösenord skulle återställas. Var god försök igen senare.",
      );
    }
  }, []);

  if (state === "success") {
    return (
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Lösenord återställt</AlertDialogTitle>
            <AlertDialogDescription>
              Se din epost för instruktioner hur du kan uppdatera ditt lösenord.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Link href="/reset-password">Återställ ett annat lösenord</Link>
            </AlertDialogCancel>
            <AlertDialogAction>
              <Link href="/">Hem</Link>
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
              <FormLabel>Epost</FormLabel>
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
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Återställ lösenord
        </Button>
      </form>
    </Form>
  );
}
