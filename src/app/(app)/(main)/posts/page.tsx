import { Suspense } from "react";
import { Posts } from "./posts";
import { PostsListLoading } from "@/components/posts-list";
import { getMeUser } from "@/lib/payload/getMeUser";

export default async function PostsPage() {
	await getMeUser({
		nullUserRedirect: `/login?redirect=${encodeURIComponent("/posts")}`,
	});

	return (
		<div className="container max-w-6xl py-6 lg:py-10">
			<div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
				<div className="flex-1 space-y-4">
					<h1 className="inline-block font-semibold text-4xl tracking-tight lg:text-5xl">
						Inlägg
					</h1>
					<p className="text-xl text-muted-foreground">
						Här samlas inlägg från samfälligheten.
					</p>
				</div>
			</div>

			<hr className="my-8" />

			<Suspense fallback={<PostsListLoading />}>
				<Posts publishedBefore={new Date()} showBorder={false} />
			</Suspense>
		</div>
	);
}
