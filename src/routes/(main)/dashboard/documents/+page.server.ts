import { error, fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { setError, superValidate } from "sveltekit-superforms/server";
import { deleteDocumentSchema, fileSchema, uploadDocumentSchema } from "$lib/schema";

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, "/auth/login");
  }

  const { data: documents, error: documentsError } = await supabase
    .from("documents")
    .select()
    .order("created_at", { ascending: false })
    .eq("user_id", session?.user.id);

  if (documentsError) {
    throw error(500, {
      status: 500,
      message: "Misslyckades att hämta dokument. Vänligen försök igen senare.",
    });
  }

  return {
    documents: documents ?? [],
    uploadForm: superValidate(uploadDocumentSchema),
  };
};

export const actions: Actions = {
  uploadDocument: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
      throw redirect(303, "/auth/login");
    }

    const formData = await request.formData();
    const uploadForm = await superValidate(formData, uploadDocumentSchema);

    if (!uploadForm.valid) {
      return fail(400, { uploadForm });
    }

    const result = fileSchema.safeParse(formData.get("file"));

    if (!result.success) {
      return setError(uploadForm, "file", result.error.flatten().formErrors[0]);
    }

    const { data: file } = result;

    const fileExt = file.name.split(".").pop();
    const storagePath = `${Math.random()}.${fileExt}`;

    const { error: storageError } = await supabase.storage
      .from("documents")
      .upload(storagePath, file);

    if (storageError) {
      throw error(500, { status: 500, message: "Något gick fel. Var god försök igen senare." });
    }

    const { error: documentsError } = await supabase.from("documents").insert({
      created_at: new Date().toISOString(),
      description: uploadForm.data.description,
      user_id: session.user.id,
      profile_id: session.user.id,
      storage_path: storagePath,
      file_name: file.name,
      file_size: file.size,
    });

    if (documentsError) {
      throw error(500, {
        status: 500,
        message: "Kunde ej skapa dokument. Var god försök igen senare.",
      });
    }

    return {
      uploadForm,
    };
  },
  deleteDocument: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
      throw redirect(303, "/auth/login");
    }

    const formData = await request.formData();
    const documentId = formData.get("documentId");

    const result = deleteDocumentSchema.safeParse({ documentId });

    if (!result.success) {
      return fail(400, { success: false, message: "Dokumentet saknar id" });
    }

    const { data: doc, error: postgrestError } = await supabase
      .from("documents")
      .delete()
      .eq("id", result.data.documentId)
      .select()
      .single();

    if (postgrestError) {
      throw error(500, {
        status: 500,
        message: "Kunde ej ta bort dokumentet. Var god försök igen senare.",
      });
    }

    const { error: storageError } = await supabase.storage
      .from("documents")
      .remove([doc.storage_path]);

    if (storageError) {
      throw error(500, {
        status: 500,
        message: "Kunde ej ta bort dokumentet. Var god försök igen senare.",
      });
    }

    return {
      success: true,
      message: "Dokumentet har blivit borttaget",
    };
  },
};
