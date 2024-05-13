import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/providers/Auth";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";

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
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<AuthProvider api="rest">{children}</AuthProvider>
					<Toaster richColors />
					<SpeedInsights />
				</ThemeProvider>
			</body>
		</html>
	);
}
