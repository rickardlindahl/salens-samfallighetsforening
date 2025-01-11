import { PostsList } from "@/components/posts-list";
import configPromise from "@payload-config";
import { getPayload } from "payload";

async function getPosts(publishedBefore: Date, limit?: number) {
	const payload = await getPayload({ config: configPromise });
	const posts = await payload.find({
		collection: "posts",
		limit: limit ?? 999,
		sort: "-publishDate",
		where: {
			publishDate: {
				less_than_equal: publishedBefore.toISOString(),
			},
		},
	});

	return posts.docs;
}

export async function Posts({
	publishedBefore,
	limit,
}: { limit?: number; publishedBefore: Date }) {
	const posts = await getPosts(publishedBefore, limit);

	if (posts.length === 0) {
		return (
			<div>
				<h3 className="text-2xl font-bold tracking-tight">
					Inga inlägg skapade ännu
				</h3>
			</div>
		);
	}

	return <PostsList posts={posts} />;
}
