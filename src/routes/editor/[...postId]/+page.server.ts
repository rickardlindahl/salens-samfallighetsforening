import { error as sveltekitError, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Update } from "../../../types/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../../types/supabase";
import { superValidate } from "sveltekit-superforms/server";
import { postFormSchema } from "$lib/schema";

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

  const form = superValidate(post, postFormSchema);

  return {
    post,
    form,
  };
};

async function updatePost(supabase: SupabaseClient<Database>, updatedPost: Update<"posts">) {
  return supabase.from("posts").update(updatedPost).eq("id", updatedPost.id!);
}

export const actions: Actions<{ postId: string }> = {
  save: async ({ locals: { supabase }, request, params }) => {
    const formData = await request.formData();

    const form = await superValidate(formData, postFormSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const body = formData.get("body") as string;

    const updatedPost: Update<"posts"> = {
      ...form.data,
      body: JSON.parse(body),
      id: params.postId,
      updated_at: new Date().toISOString(),
    };

    const { error } = await updatePost(supabase, updatedPost);

    if (error) {
      return fail(400, { form });
    }

    return {
      form,
    };
  },
  publish: async ({ locals: { supabase }, params, request }) => {
    const formData = await request.formData();

    const form = await superValidate(formData, postFormSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const body = formData.get("body") as string;

    const updatedPost: Update<"posts"> = {
      ...form.data,
      body: JSON.parse(body),
      id: params.postId,
      draft: false,
      publish_date: new Date().toISOString(),
      updated_at: null,
    };

    const { error } = await updatePost(supabase, updatedPost);

    if (error) {
      return fail(400, { form, message: error.message });
    }

    return {
      form,
    };
  },
  unpublish: async ({ locals: { supabase }, params, request }) => {
    const formData = await request.formData();

    const form = await superValidate(formData, postFormSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const body = formData.get("body") as string;

    const updatedPost: Update<"posts"> = {
      ...form.data,
      body: JSON.parse(body),
      id: params.postId,
      draft: true,
      publish_date: null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await updatePost(supabase, updatedPost);

    if (error) {
      return fail(400, { success: false, message: "Something went wrong." });
    }

    return {
      form,
    };
  },
};
