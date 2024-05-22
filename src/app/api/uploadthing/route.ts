import { ourFileRouter } from "@/lib/uploadthing.server";
import { createRouteHandler } from "uploadthing/next";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});
