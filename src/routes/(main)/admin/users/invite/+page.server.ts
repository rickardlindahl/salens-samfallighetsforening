import { inviteUserFormSchema } from "$lib/schema";
import { fail, type Actions, error } from "@sveltejs/kit";
import { setError, superValidate } from "sveltekit-superforms/server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: houses, error: housesError } = await supabase.from("houses").select();

  if (housesError) {
    throw error(500, "Internal Server Error");
  }

  return {
    houses,
    form: superValidate({ email: "", role: "user" }, inviteUserFormSchema, { errors: false }),
  };
};

export const actions: Actions = {
  inviteUser: async ({ request, locals: { supabaseAdmin } }) => {
    const formData = await request.formData();

    const form = await superValidate(formData, inviteUserFormSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const { email, ...rest } = form.data;

    const { error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: { ...rest },
    });

    if (inviteError) {
      console.error(inviteError);
      return setError(form, "email", "Ett fel inträffade. Var god försök igen senare.");
    }

    return {
      success: true,
      form,
    };
  },
};
