import { error, type Actions, redirect, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { deletePostSchema } from "$lib/schema";

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
  deletePost: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
      throw redirect(303, "/auth/login");
    }

    const formData = await request.formData();
    const postId = formData.get("postId");

    const result = deletePostSchema.safeParse({ postId });

    if (!result.success) {
      return fail(400, { success: false, message: "Inlägget saknar id" });
    }

    const { error: postgrestError } = await supabase
      .from("posts")
      .delete()
      .eq("id", result.data.postId);

    if (postgrestError) {
      throw error(500, "Kunde ej ta bort inlägget. Var god försök igen senare.");
    }

    return {
      success: true,
      message: "Inlägget har blivit borttaget",
    };
  },
};
