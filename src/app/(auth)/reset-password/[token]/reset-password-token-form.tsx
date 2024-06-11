"use client";

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  type ResetPasswordTokenFormData,
  resetPasswordTokenFormSchema,
} from "./schema";
import { resetPasswordTokenAction } from "./actions";
import { PasswordField } from "@/components/password-field";
import { Icons } from "@/components/icons";

export function ResetPasswordTokenForm({ token }: { token: string }) {
  console.log("ResetPasswordTokenForm", token);
  const form = useForm<ResetPasswordTokenFormData>({
    resolver: zodResolver(resetPasswordTokenFormSchema),
    defaultValues: {
      token,
      password: "",
    },
  });

  const onSubmit = useCallback(async (data: ResetPasswordTokenFormData) => {
    const response = await resetPasswordTokenAction(data);

    if (response?.isError) {
      if (response.isInvalidToken) {
        toast.error("Felaktig kod", {
          description:
            "Koden för att återställa lösenordet är felaktig eller har slutat gälla. Var god återställ ditt lösenord igen.",
        });
      } else {
        toast.error(
          "Något gick fel när lösenordet skulle återställas. Var god försök igen senare.",
        );
      }
    } else {
      toast.success("Lösenord uppdaterat", {
        description: "Du kan nu logga in med ditt nya lösenord.",
      });
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <PasswordField id="new-password" autoComplete="new-password" />
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormControl>
              <Input type="hidden" {...field} />
            </FormControl>
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
          Uppdatera lösenord
        </Button>
      </form>
    </Form>
  );
}
