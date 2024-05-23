import { db } from "@/db";
import { posts } from "@/db/schema";
import { Post } from "./post";

async function getPosts() {
  return await db.select().from(posts);
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
