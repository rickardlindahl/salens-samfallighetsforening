import { SUPABASE_SERVICE_ROLE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import { handleLoginRedirect } from "$lib/utils";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    event,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl: PUBLIC_SUPABASE_URL,
  });

  event.locals.supabaseAdmin = createSupabaseServerClient({
    event,
    supabaseKey: SUPABASE_SERVICE_ROLE_KEY,
    supabaseUrl: PUBLIC_SUPABASE_URL,
  });

  /**
   * A convenience helper so we can just call await getSession() instead const { data: { session } } = await supabase.auth.getSession()
   */
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();
    return session;
  };

  const session = await event.locals.getSession();
  const protectedRoutes = ["/posts", "/documents", "/households", "/dashboard", "/admin"];

  const url = new URL(event.request.url);

  if (!session && protectedRoutes.some((path) => url.pathname.startsWith(path))) {
    return Response.redirect(handleLoginRedirect(event), 302);
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range";
    },
  });
};
