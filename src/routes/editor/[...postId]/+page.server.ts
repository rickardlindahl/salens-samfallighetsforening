import { error as sveltekitError, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
  const { data: post, error } = await supabase
    .from("posts")
    .select()
    .eq("id", params.postId)
    .single();

  console.log({ post, error });

  if (error) {
    if (error.code === "PGRST116") {
      throw sveltekitError(404, "Not found");
    } else {
      throw sveltekitError(500, "Unexpected error");
    }
  }

  return {
    post,
  };
};

export const actions: Actions = {
  save: async ({ request, params, locals: { supabase } }) => {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const draft = (formData.get("draft") as string) ?? "true";

    const res = await supabase
      .from("posts")
      .update({
        title,
        body: JSON.parse(body),
        updated_at: new Date().toISOString(),
        draft: draft === "true",
      })
      .eq("id", params.postId!);

    console.log({ title, body, res });
    return {
      success: true,
    };
  },
};
