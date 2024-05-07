import { getPayload } from "payload";
import configPromise from "@payload-config";

async function getPosts() {
	const payload = await getPayload({
		config: configPromise,
	});

	return payload.find({
		collection: "posts",
	});
}

export default async function Posts() {
	const posts = await getPosts();

	return (
		<div>
			<h1>Posts</h1>
			{posts.docs.map((post) => (
				<div key={post.id}>{post.title}</div>
			))}
		</div>
	);
}
