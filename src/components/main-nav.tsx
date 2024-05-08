"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import * as Icons from "./icons";

export function MainNav() {
	const pathname = usePathname();

	return (
		<div className="mr-4 hidden md:flex">
			<Link href="/" className="mr-6 flex items-center space-x-2">
				<Icons.Logo className="h-6 w-6" />
				<span className="hidden font-bold sm:inline-block">Salen</span>
			</Link>
			<nav className="flex items-center gap-4 text-sm lg:gap-6">
				<Link
					href="/docs"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname === "/docs" ? "text-foreground" : "text-foreground/60",
					)}
				>
					Docs
				</Link>
				<Link
					href="/docs/components"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/docs/components")
							? "text-foreground"
							: "text-foreground/60",
					)}
				>
					Components
				</Link>
				<Link
					href="/themes"
					className={cn(
						"transition-colors hover:text-foreground/80",
						pathname?.startsWith("/themes")
							? "text-foreground"
							: "text-foreground/60",
					)}
				>
					Themes
				</Link>
			</nav>
		</div>
	);
}
