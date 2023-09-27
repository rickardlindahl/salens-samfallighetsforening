import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url, parent, locals: { supabase } }) => {
  const { session, profile } = await parent();

  if (!session) {
    throw redirect(303, "/auth/login");
  }

  if (profile?.role !== "admin") {
    const newURL = new URL("/dashboard", url.origin);

    newURL.searchParams.append(
      "message",
      "Du måste vara administratör för att komma åt denna sida.",
    );
    throw redirect(302, newURL);
  }

  const { data: profiles, error: profilesSelectError } = await supabase.from("profiles").select();

  if (profilesSelectError) {
    throw error(500, { status: 500, message: "Internal Server Error" });
  }

  return {
    profiles,
  };
};
