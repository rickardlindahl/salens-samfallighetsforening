import { fail, type Actions, redirect } from "@sveltejs/kit";

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
      })
      .select()
      .single();

    console.log({ post, error });

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
