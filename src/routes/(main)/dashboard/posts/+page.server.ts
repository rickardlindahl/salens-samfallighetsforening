import { error as svelteKitError, fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, "/auth/login");
  }

  const { data: posts, error } = await supabase
    .from("posts")
    .select()
    .order("publish_date", { ascending: false })
    .eq("user_id", session?.user.id);

  if (error) {
    console.log("Error!!", error);
    throw svelteKitError(500, error);
  }

  console.log(posts);

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

    const { data: post, error } = await supabase
      .from("posts")
      .insert({
        title: "Ange en rubrik",
        user_id: session.user.id,
        draft: true,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return fail(400, {
        title: "Something went wrong.",
        description: "Your post was not created. Please try again.",
        variant: "destructive",
      });
    }

    throw redirect(303, `/editor/${post.id}`);
  },
};
