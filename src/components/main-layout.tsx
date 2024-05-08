import { AuthProvider } from "@/lib/providers/Auth";
import { ThemeProvider } from "./theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default async function MainLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<AuthProvider api="rest">{children}</AuthProvider>
			<SpeedInsights />
		</ThemeProvider>
	);
}
