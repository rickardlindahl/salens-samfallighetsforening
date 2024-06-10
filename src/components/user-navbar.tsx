"use client";

import { signOutAction } from "@/actions";
import type { Session } from "next-auth";
import Link from "next/link";
import { Icons } from "./icons";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function renderInitials(user: Session["user"]) {
  const [a, b] = user.name?.split(" ") ?? ["", ""];
  return `${a?.[0]}${b?.[0]}`;
}

export function UserNavbar({ user }: { user: Session["user"] }) {
  console.log({ user });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarFallback>
              {renderInitials(user) ?? <Icons.user />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer" disabled>
          <Link href="/account/settings">Settings</Link>
        </DropdownMenuItem>
        {user.role === "admin" && (
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/admin">Admin</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <form action={signOutAction}>
            <Button type="submit" variant="link">
              Logout
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
