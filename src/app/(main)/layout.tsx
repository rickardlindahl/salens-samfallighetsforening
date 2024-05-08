import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthProvider } from "@/lib/providers/Auth";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

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
				<ThemeProvider>
					<AuthProvider api="rest">{children}</AuthProvider>
					<SpeedInsights />
				</ThemeProvider>
			</body>
		</html>
	);
}
