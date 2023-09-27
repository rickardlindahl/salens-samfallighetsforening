import { error, type Actions, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Update } from "../../../types/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../../types/supabase";
import { superValidate } from "sveltekit-superforms/server";
import { postFormSchema } from "$lib/schema";

export const load: PageServerLoad = async ({ params, locals: { getSession, supabase }, url }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, "/auth/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select()
    .eq("id", session.user.id)
    .single();

  if (profileError) {
    throw error(500, { status: 500, message: "Något gick fel. Vänligen försök igen senare." });
  }

  if (profile?.role !== "admin") {
    const newURL = new URL("/dashboard", url.origin);

    newURL.searchParams.append(
      "message",
      "Du måste vara administratör för att komma åt denna sida.",
    );
    throw redirect(302, newURL);
  }

  const { data: post, error: postError } = await supabase
    .from("posts")
    .select()
    .eq("id", params.postId)
    .single();

  if (postError) {
    if (postError.code === "PGRST116") {
      throw error(404, { status: 404, message: "Not found" });
    } else {
      throw error(500, { status: 500, message: "Unexpected error" });
    }
  }

  return {
    post,
    form: superValidate(post, postFormSchema),
  };
};

async function updatePost(
  supabase: SupabaseClient<Database>,
  updatedPost: Update<"posts">,
  id: string,
) {
  return supabase.from("posts").update(updatedPost).eq("id", id);
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
      updated_at: new Date().toISOString(),
    };

    const { error: updateError } = await updatePost(supabase, updatedPost, params.postId);

    if (updateError) {
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
      draft: false,
      publish_date: new Date().toISOString(),
      updated_at: null,
    };

    const { error: updateError } = await updatePost(supabase, updatedPost, params.postId);

    if (updateError) {
      return fail(400, { form });
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
      draft: true,
      publish_date: null,
      updated_at: new Date().toISOString(),
    };

    const { error: updateError } = await updatePost(supabase, updatedPost, params.postId);

    if (updateError) {
      return fail(400, { success: false, message: "Something went wrong." });
    }

    return {
      form,
    };
  },
};
