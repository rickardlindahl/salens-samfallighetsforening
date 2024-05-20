"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import * as Icons from "@/components/icons";
import { PasswordField } from "@/components/password-field";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { db } from "@/lib/db";
import { passwordResetTokens } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const resetPasswordFormSchema = z.object({
  password: z.string().min(1),
  token: z.string().min(1),
});
type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;

async function createPasswordResetToken(userId: string): Promise<string> {
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.userId, userId));

  const tokenId = generateRandomString(40);
  const tokenHash = await hashString(tokenId);

  await db.insert(passwordResetTokens).values({
    token: tokenHash,
    userId,
    expiresAt: createDate(new TimeSpan(2, "h")),
  });

  return tokenId;
}

async function resetPasswordAction(data: ResetPasswordFormData) {
  "use server";

  await resetPassword({});
}

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const onSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      await resetPasswordAction(data);

      if (response.ok) {
        const json = await response.json();

        // Automatically log the user in after they successfully reset password
        await login({ email: json.user.email, password: data.password });

        // Redirect them to `/account` with success message in URL
        router.push("/account?success=Password reset successfully.");
      } else {
        toast.error(
          "There was a problem while resetting your password. Please try again later.",
        );
      }
    },
    [router],
  );

  // when Next.js populates token within router,
  // reset form with new token value
  useEffect(() => {
    form.reset({ token: token || undefined });
  }, [form.reset, token]);

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
            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Reset Password
        </Button>
      </form>
    </Form>
  );
}
