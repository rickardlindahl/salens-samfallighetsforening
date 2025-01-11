import {
	type SerializedLexicalNode,
	render,
} from "@/components/richtext/render";
import { getMeUser } from "@/lib/payload/getMeUser";
import { formatRelative } from "@/lib/utils";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { notFound } from "next/navigation";

async function getPost(slug: string) {
	const payload = await getPayload({ config: configPromise });
	const posts = await payload.find({
		collection: "posts",
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	});

	return posts.docs;
}

export default async function SpecificPostPage({
	params,
}: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	await getMeUser({
		nullUserRedirect: `/login?redirect=${encodeURIComponent(`/posts/${slug}`)}`,
	});

	const [post] = await getPost(slug);

	if (!post) {
		notFound();
	}

	return (
		<div className="container max-w-6xl py-6 lg:py-10">
			<article className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
				<div className="flex-1 space-y-4">
					<h1 className="inline-block font-semibold text-4xl tracking-tight lg:text-5xl">
						{post.title}
					</h1>
					<hr className="my-8" />
					<p className="text-sm text-muted-foreground">
						<time dateTime={post.createdAt}>
							{formatRelative(new Date(post.createdAt))}
						</time>
					</p>
					{render(post.content.root.children as SerializedLexicalNode[])}
				</div>
			</article>
		</div>
	);
}
