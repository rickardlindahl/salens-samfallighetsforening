"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminSideNavbar({
  routeLinks,
}: { routeLinks: { href: string; title: string }[] }) {
  const pathname = usePathname();

  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      {routeLinks.map(({ href, title }) => (
        <Link
          key={href}
          href={href}
          className={cn({
            "font-semibold text-primary": pathname.startsWith(href),
          })}
        >
          {title}
        </Link>
      ))}
    </nav>
  );
}
