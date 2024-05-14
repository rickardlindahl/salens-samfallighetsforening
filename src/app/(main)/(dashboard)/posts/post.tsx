import { RichText } from "@/components/rich-text";
import { formatDate } from "@/lib/utils";
import type { Post as IPost, Media } from "@/payload-types";
import Image from "next/image";

export function Post({ post, priority }: { post: IPost; priority: boolean }) {
	return (
		<article key={post.id} className="group relative flex flex-col space-y-2">
			<PostImage image={post.image} priority={priority} />
			<h2 className="text-2xl font-extrabold">{post.title}</h2>
			<p className="text-sm text-muted-foreground">
				<time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
			</p>
			<RichText content={post.content} className="w-full" />
		</article>
	);
}

type PostImageType = number | Media | null | undefined;

function PostImage({
	image,
	priority,
}: { image: PostImageType; priority: boolean }) {
	if (!image || typeof image === "number" || !image.url) {
		return null;
	}

	return (
		<Image
			src={image.url}
			alt={image.alt}
			width={804}
			height={452}
			className="rounded-md border bg-muted transition-colors"
			priority={priority}
		/>
	);
}
