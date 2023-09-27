import { fail, type Actions, redirect } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";
import type { PageServerLoad } from "./$types";
import { setError, superValidate } from "sveltekit-superforms/server";
import { forgotPasswordSchema } from "$lib/schema";

export const load: PageServerLoad = async () => {
  return {
    form: superValidate(forgotPasswordSchema),
  };
};

export const actions: Actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();

    const form = await superValidate(formData, forgotPasswordSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(form.data.email);

    if (resetError) {
      if (resetError instanceof AuthApiError && resetError.status === 400) {
        return setError(
          form,
          "email",
          "Misslyckades att skicka epost. Vänligen dubbelkolla att du fyllt i en giltig epost.",
          { status: 400 },
        );
      }
      return setError(
        form,
        "email",
        "Något gick fel när epost skulle skickas. Var god försök igen senare.",
        { status: 500 },
      );
    }

    throw redirect(303, "/dashboard");
  },
};
