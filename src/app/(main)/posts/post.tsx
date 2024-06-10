import { Button, buttonVariants } from "@/components/ui/button";
import { jsonToHTML } from "@/lib/tiptap-utils.server";
import { cn, formatRelative } from "@/lib/utils";
import type { JSONContent } from "@tiptap/react";

type PostProps = {
  authorName: string | null;
  authorEmail: string | null;
  postId: string | null;
  postTitle: string | null;
  postPublishDate: Date | null;
  postBody: JSONContent | null;
};

export function Post(props: PostProps) {
  return (
    <article
      key={props.postId}
      className="group relative flex flex-col space-y-2 bg-muted/50 border rounded-lg p-4 sm:p-8"
    >
      <h2 className="text-2xl font-extrabold">{props.postTitle}</h2>
      {props.postPublishDate && (
        <p className="text-sm text-muted-foreground">
          <time dateTime={props.postPublishDate.toISOString()}>
            {formatRelative(props.postPublishDate)}
          </time>
        </p>
      )}
      {props.postBody && (
        <div
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Let's trust the input from tiptap
          dangerouslySetInnerHTML={{ __html: jsonToHTML(props.postBody) }}
        />
      )}
      {props.authorName && props.authorEmail && (
        <div>
          <a
            className={cn(buttonVariants({ variant: "link" }), "px-0")}
            href={`mailto:${props.authorEmail}`}
          >
            {props.authorName}
          </a>
        </div>
      )}
    </article>
  );
}
