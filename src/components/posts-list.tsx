import { Skeleton } from "@/components/ui/skeleton";
import type { Post } from "@/payload-types";
import { cn, formatRelative } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export function PostsList({
	posts,
	showBorder,
}: { posts: Post[]; showBorder: boolean }) {
	return (
		<div className="grid gap-4">
			{posts.map(({ id, title, publishDate, slug }) => (
				<div
					key={id}
					className={cn(
						"grid gap-1 pb-4",
						showBorder
							? "border-b border-gray-200 dark:border-gray-800"
							: undefined,
					)}
				>
					<h3 className="font-medium">{title}</h3>
					<div className="text-sm text-gray-500 dark:text-gray-400">
						{formatRelative(new Date(publishDate), new Date())}
					</div>
					<p className="text-sm line-clamp-2">
						{typeof slug === "string" && (
							<a
								href={`/posts/${slug}`}
								className={cn(buttonVariants({ variant: "link" }), "p-0")}
							>
								Läs mer
							</a>
						)}
					</p>
				</div>
			))}
		</div>
	);
}

export function PostsListLoading({ limit = 5 }: { limit?: number }) {
	return (
		<div className="grid gap-4">
			{Array.from({ length: limit }, (_value, index) => index).map((num) => (
				<div
					key={num}
					className="grid gap-1 border-b border-gray-200 dark:border-gray-800 pb-4"
				>
					<h3 className="font-medium">
						<Skeleton className="h-[20px] w-[260px]" />
					</h3>
					<div className="text-sm text-gray-500 dark:text-gray-400 flex flex-row gap-2">
						<Skeleton className="h-[20px] w-[60px] " />
					</div>
					<Skeleton className="h-[20px]" />
				</div>
			))}
		</div>
	);
}
