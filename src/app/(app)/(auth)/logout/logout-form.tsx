"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/lib/providers/auth";
import { toast } from "sonner";

export function LogoutForm() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
      } catch (_) {}
      toast.success("Utloggningen lyckades");
      router.push("/");
    };

    performLogout();
  }, [logout, router]);

  return null;
}
