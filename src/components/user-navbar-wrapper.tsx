"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { UserNavbar } from "./user-navbar";
import { useAuth } from "@/lib/providers/auth";

export function UserNavbarWrapper() {
  const { user } = useAuth();

  return (
    <>
      {!user && (
        <Button asChild variant="outline">
          <Link href="/login">Logga in</Link>
        </Button>
      )}
      {user && <UserNavbar user={user} />}
    </>
  );
}
