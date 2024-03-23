import { Form, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { ActionFunctionArgs } from "@vercel/remix";
import { eq } from "drizzle-orm";
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { z } from "zod";
import { db } from "~/db";
import { passwordResetTokens, users } from "~/db/schema";
import { hashString } from "~/lib/password";

export default function AuthResetPasswordToken() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post">
      <label>
        New Password:
        <input type="password" name="password" required className="text-black" />
      </label>
      <button>Update Password</button>
      {actionData?.status === "error" && (
        <div role="alert" className="text-red-500">
          Invalid password/token or token does not exist
        </div>
      )}
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

const resetPasswordTokenSchema = z.object({
  password: z.string().min(1),
});

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const parseResult = resetPasswordTokenSchema.safeParse(Object.fromEntries(formData));
  if (!parseResult.success) {
    return json(
      {
        status: "error" as const,
      },
      { status: 400 },
    );
  }

  const { password } = parseResult.data;

  const verificationToken = params.token as string;
  const tokenHash = await hashString(verificationToken);

  const [token] = await db.select().from(passwordResetTokens).where(eq(passwordResetTokens.token, tokenHash)).limit(1);
  if (token) {
    await db.delete(passwordResetTokens).where(eq(passwordResetTokens.token, tokenHash));
  }

  if (!token || !isWithinExpirationDate(token.expiresAt)) {
    return json(
      {
        status: "error" as const,
      },
      { status: 400 },
    );
  }

  const hashedPassword = await hashString(password);
  await db.update(users).set({ password: hashedPassword }).where(eq(users.id, token.userId));

  return redirect("/login");
}
