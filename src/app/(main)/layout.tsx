import "@/styles/globals.css";

import { Inter } from "next/font/google";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthProvider } from "@/lib/providers/Auth";
import { cn } from "@/lib/utils";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					inter.variable,
				)}
			>
				<AuthProvider api="rest">{children}</AuthProvider>
				<SpeedInsights />
			</body>
		</html>
	);
}
