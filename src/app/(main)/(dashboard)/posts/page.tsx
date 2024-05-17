import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Post } from "./post";

async function getPosts() {
  const payload = await getPayload({
    config: configPromise,
  });

  return payload.find({
    collection: "posts",
  });
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            Posts
          </h1>
          <p className="text-xl text-muted-foreground">
            Här samlas inlägg från Samfälligheten.
          </p>
        </div>
      </div>

      <hr className="my-8" />

      {posts.docs.length ? (
        <div className="grid gap-10">
          {posts.docs.map((post, index) => (
            <Post key={post.id} post={post} priority={index <= 1} />
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
}
