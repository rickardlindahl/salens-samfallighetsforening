import { formatDate } from "@/lib/utils";

type PostProps = {
  post: { id: string; title: string; createdAt: string };
};

export function Post({ post }: PostProps) {
  return (
    <article
      key={post.id}
      className="group relative flex flex-col space-y-2 bg-muted/50 border rounded-lg p-4 sm:p-8"
    >
      <h2 className="text-2xl font-extrabold">{post.title}</h2>
      <p className="text-sm text-muted-foreground">
        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
      </p>
    </article>
  );
}
