import { Form } from "@remix-run/react";
import { json } from "@remix-run/node";
import { ActionFunctionArgs } from "@vercel/remix";
import { eq } from "drizzle-orm";
import { isWithinExpirationDate } from "oslo";
import { z } from "zod";
import { db } from "~/db";
import { passwordResetTokens, users } from "~/db/schema";
import { hashString } from "~/lib/auth-utils.server";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordTokenSchema } from "~/lib/schemas";
import { redirectWithError, redirectWithSuccess } from "remix-toast";

type FormData = z.infer<typeof resetPasswordTokenSchema>;

const resolver = zodResolver(resetPasswordTokenSchema);

export default function AuthResetPasswordToken() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
    stringifyAllValues: false,
  });

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <label>
        New Password:
        <input type="password" {...register("password", { required: true })} className="text-black" />
        {errors.password && <p>{errors.password.message}</p>}
      </label>
      <button>Update Password</button>
      {errors.root && <p>{errors.root.message}</p>}
    </Form>
  );
}

export async function loader() {
  return new Response(null, {
    status: 200,
    headers: {
      "Referrer-Policy": "no-referrer",
    },
  });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const { errors, data, receivedValues: defaultValues } = await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    return json({ errors, defaultValues }, { status: 400 });
  }

  const verificationToken = params.token as string;
  const tokenHash = await hashString(verificationToken);

  const [token] = await db.select().from(passwordResetTokens).where(eq(passwordResetTokens.token, tokenHash)).limit(1);
  if (token) {
    await db.delete(passwordResetTokens).where(eq(passwordResetTokens.token, tokenHash));
  }

  if (!token || !isWithinExpirationDate(token.expiresAt)) {
    return redirectWithError("/auth/reset-password", {
      message: "Invalid token",
      description: "The token is invalid or has expired. Please reset your password again.",
    });
  }

  const hashedPassword = await hashString(data.password);
  await db.update(users).set({ password: hashedPassword }).where(eq(users.id, token.userId));

  return redirectWithSuccess("/login", {
    message: "Password updated",
    description: "You can now log in with your new password.",
  });
}
