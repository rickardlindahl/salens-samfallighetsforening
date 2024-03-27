import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, json, useLoaderData } from "@remix-run/react";
import { Toaster } from "sonner";

import { useEffect } from "react";
import { getToast } from "remix-toast";
import { toast as notify } from "sonner";
import globalStyles from "./styles/globals.css?url";
import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: globalStyles },
];

export const config = { runtime: "edge" };

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { toast, headers: toastHeaders } = await getToast(request);

  return json(
    {
      toast,
    },
    {
      headers: toastHeaders,
    },
  );
};

export default function App() {
  const { toast } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (toast) {
      const { type, message, ...rest } = toast;
      notify[toast.type](toast.message, { ...rest });
    }
  }, [toast]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <Toaster richColors />
      </body>
    </html>
  );
}
