import { MAILGUN_API_KEY, SUPABASE_WEBHOOK_SECRET } from "$env/static/private";
import { postSchema, type Post } from "$lib/zod-schema";
import type { SupabaseClient } from "@supabase/supabase-js";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import type { Database } from "../../../types/supabase";
import { webhookPayloadSchema } from "$lib/webhook";

type SendPostPublishedEmail = {
  fetch(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
  post: Post;
  supabase: SupabaseClient<Database>;
};

async function sendPostPublishedEmail({ fetch, post, supabase }: SendPostPublishedEmail) {
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("email")
    .eq("enable_notification_email_new_posts", true);

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
    formData.append("subject", "Nytt inlägg publicerat");
    formData.append("template", "post-published");
    formData.append(
      "t:variables",
      JSON.stringify({
        link: `<a href="https://www.salenssamfallighetsforening.se/posts/${post.id}">${post.title}</a>`,
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

function shouldSendEmailNotification(post: Post) {
  return post.publish_date && !post.email_notification_sent;
}

export const POST: RequestHandler = async ({ fetch, request, locals: { supabase } }) => {
  console.log("/api/webhooks/posts-update");
  const secret = request.headers.get("X-Webhook-Secret");
  if (secret !== SUPABASE_WEBHOOK_SECRET) {
    console.error("ERROR!! secrets does not match", secret, SUPABASE_WEBHOOK_SECRET);
    throw error(401, "Unauthorized");
  }

  const body = await request.json();

  try {
    const data = webhookPayloadSchema({ table: "posts", type: "UPDATE", record: postSchema }).parse(
      body,
    );

    const { record: post } = data;
    if (shouldSendEmailNotification(post)) {
      console.log("Should send an email!");
      await sendPostPublishedEmail({ fetch, post, supabase });

      await supabase
        .from("posts")
        .update({
          email_notification_sent: true,
          email_notification_sent_at: new Date().toISOString(),
        })
        .eq("id", post.id);
    }

    return json({ message: "Post update handled successfully!" }, { status: 200 });
  } catch (err) {
    console.error(err);
    throw error(400, "Bad request");
  }
};
