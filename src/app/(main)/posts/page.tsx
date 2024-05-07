import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Post } from "./post";

export async function getPosts() {
	const payload = await getPayload({
		config: configPromise,
	});

	return payload.find({
		collection: "posts",
	});
}
export default async function PostsPage() {
	const posts = await getPosts();

	return (
		<div>
			<h1>Posts</h1>
			{posts.docs.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
}
