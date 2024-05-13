import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function StartPage() {
	return (
		<section className="container place-items-center py-20 md:py-32 gap-10 max-w-prose">
			<div className="text-center space-y-6">
				<main className="text-3xl sm:text-5xl md:text-6xl font-bold">
					<h1 className="inline text-wrap">
						<span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
							Salens
						</span>{" "}
						Samfällighetsförening
					</h1>{" "}
					<h2 className="inline">
						<span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
							Tomtebo
						</span>{" "}
						Umeå
					</h2>
				</main>

				<p className="text-xl text-muted-foreground md:w-10/12 mx-auto">
					Umeås bästa samfällighetsförening
				</p>

				<div className="space-y-4 md:space-y-0 md:space-x-4">
					<Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
						Login
					</Link>
				</div>
			</div>

			{/* Hero cards sections */}
			<div className="z-10" />

			{/* Shadow effect */}
			<div className="shadow" />
		</section>
	);
}
