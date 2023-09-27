import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler<{ docId: string }> = async ({
  params,
  locals: { getSession, supabase },
}) => {
  const session = await getSession();
  if (!session) {
    throw error(401, { status: 401, message: "Unauthorized" });
  }

  const { data: doc, error: postgrestError } = await supabase
    .from("documents")
    .select("file_name, storage_path")
    .eq("id", params.docId)
    .single();

  if (postgrestError) {
    throw error(500, { status: 500, message: "Internal Server Error" });
  }

  const { data: blob, error: storageError } = await supabase.storage
    .from("documents")
    .download(doc.storage_path);

  if (storageError) {
    throw error(500, { status: 500, message: "Internal Server Error" });
  }

  return new Response(blob, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename*:UTF-8''${encodeURIComponent(doc.file_name)}`,
    },
  });
};
