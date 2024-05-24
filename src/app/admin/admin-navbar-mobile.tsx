"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PanelLeft,
  Paperclip,
  Settings,
  SquarePen,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNavbarMobile() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Icons.logo className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Salens Samfällighetsförening Inc</span>
          </Link>
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
              {
                "text-foreground": pathname === "/admin",
                "text-muted-foreground hover:text-foreground":
                  pathname !== "/admin",
              },
            )}
          >
            <LayoutDashboard className="h-5 w-5" />
            Admin
          </Link>
          <Link
            href="/admin/posts"
            className={cn(
              "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
              {
                "text-foreground": pathname.startsWith("/admin/posts"),
                "text-muted-foreground hover:text-foreground":
                  !pathname.startsWith("/admin/posts"),
              },
            )}
          >
            <SquarePen className="h-5 w-5" />
            Orders
          </Link>
          <Link
            href="/admin/documents"
            className={cn(
              "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
              {
                "text-foreground": pathname.startsWith("/admin/documents"),
                "text-muted-foreground hover:text-foreground":
                  !pathname.startsWith("/admin/documents"),
              },
            )}
          >
            <Paperclip className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="/admin/users"
            className={cn(
              "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
              {
                "text-foreground": pathname.startsWith("/admin/users"),
                "text-muted-foreground hover:text-foreground":
                  !pathname.startsWith("/admin/users"),
              },
            )}
          >
            <Users2 className="h-5 w-5" />
            Customers
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
