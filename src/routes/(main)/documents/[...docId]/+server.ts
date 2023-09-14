import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler<{ docId: string }> = async ({
  params,
  locals: { getSession, supabase },
}) => {
  const session = await getSession();
  if (!session) {
    throw error(401, "Unauthorized");
  }

  const { data: doc, error: postgrestError } = await supabase
    .from("documents")
    .select("file_name, storage_path")
    .eq("id", params.docId)
    .single();

  console.log({ data: doc, postgrestError });

  if (postgrestError) {
    console.error(postgrestError);
    throw error(500, "Internal Server Error");
  }

  const { data: blob, error: storageError } = await supabase.storage
    .from("documents")
    .download(doc.storage_path);

  if (storageError) {
    console.error(storageError);
    throw error(500, "Internal Server Error");
  }

  return new Response(blob, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename*:UTF-8''${encodeURIComponent(doc.file_name)}`,
    },
  });
};
