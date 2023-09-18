import { error, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, "/auth/login");
  }

  const { data: posts, error: selectError } = await supabase
    .from("posts")
    .select()
    .order("publish_date", { ascending: false })
    .order("updated_at", { ascending: false })
    .eq("user_id", session?.user.id);

  if (selectError) {
    throw error(500, selectError);
  }

  return {
    posts,
  };
};

export const actions: Actions = {
  createPost: async ({ locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
      throw redirect(303, "/auth/login");
    }

    const { data: post, error: insertError } = await supabase
      .from("posts")
      .insert({
        title: "",
        user_id: session.user.id,
        profile_id: session.user.id,
        draft: true,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      throw error(500, "Något gick fel. Var god försök igen senare");
    }

    throw redirect(303, `/editor/${post.id}`);
  },
};
