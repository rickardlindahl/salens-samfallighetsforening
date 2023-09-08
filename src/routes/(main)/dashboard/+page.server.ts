import type { PageServerLoad } from "./$types";
import { error as svelteKitError } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `*,
      profiles(full_name, email)
      `,
    )
    .eq("draft", false)
    .order("publish_date", { ascending: false })
    .limit(3);

  if (error) {
    throw svelteKitError(500, error);
  }

  return {
    posts: posts.map(({ profiles, ...rest }) => ({
      ...rest,
      profile: Array.isArray(profiles) ? profiles[0] : profiles,
    })),
  };
};
