import { fail, type Actions, redirect, error } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";

export const actions: Actions = {
  default: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();

    const setSessionResponse = await supabase.auth.setSession({
      access_token: formData.get("accessToken") as string,
      refresh_token: formData.get("refreshToken") as string,
    });

    if (setSessionResponse.error) {
      throw error(500, new Error("Unable to set session"));
    }

    const updateUserResponse = await supabase.auth.updateUser({
      password: formData.get("password") as string,
    });

    if (updateUserResponse.error) {
      if (
        updateUserResponse.error instanceof AuthApiError &&
        updateUserResponse.error.status === 400
      ) {
        return fail(400, {
          error: "Invalid credentials.",
        });
      }
      return fail(500, {
        error: "Server error. Try again later.",
      });
    }

    throw redirect(303, "/");
  },
};
