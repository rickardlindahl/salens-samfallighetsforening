import { AuthApiError } from "@supabase/supabase-js";
import { fail, type Actions, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ url, request, locals: { supabase } }) => {
    const formData = await request.formData();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        return fail(400, {
          error: "Invalid credentials.",
          values: {
            email,
            password,
          },
        });
      }
      return fail(500, {
        error: "Server error. Try again later.",
        values: {
          email,
          password,
        },
      });
    }

    const redirectTo = url.searchParams.get("redirectTo");
    if (redirectTo) {
      throw redirect(302, `/${redirectTo.slice(1)}`);
    }

    throw redirect(302, "/dashboard");
  },
};
