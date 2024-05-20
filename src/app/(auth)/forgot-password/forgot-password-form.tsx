"use client";

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
import { generateRandomString, hashString } from "@/lib/auth-utils.server";
import { db } from "@/lib/db";
import { passwordResetTokens, users } from "@/lib/db/schema";
import { sendPasswordResetTokenEmail } from "@/lib/email.server";
import { zodResolver } from "@hookform/resolvers/zod";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { TimeSpan, createDate } from "oslo";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const forgotPasswordFormSchema = z.object({
  email: z.string().email().min(1),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>;

async function forgotPasswordAction(data: ForgotPasswordFormData) {
  "use server";

  const { email } = data;

  const [user] = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    // Don't reveal whether the email exists
    return redirect("/forgot-password/success");
  }

  const verificationToken = await createPasswordResetToken(user.id);
  const verificationLink = `http://localhost:3000/auth/reset-password/${verificationToken}`;

  await sendPasswordResetTokenEmail(email, verificationLink);

  return redirect(
    `/forgot-password/success?message=${encodeURIComponent(
      `Reset password email sent to ${email}`,
    )}`,
  );
}

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  const onSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    await forgotPasswordAction(data);
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
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting && (
            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
}
