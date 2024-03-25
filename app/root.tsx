import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, json, useLoaderData } from "@remix-run/react";
import { Toaster, type toast as Toast } from "sonner";

import styles from "./tailwind.css?url";
import globalStyles from "./styles/globals.css?url";
import { getToast } from "remix-toast";
import { useEffect } from "react";
import { toast as notify } from "sonner";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: globalStyles },
];

//export const config = { runtime: "edge" };

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
      notify[toast.type](toast.message);
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
        <Toaster />
      </body>
    </html>
  );
}
