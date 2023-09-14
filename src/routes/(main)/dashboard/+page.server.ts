import type { PageServerLoad } from "./$types";

const fallbackDocuments = {
  error: "Misslyckades att hämta dokument. Var god försök igen senare.",
  data: [],
};

const fallbackPosts = {
  error: "Misslyckades att hämta inlägg. Var god försök igen senare.",
  data: [],
};

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  async function fetchPosts({ limit }: { limit: number }) {
    return supabase
      .from("posts")
      .select(
        `*,
      profiles(full_name, email)
      `,
      )
      .eq("draft", false)
      .order("publish_date", { ascending: false })
      .limit(limit);
  }

  async function fetchDocuments({ limit }: { limit: number }) {
    return supabase
      .from("documents")
      .select(
        `*,
      profiles(full_name, email)
      `,
      )
      .order("created_at", { ascending: false })
      .limit(limit);
  }

  const [postsResponse, documentsResponse] = await Promise.allSettled([
    fetchPosts({ limit: 3 }),
    fetchDocuments({ limit: 3 }),
  ]);

  const { data: posts, error: postsError } =
    postsResponse.status === "rejected" ? fallbackPosts : postsResponse.value;
  const { data: documents, error: documentsError } =
    documentsResponse.status === "rejected" ? fallbackDocuments : documentsResponse.value;

  return {
    documents: documentsError
      ? fallbackDocuments
      : {
          error: null,
          data: documents.map(({ profiles, ...rest }) => ({
            ...rest,
            profile: Array.isArray(profiles) ? profiles[0] : profiles,
          })),
        },
    posts: postsError
      ? fallbackPosts
      : {
          error: null,
          data: posts.map(({ profiles, ...rest }) => ({
            ...rest,
            profile: Array.isArray(profiles) ? profiles[0] : profiles,
          })),
        },
  };
};
