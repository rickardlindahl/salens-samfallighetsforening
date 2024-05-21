"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNavbar({
  routeLinks,
}: { routeLinks: { href: string; title: string }[] }) {
  const pathname = usePathname();

  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      {routeLinks.map(({ href, title }) => (
        <Link
          key={href}
          href={href}
          className={cn("transition-colors hover:text-foreground", {
            "text-muted-foreground": !pathname.startsWith(href),
            "text-foreground": pathname.startsWith(href),
          })}
        >
          {title}
        </Link>
      ))}
    </nav>
  );
}
