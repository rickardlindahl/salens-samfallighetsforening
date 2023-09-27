import { MAILGUN_API_KEY, SUPABASE_WEBHOOK_SECRET } from "$env/static/private";
import { documentSchema, type Document } from "$lib/zod-schema";
import type { SupabaseClient } from "@supabase/supabase-js";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import type { Database } from "../../../../types/supabase";
import { webhookInsertPayloadSchema } from "$lib/webhook";

type SendDocumentUploadedEmail = {
  fetch(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
  document: Document;
  supabase: SupabaseClient<Database>;
};

async function sendDocumentUploadedEmail({ fetch, document, supabase }: SendDocumentUploadedEmail) {
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("email")
    .eq("enable_notification_email_new_documents", true);

  if (profilesError) {
    throw profilesError;
  }

  try {
    const formData = new FormData();
    formData.append(
      "from",
      "Salens Samfällighetsförening <noreply@salenssamfallighetsforening.se>",
    );
    formData.append("to", profiles.map(({ email }) => email).join(","));
    formData.append("subject", "Nytt dokument uppladdat");
    formData.append("template", "document-uploaded");
    formData.append(
      "t:variables",
      JSON.stringify({
        downloadLink: `<a download="${document.file_name}" href="https://www.salenssamfallighetsforening.se/documents/${document.id}">${document.description}</a>`,
      }),
    );

    const res = await fetch(
      "https://api.eu.mailgun.net/v3/salenssamfallighetsforening.se/messages",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
        },
        body: formData,
      },
    );

    if (!res.ok) {
      throw new Error("Unable to send email");
    }
    console.log(`Email sent to ${profiles.length} users!`);
  } catch (err) {
    console.error(err);
    throw err;
  }

  return { success: true };
}

function shouldSendEmailNotification(document: Document) {
  return !document.email_notification_sent;
}

export const POST: RequestHandler = async ({ fetch, request, locals: { supabase } }) => {
  console.log("/api/webhooks/documents-insert");
  const secret = request.headers.get("X-Webhook-Secret");
  if (secret !== SUPABASE_WEBHOOK_SECRET) {
    console.error("ERROR!! secrets does not match", secret, SUPABASE_WEBHOOK_SECRET);
    throw error(401, { status: 401, message: "Unauthorized" });
  }

  const body = await request.json();

  try {
    const data = webhookInsertPayloadSchema({
      table: "documents",
      record: documentSchema,
    }).parse(body);

    const { record: document } = data;
    if (shouldSendEmailNotification(document)) {
      console.log("Should send an email!");
      await sendDocumentUploadedEmail({ fetch, document, supabase });

      await supabase
        .from("documents")
        .update({
          email_notification_sent: true,
          email_notification_sent_at: new Date().toISOString(),
        })
        .eq("id", document.id);
    }

    return json({ message: "Document insert handled successfully!" }, { status: 200 });
  } catch (err) {
    console.error(err);
    throw error(400, { status: 400, message: "Bad request" });
  }
};
