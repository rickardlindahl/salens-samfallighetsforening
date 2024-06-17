import { buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { jsonToHTML } from "@/lib/tiptap-utils.server";
import { cn, formatRelative } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

async function getPost(postId: string) {
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
    .where(and(eq(posts.id, postId), eq(posts.draft, false)))
    .limit(1);
}

export default async function SpecificPostPage({
  params,
}: { params: { postId: string } }) {
  const [post] = await getPost(params.postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <article className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-semibold text-4xl tracking-tight lg:text-5xl">
            {post.postTitle}
          </h1>
          <hr className="my-8" />
          {post.postPublishDate && (
            <p className="text-sm text-muted-foreground">
              <time dateTime={post.postPublishDate.toISOString()}>
                {formatRelative(post.postPublishDate)}
              </time>
            </p>
          )}
          {post.postBody && (
            <div
              // biome-ignore lint/security/noDangerouslySetInnerHtml: Let's trust the input from tiptap
              dangerouslySetInnerHTML={{ __html: jsonToHTML(post.postBody) }}
            />
          )}
          {post.authorName && post.authorEmail && (
            <div>
              <a
                className={cn(buttonVariants({ variant: "link" }), "px-0")}
                href={`mailto:${post.authorEmail}`}
              >
                {post.authorName}
              </a>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
