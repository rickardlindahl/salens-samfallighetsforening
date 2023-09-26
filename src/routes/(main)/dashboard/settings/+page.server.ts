import { fail, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  update: async ({ request, locals: { supabase, getSession } }) => {
    const formData = await request.formData();
    const fullName = formData.get("fullName") as string;
    const avatarUrl = formData.get("avatarUrl") as string;

    const session = await getSession();

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        avatar_url: avatarUrl || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session?.user.id ?? "");

    if (error) {
      return fail(500, {
        fullName,
        avatarUrl,
      });
    }

    return {
      fullName,
      avatarUrl,
    };
  },
};
