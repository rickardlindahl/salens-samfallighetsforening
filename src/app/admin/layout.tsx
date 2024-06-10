import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminNavbarMobile } from "./admin-navbar-mobile";
import { AdminSidebar } from "./admin-sidebar";

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

export default async function AdminRootLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AdminSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <AdminNavbarMobile />
        </header>
        {children}
      </div>
    </div>
  );
}
