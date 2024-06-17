import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Post } from "./post";

async function getPosts(limit?: number) {
  const query = db
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

  if (typeof limit === "number" && limit > 0) {
    query.limit(limit);
  }

  return await query;
}

type PostsWrapperProps = { limit?: number };

export async function PostsWrapper({ limit = 999 }: PostsWrapperProps) {
  const posts = await getPosts(limit);

  if (posts.length === 0) {
    return (
      <div>
        <h3 className="text-2xl font-bold tracking-tight">
          Inga inlägg skapade ännu
        </h3>
      </div>
    );
  }

  return (
    <div className="grid gap-10">
      {posts.map((post) => (
        <Post key={post.postId} {...post} />
      ))}
    </div>
  );
}
