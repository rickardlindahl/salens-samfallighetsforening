import { AuthApiError } from "@supabase/supabase-js";
import { error, fail, type Actions, redirect } from "@sveltejs/kit";
import { superValidate, setError } from "sveltekit-superforms/server";
import { loginFormSchema } from "$lib/schema";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => {
  return {
    form: superValidate(loginFormSchema),
  };
};

export const actions: Actions = {
  default: async ({ url, request, locals: { supabase } }) => {
    const formData = await request.formData();
    const form = await superValidate(formData, loginFormSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: form.data.email,
      password: form.data.password,
    });

    if (signInError) {
      if (signInError instanceof AuthApiError && signInError.status === 400) {
        return setError(form, "password", "Felaktigt användarnamn eller lösenord");
      }
      throw error(500, { status: 500, message: "Server error. Try again later." });
    }

    const redirectTo = url.searchParams.get("redirectTo");
    if (redirectTo) {
      throw redirect(302, `/${redirectTo.slice(1)}`);
    }

    throw redirect(302, "/dashboard");
  },
};
