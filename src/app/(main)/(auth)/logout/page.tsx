"use client";

import { useEffect } from "react";

import * as Icons from "@/components/icons";
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
			router.refresh();
		};

		performLogout();
	}, [logout, router]);

	return (
		<>
			<div className="flex flex-col space-y-2 text-center">
				<Icons.Logo className="mx-auto h-6 w-6" />
				<h1 className="text-2xl font-semibold tracking-tight">Log out</h1>
				<p className="text-sm text-muted-foreground">
					Please wait while you're being logged out.
				</p>
				<div className="mx-auto">
					<Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
				</div>
			</div>
		</>
	);
}
