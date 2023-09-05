import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ locals: { supabase } }) => {
    await supabase.auth.signOut();

    throw redirect(303, "/");
  },
};
