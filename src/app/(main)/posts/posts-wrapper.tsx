import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Post } from "./post";

async function getPosts() {
  return await db
    .select()
    .from(posts)
    .where(eq(posts.draft, false))
    .orderBy(desc(posts.publishDate));
}

export async function PostsWrapper() {
  const posts = await getPosts();
  if (posts.length === 0) {
    return <p>No posts published.</p>;
  }

  return (
    <div className="grid gap-10">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
