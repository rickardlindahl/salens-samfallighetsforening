"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "./icons";

export function MainNav({
  routeLinks,
}: { routeLinks: { title: string; href: string }[] }) {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">Salen</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {routeLinks.map(({ href, title }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname.startsWith(href)
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            {title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
