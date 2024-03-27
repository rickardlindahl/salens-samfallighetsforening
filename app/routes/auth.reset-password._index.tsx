import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useSearchParams } from "@remix-run/react";
import { ActionFunctionArgs, json } from "@vercel/remix";
import { eq } from "drizzle-orm";
import { TimeSpan, createDate } from "oslo";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { redirectWithSuccess } from "remix-toast";
import { z } from "zod";
import { db } from "~/db";
import { passwordResetTokens, users } from "~/db/schema";
import { generateRandomString, hashString } from "~/lib/auth-utils.server";
import { sendPasswordResetTokenEmail } from "~/lib/email.server";
import { resetPasswordSchema } from "~/lib/schemas";

type FormData = z.infer<typeof resetPasswordSchema>;

const resolver = zodResolver(resetPasswordSchema);

export default function AuthResetPassword() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
    stringifyAllValues: false,
  });

  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  if (state === "success") {
    return (
      <>
        <div role="alert" className="text-green-500">
          Password reset successful
        </div>
        <div>Check your email for instructions on how to create your new password.</div>
        <a href="/">Return to home</a>
      </>
    );
  }

  return (
    <Form method="post" onSubmit={handleSubmit} action="/auth/reset-password">
      <label>
        Email:
        <input type="email" {...register("email", { required: true })} className="text-black" />
      </label>
      {errors.email && <p>{errors.email.message}</p>}
      <button>Reset Password</button>
      {errors.root && <p>{errors.root.message}</p>}
    </Form>
  );
}

async function createPasswordResetToken(userId: number): Promise<string> {
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, userId));

  const tokenId = generateRandomString(40);
  const tokenHash = await hashString(tokenId);

  await db.insert(passwordResetTokens).values({
    token: tokenHash,
    userId,
    expiresAt: createDate(new TimeSpan(2, "h")),
  });

  return tokenId;
}

export async function action({ request }: ActionFunctionArgs) {
  const { errors, data, receivedValues: defaultValues } = await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    return json({ errors, defaultValues }, { status: 400 });
  }

  const { email } = data;

  const [user] = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    // Don't reveal whether the email exists
    return redirectWithSuccess("/auth/reset-password?state=success", `Reset password email sent to ${email}`);
  }

  const verificationToken = await createPasswordResetToken(user.id);
  const verificationLink = `http://localhost:3000/auth/reset-password/${verificationToken}`;

  await sendPasswordResetTokenEmail(email, verificationLink);

  return redirectWithSuccess("/auth/reset-password?state=success", `Reset password email sent to ${email}`);
}
