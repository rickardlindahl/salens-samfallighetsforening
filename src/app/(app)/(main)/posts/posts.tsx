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
	showBorder,
}: { limit?: number; publishedBefore: Date; showBorder: boolean }) {
	const posts = await getPosts(publishedBefore, limit);

	return <PostsList posts={posts} showBorder={showBorder} />;
}
