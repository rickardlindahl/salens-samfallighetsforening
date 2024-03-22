import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { z } from "zod";
import { db } from "~/db";
import { User, users } from "~/db/schema";
import { authenticator } from "~/lib/auth.server";
import { hashString, createTempPassword } from "~/lib/password";

export default function InviteUser() {
  return (
    <>
      <h1>Invite User</h1>

      <Form method="post">
        <div>
          <label>
            Email:
            <input type="email" name="email" required className="text-black" />
          </label>
        </div>
        <div>
          <label>
            Name:
            <input type="text" name="name" required className="text-black" />
          </label>
        </div>
        <fieldset>
          <legend>Role</legend>
          <div>
            <input type="radio" id="admin" name="role" value="admin" />
            <label htmlFor="admin">Admin</label>
          </div>
          <div>
            <input type="radio" id="user" name="role" value="user" defaultChecked />
            <label htmlFor="user">User</label>
          </div>
        </fieldset>

        <button>Invite User</button>
      </Form>
    </>
  );
}

const inviteUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["admin", "user"]),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const { email, name, role } = inviteUserSchema.parse(Object.fromEntries(formData));

  const hashedPassword = await hashString(createTempPassword());

  await db.insert(users).values({
    email: email as string,
    name: name as string,
    role: role as User["role"],
    password: hashedPassword,
  });

  return new Response(null, { status: 201 });

  // send email invite using mailgun rest api
  // await mailgun.sendInvite(email as string);
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
}
