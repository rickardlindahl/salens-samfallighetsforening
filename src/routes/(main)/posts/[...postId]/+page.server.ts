import type { PageServerLoad } from "./$types";
import { error as sveltekitError } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
  const { data: post, error } = await supabase
    .from("posts")
    .select(`*, profiles(full_name, email)`)
    .eq("id", params.postId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw sveltekitError(404, "Not found");
    } else {
      throw sveltekitError(500, "Unexpected error");
    }
  }

  return {
    post: {
      ...post,
      profile: Array.isArray(post.profiles) ? post.profiles[0] : post.profiles,
    },
  };
};
