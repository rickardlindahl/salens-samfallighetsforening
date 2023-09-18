import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Profile } from "../../../types/database";

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, "/auth/login");
  }

  const { data: houses, error: selectError } = await supabase
    .from("houses")
    .select(`*, household_members(profiles(*))`)
    .order("house_number", { ascending: true });

  if (selectError) {
    throw error(500, "Internal Server Error");
  }

  return {
    houses: houses.map(({ household_members, ...rest }) => ({
      ...rest,
      household_members: household_members
        .filter(Boolean)
        .map<Profile>(({ profiles }) => profiles as Profile),
    })),
  };
};
