import type { Session } from "next-auth";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { UserNavbar } from "./user-navbar";

const routeLinks = [
  {
    title: "Översikt",
    href: "/overview",
  },
  {
    title: "Inlägg",
    href: "/posts",
  },
  {
    title: "Dokument",
    href: "/documents",
  },
];

export async function SiteHeader({ session }: { session: Session | null }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav routeLinks={routeLinks} />
        <MobileNav routeLinks={routeLinks} />
        <div className="flex flex-1 space-x-2 justify-end">
          <ModeToggle />
          {!session?.user && (
            <Button asChild variant="outline">
              <Link href="/login">Logga in</Link>
            </Button>
          )}
          {session?.user && <UserNavbar user={session.user} />}
        </div>
      </div>
    </header>
  );
}
