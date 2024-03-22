import { ActionFunctionArgs } from "@vercel/remix";
import { authenticator } from "~/lib/auth.server";

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.logout(request, { redirectTo: "/login" });
}
