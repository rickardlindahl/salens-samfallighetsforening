import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Posts() {
	return (
		<div>
			<h1>Posts</h1>
			<Suspense>
				<Posts />
			</Suspense>
		</div>
	);
}
