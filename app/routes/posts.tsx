import { Await, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, defer } from "@vercel/remix";
import { Suspense } from "react";
import { db } from "~/db";
import { posts as postsTable } from "~/db/schema";
import { authenticator } from "~/lib/auth.server";

export const meta = () => [
  {
    title: "Remix DnB Stack | Books Edge Streaming",
  },
  {
    charset: "utf-8",
  },
  {
    viewport: "width=device-width,initial-scale=1",
  },
];

function getPosts() {
  return db.select().from(postsTable).all();
}

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return defer({
    posts: getPosts(),
  });
}

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Posts</h1>
      <Suspense fallback={<h1 className="mb-10 mt-5 text-center text-3xl font-bold">Loading books ...</h1>}>
        <Await resolve={posts}>
          {posts => (
            <div>
              {posts.map(post => (
                <div key={post.id} className="mb-5">
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <p>{post.body}</p>
                </div>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </main>
  );
}
