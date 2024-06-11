import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Post } from "./post";

async function getPosts() {
  return await db
    .select({
      authorName: users.name,
      authorEmail: users.email,
      postId: posts.id,
      postTitle: posts.title,
      postBody: posts.body,
      postPublishDate: posts.publishDate,
    })
    .from(posts)
    .leftJoin(users, eq(posts.userId, users.id))
    .where(eq(posts.draft, false))
    .orderBy(desc(posts.publishDate));
}

export async function PostsWrapper() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          No posts published yet
        </h3>
      </div>
    );
  }

  return (
    <div className="grid gap-10">
      {posts.map((data) => (
        <Post key={data.postId} {...data} />
      ))}
    </div>
  );
}
