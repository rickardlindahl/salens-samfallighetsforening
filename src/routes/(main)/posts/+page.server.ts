import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select(
      `*,
      profiles(full_name, email)
      `,
    )
    .eq("draft", false)
    .order("publish_date", { ascending: false });

  if (postsError) {
    throw error(500, {
      status: 500,
      message: "Misslyckades att hämta inlägg. Vänligen försök igen senare.",
    });
  }

  return {
    posts: posts.map(({ profiles, ...rest }) => ({
      ...rest,
      profile: Array.isArray(profiles) ? profiles[0] : profiles,
    })),
  };
};
