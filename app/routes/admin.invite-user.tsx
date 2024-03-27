import { zodResolver } from "@hookform/resolvers/zod";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, json } from "@remix-run/react";
import { eq } from "drizzle-orm";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { z } from "zod";
import { db } from "~/db";
import { User, users } from "~/db/schema";
import { createTempPassword, hashString } from "~/lib/auth-utils.server";
import { sendInviteEmail } from "~/lib/email.server";
import { inviteUserSchema } from "~/lib/schemas";

type FormData = z.infer<typeof inviteUserSchema>;

const resolver = zodResolver(inviteUserSchema);

export default function InviteUser() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
    stringifyAllValues: false,
    defaultValues: {
      role: "user",
    },
  });

  return (
    <>
      <h1>Invite User</h1>

      <Form method="post" onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input type="email" {...register("email", { required: true })} className="text-black" />
          </label>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>
            Name:
            <input type="text" {...register("name", { required: true })} className="text-black" />
          </label>
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <fieldset>
          <legend>Role</legend>
          <div>
            <input type="radio" {...register("role")} value="admin" />
            <label htmlFor="admin">Admin</label>
          </div>
          <div>
            <input type="radio" {...register("role")} value="user" />
            <label htmlFor="user">User</label>
          </div>
        </fieldset>
        {errors.role && <p>{errors.role.message}</p>}

        <button>Invite User</button>
      </Form>
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const { errors, data, receivedValues: defaultValues } = await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    return json({ errors, defaultValues });
  }

  const { email, name, role } = data;

  const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existingUser) {
    return jsonWithError(
      null,
      { message: "User already exists", description: "Please use a different email address." },
      { status: 400 },
    );
  }

  const hashedPassword = await hashString(createTempPassword());

  await db.insert(users).values({
    email: email as string,
    name: name as string,
    role: role as User["role"],
    password: hashedPassword,
  });

  await sendInviteEmail(email as string);

  return jsonWithSuccess(null, { message: "User invited", description: "The user has been invited." }, { status: 201 });
}
