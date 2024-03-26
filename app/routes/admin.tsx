import { Outlet, json } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { redirectWithError } from "remix-toast";
import { authenticator } from "~/lib/auth.server";

export default function AdminLayout() {
  return (
    <>
      <h1>Admin</h1>

      <div>TODO: Navigation</div>
      <Outlet />
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (!user || user.role !== "admin") {
    return redirectWithError("/", {
      message: "Unauthorized",
      description: "You must be an admin to access this page.",
    });
  }

  return json(null, { status: 200 });
}
