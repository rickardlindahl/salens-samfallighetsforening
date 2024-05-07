import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function getPosts() {
	const payload = await getPayload({
		config: configPromise,
	});

	return payload.find({
		collection: "posts",
	});
}

export async function Posts() {
	const posts = await getPosts();
	console.log({ posts: posts.docs });

	return (
		<>
			{posts.docs.map((post) => (
				<div key={post.id}>{post.title}</div>
			))}
		</>
	);
}
