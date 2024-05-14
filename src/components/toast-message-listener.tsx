"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function ToastMessageListener() {
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams?.get("message")) {
			toast.info(searchParams.get("message"));
		}
	}, [searchParams]);

	return null;
}
