"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { redirect } from "next/navigation";
import type { EditPostFormData } from "./schema";
import { eq } from "drizzle-orm";
import type { JSONContent } from "@tiptap/react";
import type { Action } from "./action-types";
import { revalidatePath } from "next/cache";

export async function editPostAction(
  data: EditPostFormData,
  action: Action,
  body: JSONContent,
) {
  const session = await auth();

  if (!session || !session?.user?.id) {
    redirect("/login");
  }

  const { id, title } = data;

  const now = new Date();

  try {
    await db
      .update(posts)
      .set({
        body,
        title,
        ...(action === "save" ? { updatedAt: now } : {}),
        ...(action === "publish"
          ? { draft: false, publishDate: now, updatedAt: null }
          : {}),
        ...(action === "unpublish"
          ? { draft: true, publishDate: null, updatedAt: now }
          : {}),
      })
      .where(eq(posts.id, id));

    revalidatePath(`/admin/posts/editor/${data.id}`);
    revalidatePath("/posts");
  } catch (e) {
    console.log(e);
    return {
      isError: true,
    };
  }
}
