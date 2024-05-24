"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { htmlToJSON } from "@/lib/editor.server";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function createPostAction() {
  const session = await auth();

  if (!session || !session?.user?.id || session?.user?.role !== "admin") {
    redirect("/login");
  }

  const html = "<p>Hej alla <strong>glada!</strong></p>";

  const defaultBody = htmlToJSON(html);

  const id = uuidv4();

  await db.insert(posts).values({
    id,
    userId: session.user.id,
    title: "En rubrik",
    body: defaultBody,
    createdAt: new Date(),
    draft: true,
  });

  redirect(`/admin/posts/editor/${id}`);
}
