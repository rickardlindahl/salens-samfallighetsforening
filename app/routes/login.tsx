import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json } from "@remix-run/react";
import { useRemixForm } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodError, z } from "zod";
import { AuthorizationError } from "remix-auth";
import { authenticator } from "~/lib/auth.server";
import { loginSchema } from "~/lib/schemas";
import { jsonWithError, redirectWithSuccess } from "remix-toast";
import { commitSession, getSession } from "~/lib/session.server";

type FormData = z.infer<typeof loginSchema>;

const resolver = zodResolver(loginSchema);

export default function Login() {
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
        Email:
        <input type="email" {...register("email", { required: true })} className="text-black" />
        {errors.email && <p>{errors.email.message}</p>}
      </label>
      <label>
        Password:
        <input
          type="password"
          {...register("password", { required: true })}
          autoComplete="current-password"
          className="text-black"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </label>
      <button>Sign In</button>
      {errors.root && <p>{errors.root.message}</p>}
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const user = await authenticator.authenticate("user-pass", request, {
      throwOnError: true,
    });

    // manually get the session
    const session = await getSession(request.headers.get("cookie"));
    // and store the user data
    session.set(authenticator.sessionKey, user);
    // commit the session
    const headers = new Headers({ "Set-Cookie": await commitSession(session) });

    return redirectWithSuccess(
      "/edgestream",
      {
        message: "Login successful",
        description: `Welcome back, ${user.name}!`,
      },
      { headers },
    );
  } catch (error) {
    // Because redirects work by throwing a Response, you need to check if the
    // caught error is a response and return it or throw it again
    if (error instanceof Response) return error;
    if (error instanceof AuthorizationError) {
      // here the error is related to the authentication process
      return jsonWithError(
        { errors: { root: { message: "Invalid email or password" } } },
        { message: "Login failed", description: "Please check your credentials and try again." },
        { status: 400 },
      );
    }
    if (error instanceof ZodError) {
      // here the error is related to the form validation
      return json(
        { errors: error.formErrors.fieldErrors },
        {
          status: 400,
        },
      );
    }
    // here the error is a generic error that another reason may throw
    return error;
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/edgestream",
  });
}
