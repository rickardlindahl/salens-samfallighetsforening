import { DocumentsListLoading } from "@/components/documents-list";
import { Suspense } from "react";
import { Documents } from "../documents/documents";
import { Posts } from "../posts/posts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PostsListLoading } from "@/components/posts-list";
import { getMeUser } from "@/lib/payload/getMeUser";

export default async function OverviewPage() {
	await getMeUser({
		nullUserRedirect: `/login?redirect=${encodeURIComponent("/overview")}`,
	});

	return (
		<div className="container max-w-6xl py-6 lg:py-10">
			<div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
				<div className="flex-1 space-y-4">
					<h1 className="inline-block font-semibold text-4xl tracking-tight lg:text-5xl">
						Översikt
					</h1>
					<p className="text-xl text-muted-foreground">
						Här samlas de senaste inläggen och dokumenten från samfälligheten.
					</p>
				</div>
			</div>

			<hr className="my-8" />

			<main className="flex-1">
				<div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
					<section>
						<h2 className="text-2xl font-bold mb-6">Senaste inläggen</h2>
						<div className="grid gap-6">
							<Suspense fallback={<PostsListLoading limit={3} />}>
								<Posts publishedBefore={new Date()} limit={3} showBorder />
							</Suspense>
							<Button asChild variant="link">
								<Link href="/posts">Visa alla</Link>
							</Button>
						</div>
					</section>
					<section>
						<h2 className="text-2xl font-bold mb-6">Senaste dokumenten</h2>
						<div className="grid gap-6">
							<Suspense fallback={<DocumentsListLoading limit={3} />}>
								<Documents publishedBefore={new Date()} limit={3} showBorder />
							</Suspense>
							<Button asChild variant="link">
								<Link href="/documents">Visa alla</Link>
							</Button>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
