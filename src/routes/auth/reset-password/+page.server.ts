import { fail, type Actions, redirect, error } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";
import type { PageServerLoad } from "./$types";
import { setError, superValidate } from "sveltekit-superforms/server";
import { resetPasswordFormSchema } from "$lib/schema";

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession();

  return {
    accessToken: session?.access_token,
    refreshToken: session?.refresh_token,
    form: superValidate(resetPasswordFormSchema),
  };
};

export const actions: Actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();

    const form = await superValidate(formData, resetPasswordFormSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error: sessionError } = await supabase.auth.setSession({
      access_token: form.data.accessToken,
      refresh_token: form.data.refreshToken,
    });

    if (sessionError) {
      throw error(500, new Error("Unable to set session"));
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: form.data.password,
    });

    if (updateError) {
      if (updateError instanceof AuthApiError && updateError.status === 400) {
        return setError(
          form,
          "password",
          "Misslyckades att uppdatera lösenordet. Vänligen försök med ett annat.",
        );
      }
      return setError(
        form,
        "password",
        "Något gick fel när lösenordet skulle uppdateras. Var god försök igen senare.",
        { status: 500 },
      );
    }

    throw redirect(303, "/dashboard");
  },
};
