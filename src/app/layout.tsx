import React from "react";
import { AuthProvider } from "@/lib/providers/Auth";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
    <html lang="en">
      <body>
        <AuthProvider api="rest">{children}</AuthProvider>
      </body>
    </html>
  );
}
