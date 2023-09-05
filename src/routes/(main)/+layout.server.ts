import type { LayoutServerLoad } from "../$types";

export const load: LayoutServerLoad = async ({ locals: { getSession, supabase } }) => {
  const session = await getSession();

  if (!session) {
    return { profile: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("id", session.user.id)
    .single();

  return {
    profile,
  };
};
