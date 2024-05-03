import "@/styles/globals.css";

import { Inter } from "next/font/google";
import React from "react";
import { AuthProvider } from "@/lib/providers/Auth";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable}`}>
				<AuthProvider api="rest">{children}</AuthProvider>
			</body>
		</html>
	);
}
