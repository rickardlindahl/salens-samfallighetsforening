import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
  const { data: post, error: postsError } = await supabase
    .from("posts")
    .select(`*, profiles(full_name, email)`)
    .eq("id", params.postId)
    .single();

  if (postsError) {
    if (postsError.code === "PGRST116") {
      throw error(404, {
        status: 404,
        message: "Inlägget finns ej.",
      });
    } else {
      throw error(500, { status: 500, message: "Ett oväntat fel har uppstått." });
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
