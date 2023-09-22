import { sendPostCreatedEmail } from "$lib/email.server";
import type { RequestHandler } from "@sveltejs/kit";
import { error, json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals: { getSession, supabase } }) => {
  const session = await getSession();
  if (!session) {
    throw error(401, { message: "Unauthorized" });
  }

  const body = await request.json();
  if (!body.id) {
    throw error(400, { message: "The post id must be sent in the body" });
  }

  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("id, title")
    .eq("id", body.id)
    .single();

  if (postError) {
    throw error(400, { message: "Invalid post id " });
  }

  const { data: profiles, error: profilesError } = await supabase.from("profiles").select("email"); //.eq("post_notifications", true);
  if (profilesError) {
    throw error(400, { message: "Something went wrong" });
  }

  try {
    await sendPostCreatedEmail({
      emails: profiles.map(({ email }) => email),
      post,
    });

    return json({ message: "Email sent successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return json({ message: "Unable to send message", error: err }, { status: 500 });
  }
};
