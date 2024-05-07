import { RichText } from "@/components/rich-text";
import { type Post } from "@/payload-types";

export async function Post({ post }: { post: Post }) {
	return (
		<>
			<h2>{post.title}</h2>
			<RichText content={post.content} className="w-full" />
		</>
	);
}
