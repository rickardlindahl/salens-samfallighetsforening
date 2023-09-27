import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, "/auth/login");
  }

  const { data: documents, error: documentsError } = await supabase
    .from("documents")
    .select(
      `*,
       profiles(full_name, email)`,
    )
    .order("created_at", { ascending: false })
    .eq("user_id", session?.user.id);

  if (documentsError) {
    throw error(500, {
      status: 500,
      message: "Misslyckades att hämta dokument. Vänligen försök igen senare.",
    });
  }

  return {
    documents: documents.map(({ profiles, ...doc }) => ({
      ...doc,
      profile: Array.isArray(profiles) ? profiles[0] : profiles,
    })),
  };
};
