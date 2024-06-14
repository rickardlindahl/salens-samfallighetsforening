import "@/styles/globals.css";

import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastMessageListener } from "@/components/toast-message-listener";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import PlausibleProvider from "next-plausible";
import { Inter } from "next/font/google";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
        <PlausibleProvider
          domain="salenssamfallighetsforening.se"
          selfHosted
          trackFileDownloads
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
            <Suspense>
              <ToastMessageListener />
            </Suspense>
            <TailwindIndicator />
          </ThemeProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
