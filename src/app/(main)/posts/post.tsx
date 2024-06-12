import { Button, buttonVariants } from "@/components/ui/button";
import { jsonToHTML } from "@/lib/tiptap-utils.server";
import { cn, formatRelative } from "@/lib/utils";
import type { JSONContent } from "@tiptap/react";
import Link from "next/link";

type PostProps = {
  authorName: string | null;
  authorEmail: string | null;
  postId: string | null;
  postTitle: string | null;
  postPublishDate: Date | null;
  postBody: JSONContent | null;
};

export function Post(post: PostProps) {
  return (
    <article
      key={post.postId}
      className="group relative flex flex-col space-y-2 bg-muted/50 border rounded-lg p-4 sm:p-8"
    >
      <Link href={`/posts/${post.postId}`}>
        <h2 className="text-2xl font-extrabold">{post.postTitle}</h2>
      </Link>
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
    </article>
  );
}
