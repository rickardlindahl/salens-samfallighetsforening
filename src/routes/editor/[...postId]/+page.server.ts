import { error as sveltekitError, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Update } from "../../../types/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../../types/supabase";

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
  const { data: post, error } = await supabase
    .from("posts")
    .select()
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
    post,
  };
};

async function updatePost(
  supabase: SupabaseClient<Database>,
  updatedPost: Update<"posts">,
  postId: string,
) {
  const result = await supabase
    .from("posts")
    .update(updatedPost)
    .eq("id", postId)
    .select()
    .single();

  return result;
}

function toPost(formData: FormData) {
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const draft = formData.get("draft") as string;
  const publishDate = formData.get("publishDate") as string;

  const post: Update<"posts"> = {
    title,
    body: JSON.parse(body),
    draft: draft === "true",
    publish_date: publishDate || null,
  };

  return post;
}

export const actions: Actions<{ postId: string }> = {
  save: async ({ request, params, locals: { supabase } }) => {
    const formData = await request.formData();

    const updatedPost: Update<"posts"> = {
      ...toPost(formData),
      updated_at: new Date().toISOString(),
    };

    const { data: post, error } = await updatePost(supabase, updatedPost, params.postId);

    if (error) {
      return fail(400, { success: false, message: "Something went wrong." });
    }

    return {
      success: true,
      post,
    };
  },
  publish: async ({ request, params, locals: { supabase } }) => {
    const formData = await request.formData();
    const updatedPost: Update<"posts"> = {
      ...toPost(formData),
      draft: false,
      publish_date: new Date().toISOString(),
      updated_at: null,
    };
    const { data: post, error } = await updatePost(supabase, updatedPost, params.postId);

    if (error) {
      return fail(400, { success: false, message: "Something went wrong." });
    }

    return {
      success: true,
      post,
    };
  },
  unpublish: async ({ request, params, locals: { supabase } }) => {
    const formData = await request.formData();
    const updatedPost: Update<"posts"> = {
      ...toPost(formData),
      draft: true,
      publish_date: null,
      updated_at: new Date().toISOString(),
    };
    const { data: post, error } = await updatePost(supabase, updatedPost, params.postId);

    if (error) {
      return fail(400, { success: false, message: "Something went wrong." });
    }

    return {
      success: true,
      post,
    };
  },
};
