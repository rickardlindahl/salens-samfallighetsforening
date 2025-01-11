"use client";

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { Icons } from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
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
import { z } from "zod";

const forgotPasswordFormSchema = z.object({
  email: z.string().email().min(1),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

export function ForgotPasswordForm() {
  const [success, setSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
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
    } else {
      toast.error(
        "Det uppstod ett problem när vi försökte skicka ett e-postmeddelande för att återställa ditt lösenord. Vänligen försök igen.",
      );
    }
  }, []);

  if (success) {
    return (
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Återställning av lösenord</AlertDialogTitle>
            <AlertDialogDescription>
              Kontrollera din e-post för en länk som gör att du säkert kan
              återställa ditt lösenord.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
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
