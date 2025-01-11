"use client";

import { Icons } from "@/components/icons";
import { PasswordField } from "@/components/password-field";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordFormSchema = z.object({
  password: z.string().min(1),
  token: z.string().min(1),
});
type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { login } = useAuth();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      token: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/reset-password`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        const json = await response.json();

        // Automatically log the user in after they successfully reset password
        await login({ email: json.user.email, password: data.password });

        router.push("/overview");
      } else {
        toast.error(
          "Något gick fel när vi försökte återställa ditt lösenord. Länken har troligtvis slutat gälla. Vänligen begär en ny återställning av ditt lösenord.",
        );
      }
    },
    [router, login],
  );

  // when Next.js populates token within router,
  // reset form with new token value
  useEffect(() => {
    form.reset({ token: token || undefined });
  }, [form.reset, token]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, ({ token }) => {
          if (token) {
            toast.error(
              "Länken är ogiltig. Vänligen begär en ny återställning av lösenordet.",
            );
          }
        })}
        className="space-y-4"
      >
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
          Återställ lösenord
        </Button>
      </form>
    </Form>
  );
}
