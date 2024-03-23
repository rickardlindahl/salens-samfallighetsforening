import { Form, useActionData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { ActionFunctionArgs } from "@vercel/remix";
import { eq } from "drizzle-orm";
import { TimeSpan, createDate } from "oslo";
import { z } from "zod";
import { db } from "~/db";
import { passwordResetTokens, users } from "~/db/schema";
import { hashString } from "~/lib/password";

export default function AuthResetPassword() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post">
      <label>
        Email:
        <input type="email" name="email" required className="text-black" />
      </label>
      <button>Reset Password</button>
      {actionData?.status === "error" && (
        <div role="alert" className="text-red-500">
          Invalid email or user does not exist
        </div>
      )}
      {actionData?.status === "success" && <div>Reset password email sent</div>}
    </Form>
  );
}

function generateRandomString(length: number) {
  const randomBytes = new Uint8Array(length);
  crypto.getRandomValues(randomBytes);

  return Array.from(randomBytes)
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, length);
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

const resetPasswordSchema = z.object({
  email: z.string().email(),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const parseResult = resetPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!parseResult.success) {
    return json(
      {
        status: "error" as const,
      },
      { status: 400 },
    );
  }

  const { email } = parseResult.data;

  const [user] = await db
    .select({ id: users.id, email: users.email })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    return json(
      {
        status: "error" as const,
      },
      { status: 400 },
    );
  }

  const verificationToken = await createPasswordResetToken(user.id);
  const verificationLink = `http://localhost:3000/reset-password/${verificationToken}`;

  await sendPasswordResetToken(email, verificationLink);

  return json(
    {
      status: "success" as const,
    },
    { status: 200 },
  );
}

async function sendPasswordResetToken(email: string, verificationLink: string) {
  console.log("Sending email to", email, "with link", verificationLink);
}
