import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { EditorForm } from "./editor-form";

async function getPost(postId: string) {
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, postId))
    .limit(1);

  if (!post) {
    redirect(
      `/admin/posts?message=${encodeURIComponent("Post does not exist")}`,
    );
  }

  return post;
}

export async function EditorFormWrapper({ postId }: { postId: string }) {
  const post = await getPost(postId);

  return <EditorForm post={post} />;
}
