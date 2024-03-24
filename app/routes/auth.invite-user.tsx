import { zodResolver } from "@hookform/resolvers/zod";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json } from "@remix-run/react";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { z } from "zod";
import { db } from "~/db";
import { User, users } from "~/db/schema";
import { hashString, createTempPassword } from "~/lib/auth-utils.server";
import { authenticator } from "~/lib/auth.server";
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
            <input type="radio" {...register("role")} value="user" defaultChecked />
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

  const hashedPassword = await hashString(createTempPassword());

  await db.insert(users).values({
    email: email as string,
    name: name as string,
    role: role as User["role"],
    password: hashedPassword,
  });

  await sendInviteEmail(email as string);

  return new Response(null, { status: 201 });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (!user || user.role !== "admin") {
    return new Response(null, { status: 401 });
  }

  return new Response(null, { status: 200 });
}
