import { ActionFunctionArgs, LoaderFunctionArgs } from "@vercel/remix";
import { createRouteHandler } from "uploadthing/server";
import { env } from "~/env";
import { ourFileRouter } from "~/lib/uploadthing.server";

const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingId: env.UPLOADTHING_APP_ID,
    uploadthingSecret: env.UPLOADTHING_SECRET,
  },
});

export async function loader({ request }: LoaderFunctionArgs) {
  if (request.method !== "GET") {
    return new Response(null, { status: 405 });
  }

  return GET(request);
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return new Response(null, { status: 405 });
  }

  return POST(request);
}
