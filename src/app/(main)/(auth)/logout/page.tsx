"use client";

import { useEffect } from "react";

import { useAuth } from "@/lib/providers/Auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutPage() {
	const router = useRouter();
	const { logout } = useAuth();

	useEffect(() => {
		const performLogout = async () => {
			try {
				await logout();
			} catch (_) {}
			toast.success("Logged out successfully");

			router.push("/");
		};

		performLogout();
	}, [logout, router]);

	return null;
}
