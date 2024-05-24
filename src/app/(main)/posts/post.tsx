import type { Post as IPost } from "@/db/schema";
import { jsonToHTML } from "@/lib/tiptap-utils.server";
import { formatRelative } from "@/lib/utils";

type PostProps = {
  post: IPost;
};

export function Post({ post }: PostProps) {
  return (
    <article
      key={post.id}
      className="group relative flex flex-col space-y-2 bg-muted/50 border rounded-lg p-4 sm:p-8"
    >
      <h2 className="text-2xl font-extrabold">{post.title}</h2>
      <p className="text-sm text-muted-foreground">
        <time dateTime={post.createdAt.toISOString()}>
          {formatRelative(post.createdAt)}
        </time>
      </p>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Let's trust the input from tiptap */}
      <div dangerouslySetInnerHTML={{ __html: jsonToHTML(post.body) }} />
    </article>
  );
}
