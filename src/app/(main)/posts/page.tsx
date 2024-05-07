import { Suspense } from "react";
import { Posts } from "./posts";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
	return (
		<div>
			<h1>Posts</h1>
			<Suspense>
				<Posts />
			</Suspense>
		</div>
	);
}
