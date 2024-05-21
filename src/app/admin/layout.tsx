import Link from "next/link";
import * as Icons from "@/components/icons";
import { MobileNav } from "@/components/mobile-nav";
import { AdminNavbar } from "./admin-navbar";
import { UserNavbar } from "@/components/user-navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const routeLinks = [
  {
    href: "/admin/users",
    title: "Users",
  },
  {
    href: "/admin/posts",
    title: "Posts",
  },
  {
    href: "/admin/documents",
    title: "Documents",
  },
  {
    href: "/admin/households",
    title: "Households",
  },
];
export default async function AdminLayout2({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    //    redirect("/login");
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.Logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Salen</span>
          </Link>
          <AdminNavbar routeLinks={routeLinks} />
          <MobileNav routeLinks={routeLinks} />
          <div className="flex flex-1 space-x-2 justify-end">
            <ModeToggle />
            {session?.user && <UserNavbar user={session.user} />}
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
