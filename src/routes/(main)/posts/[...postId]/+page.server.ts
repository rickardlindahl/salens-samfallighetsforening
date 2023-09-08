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

  const { profiles, ...rest } = post;

  return {
    post: {
      ...rest,
      profile: Array.isArray(profiles) ? profiles[0] : profiles,
    },
  };
};
