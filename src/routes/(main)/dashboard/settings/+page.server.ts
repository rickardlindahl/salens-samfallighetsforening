import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { profileSettingsFormSchema } from "$lib/schema";

export const load: PageServerLoad = async ({ parent, locals: { getSession } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, "/auth/login");
  }
  const { profile } = await parent();

  return {
    form: superValidate(profile, profileSettingsFormSchema, { errors: false }),
  };
};

export const actions: Actions = {
  update: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
      throw redirect(303, "/auth/login");
    }

    const formData = await request.formData();

    const form = await superValidate(formData, profileSettingsFormSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: form.data.full_name,
        enable_notification_email_new_documents: form.data.enable_notification_email_new_documents,
        enable_notification_email_new_posts: form.data.enable_notification_email_new_posts,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session?.user.id ?? "");

    if (error) {
      return fail(500, {
        form,
      });
    }

    return {
      form,
    };
  },
};
