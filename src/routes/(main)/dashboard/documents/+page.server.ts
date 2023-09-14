import { error as svelteKitError, fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { message, setError, superValidate } from "sveltekit-superforms/server";
import { deleteDocumentSchema, fileSchema, uploadDocumentSchema } from "./schema";

export const load: PageServerLoad = async ({ locals: { getSession, supabase } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, "/auth/login");
  }

  const { data: documents, error } = await supabase
    .from("documents")
    .select()
    .order("created_at", { ascending: false })
    .eq("user_id", session?.user.id);

  if (error) {
    throw svelteKitError(500, error);
  }

  return {
    documents,
    deleteForm: superValidate(deleteDocumentSchema),
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
    const filePath = `${Math.random()}.${fileExt}`;

    let { error: storageError } = await supabase.storage.from("documents").upload(filePath, file);

    if (storageError) {
      throw svelteKitError(500, "Något gick fel. Var god försök igen senare.");
    }

    const { error } = await supabase.from("documents").insert({
      created_at: new Date().toISOString(),
      description: uploadForm.data.description,
      user_id: session.user.id,
      profile_id: session.user.id,
      file_url: filePath,
    });

    if (error) {
      throw svelteKitError(500, "Kunde ej skapa dokument. Var god försök igen senare.");
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
    const deleteForm = await superValidate(formData, deleteDocumentSchema);

    if (!deleteForm.valid) {
      return fail(400, { deleteForm });
    }

    const { data: doc, error: postgrestError } = await supabase
      .from("documents")
      .delete()
      .eq("id", deleteForm.data.documentId)
      .select()
      .single();

    if (postgrestError) {
      throw svelteKitError(500, "Kunde ej ta bort dokumentet. Var god försök igen senare.");
    }

    const { error: storageError } = await supabase.storage.from("documents").remove([doc.file_url]);

    if (storageError) {
      throw svelteKitError(500, "Kunde ej ta bort dokumentet. Var god försök igen senare.");
    }

    return message(deleteForm, "Dokumentet har blivit borttaget");
  },
};
