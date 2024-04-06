import { zodResolver } from "@hookform/resolvers/zod";
import { Await, Form, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs, defer, json } from "@vercel/remix";
import { Suspense } from "react";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { jsonWithSuccess } from "remix-toast";
import { z } from "zod";
import { db } from "~/db";
import { NewPost, posts as postsTable } from "~/db/schema";
import { authenticator } from "~/lib/auth.server";
import { createPostSchema } from "~/lib/schemas";

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

type FormData = z.infer<typeof createPostSchema>;

const resolver = zodResolver(createPostSchema);

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
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
    stringifyAllValues: false,
  });

  return (
    <main>
      <h1>Posts</h1>
      <Form method="post" onSubmit={handleSubmit}>
        <input type="text" {...register("title", { required: true })} placeholder="Title" className="mb-5 block" />
        {errors.title && <p>{errors.title.message}</p>}
        <textarea {...register("body", { required: true })} placeholder="Body" className="mb-5 block" />
        {errors.body && <p>{errors.body.message}</p>}
        <button type="submit" className="block">
          Create Post
        </button>
      </Form>
      <Suspense fallback={<h1 className="mb-10 mt-5 text-center text-3xl font-bold">Loading posts ...</h1>}>
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

export async function action({ request }: ActionFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const { errors, data, receivedValues: defaultValues } = await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    return json({ errors, defaultValues });
  }

  const newPost: NewPost = {
    ...data,
    userId: user.id,
  };

  await db.insert(postsTable).values(newPost);

  //await sendNewPostEmail(newPost);

  return jsonWithSuccess(null, { message: "Post created", description: "The post has been created" }, { status: 201 });
}
