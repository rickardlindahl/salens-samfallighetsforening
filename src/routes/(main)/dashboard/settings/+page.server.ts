import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, "/");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", session.user.id)
    .single();

  return { session, profile };
};

export const actions: Actions = {
  update: async ({ request, locals: { supabase, getSession } }) => {
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string;
    const avatarUrl = formData.get("avatarUrl") as string;

    const session = await getSession();

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        avatar_url: avatarUrl || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session?.user.id ?? "");

    if (error) {
      return fail(500, {
        fullName,
        avatarUrl,
      });
    }

    return {
      fullName,
      avatarUrl,
    };
  },
};
